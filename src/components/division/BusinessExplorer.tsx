"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, Circle } from "lucide-react";
import { serviceIcons } from "./serviceIcons";
import { divisionById, requirementFor, type Business, type DivisionId } from "@/content/site";
import { FlowLine } from "@/components/ui/FlowLine";
import { ease } from "@/lib/motion";

/**
 * Every business in a division, on one page. List → detail: pointer users preview by hovering the list;
 * everyone can select by tap or keyboard. Under lg the detail opens inline beneath the chosen row.
 * Links elsewhere point at `/<division>#<slug>`, so the hash picks the open business.
 */
export function BusinessExplorer({ items, division }: { items: Business[]; division: DivisionId }) {
  const [active, setActive] = useState(items[0].slug);
  const current = items.find((b) => b.slug === active)!;

  useEffect(() => {
    const pick = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (!items.some((b) => b.slug === slug)) return;
      setActive(slug);
      document.getElementById(slug)?.scrollIntoView({ block: "start" });
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, [items]);

  const detail = (b: Business) => (
    <div>
      <p className="font-mono text-[0.68rem] font-bold tracking-[0.16em] text-(--tone-accent)">
        {divisionById[division].name} — {b.name.toUpperCase()}
      </p>
      <p className="mt-3 font-display text-[clamp(2rem,3.8vw,3.4rem)] font-extrabold leading-[0.96] tracking-[-0.035em]">{b.headline}</p>
      <p className="t-lead mt-5 max-w-[48ch] text-(--tone-soft)">{b.intro}</p>
      {b.flow && <FlowLine steps={b.flow.steps} className="mt-10" />}
      {b.groups.map((g) => (
        <div key={g.title} className="mt-8">
          {b.groups.length > 1 && <p className="t-eyebrow mb-3 text-(--tone-accent)">{g.title}</p>}
          <ul className="flex flex-wrap gap-2">
            {g.items.map((it) => (
              <li key={it.label + g.title} className="rounded-full border border-(--tone-line) px-3.5 py-1.5 text-[0.85rem] font-semibold">
                {it.label}
                {it.detail && <span className="text-(--tone-soft)"> — {it.detail}</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {b.note && <p className="mt-8 max-w-[56ch] text-[0.92rem] text-(--tone-soft)">{b.note.body}</p>}
      <Link
        href={`/contact?need=${encodeURIComponent(requirementFor[b.slug] ?? "Other")}`}
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-red px-5 py-3 text-[0.92rem] font-bold text-white transition-colors duration-200 hover:bg-red-deep"
      >
        {b.cta}
        <ArrowUpRight aria-hidden className="h-4 w-4" />
      </Link>
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <ul className="reveal-stagger border-t border-(--tone-line)">
        {items.map((b) => {
          const on = b.slug === active;
          const Icon = serviceIcons[b.slug] ?? Circle;
          return (
            <li key={b.slug} id={b.slug} className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-b border-(--tone-line)">
              <button
                type="button"
                aria-expanded={on}
                onClick={() => setActive(b.slug)}
                onMouseEnter={() => window.matchMedia("(hover: hover) and (min-width: 1024px)").matches && setActive(b.slug)}
                className="group flex w-full items-center gap-4 py-5 text-left"
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-[background-color,color,border-color] duration-300 ${
                    on ? "border-gold bg-gold text-ink" : "border-(--tone-line) text-(--tone-accent)"
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

      <div className="reveal-right relative hidden lg:block" aria-live="polite">
        <div className="sticky top-[calc(var(--header-h)+2rem)] border-l-2 border-gold py-2 pl-10">
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
