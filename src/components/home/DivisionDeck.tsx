"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight } from "lucide-react";
import { businessesIn, divisions } from "@/content/site";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const STEP = 4200;
const SAT = [
  [16, 5],
  [27, 16],
  [16, 27],
  [5, 16],
];

/**
 * Touch-first hero companion: the four divisions as a swipeable deck with autoplay progress
 * segments (Google Labs' featured-carousel principle). Swipe, tap a segment, or let it play;
 * any touch hands control to the visitor.
 */
export function DivisionDeck() {
  const track = useRef<HTMLUListElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { amount: 0.4 });
  const reduce = useReducedMotionSafe();
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);

  const go = useCallback((i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    const first = el?.children[0] as HTMLElement | undefined;
    if (el && card && first) el.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: "smooth" });
  }, []);

  // Keep the index in sync with native swiping.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.6) setIndex(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { root: el, threshold: [0.6] },
    );
    Array.from(el.children).forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || held || reduce) return;
    const t = window.setTimeout(() => go((index + 1) % divisions.length), STEP);
    return () => window.clearTimeout(t);
  }, [index, inView, held, reduce, go]);

  const playing = inView && !held && !reduce;

  return (
    <div ref={wrap} className="-mx-[var(--gutter)]">
      <div className="mb-4 grid grid-cols-4 gap-1.5 px-[var(--gutter)]" role="tablist" aria-label="Divisions">
        {divisions.map((d, i) => (
          <button
            key={d.id}
            role="tab"
            aria-selected={i === index}
            onClick={() => {
              setHeld(true);
              go(i);
            }}
            className="group py-2"
          >
            <span className="block h-[3px] overflow-hidden rounded-full bg-line">
              {i === index && playing ? (
                <m.span
                  key={`p${index}`}
                  className="block h-full origin-left bg-red"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: STEP / 1000, ease: "linear" }}
                />
              ) : (
                <span className={`block h-full ${i <= index ? "bg-red" : ""} ${i < index ? "opacity-40" : ""}`} />
              )}
            </span>
            <span className={`mt-2 block text-left font-mono text-[0.58rem] font-bold tracking-[0.14em] ${i === index ? "text-red" : "text-charcoal-soft/70"}`}>
              {d.index}
              <span className="sr-only"> {d.name}</span>
            </span>
          </button>
        ))}
      </div>

      <ul
        ref={track}
        onPointerDown={() => setHeld(true)}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {divisions.map((d, i) => {
          const list = businessesIn(d.id);
          return (
            <li key={d.id} data-i={i} className="w-[84%] shrink-0 snap-start sm:w-[60%]">
              <Link
                href={d.href}
                data-tone={d.id}
                className="tone relative flex h-[300px] flex-col overflow-hidden rounded-lg border border-[color:var(--tone-line)] p-6 active:scale-[0.985] transition-transform"
              >
                <svg viewBox="0 0 32 32" aria-hidden className="absolute -right-10 -top-10 h-44 w-44 opacity-90">
                  <circle cx="16" cy="16" r="11" fill="none" stroke="var(--tone-line)" strokeDasharray="1 2" />
                  <circle cx="16" cy="16" r="5" fill="var(--color-red)" />
                  {SAT.map(([x, y], k) => (
                    <circle key={k} cx={x} cy={y} r={k === i ? 3.2 : 1.8} fill={k === i ? "var(--color-gold)" : "var(--tone-line)"} />
                  ))}
                </svg>
                <span className="font-mono text-[0.66rem] font-bold tracking-[0.16em] text-[color:var(--tone-accent)]">
                  {d.index} · {list.length} BUSINESSES
                </span>
                <span className="mt-auto font-display text-[2.4rem] font-extrabold leading-none tracking-[-0.035em]">{d.name}</span>
                <span className="mt-2 font-display text-[1.05rem] font-bold tracking-[-0.01em] text-[color:var(--tone-accent)]">{d.role}</span>
                <span className="mt-4 flex flex-wrap gap-1.5">
                  {list.slice(0, 3).map((b) => (
                    <span key={b.slug} className="rounded-full border border-[color:var(--tone-line)] px-2.5 py-1 text-[0.72rem] font-semibold">
                      {b.short}
                    </span>
                  ))}
                  {list.length > 3 && (
                    <span className="rounded-full px-1 py-1 text-[0.72rem] font-bold text-[color:var(--tone-accent)]">+{list.length - 3}</span>
                  )}
                  <ArrowUpRight aria-hidden className="ml-auto h-5 w-5 self-center" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
