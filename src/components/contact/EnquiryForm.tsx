"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { contact } from "@/content/site";
import { ease } from "@/lib/motion";

/** Requirement options exactly as on the live form, grouped by division. */
const groups: { label: string; options: string[] }[] = [
  { label: "Digital", options: ["Digital Marketing", "Logo Design", "Web Development", "SEO", "SEM", "Social Media", "Instagram Marketing", "Lead Generation"] },
  { label: "Technology", options: ["SaaS", "AI Automation", "WhatsApp Solutions", "Data Solutions"] },
  { label: "Services", options: ["Water Pumps", "Borewell", "CCTV", "Travels", "Interiors", "Architecture", "Startup Consulting"] },
  { label: "Something else", options: ["Other"] },
];

const label = "mb-2 block text-[0.88rem] font-semibold text-ivory";
const field =
  "w-full rounded-md border border-white/25 bg-sea-abyss/60 px-4 py-3 text-[1rem] text-ivory outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-ivory/40 focus:border-gold focus:shadow-[0_0_0_3px_rgb(244_197_66/0.25)]";

const inputs = [
  { name: "name", label: "Name", type: "text", auto: "name", required: true, placeholder: "Your name" },
  { name: "phone", label: "Phone", type: "tel", auto: "tel", required: true, placeholder: "+91" },
  { name: "email", label: "Email", type: "email", auto: "email", required: true, placeholder: "you@company.com" },
  { name: "company", label: "Business / Company", type: "text", auto: "organization", required: false, placeholder: "Optional" },
];

/**
 * No form backend exists yet, so submitting composes the enquiry in the visitor's email app,
 * addressed to the published email. Swap `onSubmit` for a real endpoint when one exists.
 */
export function EnquiryForm() {
  const select = useRef<HTMLSelectElement>(null);
  // Pre-select from links like /contact?need=SEO. Done after mount so the whole form stays server-rendered.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("need");
    if (initial && select.current && contact.requirements.includes(initial)) select.current.value = initial;
  }, []);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const need = String(f.get("requirement") || "");
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
    <form onSubmit={onSubmit} className="[color-scheme:dark]">
      <div className="grid gap-5 sm:grid-cols-2">
        {inputs.map((f) => (
          <div key={f.name}>
            <label htmlFor={f.name} className={label}>
              {f.label}
              {f.required && <span className="text-gold"> *</span>}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              autoComplete={f.auto}
              required={f.required}
              placeholder={f.placeholder}
              className={field}
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label htmlFor="requirement" className={label}>
            What do you need?
          </label>
          <div className="relative">
            <select
              id="requirement"
              name="requirement"
              ref={select}
              defaultValue=""
              className={`${field} appearance-none pr-11`}
            >
              <option value="">Choose a service</option>
              {groups.map((g) => (
                <optgroup key={g.label} label={g.label}>
                  {g.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>
            Message
          </label>
          <textarea id="message" name="message" rows={5} placeholder="Tell us what you're building" className={`${field} resize-y`} />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-red px-7 py-3.5 font-bold text-white transition-colors duration-200 hover:bg-red-deep"
        >
          Send enquiry
          <ArrowUpRight aria-hidden className="h-4 w-4" />
        </button>
        <p className="text-[0.85rem] text-ivory/70">Opens your email app with the enquiry ready to send.</p>
      </div>

      <AnimatePresence>
        {sent && (
          <m.p
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: ease.out }}
            className="mt-6 border-l-2 border-gold pl-4 text-[0.92rem] text-ivory/90"
          >
            Your email app should have opened with the enquiry. If it didn&apos;t, write to{" "}
            <a className="font-bold text-gold underline" href={`mailto:${contact.email.value}`}>
              {contact.email.value}
            </a>
            .
          </m.p>
        )}
      </AnimatePresence>
    </form>
  );
}
