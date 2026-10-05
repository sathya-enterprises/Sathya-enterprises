import type { Metadata } from "next";
import { breadcrumbLd, itemListLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { businessHref, businessesIn, divisionById } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { divisionPhotos } from "@/content/photos";
import { BusinessExplorer } from "@/components/division/BusinessExplorer";
import { LineReveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { Ticker } from "@/components/ui/Ticker";

const division = divisionById.products;

export const metadata: Metadata = pageMeta({
  title: "SaaS Products, Data Products & Business Marketplace",
  description: `Sathya Enterprises Products: ${division.summary.toLowerCase().slice(0, -1)}. One platform connecting customers, businesses and service providers.`,
  path: "/products",
});

export default function ProductsPage() {
  // Own product lines first, then the ones shared with Technology and Services.
  const items = [...businessesIn("products", { includeAlso: false }), ...businessesIn("products").filter((b) => b.division !== "products")];

  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Products", path: "/products" }]), itemListLd("Products", items.map((b) => ({ name: b.name, path: businessHref(b) })))]} />
      <PageHero
        crumb="Products"
        index={division.index}
        title={["PRODUCTS.", <span key="r" className="text-gold">DATA CREATES INTELLIGENCE.</span>]}
        intro={division.summary}
        photo={divisionPhotos.products}
      />
      <Ticker label="Products businesses" items={items.map((b) => ({ label: b.name, href: businessHref(b) }))} />

      <section className="on-water container-x py-12 sm:py-20">
        <div>
          <div className="reveal mb-10">
            <p className="t-eyebrow text-gold">Product lines</p>
            <LineReveal lines={["SAAS. DATA.", "MARKETPLACE. PHYSICAL."]} className="t-h1 mt-4" />
          </div>
          <BusinessExplorer items={items} division="products" />
        </div>
      </section>

      <FinalCta secondary={{ href: "/services", label: "Next: Services" }} />
    </>
  );
}
