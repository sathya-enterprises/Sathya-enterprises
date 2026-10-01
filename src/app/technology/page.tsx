import type { Metadata } from "next";
import { breadcrumbLd, itemListLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { businessBySlug, businessesIn, divisionById } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { FlowLine } from "@/components/ui/FlowLine";
import { ModuleAssembly } from "@/components/division/ModuleAssembly";
import { ExpandingPanels } from "@/components/division/ExpandingPanels";
import { SystemSlice } from "@/components/division/SystemSlice";
import { LineReveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";

const division = divisionById.technology;

export const metadata: Metadata = pageMeta({
  title: "SaaS, AI Automation, WhatsApp & Data Solutions",
  description: `${division.role} Sathya Enterprises Technology: ${division.summary.toLowerCase().slice(0, -1)} — modular SaaS and automation for business, based in Bengaluru.`,
  path: "/technology",
});

export default function TechnologyPage() {
  const ai = businessBySlug["ai-automation"];
  const saas = businessBySlug["saas-products"];
  const modules = saas.groups[0].items.map((i) => i.label);

  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Technology", path: "/technology" }]), itemListLd("Technology", businessesIn("technology").map((b) => ({ name: b.name, path: `/${b.slug}` })))]} />
      <PageHero
        tone="technology"
        crumb="Technology"
        index={division.index}
        title={["TECHNOLOGY", <span key="r" className="text-gold">CREATES SYSTEMS.</span>]}
        intro={division.summary}
        visual={
          <div className="rounded-lg border border-[color:var(--tone-line)] bg-ivory/[0.03] p-6 sm:p-8">
            <p className="font-mono text-[0.66rem] font-bold tracking-[0.16em] text-gold">{ai.name.toUpperCase()}</p>
            <p className="mt-2 font-display text-[1.5rem] font-extrabold leading-tight tracking-[-0.02em]">{ai.headline}</p>
            <FlowLine steps={ai.flow!.steps} className="mt-8" />
            <p className="mt-8 border-t border-[color:var(--tone-line)] pt-5 text-[0.92rem] text-[color:var(--tone-soft)]">{ai.intro}</p>
          </div>
        }
      />

      <section data-tone="technology" className="tone border-t border-[color:var(--tone-line)]">
        <div className="container-wide section-y grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
          <div>
            <p className="t-eyebrow text-gold">{saas.name}</p>
            <LineReveal lines={["START WITH ONE", "MODULE."]} className="t-h1 mt-4" />
            <p className="t-lead mt-6 max-w-[40ch] text-[color:var(--tone-soft)]">{saas.intro}</p>
          </div>
          <ModuleAssembly modules={modules} />
        </div>
      </section>

      <section data-tone="technology" className="tone">
        <div className="container-wide pb-[var(--section-y)]">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="t-eyebrow text-gold">{businessesIn("technology").length} businesses</p>
              <h2 className="t-h2 mt-4">SaaS, AI automation, WhatsApp solutions and data.</h2>
            </div>
          </div>
          <ExpandingPanels items={businessesIn("technology")} />
        </div>
      </section>

      <SystemSlice flush stageIds={["convert", "automate", "understand"]} title="Technology converts, automates and turns data into understanding." />

      <FinalCta secondary={{ href: "/products", label: "Next: Products" }} />
    </>
  );
}
