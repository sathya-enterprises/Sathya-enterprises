import type { Metadata } from "next";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { businessBySlug, divisionById, signalChain, system } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { SystemJourney } from "@/components/system/SystemJourney";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = pageMeta({
  title: "The Sathya Money-Making System",
  description: `${system.intro} Attract, capture, convert, automate, understand and grow — powered by the Sathya Enterprises ecosystem.`,
  path: "/money-making-system",
});

export default function SystemPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Money-Making System", path: "/money-making-system" }])]} />
      <PageHero
        tone="technology"
        crumb="Money-Making System"
        index={`Technology — ${system.index}`}
        title={["THE SATHYA", <span key="m" className="text-gold">MONEY-MAKING</span>, "SYSTEM"]}
        intro={system.intro}
      >
        <ol aria-label="What the system produces" className="enter mt-10 flex flex-wrap items-center gap-x-3 gap-y-2" style={{ ["--i" as string]: 3 }}>
          {signalChain.map((s, i) => (
            <li key={s} className="flex items-center gap-3 font-mono text-[0.72rem] font-bold tracking-[0.16em]">
              <span className={i === signalChain.length - 1 ? "text-gold" : ""}>{s}</span>
              {i < signalChain.length - 1 && <span aria-hidden className="text-gold">→</span>}
            </li>
          ))}
        </ol>
      </PageHero>

      <SystemJourney link={false} />

      {/* Stage × business matrix: which parts of the ecosystem power each stage */}
      <section className="section-y">
        <div className="container-x">
          <p className="t-eyebrow text-red-deep">Powered by the ecosystem</p>
          <h2 className="t-h2 mt-4 max-w-[26ch]">Which parts of the ecosystem power each stage.</h2>
          <ol className="mt-12 border-t border-line">
            {system.stages.map((s, i) => (
              <Reveal
                as="li"
                key={s.id}
                y={12}
                className="grid gap-4 border-b border-line py-7 md:grid-cols-[4rem_minmax(0,3fr)_minmax(0,2fr)_minmax(0,5fr)] md:items-baseline"
              >
                <span className="font-mono text-[0.72rem] font-bold text-red">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[clamp(1.6rem,2.6vw,2.3rem)] font-extrabold tracking-[-0.03em]">{s.name}</span>
                <span className="font-mono text-[0.7rem] font-bold tracking-[0.14em] text-charcoal-soft">→ {s.yields.toUpperCase()}</span>
                <span className="flex flex-wrap gap-2">
                  {s.tools.map((t) => {
                    const b = t.slug ? businessBySlug[t.slug] : null;
                    return b ? (
                      <Link
                        key={t.label}
                        href={`/${b.slug}`}
                        data-tone={b.division}
                        className="tone inline-flex items-center gap-2 rounded-full border border-[color:var(--tone-line)] px-3.5 py-1.5 text-[0.85rem] font-bold transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        {t.label}
                        <span className="font-mono text-[0.56rem] tracking-[0.12em] text-[color:var(--tone-accent)]">
                          {divisionById[b.division].name}
                        </span>
                      </Link>
                    ) : (
                      <span key={t.label} className="rounded-full border border-dashed border-line-strong px-3.5 py-1.5 text-[0.85rem] font-bold text-charcoal-soft">
                        {t.label}
                      </span>
                    );
                  })}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <FinalCta secondary={{ href: "/ecosystem", label: "Explore Our Businesses" }} />
    </>
  );
}
