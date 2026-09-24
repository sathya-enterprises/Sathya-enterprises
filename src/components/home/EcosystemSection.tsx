"use client";

import Link from "next/link";
import { useRevealOnScroll } from "@/hooks/useGsapReveal";

const ECOSYSTEM = [
  {
    num: "01",
    title: "DIGITAL",
    desc: "Marketing, websites, SEO, SEM, social media and lead generation.",
    href: "/ecosystem#digital",
  },
  {
    num: "02",
    title: "TECHNOLOGY",
    desc: "SaaS, AI automation, WhatsApp solutions and data.",
    href: "/ecosystem#technology",
  },
  {
    num: "03",
    title: "PRODUCTS",
    desc: "SaaS products, digital data products, marketplace and physical products.",
    href: "/ecosystem#products",
  },
  {
    num: "04",
    title: "SERVICES",
    desc: "Water pumps, borewell, CCTV, travel, interiors, architecture and startup support.",
    href: "/ecosystem#services",
  },
];

export default function EcosystemSection() {
  const gridRef = useRevealOnScroll<HTMLDivElement>(0.12);

  return (
    <section aria-labelledby="ecosystem-heading">
      <div className="container">
        <div className="section-head section-head--center">
          <div className="section-head__main" style={{ margin: "0 auto" }}>
            <span className="eyebrow">Our Ecosystem</span>
            <h2 id="ecosystem-heading" className="t-h2">
              OUR BUSINESS ECOSYSTEM
            </h2>
          </div>
        </div>

        <div ref={gridRef} className="grid grid--4">
          {ECOSYSTEM.map((item) => (
            <Link key={item.num} className="category-card" href={item.href}>
              <span className="category-card__num">{item.num}</span>
              <h3 className="category-card__title">{item.title}</h3>
              <p className="category-card__list">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
