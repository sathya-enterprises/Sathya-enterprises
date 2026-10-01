import type { Metadata } from "next";
import { breadcrumbLd, itemListLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { businessBySlug, businessesIn, divisionById } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { PipelineFunnel } from "@/components/division/PipelineFunnel";
import { DisciplineRail } from "@/components/division/DisciplineRail";
import { SystemSlice } from "@/components/division/SystemSlice";
import { LineReveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";

const division = divisionById.digital;

export const metadata: Metadata = pageMeta({
  title: "Digital Marketing, Websites, SEO & Lead Generation",
  description: `${division.role} Sathya Enterprises Digital: ${division.summary.toLowerCase().slice(0, -1)} — one connected growth system, based in Bengaluru.`,
  path: "/digital",
});

export default function DigitalPage() {
  const items = businessesIn("digital");
  const pipeline = businessBySlug["lead-generation"].flow!.steps;

  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Digital", path: "/digital" }]), itemListLd("Digital", items.map((b) => ({ name: b.name, path: `/${b.slug}` })))]} />
      <PageHero
        tone="digital"
        crumb="Digital"
        index={division.index}
        title={["DIGITAL", <span key="r" className="text-red">CREATES ATTENTION.</span>]}
        intro={division.summary}
        visual={<PipelineFunnel steps={pipeline} />}
      />

      <section className="pb-[var(--section-y)]">
        <div className="container-wide mb-10 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <div>
            <p className="t-eyebrow text-red-deep">{items.length} disciplines</p>
            <LineReveal lines={["EVERY CHANNEL", "THAT CREATES ATTENTION."]} className="t-h1 mt-4" />
          </div>
          <p className="text-charcoal-soft lg:text-right">
            {businessBySlug["digital-marketing"].intro}
          </p>
        </div>
        <DisciplineRail items={items} label="digital disciplines" />
      </section>

      <SystemSlice stageIds={["attract", "capture"]} title="Digital attracts attention and captures it as leads." />

      <FinalCta secondary={{ href: "/technology", label: "Next: Technology" }} />
    </>
  );
}
