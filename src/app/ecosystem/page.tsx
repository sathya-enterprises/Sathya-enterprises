import type { Metadata } from "next";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { businessesIn, divisions, ecosystemPage, signalChain } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { EcosystemNetwork } from "@/components/ecosystem/EcosystemNetwork";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/Interactive";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = pageMeta({
  title: "Our Business Ecosystem",
  description: `${ecosystemPage.intro} Digital, technology, products and services — one connected Sathya Enterprises ecosystem.`,
  path: "/ecosystem",
});

export default function EcosystemPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Ecosystem", path: "/ecosystem" }])]} />
      <PageHero
        crumb="Ecosystem"
        index={ecosystemPage.index}
        title={["ONE ENTERPRISE.", <span key="r" className="text-red">MANY POSSIBILITIES.</span>]}
        intro={ecosystemPage.intro}
      >
        <ol aria-label="The connected chain" className="enter mt-10 flex flex-wrap items-center gap-x-3 gap-y-2" style={{ ["--i" as string]: 3 }}>
          {signalChain.map((s, i) => (
            <li key={s} className="flex items-center gap-3 font-mono text-[0.72rem] font-bold tracking-[0.16em]">
              <span className={i === signalChain.length - 1 ? "text-red" : "text-charcoal"}>{s}</span>
              {i < signalChain.length - 1 && <span aria-hidden className="text-gold">→</span>}
            </li>
          ))}
        </ol>
      </PageHero>

      <section className="pb-[var(--section-y)]">
        <div className="container-wide">
          <EcosystemNetwork />
        </div>
      </section>

      <section className="border-t border-line">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
          {divisions.map((d, i) => (
            <Reveal as="li" key={d.id} delay={i * 0.06} y={12}>
              <TiltCard className="h-full" max={3}>
              <Link
                href={d.href}
                data-tone={d.id}
                className="tone group flex min-h-[320px] flex-col justify-between p-8 transition-[filter] duration-300 hover:brightness-[1.03]"
              >
                <span className="flex items-center justify-between font-mono text-[0.68rem] font-bold tracking-[0.16em] text-[color:var(--tone-accent)]">
                  {d.index} · {businessesIn(d.id).length} BUSINESSES
                  <ArrowUpRight aria-hidden className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span>
                  <span className="block font-display text-[2.2rem] font-extrabold tracking-[-0.035em]">{d.name}</span>
                  <span className="mt-2 block text-[0.95rem] text-[color:var(--tone-soft)]">{d.summary}</span>
                </span>
              </Link>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </section>

      <FinalCta secondary={{ href: "/money-making-system", label: "See the Money-Making System" }} />
    </>
  );
}
