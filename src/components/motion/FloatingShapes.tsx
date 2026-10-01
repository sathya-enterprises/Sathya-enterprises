"use client";

import { useEffect } from "react";
import { useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

type Kind = "core" | "dot" | "ring" | "pill" | "tile" | "plus" | "hex" | "orbit";

export type ShapeSpec = {
  kind: Kind;
  /** Position in % of the field. */
  x: number;
  y: number;
  /** Size in px (desktop); scaled down on small screens via CSS clamp. */
  size: number;
  color: string;
  /** Parallax depth: 0 = fixed, 1 = moves most. Negative moves against the scroll. */
  depth: number;
  rotate?: number;
  /** Hide on narrow screens to keep mobile layouts calm. */
  desktopOnly?: boolean;
};

function Glyph({ kind, color }: { kind: Kind; color: string }) {
  switch (kind) {
    case "core":
    case "dot":
      return <span className="block h-full w-full rounded-full" style={{ background: color }} />;
    case "ring":
      return <span className="block h-full w-full rounded-full border-[3px]" style={{ borderColor: color }} />;
    case "pill":
      return <span className="block h-[42%] w-full rounded-full" style={{ background: color, marginTop: "29%" }} />;
    case "tile":
      return <span className="block h-full w-full rounded-[28%]" style={{ background: color }} />;
    case "plus":
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full">
          <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7z" fill={color} />
        </svg>
      );
    case "hex":
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full">
          <path d="M12 1.5 21.5 7v10L12 22.5 2.5 17V7z" fill="none" stroke={color} strokeWidth="1.6" />
        </svg>
      );
    case "orbit":
      // The brand mark as a shape: core + four satellites.
      return (
        <svg viewBox="0 0 32 32" className="h-full w-full overflow-visible">
          <circle cx="16" cy="16" r="6" fill="var(--color-red)" />
          {[
            [16, 5],
            [27, 16],
            [16, 27],
            [5, 16],
          ].map(([cx, cy]) => (
            <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="2.4" fill={color} />
          ))}
        </svg>
      );
  }
}

function Shape({
  s,
  i,
  scrollY,
  px,
  py,
  reduce,
}: {
  s: ShapeSpec;
  i: number;
  scrollY: MotionValue<number>;
  px: MotionValue<number>;
  py: MotionValue<number>;
  reduce: boolean;
}) {
  const sy = useTransform(scrollY, (v) => (reduce ? 0 : -v * s.depth * 0.18));
  const mx = useTransform(px, (v) => v * s.depth * 26);
  const my = useTransform(py, (v) => v * s.depth * 26);
  const y = useTransform([sy, my] as MotionValue<number>[], ([a, b]: number[]) => a + b);
  // Deterministic "random" drift so server and client agree.
  const dur = 7 + ((i * 37) % 6);
  const amp = 8 + ((i * 13) % 10);
  return (
    <m.span
      className={`pointer-events-auto absolute ${s.desktopOnly ? "hidden md:block" : "block"}`}
      style={{
        left: `${s.x}%`,
        top: `${s.y}%`,
        width: `clamp(${Math.round(s.size * 0.55)}px, ${(s.size / 14.4).toFixed(2)}vw, ${s.size}px)`,
        aspectRatio: "1",
        x: mx,
        y,
      }}
    >
      {/* Three layers, one transform owner each: parallax (above) → CSS drift → hover/tap spring. */}
      <span
        className="block h-full w-full"
        data-ambient
        style={{
          animation: reduce ? undefined : `float-y ${dur}s var(--ease-in-out) ${-i * 1.3}s infinite`,
          ["--float-amp" as string]: `${-amp}px`,
        }}
      >
        <m.span
          tabIndex={-1}
          className="block h-full w-full cursor-grab active:cursor-grabbing"
          style={{ rotate: s.rotate ?? 0 }}
          whileHover={{ scale: 1.12, rotate: (s.rotate ?? 0) + 12 }}
          whileTap={{ scale: 0.86, rotate: (s.rotate ?? 0) - 25 }}
          transition={{ type: "spring", stiffness: 300, damping: 14 }}
        >
          <Glyph kind={s.kind} color={s.color} />
        </m.span>
      </span>
    </m.span>
  );
}

/**
 * A field of brand geometry (Google Labs' floating-shape principle, Sathya's shapes and colours).
 * Shapes drift slowly, parallax with scroll, lean toward the cursor, and react to hover / tap.
 * Decorative only: aria-hidden, behind content, and still under reduced motion.
 */
export function FloatingShapes({ shapes, className = "" }: { shapes: ShapeSpec[]; className?: string }) {
  const reduce = useReducedMotionSafe();
  const { scrollY } = useScroll();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 60, damping: 18 });
  const py = useSpring(rawY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, rawX, rawY]);

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {shapes.map((s, i) => (
        <Shape key={i} s={s} i={i} scrollY={scrollY} px={px} py={py} reduce={reduce} />
      ))}
    </div>
  );
}
