"use client";

import { useRevealOnScroll } from "@/hooks/useGsapReveal";

const TESTIMONIALS = [
  {
    quote:
      "Sathya Enterprises engineered a complete overhaul of our digital acquisition funnel. Our search rankings in Bengaluru jumped to the top tier within four months, and inbound inquiry volume increased by 240%.",
    author: "Ramesh Venkatesh",
    role: "Managing Director",
    company: "Zenon Commercial Products",
    vertical: "Digital Growth & SEO",
  },
  {
    quote:
      "Their WhatsApp Business automation and CRM routing reduced our customer response time from hours to under 30 seconds. We converted 38% more qualified deals without having to expand our sales headcount.",
    author: "Priya Sharma",
    role: "Head of Operations",
    company: "NexaLogix Solutions",
    vertical: "Technology & Automation",
  },
  {
    quote:
      "From borewell groundwater survey and pump installation to facility-wide IP CCTV surveillance for our 4-acre commercial hub, Sathya provided seamless turnkey delivery with complete accountability.",
    author: "Karthik Narayanan",
    role: "VP of Infrastructure",
    company: "Deccan Logistics Hub",
    vertical: "Services & Engineering",
  },
];

export default function TestimonialsSection() {
  const gridRef = useRevealOnScroll<HTMLDivElement>(0.12);

  return (
    <section className="section--gold" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="section-head section-head--center">
          <div className="section-head__main" style={{ margin: "0 auto" }}>
            <span className="eyebrow">Client Voices</span>
            <h2 id="testimonials-heading" className="t-h2">
              PROVEN IN THE FIELD
            </h2>
            <p className="t-lead" style={{ margin: "0.75rem auto 0", textAlign: "center" }}>
              How founders, enterprises, and operations leaders scale with our ecosystem.
            </p>
          </div>
        </div>

        <div ref={gridRef} className="grid grid--3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "var(--color-chalk)",
              }}
            >
              <div>
                {/* Vertical Tag */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      padding: "0.25em 0.6em",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-line)",
                      color: "var(--color-gold)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      fontWeight: 700,
                    }}
                  >
                    {t.vertical}
                  </span>
                  <span style={{ color: "var(--color-gold)", fontSize: "1.25rem", lineHeight: 1 }} aria-hidden="true">
                    “
                  </span>
                </div>

                {/* Quote Text */}
                <p
                  className="t-body"
                  style={{
                    fontSize: "0.9375rem",
                    lineHeight: 1.65,
                    color: "var(--color-ink)",
                    fontStyle: "italic",
                    marginBottom: "1.5rem",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div style={{ borderTop: "1px solid var(--color-line)", paddingTop: "1rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "0.9375rem",
                    color: "var(--color-ink)",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {t.author}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--color-ink-soft)",
                    marginTop: "0.2rem",
                    letterSpacing: "0.03em",
                  }}
                >
                  {t.role} · <span style={{ color: "var(--color-gold)" }}>{t.company}</span>
                </p>
                <span className="card__line" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
