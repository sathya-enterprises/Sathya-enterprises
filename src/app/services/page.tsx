import type { Metadata } from "next";
import { breadcrumbLd, itemListLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { businessBySlug, businessesIn, divisionById } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceExplorer } from "@/components/division/ServiceExplorer";
import { serviceIcons } from "@/components/division/serviceIcons";
import { FlowLine } from "@/components/ui/FlowLine";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";

const division = divisionById.services;

export const metadata: Metadata = pageMeta({
  title: "Water Pumps, Borewell, CCTV, Travel, Interiors & Startup Consulting",
  description: `${division.role} Sathya Enterprises Services in Bengaluru: ${division.summary.toLowerCase()}`,
  path: "/services",
});

export default function ServicesPage() {
  const items = businessesIn("services", { includeAlso: false });
  const processes = [businessBySlug["borewell-services"], businessBySlug["startup-consulting"]];

  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Services", path: "/services" }]), itemListLd("Services", items.map((b) => ({ name: b.name, path: `/${b.slug}` })))]} />
      <PageHero
        tone="services"
        crumb="Services"
        index={division.index}
        title={["SERVICES", <span key="r" className="text-gold">DELIVER REAL-</span>, <span key="s" className="text-gold">WORLD VALUE.</span>]}
        intro={division.summary}
        visual={
          <ul className="grid grid-cols-3 gap-3" aria-label="Services">
            {items.map((b, i) => {
              const Icon = serviceIcons[b.slug];
              return (
                <li
                  key={b.slug}
                  data-ambient
                  style={{ animation: `float-y ${6 + (i % 3)}s var(--ease-in-out) ${i * 0.4}s infinite`, ["--float-amp" as string]: `${-6 - (i % 2) * 4}px` }}
                  className="flex aspect-square flex-col justify-between rounded-md border border-[color:var(--tone-line)] bg-ivory/[0.06] p-4"
                >
                  <Icon aria-hidden className="h-6 w-6 text-gold" />
                  <span className="font-display text-[0.92rem] font-extrabold leading-tight tracking-[-0.01em]">{b.short}</span>
                </li>
              );
            })}
          </ul>
        }
      />

      <section data-tone="services" className="tone border-t border-[color:var(--tone-line)]">
        <div className="container-wide section-y">
          <div className="mb-12">
            <p className="t-eyebrow text-gold">{items.length} services</p>
            <LineReveal lines={["IN THE FIELD."]} className="t-h1 mt-4" />
          </div>
          <ServiceExplorer items={items} />
        </div>
      </section>

      <section className="section-y">
        <div className="container-wide">
          <p className="t-eyebrow text-red-deep">End to end</p>
          <h2 className="t-h2 mt-4 max-w-[24ch]">From first step to long-term support.</h2>
          <div className="mt-14 space-y-16">
            {processes.map((b) => (
              <Reveal key={b.slug} className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)]">
                <div>
                  <p className="font-mono text-[0.68rem] font-bold tracking-[0.16em] text-red">{b.name.toUpperCase()}</p>
                  <p className="mt-2 font-display text-[1.6rem] font-extrabold leading-tight tracking-[-0.02em]">{b.headline}</p>
                </div>
                <FlowLine steps={b.flow!.steps} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta secondary={{ href: "/ecosystem", label: "See the whole ecosystem" }} />
    </>
  );
}
