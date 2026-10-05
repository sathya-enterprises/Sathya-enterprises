import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { faqLd, itemListLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  brand,
  builtToGrow,
  businessBySlug,
  businessHref,
  businesses,
  contact,
  divisions,
  faqs,
  growthSteps,
  lookingAhead,
  moneySystem,
  testimonials,
} from "@/content/site";
import { GrowthSteps } from "@/components/home/GrowthSteps";
import { DivisionStack } from "@/components/home/DivisionStack";
import { Ticker } from "@/components/ui/Ticker";
import { CountUp } from "@/components/motion/CountUp";
import { meetingPhoto, teamPhoto, workshopPhoto } from "@/content/photos";
import { MoneySystem } from "@/components/home/MoneySystem";
import { BuiltToGrow } from "@/components/home/BuiltToGrow";
import { Testimonials } from "@/components/home/Testimonials";
import { LookingAhead } from "@/components/home/LookingAhead";
import { Faq } from "@/components/home/Faq";

export const metadata: Metadata = pageMeta({
  title: "Sathya Enterprises — Digital, Technology, Products & Services | Bengaluru",
  description: `${brand.positioning} ${brand.summary}`,
  path: "/",
  absoluteTitle: true,
});

const h2 = "mt-3 font-display text-[clamp(1.9rem,5vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em]";
/* Buttons: full-width thumb targets on phones, natural width from sm up. */
const button =
  "group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-bold transition-[background-color,transform] duration-300 hover:-translate-y-0.5 sm:w-auto sm:py-3.5";
const redButton = `${button} bg-red text-white shadow-[0_12px_30px_-10px_rgb(200_16_46/0.7)] hover:bg-red-deep`;
const goldButton = `${button} bg-gold text-charcoal hover:bg-ivory`;

