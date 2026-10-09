"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import bg from "@/assets/hero/bg.jpg";
import man from "@/assets/hero/man.png";
import clouds1 from "@/assets/hero/clouds-1.png";
import clouds2 from "@/assets/hero/clouds-2.png";
import mountainLeft from "@/assets/hero/mountain-left.png";
import mountainRight from "@/assets/hero/mountain-right.png";

/**
 * Layered mountain hero. Every layer is a full-frame cut-out stacked in this order (back → front):
 * sky, headline, hiker, clouds, the two ice walls. The headline sits *behind* the hiker, so the
 * figure stands in front of the name.
 *
 * Load: layers rise from below / slide in from the sides one after another (CSS, .hero-in-*).
 * Scroll: the stage is pinned while you scroll through it; the ice walls part to the sides and
 * every layer zooms towards you at its own rate, the hiker drops away and the scene fades into
 * the page — the fly-through of the Valentine parallax reference.
 */

const LAYER = "pointer-events-none select-none object-cover";

/** Scroll progress (0–100) → transform for one layer; `x`/`y` in %, `s` is extra scale per unit. */
function useLayer(p: MotionValue<number>, { x = 0, y = 0, s = 0 }: { x?: number; y?: number; s?: number }) {
  return useTransform(p, (v) => `translate3d(${x * v}%, ${y * v}%, 0) scale(${1 + s * v})`);
}

export function HeroParallax() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Function form on purpose: the array form gets handed to a native scroll timeline, which misreads
  // a sticky section's range.
  const p = useTransform(scrollYProgress, (v) => (reduced ? 0 : Math.min(1, Math.max(0, v)) * 100));

  const sky = useLayer(p, { s: 0.004 });
  const text = useLayer(p, { y: 0.9, s: 0.006 });
  const hiker = useLayer(p, { y: 1.2, s: 0.02 });
  const cloudsA = useLayer(p, { x: 1.2, y: 0.4, s: 0.015 });
  const cloudsB = useLayer(p, { x: -1.2, y: 0.2, s: 0.015 });
  const left = useLayer(p, { x: -1.1, s: 0.012 });
  const right = useLayer(p, { x: 1.1, s: 0.012 });
  const textOpacity = useTransform(p, (v) => Math.max(0, 1 - Math.max(0, v - 45) / 35));
  const veil = useTransform(p, (v) => Math.max(0, (v - 70) / 30));

  return (
    <section ref={ref} aria-label="Sathya Enterprises" className="relative h-[220svh] bg-ivory">
      <div className="sticky top-0 h-svh overflow-hidden bg-[#cfe3f1]">
        <m.div style={{ transform: sky }} className="absolute inset-0">
          <Image src={bg} alt="" fill priority sizes="100vw" placeholder="blur" className={LAYER} />
        </m.div>

        <m.div style={{ transform: text, opacity: textOpacity }} className="absolute inset-0 flex items-start justify-center pt-[calc(var(--header-h)+8svh)]">
          <h1 className="hero-in-up px-[var(--gutter)] text-center font-display font-extrabold uppercase leading-[0.86] tracking-[-0.03em] text-white [filter:drop-shadow(0_0.5px_0.5px_#20496a)_drop-shadow(0.5px_0.5px_0.5px_#a7f4ed)] [text-shadow:2px_2px_2px_#20496a]" style={{ "--d": "0s" } as React.CSSProperties}>
            <span className="block text-[calc(5vw+5vh)]">Sathya</span>
            <span className="mt-[0.15em] block text-[calc(2vw+2vh)] tracking-[0.12em]">Enterprises</span>
          </h1>
        </m.div>

        <m.div style={{ transform: hiker }} className="absolute inset-0 origin-bottom">
          <div className="hero-in-up absolute inset-0" style={{ "--d": "0.5s" } as React.CSSProperties}>
            <Image src={man} alt="" fill sizes="100vw" className={`${LAYER} object-bottom`} />
          </div>
        </m.div>

        <m.div style={{ transform: cloudsA }} className="absolute inset-0">
          <div className="hero-in-up absolute inset-0" style={{ "--d": "0.8s" } as React.CSSProperties}>
            <Image src={clouds1} alt="" fill sizes="100vw" className={LAYER} />
          </div>
        </m.div>
        <m.div style={{ transform: cloudsB }} className="absolute inset-0">
          <div className="hero-in-up absolute inset-0" style={{ "--d": "1.1s" } as React.CSSProperties}>
            <Image src={clouds2} alt="" fill sizes="100vw" className={LAYER} />
          </div>
        </m.div>

        <m.div style={{ transform: left }} className="absolute inset-0 origin-left">
          <div className="hero-in-left absolute inset-0" style={{ "--d": "0.2s" } as React.CSSProperties}>
            <Image src={mountainLeft} alt="" fill sizes="100vw" className={`${LAYER} object-left`} />
          </div>
        </m.div>
        <m.div style={{ transform: right }} className="absolute inset-0 origin-right">
          <div className="hero-in-right absolute inset-0" style={{ "--d": "0.2s" } as React.CSSProperties}>
            <Image src={mountainRight} alt="" fill sizes="100vw" className={`${LAYER} object-right`} />
          </div>
        </m.div>

        {/* Soft fade into the page below, then the whole scene dissolves at the end of the pin. */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[12.5rem] bg-gradient-to-b from-transparent to-ivory" />
        <m.div aria-hidden style={{ opacity: veil }} className="absolute inset-0 bg-ivory" />
      </div>
    </section>
  );
}
