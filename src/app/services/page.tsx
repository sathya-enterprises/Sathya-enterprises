import type { Metadata } from "next";
import { breadcrumbLd, itemListLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { businessHref, businessesIn, divisionById } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { BusinessExplorer } from "@/components/division/BusinessExplorer";
import { LineReveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";

const division = divisionById.services;

export const metadata: Metadata = pageMeta({
  title: "Water Pumps, Borewell, CCTV, Travel, Interiors & Startup Consulting",
  description: `${division.role} Sathya Enterprises Services in Bengaluru: ${division.summary.toLowerCase()}`,
  path: "/services",
});

export default function ServicesPage() {
  const items = businessesIn("services", { includeAlso: false });

  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Services", path: "/services" }]), itemListLd("Services", items.map((b) => ({ name: b.name, path: businessHref(b) })))]} />
      <PageHero
        crumb="Services"
        index={division.index}
        title={["SERVICES", <span key="r" className="text-gold">DELIVER REAL-WORLD VALUE.</span>]}
        intro={division.summary}
      />

      <section className="on-water container-x py-12 sm:py-20">
        <div>
          <div className="reveal mb-10">
            <p className="t-eyebrow text-gold">{items.length} services</p>
            <LineReveal lines={["IN THE FIELD."]} className="t-h1 mt-4" />
          </div>
          <BusinessExplorer items={items} division="services" />
        </div>
      </section>

      <FinalCta secondary={{ href: "/#divisions", label: "See all divisions" }} />
    </>
  );
}
