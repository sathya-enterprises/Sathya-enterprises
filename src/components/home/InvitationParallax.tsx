"use client";

import { useRef } from "react";
import { m, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useArrival } from "@/lib/useArrival";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { Eyebrow } from "./primitives";
import { Shape } from "./ShapeField";

/**
 * "An open invitation": the Valentine parallax reference in brand colours, leading into the enquiry
 * card. The four cloud banks sit at the back; the headline, two brand shapes and a sealed envelope
 * are layered above them (z-10/20/30) so the banks never cover them.
 *
 * Arrival: the banks rise from below one after another, then the envelope, then the shapes slide in
 * from the sides (CSS, .invite-in + data-arrived).
 * Scroll: the stage is pinned; the shapes part to the sides, the envelope drops away and the cloud
 * banks sink, all zooming towards you, uncovering the headline behind them.
 */

/** Cloud banks, back → front: colour, height (% of the stage) and bump radii along the top edge. */
const BANKS = [
  { fill: "var(--color-gold-tint)", h: 62, bumps: [70, 110, 85, 130, 90, 120, 75, 105] },
  { fill: "var(--color-red-tint)", h: 50, bumps: [95, 70, 120, 80, 110, 70, 125, 90] },
  { fill: "var(--color-gold-light)", h: 40, bumps: [80, 120, 90, 70, 115, 95, 80, 110] },
  { fill: "var(--color-ivory)", h: 30, bumps: [110, 80, 95, 125, 75, 100, 120, 85] },
];

/** A scalloped bank: round bumps of the given radii across a 1200-wide strip, filled to the bottom. */
function bankPath(bumps: number[]) {
  const scale = 1200 / bumps.reduce((a, r) => a + 2 * r, 0);
  let d = "M0 400 L0 140";
  for (const r of bumps) {
    const w = 2 * r * scale;
    d += ` a${w / 2} ${Math.min(r, 130) * 0.9} 0 0 1 ${w} 0`;
  }
  return `${d} L1200 400 Z`;
}

function Envelope() {
  return (
    <svg viewBox="0 0 400 320" className="block h-auto w-full">
      {/* Shadow: a flat ellipse rather than a filter, so zooming it costs nothing to redraw */}
      <ellipse cx="200" cy="300" rx="170" ry="14" fill="var(--color-red-deep)" opacity="0.18" />
      {/* Letter peeking out */}
      <rect x="44" y="6" width="312" height="200" rx="10" fill="var(--color-ivory)" />
      <text x="200" y="66" textAnchor="middle" fill="var(--color-red)" className="font-display" fontSize="30" fontWeight="800" letterSpacing="-0.5">
        LET&apos;S GROW
      </text>
      <rect x="120" y="86" width="160" height="6" rx="3" fill="var(--color-gold-tint)" />
      {/* Body */}
      <rect x="10" y="80" width="380" height="200" rx="18" fill="var(--color-gold)" />
      <path d="M10 98 L200 200 L390 98 V262 a18 18 0 0 1 -18 18 H28 a18 18 0 0 1 -18 -18 Z" fill="#e8b52e" />
      <path d="M10 270 L170 170 M390 270 L230 170" stroke="#d99a1e" strokeWidth="4" strokeLinecap="round" />
      {/* Seal */}
      <circle cx="200" cy="196" r="38" fill="var(--color-red)" />
      <circle cx="200" cy="196" r="29" fill="none" stroke="var(--color-red-deep)" strokeWidth="3" />
      <text x="200" y="207" textAnchor="middle" fill="var(--color-gold-light)" className="font-display" fontSize="30" fontWeight="800" fontStyle="italic">
        SE
      </text>
    </svg>
  );
}

/** Scroll progress (0–100) → transform; `x`/`y` in % per unit, `s` extra scale per unit. */
function useLayer(p: MotionValue<number>, { x = 0, y = 0, s = 0 }: { x?: number; y?: number; s?: number }) {
  return useTransform(p, (v) => `translate3d(${x * v}%, ${y * v}%, 0) scale(${1 + s * v})`);
}

