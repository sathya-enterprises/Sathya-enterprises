import type { Metadata } from "next";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { about, brand, divisions } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { Chapters } from "@/components/about/Chapters";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = pageMeta({
  title: "About",
  description: `${about.intro} ${about.chapters[1].body}`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "About", path: "/about" }])]} />
      <PageHero
        crumb="About"
        index={about.index}
        title={["MORE THAN A BUSINESS.", <span key="v" className="text-red">A VISION.</span>]}
        intro={about.intro}
      />

      <section className="pb-[var(--section-y)]">
        <div className="container-x">
          <Chapters />
        </div>
      </section>

      <section data-tone="technology" className="tone">
        <div className="container-x section-y">
          <p className="t-eyebrow text-gold">Our Approach</p>
          <p className="mt-6 max-w-[30ch] font-display text-[clamp(1.8rem,3.6vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {brand.positioning}
          </p>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-lg bg-[color:var(--tone-line)] sm:grid-cols-2 lg:grid-cols-4">
            {divisions.map((d, i) => (
              <Reveal as="li" key={d.id} delay={i * 0.08} y={14} className="bg-charcoal p-7">
                <p className="font-mono text-[0.68rem] font-bold tracking-[0.16em] text-gold">
                  {d.index} · {d.name}
                </p>
                <p className="mt-8 font-display text-[1.5rem] font-extrabold leading-[1.05] tracking-[-0.02em]">{d.role}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
