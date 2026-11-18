"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";

const items = [faqs[0], faqs[0], ...faqs.slice(2)];

export function HomeFaq() {
  const [open,setOpen]=useState(0);
  return <div className="grid gap-3.5">{items.map(([question,answer],index)=>{
    const active=open===index;
    return <div key={`${question}-${index}`} className={`overflow-hidden rounded-[16px] border transition ${active ? "border-transparent bg-white shadow-[0_4px_14px_rgba(0,0,0,.045)]" : "border-black/10 bg-transparent"}`}>
      <button type="button" onClick={()=>setOpen(active ? -1 : index)} aria-expanded={active} aria-controls={`faq-panel-${index}`} className="flex min-h-[72px] w-full items-center justify-between gap-5 px-6 text-left text-sm md:px-7 md:text-base"><span className={active ? "font-semibold" : "font-normal"}>{question}</span><span className={`text-2xl font-light transition-transform ${active ? "rotate-45" : ""}`}>+</span></button>
      <div id={`faq-panel-${index}`} className={`grid transition-[grid-template-rows] duration-300 ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><div className="overflow-hidden"><p className="px-6 pb-6 text-xs leading-[1.5] text-black/60 md:px-7 md:text-sm">{answer}</p></div></div>
    </div>;
  })}</div>;
}
