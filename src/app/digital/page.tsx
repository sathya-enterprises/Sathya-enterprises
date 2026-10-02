import type { Metadata } from "next";
import { breadcrumbLd, itemListLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { businessHref, businessesIn, divisionById } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { BusinessExplorer } from "@/components/division/BusinessExplorer";
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

  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Digital", path: "/digital" }]), itemListLd("Digital", items.map((b) => ({ name: b.name, path: businessHref(b) })))]} />
      <PageHero
        crumb="Digital"
        index={division.index}
        title={["DIGITAL", <span key="r" className="text-gold">CREATES ATTENTION.</span>]}
        intro={division.summary}
      />

      <section className="on-water container-x py-12 sm:py-20">
        <div>
          <div className="reveal mb-10">
            <p className="t-eyebrow text-gold">{items.length} disciplines</p>
            <LineReveal lines={["EVERY CHANNEL", "THAT CREATES ATTENTION."]} className="t-h1 mt-4" />
          </div>
          <BusinessExplorer items={items} division="digital" />
        </div>
      </section>

      <FinalCta secondary={{ href: "/technology", label: "Next: Technology" }} />
    </>
  );
}
