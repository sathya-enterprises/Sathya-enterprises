"use client";

import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useInView, useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight } from "lucide-react";
import { businessesIn, divisions, type DivisionId } from "@/content/site";
import { ease } from "@/lib/motion";

const SIZE = 600;
const C = SIZE / 2;
const NODE_R = 188;
const DOT_R = 80;
const CYCLE = 3600;

/** Division nodes sit where the favicon's satellites sit: top, right, bottom, left. */
const ANGLES: Record<DivisionId, number> = { digital: -90, technology: 0, products: 90, services: 180 };

const rad = (deg: number) => (deg * Math.PI) / 180;
/** Rounded so server and browser trig agree (avoids hydration attribute mismatches). */
const r2 = (v: number) => Math.round(v * 100) / 100;
const nodePos = (id: DivisionId) => ({
  x: r2(C + NODE_R * Math.cos(rad(ANGLES[id]))),
  y: r2(C + NODE_R * Math.sin(rad(ANGLES[id]))),
});
function dotPositions(id: DivisionId, count: number) {
  const n = nodePos(id);
  const spread = Math.min(144, 24 * (count - 1));
  return Array.from({ length: count }, (_, i) => {
    const a = ANGLES[id] - spread / 2 + (count > 1 ? (spread / (count - 1)) * i : 0);
    return { x: r2(n.x + DOT_R * Math.cos(rad(a))), y: r2(n.y + DOT_R * Math.sin(rad(a))) };
  });
}
const pct = (v: number) => `${(v / SIZE) * 100}%`;

/**
 * The hero ecosystem: one core, four divisions, every business as a satellite.
 * Autoplays through divisions (pausing on hover, stopping once the visitor takes control),
 * responds to pointer with gentle depth, and is fully operable by touch and keyboard.
 */
