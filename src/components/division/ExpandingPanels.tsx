"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Business } from "@/content/site";

/**
 * Panels that open on hover, focus or tap. Desktop: a horizontal accordion where the active panel
 * takes the width. Narrow screens: a vertical accordion. Same state, two layouts.
 */
export function ExpandingPanels({ items }: { items: Business[] }) {
  const [active, setActive] = useState(0);
  return (
    <ul className="flex flex-col gap-2 lg:h-[540px] lg:flex-row">
      {items.map((b, i) => {
        const on = i === active;
        return (
          <li
            key={b.slug}
            onMouseEnter={() => setActive(i)}
            className={`relative overflow-hidden rounded-lg border transition-[flex-grow,background-color,border-color] duration-500 ease-[var(--ease-in-out)] lg:min-w-0 ${
              on ? "border-gold bg-gold text-charcoal lg:flex-[4_1_0%]" : "border-[color:var(--tone-line)] lg:flex-[1_1_0%]"
            }`}
          >
            <button
              type="button"
              aria-expanded={on}
              aria-controls={`panel-${b.slug}`}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="flex w-full items-center justify-start gap-4 p-5 text-left sm:p-6 lg:h-full lg:flex-col lg:items-start lg:justify-between"
            >
              <span className={`font-mono text-[0.66rem] font-bold tracking-[0.16em] ${on ? "text-red-deep" : "text-gold"}`}>
                {b.index}
              </span>
              <span
                className={`font-display text-[1.35rem] font-extrabold leading-none tracking-[-0.02em] lg:origin-bottom-left lg:whitespace-nowrap lg:transition-[transform,opacity] lg:duration-500 ${
                  on ? "lg:pointer-events-none lg:opacity-0" : "lg:absolute lg:bottom-6 lg:left-6 lg:-rotate-90 lg:translate-x-[1.2em]"
                }`}
              >
                <span className="lg:hidden">{b.name}</span>
                <span className="hidden lg:inline">{b.short}</span>
              </span>
            </button>
            <div
              id={`panel-${b.slug}`}
              className={`px-6 pb-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:p-8 ${on ? "block" : "hidden"}`}
            >
              <p className="hidden font-mono text-[0.66rem] font-bold tracking-[0.16em] text-red-deep lg:block">{b.name.toUpperCase()}</p>
              <p className="mt-3 max-w-[18ch] font-display text-[clamp(1.8rem,3.2vw,3rem)] font-extrabold leading-[0.96] tracking-[-0.035em]">
                {b.headline}
              </p>
              <p className="mt-4 max-w-[46ch] text-[0.95rem] text-charcoal/75">{b.intro}</p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {b.groups[0]?.items.slice(0, 4).map((it) => (
                  <span key={it.label} className="rounded-full border border-charcoal/20 px-3 py-1 text-[0.78rem] font-semibold">
                    {it.label}
                  </span>
                ))}
                <Link
                  href={`/${b.slug}`}
                  className="group ml-auto inline-flex items-center gap-1.5 rounded-full bg-charcoal px-4 py-2 text-[0.85rem] font-bold text-ivory"
                >
                  Explore
                  <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
