"use client";

import Link from "next/link";
import { useRevealOnScroll } from "@/hooks/useGsapReveal";
import {
  MegaphoneIcon,
  CpuIcon,
  ShoppingBagIcon,
  BriefcaseIcon,
  ArrowUpRightIcon,
} from "@/components/ui/Icons";

const ECOSYSTEM = [
  {
    num: "01",
    code: "ECO-DIGITAL",
    title: "DIGITAL",
    icon: MegaphoneIcon,
    sub: "Customer Acquisition & Brand Capital",
    desc: "Precision growth architecture combining technical SEO dominance, data-driven paid advertising, high-speed web apps, and organic audience pipelines.",
    href: "/ecosystem#digital",
    pillars: ["SEO & SEM", "Web Apps", "Social Media", "Lead Funnels", "Brand Systems"],
    stat: "08 Core Channels",
  },
  {
    num: "02",
    code: "ECO-TECH",
    title: "TECHNOLOGY",
    icon: CpuIcon,
    sub: "Intelligent Workflows & SaaS Platforms",
    desc: "Cloud infrastructure, proprietary SaaS products, Meta Cloud WhatsApp business bots, and autonomous AI agents that run commercial operations 24/7.",
    href: "/ecosystem#technology",
    pillars: ["Money System", "SaaS Apps", "AI Automation", "WhatsApp APIs", "BI Analytics"],
    stat: "24/7 Live Automation",
  },
  {
    num: "03",
    code: "ECO-PRODUCTS",
    title: "PRODUCTS",
    icon: ShoppingBagIcon,
    sub: "Digital Assets & Physical Commerce",
    desc: "High-margin digital data products, verified enterprise business marketplace, industrial pump equipment, and consumer hardware distribution.",
    href: "/ecosystem#products",
    pillars: ["Data Sets", "B2B Marketplace", "Water Pumping", "CCTV Gear", "Hardware"],
    stat: "Multi-Vertical Distribution",
  },
  {
    num: "04",
    code: "ECO-SERVICES",
    title: "SERVICES",
    icon: BriefcaseIcon,
    sub: "Physical Infrastructure & Executive Advisory",
    desc: "Ground engineering, borewell geophysics, commercial facility security, executive travel fleets, turnkey architecture, and startup management consulting.",
    href: "/ecosystem#services",
    pillars: ["Geophysics & Borewell", "IP Security", "Corporate Fleet", "Interiors", "Startup Advisory"],
    stat: "Turnkey Accountability",
  },
];

export default function EcosystemSection() {
  const gridRef = useRevealOnScroll<HTMLDivElement>(0.12);

  return (
    <section aria-labelledby="ecosystem-heading" style={{ background: "var(--color-chalk)" }}>
      <div className="container">
        {/* Section header */}
        <div className="section-head section-head--center">
          <div className="section-head__main" style={{ margin: "0 auto" }}>
            <span className="eyebrow">Our Enterprise Architecture</span>
            <h2 id="ecosystem-heading" className="t-h2">
              FOUR CONNECTED VERTICALS
            </h2>
            <p className="t-lead" style={{ margin: "0.75rem auto 0", textAlign: "center" }}>
              Every vertical feeds the next — turning digital attention into automated workflows, real-world execution, and compounding enterprise valuation.
            </p>
          </div>
        </div>

        {/* 2×2 card grid */}
        <div ref={gridRef} className="grid grid--2" style={{ gap: "1.5rem" }}>
          {ECOSYSTEM.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.num}
                href={item.href}
                className="category-card eco-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "clamp(2rem, 4vw, 3rem)",
                  background: "#ffffff",
                  border: "1px solid var(--color-line)",
                  position: "relative",
                  overflow: "hidden",
                  textDecoration: "none",
                  borderRadius: "2px",
                }}
              >
                <div>
                  {/* Top Bar: Icon + Code + Big Number */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1.75rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "10px",
                          background: "var(--color-surface)",
                          border: "1px solid var(--color-line)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--color-ink)",
                        }}
                        className="eco-icon-box"
                      >
                        <Icon size={24} />
                      </div>
                      <div>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6875rem",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            color: "var(--color-gold)",
                            textTransform: "uppercase",
                            display: "block",
                          }}
                        >
                          {item.code}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.625rem",
                            color: "var(--color-ink-soft)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {item.stat}
                        </span>
                      </div>
                    </div>

                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 900,
                        fontSize: "2.5rem",
                        color: "rgba(13,13,13,0.08)",
                        lineHeight: 1,
                      }}
                    >
                      {item.num}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    className="category-card__title"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(2rem, 4vw, 2.75rem)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.03em",
                      margin: "0 0 0.5rem 0",
                      color: "var(--color-ink)",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--color-ink-soft)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "1rem",
                    }}
                  >
                    {item.sub}
                  </p>

                  <p
                    className="t-body"
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.65,
                      color: "var(--color-ink-soft)",
                      marginBottom: "1.75rem",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Pillars & Action link */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {item.pillars.map((pillar) => (
                      <span
                        key={pillar}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          letterSpacing: "0.06em",
                          padding: "0.3em 0.7em",
                          background: "var(--color-surface)",
                          border: "1px solid var(--color-line)",
                          color: "var(--color-ink)",
                          borderRadius: "2px",
                        }}
                      >
                        {pillar}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "1rem",
                      borderTop: "1px solid var(--color-line)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--color-gold)",
                      }}
                    >
                      Explore Pillar Ecosystem
                    </span>
                    <ArrowUpRightIcon size={18} style={{ color: "var(--color-gold)" }} />
                  </div>
                </div>

                {/* Gold bottom reveal line */}
                <span className="card__line" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        .eco-card:hover .eco-icon-box {
          background: var(--color-ink) !important;
          color: var(--color-chalk) !important;
          border-color: var(--color-ink) !important;
        }
      `}</style>
    </section>
  );
}
