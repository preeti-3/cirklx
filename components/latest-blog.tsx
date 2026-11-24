"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { latestPosts } from "@/lib/blog";
import { SectionTitle } from "./ui";

export function LatestBlog() {
  const rail = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const move = (direction: number) => {
    const element = rail.current;
    if (!element) return;
    const card = element.firstElementChild as HTMLElement;
    element.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return <section className="home-blog pb-20 pt-20 md:pb-[150px] md:pt-0">
    <div className="container-x">
      <SectionTitle className="mb-8 text-center md:mb-12">Our Latest <span className="serif">Blog</span></SectionTitle>
      <div ref={rail} onScroll={event => setPosition(event.currentTarget.scrollLeft / Math.max(1, event.currentTarget.scrollWidth - event.currentTarget.clientWidth))} className="rail flex gap-6 overflow-x-auto pb-2" tabIndex={0} role="region" aria-label="Latest blog posts">
        {latestPosts.map(post => <article key={post.slug} className="w-[85%] shrink-0 overflow-hidden rounded-[20px] bg-white sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)]">
          <Link href={`/blog#${post.slug}`} tabIndex={-1} aria-hidden="true" className="relative block aspect-[364/267]"><Image src={post.image} alt="" fill sizes="(max-width: 640px) 85vw, 364px" className="object-cover" /></Link>
          <div className="p-5">
            <time className="rounded-full bg-black/5 px-3 py-1 text-xs text-black/60">{post.date}</time>
            <h3 className="mt-3 text-xl font-semibold">{post.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-black/55">{post.description}</p>
            <Link href={`/blog#${post.slug}`} className="relative mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold">Read More <ArrowRight size={16} /><span className="sr-only">: {post.title}</span></Link>
          </div>
        </article>)}
      </div>
      <div className="mt-5 flex justify-center gap-3 lg:hidden">
        <button onClick={() => move(-1)} disabled={position < 0.01} aria-label="Previous blog post" className="grid size-11 place-items-center rounded-full border border-black/10 disabled:opacity-30"><ChevronLeft /></button>
        <button onClick={() => move(1)} disabled={position > 0.99} aria-label="Next blog post" className="grid size-11 place-items-center rounded-full bg-white shadow-sm disabled:opacity-30"><ChevronRight /></button>
      </div>
    </div>
  </section>;
}
