"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";

// Positions and rotations from the service-page tag composition in Figma.
const tags = [
  ["Design System", false, 157, 0, -5.12],
  ["Dashboard", true, 256, 52, 15.25],
  ["Wireframe Design", true, 304, 174, -5.12],
  ["Mobile App Design", false, 320, 11, -5.12],
  ["Product Design", true, 622, 61, 15.25],
  ["UX/UI Design", false, 171, 161, -5.12],
  ["Product Photoshoot", true, 447, 123, 15.25],
  ["Landing Page", false, 104, 59, -5.12],
  ["Brand Identity", true, 634, 135, 10.93],
  ["UI Design", false, 380, 49, -24.73],
  ["Video Shoot", false, 320, 124, 6.52],
  ["Video Editing", true, 170, 93, 15.25],
  ["Photo Shoot", false, 501, 83, 15.25],
  ["Website Design", true, 0, 152, -5.12],
] as const;

export function ProjectTags() {
  const bounds = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  return <section className="service-tags overflow-hidden text-center">
    <div className="container-x">
      <h2 className="text-[30px] font-semibold leading-tight tracking-[-.035em] md:text-[48px]">Let&apos;s Create an Amazing<br /><span className="serif">Project Together!</span></h2>
      <div ref={bounds} className="project-tags-stage mx-auto mt-10 md:mt-16" aria-label="Our creative services">
        {tags.map(([label, active, x, y, rotation], index) => <motion.span
          key={label}
          className={`project-tag ${active ? "project-tag--lime" : ""}`}
          style={{ left: `${x / 8.3}%`, top: `${(y + 20) / 2.8}%` }}
          initial={reducedMotion ? false : { y: -160, opacity: 0, rotate: rotation - 25 }}
          whileInView={{ y: 0, opacity: 1, rotate: rotation }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 120, damping: 11, delay: reducedMotion ? 0 : index * 0.055 }}
          drag={!reducedMotion}
          dragConstraints={bounds}
          dragElastic={0.08}
          whileDrag={{ scale: 1.06, zIndex: 20, cursor: "grabbing" }}
        >{label}</motion.span>)}
      </div>
    </div>
  </section>;
}
