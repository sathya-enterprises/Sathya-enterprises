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
      gsap.from(ref.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section aria-labelledby="cta-heading">
      <div className="container">
        <div ref={ref} className="cta-band">
          <h2 id="cta-heading" className="t-h2">LET&apos;S BUILD WHAT&apos;S NEXT.</h2>
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
    </section>
  );
}
