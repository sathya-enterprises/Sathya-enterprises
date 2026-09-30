"use client";

import { useScaleReveal } from "@/hooks/useGsapReveal";

const stats = [
  { value: "10+", label: "Business Verticals" },
  { value: "Growing", label: "Client Base" },
  { value: "Multiple", label: "Active Projects" },
  { value: "Open", label: "Partner Network" },
];

export default function StatsSection() {
  const gridRef = useScaleReveal<HTMLDivElement>(0.1);

  return (
    <section
      className="section--dark"
      aria-labelledby="stats-heading"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Ghost decorative text */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(6rem, 18vw, 14rem)",
            color: "rgba(255,255,255,0.025)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          GROW
        </span>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Eyebrow */}
        <p
          className="eyebrow"
          style={{ color: "var(--color-gold)", textAlign: "center" }}
        >
          Built to Grow
        </p>

        {/* Heading */}
        <h2
          id="stats-heading"
          className="t-h2"
          style={{ color: "var(--color-chalk)", textAlign: "center" }}
        >
          BUILT TO GROW
        </h2>

        {/* Stats grid */}
        <div ref={gridRef} className="grid grid--4" style={{ marginTop: "3rem" }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{ textAlign: "center", padding: "1.5rem 1rem" }}
            >
              {/* Large gold number / word */}
              <span
                style={{
                  color: "var(--color-gold)",
                  fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  lineHeight: 1,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                {stat.value}
              </span>

              {/* Thin gold divider line */}
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "2px",
                  background: "var(--color-gold)",
                  margin: "0.75rem auto",
                }}
              />

              {/* Label */}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,253,248,0.6)",
                  textAlign: "center",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
