"use client";

import { useRevealOnScroll } from "@/hooks/useGsapReveal";
import { ZapIcon, BotIcon, GridIcon, BriefcaseIcon } from "@/components/ui/Icons";

const ROADMAP_ITEMS = [
  {
    num: "01",
    tag: "Expansion",
    horizon: "Continuous",
    icon: GridIcon,
    title: "NEW BUSINESS VERTICALS",
    body: "Every adjacent vertical we launch directly connects back to our core flywheel: customer attention converts into proprietary software workflows and real-world execution.",
    chips: ["Cross-Vertical Synergies", "Shared Infrastructure", "Zero Redundancy"],
  },
  {
    num: "02",
    tag: "R&D",
    horizon: "2026 Roadmap",
    icon: ZapIcon,
    title: "NEW DATA & SAAS PRODUCTS",
    body: "From niche industry intelligence datasets to autonomous B2B workflow tooling, our proprietary product suite continues to expand into high-margin recurring software revenue.",
    chips: ["Data APIs", "SaaS Subscriptions", "Self-Serve Portals"],
  },
  {
    num: "03",
    tag: "Intelligence",
    horizon: "Autonomous Layer",
    icon: BotIcon,
    title: "NEXT-GEN AI AUTOMATION",
    body: "Evaluating and deploying practical LLM reasoning agents, automated document extraction, and zero-latency communication engines across all operating subsidiaries.",
    chips: ["Agentic Reasoning", "Meta Cloud APIs", "Voice AI Pipelines"],
  },
  {
    num: "04",
    tag: "Network",
    horizon: "Global Scale",
    icon: BriefcaseIcon,
    title: "STRATEGIC PARTNERSHIPS",
    body: "Institutional providers, engineering specialists, and distribution partners extend our delivery capabilities while maintaining single-source client accountability.",
    chips: ["Institutional Alliances", "Vendor Network", "Co-Ventures"],
  },
];

export default function WhatsNextSection() {
  const gridRef = useRevealOnScroll<HTMLDivElement>(0.1);

  return (
    <section aria-labelledby="next-heading" style={{ background: "var(--color-surface)" }}>
      <div className="container">
        {/* Section header */}
        <div className="section-head section-head--center">
          <div className="section-head__main" style={{ margin: "0 auto" }}>
            <span className="eyebrow">Continuous Evolution</span>
            <h2 id="next-heading" className="t-h2">
              WHAT&apos;S NEXT ON THE HORIZON
            </h2>
            <p className="t-lead" style={{ margin: "0.75rem auto 0", textAlign: "center" }}>
              Our connected ecosystem is intentionally built to absorb emerging technologies, scale new verticals, and compound market advantages.
            </p>
          </div>
        </div>

        {/* 2×2 grid */}
        <div ref={gridRef} className="grid grid--2" style={{ gap: "1.25rem" }}>
          {ROADMAP_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="card roadmap-card"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  padding: "2.25rem",
                  background: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Faint sequential number background decoration */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "-0.5rem",
                    right: "1rem",
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "6rem",
                    color: "var(--color-ink)",
                    opacity: 0.03,
                    lineHeight: 1,
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {item.num}
                </span>

                <div>
                  {/* Top Bar: Icon + Horizon Tag */}
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
                      className="roadmap-icon"
                    >
                      <Icon size={20} />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          padding: "0.2rem 0.55rem",
                          background: "var(--color-surface)",
                          border: "1px solid var(--color-line)",
                          color: "var(--color-gold)",
                          fontWeight: 700,
                          borderRadius: "2px",
                        }}
                      >
                        {item.tag}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--color-ink-soft)",
                        }}
                      >
                        {item.horizon}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="card__title"
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      marginBottom: "0.75rem",
                      lineHeight: 1.25,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="t-body"
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.65,
                      marginBottom: "1.5rem",
                      color: "var(--color-ink-soft)",
                    }}
                  >
                    {item.body}
                  </p>
                </div>

                {/* Bottom Chip List */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                    }}
                  >
                    {item.chips.map((chip) => (
                      <span
                        key={chip}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          letterSpacing: "0.04em",
                          padding: "0.25rem 0.6rem",
                          background: "var(--color-surface)",
                          border: "1px solid var(--color-line)",
                          color: "var(--color-ink)",
                          borderRadius: "2px",
                        }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="card__line" aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .roadmap-card:hover .roadmap-icon {
          background: var(--color-ink) !important;
          color: var(--color-chalk) !important;
          border-color: var(--color-ink) !important;
        }
      `}</style>
    </section>
  );
}
