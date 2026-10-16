"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useArrival } from "@/lib/useArrival";
import { brand, businessesIn, contact, divisions, socials, whatsappHref } from "@/content/site";
import { CookieSettingsButton } from "@/components/layout/CookieConsent";
import { SocialIcon } from "@/components/layout/SocialIcon";
import logo from "@/assets/brand/logo.webp";

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

const PAGES = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];

const link = "transition-colors hover:text-red";

// Always shown in the footer. Until a profile URL is set in site.ts, an icon falls back to the
// platform's home page; WhatsApp opens a chat with the business number.
const FOOTER_SOCIALS = ["instagram", "facebook", "linkedin", "whatsapp"];
const FALLBACK: Record<string, string> = {
  instagram: "https://www.instagram.com/sathyaenterprisesdigital/",
  facebook: "https://www.facebook.com/",
  linkedin: "https://www.linkedin.com/company/sathya-enterprises-india/home/",
};
const SOCIAL_LINKS = socials
  .filter((s) => s.url || FOOTER_SOCIALS.includes(s.id))
  .map((s) => ({ ...s, href: s.url || (s.id === "whatsapp" ? whatsappHref() : FALLBACK[s.id]) }))
  .filter((s) => s.href);

/**
 * Site map in the footer: the brand and a way to get in touch, the company pages, then every
 * division with the businesses it runs — so every page on the site is one click away from any other.
 * On arrival the red top edge draws across and the columns lift in one after another (useArrival + .rise).
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  // The footer is short and ends the page, so it counts as arrived once a little of it is in view.
  const arrived = useArrival(ref, "0px 0px -10% 0px");

  return (
    <footer ref={ref} data-arrived={arrived} className="relative overflow-hidden bg-gold-light py-16 text-ink md:py-24">
      <div aria-hidden className="rise-line absolute inset-x-0 top-0 h-2 bg-red" />
      <div aria-hidden className="pointer-events-none absolute -right-48 -top-48 h-192 w-3xl bg-[radial-gradient(closest-side,rgb(200_16_46/0.1),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-48 h-192 w-3xl bg-[radial-gradient(closest-side,rgb(244_197_66/0.3),transparent)]" />

      <div className="container-x relative z-10">
        {/* Brand · pages · contact */}
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-12">
          <div className="rise space-y-6 md:col-span-6 lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Sathya Enterprises — home">
              <Image src={logo} alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-lg bg-white object-contain p-1" />
              <span className="font-display text-xl font-extrabold uppercase tracking-tight md:text-2xl">
                Sathya <span className="text-red">Enterprises</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm font-medium leading-relaxed text-ink-soft">{brand.summary}</p>
            <p className="font-mono text-[0.72rem] font-bold tracking-[0.14em] text-red">{brand.tagline}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-red px-6 py-3 text-sm font-bold text-ivory shadow-2 transition-colors hover:bg-red-deep"
            >
              Start a Conversation
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>

          <nav aria-label="Company" className="rise md:col-span-2 lg:col-span-3" style={step(1)}>
            <h2 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
              <span aria-hidden className="h-2 w-2 rounded-full bg-gold" /> Company
            </h2>
            <ul className="space-y-3 text-sm font-medium text-ink-soft">
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className={link}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="rise md:col-span-4" style={step(2)}>
            <h2 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
              <span aria-hidden className="h-2 w-2 rounded-full bg-red" /> Get in touch
            </h2>
            <address className="space-y-3 text-sm font-medium not-italic text-ink-soft">
              <p>{contact.location}</p>
              <p>
                <a href={`mailto:${contact.email.value}`} className={link}>
                  {contact.email.value}
                </a>
              </p>
              {/* The phone number is still a placeholder on the live site — shown once it's real. */}
              {!contact.phone.placeholder && (
                <p>
                  <a href={`tel:${contact.phone.value.replace(/\s/g, "")}`} className={link}>
                    {contact.phone.value}
                  </a>
                </p>
              )}
            </address>
            {SOCIAL_LINKS.length > 0 && (
              <ul aria-label="Follow us" className="mt-6 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-white/60 text-ink transition-[background-color,color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-red hover:bg-red hover:text-ivory"
                    >
                      <SocialIcon id={s.id} className="h-4.5 w-4.5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Every division and its businesses */}
        <nav aria-label="Divisions" className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ink/15 pt-12 lg:grid-cols-4">
          {divisions.map((d, i) => (
            <div key={d.id} className="rise" style={step(3 + i)}>
              <h2 className="mb-5 text-sm font-bold uppercase tracking-widest">
                <Link href={d.href} className={`group inline-flex items-center gap-2 ${link}`}>
                  <span aria-hidden className={`h-2 w-2 rounded-full ${i % 2 ? "bg-gold" : "bg-red"}`} />
                  {d.name.charAt(0) + d.name.slice(1).toLowerCase()}
                  <ArrowUpRight aria-hidden className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </h2>
              <ul className="space-y-3 text-sm font-medium text-ink-soft">
                {businessesIn(d.id, { includeAlso: false }).map((b) => (
                  <li key={b.slug}>
                    <Link href={d.href} className={link}>
                      {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div style={step(7)} className="rise mt-14 flex flex-col items-center justify-between gap-6 border-t border-ink/15 pt-8 md:flex-row">
          <p className="text-sm font-medium text-ink-soft">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-ink-soft">
            {LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className={link}>
                {l.label}
              </Link>
            ))}
            <CookieSettingsButton className={link} />
          </div>
        </div>
      </div>
    </footer>
  );
}
