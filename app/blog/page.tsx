import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, SectionTitle } from "@/components/ui";
import { latestPosts, additionalPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "Blog", description: "Social media strategy, content and growth insights from CirklX." };

export default function BlogPage() {
  return <>
    <PageHero title="CirklX" accent="Insights" description="Practical ideas for brands and creators who want social content to perform." />
    <section className="section-pad">
      <div className="container-x">
        <SectionTitle className="mb-8 text-center md:mb-12">Our Latest <span className="serif">Blog</span></SectionTitle>
        <div className="grid gap-6 lg:grid-cols-3">
          {latestPosts.map(post => <article id={post.slug} className="scroll-mt-36 overflow-hidden rounded-[20px] bg-white" key={post.slug}>
            <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true" className="relative block aspect-[364/267]"><Image src={post.image} alt="" fill sizes="(max-width: 1023px) 100vw, 364px" className="object-cover" /></Link>
            <div className="p-6"><time className="rounded-full bg-black/5 px-3 py-1 text-xs text-black/60">{post.date}</time><h2 className="mt-4 text-2xl font-semibold"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p className="mt-3 text-sm leading-relaxed text-black/60">{post.description}</p><Link href={`/blog/${post.slug}`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold" aria-label={`Read ${post.title}`}>Read More <span aria-hidden="true">↗</span></Link></div>
          </article>)}
        </div>
        <SectionTitle className="mb-8 mt-16 text-center">More <span className="serif">Insights</span></SectionTitle>
        <div className="grid gap-6 md:grid-cols-3">{additionalPosts.map(post => <article className="card overflow-hidden" key={post.slug}><Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true" className="relative block aspect-[1.5]"><Image src={post.image} alt="" fill sizes="(max-width: 767px) 100vw, 364px" className="object-cover" /></Link><div className="p-6"><h2 className="text-xl font-semibold"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><Link href={`/blog/${post.slug}`} className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold" aria-label={`Read ${post.title}`}>Read More ↗</Link></div></article>)}</div>
      </div>
    </section>
  </>;
}
