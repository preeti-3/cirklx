import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact", description: "Contact CirklX to discuss social media marketing, content production and video editing." };

export default function ContactPage(){ return <section className="bg-[#f4f2ed] px-5 pb-28 pt-32 md:pb-36 md:pt-[220px]"><div className="container-x grid gap-12 lg:grid-cols-[366px_1fr] lg:gap-[136px]"><div><h1 className="heading-lg font-semibold">Reach Us <span className="serif">Anytime</span></h1><p className="mt-4 text-sm text-black/55">Have questions or need help? We&apos;re here for you.</p><div className="mt-10 grid gap-4"><ContactCard icon={<Mail/>} label="Email us" value="cirklx.agency@gmail.com" href="mailto:cirklx.agency@gmail.com"/><ContactCard icon={<Phone/>} label="Contact us" value="+91 80532 00325" href="tel:+918053200325"/></div></div><ContactForm/></div></section> }
function ContactCard({icon,label,value,href}:{icon:React.ReactNode;label:string;value:string;href:string}) { return <a href={href} className="flex min-h-[92px] items-center gap-4 rounded-2xl border border-black/10 p-5 transition hover:bg-white"><span className="grid size-12 place-items-center rounded-xl bg-white">{icon}</span><span><strong className="block text-sm uppercase tracking-wider">{label}</strong><span className="mt-1 block text-sm text-black/55 underline">{value}</span></span></a> }
