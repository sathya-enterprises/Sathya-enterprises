"use client";

import { useSplitReveal } from "@/hooks/useGsapReveal";

const PROOF_PILLS = ["Digital Growth", "Technology Systems", "Real-World Services"] as const;

export default function AboutSection() {
  const ref = useSplitReveal<HTMLDivElement>();

  return (
    <section className="section--gold" aria-labelledby="about-heading">
      <div className="container">
        <div ref={ref} className="split">
          {/* Left column */}
          <div>
            <span
              className="eyebrow"
              style={{ borderLeft: "2px solid var(--color-gold)", paddingLeft: "0.6em" }}
            >
              Who we are
            </span>
            <h2 id="about-heading" className="t-h2">
              MORE THAN A BUSINESS.<br />A GROWING ECOSYSTEM.
            </h2>
          </div>

          {/* Right column */}
          <div>
            <p className="t-lead">
              Sathya Enterprises operates across digital growth, technology,
              data, products, infrastructure and business services — built as
              one connected ecosystem rather than a collection of unrelated
              ventures. Every part of the business feeds the next: digital work
              creates attention, technology turns that attention into systems,
              and services and products deliver the real-world value customers
              came for.
            </p>

            <div
              role="list"
              aria-label="Business pillars"
              style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", marginTop: "2rem" }}
            >
              {PROOF_PILLS.map((label) => (
                <span
                  key={label}
                  role="listitem"
                  className="feature-pill feature-pill--gold"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
