"use client";

import { useRef } from "react";
import { useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";

const fine = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * Card interaction: a gentle 3D tilt and a spotlight that follows the pointer (mouse only),
 * and a press-down on touch. Put the card's own radius on `className` — the light inherits it.
 */
export function TiltCard({
  children,
  className = "",
  max = 5,
  light = "rgb(255 255 255 / 0.16)",
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  light?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  const lx = useMotionValue(-200);
  const ly = useMotionValue(-200);
  const glow = useMotionTemplate`radial-gradient(260px circle at ${lx}px ${ly}px, ${light}, transparent 70%)`;

  return (
    <m.div
      ref={ref}
      className={`relative [transform-style:preserve-3d] ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      whileTap={{ scale: 0.985 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !fine()) return;
        const r = ref.current!.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        lx.set(x);
        ly.set(y);
        ry.set((x / r.width - 0.5) * max * 2);
        rx.set(-(y / r.height - 0.5) * max * 2);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
        lx.set(-200);
        ly.set(-200);
      }}
    >
      {children}
      <m.span aria-hidden className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]" style={{ background: glow }} />
    </m.div>
  );
}

/** Primary buttons lean toward the cursor (≤ 8px). No effect on touch. */
export function Magnetic({ children, className = "", strength = 0.28 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 16 });
  const y = useSpring(0, { stiffness: 220, damping: 16 });
  return (
    <m.span
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set(Math.max(-8, Math.min(8, (e.clientX - (r.left + r.width / 2)) * strength)));
        y.set(Math.max(-8, Math.min(8, (e.clientY - (r.top + r.height / 2)) * strength)));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.span>
  );
}
