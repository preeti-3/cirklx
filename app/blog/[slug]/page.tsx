import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { BlogShare } from "@/components/blog-share";
import { Cta, SectionTitle } from "@/components/ui";
import { blogPosts } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(post => post.slug === slug);
  if (!post) notFound();
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, url: `/blog/${post.slug}`, images: [{ url: post.image, alt: post.title }], publishedTime: post.published },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [post.image] },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find(post => post.slug === slug);
  if (!post) notFound();
  const related = blogPosts.filter(item => item.slug !== slug).slice(0, 3);
  const branding = post.slug === "the-power-of-branding";
  const sectionId = (index: number) => "article-section-" + (index + 1);

  return <div data-theme="light" className="blog-detail pb-20 pt-28 md:pb-[120px] md:pt-[170px]">
    <article className="blog-article container-x">
      <header className="blog-heading">
        <h1>{branding ? <>The Power of Branding in <span className="serif">Today&apos;s Digital World</span></> : post.title}</h1>
        <p>{branding ? "A strong brand is more than just a logo. It's the identity, experience, and story that makes your business memorable." : post.description}</p>
      </header>
      <nav className="blog-toc" aria-label="Table of contents">
        <h2>Table of Content</h2>
        <ol>{post.sections.map((section, index) => <li key={section.heading}><a href={"#" + sectionId(index)}>{section.heading}</a></li>)}</ol>
      </nav>
      <figure className="blog-cover relative overflow-hidden rounded-[20px]">
        <Image src={post.image} alt={post.title} fill priority sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1199px) 65vw, 800px" className="object-cover" />
      </figure>
      <div className="blog-byline">
        <div className="blog-author">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#15140f]"><Image src="/figma/exact/hero-logo.png" alt="" width={32} height={32} /></span>
          <span><strong>CirklX Team</strong><small>@cirklx.agency</small></span>
        </div>
        {post.date && <time dateTime={post.published}>Last Updated: {post.date}</time>}
      </div>
      <div className="blog-body">
        {post.sections.map((section, index) => <section key={section.heading} id={sectionId(index)}>
          <h2>{index + 1}. {section.heading}</h2>
          {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}
        </section>)}
        <BlogShare />
        <div className="mt-9 flex flex-col items-start justify-between gap-5 rounded-[20px] border border-black/10 bg-white p-6 sm:flex-row sm:items-center">
          <div><h2 className="text-lg font-semibold">Ready to put these ideas to work?</h2><p className="mt-2 text-sm leading-relaxed text-black/55">Let&apos;s talk about your next creative project.</p></div>
          <div className="shrink-0"><Cta /></div>
        </div>
      </div>
    </article>
    <section className="container-x mt-20 md:mt-[120px]">
      <SectionTitle className="mb-8 text-center">Keep <span className="serif">Reading</span></SectionTitle>
      <div className="grid gap-6 md:grid-cols-3">{related.map(item => <article key={item.slug} className="min-w-0 overflow-hidden rounded-[20px] bg-white">
        <Link href={`/blog/${item.slug}`} className="relative block aspect-[364/267]" tabIndex={-1} aria-hidden="true"><Image src={item.image} alt="" fill sizes="(max-width: 767px) 100vw, 364px" className="object-cover" /></Link>
        <div className="p-5"><p className="text-xs uppercase tracking-wide text-black/45">{item.category}</p><h3 className="mt-2 text-xl font-semibold"><Link href={`/blog/${item.slug}`} className="inline-flex min-h-11 items-center gap-2">{item.title}<ArrowUpRight size={18} className="shrink-0" /></Link></h3><p className="mt-3 text-sm leading-relaxed text-black/55">{item.description}</p></div>
      </article>)}</div>
    </section>
  </div>;
}
