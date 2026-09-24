"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TRUST_METRICS = [
  { num: "10+", label: "Integrated Business Verticals", sub: "Digital, Tech & Real-World" },
  { num: "24/7", label: "Automated Systems Active", sub: "AI & WhatsApp Pipelines" },
  { num: "100%", label: "Direct In-House Delivery", sub: "No Middleman Friction" },
  { num: "PAN-IN", label: "Headquartered in Bengaluru", sub: "Serving Regional & Global" },
];

export default function TrustRibbon() {
  const ribbonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ribbonRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ribbonRef.current!.children, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ribbonRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, ribbonRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      style={{
        borderBottom: "1px solid var(--color-line)",
        borderTop: "1px solid var(--color-line)",
        backgroundColor: "var(--color-surface)",
        paddingBlock: "1.75rem",
      }}
      aria-label="Enterprise highlights"
    >
      <div className="container">
        <div
          ref={ribbonRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          {TRUST_METRICS.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
                borderLeft: "2px solid var(--color-gold)",
                paddingLeft: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "1.35rem",
                    color: "var(--color-ink)",
                    lineHeight: 1,
                  }}
                >
                  {item.num}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-ink)",
                  }}
                >
                  {item.label}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.625rem",
                  color: "var(--color-ink-soft)",
                  letterSpacing: "0.04em",
                }}
              >
                {item.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
