"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Cta, Logo } from "./ui";

const links = [["Home", "/"], ["About", "/about"], ["Service", "/service"], ["Work", "/work"], ["Contact", "/contact"]] as const;

export function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const lightPage = path === "/contact";
  return <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-5 pt-5 md:px-5 md:pt-[30px]">
    <nav aria-label="Primary navigation" className={`pointer-events-auto mx-auto flex h-[58px] max-w-[1140px] items-center justify-between rounded-[14px] border px-4 backdrop-blur-2xl md:h-[90px] md:rounded-[16px] md:px-10 ${lightPage ? "border-black/10 bg-[#15140f] text-white" : "border-white/10 bg-[#15140f]/85 text-white"}`}>
      <Link href="/" aria-label="CirklX home" onClick={() => setOpen(false)}><Logo /></Link>
      <div className="hidden items-center gap-7 md:flex">
        {links.map(([label, href]) => <Link key={href} href={href} className={`relative py-8 text-sm transition hover:text-[#d6ff01] ${path === href ? "font-semibold text-[#d6ff01] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-[#d6ff01]" : "text-white/80"}`}>{label}</Link>)}
      </div>
      <div className="hidden md:block"><Cta /></div>
      <button className="grid size-11 place-items-center rounded-full border border-white/10 md:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </nav>
    {open && <div id="mobile-menu" className="pointer-events-auto mx-auto mt-2 max-w-[350px] rounded-2xl border border-white/10 bg-[#15140f] p-3 text-white shadow-2xl md:hidden">
      {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex min-h-12 items-center justify-between rounded-xl px-4 ${path === href ? "bg-[#d6ff01] font-semibold text-[#15140f]" : "text-white/80"}`}>{label}<span aria-hidden>↗</span></Link>)}
      <div className="mt-2"><Cta /></div>
    </div>}
  </header>;
}
