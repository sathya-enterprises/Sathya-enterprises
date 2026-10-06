"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, m, useScroll } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { businesses, divisions, type DivisionId } from "@/content/site";
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
 * Labs-style carousel: cards ride the top edge of a very large wheel. Moving to another card turns
 * the wheel, so cards travel along a shallow arc and tilt with it. Arrows, swipe/drag, arrow keys
 * and clicking a side card all turn it; category chips swap the set.
 */

type Filter = "all" | DivisionId;

const PHOTOS: Record<DivisionId, StaticImageData[]> = {
  digital: [digitalPhoto, teamPhoto],
  technology: [technologyPhoto, workshopPhoto],
  products: [productsPhoto, teamPhoto],
  services: [servicesPhoto, workshopPhoto],
};

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...divisions.map((d) => ({ id: d.id, label: d.name.charAt(0) + d.name.slice(1).toLowerCase() })),
];

/** Division label on each card: red and gold alternate across the four divisions. */
const DIVISION_PILL: Record<DivisionId, string> = {
  digital: "bg-red text-ivory",
  technology: "bg-gold text-charcoal",
  products: "bg-red text-ivory",
  services: "bg-gold text-charcoal",
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

/**
 * Card size per breakpoint (px), plus the wheel's pivot: the distance from a card's top edge down
 * to the wheel centre. A smaller pivot gives a stronger curve.
 */
const GEOMETRY = {
  sm: { w: 260, h: 400, gap: 16, pivot: 3000, below: 32 },
  md: { w: 340, h: 500, gap: 24, pivot: 2600, below: 80 },
  lg: { w: 370, h: 560, gap: 28, pivot: 3200, below: 96 },
};

/** Cards shown either side of the centre — enough to reach both edges of a wide screen. */
const SIDE = 3;
/** The set is repeated until it is long enough to fill both sides and wrap out of sight. */
const MIN_RING = SIDE * 2 + 3;

const mod = (n: number, m: number) => ((n % m) + m) % m;

function useGeometry() {
  const [g, setG] = useState(GEOMETRY.sm);
  useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const update = () => setG(lg.matches ? GEOMETRY.lg : md.matches ? GEOMETRY.md : GEOMETRY.sm);
    update();
    md.addEventListener("change", update);
    lg.addEventListener("change", update);
    return () => {
      md.removeEventListener("change", update);
      lg.removeEventListener("change", update);
    };
  }, []);
  return g;
}

