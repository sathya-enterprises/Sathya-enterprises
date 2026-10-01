"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight } from "lucide-react";
import { businesses, divisionById, divisions, type Business, type DivisionId } from "@/content/site";
import { LineReveal } from "@/components/motion/Reveal";
import { ease } from "@/lib/motion";

type Filter = "all" | DivisionId;

/**
 * Every business as one typographic index — filterable by division (Labs-style discovery).
 * Fine pointers get a preview card that follows the cursor; touch gets the headline inline.
 */
export function BusinessIndex() {
  const [filter, setFilter] = useState<Filter>("all");
  const [hovered, setHovered] = useState<Business | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28 });
  const sy = useSpring(y, { stiffness: 260, damping: 28 });

  const shown = businesses.filter((b) => filter === "all" || b.division === filter || b.also?.includes(filter));

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = listRef.current!.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: businesses.length },
    ...divisions.map((d) => ({
      id: d.id,
      label: d.name.charAt(0) + d.name.slice(1).toLowerCase(),
      count: businesses.filter((b) => b.division === d.id || b.also?.includes(d.id)).length,
    })),
  ];

  return (
    <section aria-labelledby="index-title" className="section-y">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end">
          <div>
            <p className="t-eyebrow text-red-deep">Explore Our Businesses</p>
            <LineReveal
              as="h2"
              lines={["EVERY BUSINESS.", <span key="o" className="text-red">ONE INDEX.</span>]}
              className="t-h1 mt-4"
            />
          </div>
          <div role="group" aria-label="Filter by division" className="flex flex-wrap gap-2 lg:justify-end">
            {filters.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.88rem] font-bold transition-[background-color,color,border-color] duration-200 ${
                    on ? "border-charcoal bg-charcoal text-ivory" : "border-line-strong hover:border-red hover:text-red"
                  }`}
                >
                  {f.label}
                  <span className={`font-mono text-[0.68rem] ${on ? "text-gold" : "text-charcoal-soft"}`}>{f.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={listRef} className="relative mt-12" onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
          <AnimatePresence mode="wait" initial={false}>
            <m.ul
              key={filter}
              initial="hidden"
              animate="shown"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.025 } } }}
              className="border-t border-line"
            >
              {shown.map((b) => {
                const d = divisionById[b.division];
                return (
                  <m.li
                    key={b.slug}
                    variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.4, ease: ease.out }}
                    className="border-b border-line"
                  >
                    <Link
                      href={`/${b.slug}`}
                      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(b)}
                      onFocus={() => setHovered(null)}
                      className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-x-3 py-4 sm:grid-cols-[3.5rem_minmax(0,1fr)_10rem_auto] sm:py-5"
                    >
                      <span className="font-mono text-[0.72rem] font-bold text-charcoal-soft transition-colors duration-200 group-hover:text-red">
                        {b.index}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-[clamp(1.35rem,3.2vw,2.6rem)] font-extrabold leading-[1.05] tracking-[-0.03em] transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-2 group-hover:text-red">
                          {b.name}
                        </span>
                        <span className="mt-1 block text-[0.85rem] text-charcoal-soft [@media(hover:hover)_and_(pointer:fine)]:hidden">
                          {b.headline}
                        </span>
                      </span>
                      <span className="hidden font-mono text-[0.66rem] font-bold tracking-[0.14em] text-charcoal-soft sm:block">
                        {d.name}
                        {b.also?.map((a) => ` + ${divisionById[a].name}`)}
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="h-5 w-5 self-center text-charcoal-soft transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-red"
                      />
                    </Link>
                  </m.li>
                );
              })}
            </m.ul>
          </AnimatePresence>

          {/* Cursor preview (fine pointers only) */}
          <m.div
            aria-hidden
            style={{ x: sx, y: sy }}
            className="pointer-events-none absolute left-0 top-0 z-10 hidden [@media(hover:hover)_and_(pointer:fine)]:block"
          >
            <AnimatePresence>
              {hovered && (
                <m.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.22, ease: ease.out }}
                  className="ml-8 -mt-24 w-[300px] origin-top-left"
                >
                  <div data-tone={hovered.division} className="tone rounded-md p-5 shadow-3">
                    <p className="font-mono text-[0.62rem] font-bold tracking-[0.16em] text-[color:var(--tone-accent)]">
                      {divisionById[hovered.division].name} — {hovered.index}
                    </p>
                    <p className="mt-3 font-display text-[1.25rem] font-extrabold leading-[1.02] tracking-[-0.02em]">
                      {hovered.headline}
                    </p>
                    <p className="mt-3 text-[0.82rem] leading-snug text-[color:var(--tone-soft)]">{hovered.intro}</p>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        </div>
      </div>
    </section>
  );
}
