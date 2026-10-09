"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image, { type StaticImageData } from "next/image";
import { m, useInView, useScroll } from "motion/react";
import { ArrowRight } from "lucide-react";
import { businesses, type DivisionId } from "@/content/site";
import { ease } from "@/lib/motion";
import { Accent, SectionHeader } from "./primitives";
import { ShapeField } from "./ShapeField";
import digitalPhoto from "@/assets/photos/digital.jpg";
import technologyPhoto from "@/assets/photos/technology.jpg";
import workshopPhoto from "@/assets/photos/workshop.jpg";
import productsPhoto from "@/assets/photos/products.jpg";
import teamPhoto from "@/assets/photos/team.jpg";
import servicesPhoto from "@/assets/photos/services.jpg";

/**
 * Labs-style carousel: cards ride the top edge of a very large wheel that turns on its own, so
 * cards travel along a shallow arc and tilt with it. No controls; it pauses only while off screen
 * or in a background tab, or while a card link has keyboard focus.
 */

const PHOTOS: Record<DivisionId, StaticImageData[]> = {
  digital: [digitalPhoto, teamPhoto],
  technology: [technologyPhoto, workshopPhoto],
  products: [productsPhoto, teamPhoto],
  services: [servicesPhoto, workshopPhoto],
};

/** Division label on each card: red and gold alternate across the four divisions. */
const DIVISION_PILL: Record<DivisionId, string> = {
  digital: "bg-red text-ivory",
  technology: "bg-gold text-ink",
  products: "bg-red text-ivory",
  services: "bg-gold text-ink",
};

const CARDS = (() => {
  const seen: Record<string, number> = {};
  return businesses.map((b) => {
    const n = (seen[b.division] = (seen[b.division] ?? -1) + 1);
    return {
      slug: b.slug,
      title: b.name,
      division: b.division,
      description: b.intro,
      cta: b.cta,
      photo: PHOTOS[b.division][n % PHOTOS[b.division].length],
    };
  });
})();

/** Time each card spends in the centre. */
const INTERVAL_MS = 3500;

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

function desktopGeometry(viewportH: number, headingH: number): Geometry {
  const room = viewportH - LG_CHROME - headingH - LG.below;
  // 10px steps, so small resizes don't nudge the cards.
  const h = Math.max(LG.minH, Math.min(LG.maxH, Math.floor(room / 10) * 10));
  return { w: Math.round(h * LG.ratio), h, gap: LG.gap, pivot: Math.round(h * 7.2), below: LG.below };
}

/** Cards shown either side of the centre — enough to reach both edges of a wide screen. */
const SIDE = 3;
/** The set is repeated until it is long enough to fill both sides and wrap out of sight. */
const MIN_RING = SIDE * 2 + 3;
const RING = Array.from({ length: Math.ceil(MIN_RING / CARDS.length) }, (_, copy) =>
  CARDS.map((card) => ({ card, key: `${card.slug}-${copy}` })),
).flat();

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
        const next =
          lg.matches && heading.current
            ? desktopGeometry(window.innerHeight, heading.current.offsetHeight)
            : md.matches
              ? GEOMETRY.md
              : GEOMETRY.sm;
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

export function EcosystemCards() {
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
    <section ref={sectionRef} id="ecosystem" className="section-y relative flex flex-col justify-center overflow-hidden bg-ivory lg:min-h-svh lg:pb-3 lg:pt-[calc(var(--header-h)+1rem)]">
      <ShapeField progress={scrollYProgress} />

      <div ref={headingRef} className="container-x relative">
        <SectionHeader
          align="center"
          // One-line heading on desktop: every pixel saved goes to the cards.
          className="lg:max-w-none"
          eyebrow="The Ecosystem"
          title={
            <>
              Explore our <Accent>ecosystem.</Accent>
            </>
          }
          lead="Four divisions, one connected ecosystem."
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
              animate={{ opacity: hidden ? 0 : 1, rotate: offset * stepDeg }}
              transition={{ duration: 0.7, ease: ease.out, opacity: { duration: 0.3 } }}
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
                <span className={`t-eyebrow absolute left-3 top-3 rounded-full px-3 py-1.5 ${DIVISION_PILL[card.division]}`}>
                  {card.division}
                </span>
              </div>
              <div className="mx-4 mb-4 flex flex-1 flex-col md:mx-5 md:mb-5">
                <h3 className="line-clamp-2 font-display text-lg font-bold leading-tight tracking-tight text-ink">
                  {card.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{card.description}</p>
                <a
                  href="#contact"
                  tabIndex={centered ? 0 : -1}
                  className="group mt-auto inline-flex items-center gap-1.5 self-start pt-3 text-sm font-bold text-red"
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
