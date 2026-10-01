import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breadcrumbLd, businessDescription, pageMeta, serviceLd, titleCase } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowUpRight } from "lucide-react";
import {
  businessBySlug,
  businesses,
  divisionById,
  requirementFor,
  stagesFor,
  system,
} from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { FlowLine } from "@/components/ui/FlowLine";
import { RelationMap } from "@/components/business/RelationMap";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/Interactive";
import { FinalCta } from "@/components/home/FinalCta";

export const dynamicParams = false;

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = businessBySlug[slug];
  if (!b) return {};
  return pageMeta({
    title: `${b.name} — ${titleCase(b.headline)}`,
    description: businessDescription(b),
    path: `/${b.slug}`,
  });
}

/** Break a published headline into its sentences so each becomes a designed line. */
const lines = (headline: string) => headline.match(/[^.]+\.?/g)!.map((s) => s.trim());

export default async function BusinessPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const b = businessBySlug[slug];
  if (!b) notFound();
  const division = divisionById[b.division];
  const stages = stagesFor(b.slug);
  const related = b.related.map((s) => businessBySlug[s]).filter(Boolean);
  const need = encodeURIComponent(requirementFor[b.slug] ?? "Other");

  return (
    <>
      <JsonLd
        data={[
          serviceLd(b, division.name.charAt(0) + division.name.slice(1).toLowerCase()),
          breadcrumbLd([
            { name: division.name.charAt(0) + division.name.slice(1).toLowerCase(), path: division.href },
            { name: b.name, path: `/${b.slug}` },
          ]),
        ]}
      />
      <PageHero
        tone={b.division}
        crumb={b.name}
        index={`${division.name.charAt(0) + division.name.slice(1).toLowerCase()} — ${b.index}`}
        title={lines(b.headline)}
        intro={b.intro}
        visual={<RelationMap business={b} />}
      >
        <div className="enter mt-10 flex flex-wrap gap-3" style={{ ["--i" as string]: 3 }}>
          <Link
            href={`/contact?need=${need}`}
            className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--tone-ink)] px-6 py-3.5 font-bold text-[color:var(--tone-bg)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            {b.cta}
            <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href={division.href}
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[color:var(--tone-line)] px-6 py-3.5 font-bold transition-[border-color] duration-200 hover:border-[color:var(--tone-accent)]"
          >
            {division.name.charAt(0) + division.name.slice(1).toLowerCase()} division
          </Link>
        </div>
      </PageHero>

      {b.flow && (
        <section data-tone={b.division} className="tone border-t border-[color:var(--tone-line)]">
          <div className="container-wide py-16 sm:py-20">
            <p className="t-eyebrow mb-10 text-[color:var(--tone-accent)]">How it flows</p>
            <FlowLine steps={b.flow.steps} vertical={b.flow.vertical} />
          </div>
        </section>
      )}

      {(b.groups.length > 0 || b.note) && (
        <section className="section-y">
          <div className="container-x">
            <div className={`grid gap-14 ${b.groups.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]"}`}>
              {b.groups.length === 1 && (
                <div>
                  <p className="t-eyebrow text-red-deep">{division.name}</p>
                  <h2 className="t-h2 mt-4">{b.groups[0].title}</h2>
                </div>
              )}
              {b.groups.map((g) => (
                <div key={g.title}>
                  {b.groups.length > 1 && <h2 className="t-h2 mb-6">{g.title}</h2>}
                  <ol className="border-t border-line">
                    {g.items.map((item, i) => (
                      <Reveal as="li" key={item.label} y={12} delay={i * 0.04} className="grid grid-cols-[3rem_1fr] items-baseline gap-2 border-b border-line py-5">
                        <span className="font-mono text-[0.7rem] font-bold text-red">{String(i + 1).padStart(2, "0")}</span>
                        <span>
                          <span className="block font-display text-[clamp(1.2rem,2vw,1.6rem)] font-extrabold tracking-[-0.02em]">{item.label}</span>
                          {item.detail && <span className="mt-1 block text-charcoal-soft">{item.detail}</span>}
                        </span>
                      </Reveal>
                    ))}
                  </ol>
                </div>
              ))}
              {b.note && (
                <Reveal className={`rounded-lg bg-gold-light p-8 sm:p-10 ${b.groups.length === 0 ? "lg:col-span-2" : b.groups.length === 1 ? "lg:col-start-2" : "lg:col-span-2"}`}>
                  <p className="t-eyebrow text-red-deep">{b.note.title}</p>
                  <p className="mt-4 max-w-[56ch] font-display text-[clamp(1.3rem,2.2vw,1.9rem)] font-bold leading-[1.2] tracking-[-0.02em]">
                    {b.note.body}
                  </p>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {stages.length > 0 && (
        <section data-tone="technology" className="tone">
          <div className="container-wide py-16 sm:py-20">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="t-eyebrow text-gold">In the Money-Making System</p>
                <h2 className="t-h3 mt-3">Where {b.name} works in the system</h2>
              </div>
              <Link href="/money-making-system" className="group inline-flex items-center gap-1.5 text-sm font-bold text-gold">
                See the Full System
                <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            <ol className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {system.stages.map((s, i) => {
                const on = stages.includes(s.id);
                return (
                  <Reveal as="li" key={s.id} y={10} delay={i * 0.06}>
                    <span className={`block h-[3px] rounded-full ${on ? "bg-gold" : "bg-[color:var(--tone-line)]"}`} />
                    <span className={`mt-3 block font-display text-[clamp(0.95rem,1.6vw,1.35rem)] font-extrabold tracking-[-0.02em] ${on ? "text-ivory" : "text-ivory/30"}`}>
                      {s.name}
                    </span>
                    <span className={`block font-mono text-[0.6rem] font-bold tracking-[0.14em] ${on ? "text-gold" : "text-ivory/25"}`}>
                      → {s.yields.toUpperCase()}
                    </span>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </section>
      )}

      <section className="section-y">
        <div className="container-x">
          <p className="t-eyebrow text-red-deep">Related</p>
          <h2 className="t-h2 mt-3">More from the ecosystem</h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal as="li" key={r.slug} delay={i * 0.06}>
                <TiltCard className="h-full rounded-lg">
                <Link
                  href={`/${r.slug}`}
                  data-tone={r.division}
                  className="tone group flex h-full min-h-[170px] flex-col justify-between gap-8 rounded-lg border border-(--tone-line) p-6 sm:min-h-[240px] sm:p-7"
                >
                  <span className="flex items-center justify-between font-mono text-[0.66rem] font-bold tracking-[0.16em] text-[color:var(--tone-accent)]">
                    {divisionById[r.division].name} — {r.index}
                    <ArrowUpRight aria-hidden className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span>
                    <span className="block font-display text-[1.6rem] font-extrabold leading-[1.02] tracking-[-0.025em]">{r.name}</span>
                    <span className="mt-2 block text-[0.9rem] text-[color:var(--tone-soft)]">{r.headline}</span>
                  </span>
                </Link>
                </TiltCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta secondary={{ href: division.href, label: `Explore ${division.name.charAt(0) + division.name.slice(1).toLowerCase()}` }} />
    </>
  );
}
