"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { m, useInView, useScroll } from "motion/react";
import { ArrowRight } from "lucide-react";
import { businesses, type Business, type DivisionId } from "@/content/site";
import { toCards } from "./businessCards";
import { ease } from "@/lib/motion";
import { Accent, SectionHeader } from "./primitives";
import { ShapeField } from "./ShapeField";

/**
 * Labs-style carousel: cards ride the top edge of a very large wheel that turns on its own, so
 * cards travel along a shallow arc and tilt with it. No controls; it pauses only while off screen
 * or in a background tab, or while a card link has keyboard focus.
 */

/** Division label on each card: red and gold alternate across the four divisions. */
const DIVISION_PILL: Record<DivisionId, string> = {
  digital: "bg-red text-ivory",
  technology: "bg-gold text-ink",
  products: "bg-red text-ivory",
  services: "bg-gold text-ink",
};

/** Time each card spends in the centre. */
const INTERVAL_MS = 3500;
/** Length of the fan-out entrance, including the stagger out to the furthest card. */
const ENTRANCE_MS = 1700;

/**
 * Card size (px), plus the wheel's pivot: the distance from a card's top edge down to the wheel
 * centre. A smaller pivot gives a stronger curve. `below` is the room under the centre card for the
 * side cards, which hang a little lower as they tilt.
 */
type Geometry = { w: number; h: number; gap: number; pivot: number; below: number };
const GEOMETRY: Record<"sm" | "md", Geometry> = {
  sm: { w: 260, h: 400, gap: 16, pivot: 3000, below: 32 },
  md: { w: 300, h: 450, gap: 22, pivot: 2800, below: 56 },
};
/** Desktop cards scale with the screen height so the section fits one screen under the header. */
const LG = { maxH: 560, minH: 380, ratio: 0.7, gap: 28, below: 44 };
/** Fixed space the desktop layout spends besides the heading and cards: header, gaps, padding. */
const LG_CHROME = 72 + 16 + 16 + 12;

/** Cards shown either side of the centre — enough to reach both edges of a wide screen. */
const SIDE = 3;

/** Room left under the lowest card corner for its shadow. */
const SHADOW_ROOM = 24;

/**
 * Space needed under the centre card so no on-screen side card is clipped. A side card turned by
 * `t` around the pivot sinks, and its outer bottom corner sinks furthest:
 * (pivot - h)(1 - cos t) + (w / 2) sin t. Cards entirely past the screen edge don't count.
 */
function withBelow(g: Omit<Geometry, "below">, minBelow: number, viewportW: number): Geometry {
  const r = g.pivot - g.h;
  const step = (g.w + g.gap) / r;
  let drop = 0;
  for (let k = 1; k <= SIDE; k++) {
    const t = k * step;
    // Inner bottom corner is the card's point nearest the centre.
    if (r * Math.sin(t) - (g.w / 2) * Math.cos(t) >= viewportW / 2) break;
    drop = r * (1 - Math.cos(t)) + (g.w / 2) * Math.sin(t);
  }
  return { ...g, below: Math.max(minBelow, Math.ceil(drop) + SHADOW_ROOM) };
}

function desktopGeometry(viewportW: number, viewportH: number, headingH: number): Geometry {
  const room = viewportH - LG_CHROME - headingH;
  // Largest card (in 10px steps, so small resizes don't nudge the cards) whose arc still fits.
  for (let h = LG.maxH; ; h -= 10) {
    const g = withBelow(
      { w: Math.round(h * LG.ratio), h, gap: LG.gap, pivot: Math.round(h * 7.2) },
      LG.below,
      viewportW,
    );
    if (h <= LG.minH || h + g.below <= room) return g;
  }
}
/** The set is repeated until it is long enough to fill both sides and wrap out of sight. */
const MIN_RING = SIDE * 2 + 3;
function toRing(cards: ReturnType<typeof toCards>) {
  return Array.from({ length: Math.ceil(MIN_RING / cards.length) }, (_, copy) =>
    cards.map((card) => ({ card, key: `${card.slug}-${copy}` })),
  ).flat();
}

