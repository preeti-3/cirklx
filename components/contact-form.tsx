"use client";

import emailjs from "@emailjs/browser";
import { ArrowUpRight } from "lucide-react";
import { FormEvent, useState } from "react";

const config = { service: "service_7qtps0b", template: "template_fksv2e8", key: "lyPkEMppL8Us1JDY2" };
export function ContactForm({ initialSubject = "" }: { initialSubject?: string }) {
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setStatus("sending");
    const form = e.currentTarget;
    try { await emailjs.sendForm(config.service, config.template, form, { publicKey: config.key }); form.reset(); setStatus("sent"); }
    catch { setStatus("error"); }
  }
  return <form onSubmit={submit} className="card grid gap-5 p-5 sm:p-6" aria-describedby="form-status">
    <Field label="Full Name" name="name" placeholder="CirklX" />
    <Field label="Email Address" name="email" type="email" placeholder="hello@cirklx.com" />
    <Field label="Subject" name="subject" placeholder="Regarding Project" defaultValue={initialSubject} />
    <label className="grid gap-2 text-sm font-medium">How may we assist you?<textarea required name="message" rows={5} placeholder="Tell us more...." className="resize-none rounded-xl border border-black/10 px-3 py-3 font-normal outline-none focus:border-black" /></label>
    <button disabled={status==="sending"} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#15140f] bg-[#d6ff01] text-sm font-semibold disabled:opacity-60">{status==="sending" ? "Sending..." : "Submit"}<ArrowUpRight size={16}/></button>
    <p id="form-status" role="status" className={`text-center text-sm ${status==="error" ? "text-red-700" : "text-green-700"}`}>{status==="sent" ? "Thanks — your message has been sent." : status==="error" ? "The message could not be sent. Please try again or email us directly." : ""}</p>
  </form>;
}
function Field({label,name,type="text",placeholder,defaultValue}:{label:string;name:string;type?:string;placeholder:string;defaultValue?:string}) { return <label className="grid min-w-0 gap-2 text-sm font-medium">{label}<input required name={name} type={type} placeholder={placeholder} defaultValue={defaultValue} className="h-12 min-w-0 rounded-xl border border-black/10 px-3 text-base font-normal outline-none focus:border-black" /></label>; }
