"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const TAGS = ["Digital", "Technology", "Services", "Products"];

export default function Preloader() {
  const [loaded, setLoaded] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const progressObj = { value: 0 };

    // Set initial states
    gsap.set(".pre-tag", { opacity: 0, y: 12 });
    gsap.set(".pre-side-label", { opacity: 0 });
    gsap.set(".pre-bottom-row", { opacity: 0 });
    if (titleRef.current) {
      gsap.set(titleRef.current.querySelectorAll(".pre-word"), {
        yPercent: 110,
        opacity: 0,
      });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // slide the whole preloader up then hide
          gsap.to(preloaderRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",
            onComplete: () => {
              document.body.style.overflow = "";
              setLoaded(true);
            },
          });
        },
      });

      // 1 — tags drift in
      tl.to(".pre-tag", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
      });

      // 2 — title words clip up
      tl.to(
        ".pre-word",
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power4.out",
        },
        "-=0.2"
      );

      // 3 — side labels
      tl.to(
        ".pre-side-label",
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.3"
      );

      // 4 — progress runs
      tl.to(
        progressObj,
        {
          value: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            const v = Math.round(progressObj.value);
            if (counterRef.current) counterRef.current.textContent = `${v}%`;
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${progressObj.value / 100})`;
            }
          },
        },
        "-=0.1"
      );

      // 5 — bottom row appears
      tl.to(
        ".pre-bottom-row",
        { opacity: 1, duration: 0.3, ease: "power2.out" },
        "-=1.2"
      );
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (loaded) return null;

  return (
    <div
      ref={preloaderRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "var(--color-ink)",
        color: "var(--color-chalk)",
        padding: "clamp(1.5rem, 4vw, 3rem)",
        userSelect: "none",
        overflow: "hidden",
      }}
      aria-label="Loading Sathya Enterprises"
      aria-live="polite"
    >
      {/* ── Subtle grid overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,253,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,253,248,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {/* ── Gold radial glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,168,75,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── TOP: tag pills ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left: live badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: "0.4rem 0.9rem",
            border: "1px solid rgba(200,168,75,0.35)",
            borderRadius: "9999px",
          }}
          className="pre-tag"
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              flexShrink: 0,
              boxShadow: "0 0 6px #10b981",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "rgba(255,253,248,0.9)",
            }}
          >
            Live System
          </span>
        </div>

        {/* Right: ecosystem tags */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="pre-tag"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.35rem 0.8rem",
                border: "1px solid rgba(255,253,248,0.1)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(255,253,248,0.55)",
                borderRadius: "2px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Side labels ── */}
      <div
        className="pre-side-label"
        style={{
          position: "fixed",
          top: "50%",
          left: "clamp(1.5rem, 4vw, 3rem)",
          transform: "translateY(-50%) rotate(-90deg)",
          transformOrigin: "center center",
          fontFamily: "var(--font-mono)",
          fontSize: "0.5625rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(255,253,248,0.2)",
          whiteSpace: "nowrap",
          display: "none",
        }}
        aria-hidden="true"
      >
        SATHYA ENTERPRISES // 2026
      </div>
      <div
        className="pre-side-label"
        style={{
          position: "fixed",
          top: "50%",
          right: "clamp(1.5rem, 4vw, 3rem)",
          transform: "translateY(-50%) rotate(90deg)",
          transformOrigin: "center center",
          fontFamily: "var(--font-mono)",
          fontSize: "0.5625rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(255,253,248,0.2)",
          whiteSpace: "nowrap",
          display: "none",
        }}
        aria-hidden="true"
      >
        BUILD · MARKET · AUTOMATE · GROW
      </div>

      {/* ── CENTER: brand name ── */}
      <div
        ref={titleRef}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          gap: "1rem",
        }}
      >
        {/* Ghost large background text */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(6rem, 18vw, 14rem)",
            color: "rgba(255,253,248,0.02)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          SE
        </span>

        <div style={{ position: "relative", zIndex: 1, overflow: "hidden", lineHeight: 1 }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              margin: 0,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0 0.3em",
            }}
          >
            <span
              className="pre-word"
              style={{ display: "inline-block", color: "var(--color-chalk)" }}
            >
              SATHYA
            </span>
            <span
              className="pre-word"
              style={{ display: "inline-block", color: "var(--color-gold)" }}
            >
              ENTERPRISES
            </span>
          </h1>
        </div>

        <p
          className="pre-word"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.55rem, 1.2vw, 0.75rem)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,253,248,0.4)",
            margin: 0,
          }}
        >
          One Enterprise. Multiple Businesses. One Connected Ecosystem.
        </p>
      </div>

      {/* ── BOTTOM: progress ── */}
      <div
        className="pre-bottom-row"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.65rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Progress track */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "rgba(255,253,248,0.1)",
            overflow: "hidden",
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              height: "100%",
              width: "100%",
              background:
                "linear-gradient(90deg, var(--color-gold), rgba(200,168,75,0.6))",
              transformOrigin: "left",
              transform: "scaleX(0)",
            }}
          />
        </div>

        {/* Bottom label row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                backgroundColor: "var(--color-gold)",
                animation: "pre-pulse 1.5s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.5625rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,253,248,0.35)",
              }}
            >
              Initialising Systems
            </span>
          </div>

          <div
            ref={counterRef}
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: "0.875rem",
              color: "var(--color-chalk)",
            }}
          >
            0%
          </div>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5625rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,253,248,0.25)",
            }}
          >
            Bengaluru, IN
          </span>
        </div>
      </div>

      <style>{`
        @keyframes pre-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @media (min-width: 1024px) {
          .pre-side-label { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
