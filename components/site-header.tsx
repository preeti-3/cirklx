"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Service", "/service"],
  ["Event", "/#featured-reels"],
  ["Work", "/work"],
  ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(path !== "/contact");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      // Read document geometry: hit testing can return only the fixed nav
      // while its blurred background is being composited.
      const sampleY = window.innerWidth >= 768 ? 75 : 49;
      const sections = Array.from(document.querySelectorAll('main section, footer, footer section'));
      const section = sections.reverse().find(element => {
        const rect = element.getBoundingClientRect();
        return rect.top <= sampleY && rect.bottom > sampleY;
      });
      setOnDark(section?.getAttribute('data-theme') === 'dark' || !!section?.classList.contains('hero-fabric'));
      setScrolled(window.scrollY > 24);
    };
    const frame = requestAnimationFrame(updateTheme);
    window.addEventListener("scroll", updateTheme, { passive: true });
    window.addEventListener("resize", updateTheme);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", updateTheme); window.removeEventListener("resize", updateTheme); };
  }, [path]);

  return <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-5 pt-5 md:pt-[30px]">
    <nav aria-label="Primary navigation" data-surface={onDark ? 'dark' : 'light'} style={{ backdropFilter: `blur(${scrolled ? 12 : 8}px)`, WebkitBackdropFilter: `blur(${scrolled ? 12 : 8}px)` }} className={`pointer-events-auto mx-auto flex h-[58px] max-w-[1140px] items-center justify-between overflow-hidden rounded-[14px] border px-4 transition-colors duration-500 md:h-[90px] md:rounded-[20px] md:px-10 ${onDark ? scrolled ? "border-white/10 bg-white/5 text-white shadow-[0_4px_20px_rgba(0,0,0,.5)]" : "border-white/[.07] bg-white/[.03] text-white" : "border-white/20 bg-white/10 text-[#15140f] shadow-[0_4px_20px_rgba(0,0,0,.25)]"}`}>
      <Link href="/" aria-label="CirklX home" onClick={() => setOpen(false)} className="flex items-center gap-2">
        <Image src={onDark ? "/figma/exact/hero-logo.png" : "/black.png"} alt="" width={43} height={43} className="size-8 object-contain md:size-[43px]" priority />
        <span className="text-[17px] font-bold tracking-[-.025em] md:text-[24px]">CirklX</span>
      </Link>

      <div className="hidden h-full items-center gap-[26px] md:flex">
        {links.map(([label, href]) => {
          const active = href === "/" ? path === "/" : path === href;
          return <Link key={label} href={href} className={`relative flex h-full w-14 items-center justify-center text-center text-base transition-colors ${active ? onDark ? "font-semibold text-[#d6ff01]" : "font-semibold text-black" : onDark ? "text-white/80 hover:text-white" : "text-black/65 hover:text-black"}`}>
            {label}
            {active && <span className={`absolute inset-x-0 bottom-0 h-0.5 ${onDark ? "bg-[#d6ff01]" : "bg-black"}`} />}
          </Link>;
        })}
      </div>

      <Link href="/contact" className="hidden h-[50px] items-center gap-2 rounded-full bg-[#d6ff01] px-[23px] text-base font-semibold text-[#15140f] shadow-[0_0_26px_rgba(214,255,1,.15)] transition hover:-translate-y-0.5 hover:bg-white md:inline-flex">
        Book A Free Meeting <Image src="/figma/exact/arrow-up-right.svg" alt="" width={16} height={16} />
      </Link>

      <button type="button" className={`grid size-11 place-items-center rounded-full border md:hidden ${onDark ? "border-white/10" : "border-black/10"}`} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </nav>

    {open && <div id="mobile-menu" className="pointer-events-auto mx-auto mt-2 max-w-[350px] rounded-2xl border border-white/10 bg-[#15140f]/95 p-3 text-white shadow-2xl backdrop-blur-md md:hidden">
      {links.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)} className={`flex min-h-12 items-center justify-between rounded-xl px-4 ${path === href ? "bg-[#d6ff01] font-semibold text-[#15140f]" : "text-white/80"}`}>{label}<span aria-hidden>↗</span></Link>)}
      <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#d6ff01] font-semibold text-[#15140f]">Book A Free Meeting <Image src="/figma/exact/arrow-up-right.svg" alt="" width={16} height={16} /></Link>
    </div>}
  </header>;
}
