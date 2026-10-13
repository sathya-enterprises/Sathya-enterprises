"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import bg from "@/assets/hero/bg.jpg";
import clouds1 from "@/assets/hero/clouds-1.png";
import clouds2 from "@/assets/hero/clouds-2.png";
import mountainLeft from "@/assets/hero/mountain-left.png";
import mountainRight from "@/assets/hero/mountain-right.png";

/**
 * Layered mountain hero. Every layer is a full-frame cut-out stacked in this order (back → front):
 * sky, clouds, the two ice walls, with the headline lifted above them all so longer page titles
 * are never cut off by the walls. The title lines are props, so inner pages reuse this hero.
 *
 * Load: layers rise from below / slide in from the sides one after another (CSS, .hero-in-*).
 * Scroll: the stage is pinned while you scroll through it; the ice walls part to the sides and
 * every layer zooms towards you at its own rate and the scene scrolls
 * away into the page — the fly-through of the Valentine parallax reference.
 */

const LAYER = "pointer-events-none select-none object-cover";
/** Layers are zoomed on scroll, so they are served at higher quality (allowed in next.config.ts). */
const QUALITY = 90;
/**
 * The ice walls fill the outer ~31% of their frames. On a portrait screen the frame is cropped hard,
 * so each wall is anchored away from its own edge — 38% / 62% on phones, where it shows as a slim
 * icy frame around the view, and 30% / 70% from md; on wide screens nothing is cropped.
 */
/** Sized for the zoomed-in end of the scroll (~1.6×), so phones fetch enough pixels for it too. */
const SIZES = "160vw";

/** Scroll progress (0–100) → transform for one layer; `x`/`y` in %, `s` is extra scale per unit. */
function useLayer(p: MotionValue<number>, { x = 0, y = 0, s = 0 }: { x?: number; y?: number; s?: number }) {
  return useTransform(p, (v) => `translate3d(${x * v}%, ${y * v}%, 0) scale(${1 + s * v})`);
}

export function HeroParallax({
  top = "Sathya",
  bottom = "Enterprises",
  label = "Sathya Enterprises",
}: {
  /** Big gold line of the headline. */
  top?: string;
  /** Smaller, widely tracked red line under it. */
  bottom?: string;
  label?: string;
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // The scene follows the scroll through a spring rather than jumping with it, so each wheel notch
  // glides instead of stepping (the page itself still scrolls natively).
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.6, restDelta: 0.0005 });
  // Function form on purpose: the array form gets handed to a native scroll timeline, which misreads
  // a sticky section's range.
  const p = useTransform(smooth, (v) => (reduced ? 0 : Math.min(1, Math.max(0, v)) * 100));

  // Zoom is capped so no layer is enlarged past ~1.6×: the cut-outs are 2049px wide, and beyond that
  // their pixels show. The fly-through comes from the layers parting and dropping away instead.
  const sky = useLayer(p, { s: 0.0015 });
  const text = useLayer(p, { y: 0.9, s: 0.004 });
  const cloudsA = useLayer(p, { x: 1.4, y: 0.4, s: 0.005 });
  const cloudsB = useLayer(p, { x: -1.4, y: 0.2, s: 0.005 });
  const left = useLayer(p, { x: -1.25, s: 0.004 });
  const right = useLayer(p, { x: 1.25, s: 0.004 });
  const textOpacity = useTransform(p, (v) => Math.max(0, 1 - Math.max(0, v - 45) / 35));

  return (
    <section ref={ref} aria-label={label} className="relative h-[220svh] bg-ivory">
      <div className="sticky top-0 h-svh overflow-hidden bg-[#cfe3f1]">
        <m.div style={{ transform: sky }} className="absolute inset-0">
          <Image src={bg} alt="" fill priority sizes={SIZES} quality={QUALITY} placeholder="blur" className={LAYER} />
        </m.div>

        <m.div style={{ transform: text, opacity: textOpacity }} className="absolute inset-0 z-10 flex items-start justify-center pt-[calc(var(--header-h)+8svh)]">
          <h1 className="hero-in-up px-[var(--gutter)] text-center font-display font-extrabold uppercase leading-[0.86] tracking-[-0.03em] [text-shadow:0_2px_4px_rgb(0_0_0/0.35)]" style={{ "--d": "0s" } as React.CSSProperties}>
            {/* Capped by its letter count so long page names (e.g. "Technology") still fit a phone's width. */}
            <span
              className="block text-gold [text-shadow:2px_2px_0_var(--color-red-deep),0_4px_12px_rgb(0_0_0/0.35)]"
              style={{ fontSize: `min(calc(5vw + 5vh), ${(88 / (top.length * 0.7)).toFixed(2)}vw)` }}
            >
              {top}
            </span>{" "}
            {/* Phones: a size that wraps into balanced lines with room between them; md+ as before. */}
            <span className="mx-auto mt-[0.45em] block max-w-[22ch] text-[clamp(0.95rem,4.6vw,1.35rem)] leading-[1.3] tracking-[0.1em] text-red [text-shadow:1px_1px_0_#fff,0_2px_8px_rgb(255_255_255/0.6)] [text-wrap:balance] md:mt-[0.15em] md:max-w-none md:text-[calc(2vw+2vh)] md:leading-[inherit] md:tracking-[0.12em]">
              {bottom}
            </span>
          </h1>
        </m.div>

        <m.div style={{ transform: cloudsA }} className="absolute inset-0">
          <div className="hero-in-up absolute inset-0" style={{ "--d": "0.8s" } as React.CSSProperties}>
            <Image src={clouds1} alt="" fill sizes={SIZES} quality={QUALITY} className={LAYER} />
          </div>
        </m.div>
        <m.div style={{ transform: cloudsB }} className="absolute inset-0">
          <div className="hero-in-up absolute inset-0" style={{ "--d": "1.1s" } as React.CSSProperties}>
            <Image src={clouds2} alt="" fill sizes={SIZES} quality={QUALITY} className={LAYER} />
          </div>
        </m.div>

        <m.div style={{ transform: left }} className="absolute inset-0 origin-left">
          <div className="hero-in-left absolute inset-0" style={{ "--d": "0.2s" } as React.CSSProperties}>
            <Image src={mountainLeft} alt="" fill sizes={SIZES} quality={QUALITY} className={`${LAYER} object-[38%_50%] md:object-[30%_50%]`} />
          </div>
        </m.div>
        <m.div style={{ transform: right }} className="absolute inset-0 origin-right">
          <div className="hero-in-right absolute inset-0" style={{ "--d": "0.2s" } as React.CSSProperties}>
            <Image src={mountainRight} alt="" fill sizes={SIZES} quality={QUALITY} className={`${LAYER} object-[62%_50%] md:object-[70%_50%]`} />
          </div>
        </m.div>

        {/* Soft fade into the page below. */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[12.5rem] bg-gradient-to-b from-transparent to-ivory" />
      </div>
    </section>
  );
}
