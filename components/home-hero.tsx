"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube } from "react-icons/fa";
import { RiSparkling2Fill } from "react-icons/ri";
import { useEffect, useMemo, useState } from "react";

const desktopPoints = [
  [2, 4], [3, 21], [6, 43], [12, 65], [21, 82], [33, 92], [50, 96],
  [67, 92], [79, 82], [88, 65], [94, 43], [97, 21], [98, 4],
];
const mobilePoints = [
  [1, 5], [5, 31], [13, 55], [25, 76], [38, 89], [50, 94],
  [62, 89], [75, 76], [87, 55], [95, 31], [99, 5],
];

const socials = [
  { icon: FaPinterestP, color: "#e60023", glow: "rgba(230,0,35,.45)" },
  { icon: RiSparkling2Fill, color: "#d6ff01", glow: "rgba(214,255,1,.42)" },
  { icon: FaInstagram, color: "#ff6a28", glow: "rgba(255,106,40,.45)" },
  { icon: FaFacebookF, color: "#2d7ff9", glow: "rgba(45,127,249,.45)" },
  { icon: FaYoutube, color: "#ff2424", glow: "rgba(255,36,36,.45)" },
] as const;

function Orbit({ mobile = false }: { mobile?: boolean }) {
  const reduceMotion = useReducedMotion();
  const points = mobile ? mobilePoints : desktopPoints;
  const x = points.map(([left]) => `${left}%`);
  const y = points.map(([, top]) => `${top}%`);
  const opacity = points.map((_, index) => index === 0 || index === points.length - 1 ? 0 : index === 1 || index === points.length - 2 ? .45 : 1);

  return <div className={`absolute inset-x-0 bottom-0 ${mobile ? "h-[238px] md:hidden" : "hidden h-[404px] md:block"}`} aria-hidden="true">
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
      <path d="M18 14 C42 265 232 383 500 384 C768 383 958 265 982 14" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1" />
    </svg>
    {socials.map(({ icon: Icon, color, glow }, index) => {
      const staticPoint = points[Math.round(index * (points.length - 1) / (socials.length - 1))];
      return <motion.div
        key={color}
        className="absolute left-0 top-0 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[10px] border bg-[#151514]/95 md:size-11 md:rounded-[14px]"
        style={{ borderColor: glow, color, boxShadow: `inset 0 1px rgba(255,255,255,.28), 0 0 20px ${glow}` }}
        initial={reduceMotion ? { left: `${staticPoint[0]}%`, top: `${staticPoint[1]}%`, opacity: 1 } : { left: x[0], top: y[0], opacity: 0 }}
        animate={reduceMotion ? undefined : { left: x, top: y, opacity }}
        transition={reduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: "linear", delay: index * -1.4 }}
      ><Icon className="size-3.5 md:size-[18px]" /></motion.div>;
    })}
  </div>;
}

function HeroButton({ href, outline, children }: { href: string; outline?: boolean; children: React.ReactNode }) {
  return <Link href={href} className={`inline-flex h-[50px] items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6ff01] ${outline ? "border-white/25 bg-white/[.04] text-white hover:bg-white hover:text-[#15140f]" : "border-[#d6ff01] bg-[#d6ff01] text-[#15140f] hover:bg-white"}`}>
    {children}<ArrowUpRight size={16} />
  </Link>;
}

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const badgeIcons = useMemo(() => [FaFacebookF, FaInstagram, FaYoutube], []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setActive(value => (value + 1) % badgeIcons.length), 2000);
    return () => window.clearInterval(timer);
  }, [badgeIcons.length, reduceMotion]);

  const BadgeIcon = badgeIcons[active];
  return <section className="hero-fabric relative h-[790px] overflow-hidden text-white md:h-[810px]">
    <div className="absolute left-1/2 top-[160px] z-10 w-[350px] -translate-x-1/2 text-center md:top-[200px] md:w-[1134px]">
      <div className="mx-auto inline-flex h-[26px] items-center gap-1.5 rounded-full border border-white/15 bg-white/[.06] px-3 text-[10px] text-white/75 backdrop-blur-md md:h-8 md:text-sm">
        <span className="text-[#d6ff01]">★</span> 4.9/5 - Hisar&apos;s #1 SMM Agency
      </div>
      <h1 className="mx-auto mt-5 max-w-[350px] text-[36px] font-semibold leading-[.98] tracking-[-.045em] md:mt-6 md:max-w-[720px] md:text-[64px]">
        Agency that makes your<br className="hidden md:block" /> <span className="serif text-[#d6ff01]">reels &amp; content</span>{" "}
        <span className="relative mx-1 inline-grid size-7 translate-y-1 place-items-center overflow-hidden rounded-lg border border-white/20 bg-white/10 align-baseline md:size-14 md:translate-y-2 md:rounded-2xl">
          <AnimatePresence mode="wait" initial={false}><motion.span key={active} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -10 }} className="absolute grid inset-0 place-items-center text-[#d6ff01]"><BadgeIcon className="size-3.5 md:size-6" /></motion.span></AnimatePresence>
        </span> go viral
      </h1>
      <p className="mx-auto mt-5 max-w-[350px] text-sm leading-[1.5] text-white/60 md:max-w-[556px] md:text-base">Scroll-stopping reels &amp; short-form video editing for Influencers, Creators &amp; Brands across Haryana.</p>
      <div className="mx-auto mt-7 flex w-[226px] flex-col gap-3 md:mt-8 md:w-auto md:flex-row md:justify-center">
        <HeroButton href="/contact">Book A Free Meeting</HeroButton>
        <HeroButton href="/work" outline>View Our Work</HeroButton>
      </div>
    </div>
    <div className="absolute inset-x-0 bottom-0 mx-auto h-[238px] w-full md:h-[404px] md:w-[1134px]"><Orbit mobile /><Orbit /></div>
  </section>;
}