const mod = (n: number, m: number) => ((n % m) + m) % m;

function subscribeVisibility(cb: () => void) {
  document.addEventListener("visibilitychange", cb);
  return () => document.removeEventListener("visibilitychange", cb);
}

/**
 * Breakpoint geometry. On desktop the card height comes from the screen height left after the
 * heading block — measured on resize only, and the heading never depends on the cards, so there is
 * no measure → resize loop.
 */
function useGeometry(heading: React.RefObject<HTMLElement | null>) {
  const [g, setG] = useState(GEOMETRY.sm);
  useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const vw = document.documentElement.clientWidth;
        const base = md.matches ? GEOMETRY.md : GEOMETRY.sm;
        const next =
          lg.matches && heading.current
            ? desktopGeometry(vw, window.innerHeight, heading.current.offsetHeight)
            : withBelow(base, base.below, vw);
        setG((prev) => (prev.h === next.h && prev.w === next.w && prev.below === next.below ? prev : next));
      });
    };
    update();
    window.addEventListener("resize", update);
    md.addEventListener("change", update);
    lg.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      md.removeEventListener("change", update);
      lg.removeEventListener("change", update);
    };
  }, [heading]);
  return g;
}

export function EcosystemCards({
  items = businesses,
  id = "ecosystem",
  eyebrow = "The Ecosystem",
  title = (
    <>
      Explore our <Accent>ecosystem.</Accent>
    </>
  ),
  lead = "Four divisions, one connected ecosystem.",
}: {
  items?: Business[];
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: string;
} = {}) {
  const RING = useMemo(() => toRing(toCards(items)), [items]);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const inView = useInView(sectionRef, { amount: 0.3 });
  /** Unbounded position on the wheel; the card in the centre is pos mod ring length. */
  const [pos, setPos] = useState(0);
  const [held, setHeld] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);
  const g = useGeometry(headingRef);

  // Always turns while on screen (reduced motion only drops the animation, via MotionConfig); it
  // pauses only while a card link has keyboard focus.

  // Entrance on scroll into view: the cards start stacked low in the centre and fan out along the
  // arc, centre first. "in" lasts while that runs (its stagger must not slow later turns); leaving
  // the screen re-stacks them, so it replays on every arrival.
  const [entrance, setEntrance] = useState<"out" | "in" | "done">("out");
  useEffect(() => {
    if (!inView) {
      const id = requestAnimationFrame(() => setEntrance("out"));
      return () => cancelAnimationFrame(id);
    }
    const start = requestAnimationFrame(() => setEntrance("in"));
    const done = window.setTimeout(() => setEntrance("done"), ENTRANCE_MS);
    return () => {
      cancelAnimationFrame(start);
      window.clearTimeout(done);
    };
  }, [inView]);

  const tabVisible = useSyncExternalStore(subscribeVisibility, () => !document.hidden, () => true);
  const playing = inView && !held && tabVisible;
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setPos((p) => p + 1), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [playing, pos]);

  // Cards tilt apart towards their tops, so their bottom edges are closest. Space them so the
  // bottom edges sit exactly `gap` apart — the gap only widens from there.
  const stepDeg = ((g.w + g.gap) / (g.pivot - g.h)) * (180 / Math.PI);
  const half = Math.floor(RING.length / 2);

  return (
    <section ref={sectionRef} id={id} className="section-y relative flex flex-col justify-center overflow-hidden bg-ivory lg:min-h-svh lg:pb-3 lg:pt-[calc(var(--header-h)+1rem)]">
      <ShapeField progress={scrollYProgress} play={inView} />

      <div ref={headingRef} className="container-x relative">
        <SectionHeader
          align="center"
          // One-line heading on desktop: every pixel saved goes to the cards.
          className="lg:max-w-none"
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Sathya Enterprises businesses"
        // Hold only while a card link has focus — pressing an arrow must not stop autoplay.
        onFocus={(e) => setHeld(!!(e.target as HTMLElement).closest("article"))}
        onBlur={(e) => {
          if (!(e.relatedTarget as HTMLElement | null)?.closest?.("article")) setHeld(false);
        }}
        className="relative mt-10 w-full lg:mt-4"
        style={{ height: g.h + g.below }}
      >
        {RING.map(({ card, key }, i) => {
          // Shortest way round the ring, so cards wrap behind the screen edges, never across.
          const offset = mod(i - pos + half, RING.length) - half;
          const centered = offset === 0;
          const hidden = Math.abs(offset) > SIDE;

          return (
            <m.article
              key={key}
              aria-hidden={!centered}
              initial={false}
              animate={
                entrance === "out"
                  ? { opacity: 0, rotate: 0, y: 140 }
                  : { opacity: hidden ? 0 : 1, rotate: offset * stepDeg, y: 0 }
              }
              transition={
                entrance === "out"
                  ? { duration: 0.3 }
                  : entrance === "in"
                    ? { duration: 1.1, ease: ease.out, delay: 0.15 + Math.abs(offset) * 0.12 }
                    : { duration: 0.7, ease: ease.out, opacity: { duration: 0.3 } }
              }
              className="absolute left-1/2 top-0 flex flex-col rounded-[26px] bg-white shadow-2"
              style={{
                width: g.w,
                height: g.h,
                marginLeft: -g.w / 2,
                transformOrigin: `50% ${g.pivot}px`,
                zIndex: 50 - Math.abs(offset),
                pointerEvents: hidden ? "none" : undefined,
              }}
            >
              {/* The centre card turns gold → red; faded in so it follows the card as it arrives. */}
              <div
                aria-hidden
                className={`absolute inset-0 rounded-[26px] bg-[linear-gradient(180deg,var(--color-gold)_0%,var(--color-red)_58%,var(--color-red-deep)_100%)] transition-opacity duration-700 ease-[var(--ease-out)] ${centered ? "opacity-100" : "opacity-0"}`}
              />

              {/* Square photo; shorter on small desktop cards so the copy still fits. */}
              <div className={`relative m-4 shrink-0 overflow-hidden rounded-[16px] md:m-5 ${g.h < 400 ? "aspect-[4/3]" : "aspect-square"}`}>
                <Image
                  src={card.photo}
                  alt=""
                  fill
                  draggable={false}
                  sizes="(min-width: 1024px) 400px, (min-width: 768px) 270px, 228px"
                  placeholder="blur"
                  className={`object-cover transition-transform duration-700 ease-[var(--ease-out)] ${centered ? "scale-100" : "scale-110"}`}
                />
                <span className={`t-eyebrow absolute left-3 top-3 rounded-full px-3 py-1.5 ${centered ? "bg-ivory text-red" : DIVISION_PILL[card.division]}`}>
                  {card.division}
                </span>
              </div>
              <div className="relative mx-4 mb-4 flex flex-1 flex-col md:mx-5 md:mb-5">
                <h3 className={`line-clamp-2 font-display text-lg font-bold leading-tight tracking-tight transition-colors duration-700 ${centered ? "text-ivory" : "text-ink"}`}>
                  {card.title}
                </h3>
                <p className={`mt-2 line-clamp-2 text-sm leading-relaxed transition-colors duration-700 ${centered ? "text-ivory/85" : "text-ink-soft"}`}>{card.description}</p>
                <a
                  href="/contact"
                  tabIndex={centered ? 0 : -1}
                  className={`group mt-auto inline-flex items-center gap-1.5 self-start pt-3 text-sm font-bold transition-colors duration-700 ${centered ? "text-gold-light" : "text-red"}`}
                >
                  {card.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                </a>
              </div>
            </m.article>
          );
        })}
      </div>
    </section>
  );
}
