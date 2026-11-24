import type { Metadata } from "next";
import Image from "next/image";
import { ClientLogoStrip } from "@/components/client-logo-strip";
import { PageHero, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the CirklX team and the principles behind our social-first creative work.",
};

const values = [
  [
    "🚀",
    "Speed Matters",
    "Trends move fast — we deliver content even faster, so you're never posting yesterday's moment.",
  ],
  [
    "🎉",
    "Creativity Wins",
    "Every reel, post, and caption is crafted to grab attention, hold it, and convert.",
  ],
  [
    "🎯",
    "Consistency is Key",
    "Growth comes from showing up — with great content on schedule, every single time.",
  ],
  [
    "🧑‍💻",
    "Platform-Native Thinking",
    "We create content that feels natural on Instagram and YouTube Shorts — not repurposed, but tuned.",
  ],
  [
    "👥",
    "Client Obsession",
    "Your growth is our growth. Every strategy is personalized — no cookie-cutter templates.",
  ],
  [
    "📊",
    "Data-Backed Decisions",
    "We follow what's actually trending and performing — not just what looks good on paper.",
  ],
] as const;
const team = [
  ["/team1.jpeg", "Krishan Bansal", "Client Success"],
  ["/team3.jpeg", "Govind Sharma", "Creative Director"],
  ["/team2.jpeg", "Naveen Nagar", "Lead Editor"],
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About"
        accent="CirklX"
        description="At CirklX, we're Hisar's social media marketing agency helping brands and creators turn everyday content into scroll-stopping Reels and Shorts."
      />
      <ClientLogoStrip />

      <section className="about-story bg-[#f4f2ed]">
        <div className="container-x grid items-center gap-8 text-center md:grid-cols-[1fr_1.05fr] md:gap-16 md:text-left">
          <div>
            <SectionTitle>
              How it&apos;s <span className="serif">started</span>
            </SectionTitle>
            <p className="mt-6 max-w-[510px] text-sm leading-[1.65] text-black/60">
              CirklX started in February 2025 in Hisar, with a simple belief —
              every brand and creator deserves content that actually gets
              noticed and gets posted. What began as one person&apos;s vision
              quickly grew into a full creative team, each person bringing a
              piece of the puzzle: strategy, shooting, editing, and visibility.
            </p>
            <p className="mt-5 max-w-[510px] text-sm leading-[1.65] text-black/60">
              Today, CirklX is built on three pillars — planning and management,
              production and direction, and editing and creative execution —
              working together to turn ordinary content into scroll-stopping
              Reels and Shorts. No outsourcing, no guesswork — just a dedicated
              team that treats your brand&apos;s growth like our own.
            </p>
          </div>
          <div className="process-image relative aspect-[350/460] overflow-hidden rounded-[30px] md:aspect-[1.32]">
            <Image
              src="/about4.png"
              alt="Professional video editing workspace at CirklX"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 550px"
            />
          </div>
        </div>
      </section>

      <section className="about-values bg-[#f4f2ed]">
        <div className="container-x">
          <SectionTitle className="text-center">
            What we <span className="serif">believe in</span>
          </SectionTitle>
          <div className="about-value-cards mt-8 grid gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {values.map(([, title, copy], index) => (
              <article
                className="rounded-[16px] bg-white p-6 shadow-[0_4px_15px_rgba(0,0,0,.045)]"
                key={title}
              >
                <Image src={`/figma/about-value-${index + 1}.png`} alt="" width={41} height={41} />
                <h3 className="mt-4 text-[18px] font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-[1.55] text-black/55">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-team overflow-hidden bg-[#f4f2ed]">
        <div className="container-x">
          <SectionTitle className="text-center">
            Faces Behind <span className="serif">Cirklx</span>
          </SectionTitle>
          <div className="mt-8 grid gap-[30px] md:mt-12 md:grid-cols-3">
            {team.map(([src, name, role]) => (
              <article
                key={name}
                className="min-w-[86%] rounded-[20px] bg-white p-2 text-center shadow-[0_4px_15px_rgba(0,0,0,.045)] sm:min-w-[48%] md:min-w-0"
              >
                <div className="relative aspect-square overflow-hidden rounded-[20px] bg-[#d9d7d2] md:aspect-[.9]">
                  <Image
                    src={src}
                    alt={`${name}, ${role}`}
                    fill
                    loading="eager"
                    className="object-cover"
                  />
                </div>
                <h3 className="serif mt-4 text-2xl">{name}</h3>
                <p className="pb-4 text-xs text-black/55">{role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
