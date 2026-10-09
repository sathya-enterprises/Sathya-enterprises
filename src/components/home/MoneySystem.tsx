"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { ArrowRight } from "lucide-react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

export type SystemStage = { stage: string; items: string; links: { href: string; label: string }[] };

/**
 * The Sathya Money-Making System as a pinned, sideways journey: the section holds still under the header
 * while scrolling down slides the six stages across, left to right, attention to growth. The counter and
 * the gold bar track the progress and the stage in focus lights up. The section is exactly as tall as the
 * sideways travel needs, so the scroll is 1:1 and it releases as the last stage lands.
 *
 * Reduced motion: nothing pins; the stages sit in a row you swipe/scroll sideways (snapping per card).
 */
export function MoneySystem({ stages }: { stages: SystemStage[] }) {
  const reduced = useReducedMotionSafe();
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const travel = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * travel.get());
  const bar = useTransform(scrollYProgress, [0, 1], [1 / stages.length, 1]);

  // How far the track has to travel: its full width minus the content box it starts in.
  useEffect(() => {
    if (reduced) return;
    const vp = viewport.current;
    const tr = track.current;
    if (!vp || !tr) return;
    const measure = () => {
      const cs = getComputedStyle(vp);
      const box = vp.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const d = Math.max(0, tr.scrollWidth - box);
      travel.set(d);
      setDistance(d);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    ro.observe(tr);
    return () => ro.disconnect();
  }, [reduced, travel]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(stages.length - 1, Math.max(0, Math.round(p * (stages.length - 1)))));
  });

  const pinned = !reduced;

  return (
    <section
      ref={section}
      aria-labelledby="system-title"
      className="relative"
      style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-[var(--header-h)]" : "py-16 sm:py-24 lg:py-28"}>
        <div className="container-x flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div>
            <p className="t-eyebrow text-gold">The system</p>
            <h2 id="system-title" className="mt-3 max-w-[16ch] font-display text-[clamp(1.9rem,5vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
              The Sathya <span className="text-gold">Money-Making System.</span>
            </h2>
          </div>
          <div className="w-full sm:w-64" aria-hidden>
            <p className="flex items-baseline justify-between font-mono font-bold">
              <span className="text-[2rem] leading-none text-gold sm:text-[2.6rem]">0{active + 1}</span>
              <span className="text-[0.85rem] text-ivory/60">/ 0{stages.length}</span>
            </p>
            <span className="mt-3 block h-[3px] overflow-hidden rounded-full bg-white/15">
              <m.span style={pinned ? { scaleX: bar } : { scaleX: 1 }} className="block h-full origin-left rounded-full bg-linear-to-r from-gold to-red" />
            </span>
          </div>
        </div>

        <div ref={viewport} className={`container-x mt-8 sm:mt-12 ${pinned ? "" : "snap-x snap-mandatory overflow-x-auto pb-4"}`}>
          <m.ol ref={track} style={pinned ? { x } : undefined} className="flex w-max gap-4 sm:gap-5">
            {stages.map((s, i) => {
              const on = i === active || !pinned;
              const last = i === stages.length - 1;
              return (
                <li
                  key={s.stage}
                  className={`relative flex w-[min(80vw,22rem)] shrink-0 snap-start flex-col overflow-hidden rounded-lg border p-6 transition-[border-color,background-color,opacity] duration-500 sm:w-[23rem] sm:p-8 lg:w-[25rem] ${
                    last ? "border-gold bg-gold text-ink [text-shadow:none]" : on ? "border-gold/70 bg-sea-abyss/90" : "border-white/12 bg-sea-abyss/70"
                  } ${on || last ? "opacity-100" : "opacity-60"}`}
                >
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute right-5 top-4 font-display text-[5.5rem] font-extrabold leading-[0.8] tracking-[-0.05em] sm:right-7 sm:top-6 sm:text-[6.5rem] ${
                      last ? "text-ink/10" : "text-outline"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span className={`relative font-mono text-[0.75rem] font-bold tracking-[0.16em] ${last ? "text-red-deep" : "text-gold"}`}>
                    STAGE 0{i + 1}
                  </span>
                  <h3 className="relative mt-16 font-display text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-none tracking-[-0.04em] sm:mt-24">
                    {s.stage}
                  </h3>
                  <p className={`relative mt-3 text-[1rem] ${last ? "text-ink/80" : "text-ivory/80"}`}>{s.items}</p>
                  <ul className={`relative mt-6 flex flex-wrap gap-2 border-t pt-5 ${last ? "border-charcoal/15" : "border-white/12"}`}>
                    {s.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className={`group inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[0.82rem] font-semibold transition-colors ${
                            last ? "border-charcoal/25 hover:bg-charcoal hover:text-gold" : "border-white/20 text-ivory hover:border-gold hover:text-gold"
                          }`}
                        >
                          {l.label}
                          <ArrowRight aria-hidden className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </m.ol>
        </div>
      </div>
    </section>
  );
}
