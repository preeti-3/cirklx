"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

type Item = { src: string; alt: string; video?: boolean; label?: string };
export function MediaRail({
  items,
  kind = "square",
  controls = true,
  centered = false,
}: {
  items: Item[];
  kind?: "reel" | "square" | "product" | "wide";
  controls?: boolean;
  centered?: boolean;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const move = (dir: number) =>
    rail.current?.scrollBy({
      left: dir * Math.min(420, rail.current.clientWidth * 0.82),
      behavior: "smooth",
    });
  useLayoutEffect(() => {
    if (centered && rail.current)
      rail.current.scrollLeft =
        (rail.current.scrollWidth - rail.current.clientWidth) / 2;
  }, [centered]);
  const size =
    kind === "reel"
      ? "min-w-[180px] sm:min-w-[240px] lg:min-w-[calc(25%-16px)] aspect-[9/16]"
      : kind === "wide"
        ? "min-w-[78vw] sm:min-w-[360px] lg:min-w-[calc(33.333%-14px)] aspect-[1.45]"
        : kind === "product"
          ? "min-w-[clamp(108px,21vw,300px)] aspect-[.9]"
          : centered
            ? "min-w-[clamp(116px,22vw,320px)] aspect-[.78]"
            : "min-w-[62vw] sm:min-w-[260px] lg:min-w-[calc(20%-17px)] aspect-[.78]";
  return (
    <div>
      <div
        ref={rail}
        className={`rail flex overflow-x-auto pb-2 ${centered ? "gap-3 md:gap-5" : "gap-4"}`}
      >
        {items.map((item, i) => (
          <figure
            key={`${item.src}-${i}`}
            className={`group relative overflow-hidden rounded-2xl bg-white ${size}`}
          >
            {item.video ? (
              <video
                className="h-full w-full object-cover"
                src={item.src}
                poster={`/thumb${(i % 9) + 1}.webp`}
                controls
                preload="none"
                playsInline
                aria-label={item.alt}
              />
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 72vw, 300px"
                className="object-cover transition duration-500 group-hover:scale-[1.025]"
              />
            )}
            {!item.video && item.label && (
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-[#d6ff01] px-3 py-1 text-[10px] font-semibold uppercase">
                {item.label}
              </figcaption>
            )}
            {item.video && (
              <span className="pointer-events-none absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white backdrop-blur-sm">
                <Play size={18} fill="currentColor" />
              </span>
            )}
          </figure>
        ))}
      </div>
      {controls && (
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => move(-1)}
            aria-label="Previous items"
            className="grid size-11 place-items-center rounded-full border border-black/10 bg-white"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => move(1)}
            aria-label="Next items"
            className="grid size-11 place-items-center rounded-full bg-white shadow-md"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
