"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight } from "lucide-react";
import { businessesIn, divisionById, divisions, type DivisionId } from "@/content/site";
import { LineReveal } from "@/components/motion/Reveal";
import { ease } from "@/lib/motion";

const ANGLE_INDEX: Record<DivisionId, number> = { digital: 0, technology: 1, products: 2, services: 3 };

/** The favicon mark with the active division's satellite lit — a tiny map of where you are. */
function Locator({ active }: { active: DivisionId }) {
  const pts = [
    [16, 5],
    [27, 16],
    [16, 27],
    [5, 16],
  ];
  return (
    <svg viewBox="0 0 32 32" className="h-14 w-14" aria-hidden>
      <circle cx="16" cy="16" r="10.5" fill="none" stroke="var(--tone-line)" />
      <circle cx="16" cy="16" r="5" fill="var(--color-red)" />
      {pts.map(([x, y], i) => {
        const on = i === ANGLE_INDEX[active];
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={on ? 3.2 : 1.8}
            fill={on ? "var(--color-gold)" : "var(--tone-line)"}
            style={{ transition: "r 300ms var(--ease-out), fill 300ms var(--ease-out)" }}
          />
        );
      })}
    </svg>
  );
}

export function EcosystemExplorer() {
  const [active, setActive] = useState<DivisionId>("digital");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const division = divisionById[active];
  const list = businessesIn(active);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const dir = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + divisions.length) % divisions.length;
    setActive(divisions[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <section id="ecosystem" aria-labelledby="eco-title" className="section-y scroll-mt-20">
      <div className="container-wide">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="t-eyebrow text-red-deep">Our Ecosystem</p>
            <LineReveal
              lines={["OUR BUSINESS", <span key="b" className="text-red">ECOSYSTEM</span>]}
              className="t-display mt-4"
            />
          </div>
          <p className="max-w-[38ch] text-charcoal-soft md:pb-2 md:text-right">
            Four divisions. Every business inside them connects back to the same core — choose a division to open it.
          </p>
        </div>

        <div
          data-tone={active}
          className="tone mt-12 overflow-hidden rounded-lg border border-[color:var(--tone-line)] transition-[background-color,color,border-color] duration-500 ease-[var(--ease-out)]"
        >
          <div className="grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            {/* Division rail */}
            <div
              role="tablist"
              aria-label="Divisions"
              aria-orientation="vertical"
              className="flex gap-2 overflow-x-auto border-b border-[color:var(--tone-line)] p-3 [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b-0 lg:border-r lg:p-0"
            >
              {divisions.map((d, i) => {
                const on = d.id === active;
                return (
                  <button
                    key={d.id}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    role="tab"
                    id={`eco-tab-${d.id}`}
                    aria-selected={on}
                    aria-controls="eco-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(d.id)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={`group relative flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5 text-left transition-[opacity,background-color] duration-300 lg:rounded-none lg:border-b lg:border-[color:var(--tone-line)] lg:px-8 lg:py-7 ${
                      on ? "bg-[color:var(--tone-ink)]/10 lg:bg-transparent" : "[&>span:nth-child(2)]:opacity-65 hover:[&>span:nth-child(2)]:opacity-100"
                    }`}
                  >
                    <span className="font-mono text-[0.7rem] font-bold text-[color:var(--tone-accent)]">{d.index}</span>
                    <span className="font-display text-[0.95rem] font-extrabold tracking-[-0.01em] lg:text-[clamp(1.6rem,2.6vw,2.4rem)] lg:tracking-[-0.03em]">
                      {d.name}
                    </span>
                    <span
                      aria-hidden
                      className={`absolute left-0 top-0 hidden h-full w-[3px] origin-top bg-[color:var(--tone-accent)] transition-transform duration-500 ease-[var(--ease-out)] lg:block ${
                        on ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                    <span className="ml-auto hidden font-mono text-[0.7rem] text-[color:var(--tone-soft)] lg:inline">
                      {businessesIn(d.id).length}
                    </span>
                  </button>
                );
              })}
              <div className="hidden flex-1 items-end p-8 lg:flex">
                <Locator active={active} />
              </div>
            </div>

            {/* Division stage */}
            <div
              id="eco-panel"
              role="tabpanel"
              aria-labelledby={`eco-tab-${active}`}
              className="relative min-h-[560px] p-6 sm:p-10 lg:p-12"
            >
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={active}
                  initial="hidden"
                  animate="shown"
                  exit="exit"
                  variants={{
                    hidden: {},
                    shown: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
                    exit: { opacity: 0, transition: { duration: 0.18 } },
                  }}
                >
                  <m.p
                    variants={{ hidden: { opacity: 0, y: 18 }, shown: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.55, ease: ease.out }}
                    className="font-display text-[clamp(2rem,4.4vw,3.8rem)] font-extrabold leading-[0.98] tracking-[-0.035em]"
                  >
                    {division.role}
                  </m.p>
                  <m.p
                    variants={{ hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.5, ease: ease.out }}
                    className="mt-4 max-w-[52ch] text-[color:var(--tone-soft)] t-lead"
                  >
                    {division.summary}
                  </m.p>

                  <ul className="mt-10 grid gap-px overflow-hidden rounded-md border border-[color:var(--tone-line)] bg-[color:var(--tone-line)] sm:grid-cols-2">
                    {list.map((b) => {
                      const crossTo = b.division !== active ? b.division : b.also?.[0];
                      return (
                        <m.li
                          key={b.slug}
                          variants={{ hidden: { opacity: 0, y: 14 }, shown: { opacity: 1, y: 0 } }}
                          transition={{ duration: 0.45, ease: ease.out }}
                          className="bg-[color:var(--tone-bg)]"
                        >
                          <Link
                            href={`/${b.slug}`}
                            className="group flex h-full flex-col gap-3 p-5 transition-colors duration-200 hover:bg-[color:var(--tone-ink)]/[0.05] sm:p-6"
                          >
                            <span className="flex items-start justify-between gap-3">
                              <span className="font-display text-[1.15rem] font-extrabold leading-tight tracking-[-0.015em]">
                                {b.name}
                              </span>
                              <ArrowUpRight
                                aria-hidden
                                className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--tone-accent)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              />
                            </span>
                            <span className="text-[0.88rem] leading-snug text-[color:var(--tone-soft)]">{b.headline}</span>
                            {crossTo && (
                              <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full border border-[color:var(--tone-line)] px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[color:var(--tone-accent)]">
                                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[color:var(--tone-accent)]" />
                                Also in {divisionById[crossTo].name}
                              </span>
                            )}
                          </Link>
                        </m.li>
                      );
                    })}
                  </ul>

                  <m.div
                    variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
                    className="mt-8"
                  >
                    <Link
                      href={division.href}
                      className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--tone-ink)] px-5 py-3 text-[0.92rem] font-bold text-[color:var(--tone-bg)] transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      Explore {division.name.charAt(0) + division.name.slice(1).toLowerCase()}
                      <ArrowUpRight aria-hidden className="h-4 w-4" />
                    </Link>
                  </m.div>
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