export default function Home() {
  const steps = growthSteps.map((s) => ({
    verb: s.verb,
    line: s.line,
    links: s.slugs.map((slug) => ({ href: businessHref(businessBySlug[slug]), label: businessBySlug[slug].name })),
  }));
  const stages = moneySystem.map((s) => ({
    stage: s.stage,
    items: s.items,
    links: s.slugs.map((slug) => ({ href: businessHref(businessBySlug[slug]), label: businessBySlug[slug].short })),
  }));

  return (
    <div className="on-water">
      <JsonLd data={itemListLd("Divisions", divisions.map((d) => ({ name: d.name, path: d.href })))} />
      <JsonLd data={faqLd(faqs)} />

      {/* Intro — deliberately quiet: name, one line, two actions. The whales are the only picture. */}
      <section
        aria-labelledby="home-title"
        className="container-x flex min-h-[100svh] flex-col justify-center pt-[var(--header-h)] pb-16 sm:pb-20"
      >
        <p className="enter t-eyebrow text-gold" style={{ ["--i" as string]: 0 }}>
          {brand.tagline}
        </p>
        <h1
          id="home-title"
          style={{ ["--i" as string]: 1 }}
          className="enter mt-4 font-display text-[clamp(2.75rem,12vw,6.5rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
        >
          Sathya <span className="text-gold">Enterprises</span>
        </h1>
        <p className="enter mt-5 max-w-[34ch] text-[1.05rem] leading-snug text-ivory/90 sm:text-[1.3rem]" style={{ ["--i" as string]: 2 }}>
          {brand.positioning}
        </p>
        <div className="enter mt-8 flex flex-col gap-3 sm:flex-row" style={{ ["--i" as string]: 3 }}>
          <Link href="#divisions" className={redButton}>
            Explore our divisions
            <ArrowDown aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </Link>
          <Link href="/contact" className={goldButton}>
            Contact us
          </Link>
        </div>
      </section>

      <Ticker label="Our businesses" items={businesses.map((b) => ({ label: b.name, href: businessHref(b) }))} double />

      {/* Who we are — an immersive full-screen photo with the story set on it like a cover. The panel opens
          out from the page gutter to full bleed as it scrolls in; the photo drifts slowly behind the text. */}
      <section aria-labelledby="who-title" className="photo-expand relative isolate my-10 flex min-h-[100svh] items-end overflow-hidden sm:my-16 lg:items-center">
        <Image src={teamPhoto.src} alt={teamPhoto.alt} fill placeholder="blur" sizes="100vw" className="photo-parallax -z-10 object-cover" />
        {/* Darken toward the text: from the bottom on phones, from the left on wide screens */}
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-t from-sea-abyss via-sea-abyss/85 to-sea-abyss/35 lg:bg-linear-to-r lg:from-sea-abyss/95 lg:via-sea-abyss/75 lg:to-sea-abyss/15"
        />

        <div className="container-x py-20 sm:py-28">
          <div className="reveal max-w-[40rem]">
            <p className="t-eyebrow text-gold">Who we are</p>
            <h2 id="who-title" className="mt-4 font-display text-[clamp(2.4rem,8vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
              More than a business. <span className="text-gold">A growing ecosystem.</span>
            </h2>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-ivory/90 sm:text-[1.15rem]">{brand.whoWeAre}</p>
          </div>

          <dl className="reveal-stagger mt-10 grid max-w-[40rem] grid-cols-3 border-t border-white/25 sm:mt-12">
            {(
              [
                [divisions.length, "Divisions"],
                [businesses.length, "Businesses"],
                [1, "Ecosystem"],
              ] as const
            ).map(([value, label]) => (
              <div key={label} className="flex flex-col-reverse border-white/25 pt-5 not-first:border-l not-first:pl-4 sm:not-first:pl-6">
                <dt className="mt-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ivory/75 sm:text-[0.72rem]">{label}</dt>
                <dd className="font-display text-[clamp(2.4rem,9vw,4rem)] font-extrabold leading-none text-gold">
                  <CountUp to={value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <GrowthSteps steps={steps} />

      {/* Divisions */}
      <section id="divisions" aria-labelledby="divisions-title" className="relative scroll-mt-[var(--header-h)]">
        <div className="container-x relative py-16 sm:py-24 lg:py-28">
          <div className="reveal flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
            <div>
              <p className="t-eyebrow text-gold">Our divisions</p>
              <h2 id="divisions-title" className={`${h2} max-w-[22ch]`}>
                Four divisions. <span className="text-gold">One connected ecosystem.</span>
              </h2>
            </div>
            <p className="max-w-[38ch] text-ivory/80">{brand.summary}</p>
          </div>
          <DivisionStack />
        </div>
      </section>

      <MoneySystem stages={stages} />

      <BuiltToGrow items={builtToGrow} photo={meetingPhoto} />

      <Testimonials items={testimonials} />

      <LookingAhead items={lookingAhead} photo={workshopPhoto} />

      <Faq items={faqs} />

      {/* Contact */}
      <section aria-labelledby="cta-title" className="container-x py-16 sm:py-24 lg:py-28">
        <div
          className="reveal-zoom edge-glow relative overflow-hidden rounded-lg border border-white/12 bg-sea-abyss/85 px-5 py-10 sm:px-10 sm:py-16 lg:px-14 lg:py-20"
          style={{ ["--edge-opacity" as string]: "1" }}
        >
          <div className="relative">
            <p className="t-eyebrow text-gold">Start a Conversation</p>
            <h2 id="cta-title" className="mt-3 font-display text-[clamp(2.4rem,9vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
              Let&apos;s build <span className="text-gold">what&apos;s next.</span>
            </h2>
            <p className="mt-5 max-w-[48ch] text-[1.05rem] text-ivory/85">{contact.intro}</p>
            <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
              <Link href="/contact" className={redButton}>
                Start a conversation
                <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <a href={`mailto:${contact.email.value}`} className="font-semibold text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold">
                {contact.email.value}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
