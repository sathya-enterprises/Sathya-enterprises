"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, Rocket } from "lucide-react";
import { serviceIcons } from "./serviceIcons";
import { requirementFor, type Business } from "@/content/site";
import { FlowLine } from "@/components/ui/FlowLine";
import { ease } from "@/lib/motion";

/**
 * List → detail. Pointer users preview by hovering the list; everyone can select by tap or keyboard.
 * Under lg the detail opens inline beneath the chosen row.
 */
export function ServiceExplorer({ items }: { items: Business[] }) {
  const [active, setActive] = useState(items[0].slug);
  const current = items.find((b) => b.slug === active)!;

  const detail = (b: Business) => (
    <div>
      <p className="font-mono text-[0.68rem] font-bold tracking-[0.16em] text-gold">SERVICES — {b.index}</p>
      <p className="mt-3 font-display text-[clamp(2rem,3.8vw,3.4rem)] font-extrabold leading-[0.96] tracking-[-0.035em]">{b.headline}</p>
      <p className="t-lead mt-5 max-w-[48ch] text-[color:var(--tone-soft)]">{b.intro}</p>
      {b.flow && <FlowLine steps={b.flow.steps} className="mt-10" />}
      {b.groups.map((g) => (
        <div key={g.title} className="mt-8">
          {b.groups.length > 1 && <p className="t-eyebrow mb-3 text-gold">{g.title}</p>}
          <ul className="flex flex-wrap gap-2">
            {g.items.map((it) => (
              <li key={it.label + g.title} className="rounded-full border border-[color:var(--tone-line)] px-3.5 py-1.5 text-[0.85rem] font-semibold">
                {it.label}
                {it.detail && <span className="text-[color:var(--tone-soft)]"> — {it.detail}</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href={`/contact?need=${encodeURIComponent(requirementFor[b.slug] ?? "Other")}`}
          className="inline-flex items-center gap-2 rounded-full bg-ivory px-5 py-3 text-[0.92rem] font-bold text-red-deep transition-[background-color,color] duration-200 hover:bg-gold hover:text-charcoal"
        >
          {b.cta}
          <ArrowUpRight aria-hidden className="h-4 w-4" />
        </Link>
        <Link href={`/${b.slug}`} className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[color:var(--tone-line)] px-5 py-3 text-[0.92rem] font-bold hover:border-ivory">
          Full details
        </Link>
      </div>
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <ul className="border-t border-[color:var(--tone-line)]">
        {items.map((b) => {
          const on = b.slug === active;
          const Icon = serviceIcons[b.slug] ?? Rocket;
          return (
            <li key={b.slug} className="border-b border-[color:var(--tone-line)]">
              <button
                type="button"
                aria-expanded={on}
                onClick={() => setActive(b.slug)}
                onMouseEnter={() => window.matchMedia("(hover: hover) and (min-width: 1024px)").matches && setActive(b.slug)}
                className="group flex w-full items-center gap-4 py-5 text-left"
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-[background-color,color,border-color] duration-300 ${
                    on ? "border-gold bg-gold text-charcoal" : "border-[color:var(--tone-line)] text-gold"
                  }`}
                >
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <span
                  className={`font-display text-[clamp(1.3rem,2.4vw,2rem)] font-extrabold leading-[1.05] tracking-[-0.025em] transition-[opacity,transform] duration-300 ${
                    on ? "translate-x-1 opacity-100" : "opacity-55 group-hover:opacity-90"
                  }`}
                >
                  {b.name}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: ease.inOut }}
                    className="overflow-hidden lg:hidden"
                  >
                    <div className="pb-8 pl-[3.75rem]">{detail(b)}</div>
                  </m.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <div className="relative hidden lg:block" aria-live="polite">
        <div className="sticky top-[calc(var(--header-h)+2rem)] rounded-lg border border-[color:var(--tone-line)] p-10">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={current.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: ease.out }}
            >
              {detail(current)}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