export function EcosystemCards() {
  const [filter, setFilter] = useState<Filter>("all");
  /** Unbounded position on the wheel; the card in the centre is position mod ring length. */
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const [pos, setPos] = useState(0);
  const [dragX, setDragX] = useState(0);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  // A drag ends in a click on whatever is under the pointer; swallow it so cards don't open.
  const suppressClick = useRef(false);
  const g = useGeometry();

  const cards = useMemo(() => (filter === "all" ? CARDS : CARDS.filter((c) => c.division === filter)), [filter]);
  // Small sets repeat so the row always runs edge to edge and loops seamlessly.
  const ring = useMemo(() => {
    const copies = Math.ceil(MIN_RING / cards.length);
    return Array.from({ length: copies }, (_, copy) => cards.map((card) => ({ card, key: `${card.slug}-${copy}` }))).flat();
  }, [cards]);
  const current = mod(pos, cards.length);

  // Cards tilt apart towards their tops, so their bottom edges are closest. Space them so the
  // bottom edges sit exactly `gap` apart — the gap only widens from there.
  const stepDeg = ((g.w + g.gap) / (g.pivot - g.h)) * (180 / Math.PI);
  const dragDeg = (dragX / (g.pivot - g.h / 2)) * (180 / Math.PI);

  const go = (to: number) => setPos(to);

  const chooseFilter = (next: Filter) => {
    if (next === filter) return;
    setFilter(next);
    setPos(0);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (!drag.current.moved && Math.abs(dx) > 6) {
      drag.current.moved = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    if (drag.current.moved) setDragX(dx);
  };
  const endDrag = () => {
    if (!drag.current) return;
    if (drag.current.moved && Math.abs(dragX) > 40) {
      const cardsMoved = Math.max(1, Math.round(Math.abs(dragX) / (g.w + g.gap)));
      go(pos + (dragX < 0 ? cardsMoved : -cardsMoved));
    }
    setDragX(0);
    // Keep `moved` for the click that follows this pointerup, then reset.
    const wasMoved = drag.current.moved;
    drag.current = null;
    if (wasMoved) suppressClick.current = true;
  };

  const dragging = dragX !== 0;

  return (
    <section ref={sectionRef} id="ecosystem" className="section-y relative overflow-hidden bg-ivory">
      <ShapeField progress={scrollYProgress} />


      <div className="container-x relative">
        <SectionHeader
          align="center"
          eyebrow="The Ecosystem"
          title={
            <>
              Explore our <Accent>ecosystem.</Accent>
            </>
          }
          lead="Four divisions, one connected ecosystem."
        />
      </div>

      <div className="relative mt-10 md:mt-14">
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Sathya Enterprises businesses. Use the arrow keys to move between cards."
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(pos + 1);
            if (e.key === "ArrowLeft") go(pos - 1);
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={(e) => {
            if (suppressClick.current) {
              e.preventDefault();
              e.stopPropagation();
              suppressClick.current = false;
            }
          }}
          className={`relative w-full touch-pan-y select-none focus-visible:outline-offset-[-2px] ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ height: g.h + g.below }}
        >
          <AnimatePresence initial={false}>
            {ring.map(({ card, key }, i) => {
              // Shortest way round the ring, so cards wrap behind the screen edges, never across.
              const half = Math.floor(ring.length / 2);
              const offset = mod(i - pos + half, ring.length) - half;
              const centered = offset === 0;
              const angle = offset * stepDeg + dragDeg;
              const hidden = Math.abs(offset) > SIDE;

              return (
                <m.article
                  key={`${filter}-${key}`}
                  aria-hidden={hidden}
                  aria-label={`${mod(i, cards.length) + 1} of ${cards.length}: ${card.title}`}
                  initial={{ opacity: 0, rotate: angle + stepDeg * 1.5 }}
                  animate={{ opacity: hidden ? 0 : 1, rotate: angle }}
                  exit={{ opacity: 0, rotate: angle - stepDeg * 1.5, transition: { duration: 0.35, ease: ease.out } }}
                  transition={
                    dragging
                      ? { duration: 0 }
                      : { duration: 0.7, ease: ease.out, opacity: { duration: 0.3 } }
                  }
                  onClick={(e) => {
                    if (!centered) {
                      e.preventDefault();
                      go(pos + offset);
                    }
                  }}
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
                  <div className="relative m-4 aspect-square overflow-hidden rounded-[16px] md:m-6">
                    <Image
                      src={card.photo}
                      alt=""
                      fill
                      draggable={false}
                      sizes="(min-width: 1024px) 322px, (min-width: 768px) 292px, 228px"
                      placeholder="blur"
                      className={`object-cover transition-transform duration-700 ease-[var(--ease-out)] ${centered ? "scale-100" : "scale-110"}`}
                    />
                    <span className={`t-eyebrow absolute left-3 top-3 rounded-full px-3 py-1.5 ${DIVISION_PILL[card.division]}`}>
                      {card.division}
                    </span>
                  </div>
                  <div className="mx-4 mb-4 flex flex-1 flex-col md:mx-6 md:mb-6">
                    <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-charcoal md:text-2xl">
                      {card.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-charcoal-soft md:line-clamp-4 md:text-base">
                      {card.description}
                    </p>
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
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="container-x relative mt-6 flex flex-col items-center gap-6 md:mt-8">
          <div role="group" aria-label="Carousel navigation" className="flex items-center gap-3">
            {[
              { label: "Previous card", icon: ChevronLeft, to: pos - 1, look: "bg-gold text-charcoal hover:bg-gold-tint" },
              { label: "Next card", icon: ChevronRight, to: pos + 1, look: "bg-red text-ivory hover:bg-red-deep" },
            ].map(({ label, icon: Icon, to, look }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                onClick={() => go(to)}
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-[background-color,color,opacity,transform] duration-300 active:scale-90 md:h-14 md:w-14 ${look}`}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </button>
            ))}
            <span className="t-eyebrow ml-2 min-w-[4.5rem] text-center text-charcoal-soft" aria-live="polite">
              {String(current + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
            </span>
          </div>

          <div
            role="group"
            aria-label="Filter by division"
            className="-mx-[var(--gutter)] flex max-w-[calc(100%+2*var(--gutter))] gap-2 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {FILTERS.map((f) => {
              const active = f.id === filter;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => chooseFilter(f.id)}
                  className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                    active ? "bg-red text-ivory" : "bg-gold-light text-charcoal hover:bg-gold-tint"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
