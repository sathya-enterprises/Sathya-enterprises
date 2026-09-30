"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowRightIcon } from "@/components/ui/Icons";

/* ─── Data ───────────────────────────────────────────────────────── */

const ECO_NODES = [
  { label: "DIGITAL",     top: "10%", left: "18%" },
  { label: "TECHNOLOGY",  top: "10%", left: "78%" },
  { label: "PRODUCTS",    top: "82%", left: "18%" },
  { label: "SERVICES",    top: "82%", left: "78%" },
];

// Organic cubic-bezier curves from each corner node toward the center (200,200)
const ECO_PATHS = [
  "M 72 40  C 100 100, 140 150, 200 200",
  "M 328 40  C 300 100, 260 150, 200 200",
  "M 72 360  C 100 300, 140 250, 200 200",
  "M 328 360  C 300 300, 260 250, 200 200",
];

/* ─── Component ──────────────────────────────────────────────────── */

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const stageRef   = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number | null>(null);

  /* ── Main entrance animation ── */
  useEffect(() => {
    if (!contentRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        full:   "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduce } = context.conditions as { reduce: boolean };

        const ctx = gsap.context(() => {
          if (reduce) {
            // Respect the user's preference — show final state immediately
            gsap.set(
              [
                ".hero-badge",
                ".hero-heading .word",
                ".hero-tagline",
                ".hero-cta",
                ".hero-meta",
                ".eco-node",
                ".eco-center",
                ".eco-glow",
                ".eco-pulse-ring",
                ".hero-deco-num",
              ],
              { opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)" },
            );
            gsap.set(".eco-line", { strokeDashoffset: 0 });
            return;
          }

          // ── Entrance timeline ──────────────────────────────────────────
          const tl = gsap.timeline({ delay: 0.15 });

          // Decorative number fades in gently
          tl.from(".hero-deco-num", {
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
          });

          // Badge slides up
          tl.from(
            ".hero-badge",
            { opacity: 0, y: 18, duration: 0.65, ease: "power3.out" },
            "-=0.9",
          );

          // H1 words: Stripe-style clip-path reveal from bottom
          tl.fromTo(
            ".hero-heading .word",
            { clipPath: "inset(0% 0% 100% 0%)", y: 32 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              y: 0,
              duration: 0.95,
              stagger: 0.1,
              ease: "power4.out",
            },
            "-=0.4",
          );

          // Tagline
          tl.from(
            ".hero-tagline",
            { opacity: 0, y: 16, duration: 0.6, ease: "power3.out" },
            "-=0.55",
          );

          // CTA buttons
          tl.from(
            ".hero-cta",
            { opacity: 0, y: 14, duration: 0.55, ease: "power3.out" },
            "-=0.4",
          );

          // Meta line
          tl.from(
            ".hero-meta",
            { opacity: 0, duration: 0.5, ease: "power2.out" },
            "-=0.3",
          );

          // SVG organic paths draw themselves (strokeDashoffset 1→0)
          tl.from(
            ".eco-line",
            {
              strokeDashoffset: 1,
              duration: 1.1,
              stagger: 0.13,
              ease: "power2.inOut",
            },
            "-=0.7",
          );

          // Peripheral nodes pop in
          tl.from(
            ".eco-node",
            {
              opacity: 0,
              scale: 0.6,
              stagger: 0.12,
              duration: 0.55,
              ease: "back.out(1.7)",
            },
            "-=0.9",
          );

          // Center logo node
          tl.from(
            ".eco-center",
            { opacity: 0, scale: 0, duration: 0.65, ease: "back.out(1.8)" },
            "-=0.4",
          );

          // Glow behind center
          tl.from(
            ".eco-glow",
            { opacity: 0, scale: 0.5, duration: 1.1, ease: "power2.out" },
            "-=0.65",
          );

          // Pulse ring fades in
          tl.from(
            ".eco-pulse-ring",
            { opacity: 0, scale: 0.4, duration: 0.7, ease: "power2.out" },
            "-=0.9",
          );

          // ── Continuous idle animations ─────────────────────────────────
          // Gentle float on center node
          gsap.to(".eco-center", {
            y: -9,
            duration: 3.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.8,
          });

          // Glow breathes
          gsap.to(".eco-glow", {
            scale: 1.15,
            opacity: 0.55,
            duration: 3.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.8,
          });

          // Pulse ring expands and fades (CSS handles it, but GSAP as fallback)
          gsap.to(".eco-pulse-ring", {
            scale: 1.6,
            opacity: 0,
            duration: 2.2,
            repeat: -1,
            ease: "power1.out",
            delay: 2,
          });
        }, contentRef);

        return () => ctx.revert();
      },
    );

    return () => mm.revert();
  }, []);

  /* ── Subtle parallax tilt on diagram (pointer only) ── */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const px = (e.clientX - rect.left)  / rect.width  - 0.5;
      const py = (e.clientY - rect.top)   / rect.height - 0.5;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        gsap.to(stage, {
          rotateX: py * -6,
          rotateY: px * 8,
          duration: 0.6,
          ease: "power2.out",
          transformPerspective: 800,
        });
      });
    };

    const handleLeave = () => {
      gsap.to(stage, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    stage.addEventListener("pointermove", handleMove);
    stage.addEventListener("pointerleave", handleLeave);

    return () => {
      stage.removeEventListener("pointermove", handleMove);
      stage.removeEventListener("pointerleave", handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Render ── */
  return (
    <section className="hero" aria-labelledby="hero-heading">

      {/* ── Background: subtle 40px CSS grid overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--color-line) 1px, transparent 1px), " +
            "linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.06,
          pointerEvents: "none",
        }}
      />

      {/* ── Background: gold-tinted radial wash on the right ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(62% 58% at 78% 50%, " +
            "color-mix(in srgb, var(--color-gold) 12%, transparent), transparent 72%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Decorative "01" in top-right corner ── */}
      <div
        className="hero-deco-num"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-0.05em",
          right: "-0.04em",
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "clamp(14rem, 28vw, 26rem)",
          lineHeight: 1,
          color: "var(--color-ink)",
          opacity: 0.028,
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.06em",
        }}
      >
        01
      </div>

      {/* ── Main container ── */}
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
        {/* ── Left: Editorial content (60%) ── */}
        <div
          ref={contentRef}
          className="hero__content"
          style={{ flex: "0 0 60%", maxWidth: "60%" }}
        >
          {/* Badge with left gold border accent */}
          <div
            className="hero-badge badge"
            style={{
              borderLeft: "3px solid var(--color-gold)",
              borderRadius: 0,
              paddingLeft: "0.85em",
              display: "inline-block",
            }}
          >
            One Enterprise. Multiple Businesses. One Connected Ecosystem.
          </div>

          {/* H1: clip-path word reveal via GSAP */}
          <h1
            id="hero-heading"
            className="t-hero hero-heading"
            style={{ marginBottom: "1rem", overflow: "hidden" }}
          >
            <span
              className="word"
              style={{ display: "inline-block" }}
            >
              SATHYA
            </span>{" "}
            <span
              className="word accent"
              style={{ display: "inline-block" }}
            >
              ENTERPRISES
            </span>
          </h1>

          {/* Tagline: mono, letter-spaced, gold/red-deep */}
          <p
            className="hero-tagline"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(0.75rem, 1.4vw, 1rem)",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-red-deep)",
              marginBottom: "2.75rem",
              borderLeft: "2px solid var(--color-gold)",
              paddingLeft: "0.75rem",
            }}
          >
            BUILD. MARKET. AUTOMATE. GROW.
          </p>

          {/* CTA buttons */}
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

          {/* Meta line */}
          <p
            className="hero-meta"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-ink-soft)",
              marginTop: "3.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: "24px",
                height: "1px",
                background: "var(--color-gold)",
                flexShrink: 0,
              }}
            />
            10+ Business Opportunities. One Vision.
          </p>
        </div>

        {/* ── Right: Ecosystem diagram (40%, absolute on desktop) ── */}
        <div className="hero__diagram" aria-hidden="true">
          <div
            ref={stageRef}
            className="eco-stage"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* ── SVG organic path lines ── */}
            <svg
              viewBox="0 0 400 400"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
            >
              {/* Subtle secondary glow paths (wider, very low opacity) */}
              {ECO_PATHS.map((d, i) => (
                <path
                  key={`glow-${i}`}
                  d={d}
                  fill="none"
                  stroke="var(--color-gold)"
                  strokeWidth="6"
                  opacity="0.07"
                  strokeLinecap="round"
                />
              ))}

              {/* Primary animated paths */}
              {ECO_PATHS.map((d, i) => (
                <path
                  key={`line-${i}`}
                  className="eco-line"
                  d={d}
                  fill="none"
                  stroke="var(--color-gold)"
                  strokeWidth="1.25"
                  opacity="0.65"
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  data-index={i}
                />
              ))}

              {/* Small tick marks at each path terminus (near nodes) */}
              {[
                { cx: 72,  cy: 40  },
                { cx: 328, cy: 40  },
                { cx: 72,  cy: 360 },
                { cx: 328, cy: 360 },
              ].map((pt, i) => (
                <circle
                  key={`tick-${i}`}
                  cx={pt.cx}
                  cy={pt.cy}
                  r="2.5"
                  fill="var(--color-gold)"
                  opacity="0.5"
                />
              ))}
            </svg>

            {/* ── Glow behind center node ── */}
            <div
              className="eco-glow"
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "50%",
                transform: "translate(-50%, -50%)",
                width: "13rem",
                height: "13rem",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-gold) 28%, transparent) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* ── Pulsing ring around center node ── */}
            <div
              className="eco-pulse-ring"
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "50%",
                transform: "translate(-50%, -50%)",
                width: "9.5rem",
                height: "9.5rem",
                borderRadius: "50%",
                border: "1.5px solid var(--color-gold)",
                opacity: 0.45,
                pointerEvents: "none",
              }}
            />

            {/* ── Center node: logo with inner glow ring ── */}
            <div
              className="eco-center overflow-hidden"
              style={{
                position: "absolute",
                inset: "50%",
                transform: "translate(-50%, -50%)",
                width: "9rem",
                height: "9rem",
                borderRadius: "50%",
                background: "var(--color-ink)",
                border: "2px solid var(--color-gold)",
                boxShadow:
                  "0 0 0 6px color-mix(in srgb, var(--color-gold) 14%, transparent), " +
                  "0 8px 32px rgba(0,0,0,0.28)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
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

            {/* ── Peripheral nodes: Google Labs pill badges ── */}
            {ECO_NODES.map((node) => (
              <div
                key={node.label}
                className="eco-node"
                style={{
                  top: node.top,
                  left: node.left,
                  /* Override globals.css .eco-node sizing for upgraded pill style */
                  padding: "0.45rem 1rem",
                  borderRadius: "999px",
                  border: "1.5px solid var(--color-gold)",
                  background: "var(--color-chalk)",
                  color: "var(--color-gold)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  transform: "translate(-50%, -50%)",
                  boxShadow:
                    "0 2px 12px rgba(200,168,75,0.15), " +
                    "inset 0 1px 0 rgba(255,255,255,0.8)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                }}
              >
                {/* Gold dot accent */}
                <span
                  className="eco-node__dot"
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "var(--color-gold)",
                    flexShrink: 0,
                  }}
                />
                {node.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Inline keyframes for CSS-based pulse ring fallback ── */}
      <style>{`
        @keyframes eco-pulse {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.45; }
          100% { transform: translate(-50%, -50%) scale(1.65); opacity: 0; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .eco-pulse-ring {
            animation: eco-pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        }
        /* Ensure hero content at 60% on desktop */
        @media (min-width: 900px) {
          .hero__content {
            flex: 0 0 60% !important;
            max-width: 60% !important;
          }
        }
        @media (max-width: 899px) {
          .hero__content {
            flex: unset !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