export function CoreOrbit() {
  const [active, setActive] = useState<DivisionId>("digital");
  const [pinned, setPinned] = useState(false);
  const [hovering, setHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotionSafe();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 120, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!inView || pinned || hovering || reduce) return;
    const id = window.setTimeout(() => {
      const i = divisions.findIndex((d) => d.id === active);
      setActive(divisions[(i + 1) % divisions.length].id);
    }, CYCLE);
    return () => window.clearTimeout(id);
  }, [active, inView, pinned, hovering, reduce]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 18);
  };

  const division = divisions.find((d) => d.id === active)!;
  const items = businessesIn(active);
  const autoplaying = !pinned && !hovering && !reduce;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[640px]">
      <div
        className="relative aspect-square w-full [container-type:inline-size]"
        onPointerMove={onPointerMove}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
        onPointerLeave={() => {
          setHovering(false);
          px.set(0);
          py.set(0);
        }}
      >
        <m.svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          style={{ x: sx, y: sy }}
          aria-hidden
        >
          {/* Outer orbit — the only thing that moves on its own */}
          <g data-ambient style={{ transformOrigin: "300px 300px", animation: "orbit-spin 90s linear infinite" }}>
            <circle cx={C} cy={C} r={272} fill="none" stroke="var(--color-line-strong)" strokeDasharray="2 10" />
          </g>
          <circle cx={C} cy={C} r={NODE_R} fill="none" stroke="var(--color-line)" />

          {/* Spokes */}
          {divisions.map((d) => {
            const n = nodePos(d.id);
            const on = d.id === active;
            return (
              <line
                key={d.id}
                x1={C}
                y1={C}
                x2={n.x}
                y2={n.y}
                stroke={on ? "var(--color-red)" : "var(--color-line-strong)"}
                strokeWidth={on ? 2 : 1}
                style={{ transition: "stroke 300ms var(--ease-out)" }}
              />
            );
          })}

          {/* Businesses as satellites of each division */}
          {divisions.map((d) => {
            const list = businessesIn(d.id);
            const n = nodePos(d.id);
            const on = d.id === active;
            return (
              <g key={d.id}>
                {dotPositions(d.id, list.length).map((p, i) => (
                  <g key={list[i].slug}>
                    <m.line
                      x1={n.x}
                      y1={n.y}
                      x2={p.x}
                      y2={p.y}
                      stroke="var(--color-gold)"
                      strokeWidth={1.5}
                      initial={false}
                      animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: ease.out, delay: on ? 0.05 * i : 0 }}
                    />
                    <m.circle
                      cx={p.x}
                      cy={p.y}
                      initial={false}
                      animate={{ r: on ? 7 : 4 }}
                      fill={list[i].division === d.id ? "var(--color-gold)" : "var(--color-ivory)"}
                      stroke={on ? "var(--color-red-deep)" : "var(--color-line-strong)"}
                      strokeWidth={1.5}
                      transition={{ duration: 0.4, ease: ease.out, delay: on ? 0.05 * i + 0.15 : 0 }}
                    />
                  </g>
                ))}
              </g>
            );
          })}

          {/* Signal pulse: core → active division */}
          {!reduce && (
            <m.circle
              key={active}
              r={5}
              fill="var(--color-red)"
              initial={{ cx: C, cy: C, opacity: 0 }}
              animate={{ cx: [C, nodePos(active).x], cy: [C, nodePos(active).y], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.4, ease: ease.inOut, repeat: Infinity, repeatDelay: 0.4 }}
            />
          )}

          {/* Core */}
          <circle cx={C} cy={C} r={62} fill="var(--color-red)" opacity={0.08} />
          <circle cx={C} cy={C} r={44} fill="var(--color-red)" />
        </m.svg>

        {/* HTML layer: the core label and division controls (crisp text, real buttons) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-display font-extrabold leading-[1.02] text-white" aria-hidden>
          <span className="block text-[2.7cqw] tracking-[-0.01em] [font-stretch:115%]">SATHYA</span>
          <span className="block text-[1.45cqw] tracking-[0.06em]">ENTERPRISES</span>
        </div>

        <div role="group" aria-label="Divisions">
          {divisions.map((d) => {
            const n = nodePos(d.id);
            const on = d.id === active;
            return (
              <button
                key={d.id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setActive(d.id);
                  setPinned(true);
                }}
                onMouseEnter={() => setActive(d.id)}
                onFocus={() => setActive(d.id)}
                style={{ left: pct(n.x), top: pct(n.y) }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 font-mono text-[0.62rem] font-bold tracking-[0.14em] shadow-1 transition-[background-color,color,border-color,transform] duration-300 sm:px-4 sm:py-2 sm:text-[0.72rem] ${
                  on
                    ? "scale-105 border-gold bg-gold text-charcoal"
                    : "border-line-strong bg-ivory text-charcoal hover:border-red"
                }`}
              >
                <span className="mr-1.5 text-red-deep">{d.index}</span>
                {d.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Caption: what the active division is, and where to go next */}
      <div className="relative mx-auto -mt-2 min-h-[148px] max-w-[460px] sm:-mt-6" aria-live="polite">
        <span className="block h-[2px] overflow-hidden rounded-full bg-line">
          {autoplaying && inView ? (
            <m.span
              key={active}
              className="block h-full origin-left bg-red"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: CYCLE / 1000, ease: "linear" }}
            />
          ) : (
            <span className="block h-full w-full bg-red" />
          )}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: ease.out }}
            className="pt-4"
          >
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-display text-xl font-extrabold tracking-[-0.02em]">
                {division.role}
              </p>
              <Link
                href={division.href}
                className="group inline-flex shrink-0 items-center gap-1 text-sm font-bold text-red"
              >
                Explore
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {items.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/${b.slug}`}
                    className="inline-flex rounded-full border border-line bg-white/70 px-2.5 py-1 text-[0.78rem] font-semibold text-charcoal-soft transition-colors duration-200 hover:border-red hover:text-red"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
