"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon } from "@/components/ui/Icons";

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            end: "bottom top",
            toggleActions: "play reset play reset",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section aria-labelledby="cta-heading">
      <div className="container">
        <div
          ref={ref}
          className="cta-band"
          style={{
            position: "relative",
            overflow: "hidden",
            borderTop: "3px solid var(--color-gold)",
          }}
        >
          {/* Radial glow backdrop */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(200,168,75,0.15), transparent)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Ghost scale text */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "-0.05em",
              bottom: "-0.25em",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(8rem, 22vw, 18rem)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "var(--color-chalk)",
              opacity: 0.03,
              pointerEvents: "none",
              userSelect: "none",
              zIndex: 0,
            }}
          >
            CTA
          </span>

          {/* Main content */}
          <div className="cta-band__inner" style={{ position: "relative", zIndex: 1 }}>
            <h2 id="cta-heading" className="t-h2">
              LET&apos;S BUILD WHAT&apos;S NEXT.
            </h2>
            <p className="t-lead">
              Sathya Enterprises operates across digital growth, technology, data,
              products, infrastructure and business services — one connected
              ecosystem built to grow.
            </p>
            <div className="btn-row" style={{ justifyContent: "center" }}>
              <Link className="btn btn--lg" href="/contact">
                <span className="btn__label">Start a Conversation</span>
                <ArrowRightIcon />
              </Link>
              <Link className="btn btn--secondary btn--lg" href="/ecosystem">
                <span className="btn__label">Explore Our Businesses</span>
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
