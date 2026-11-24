import type { Metadata } from "next";
import Image from "next/image";
import { ClientLogoStrip } from "@/components/client-logo-strip";
import { FeaturedReels } from "@/components/featured-reels";
import { GraphicsShowcase } from "@/components/graphics-showcase";
import { GrowthImpact } from "@/components/growth-impact";
import { MediaRail } from "@/components/media-rail";
import { PageHero, SectionTitle } from "@/components/ui";
import { branding, products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore CirklX reels, graphics, product visuals and brand identity work.",
};
const stats = [
  ["5M+", "Total views for clients"],
  ["2.5K+", "Videos & creatives delivered"],
  ["100+", "Brands & creators served"],
];
export default function WorkPage() {
  return (
    <>
      <PageHero
        title="We've generated value"
        accent="for our clients"
        description="Your brand deserves content that performs. Here's a selection of work created for ambitious local brands and creators."
      />
      <section className="bg-[#f4f2ed] py-16">
        <div className="container-x grid gap-8 text-center md:grid-cols-3">
          {stats.map(([n, l]) => (
            <div
              key={n}
              className="border-b border-black/10 pb-7 last:border-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <strong className="serif text-5xl">{n}</strong>
              <p className="mt-3 text-sm text-black/55">{l}</p>
            </div>
          ))}
        </div>
      </section>
      <WorkSection title="Featured" accent="Reels" fullBleed>
        <FeaturedReels />
      </WorkSection>
      <WorkSection title="Graphics" fullBleed>
        <GraphicsShowcase showViewAll={false} />
      </WorkSection>
      <WorkSection
        title="Product"
        subtitle="Stunning product visuals that convert"
        fullBleed
      >
        <MediaRail
          kind="product"
          controls={false}
          items={products.map((src, i) => ({
            src,
            alt: `Product photography ${i + 1}`,
            label: [
              "Studio",
              "3D Render",
              "Photography",
              "Studio",
              "3D Render",
            ][i],
          }))}
        />
      </WorkSection>
      <WorkSection
        title="Branding"
        subtitle="Complete identity systems built to scale"
      >
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {branding.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[1.44] overflow-hidden rounded-2xl"
            >
              <Image
                src={src}
                alt={`Brand identity project ${i + 1}`}
                fill
                loading="eager"
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <span className="absolute bottom-2 left-2 rounded-full bg-[#d6ff01] px-2 py-1 text-[8px] font-semibold sm:bottom-3 sm:left-3 sm:px-3 sm:text-[10px]">
                VIEW PROJECT
              </span>
            </div>
          ))}
        </div>
      </WorkSection>
      <GrowthImpact />
    </>
  );
}
function WorkSection({
  title,
  accent,
  subtitle,
  children,
  fullBleed = false,
}: {
  title: string;
  accent?: string;
  subtitle?: string;
  children: React.ReactNode;
  fullBleed?: boolean;
}) {
  return (
    <section className="overflow-hidden bg-[#f4f2ed] pb-24">
      <div className="container-x">
        <SectionTitle className="text-center">
          {title} {accent && <span className="serif">{accent}</span>}
        </SectionTitle>
        {subtitle && (
          <p className="mt-3 text-center text-[11px] text-black/45">
            {subtitle}
          </p>
        )}
      </div>
      <div className={`mt-12 ${fullBleed ? "w-full" : "container-x"}`}>
        {children}
      </div>
    </section>
  );
}
