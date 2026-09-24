"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowRightIcon } from "@/components/ui/Icons";

const ECO_NODES = [
  { label: "DIGITAL", top: "10%", left: "20%" },
  { label: "TECHNOLOGY", top: "10%", left: "75%" },
  { label: "PRODUCTS", top: "80%", left: "20%" },
  { label: "SERVICES", top: "80%", left: "75%" },
];

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<SVGElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      // Hero content entrance
      const tl = gsap.timeline({ delay: 0.1 });

      tl.from(".hero-badge", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          ".hero-heading",
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          ".hero-tagline",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 16,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".eco-node",
          {
            opacity: 0,
            scale: 0.7,
            stagger: 0.15,
            duration: 0.5,
            ease: "back.out(1.5)",
          },
          "-=0.2",
        )
        .from(
          ".eco-center",
          {
            opacity: 0,
            scale: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "<0.2",
        )
        .from(
          ".eco-line",
          {
            strokeDashoffset: 1,
            strokeDasharray: "0 1",
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "<0.1",
        );

      // Subtle float animation on center
      gsap.to(".eco-center", {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-heading">
      {/* Background grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.35,
        }}
      />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Content */}
        <div ref={contentRef} className="hero__content">
          <div className="hero-badge badge">
            One Enterprise. Multiple Businesses. One Connected Ecosystem.
          </div>

          <h1
            id="hero-heading"
            className="t-hero hero-heading"
            style={{ marginBottom: "1rem" }}
          >
            SATHYA <span className="accent">ENTERPRISES</span>
          </h1>

          <p
            className="hero-tagline"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(0.875rem, 1.5vw, 1.1rem)",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-red-deep)",
              marginBottom: "2.5rem",
            }}
          >
            BUILD. MARKET. AUTOMATE. GROW.
          </p>

          <div className="btn-row hero-cta">
            <Link className="btn btn--lg" href="/ecosystem">
              <span className="btn__label">Explore Our Businesses</span>
              <ArrowRightIcon />
            </Link>
            <Link className="btn btn--secondary btn--lg" href="/contact">
              <span className="btn__label">Start a Conversation</span>
              <ArrowRightIcon />
            </Link>
          </div>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-ink-soft)",
              marginTop: "3rem",
            }}
          >
            10+ Business Opportunities. One Vision.
          </p>
        </div>

        {/* Ecosystem diagram */}
        <div ref={diagramRef} className="hero__diagram" aria-hidden="true">
          <div className="eco-stage">
            {/* SVG connector lines */}
            <svg
              ref={linesRef as React.RefObject<SVGSVGElement>}
              viewBox="0 0 400 400"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              {/* Lines from nodes to center (50%,50%) */}
              <line
                className="eco-line"
                x1="80"
                y1="40"
                x2="200"
                y2="200"
                stroke="var(--color-gold)"
                strokeWidth="1"
                opacity="0.6"
                strokeDasharray="0 1"
                pathLength="1"
              />
              <line
                className="eco-line"
                x1="300"
                y1="40"
                x2="200"
                y2="200"
                stroke="var(--color-gold)"
                strokeWidth="1"
                opacity="0.6"
                strokeDasharray="0 1"
                pathLength="1"
              />
              <line
                className="eco-line"
                x1="80"
                y1="360"
                x2="200"
                y2="200"
                stroke="var(--color-gold)"
                strokeWidth="1"
                opacity="0.6"
                strokeDasharray="0 1"
                pathLength="1"
              />
              <line
                className="eco-line"
                x1="300"
                y1="360"
                x2="200"
                y2="200"
                stroke="var(--color-gold)"
                strokeWidth="1"
                opacity="0.6"
                strokeDasharray="0 1"
                pathLength="1"
              />
            </svg>

            {/* Center node with Logo */}
            <div
              ref={centerRef}
              className="eco-center overflow-hidden border-2 border-amber-400 shadow-2xl relative"
              style={{ padding: 0 }}
            >
              <Image
                src="/images/logo.png"
                alt="Sathya Enterprises Central Node"
                fill
                sizes="(max-width: 768px) 100px, 144px"
                className="object-cover"
                priority
              />
            </div>

            {/* Peripheral nodes */}
            {ECO_NODES.map((node) => (
              <div
                key={node.label}
                className="eco-node"
                style={{ top: node.top, left: node.left }}
              >
                {node.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
