"use client";

import Link from "next/link";
import { useRevealOnScroll } from "@/hooks/useGsapReveal";
import {
  DatabaseIcon,
  ShoppingBagIcon,
  DropletIcon,
  ShieldCheckIcon,
  CompassIcon,
  BuildingIcon,
  BriefcaseIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@/components/ui/Icons";

const SERVICES_CATALOG = [
  {
    num: "SRV-01",
    label: "Digital Data Products",
    href: "/digital-data-products",
    category: "Information Assets",
    desc: "Curated industry databases, verified B2B contact registries, and competitive intelligence datasets ready for integration.",
    icon: DatabaseIcon,
    tags: ["Verified Contacts", "B2B Enrichment", "Real-Time APIs"],
  },
  {
    num: "SRV-02",
    label: "Business Marketplace",
    href: "/business-marketplace",
    category: "Commercial Network",
    desc: "A verified network connecting enterprise buyers, equipment suppliers, verified vendors, and institutional partners.",
    icon: ShoppingBagIcon,
    tags: ["Verified Suppliers", "Direct Procurement", "Deal Escrow"],
  },
  {
    num: "SRV-03",
    label: "Water Pumps & Fluid Engineering",
    href: "/water-pumps",
    category: "Infrastructure",
    desc: "Commercial submersibles, industrial monoblock pumps, solar pumping systems, and predictive maintenance contracts.",
    icon: DropletIcon,
    tags: ["Solar Pumps", "Commercial Submersible", "Installation"],
  },
  {
    num: "SRV-04",
    label: "Borewell Drilling & Survey",
    href: "/borewell-services",
    category: "Ground Engineering",
    desc: "Advanced geophysical groundwater surveys, high-depth sensor drilling, casing installations, and yield testing.",
    icon: DropletIcon,
    tags: ["Geological Survey", "Sensor Drilling", "Yield Certification"],
  },
  {
    num: "SRV-05",
    label: "CCTV & Integrated Security",
    href: "/cctv-security",
    category: "Facility Protection",
    desc: "Turnkey IP surveillance systems, biometrics, perimeter motion alarms, and centralized NVR recording setups.",
    icon: ShieldCheckIcon,
    tags: ["IP Cameras", "Access Control", "Remote Monitoring"],
  },
  {
    num: "SRV-06",
    label: "Corporate Travels & Fleet",
    href: "/travels",
    category: "Mobility Logistics",
    desc: "Executive transportation, corporate chauffeur fleets, logistics transfers, and outstation corporate itinerary management.",
    icon: CompassIcon,
    tags: ["Executive Fleets", "Airport Transfers", "24/7 Dispatch"],
  },
  {
    num: "SRV-07",
    label: "Interiors & Architecture",
    href: "/interiors-architecture",
    category: "Built Environments",
    desc: "Turnkey commercial workspace interior fit-outs, architectural design, MEP compliance, and acoustic engineering.",
    icon: BuildingIcon,
    tags: ["Commercial Fit-outs", "3D Visualization", "Turnkey Build"],
  },
  {
    num: "SRV-08",
    label: "Startup Management Consulting",
    href: "/startup-consulting",
    category: "Strategic Advisory",
    desc: "From legal incorporation and compliance structure to go-to-market scaling, financial model audit, and capital advisory.",
    icon: BriefcaseIcon,
    tags: ["GTM Advisory", "Legal Compliance", "Scale Operations"],
  },
];

export default function ServicesSection() {
  const gridRef = useRevealOnScroll<HTMLDivElement>(0.08);

  return (
    <section aria-labelledby="services-heading" className="section--chalk">
      <div className="container">
        {/* Section Head */}
        <div className="section-head section-head--split">
          <div className="section-head__main">
            <span className="eyebrow">Enterprise Verticals</span>
            <h2 id="services-heading" className="t-h2">
              REAL-WORLD & DIGITAL SERVICES
            </h2>
            <p className="t-lead" style={{ marginTop: "0.75rem" }}>
              From heavy ground engineering and corporate infrastructure to data products and management consulting — executed with in-house accountability.
            </p>
          </div>
          <div className="section-head__aside">
            <Link className="btn btn--secondary" href="/ecosystem#services">
              <span>View All Services</span>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>

        {/* Bento Grid - 3 Card Grid */}
        <div ref={gridRef} className="grid grid--3" style={{ gap: "1.25rem" }}>
          {SERVICES_CATALOG.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.href}
                href={s.href}
                className="card service-bento-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "1.75rem",
                  background: "#ffffff",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div>
                  {/* Top Bar: Icon + Category Tag + Number */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "8px",
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-line)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--color-ink)",
                      }}
                      className="service-icon-box"
                    >
                      <Icon size={20} />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.58rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          padding: "0.2rem 0.5rem",
                          background: "var(--color-surface)",
                          border: "1px solid var(--color-line)",
                          color: "var(--color-gold)",
                          fontWeight: 700,
                          borderRadius: "2px",
                        }}
                      >
                        {s.category}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          letterSpacing: "0.12em",
                          color: "var(--color-ink-soft)",
                          fontWeight: 700,
                        }}
                      >
                        {s.num}
                      </span>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3
                    className="card__title"
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 800,
                      lineHeight: 1.25,
                      marginBottom: "0.6rem",
                      color: "var(--color-ink)",
                    }}
                  >
                    {s.label}
                  </h3>

                  <p
                    className="t-body"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      color: "var(--color-ink-soft)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {s.desc}
                  </p>
                </div>

                {/* Tags & Action Link */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.35rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          padding: "0.25rem 0.55rem",
                          background: "var(--color-surface)",
                          border: "1px solid var(--color-line)",
                          color: "var(--color-ink-soft)",
                          borderRadius: "2px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid var(--color-line)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--color-gold)",
                      }}
                    >
                      Specifications
                    </span>
                    <ArrowUpRightIcon size={16} style={{ color: "var(--color-gold)" }} />
                  </div>
                </div>

                <span className="card__line" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        .service-bento-card:hover .service-icon-box {
          background: var(--color-ink) !important;
          color: var(--color-chalk) !important;
          border-color: var(--color-ink) !important;
        }
      `}</style>
    </section>
  );
}
