"use client";

import Link from "next/link";
import { useRef } from "react";
import { useScroll } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Business } from "@/content/site";
import { TiltCard } from "@/components/motion/Interactive";

/**
 * Horizontal, snap-scrolling rail. Native scrolling (touch, trackpad, keyboard) does the work;
 * buttons and the progress hairline are enhancements.
 */
export function DisciplineRail({ items, label }: { items: Business[]; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const { scrollXProgress } = useScroll({ container: ref });

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 360) + 16), behavior: "smooth" });
  };

  return (
    <div>
      <div className="container-wide flex items-center justify-between gap-6">
        <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-[color:var(--tone-line)]">
          <m.div className="h-full origin-left bg-[color:var(--tone-accent)]" style={{ scaleX: scrollXProgress }} />
        </div>
        <div className="flex gap-2">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => step(d)}
              aria-label={d < 0 ? `Previous ${label}` : `Next ${label}`}
              className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--tone-line)] transition-[border-color,color] duration-200 hover:border-[color:var(--tone-accent)] hover:text-[color:var(--tone-accent)]"
            >
              {d < 0 ? <ChevronLeft aria-hidden className="h-5 w-5" /> : <ChevronRight aria-hidden className="h-5 w-5" />}
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={ref}
        aria-label={label}
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[max(var(--gutter),calc((100vw_-_var(--container-wide))/2_+_var(--gutter)))] scroll-px-[max(var(--gutter),calc((100vw_-_var(--container-wide))/2_+_var(--gutter)))] pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((b, i) => (
          <li key={b.slug} className="w-[min(84vw,380px)] shrink-0 snap-start">
            <TiltCard className="h-full rounded-lg" light="rgb(200 16 46 / 0.08)">
            <Link
              href={`/${b.slug}`}
              className="group flex h-full min-h-[440px] flex-col rounded-lg border border-[color:var(--tone-line)] bg-white/50 p-7 transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-out)] hover:border-[color:var(--tone-accent)] hover:shadow-2"
            >
              <span className="flex items-center justify-between font-mono text-[0.68rem] font-bold tracking-[0.16em] text-[color:var(--tone-accent)]">
                {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                <ArrowUpRight aria-hidden className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="mt-10 font-display text-[1.9rem] font-extrabold leading-[0.98] tracking-[-0.03em]">{b.name}</span>
              <span className="mt-3 font-display text-[0.95rem] font-bold leading-snug tracking-[-0.005em] text-[color:var(--tone-accent)]">
                {b.headline}
              </span>
              <span className="mt-4 text-[0.92rem] leading-relaxed text-[color:var(--tone-soft)]">{b.intro}</span>
              <span className="mt-auto flex flex-wrap gap-1.5 pt-8">
                {b.groups[0]?.items.slice(0, 3).map((it) => (
                  <span key={it.label} className="rounded-full border border-[color:var(--tone-line)] px-2.5 py-1 text-[0.74rem] font-semibold text-[color:var(--tone-soft)]">
                    {it.label}
                  </span>
                ))}
              </span>
            </Link>
            </TiltCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
