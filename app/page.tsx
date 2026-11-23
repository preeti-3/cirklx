import type { Metadata } from "next";
import Image from "next/image";
import { FeaturedReels } from "@/components/featured-reels";
import { GraphicsShowcase } from "@/components/graphics-showcase";
import { HomeFaq } from "@/components/home-faq";
import { HomeHero } from "@/components/home-hero";
import { SectionTitle } from "@/components/ui";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { processSteps } from "@/lib/content";

export const metadata: Metadata = { title: "Social Media Content That Gets Views", description: "CirklX plans, shoots, edits and publishes high-performing Reels, Shorts and social posts." };
const tools = [["/instaIcon.png","Instagram Reels"],["/icon4.png","YouTube Shorts"],["/icon5.png","Graphic Design"],["/icon1.png","Video Edits"],["/icon2.png","Motion Graphics"]] as const;

export default function HomePage() {
  return <>
    <HomeHero />

    <section data-theme="light" className="home-process bg-[#f4f2ed]"><div className="container-x">
      <SectionTitle className="text-center">Our <span className="serif">Process</span></SectionTitle>
      <div className="process-grid mt-10 grid gap-10 md:mt-14 md:grid-cols-3 md:gap-[60px]">{processSteps.map(item=><article key={item.title} className="relative min-w-0">
        <div className="relative aspect-[1.42] w-full overflow-hidden rounded-[16px] bg-white"><Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 360px" /></div>
        <h3 className="mt-4 text-left text-[18px] font-semibold leading-tight">{item.title}</h3><p className="mt-3 text-left text-sm leading-[1.55] text-black/55">{item.copy}</p>
      </article>)}</div>
    </div></section>

    <section className="home-tools bg-[linear-gradient(180deg,#f4f2ed_0%,#efffb3_38%,#f4f2ed_100%)]"><div className="container-x"><SectionTitle className="text-center">Everything you need <span className="serif">for views</span></SectionTitle><div className="mt-9 grid grid-cols-2 gap-3 md:mt-10 md:grid-cols-5 md:gap-4">{tools.map(([src,label])=><div key={label} className="card flex min-h-[112px] flex-col items-center justify-center gap-3 p-3 text-center text-xs font-medium md:min-h-32 md:text-sm"><Image src={src} alt="" width={34} height={34} className={`size-8 object-contain ${label === "YouTube Shorts" ? "scale-125" : ""}`} /><span>{label}</span></div>)}</div></div></section>

    <section id="featured-reels" className="home-reels overflow-hidden bg-[#f4f2ed]"><div className="container-x"><SectionTitle className="mb-6 text-center">Featured <span className="serif">Reels</span></SectionTitle></div><FeaturedReels /></section>

    <section className="home-story bg-[#f4f2ed]"><div className="container-x"><div className="rounded-[28px] bg-white px-6 py-9 text-center shadow-[0_4px_15px_rgba(0,0,0,.05)] md:rounded-[40px] md:p-[50px]">
      <SectionTitle>Our Short <span className="serif">Story</span></SectionTitle>
      <p className="mx-auto mt-6 max-w-[990px] text-[18px] font-medium italic leading-[1.5] md:text-[28px]">We&apos;re a <span className="story-highlight serif">social media marketing</span> agency helping brands and creators turn raw content into <span className="story-highlight serif">viral Reels</span>, engaging Shorts, and scroll-stopping posts - fast, <span className="story-highlight serif">trend-driven</span>, and built to grow your following.</p>
      <div className="mt-7 grid gap-6 md:grid-cols-3 md:gap-0">{[["5M+","Total Views for Clients","Generated across Reels, Shorts & Posts for brands and creators we've worked with."],["2.5K +","Videos Edited for Clients","Cut, styled, and optimized to perform - built for how people actually scroll today."],["100+","Brands & Creators Served","From local Hisar businesses to creators - trusted to grow their presence online."]].map(([number,label,copy],index)=><div key={number} className={`px-4 ${index ? "border-t border-black/10 pt-6 md:border-l md:border-t-0 md:pt-0" : ""}`}><strong className="serif block text-[36px] font-normal md:text-[42px]">{number}</strong><h3 className="mt-3 text-sm font-semibold md:text-[18px]">{label}</h3><p className="mx-auto mt-1 max-w-[290px] text-xs leading-[1.5] text-black/55 md:text-base">{copy}</p></div>)}</div>
    </div></div></section>

    <section id="graphics" className="home-graphics scroll-mt-28 overflow-hidden bg-[#f4f2ed]"><SectionTitle className="mb-8 text-center md:mb-[50px]">Graphics</SectionTitle><GraphicsShowcase /></section>

    <section id="testimonials" className="home-testimonials scroll-mt-28 overflow-hidden bg-[#f4f2ed]"><div className="container-x"><SectionTitle className="mb-8 text-center md:mb-10">Loved by <span className="serif">top creators</span></SectionTitle><TestimonialSlider/></div></section>

    <section className="home-faq bg-[#f4f2ed]"><div className="container-x max-w-[1140px]"><SectionTitle className="mb-8 text-center md:mb-12">FAQ&apos;s</SectionTitle><HomeFaq/></div></section>
  </>;
}
