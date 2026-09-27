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

// Precomputed organic curve from each node to the center (200,200),
// instead of straight spokes — reads less like a generic "hub" diagram.
const ECO_PATHS = [
  "M 80 40 Q 110 130, 200 200",
  "M 300 40 Q 270 130, 200 200",
  "M 80 360 Q 110 270, 200 200",
  "M 300 360 Q 270 270, 200 200",
];

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        full: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduce } = context.conditions as { reduce: boolean };

        const ctx = gsap.context(() => {
          if (reduce) {
            // Respect the user's preference: show the final state, no motion.
            gsap.set(
              [
                ".hero-badge",
                ".hero-heading",
                ".hero-tagline",
                ".hero-cta",
                ".hero-meta",
                ".eco-node",
                ".eco-center",
              ],
              { opacity: 1, y: 0, scale: 1 },
            );
            gsap.set(".eco-line", { strokeDashoffset: 0 });
            return;
          }

          const tl = gsap.timeline({ delay: 0.1 });

          tl.from(".hero-badge", {
            opacity: 0,
            y: 16,
            duration: 0.6,
            ease: "power3.out",
          })
            .from(
              ".hero-heading .word",
              {
                opacity: 0,
                y: 48,
                duration: 0.9,
                stagger: 0.08,
                ease: "power4.out",
              },
              "-=0.3",
            )
            .from(
              ".hero-tagline",
              { opacity: 0, y: 16, duration: 0.6, ease: "power3.out" },
              "-=0.55",
            )
            .from(
              ".hero-cta",
              { opacity: 0, y: 14, duration: 0.5, ease: "power3.out" },
              "-=0.4",
            )
            .from(
              ".hero-meta",
              { opacity: 0, duration: 0.5, ease: "power2.out" },
              "-=0.3",
            )
            .from(
              ".eco-line",
              {
                strokeDashoffset: 1,
                duration: 1,
                stagger: 0.12,
                ease: "power2.inOut",
              },
              "-=0.7",
            )
            .from(
              ".eco-node",
              {
                opacity: 0,
                scale: 0.7,
                stagger: 0.12,
                duration: 0.5,
                ease: "back.out(1.6)",
              },
              "-=0.9",
            )
            .from(
              ".eco-center",
              { opacity: 0, scale: 0, duration: 0.6, ease: "back.out(1.7)" },
              "-=0.3",
            )
            .from(
              ".eco-glow",
              { opacity: 0, scale: 0.6, duration: 1, ease: "power2.out" },
              "-=0.6",
            );

          // One quiet, continuous moment — a slow drift, not a loop of effects.
          gsap.to(".eco-center", {
            y: -8,
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.6,
          });
          gsap.to(".eco-glow", {
            scale: 1.12,
            opacity: 0.5,
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.6,
          });
        });

        return () => ctx.revert();
      },
    );

    return () => mm.revert();
  }, []);

  // Subtle parallax tilt on the diagram, following the pointer. Skipped
  // entirely for reduced-motion or touch-only devices.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

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

      {/* Soft radial wash to give the diagram side some depth */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(60% 55% at 80% 50%, color-mix(in srgb, var(--color-gold) 10%, transparent), transparent 70%)",
          pointerEvents: "none",
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
            <span className="word" style={{ display: "inline-block" }}>
              SATHYA
            </span>{" "}
            <span className="word accent" style={{ display: "inline-block" }}>
              ENTERPRISES
            </span>
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
            className="hero-meta"
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
        <div className="hero__diagram" aria-hidden="true">
          <div
            ref={stageRef}
            className="eco-stage"
            style={{ transformStyle: "preserve-3d" }}
          >
            <svg
              viewBox="0 0 400 400"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              {ECO_PATHS.map((d, i) => (
                <path
                  key={d}
                  className="eco-line"
                  d={d}
                  fill="none"
                  stroke="var(--color-gold)"
                  strokeWidth="1"
                  opacity="0.6"
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset="0"
                  data-index={i}
                />
              ))}
            </svg>

            {/* Glow behind the center node */}
            <div className="eco-glow" aria-hidden="true" />

            {/* Center node with logo */}
            <div className="eco-center overflow-hidden border-2 border-amber-400 shadow-2xl relative">
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
                <span className="eco-node__dot" aria-hidden="true" />
                {node.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
