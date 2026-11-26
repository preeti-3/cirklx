"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, type RefObject } from "react";

// Figma composition: label, accent, rotation, horizontal and vertical position.
const tags = [
  ["Design System", false, -5.12, 157, 0],
  ["Dashboard", true, 15.25, 256, 52],
  ["Wireframe Design", true, -5.12, 304, 174],
  ["Mobile App Design", false, -5.12, 320, 11],
  ["Product Design", true, 15.25, 662, 61],
  ["UX/UI Design", false, -5.12, 171, 161],
  ["Product Photoshoot", true, 15.25, 487, 123],
  ["Landing Page", false, -5.12, 104, 59],
  ["Brand Identity", true, 10.93, 674, 135],
  ["UI Design", false, -24.73, 400, 49],
  ["Video Shoot", false, 6.52, 330, 124],
  ["Video Editing", true, 15.25, 180, 93],
  ["Photo Shoot", false, 15.25, 521, 83],
  ["Website Design", true, -5.12, 0, 152],
] as const;

function ProjectTag({ tag, bounds }: { tag: (typeof tags)[number]; bounds: RefObject<HTMLDivElement | null> }) {
  const [label, active, rotation, left, top] = tag;
  const anchor = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.6 });

  useEffect(() => {
    const reset = () => { x.set(0); y.set(0); };
    if (reducedMotion) { reset(); return; }
    const repel = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || dragging.current || !anchor.current) return;
      // The anchor excludes the repulsion transform, preventing spring feedback.
      const rect = anchor.current.getBoundingClientRect();
      const dx = rect.left + rect.width / 2 - event.clientX;
      const dy = rect.top + rect.height / 2 - event.clientY;
      const distance = Math.hypot(dx, dy);
      if (distance < 110 && distance > 0) {
        const force = 42 * (1 - distance / 110);
        x.set(dx / distance * force);
        y.set(dy / distance * force);
      } else reset();
    };
    window.addEventListener("pointermove", repel, { passive: true });
    document.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("pointermove", repel);
      document.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
    };
  }, [reducedMotion, x, y]);

  return <motion.div className="project-tag-slot" style={{ left: `${left / 8.8}%`, top: `${(top + 20) / 2.8}%` }} variants={{
    hidden: { opacity: 0, y: 30, scale: 0.85 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] } },
  }}>
    <motion.div ref={anchor} drag dragConstraints={bounds} dragElastic={0} dragMomentum={false}
      onDragStart={() => { dragging.current = true; x.set(0); y.set(0); }}
      onDragEnd={() => { dragging.current = false; }}
      whileDrag={{ zIndex: 20, scale: 1.06 }} className="project-tag-drag">
      <motion.span className={"project-tag " + (active ? "project-tag--lime" : "")}
        style={{ x: springX, y: springY, rotate: rotation }}>{label}</motion.span>
    </motion.div>
  </motion.div>;
}

export function ProjectTags() {
  const bounds = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  return <section className="service-tags overflow-hidden text-center">
    <div className="container-x">
      <h2 className="text-[30px] font-semibold leading-tight tracking-[-.035em] md:text-[48px]">Let&apos;s Create an Amazing<br /><span className="serif">Project Together!</span></h2>
      <motion.div ref={bounds} className="project-tags-stage mx-auto mt-10 md:mt-16" aria-label="Our creative services"
        initial={reducedMotion ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: reducedMotion ? 0 : 0.05, delayChildren: reducedMotion ? 0 : 0.1 } } }}>
        {tags.map(tag => <ProjectTag key={tag[0]} tag={tag} bounds={bounds} />)}
      </motion.div>
    </div>
  </section>;
}
