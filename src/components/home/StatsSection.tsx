"use client";

import { useScaleReveal } from "@/hooks/useGsapReveal";

const STATS = [
  { value: "10+", label: "Business Verticals" },
  { value: "Growing", label: "Client Base" },
  { value: "Multiple", label: "Active Projects" },
  { value: "Open", label: "Partner Network" },
];

export default function StatsSection() {
  const ref = useScaleReveal<HTMLDivElement>(0.1);

  return (
    <section className="section--gold" aria-labelledby="stats-heading">
      <div className="container">
        <div className="section-head section-head--center">
          <div className="section-head__main" style={{ margin: "0 auto" }}>
            <span className="eyebrow">Built to Grow</span>
            <h2 id="stats-heading" className="t-h2">BUILT TO GROW</h2>
          </div>
        </div>

        <div ref={ref} className="grid grid--4">
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <span className="stat__value">{s.value}</span>
              <p className="stat__label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
