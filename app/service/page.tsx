import type { Metadata } from "next";
import Image from "next/image";
import { ProjectTags } from "@/components/project-tags";
import { Cta, PageHero, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Social media marketing, optimization, video, design, branding and web services by CirklX.",
};

const pillars = [
  [
    "/service1.webp",
    "Social Media Marketing",
    "Grow your following, the smart way. End-to-end management of your Instagram, Facebook & YouTube — content planning, posting, and engagement strategies built to grow real followers and real reach.",
  ],
  [
    "/service2.webp",
    "Social Media Optimization",
    "Make every profile work harder. We optimize your bios, hashtags, posting times, and content structure so your profiles get discovered by the right audience, organically.",
  ],
  [
    "/service3.webp",
    "Search Engine Optimization",
    "Get found before your competitors do. On-page and local SEO to help your website and business rank higher on Google — more visibility, more traffic, more customers.",
  ],
] as const;
const services = [
  [
    "/icons/services/google-business.png",
    "Google My Business (GMB)",
    "Management: Own your spot on Google Maps. We set up and optimize your GMB profile — reviews, photos, posts, and local keywords — so customers find you first when searching nearby.",
  ],
  [
    "/icons/services/shopify.png",
    "Shopify Website Development",
    "Your store, built to convert. Custom Shopify stores designed for speed, mobile shopping, and easy checkout — built to turn visitors into paying customers.",
  ],
  [
    "/icons/services/ai-video.png",
    "AI-Powered Videos",
    "The future of content, today. AI-generated and AI-enhanced videos — faster production, unique visuals, and content styles that stand out from typical edits.",
  ],
  [
    "/icons/services/graphic-design.png",
    "Graphic Design",
    "Visuals that stop the scroll. Posts, carousels, banners, and brand visuals — designed to match your brand identity and grab attention instantly.",
  ],
  [
    "/icons/services/video-editing.png",
    "Video Editing",
    "Raw footage, reel-ready results. Fast, trend-driven editing with hooks, captions, transitions, and sound — turning your footage into scroll-stopping content.",
  ],
  [
    "/icons/services/branding.png",
    "Branding",
    "Build a brand people remember. Logos, color palettes, tone of voice, and visual identity — we craft a brand that's consistent, recognizable, and built to last.",
  ],
  [
    "/icons/services/product-photography.png",
    "Product Photoshoot",
    "Make your products impossible to ignore. Professional product photography that highlights every detail — perfect for e-commerce, catalogs, and social media.",
  ],
  [
    "/icons/services/ui-ux-design.png",
    "UI/UX Design",
    "Design that feels as good as it looks. Website and app interfaces designed for smooth navigation and better user experience — because good design keeps people coming back.",
  ],
  [
    "/icons/services/video-shoot.png",
    "Video Shoot",
    "Content starts with a great shoot. Professional video shoots — DSLR or mobile — for brand content, influencer collabs, product features, and social media reels.",
  ],
] as const;

export default function ServicePage() {
  return (
    <>
      <PageHero
        title="Our"
        accent="Services"
        description="From TikTok to Reels to Shorts — we turn one simple idea into videos with hooks, captions, energy, and strategy."
      />

      <section className="service-pillars bg-[#f4f2ed]">
        <div className="container-x">
          <div className="service-pillar-grid grid gap-12 md:grid-cols-3">
            {pillars.map(([src, title, copy]) => (
              <article key={title} className="relative min-w-0">
                <div className="process-image relative aspect-[1.34] overflow-hidden rounded-[20px]">
                  <Image
                    src={src}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                </div>
                <h2 className="mt-5 text-[20px] font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-[1.55] text-black/55">
                  {copy}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Cta />
          </div>
        </div>
      </section>

      <section className="service-grid overflow-hidden bg-[#f4f2ed]">
        <div className="container-x">
          <SectionTitle className="text-center">
            Services I <span className="serif">Provide</span>
          </SectionTitle>
          <div className="rail mt-12 flex gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {services.map(([icon, title, copy]) => (
              <article
                key={title}
                className="min-w-[86%] rounded-[16px] bg-white p-6 shadow-[0_4px_15px_rgba(0,0,0,.045)] sm:min-w-[48%] lg:min-w-0"
              >
                <div className="flex size-14 items-center justify-start">
                  <Image src={icon} alt="" width={56} height={50} unoptimized loading="eager" className="h-[50px] w-14 object-contain" />
                </div>
                <h3 className="mt-4 text-[17px] font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-[1.55] text-black/55">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProjectTags />
    </>
  );
}
