"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const headlineIcons = [FaInstagram, FaFacebook, FaXTwitter, FaTiktok];

function HeadlineBadge() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % headlineIcons.length), 2000);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);
  const Icon = headlineIcons[active];
  return <span className="headline-badge mx-1 inline-grid size-[34px] translate-y-[5px] place-items-center overflow-hidden align-baseline md:size-[53px] md:translate-y-[9px]" aria-hidden="true">
    <AnimatePresence mode="wait" initial={false}>
      <motion.span key={active} initial={{ opacity: 0, scale: .6, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: .6, rotate: 20 }} transition={{ duration: reduceMotion ? 0 : .35, ease: 'easeOut' }}><Icon className="size-[18px] text-[#d6ff01] md:size-[27px]" /></motion.span>
    </AnimatePresence>
  </span>;
}

const orbitIcons = [
  { src: "/figma/exact/orbit-sparkle.svg", bleed: false },
  { src: "/figma/exact/orbit-pinterest.svg", bleed: true },
  { src: "/figma/exact/orbit-facebook.svg", bleed: true },
  { src: "/figma/exact/orbit-youtube.svg", bleed: true },
  { src: "/figma/exact/orbit-instagram.svg", bleed: false },
] as const;

function cubic(a: number, b: number, c: number, d: number, t: number) {
  const u = 1 - t;
  return u ** 3 * a + 3 * u ** 2 * t * b + 3 * u * t ** 2 * c + t ** 3 * d;
}

function createOrbitPoints() {
  return Array.from({ length: 101 }, (_, index) => {
    const progress = index / 100;
    const secondHalf = progress > .5;
    const t = secondHalf ? (progress - .5) * 2 : progress * 2;
    const x = secondHalf
      ? cubic(567.932, 776.827, 985.722, 1134.93, t)
      : cubic(.932, 150.143, 359.037, 567.932, t);
    const y = secondHalf
      ? cubic(370.504, 364.233, 276.436, .504, t)
      : cubic(.504, 276.436, 364.233, 370.504, t);
    return [x / 11.3586, y / 3.71564];
  });
}

function Orbit() {
  const reduceMotion = useReducedMotion();
  const points = useMemo(() => createOrbitPoints(), []);
  const left = points.map(([x]) => `${x}%`);
  const top = points.map(([, y]) => `${y}%`);
  const opacity = points.map((_, index) => Math.min(1, index / 10, (points.length - 1 - index) / 10));
  const fixed = [7, 25, 50, 75, 93];

  return <div className="hero-orbit pointer-events-none absolute left-1/2 top-[350px] h-[372px] w-[1136px] -translate-x-1/2" aria-hidden="true">
    <Image src="/figma/exact/orbit-curve.svg" alt="" fill priority className="pointer-events-none object-fill" />
    {orbitIcons.map((icon, index) => {
      const point = points[fixed[index]];
      return <motion.div
        key={icon.src}
        className="absolute left-0 top-0 size-[68px] -translate-x-1/2 -translate-y-1/2"
        initial={reduceMotion ? { left: `${point[0]}%`, top: `${point[1]}%`, opacity: 1 } : { left: left[0], top: top[0], opacity: 0 }}
        animate={reduceMotion ? undefined : { left, top, opacity }}
        transition={reduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: "linear", delay: index * -1.8 }}
      >
        <span className="absolute inset-[1px] rounded-full bg-[#151514]" />
        <Image
          src={icon.src}
          alt=""
          width={icon.bleed ? 98 : 68}
          height={icon.bleed ? 98 : 68}
          className={icon.bleed ? "absolute z-10 left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" : "relative z-10 size-[68px]"}
        />
      </motion.div>;
    })}
  </div>;
}

function HeroButton({ href, outline = false, play = false, children }: { href: string; outline?: boolean; play?: boolean; children: React.ReactNode }) {
  return <Link href={href} className={`group inline-flex h-[50px] items-center justify-center gap-2 rounded-full px-[23px] text-base font-semibold transition duration-200 hover:-translate-y-0.5 ${outline ? "border border-white/80 bg-transparent text-white hover:bg-white hover:text-[#15140f]" : "border border-[#d6ff01] bg-[#d6ff01] text-[#15140f] shadow-[0_0_26px_rgba(214,255,1,.15)] hover:bg-white"}`}>
    {children}
    <Image src={play ? "/figma/exact/view-work-play.svg" : "/figma/exact/arrow-up-right.svg"} alt="" width={16} height={16} className={play ? 'transition group-hover:brightness-0' : ''} />
  </Link>;
}

export function HomeHero() {
  return <section data-theme="dark" className="hero-fabric relative h-[720px] overflow-hidden bg-[#050505] text-white md:h-[810px]">
    <video autoPlay muted loop playsInline disablePictureInPicture poster="/hero-poster.webp" preload="metadata" src="/video-opt.mp4" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
    <div className="absolute inset-0 bg-black/45" />

    <div className="absolute left-1/2 top-[160px] z-10 flex w-[calc(100%-40px)] -translate-x-1/2 flex-col items-center text-center md:top-[200px] md:w-[1134px]">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-[10px] py-[6px] text-[12px] text-white shadow-[0_2px_10px_rgba(0,0,0,.04)] md:text-sm">
        <Image src="/figma/exact/rating-star.svg" alt="" width={12} height={12} />
        4.9/5 - Hisar&apos;s #1 SMM Agency
      </div>
      <h1 className="mt-[14px] max-w-[350px] text-[38px] font-semibold leading-[1.02] tracking-[-.035em] md:max-w-[900px] md:text-[64px] md:leading-[1]">
        Agency that makes your<br />
        <span className="serif text-[#d6ff01]">reels &amp; content</span>{" "}
        <HeadlineBadge />{" "}
        <span className="serif text-[#d6ff01]">go viral</span>
      </h1>
      <p className="mt-[14px] max-w-[556px] text-[13px] leading-6 text-white/80 md:text-base">Scroll-stopping reels &amp; short-form video editing for Influencers,Creators &amp; Brands across Haryana.</p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
        <HeroButton href="/contact">Book A Free Meeting</HeroButton>
        <HeroButton href="/work" outline play>View Our Works</HeroButton>
      </div>
    </div>

    <Orbit />
  </section>;
}
