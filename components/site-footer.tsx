import Link from "next/link";
import { ArrowUpRight, AtSign, Mail, MapPin, Music2, Phone, Video } from "lucide-react";
import { Logo } from "./ui";

const navigation = [["Home","/"],["About","/about"],["Service","/service"],["Work","/work"],["Contact","/contact"],["Blog","/blog"]] as const;

export function SiteFooter() {
  return <footer className="bg-[#15140f] text-white">
    <section className="flex min-h-[252px] flex-col items-center bg-[#d6ff01] px-5 pt-[61px] text-center text-[#15140f]">
      <h2 className="text-[34px] font-semibold leading-none tracking-[-.04em]">Ready to make<span className="serif ml-2 inline-block">your videos go viral?</span></h2>
      <p className="mt-[15px] max-w-[520px] text-[9px] leading-[1.45] text-black/65">From planning to shoot to scroll-stopping reels — let&apos;s build content that actually grows your following. Book a free<br className="hidden md:block"/> call, no commitment needed.</p>
      <Link href="/contact" className="mt-[31px] inline-flex h-[38px] items-center gap-2 rounded-full border border-[#15140f] px-5 text-[11px] font-semibold transition hover:bg-[#15140f] hover:text-[#d6ff01]">Book A Free Meeting <ArrowUpRight size={14}/></Link>
    </section>
    <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-10 sm:px-10 md:grid-cols-[1.15fr_.6fr_1.25fr_.8fr] md:gap-8 md:py-4 lg:px-16">
      <div>
        <Logo />
        <p className="mt-3 max-w-[210px] text-[12px] leading-[1.65] text-white/55">Premium video editing for creators<br className="hidden lg:block" /> who want to go viral.</p>
      </div>
      <div>
        <FooterLabel>Navigation</FooterLabel>
        <nav className="grid gap-1.5 text-[11px] text-white/40" aria-label="Footer navigation">
          {navigation.map(([label,href])=><Link className="transition hover:text-[#d6ff01]" href={href} key={href}>{label}</Link>)}
        </nav>
      </div>
      <div>
        <FooterLabel>Get in touch</FooterLabel>
        <div className="grid gap-3 text-[12px] leading-[1.2] text-white/40">
          <a className="flex items-start gap-3 hover:text-[#d6ff01]" href="mailto:cirklx.agency@gmail.com"><ContactIcon><Mail size={12}/></ContactIcon>cirklX.agency@gmail.com</a>
          <a className="flex items-start gap-3 hover:text-[#d6ff01]" href="tel:+918053200325"><ContactIcon><Phone size={12}/></ContactIcon>+91 80532 00325</a>
          <p className="flex max-w-[230px] items-start gap-3"><ContactIcon><MapPin size={12}/></ContactIcon><span>DSS 79, Basement, Near<br/> Lemon Tree, Old Court<br/> Complex, Hisar, Haryana,<br/> India — 125001</span></p>
        </div>
      </div>
      <div className="flex gap-2 md:justify-end">
        <Social href="https://www.instagram.com/cirklx.agency/" label="Instagram"><AtSign size={13}/></Social>
        <Social href="https://www.facebook.com/cirklxagency/" label="Facebook"><span className="text-[15px] font-semibold">f</span></Social>
        <Social href="https://twitter.com" label="X"><span className="text-[13px]">X</span></Social>
        <Social href="https://tiktok.com" label="TikTok"><Music2 size={13}/></Social>
        <Social href="https://youtube.com" label="YouTube"><Video size={13}/></Social>
      </div>
    </div>
  </footer>;
}

function FooterLabel({children}:{children:React.ReactNode}) { return <p className="mb-4 text-[10px] uppercase text-white/25">{children}</p>; }
function ContactIcon({children}:{children:React.ReactNode}) { return <span className="grid size-5 shrink-0 place-items-center rounded-full border border-white/10 text-[#d6ff01]">{children}</span>; }
function Social({href,label,children}:{href:string;label:string;children:React.ReactNode}) { return <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid size-7 place-items-center rounded-full border border-white/10 text-[#d6ff01] transition hover:bg-white/10">{children}</a>; }
