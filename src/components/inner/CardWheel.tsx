"use client";

import { Children, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { m, useInView } from "motion/react";
import { ease } from "@/lib/motion";

/**
 * The home page's ecosystem carousel (EcosystemCards) for larger sets of inner-page cards: cards ride
 * the top edge of a very large wheel that turns on its own, so they travel along a shallow arc and
 * tilt with it; they fan out from a stack when the section arrives (and re-stack once it leaves).
 * The centre card is lit — deep red, ringed in gold. Each card appears once: the card that wraps
 * round from one end to the other fades in at its new place rather than sweeping across. It pauses
 * while the pointer is over it or a card has focus; a swipe or a click on a side card turns it too.
 *
 * Children are the card contents; the wheel draws the card itself (colour from the section's tone).
 */

type Size = "feature" | "post" | "service";

/** Card width and height (px) per size and breakpoint; `fill` sizes take their height from the screen. */
const SIZES: Record<Size, { sm: [number, number | "fill"]; md: [number, number | "fill"]; pivot: number }> = {
  feature: { sm: [264, 300], md: [300, 320], pivot: 2800 },
  post: { sm: [272, 410], md: [310, 430], pivot: 2800 },
  service: { sm: [300, "fill"], md: [460, "fill"], pivot: 4200 },
};
const GAP = 20;
/** At most this many cards either side of the centre. */
const SIDE = 3;
const SHADOW_ROOM = 24;
const INTERVAL_MS = 3500;
const ENTRANCE_MS = 1700;

/** The card shell shared by the wheel, the fan and the deck. */
export const cardShell = "overflow-hidden rounded-[26px] bg-(--card) text-(--card-ink) shadow-2 outline-4 -outline-offset-4";

/** The lit card's colours, set as the card variables its content reads. */
export const LIT = {
  "--card": "var(--color-red-deep)",
  "--card-ink": "var(--color-ivory)",
  "--card-soft": "rgb(255 253 248 / 0.86)",
  "--card-accent": "var(--color-gold)",
} as React.CSSProperties;

type Geometry = { w: number; h: number; pivot: number; below: number };

/** Room under the centre card so no on-screen side card is clipped (see EcosystemCards). */
function belowFor(w: number, h: number, pivot: number, viewportW: number, side: number) {
  const r = pivot - h;
  const stepRad = (w + GAP) / r;
  let drop = 0;
  for (let k = 1; k <= side; k++) {
    const t = k * stepRad;
    if (r * Math.sin(t) - (w / 2) * Math.cos(t) >= viewportW / 2) break;
    drop = r * (1 - Math.cos(t)) + (w / 2) * Math.sin(t);
  }
  return Math.ceil(drop) + SHADOW_ROOM;
}

function geometryFor(size: Size, reserve: number, side: number): Geometry {
  const md = window.matchMedia("(min-width: 768px)").matches;
  const vw = document.documentElement.clientWidth;
  const { pivot } = SIZES[size];
  const [w, wanted] = md ? SIZES[size].md : SIZES[size].sm;
  if (wanted !== "fill") return { w, h: wanted, pivot, below: belowFor(w, wanted, pivot, vw, side) };
  // Fill: the tallest card (10px steps) that keeps the section on one screen, within limits.
  const room = window.innerHeight - reserve;
  for (let h = 620; ; h -= 10) {
    const below = belowFor(w, h, pivot, vw, side);
    if (h <= 340 || h + below <= room) return { w, h, pivot, below };
  }
}

function useGeometry(size: Size, reserve: number, side: number) {
  const [g, setG] = useState<Geometry>(() => {
    const [w, h] = SIZES[size].sm;
    return { w, h: h === "fill" ? 420 : h, pivot: SIZES[size].pivot, below: 40 };
  });
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = geometryFor(size, reserve, side);
        setG((prev) => (prev.w === next.w && prev.h === next.h && prev.below === next.below ? prev : next));
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
    };
  }, [size, reserve, side]);
  return g;
}

export const mod = (n: number, k: number) => ((n % k) + k) % k;

function subscribeVisibility(cb: () => void) {
  document.addEventListener("visibilitychange", cb);
  return () => document.removeEventListener("visibilitychange", cb);
}

/** True while the tab is visible. */
export function useTabVisible() {
  return useSyncExternalStore(subscribeVisibility, () => !document.hidden, () => true);
}

