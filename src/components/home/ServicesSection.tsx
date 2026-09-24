"use client";

import Link from "next/link";
import { useRevealOnScroll } from "@/hooks/useGsapReveal";
import { ArrowRightIcon } from "@/components/ui/Icons";

const SERVICES = [
  { href: "/digital-data-products", label: "Digital Data Products" },
  { href: "/business-marketplace", label: "Business Marketplace" },
  { href: "/water-pumps", label: "Water Pumps" },
  { href: "/borewell-services", label: "Borewell Services" },
  { href: "/cctv-security", label: "CCTV & Security" },
  { href: "/travels", label: "Travels" },
  { href: "/interiors-architecture", label: "Interiors & Architecture" },
  { href: "/startup-consulting", label: "Startup Management Consulting" },
];

export default function ServicesSection() {
  const gridRef = useRevealOnScroll<HTMLDivElement>(0.08);

  return (
    <section aria-labelledby="services-heading">
      <div className="container">
        <div className="section-head section-head--split">
          <div className="section-head__main">
            <span className="eyebrow">Services</span>
            <h2 id="services-heading" className="t-h2">SERVICES</h2>
          </div>
          <div className="section-head__aside">
            <Link className="btn btn--secondary" href="/ecosystem#services">
              Explore Services <ArrowRightIcon />
            </Link>
          </div>
        </div>

        <div ref={gridRef} className="grid grid--4">
          {SERVICES.map((s) => (
            <Link key={s.href} className="card" href={s.href}>
              <h3 className="card__title" style={{ fontSize: "1.05rem" }}>
                {s.label}
              </h3>
              <span className="card__line" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
