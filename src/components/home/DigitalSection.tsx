"use client";

import Link from "next/link";
import { useRevealOnScroll } from "@/hooks/useGsapReveal";
import { ArrowRightIcon } from "@/components/ui/Icons";

const DIGITAL_SERVICES = [
  { href: "/digital-marketing", label: "Digital Marketing" },
  { href: "/logo-design", label: "Logo Design" },
  { href: "/web-development", label: "Web Development" },
  { href: "/seo", label: "SEO" },
  { href: "/sem", label: "SEM" },
  { href: "/social-media-management", label: "Social Media Management" },
  { href: "/instagram-marketing", label: "Instagram Marketing" },
  { href: "/lead-generation", label: "Lead Generation" },
];

export default function DigitalSection() {
  const gridRef = useRevealOnScroll<HTMLDivElement>(0.08);

  return (
    <section aria-labelledby="digital-heading">
      <div className="container">
        <div className="section-head section-head--split">
          <div className="section-head__main">
            <span className="eyebrow">Digital</span>
            <h2 id="digital-heading" className="t-h2">DIGITAL</h2>
          </div>
          <div className="section-head__aside">
            <Link className="btn btn--secondary" href="/digital-marketing">
              Explore Digital <ArrowRightIcon />
            </Link>
          </div>
        </div>

        <div ref={gridRef} className="grid grid--4">
          {DIGITAL_SERVICES.map((s) => (
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
