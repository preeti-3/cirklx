"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function BlogShare() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }
  return <div className="flex flex-wrap items-center gap-3 border-y border-black/10 py-5">
    <span className="text-sm text-black/55">Share this article</span>
    <button type="button" onClick={copy} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-black/10 px-4 text-sm font-medium transition hover:bg-[#d6ff01]">{status === "copied" ? <Check size={16} /> : <Copy size={16} />}{status === "copied" ? "Link copied" : "Copy link"}</button>
    <span role="status" className="text-sm text-black/60">{status === "error" ? "Copy the page address from your browser to share it." : status === "copied" ? "Ready to share." : ""}</span>
  </div>;
}
