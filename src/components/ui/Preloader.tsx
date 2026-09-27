"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [loaded, setLoaded] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const progressObj = { value: 0 };
    const ctx = gsap.context(() => {
      // 1. Entrance of corner/edge elements
      gsap.fromTo(
        ".edge-element",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
        }
      );

      // Subtle float on edge elements
      gsap.to(".edge-element-float", {
        y: -6,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      // 2. Progress timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Slide out upwards smoothly
          gsap.to(preloaderRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: () => {
              document.body.style.overflow = "";
              setLoaded(true);
            },
          });
        },
      });

      tl.to(progressObj, {
        value: 100,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate: () => {
          const currentVal = Math.round(progressObj.value);
          if (counterRef.current) {
            counterRef.current.textContent = `${currentVal}%`;
          }
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${progressObj.value / 100})`;
          }
        },
      });
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
      className="fixed inset-0 z-[99999] flex flex-col justify-between bg-[#fafafa] text-[#090a0f] p-8 md:p-12 select-none"
      aria-label="Loading Sathya Enterprises"
    >
      {/* ─── TOP BAR (Google Labs Header Objects) ─── */}
      <div className="w-full flex items-center justify-between relative z-10">
        {/* Top Left: Status & Version Pill */}
        <div className="edge-element flex items-center gap-3">
          <div
            className="shadow-sm"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              lineHeight: 1,
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#18181b",
              }}
            >
              Live System
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "#a1a1aa",
              fontWeight: 500,
            }}
            className="hidden sm:inline-block"
          >
            v2.4.0
          </span>
        </div>

        {/* Top Center / Right: Extreme Edge Badges (Digital, Tech, etc.) */}
        <div className="edge-element flex items-center gap-3">
          {["Digital", "Technology", "Services"].map((tag) => (
            <span
              key={tag}
              className="edge-element-float shadow-sm"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 18px",
                borderRadius: "9999px",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#27272a",
                lineHeight: 1,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ─── EXTREME LEFT & RIGHT FLANKING LABELS ─── */}
      <div className="hidden lg:flex fixed top-1/2 -translate-y-1/2 left-8 -rotate-90 origin-left edge-element text-[10px] font-mono tracking-[0.3em] text-zinc-400 uppercase">
        SATHYA ENTERPRISES // 2026
      </div>
      <div className="hidden lg:flex fixed top-1/2 -translate-y-1/2 right-8 rotate-90 origin-right edge-element text-[10px] font-mono tracking-[0.3em] text-zinc-400 uppercase">
        BUILD · MARKET · AUTOMATE · GROW
      </div>

      {/* ─── CLEAN CENTER HUB ─── */}
      <div className="flex flex-col items-center justify-center text-center my-auto relative z-10 px-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-zinc-950 mb-2">
          SATHYA <span className="text-amber-600">ENTERPRISES</span>
        </h1>
        <p className="text-xs sm:text-sm font-mono tracking-[0.2em] text-zinc-500 uppercase">
          One Enterprise. Multiple Businesses. One Connected Ecosystem.
        </p>
      </div>

      {/* ─── BOTTOM BAR (Progress line & Percentage at extreme bottom) ─── */}
      <div className="w-full flex flex-col gap-3 relative z-10">
        {/* Progress bar line spanning full width */}
        <div className="w-full h-[2px] bg-zinc-200/80 rounded-full overflow-hidden relative">
          <div
            ref={progressBarRef}
            className="h-full w-full bg-gradient-to-r from-amber-500 via-amber-400 to-red-500 origin-left scale-x-0 rounded-full transition-transform duration-75"
          />
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-1">
          <div className="edge-element flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="uppercase text-[11px] tracking-wider text-zinc-400">
              Connecting Nodes
            </span>
          </div>

          <div className="edge-element font-bold text-sm text-zinc-900 font-mono" ref={counterRef}>
            0%
          </div>

          <div className="edge-element text-[11px] uppercase tracking-wider text-zinc-400 hidden sm:block">
            Bengaluru, IN
          </div>
        </div>
      </div>
    </div>
  );
}
