"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, Check } from "lucide-react";
import { contact } from "@/content/site";
import { ease } from "@/lib/motion";

/** Requirement options exactly as on the live form, grouped so the form itself maps the ecosystem. */
const groups: { label: string; options: string[] }[] = [
  { label: "Digital", options: ["Digital Marketing", "Logo Design", "Web Development", "SEO", "SEM", "Social Media", "Instagram Marketing", "Lead Generation"] },
  { label: "Technology", options: ["SaaS", "AI Automation", "WhatsApp Solutions", "Data Solutions"] },
  { label: "Services", options: ["Water Pumps", "Borewell", "CCTV", "Travels", "Interiors", "Architecture", "Startup Consulting"] },
  { label: "Something else", options: ["Other"] },
];

const field =
  "peer w-full rounded-md border border-line-strong bg-white/70 px-4 pb-2.5 pt-6 text-[1rem] outline-none transition-[border-color,box-shadow] duration-200 placeholder-transparent focus:border-red focus:shadow-[0_0_0_4px_rgb(200_16_46/0.12)]";
const label =
  "pointer-events-none absolute left-4 top-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-charcoal-soft";

/**
 * No form backend exists yet, so submitting composes the enquiry in the visitor's email app,
 * addressed to the published email. Swap `onSubmit` for a real endpoint when one exists.
 */
export function EnquiryForm() {
  const params = useSearchParams();
  const initial = params.get("need");
  const [need, setNeed] = useState<string>(
    initial && contact.requirements.includes(initial) ? initial : "",
  );
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Name: ${f.get("name")}`,
      `Phone: ${f.get("phone")}`,
      `Email: ${f.get("email")}`,
      `Business / Company: ${f.get("company") || "-"}`,
      `Requirement: ${need || "-"}`,
      "",
      `${f.get("message") || ""}`,
    ].join("\n");
    const subject = `Enquiry — ${need || "Sathya Enterprises"}`;
    window.location.href = `mailto:${contact.email.value}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-10" noValidate={false}>
      <fieldset>
        <legend className="t-eyebrow mb-5 text-red-deep">01 — Which part of the ecosystem do you need?</legend>
        <div className="space-y-5">
          {groups.map((g) => (
            <div key={g.label}>
              <p className="mb-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-charcoal-soft">{g.label}</p>
              <div className="flex flex-wrap gap-2">
                {g.options.map((o) => {
                  const on = need === o;
                  return (
                    <label
                      key={o}
                      className={`relative inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-[0.88rem] font-bold transition-[background-color,color,border-color] duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-red ${
                        on ? "border-red bg-red text-white" : "border-line-strong hover:border-red hover:text-red"
                      }`}
                    >
                      <input
                        type="radio"
                        name="requirement"
                        value={o}
                        checked={on}
                        onChange={() => setNeed(o)}
                        className="sr-only"
                      />
                      {on && <Check aria-hidden className="h-3.5 w-3.5" />}
                      {o}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="t-eyebrow mb-5 text-red-deep">02 — About you</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { name: "name", label: "Name", type: "text", auto: "name", required: true },
            { name: "phone", label: "Phone", type: "tel", auto: "tel", required: true },
            { name: "email", label: "Email", type: "email", auto: "email", required: true },
            { name: "company", label: "Business / Company", type: "text", auto: "organization", required: false },
          ].map((f) => (
            <div key={f.name} className="relative">
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                autoComplete={f.auto}
                required={f.required}
                placeholder={f.label}
                className={field}
              />
              <label htmlFor={f.name} className={label}>
                {f.label}
                {f.required && <span className="text-red"> *</span>}
              </label>
            </div>
          ))}
          <div className="relative sm:col-span-2">
            <textarea id="message" name="message" rows={5} placeholder="Message" className={`${field} resize-y`} />
            <label htmlFor="message" className={label}>
              Message
            </label>
          </div>
        </div>
      </fieldset>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-red px-8 py-4 font-display text-[1rem] font-extrabold tracking-[0.04em] text-white transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-gold hover:text-charcoal"
        >
          SEND ENQUIRY
          <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
        <p className="max-w-[36ch] text-[0.82rem] text-charcoal-soft">
          Opens your email app with the enquiry addressed to {contact.email.value}.
        </p>
      </div>

      <AnimatePresence>
        {sent && (
          <m.p
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: ease.out }}
            className="rounded-md bg-gold-light px-5 py-4 text-[0.92rem]"
          >
            Your email app should have opened with the enquiry. If it didn&apos;t, write to{" "}
            <a className="font-bold text-red underline" href={`mailto:${contact.email.value}`}>
              {contact.email.value}
            </a>
            .
          </m.p>
        )}
      </AnimatePresence>
    </form>
  );
}
