"use client";

import { m, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ease } from "@/lib/motion";
import { Accent, SectionHeader } from "./primitives";

type Stat = {
  label: string;
  value: React.ReactNode;
  /** Bar height, % of the chart. The bars step up like a growth chart. */
  height: number;
  bar: string;
};

const STATS: Stat[] = [
  { label: "Business verticals", value: "10+", height: 42, bar: "bg-red" },
  {
    label: "Growing client base",
    value: (
      <span className="inline-flex items-center">
        UP
        <ArrowUpRight className="h-[0.8em] w-[0.8em] text-red" strokeWidth={3} aria-hidden />
      </span>
    ),
    height: 60,
    bar: "bg-gold",
  },
  { label: "Active projects", value: "100%", height: 80, bar: "bg-red" },
  { label: "Partner network", value: "24/7", height: 100, bar: "bg-gold" },
];

/**
 * Bars rise one after another each time the chart scrolls into view. Transform + opacity only, started
 * by an in-view check rather than tracked every scroll frame, so it costs next to nothing.
 */
const bar: Variants = {
  hidden: { scaleY: 0 },
  shown: { scaleY: 1, transition: { duration: 0.9, ease: ease.out } },
};
const value: Variants = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out, delay: 0.45 } },
};

export function GrowthSection() {
  return (
    <section id="scale" className="section-y relative border-y border-line bg-ivory">
      <div className="container-x grid items-end gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <SectionHeader
          eyebrow="The Scale"
          title={
            <>
              Built to
              <br />
              <Accent>grow.</Accent>
            </>
          }
          lead="10+ business opportunities. One vision."
        />

        <div>
          <div className="relative">
            {/* Guide lines */}
            <div aria-hidden className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="block border-t border-dashed border-line" />
              ))}
            </div>
            <m.ol
              aria-label="Our scale"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: false, amount: 0.4 }}
              transition={{ staggerChildren: 0.12 }}
              className="relative flex h-[clamp(18rem,60vw,26rem)] gap-3 border-b-2 border-charcoal sm:gap-5 md:gap-6"
            >
              {STATS.map((stat) => (
                <li key={stat.label} aria-label={stat.label} className="flex h-full min-w-0 flex-1 flex-col justify-end pt-16">
                  <m.p
                    variants={value}
                    className="mb-2 font-display text-[clamp(1.35rem,6vw,3rem)] font-extrabold leading-none tracking-tight text-ink md:mb-3"
                  >
                    {stat.value}
                  </m.p>
                  <m.div
                    variants={bar}
                    style={{ height: `${stat.height}%` }}
                    className={`w-full origin-bottom rounded-t-[var(--radius-md)] ${stat.bar}`}
                  />
                </li>
              ))}
            </m.ol>
          </div>
          <ul aria-hidden className="mt-3 flex gap-3 sm:gap-5 md:gap-6">
            {STATS.map((stat) => (
              <li key={stat.label} className="t-eyebrow min-w-0 flex-1 text-[0.62rem] text-ink-soft md:text-[0.72rem]">
                {stat.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
