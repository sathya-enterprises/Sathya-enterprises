"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight } from "lucide-react";
import { system } from "@/content/site";
import { ease } from "@/lib/motion";

const N = system.stages.length;

function ToolChip({ label, slug }: { label: string; slug?: string }) {
  const cls =
    "inline-flex items-center gap-1.5 rounded-full border border-[color:var(--tone-line)] px-3.5 py-2 text-[0.88rem] font-semibold";
  return slug ? (
    <Link href={`/${slug}`} className={`${cls} group transition-colors duration-200 hover:border-gold hover:text-gold`}>
      {label}
      <ArrowUpRight aria-hidden className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  ) : (
    <span className={`${cls} text-[color:var(--tone-soft)]`}>{label}</span>
  );
}

/** Desktop: the section pins and a single signal travels the whole system as you scroll. */
function PinnedJourney({ heading }: { heading: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setIndex(Math.min(N - 1, Math.max(0, Math.floor(p * N)))));
  const signalY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const stage = system.stages[index];

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${N * 70 + 40}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col pt-[calc(var(--header-h)+2.5rem)] pb-10">
        <div className="container-wide flex flex-1 flex-col">
          {heading}

          <div className="mt-8 grid flex-1 grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-center gap-12">
            {/* What happens at this stage */}
            <div aria-live="polite">
              <div className="flex items-baseline gap-4 font-mono text-[0.78rem] font-bold tracking-[0.16em] text-gold">
                <span>
                  {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                </span>
                <span className="h-px w-12 bg-[color:var(--tone-line)]" aria-hidden />
                <span className="text-[color:var(--tone-soft)]">PRODUCES {stage.yields.toUpperCase()}</span>
              </div>
              <div className="relative mt-4 h-[clamp(3.4rem,6.2vw,7rem)] overflow-hidden">
                <AnimatePresence initial={false}>
                  <m.p
                    key={stage.id}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.6, ease: ease.out }}
                    className="absolute inset-x-0 top-0 whitespace-nowrap font-display font-extrabold leading-[0.9] tracking-[-0.045em] [font-stretch:108%] text-[clamp(3.5rem,6.4vw,7.25rem)]"
                  >
                    {stage.name}
                  </m.p>
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <m.ul
                  key={stage.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: ease.out }}
                  className="mt-8 flex flex-wrap gap-2"
                >
                  {stage.tools.map((t) => (
                    <li key={t.label}>
                      <ToolChip {...t} />
                    </li>
                  ))}
                </m.ul>
              </AnimatePresence>
            </div>

            {/* What the system produces — the signal chain */}
            <div className="relative pl-10">
              <div aria-hidden className="absolute bottom-3 left-[11px] top-3 w-px bg-[color:var(--tone-line)]">
                <m.div className="absolute inset-x-0 top-0 h-full origin-top bg-gold" style={{ scaleY: fill }} />
                <m.span
                  className="absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red shadow-[0_0_0_6px_rgb(200_16_46/0.25)]"
                  style={{ top: signalY }}
                />
              </div>
              <ol className="space-y-1">
                {system.stages.map((s, i) => {
                  const state = i < index ? "past" : i === index ? "now" : "next";
                  return (
                    <li key={s.id} className="relative flex items-baseline gap-5 py-2">
                      <span
                        aria-hidden
                        className={`absolute -left-10 top-1/2 h-[9px] w-[9px] -translate-y-1/2 translate-x-[7px] rounded-full border transition-colors duration-300 ${
                          state === "next" ? "border-[color:var(--tone-line)] bg-charcoal" : "border-gold bg-gold"
                        }`}
                      />
                      <span
                        className={`font-display text-[clamp(1.6rem,2.6vw,2.5rem)] font-extrabold tracking-[-0.03em] transition-[color,opacity] duration-300 ${
                          state === "now" ? "text-ivory" : state === "past" ? "text-gold/70" : "text-ivory/25"
                        }`}
                      >
                        {s.yields.toUpperCase()}
                      </span>
                      <span
                        className={`font-mono text-[0.68rem] font-bold tracking-[0.14em] transition-opacity duration-300 ${
                          state === "now" ? "opacity-100 text-gold" : "opacity-0"
                        }`}
                      >
                        ← {s.name}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Segmented progress */}
          <div className="mt-6 grid grid-cols-6 gap-2" aria-hidden>
            {system.stages.map((s, i) => (
              <div key={s.id}>
                <div className="h-[2px] overflow-hidden rounded-full bg-[color:var(--tone-line)]">
                  <div
                    className={`h-full origin-left bg-gold transition-transform duration-500 ${i <= index ? "scale-x-100" : "scale-x-0"}`}
                  />
                </div>
                <p
                  className={`mt-2 font-mono text-[0.62rem] font-bold tracking-[0.16em] transition-colors duration-300 ${
                    i === index ? "text-gold" : "text-[color:var(--tone-soft)]"
                  }`}
                >
                  {s.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Touch / narrow: no pinning. A timeline whose line draws as you move through it. */
function StackedJourney({ heading }: { heading: React.ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  return (
    <div className="container-x pt-[calc(var(--section-y)*0.8)] pb-[var(--section-y)] lg:hidden">
      {heading}
      <ol ref={ref} className="relative mt-12 space-y-12 pl-10">
        <span aria-hidden className="absolute bottom-0 left-[7px] top-1 w-px bg-[color:var(--tone-line)]">
          <m.span className="absolute inset-0 origin-top bg-gold" style={{ scaleY: scrollYProgress }} />
        </span>
        {system.stages.map((s, i) => (
          <m.li
            key={s.id}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.55, ease: ease.out }}
          >
            <span aria-hidden className="absolute -left-10 top-2 h-[15px] w-[15px] rounded-full border-2 border-gold bg-charcoal" />
            <p className="font-mono text-[0.7rem] font-bold tracking-[0.16em] text-gold">
              {String(i + 1).padStart(2, "0")} · PRODUCES {s.yields.toUpperCase()}
            </p>
            <p className="mt-2 font-display text-[clamp(2.4rem,11vw,3.6rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
              {s.name}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.tools.map((t) => (
                <li key={t.label}>
                  <ToolChip {...t} />
                </li>
              ))}
            </ul>
          </m.li>
        ))}
      </ol>
    </div>
  );
}

export function SystemJourney({ link = true }: { link?: boolean }) {
  const heading = (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="t-eyebrow text-gold">The System · {system.index}</p>
        <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.6rem)] font-extrabold leading-[1] tracking-[-0.03em]">
          THE SATHYA
          <br />
          MONEY-MAKING SYSTEM
        </h2>
      </div>
      <div className="flex flex-col gap-3 md:items-end">
        <p className="max-w-[40ch] text-[color:var(--tone-soft)] md:text-right">{system.intro}</p>
        {link && (
          <Link href="/money-making-system" className="group inline-flex items-center gap-1.5 text-sm font-bold text-gold">
            See the Full System
            <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <section data-tone="technology" aria-label="The Sathya Money-Making System" className="tone relative">
      <PinnedJourney heading={heading} />
      <StackedJourney heading={heading} />
    </section>
  );
}
