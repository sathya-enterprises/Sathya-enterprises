"use client";

import { useRevealOnScroll } from "@/hooks/useGsapReveal";

const STEPS = [
  {
    num: "01",
    title: "DIAGNOSE & SCOPE",
    desc: "We analyze your existing operations, customer acquisition channels, and technical friction points to uncover the highest-leverage growth opportunities.",
    badge: "Audit & Strategy",
  },
  {
    num: "02",
    title: "SYSTEM BLUEPRINT",
    desc: "We engineer a connected roadmap — pairing marketing visibility with automated software pipelines and real-world fulfillment tailored to your business.",
    badge: "Architecture",
  },
  {
    num: "03",
    title: "RAPID DEPLOYMENT",
    desc: "Execution starts immediately with our in-house teams. Whether launching high-speed web apps or installing physical security, we deliver end-to-end.",
    badge: "Execution",
  },
  {
    num: "04",
    title: "COMPOUND & SCALE",
    desc: "Every deployed vertical feeds the next. As data and customer trust compound, we automate operational overhead and expand market reach.",
    badge: "Compounding Growth",
  },
];

export default function ProcessSection() {
  const gridRef = useRevealOnScroll<HTMLDivElement>(0.1);

  return (
    <section aria-labelledby="process-heading">
      <div className="container">
        <div className="section-head section-head--center">
          <div className="section-head__main" style={{ margin: "0 auto" }}>
            <span className="eyebrow">How We Work</span>
            <h2 id="process-heading" className="t-h2">
              THE ENGAGEMENT ARCHITECTURE
            </h2>
            <p className="t-lead" style={{ margin: "0.75rem auto 0", textAlign: "center" }}>
              From initial diagnosis to self-sustaining compounding scale.
            </p>
          </div>
        </div>

        <div ref={gridRef} className="grid grid--4">
          {STEPS.map((step) => (
            <div key={step.num} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--color-gold)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {step.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      padding: "0.2em 0.55em",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-line)",
                      color: "var(--color-ink-soft)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {step.badge}
                  </span>
                </div>

                <h3 className="card__title">{step.title}</h3>
                <p className="t-body" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>

              <span className="card__line" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
