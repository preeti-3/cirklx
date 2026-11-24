import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const navigation = [["Home","/"],["About","/about"],["Service","/service"],["Event","/events"],["Work","/work"],["Contact","/contact"],["Blog","/blog"]] as const;

export function SiteFooter() {
  return <footer data-theme="dark" className="text-white">
    <section data-theme="light" className="flex h-[354px] flex-col items-center justify-center bg-[#d6ff01] px-5 text-center text-[#15140f]">
      <div>
        <h2 className="text-[38px] font-semibold leading-none tracking-[-.035em] md:text-[48px]">Ready to make <span className="serif">your videos go viral?</span></h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-[1.5] text-black/70">From planning to shoot to scroll-stopping reels — let&apos;s build content that actually grows your following. Book a free call, no commitment needed.</p>
      </div>
      <Link href="/contact" className="mt-10 inline-flex h-[50px] items-center gap-2 rounded-full border border-[#15140f] px-[23px] text-base font-semibold shadow-[0_0_26px_rgba(214,255,1,.15)] transition hover:bg-[#15140f] hover:text-[#d6ff01]">Book A Free Meeting <Image src="/figma/exact/arrow-up-right.svg" alt="" width={16} height={16} /></Link>
    </section>

    <div className="bg-[#15140f] pt-[50px]">
      <div className="mx-auto grid w-full max-w-[1180px] gap-10 px-5 pb-10 md:grid-cols-2 xl:grid-cols-[235px_140px_330px_1fr] xl:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Image src="/figma/exact/hero-logo.png" alt="" width={47} height={47} className="size-[47px] object-contain" />
            <strong className="text-[27px] tracking-[-.025em]">CirklX</strong>
          </div>
          <p className="mt-3 text-base leading-[1.5] text-white/70">Premium video editing for creators who want to go viral.</p>
        </div>
        <div>
          <FooterLabel>Navigation</FooterLabel>
          <nav className="grid gap-4 text-base text-white/45" aria-label="Footer navigation">{navigation.map(([label,href]) => <Link key={href} href={href} className="transition hover:text-[#d6ff01]">{label}</Link>)}</nav>
        </div>
        <div>
          <FooterLabel>Get In Touch</FooterLabel>
          <div className="grid gap-4 text-base leading-[1.35] text-white/45">
            <a className="flex items-center gap-[14px] transition hover:text-[#d6ff01]" href="mailto:cirklx.agency@gmail.com"><ContactIcon><Mail size={15}/></ContactIcon>cirklX.agency@gmail.com</a>
            <a className="flex items-center gap-[14px] transition hover:text-[#d6ff01]" href="tel:+918053200325"><ContactIcon><Phone size={15}/></ContactIcon>+91 80532 00325</a>
            <p className="flex items-start gap-[14px]"><ContactIcon><MapPin size={15}/></ContactIcon><span>DSS 79, Basement, Near Lemon Tree, Old Court Complex, Hisar, Haryana, India — 125001</span></p>
          </div>
        </div>
        <div className="flex gap-3 xl:justify-end">
          <Social href="https://www.instagram.com/cirklx.agency/" label="Instagram"><FaInstagram size={19}/></Social>
          <Social href="https://www.facebook.com/cirklxagency/" label="Facebook"><FaFacebookF size={18}/></Social>
          <Social href="https://twitter.com" label="X"><FaXTwitter size={18}/></Social>
          <Social href="https://tiktok.com" label="TikTok"><FaTiktok size={18}/></Social>
          <Social href="https://youtube.com" label="YouTube"><FaYoutube size={19}/></Social>
        </div>
      </div>
      <div className="border-t border-white/[.06] px-5 py-5 md:px-[84px]">
        <div className="grid items-center text-base text-white/35 sm:grid-cols-[1fr_auto_1fr]"><Link href="/terms" className="hover:text-[#d6ff01]">Terms &amp; Conditions</Link><span className="hidden sm:block">|</span><Link href="/privacy" className="text-right hover:text-[#d6ff01]">Privacy Policy</Link></div>
        <p className="mt-[18px] text-center text-base text-white/25">© 2026 CirklX. All rights reserved.</p>
      </div>
    </div>
  </footer>;
}

function FooterLabel({children}:{children:React.ReactNode}) { return <p className="mb-4 text-base font-semibold uppercase text-white/30">{children}</p>; }
function ContactIcon({children}:{children:React.ReactNode}) { return <span className="grid size-[27px] shrink-0 place-items-center rounded-full border border-white/10 bg-white/[.06] text-[#d6ff01]">{children}</span>; }
function Social({href,label,children}:{href:string;label:string;children:React.ReactNode}) { return <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[.06] text-[#d6ff01] transition hover:bg-[#d6ff01] hover:text-[#15140f]">{children}</a>; }
