import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Blog", description: "Social media strategy, content and growth insights from CirklX." };
const posts = [["/social-media-marketing-trends-2026.webp","Social Media Marketing Trends for 2026"],["/ai-content-creation-social-media.webp","AI Content Creation for Social Media"],["/social-search-optimization.webp","How Social Search Optimization Works"]];
export default function BlogPage(){return <><PageHero title="CirklX" accent="Insights" description="Practical ideas for brands and creators who want social content to perform."/><section className="section-pad bg-[#f4f2ed]"><div className="container-x grid gap-6 md:grid-cols-3">{posts.map(([src,title])=><article className="card overflow-hidden" key={title}><div className="relative aspect-[1.5]"><Image src={src} alt="" fill className="object-cover"/></div><h2 className="p-6 text-xl font-semibold">{title}</h2></article>)}</div></section></>}