/** "out" until the element arrives, "in" while its entrance plays, then "done"; resets on leaving. */
export function useEntrance(inView: boolean, ms = ENTRANCE_MS) {
  const [entrance, setEntrance] = useState<"out" | "in" | "done">("out");
  useEffect(() => {
    if (!inView) {
      const id = requestAnimationFrame(() => setEntrance("out"));
      return () => cancelAnimationFrame(id);
    }
    const start = requestAnimationFrame(() => setEntrance("in"));
    const done = window.setTimeout(() => setEntrance("done"), ms);
    return () => {
      cancelAnimationFrame(start);
      window.clearTimeout(done);
    };
  }, [inView, ms]);
  return entrance;
}

export function CardWheel({
  children,
  label,
  size = "feature",
  padded = true,
  reserve = 340,
  start = 0,
  className = "",
}: {
  children: React.ReactNode;
  /** Accessible name of the carousel. */
  label: string;
  size?: Size;
  /** Pad the card's content (off when the content brings its own layout, e.g. a photo card). */
  padded?: boolean;
  /** For `fill` sizes: screen height (px) the rest of the section needs besides the cards. */
  reserve?: number;
  /** Index of the card that starts in the centre. */
  start?: number;
  className?: string;
}) {
  const items = Children.toArray(children);
  const count = items.length;
  const half = Math.floor(count / 2);
  const side = Math.min(SIDE, half);
  const offsetOf = (i: number, p: number) => mod(i - p + half, count) - half;

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const g = useGeometry(size, reserve, side);
  const tabVisible = useTabVisible();
  const entrance = useEntrance(inView);
  const [pos, setPos] = useState(start);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const swipe = useRef<number | null>(null);
  /** Set by a swipe, so the click that ends it doesn't also turn the wheel. */
  const swiped = useRef(false);

  // Where each card sat before the last turn, to spot the one that wraps round from end to end.
  const [placed, setPlaced] = useState({ pos: start, before: [] as number[] });
  if (placed.pos !== pos) setPlaced({ pos, before: items.map((_, i) => offsetOf(i, placed.pos)) });

  const playing = inView && !focused && !hovered && tabVisible;
  useEffect(() => {
    if (!playing || count < 2) return;
    const id = window.setTimeout(() => setPos((p) => p + 1), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [playing, pos, count]);

  const stepDeg = ((g.w + GAP) / (g.pivot - g.h)) * (180 / Math.PI);

  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerDown={(e) => {
        swipe.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (swipe.current === null) return;
        const dx = e.clientX - swipe.current;
        swipe.current = null;
        if (Math.abs(dx) > 40) {
          swiped.current = true;
          setPos((p) => p + (dx < 0 ? 1 : -1));
        }
      }}
      onClickCapture={(e) => {
        if (!swiped.current) return;
        swiped.current = false;
        e.stopPropagation();
        e.preventDefault();
      }}
      className={`relative w-full touch-pan-y ${className}`}
      style={{ height: g.h + g.below }}
    >
      {items.map((item, i) => {
        const offset = offsetOf(i, pos);
        // The card that wrapped round jumps to its new place and fades in there.
        const wrapped = Math.abs(offset - (placed.before[i] ?? offset)) > 1;
        const centered = offset === 0;
        const hidden = Math.abs(offset) > side;
        return (
          <m.div
            key={i}
            aria-hidden={!centered}
            initial={false}
            animate={
              entrance === "out"
                ? { opacity: 0, rotate: 0, y: 140 }
                : { opacity: hidden ? 0 : wrapped ? [0, 1] : 1, rotate: offset * stepDeg, y: 0 }
            }
            transition={
              entrance === "out"
                ? { duration: 0.3 }
                : entrance === "in"
                  ? { duration: 1.1, ease: ease.out, delay: 0.15 + Math.abs(offset) * 0.12 }
                  : wrapped
                    ? { rotate: { duration: 0 }, opacity: { duration: 0.6, ease: "easeOut" } }
                    : { duration: 0.7, ease: ease.out, opacity: { duration: 0.3 } }
            }
            onClick={centered ? undefined : () => setPos((p) => p + offset)}
            className={`wheel-card absolute left-1/2 top-0 ${cardShell} ${centered ? "outline-gold" : "cursor-pointer outline-transparent"}`}
            style={{
              width: g.w,
              height: g.h,
              marginLeft: -g.w / 2,
              transformOrigin: `50% ${g.pivot}px`,
              zIndex: 50 - Math.abs(offset),
              pointerEvents: hidden ? "none" : undefined,
              ...(centered ? LIT : null),
            }}
          >
            {/* Side cards can be clicked to bring them round, but their contents can't be reached. */}
            <div
              inert={!centered}
              className={`relative h-full overscroll-contain [scrollbar-width:thin] ${size === "service" ? "overflow-y-auto" : "overflow-hidden"} ${padded ? "p-6" : ""}`}
            >
              {item}
            </div>
          </m.div>
        );
      })}
    </div>
  );
}
