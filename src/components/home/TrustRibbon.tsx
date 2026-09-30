"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    value: "10+",
    label: "Integrated Business Verticals",
    sub: "Digital, Tech & Real-World",
  },
  {
    value: "24/7",
    label: "Automated Systems Active",
    sub: "AI & WhatsApp Pipelines",
  },
  {
    value: "100%",
    label: "Direct In-House Delivery",
    sub: "No Middleman Friction",
  },
  {
    value: "PAN-IN",
    label: "Headquartered in Bengaluru",
    sub: "Serving Regional & Global",
  },
];

export default function TrustRibbon() {
  const ribbonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ribbonRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "bottom top",
            toggleActions: "play reset play reset",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ribbonRef}
      style={{
        background: "var(--color-ink)",
        padding: "2.5rem 0",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div className="trust-ribbon-inner">
        {metrics.map((m, i) => (
          <div key={i} className={`trust-item${i < metrics.length - 1 ? " trust-item--divider" : ""}`}>
            <span className="trust-value">{m.value}</span>
            <span className="trust-label">{m.label}</span>
            <span className="trust-sub">{m.sub}</span>
          </div>
        ))}
      </div>

      <style>{`
        .trust-ribbon-inner {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          justify-content: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .trust-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          gap: 0.3rem;
          padding: 0.5rem 1.5rem;
          opacity: 0;
          text-align: center;
        }

        .trust-item--divider {
          border-right: 1px solid rgba(255, 253, 248, 0.08);
        }

        .trust-value {
          font-family: var(--font-display, 'Archivo', sans-serif);
          font-weight: 900;
          font-size: 1.5rem;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }

        .trust-label {
          font-family: var(--font-mono, 'Space Mono', monospace);
          font-size: 0.6875rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-gold, #c8a84b);
          line-height: 1.4;
        }

        .trust-sub {
          font-family: var(--font-mono, 'Space Mono', monospace);
          font-size: 0.6rem;
          color: rgba(255, 253, 248, 0.4);
          line-height: 1.4;
        }

        @media (max-width: 639px) {
          .trust-ribbon-inner {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
            padding: 0;
          }

          .trust-item {
            padding: 1.25rem 1rem;
            border-right: none !important;
          }

          .trust-item:nth-child(1),
          .trust-item:nth-child(2) {
            border-bottom: 1px solid rgba(255, 253, 248, 0.08);
          }

          .trust-item:nth-child(1),
          .trust-item:nth-child(3) {
            border-right: 1px solid rgba(255, 253, 248, 0.08) !important;
          }
        }
      `}</style>
    </div>
  );
}
