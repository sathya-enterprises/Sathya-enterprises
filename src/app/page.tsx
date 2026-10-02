import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { itemListLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { brand, businessBySlug, businessHref, businesses, businessesIn, contact, divisions, growthSteps } from "@/content/site";
import { GrowthSteps } from "@/components/home/GrowthSteps";

export const metadata: Metadata = pageMeta({
  title: "Sathya Enterprises — Digital, Technology, Products & Services | Bengaluru",
  description: `${brand.positioning} ${brand.summary}`,
  path: "/",
  absoluteTitle: true,
});

const h2 = "mt-3 font-display text-[clamp(1.9rem,5vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em]";

export default function Home() {
  const steps = growthSteps.map((s) => ({
    verb: s.verb,
    line: s.line,
    links: s.slugs.map((slug) => ({ href: businessHref(businessBySlug[slug]), label: businessBySlug[slug].name })),
  }));

  return (
    <div className="on-water">
      <JsonLd data={itemListLd("Divisions", divisions.map((d) => ({ name: d.name, path: d.href })))} />

      {/* Intro */}
      <section aria-labelledby="home-title" className="container-x flex min-h-[86svh] flex-col justify-center pt-[var(--header-h)] pb-12">
        <p className="enter t-eyebrow text-gold" style={{ ["--i" as string]: 0 }}>{brand.tagline}</p>
        <h1 id="home-title" style={{ ["--i" as string]: 1 }} className="enter mt-4 font-display text-[clamp(2.6rem,11vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.045em]">
          Sathya <span className="text-gold">Enterprises</span>
        </h1>
        <p className="enter mt-5 max-w-[40ch] text-[clamp(1.05rem,2.6vw,1.35rem)] font-semibold leading-snug" style={{ ["--i" as string]: 2 }}>{brand.positioning}</p>
        <div className="enter mt-8 flex flex-wrap gap-3" style={{ ["--i" as string]: 3 }}>
          <Link href="#divisions" className="inline-flex items-center gap-2 rounded-full bg-red px-6 py-3.5 font-bold text-white hover:bg-red-deep">
            Explore our divisions
            <ArrowDown aria-hidden className="h-4 w-4" />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 font-bold text-charcoal hover:bg-ivory">
            Contact us
          </Link>
        </div>
      </section>

      {/* Who we are */}
      <section aria-labelledby="who-title" className="container-x py-16 sm:py-24">
        <div className="reveal max-w-3xl">
          <p className="t-eyebrow text-gold">Who we are</p>
          <h2 id="who-title" className={h2}>
            More than a business. <span className="text-gold">A growing ecosystem.</span>
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-ivory/85 sm:text-[1.15rem]">{brand.whoWeAre}</p>
        </div>
        <dl className="reveal-stagger mt-12 flex max-w-3xl divide-x divide-white/20">
          {[
            [String(divisions.length), "Divisions"],
            [String(businesses.length), "Businesses"],
            ["1", "Ecosystem"],
          ].map(([value, label]) => (
            <div key={label} className="flex flex-1 flex-col-reverse px-4 first:pl-0 sm:px-8">
              <dt className="mt-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ivory/70 sm:text-[0.72rem]">{label}</dt>
              <dd className="font-display text-[clamp(2.4rem,8vw,4rem)] font-extrabold leading-none text-gold">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <GrowthSteps steps={steps} />

      {/* Divisions */}
      <section id="divisions" aria-labelledby="divisions-title" className="container-x scroll-mt-[var(--header-h)] py-16 sm:py-24">
        <div className="reveal">
          <p className="t-eyebrow text-gold">Our divisions</p>
          <h2 id="divisions-title" className={`${h2} max-w-[22ch]`}>
            Four divisions. <span className="text-gold">One connected ecosystem.</span>
          </h2>
        </div>
        <ul className="mt-10 border-b border-white/20">
          {divisions.map((d) => (
            <li key={d.id} className="reveal-left grid gap-4 border-t border-white/20 py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
              <div>
                <p className="font-mono text-[0.72rem] font-bold tracking-[0.16em] text-red">{d.index}</p>
                <h3 className="mt-1 font-display text-[clamp(2rem,6vw,3rem)] font-extrabold leading-none tracking-[-0.035em]">
                  <Link href={d.href} className="group inline-flex items-center gap-2 hover:text-gold">
                    {d.name.charAt(0) + d.name.slice(1).toLowerCase()}
                    <ArrowUpRight aria-hidden className="h-6 w-6 text-gold transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </h3>
                <p className="mt-2 font-semibold text-gold">{d.role}</p>
              </div>
              <div>
                <p className="text-ivory/85">{d.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[0.92rem] font-semibold">
                  {businessesIn(d.id, { includeAlso: false }).map((b) => (
                    <li key={b.slug}>
                      <Link href={businessHref(b)} className="underline decoration-white/30 underline-offset-4 hover:text-gold hover:decoration-gold">
                        {b.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section aria-labelledby="cta-title" className="reveal-zoom container-x py-20 sm:py-32">
        <h2 id="cta-title" className="font-display text-[clamp(2.4rem,9vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
          Let&apos;s build <span className="text-gold">what&apos;s next.</span>
        </h2>
        <p className="mt-5 max-w-[48ch] text-[1.05rem] text-ivory/85">{contact.intro}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-red px-6 py-3.5 font-bold text-white hover:bg-red-deep">
            Start a conversation
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </Link>
          <a href={`mailto:${contact.email.value}`} className="font-semibold text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold">
            {contact.email.value}
          </a>
        </div>
      </section>
    </div>
  );
}
