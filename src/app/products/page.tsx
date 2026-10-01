import type { Metadata } from "next";
import { breadcrumbLd, itemListLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { businessBySlug, divisionById, type Business } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { MarketplaceTriad } from "@/components/division/MarketplaceTriad";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/Interactive";
import { LineReveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";

const division = divisionById.products;

export const metadata: Metadata = pageMeta({
  title: "SaaS Products, Data Products & Business Marketplace",
  description: `Sathya Enterprises Products: ${division.summary.toLowerCase().slice(0, -1)}. One platform connecting customers, businesses and service providers.`,
  path: "/products",
});

/** The product lines named in the published Products summary. */
const lines: { label: string; business: Business; className: string; tone: "products" | "technology" | "services" | "digital" }[] = [
  { label: "SaaS products", business: businessBySlug["saas-products"], className: "lg:col-span-7 lg:row-span-2", tone: "technology" },
  { label: "Digital data products", business: businessBySlug["digital-data-products"], className: "lg:col-span-5", tone: "digital" },
  { label: "Marketplace", business: businessBySlug["business-marketplace"], className: "lg:col-span-5", tone: "digital" },
  { label: "Physical products", business: businessBySlug["water-pumps"], className: "lg:col-span-12", tone: "services" },
];

export default function ProductsPage() {
  const market = businessBySlug["business-marketplace"];

  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Products", path: "/products" }]), itemListLd("Products", lines.map((l) => ({ name: l.business.name, path: `/${l.business.slug}` })))]} />
      <PageHero
        tone="products"
        crumb="Products"
        index={division.index}
        title={["PRODUCTS.", <span key="r" className="text-red-deep">DATA CREATES</span>, <span key="s" className="text-red-deep">INTELLIGENCE.</span>]}
        intro={division.summary}
        visual={<MarketplaceTriad sides={market.flow!.steps} />}
      />

      <section data-tone="products" className="tone">
        <div className="container-x pb-[var(--section-y)]">
          <div className="mb-10">
            <p className="t-eyebrow text-red-deep">Product lines</p>
            <LineReveal lines={["SAAS. DATA.", "MARKETPLACE. PHYSICAL."]} className="t-h1 mt-4" />
          </div>
          <ul className="grid gap-4 lg:grid-cols-12">
            {lines.map(({ label, business: b, className, tone }, i) => {
              const big = i === 0;
              return (
                <Reveal as="li" key={label} delay={i * 0.07} className={className}>
                  <TiltCard className="h-full rounded-lg" max={3}>
                  <Link
                    href={`/${b.slug}`}
                    data-tone={tone}
                    className={`tone group relative flex h-full flex-col overflow-hidden rounded-lg p-7 sm:p-9 ${
                      big ? "min-h-[460px]" : "min-h-[260px]"
                    } ${tone === "digital" ? "border border-[color:var(--tone-line)]" : ""}`}
                  >
                    <span className="flex items-center justify-between font-mono text-[0.68rem] font-bold tracking-[0.16em] text-[color:var(--tone-accent)]">
                      {String(i + 1).padStart(2, "0")} · {label.toUpperCase()}
                      <ArrowUpRight aria-hidden className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                    <span className={`mt-auto pt-10 font-display font-extrabold leading-[0.98] tracking-[-0.03em] ${big ? "text-[clamp(2rem,3.6vw,3.25rem)]" : "text-[clamp(1.6rem,2.4vw,2.1rem)]"}`}>
                      {b.name}
                    </span>
                    <span className="mt-3 max-w-[48ch] text-[0.95rem] text-[color:var(--tone-soft)]">{b.intro}</span>
                    {big && (
                      <span className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {b.groups[0].items.map((it) => (
                          <span
                            key={it.label}
                            className={`rounded-sm border px-3 py-2.5 text-[0.82rem] font-bold ${
                              /future/i.test(it.label) ? "border-dashed border-gold/60 text-gold" : "border-[color:var(--tone-line)]"
                            }`}
                          >
                            {it.label}
                          </span>
                        ))}
                      </span>
                    )}
                    {b.note && (
                      <span className="mt-6 border-t border-[color:var(--tone-line)] pt-4 text-[0.85rem] text-[color:var(--tone-soft)]">
                        <strong className="text-[color:var(--tone-ink)]">{b.note.title}.</strong> {b.note.body}
                      </span>
                    )}
                  </Link>
                  </TiltCard>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <FinalCta secondary={{ href: "/services", label: "Next: Services" }} />
    </>
  );
}
