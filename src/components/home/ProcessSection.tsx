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
  const listRef = useRevealOnScroll<HTMLDivElement>(0.1);

  return (
    <section
      className="section--dark"
      aria-labelledby="process-heading"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Ghost background number */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-2rem",
          bottom: "-1rem",
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(8rem,20vw,16rem)",
          color: "rgba(255,255,255,0.025)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        04
      </span>

      <div className="container">
        <div className="section-head section-head--center">
          <div className="section-head__main" style={{ margin: "0 auto" }}>
            <span className="eyebrow">How We Work</span>
            <h2
              id="process-heading"
              className="t-h2"
              style={{ color: "var(--color-chalk)" }}
            >
              THE ENGAGEMENT ARCHITECTURE
            </h2>
            <p
              className="t-lead"
              style={{
                margin: "0.75rem auto 0",
                textAlign: "center",
                color: "rgba(255,253,248,0.7)",
              }}
            >
              From initial diagnosis to self-sustaining compounding scale.
            </p>
          </div>
        </div>

        <div ref={listRef} className="numbered-list">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="numbered-list__item"
              style={{
                borderBottom: "1px solid rgba(255,253,248,0.08)",
              }}
            >
              {/* Left: step number */}
              <span className="numbered-list__num">{step.num}</span>

              {/* Right: title row + description */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    flexWrap: "wrap",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span
                    className="numbered-list__title"
                    style={{ color: "var(--color-chalk)" }}
                  >
                    {step.title}
                  </span>
                  <span className="feature-pill feature-pill--gold">
                    {step.badge}
                  </span>
                </div>
                <p
                  className="t-body"
                  style={{ color: "rgba(255,253,248,0.65)", margin: 0 }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
