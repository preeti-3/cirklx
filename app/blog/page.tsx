import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, SectionTitle } from "@/components/ui";
import { latestPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "Blog", description: "Social media strategy, content and growth insights from CirklX." };
const posts = [["/social-media-marketing-trends-2026.webp","Social Media Marketing Trends for 2026"],["/ai-content-creation-social-media.webp","AI Content Creation for Social Media"],["/social-search-optimization.webp","How Social Search Optimization Works"]];
const articleCopy = [
  "Start with what your brand stands for and who it serves. Give that promise a consistent voice, visual identity, and content style. When your website, social posts, and customer experience tell the same story, people can recognize your business and understand why it matters to them.",
  "A useful website makes the next step clear. Build each page around a specific visitor need, keep navigation simple, and make important actions easy to reach on a phone. Test with real content and real users, then improve the places where people hesitate or get lost.",
  "Begin with a clear audience and one campaign goal. Create content that answers their questions, demonstrates your work, or gives them a reason to participate. Review the responses and enquiries alongside views, then use what you learn to shape the next round of content.",
];

export default function BlogPage() {
  return <>
    <PageHero title="CirklX" accent="Insights" description="Practical ideas for brands and creators who want social content to perform." />
    <section className="section-pad">
      <div className="container-x">
        <SectionTitle className="mb-8 text-center md:mb-12">Our Latest <span className="serif">Blog</span></SectionTitle>
        <div className="grid gap-6 lg:grid-cols-3">
          {latestPosts.map((post, index) => <article id={post.slug} className="scroll-mt-36 overflow-hidden rounded-[20px] bg-white" key={post.slug}>
            <div className="relative aspect-[364/267]"><Image src={post.image} alt={post.title} fill sizes="(max-width: 1023px) 100vw, 364px" className="object-cover" /></div>
            <div className="p-6"><time className="rounded-full bg-black/5 px-3 py-1 text-xs text-black/60">{post.date}</time><h2 className="mt-4 text-2xl font-semibold">{post.title}</h2><p className="mt-3 text-sm leading-relaxed text-black/60">{post.description}</p><p className="mt-4 text-sm leading-relaxed text-black/60">{articleCopy[index]}</p></div>
          </article>)}
        </div>
        <SectionTitle className="mb-8 mt-16 text-center">More <span className="serif">Insights</span></SectionTitle>
        <div className="grid gap-6 md:grid-cols-3">{posts.map(([src, title]) => <article className="card overflow-hidden" key={title}><div className="relative aspect-[1.5]"><Image src={src} alt={title} fill sizes="(max-width: 767px) 100vw, 364px" className="object-cover" /></div><h2 className="p-6 text-xl font-semibold">{title}</h2></article>)}</div>
      </div>
    </section>
  </>;
}
