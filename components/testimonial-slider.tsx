"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause } from 'lucide-react';

const quote = "CirklX is one of the most creative digital marketing agencies in Hisar. Their video shoots are professionally planned, and the editing quality is excellent. The team understands the brand before creating content, which makes every reel look unique and engaging.";

const testimonials = [
  { name: "Arjun Malhotra", followers: "112k Followers", avatar: "/figma/exact/testimonial-avatar.png", poster: "/figma/exact/testimonial-poster.png", video: "/video2-opt.mp4" },
  { name: "Rohit Mehta", followers: "403k Followers", avatar: "/man2.png", poster: "/thumb1.png", video: "/video1-opt.mp4" },
  { name: "Nikhil Sharma", followers: "215k Followers", avatar: "/man3.png", poster: "/thumb4.png", video: "/video3-opt.mp4" },
];

type Testimonial = (typeof testimonials)[number];

function Stars({ light = false }: { light?: boolean }) {
  return <Image src="/figma/exact/testimonial-stars.svg" alt="5 out of 5 stars" width={140} height={28} className={light ? "brightness-0 invert" : ""} />;
}

function Person({ item, inverse = false }: { item: Testimonial; inverse?: boolean }) {
  return <div className="flex items-center gap-3">
    <Image src={item.avatar} alt={item.name} width={44} height={44} className="size-11 rounded-full object-cover shadow-[0_0_0_2px_rgba(0,0,0,.08)]" />
    <span className="leading-none">
      <strong className={`block whitespace-nowrap text-lg font-semibold ${inverse ? "text-white" : "text-[#15140f]"}`}>{item.name}</strong>
      <small className={`mt-1 block whitespace-nowrap text-base ${inverse ? "text-white" : "text-black/40"}`}>{item.followers}</small>
    </span>
  </div>;
}

function QuoteCard({ item }: { item: Testimonial }) {
  return <article className="flex h-[496px] flex-col justify-between overflow-hidden rounded-[26px] bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,.05)]">
    <div className="flex h-10 items-start justify-between">
      <Image src="/figma/exact/quote-open.svg" alt="" width={40} height={40} className="rotate-180" />
      <Stars />
    </div>
    <p className="h-[240px] text-base italic leading-[1.5] text-[#15140f]/70">{quote}</p>
    <div className="flex items-end justify-between">
      <Person item={item} />
      <Image src="/figma/exact/quote-close.svg" alt="" width={40} height={40} className="-scale-y-100" />
    </div>
  </article>;
}

function VideoCard({ item }: { item: Testimonial }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) await video.play(); else video.pause();
  };

  return <article className="relative mx-auto h-[496px] w-full max-w-[359px] overflow-hidden rounded-[26px] bg-black">
    <video ref={videoRef} key={item.video} src={item.video} poster={item.poster} preload="metadata" muted playsInline loop onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} className="absolute inset-0 size-full object-cover" aria-label={`${item.name} testimonial video`} />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/75" />
    <button type="button" onClick={toggle} aria-label={playing ? "Pause testimonial video" : "Play testimonial video"} className={`absolute left-1/2 top-[calc(50%-41px)] z-10 size-10 -translate-x-1/2 -translate-y-1/2 transition ${playing ? "opacity-0 hover:opacity-100 focus:opacity-100" : "opacity-100"}`}>
      {playing ? <Pause className="size-10 rounded-full bg-black/50 p-2 text-white" /> : <Image src="/figma/exact/testimonial-play.svg" alt="" width={40} height={40} />}
    </button>
    <div className="absolute inset-x-5 bottom-5 z-10 rounded-[20px] bg-white/10 p-[10px] text-white backdrop-blur-[32px]">
      <p className="text-base italic leading-[1.5]">CirklX is one of the most creative digital marketing agencies in Hisar. Their video shoots are professionally planned, and the editing quality is excellent.</p>
      <div className="mt-[15px] flex items-end justify-between gap-2">
        <span className="leading-none"><strong className="block whitespace-nowrap text-lg font-semibold">{item.name}</strong><small className="mt-1 block text-base">{item.followers}</small></span>
        <Stars />
      </div>
    </div>
  </article>;
}

export function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(3);
  const viewport = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const slides = testimonials.flatMap(item => [{ item, type: 'quote' }, { item, type: 'video' }]);
  const last = slides.length - visible;
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const resize = new ResizeObserver(() => {
      setVisible(window.innerWidth >= 768 ? 3 : 1);
      element.scrollTo({ left: 0 });
      setActive(0);
    });
    resize.observe(element);
    return () => resize.disconnect();
  }, []);
  const move = (step: number) => {
    const element = viewport.current;
    if (!element) return;
    const next = Math.max(0, Math.min(last, active + step));
    const width = (element.clientWidth - (visible - 1) * 24) / visible;
    element.querySelectorAll('video').forEach(video => video.pause());
    element.scrollTo({ left: next * (width + 24), behavior: reduceMotion ? 'instant' : 'smooth' });
    setActive(next);
  };

  return <div className="mx-auto max-w-[1140px]">
    <div ref={viewport} className="rail flex gap-6 overflow-x-auto" onScroll={event => {
      const element = event.currentTarget;
      const width = (element.clientWidth - (visible - 1) * 24) / visible;
      setActive(Math.max(0, Math.min(last, Math.round(element.scrollLeft / (width + 24)))));
    }}>
      {slides.map(({item, type}, index) => <div key={`${item.name}-${type}`} className="w-full shrink-0 md:w-[calc((100%-48px)/3)]" aria-label={`Testimonial ${index + 1} of ${slides.length}`}>
        {type === 'quote' ? <QuoteCard item={item} /> : <VideoCard item={item} />}
      </div>)}
    </div>
    <div className="mt-10 flex justify-center gap-[18px]">
      <button type="button" disabled={active === 0} onClick={() => move(-1)} aria-label="Previous testimonial" className="grid size-11 place-items-center rounded-full border border-black/10 bg-white transition enabled:hover:bg-[#d6ff01] disabled:cursor-not-allowed disabled:bg-transparent disabled:text-black/30"><ChevronLeft size={18} /></button>
      <button type="button" disabled={active === last} onClick={() => move(1)} aria-label="Next testimonial" className="grid size-11 place-items-center rounded-full border border-black/10 bg-white transition enabled:hover:bg-[#d6ff01] disabled:cursor-not-allowed disabled:bg-transparent disabled:text-black/30"><ChevronRight size={18} /></button>
    </div>
  </div>;
}