export function InvitationParallax() {
  const ref = useRef<HTMLElement>(null);
  const arrived = useArrival(ref);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // A stiff spring: just enough to smooth wheel notches without trailing behind the scroll.
  const smooth = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.4, restDelta: 0.001 });
  // Function form on purpose (see HeroParallax). The scene is fully open by 80% of the pin, so the
  // last stretch holds the headline still. Reduced motion shows the opened scene.
  const p = useTransform(smooth, (v) => (reduced ? 100 : Math.min(1, Math.max(0, v / 0.8)) * 100));

  // Zoom kept modest (≤2×): large scale changes force the browser to redraw the layers.
  const envelope = useLayer(p, { y: 1.7, s: 0.01 });
  const shapeL = useLayer(p, { x: -1.9, s: 0.008 });
  const shapeR = useLayer(p, { x: 1.9, s: 0.008 });
  const banks = [
    useLayer(p, { y: 0.8, s: 0.006 }),
    useLayer(p, { y: 0.6, s: 0.006 }),
    useLayer(p, { y: 0.4, s: 0.006 }),
    useLayer(p, { y: 0.2, s: 0.006 }),
  ];
  const titleOpacity = useTransform(p, (v) => Math.min(1, Math.max(0, (v - 20) / 40)));
  const titleY = useTransform(p, (v) => `${Math.max(0, 1 - (v - 20) / 40) * 12}%`);

  return (
    <section ref={ref} aria-label="An open invitation" data-arrived={arrived} className="relative h-[220svh] bg-ivory">
      <div className="sticky top-0 h-svh overflow-hidden bg-gradient-to-b from-ivory via-gold-light to-gold-tint">
        {/* Headline, uncovered as the scene opens */}
        <m.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-[var(--gutter)] pb-[16svh] text-center"
        >
          <Eyebrow>An open invitation</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2.75rem,10vw,8rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-ink">
            Let&apos;s grow<span className="text-red">,</span>
            <br />
            <span className="text-red">together</span>
            <span className="text-gold">.</span>
          </h2>
          <p className="t-lead mx-auto mt-6 max-w-xl text-ink-soft">
            One partner to build, market, lead and grow. Tell us where you are — we&apos;ll show you the next step.
          </p>
        </m.div>

        {/* Brand shapes on either side */}
        <m.div aria-hidden style={{ transform: shapeL }} className="absolute left-[6vw] top-[14svh] z-20 will-change-transform w-[min(32vw,34svh)] text-gold">
          <span className="invite-in block" style={{ "--from": "translate3d(-140%,0,0)", "--d": "1.5s" } as React.CSSProperties}>
            <Shape kind="clover" />
          </span>
        </m.div>
        <m.div aria-hidden style={{ transform: shapeR }} className="absolute right-[6vw] top-[22svh] z-20 will-change-transform w-[min(22vw,24svh)] text-red">
          <span className="invite-in block" style={{ "--from": "translate3d(140%,0,0)", "--d": "1.5s" } as React.CSSProperties}>
            <Shape kind="circle" />
          </span>
        </m.div>

        {/* Envelope */}
        <m.div aria-hidden style={{ transform: envelope }} className="absolute inset-x-0 top-[24svh] z-30 flex justify-center will-change-transform">
          <span className="invite-in block w-[min(72vw,52svh)]" style={{ "--from": "translate3d(0,140svh,0)", "--d": "0.9s" } as React.CSSProperties}>
            <Envelope />
          </span>
        </m.div>

        {/* Cloud banks */}
        {BANKS.map((b, i) => (
          <m.div key={i} aria-hidden style={{ transform: banks[i] }} className="absolute inset-x-[-10%] bottom-0 origin-bottom will-change-transform">
            <span
              className="invite-in block"
              style={{ height: `${b.h}svh`, "--from": "translate3d(0,100%,0)", "--d": `${0.15 + i * 0.2}s` } as React.CSSProperties}
            >
              <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="block h-full w-full">
                <path d={bankPath(b.bumps)} fill={b.fill} />
              </svg>
            </span>
          </m.div>
        ))}
      </div>
    </section>
  );
}
