"use client";

import { Children, useEffect, useRef, useState } from "react";
import { m, useInView } from "motion/react";
import { ease } from "@/lib/motion";
import { cardShell, LIT, useEntrance, useTabVisible } from "./CardWheel";

/**
 * A small set of cards (3–4) held like a hand: they sit stacked until the section arrives, then
 * fan out along a shallow arc. One card at a time is lit — it straightens, rises out of the hand
 * and turns deep red ringed in gold — and the light moves along the hand on its own. Pointing at
 * (or tapping) a card lights it and holds the hand still.
 */

type Size = "feature" | "post";
const SIZES: Record<Size, { sm: [number, number]; md: [number, number] }> = {
  feature: { sm: [252, 300], md: [290, 320] },
  post: { sm: [262, 410], md: [300, 430] },
};
const INTERVAL_MS = 3000;
/** Room above the hand for the lit card to rise into, and below it for the arc. */
const LIFT = 28;
const ARC = 12;

export function CardFan({
  children,
  label,
  size = "feature",
  padded = true,
  start = 0,
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  size?: Size;
  padded?: boolean;
  /** Index of the card lit first. */
  start?: number;
  className?: string;
}) {
  const items = Children.toArray(children);
  const n = items.length;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const entrance = useEntrance(inView, 1400);
  const tabVisible = useTabVisible();
  const [lit, setLit] = useState(start);
  const [held, setHeld] = useState(false);
  const [width, setWidth] = useState(1024);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const playing = inView && !held && tabVisible && entrance === "done";
  useEffect(() => {
    if (!playing || n < 2) return;
    const id = window.setTimeout(() => setLit((l) => (l + 1) % n), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [playing, lit, n]);

  const [w, h] = width < 640 ? SIZES[size].sm : SIZES[size].md;
  // Overlap like a hand on small screens; on wide ones, spread until the cards only just overlap.
  const spacing = n > 1 ? Math.min(w * 0.86, (width - w) / (n - 1)) : 0;
  const maxArc = ARC * ((n - 1) / 2) ** 2;

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
      }}
      className={`relative w-full ${className}`}
      style={{ height: h + LIFT + maxArc + 24 }}
    >
      {items.map((item, i) => {
        const s = i - (n - 1) / 2;
        const isLit = i === lit;
        return (
          <m.div
            key={i}
            initial={false}
            animate={
              entrance === "out"
                ? { x: 0, y: 120, rotate: 0, scale: 0.9, opacity: 0 }
                : {
                    x: s * spacing,
                    y: isLit ? 0 : LIFT + ARC * s * s,
                    rotate: isLit ? 0 : s * 5,
                    scale: isLit ? 1.04 : 1,
                    opacity: 1,
                  }
            }
            transition={
              entrance === "out"
                ? { duration: 0.3 }
                : entrance === "in"
                  ? { duration: 1, ease: ease.out, delay: 0.1 + i * 0.1 }
                  : { duration: 0.6, ease: ease.out }
            }
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return;
              setHeld(true);
              setLit(i);
            }}
            onClick={() => setLit(i)}
            className={`wheel-card absolute left-1/2 top-0 ${cardShell} ${isLit ? "outline-gold" : "cursor-pointer outline-transparent"}`}
            style={{
              width: w,
              height: h,
              marginLeft: -w / 2,
              transformOrigin: "50% 100%",
              zIndex: isLit ? 60 : 50 - Math.abs(Math.round(s * 2)),
              ...(isLit ? LIT : null),
            }}
          >
            <div inert={!isLit} className={`relative h-full overflow-hidden ${padded ? "p-6" : ""}`}>
              {item}
            </div>
          </m.div>
        );
      })}
    </div>
  );
}
