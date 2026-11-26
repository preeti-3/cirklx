import Image from "next/image";
import Link from "next/link";

import { graphics } from '@/lib/content';

function GraphicCard({ src, copy }: { src: string; copy: number }) {
  return <article className="graphic-card relative h-[387px] w-[280px] shrink-0 overflow-hidden rounded-[20px] border border-black/10 bg-white sm:h-[446px] sm:w-[323px]">
    <div className="graphic-art absolute inset-x-[10px] top-[10px] h-[329px] overflow-hidden rounded-[20px] sm:inset-x-[11px] sm:top-[11px] sm:h-[379px]">
      <Image src={src} alt={`CirklX portfolio graphic ${copy + 1}`} fill sizes="(max-width: 640px) 46vw, 299px" className="object-cover" />
    </div>
    <div className="graphic-actions absolute inset-x-[10px] bottom-[11px] flex h-6 items-center justify-between opacity-40 sm:inset-x-[11px] sm:bottom-[16px]">
      <div className="flex items-center gap-[9px]">
        <Image src="/figma/exact/graphic-like.svg" alt="Like" width={24} height={24} />
        <Image src="/figma/exact/graphic-comment.svg" alt="Comment" width={24} height={24} />
        <Image src="/figma/exact/graphic-share.svg" alt="Share" width={24} height={24} />
      </div>
      <span className="grid size-6 place-items-center overflow-hidden"><Image src="/figma/exact/graphic-save.svg" alt="Save" width={16} height={20} /></span>
    </div>
  </article>;
}

export function GraphicsShowcase({ showViewAll = true }: { showViewAll?: boolean }) {
  return <>
    <div className="graphics-slider continuous-slider touch-slider" role="region" aria-label="Portfolio graphics — swipe to browse" tabIndex={0}>
      <div className="continuous-track continuous-track--graphics">
        {[0, 1].map(group => <div key={group} data-copy={group} className="continuous-group gap-[21px] pr-[21px]">
          {graphics.map((src, index) => <GraphicCard key={`${group}-${index}`} src={src} copy={index} />)}
        </div>)}
      </div>
    </div>
    {showViewAll && <div className="sm:mt-12.5 mt-10 text-center">
      <Link href="/work" className="inline-flex sm:py-3.5 py-2.5 text-sm items-center gap-2 rounded-full border border-[#15140f] bg-[#d6ff01] px-[23px] sm:text-base font-semibold shadow-[0_0_26px_rgba(214,255,1,.15)] transition hover:-translate-y-0.5 hover:bg-white">
        View All <Image src="/figma/exact/arrow-up-right.svg" alt="" width={16} height={16} />
      </Link>
    </div>}
  </>;
}
