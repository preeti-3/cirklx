import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Cta({ href = "/contact", children = "Book A Free Meeting", inverted = false, lightOutline = false }: { href?: string; children?: React.ReactNode; inverted?: boolean; lightOutline?: boolean }) {
  const colors = lightOutline ? "border-white/25 bg-white/5 text-white hover:bg-white hover:text-[#15140f]" : inverted ? "border-[#15140f] bg-transparent text-[#15140f] hover:bg-[#15140f] hover:text-[#d6ff01]" : "lime-shadow border-[#d6ff01] bg-[#d6ff01] text-[#15140f] hover:border-white hover:bg-white";
  return <Link href={href} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 ${colors}`}>{children}<ArrowUpRight size={16} aria-hidden /></Link>;
}

export function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`heading-lg font-semibold ${className}`}>{children}</h2>;
}

export function PageHero({ title, accent, description }: { title: string; accent: string; description: string }) {
  return <section className="hero-fabric flex min-h-[520px] items-center justify-center px-5 pb-20 pt-36 text-center text-white md:min-h-[520px]">
    <div className="max-w-2xl">
      <h1 className="heading-xl font-semibold">{title} <span className="serif text-[#d6ff01]">{accent}</span></h1>
      <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/70 md:text-base">{description}</p>
    </div>
  </section>;
}

export function Logo({ dark = true }: { dark?: boolean }) {
  return <span className="flex items-center gap-2 font-bold tracking-tight">
    <Image src={dark ? "/white.png" : "/black.png"} alt="" width={36} height={32} className="h-8 w-9 object-contain" priority />
    <span>CirklX</span>
  </span>;
}
