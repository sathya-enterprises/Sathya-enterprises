"use client";

import { m, useTransform, type MotionValue } from "motion/react";

/** Four simple shapes drawn on a 360 × 360 canvas. */
export function Shape({ kind }: { kind: "clover" | "circle" | "square" | "hexagon" }) {
  return (
    <svg viewBox="0 0 360 360" className="block h-auto w-full" fill="currentColor">
      {kind === "circle" && <circle cx="180" cy="180" r="162" />}
      {kind === "square" && <rect x="20" y="20" width="320" height="320" rx="64" />}
      {kind === "hexagon" && (
        <polygon
          points="180,36 305,108 305,252 180,324 55,252 55,108"
          stroke="currentColor"
          strokeWidth="36"
          strokeLinejoin="round"
        />
      )}
      {kind === "clover" && (
        <>
          <circle cx="98" cy="98" r="80" />
          <circle cx="262" cy="98" r="80" />
          <circle cx="98" cy="262" r="80" />
          <circle cx="262" cy="262" r="80" />
          <circle cx="180" cy="180" r="110" />
        </>
      )}
    </svg>
  );
}

type Slot = {
  kind: "clover" | "circle" | "square" | "hexagon";
  color: string;
  /** Position of the shape's centre (mobile → desktop) and size. */
  place: string;
  size: string;
  tilt: number;
  /** How far it travels with the scroll — bigger = feels closer. */
  depth: number;
  float: React.CSSProperties;
  delay: number;
  desktopOnly?: boolean;
};

const SLOTS: Slot[] = [
  {
    kind: "clover",
    color: "text-gold",
    // Desktop: tucked further right and lower, clear of the one-line ecosystem heading.
    place: "left-[96%] top-[14%] md:left-[82%] md:top-[22%] lg:left-[96%] lg:top-[36%]",
    size: "w-[clamp(9rem,40vw,22rem)]",
    tilt: -18,
    depth: 220,
    float: { "--float-dur": "8s", "--amp-x": "1.5rem", "--amp-y": "2rem", "--amp-r": "10deg", "--float-phase": "-1.3s" } as React.CSSProperties,
    delay: 0,
  },
  {
    kind: "circle",
    color: "text-red",
    place: "left-[0%] top-[96%] md:left-[6%] md:top-[74%]",
    size: "w-[clamp(8rem,36vw,19rem)]",
    tilt: 0,
    depth: 140,
    float: { "--float-dur": "9.5s", "--amp-x": "-1.5rem", "--amp-y": "1.8rem", "--amp-r": "0deg", "--float-phase": "-3.8s" } as React.CSSProperties,
    delay: 0.17,
  },
  {
    kind: "square",
    color: "text-gold-tint",
    place: "left-[104%] top-[56%] md:left-[95%] md:top-[60%]",
    size: "w-[clamp(7.5rem,34vw,18rem)]",
    tilt: -25,
    depth: 300,
    float: { "--float-dur": "10.5s", "--amp-x": "1.8rem", "--amp-y": "2.2rem", "--amp-r": "12deg", "--float-phase": "-5.2s" } as React.CSSProperties,
    delay: 0.36,
  },
  {
    kind: "hexagon",
    color: "text-red-tint",
    place: "md:left-[9%] md:top-[22%]",
    size: "w-[clamp(7rem,20vw,14rem)]",
    tilt: 12,
    depth: 180,
    float: { "--float-dur": "8.5s", "--amp-x": "-1.2rem", "--amp-y": "2.4rem", "--amp-r": "-10deg", "--float-phase": "-7.4s" } as React.CSSProperties,
    delay: 0.54,
    desktopOnly: true,
  },
];

function SlotShape({ slot, progress }: { slot: Slot; progress: MotionValue<number> }) {
  // Scroll parallax: each shape lifts at its own speed and turns a little.
  const y = useTransform(progress, [0, 1], [0, -slot.depth]);
  const rotate = useTransform(progress, [0, 1], [slot.tilt, slot.tilt + slot.depth / 12]);

  return (
    <m.div
      style={{ y, rotate }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 ${slot.place} ${slot.size} ${slot.desktopOnly ? "hidden md:block" : ""}`}
    >
      <div className="hero-shape-enter" style={{ "--d": `${slot.delay}s` } as React.CSSProperties}>
        <div className={`hero-shape-float ${slot.color}`} style={slot.float}>
          <Shape kind={slot.kind} />
        </div>
      </div>
    </m.div>
  );
}

/**
 * Labs-style shape field in brand red and gold, used behind the hero and the ecosystem.
 * `progress` is the section's scroll progress, which drives the parallax.
 */
export function ShapeField({ progress, className = "inset-0" }: { progress: MotionValue<number>; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute overflow-hidden ${className}`}>
      {SLOTS.map((slot) => (
        <SlotShape key={slot.kind} slot={slot} progress={progress} />
      ))}
    </div>
  );
}
