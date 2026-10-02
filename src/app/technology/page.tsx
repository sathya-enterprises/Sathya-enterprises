import type { Metadata } from "next";
import { breadcrumbLd, itemListLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { businessHref, businessesIn, divisionById } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { BusinessExplorer } from "@/components/division/BusinessExplorer";
import { LineReveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";

const division = divisionById.technology;

export const metadata: Metadata = pageMeta({
  title: "SaaS, AI Automation, WhatsApp & Data Solutions",
  description: `${division.role} Sathya Enterprises Technology: ${division.summary.toLowerCase().slice(0, -1)} — modular SaaS and automation for business, based in Bengaluru.`,
  path: "/technology",
});

export default function TechnologyPage() {
  const items = businessesIn("technology");

  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Technology", path: "/technology" }]), itemListLd("Technology", items.map((b) => ({ name: b.name, path: businessHref(b) })))]} />
      <PageHero
        crumb="Technology"
        index={division.index}
        title={["TECHNOLOGY", <span key="r" className="text-gold">CREATES SYSTEMS.</span>]}
        intro={division.summary}
      />

      <section className="on-water container-x py-12 sm:py-20">
        <div>
          <div className="reveal mb-10">
            <p className="t-eyebrow text-gold">{items.length} businesses</p>
            <LineReveal lines={["SYSTEMS THAT", "RUN THE BUSINESS."]} className="t-h1 mt-4" />
          </div>
          <BusinessExplorer items={items} division="technology" />
        </div>
      </section>

      <FinalCta secondary={{ href: "/products", label: "Next: Products" }} />
    </>
  );
}
