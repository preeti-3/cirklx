import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PageHero, SectionTitle } from "@/components/ui";

export const metadata: Metadata = { title: "Events", description: "Meet creators, learn new skills, and build connections at CirklX events." };

const events = [
  { image: "connect", category: "Community Meetup", title: "CirklX Creator Connect", date: "16 Jan 2027 · 4:00–7:00 PM", description: "An evening of fresh ideas, real conversations, and your next creative collaboration." },
  { image: "storytelling", category: "Workshop", title: "Storytelling That Sticks", date: "23 Jan 2027 · 11:00 AM–2:00 PM", description: "Turn everyday ideas into stories that connect. Create, experiment, and learn together." },
  { image: "beyond", category: "Networking", title: "Beyond the Brief", date: "30 Jan 2027 · 5:00–8:00 PM", description: "Meet founders, creators, and big thinkers. One conversation could change what comes next." },
] as const;
const categories = [
  ["conference", "Conferences", "Big ideas. Fresh perspectives."],
  ["workshop", "Workshops", "Learn by doing, together."],
  ["network", "Networking", "Conversations that go further."],
  ["webinar", "Webinars", "A world of ideas, wherever you are."],
  ["special", "Special Events", "Something a little extraordinary."],
  ["community", "Community Meetups", "Good people. Shared passions."],
] as const;
const moments = [
  ["exchange", "The Creator Exchange", "Conversations, connections & creative energy"],
  ["matter", "Make It Matter", "Hands-on learning. Ideas brought to life."],
  ["after-hours", "Ideas After Hours", "A good evening with even better company"],
] as const;
const benefits = [
  ["network", "Meet Like-Minded People", "Find your circle of creators, thinkers, and people who share your curiosity."],
  ["learn", "Learn From Experts", "Get real insights and practical takeaways from people who know their craft."],
  ["opportunity", "Discover New Opportunities", "Explore fresh ideas, collaborations, and possibilities for what comes next."],
  ["community", "Build Valuable Connections", "Start meaningful conversations that continue long after the event."],
] as const;

function EventIcon({ name }: { name: string }) {
  return <span className="inline-grid size-10 shrink-0 place-items-center rounded-lg bg-[#d6ff01]"><Image src={`/figma/event-${name}.svg`} alt="" width={24} height={24} /></span>;
}

export default function EventsPage() {
  return <>
    <PageHero title="Where Ideas Meet" accent="Experiences." description="Discover exciting events, meaningful connections, and unforgettable experiences. Explore what's happening and be part of something extraordinary." />
    <section className="section-pad">
      <div className="container-x">
        <SectionTitle className="text-center">What&apos;s <span className="serif">Coming Up?</span></SectionTitle>
        <p className="mx-auto mt-4 max-w-[650px] text-center text-sm leading-relaxed text-black/55 md:text-base">Explore our upcoming events and find the perfect opportunity to connect, learn, and experience something new.</p>
        <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => <article key={event.title} className="flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white">
            <div className="relative aspect-[364/224]">
              <Image src={`/figma/event-${event.image}.png`} alt={event.title} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 364px" className="object-cover" />
              <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-2 text-[10px] font-semibold uppercase md:text-xs">{event.category}</span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="self-start rounded-full bg-black/5 px-3 py-1 text-xs text-black/70">{event.date}</p>
              <h2 className="mt-3 text-xl font-semibold">{event.title}</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-black/55"><MapPin size={15} />Hisar, Haryana</p>
              <p className="mb-5 mt-3 text-sm leading-relaxed text-black/55">{event.description}</p>
              <Link href={`/contact?subject=${encodeURIComponent(`Event registration: ${event.title}`)}`} className={`relative mt-auto flex min-h-11 items-center justify-between rounded-full border border-black/10 px-4 text-sm font-semibold ${index === 0 ? "bg-[#d6ff01]" : "hover:bg-[#d6ff01]"}`}>Register Now <ArrowUpRight size={16} /><span className="sr-only"> for {event.title}</span></Link>
            </div>
          </article>)}
        </div>
      </div>
    </section>
    <section data-theme="dark" className="grid bg-[#15140f] text-white md:grid-cols-2">
      <div className="flex flex-col justify-center px-5 py-14 md:py-20 md:pl-[max(20px,calc((100vw-1140px)/2))] md:pr-10">
        <SectionTitle>Don&apos;t Miss Our<br /><span className="serif text-[#d6ff01]">Featured Event</span></SectionTitle>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">An exclusive experience bringing together creative minds, industry leaders, and passionate people.</p>
        <h3 className="mt-8 text-xl font-semibold">Creative Futures Summit 2027</h3>
        <p className="mt-3 self-start rounded-full bg-[#d6ff01]/15 px-3 py-2 text-xs text-[#d6ff01]">13 Feb 2027 · 10:00 AM–6:00 PM</p>
        <p className="mt-3 flex items-center gap-2 text-sm text-white/65"><MapPin size={16} />Gurugram, India</p>
      </div>
      <div className="relative min-h-[300px] md:min-h-[520px]"><Image src="/figma/event-summit.png" alt="Speaker and audience at the Creative Futures Summit" fill sizes="(max-width: 767px) 100vw, 54vw" className="object-cover" /></div>
    </section>
    <section className="section-pad">
      <div className="container-x">
        <SectionTitle className="text-center">Event <span className="serif">Categories</span></SectionTitle>
        <p className="mt-4 text-center text-sm text-black/55">Find your people. Follow your curiosity.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
          {categories.map(([icon, title, description]) => <div key={title} className="rounded-xl bg-white p-5"><div className="flex items-center gap-3"><EventIcon name={icon} /><h3 className="font-semibold">{title}</h3></div><p className="mt-4 text-sm text-black/55">{description}</p></div>)}
        </div>
      </div>
    </section>
    <section className="pb-20 md:pb-[150px]">
      <div className="container-x">
        <SectionTitle className="text-center">Moments We&apos;ve <span className="serif">Created</span></SectionTitle>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-black/55">Take a look back at the experiences, connections, and memories from our previous events.</p>
        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-3">
          {moments.map(([image, title, description]) => <article key={title}><div className="relative aspect-[364/330] overflow-hidden rounded-2xl"><Image src={`/figma/event-${image}.png`} alt={title} fill sizes="(max-width: 767px) 100vw, 364px" className="object-cover" /></div><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-2 text-sm text-black/55">{description}</p></article>)}
        </div>
      </div>
    </section>
    <section className="pb-20 md:pb-[150px]">
      <div className="container-x">
        <SectionTitle className="text-center">Why <span className="serif">Attend?</span></SectionTitle>
        <p className="mt-4 text-center text-sm text-black/55">Come for the ideas. Leave with a little more.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-12">{benefits.map(([icon, title, description]) => <article key={title} className="rounded-xl bg-white p-6"><EventIcon name={icon} /><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-black/55">{description}</p></article>)}</div>
      </div>
    </section>
  </>;
}
