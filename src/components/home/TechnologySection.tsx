"use client";

import Link from "next/link";
import { useRevealOnScroll } from "@/hooks/useGsapReveal";
import { ArrowRightIcon, CpuIcon } from "@/components/ui/Icons";

const TECH_SERVICES = [
  { href: "/money-making-system", label: "Money-Making System" },
  { href: "/saas-products", label: "SaaS Products" },
  { href: "/ai-automation", label: "AI Automation" },
  { href: "/whatsapp-business-solutions", label: "WhatsApp Business Solutions" },
  { href: "/data-solutions", label: "Data Solutions" },
];

export default function TechnologySection() {
  const gridRef = useRevealOnScroll<HTMLDivElement>(0.1);

  return (
    <section className="section--gold" aria-labelledby="technology-heading">
      <div className="container">
        <div className="section-head section-head--split">
          <div className="section-head__main">
            <span className="eyebrow">Technology</span>
            <h2 id="technology-heading" className="t-h2">TECHNOLOGY</h2>
          </div>
          <div className="section-head__aside">
            <Link className="btn btn--secondary" href="/saas-products">
              Explore Technology <ArrowRightIcon />
            </Link>
          </div>
        </div>

        <div ref={gridRef} className="grid grid--3">
          {TECH_SERVICES.map((s) => (
            <Link key={s.href} className="card" href={s.href}>
              <CpuIcon size={24} className="card__icon" />
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
