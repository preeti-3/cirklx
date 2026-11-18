"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play, Star } from "lucide-react";
import { useRef, useState } from "react";

const testimonials = [
  { name: "Arjun Malhotra", followers: "112k Followers", avatar: "/man1.png", poster: "/thumb3.png", video: "/video2-opt.mp4" },
  { name: "Rohit Mehta", followers: "403k Followers", avatar: "/man2.png", poster: "/thumb1.png", video: "/video1-opt.mp4" },
  { name: "Nikhil Sharma", followers: "215k Followers", avatar: "/man3.png", poster: "/thumb4.png", video: "/video3-opt.mp4" },
];
const quote = "CirklX is one of the most creative digital marketing agencies in Hisar. Their video shoots are professionally planned, and the editing quality is excellent. The team understands the brand before creating content, which makes every reel look unique and engaging.";

function Stars() { return <span className="flex gap-1 text-[#ffa900]" aria-label="5 out of 5 stars">{Array.from({length:5},(_,index)=><Star key={index} size={18} fill="currentColor" strokeWidth={1.5}/>)}</span>; }

function QuoteCard({ item }: { item: (typeof testimonials)[number] }) {
  return <article className="relative hidden min-h-[500px] flex-col justify-between rounded-[22px] bg-white p-6 shadow-[0_4px_15px_rgba(0,0,0,.05)] md:flex">
    <span className="absolute left-6 top-4 font-serif text-5xl leading-none text-black/[.08]">“</span><span className="absolute right-6 top-6"><Stars/></span>
    <p className="mt-24 text-sm italic leading-[1.55] text-black/70">{quote}</p>
    <div className="flex items-center gap-3"><Image src={item.avatar} alt={item.name} width={42} height={42} className="size-[42px] rounded-full object-cover"/><span><strong className="block text-sm">{item.name}</strong><small className="text-xs text-black/40">{item.followers}</small></span></div>
    <span className="absolute bottom-5 right-6 font-serif text-5xl leading-none text-black/[.08]">”</span>
  </article>;
}

function VideoCard({ item }: { item: (typeof testimonials)[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = async () => { const video=videoRef.current; if (!video) return; if (video.paused) await video.play(); else video.pause(); };
  return <article className="relative mx-auto aspect-[.72] w-full max-w-[330px] overflow-hidden rounded-[22px] bg-black shadow-[0_4px_15px_rgba(0,0,0,.08)] md:max-w-none">
    <video ref={videoRef} key={item.video} src={item.video} poster={item.poster} preload="metadata" muted playsInline loop onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} className="absolute inset-0 h-full w-full object-cover" aria-label={`${item.name} testimonial video`} />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/85"/>
    <button type="button" onClick={toggle} aria-label={playing ? "Pause testimonial video" : "Play testimonial video"} className="absolute left-1/2 top-[42%] z-10 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#9b7868]/90 text-white">{playing?<Pause size={19} fill="currentColor"/>:<Play className="translate-x-px" size={19} fill="currentColor"/>}</button>
    <div className="absolute inset-x-4 bottom-4 z-10 rounded-[14px] bg-black/45 p-4 text-white backdrop-blur-[3px]"><p className="text-xs italic leading-[1.5]">{quote.slice(0,160)}.</p><div className="mt-4 flex items-end justify-between gap-3"><span><strong className="block text-sm">{item.name}</strong><small className="text-[11px] text-white/65">{item.followers}</small></span><Stars/></div></div>
  </article>;
}

export function TestimonialSlider() {
  const [active,setActive]=useState(0);
  const previous=(active-1+testimonials.length)%testimonials.length;
  const next=(active+1)%testimonials.length;
  return <div className="mx-auto max-w-[1140px]">
    <div className="grid items-stretch gap-5 md:grid-cols-[1fr_.96fr_1fr]"><QuoteCard item={testimonials[0]}/><VideoCard key={active} item={testimonials[active]}/><QuoteCard item={testimonials[0]}/></div>
    <div className="mt-8 flex justify-center gap-3"><button type="button" onClick={()=>setActive(previous)} aria-label="Previous testimonial" className="grid size-10 place-items-center rounded-full border border-black/10 text-black/35 transition hover:bg-white hover:text-black"><ChevronLeft size={18}/></button><button type="button" onClick={()=>setActive(next)} aria-label="Next testimonial" className="grid size-10 place-items-center rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,.08)] transition hover:bg-[#d6ff01]"><ChevronRight size={18}/></button></div>
  </div>;
}
