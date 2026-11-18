import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { graphics } from "@/lib/content";

const graphicNames = [
  "Gearix", "Easter Collection", "Geeta Syrup", "Easter Decor", "Burger Wings", "Geeta Syrup",
  "Gearix", "Geeta Syrup", "Geeta Syrup", "Burger Wings", "Easter", "Geeta Syrup", "Gearix",
  "Easter", "Burger Wings", "BSM Uniex Salon", "Hydra Facial", "Kavya", "CirklX", "Jewellery Box",
  "Tsuki", "Hisar College", "Tsuki", "Haircut & Beard",
];

export function GraphicsShowcase({ showViewAll = true }: { showViewAll?: boolean }) {
  return <>
    <div className="continuous-slider">
      <div className="continuous-track continuous-track--graphics">
        {[0, 1].map(copy => <div className="continuous-group gap-5 pr-5 md:gap-6 md:pr-6" key={copy}>
          {graphics.map((src,index)=><article key={`${copy}-${src}`} className="group min-w-[250px] md:min-w-[280px]">
            <div className="relative aspect-[14/19] overflow-hidden rounded-[24px] bg-white">
              <Image src={src} alt={`${graphicNames[index]} social media design`} fill sizes="(max-width: 768px) 250px, 280px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <p className="mt-2.5 text-center text-[11px] font-medium tracking-wide text-black/75">{graphicNames[index]}</p>
          </article>)}
        </div>)}
      </div>
    </div>
    {showViewAll && <div className="mt-10 text-center"><Link href="/work" className="inline-flex h-11 items-center gap-2 rounded-full border border-[#15140f] bg-[#d6ff01] px-6 text-sm font-semibold">View All <ArrowUpRight size={15}/></Link></div>}
  </>;
}
