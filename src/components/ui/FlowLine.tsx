"use client";

import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import * as m from "motion/react-m";
import { ease } from "@/lib/motion";

/**
 * A process drawn as a live line: steps appear in order, then a signal travels the whole route on loop.
 * Used for every real process published on the site (pipelines, automation, borewell, startup journey).
 */
export function FlowLine({
  steps,
  vertical = false,
  className = "",
}: {
  steps: string[];
  vertical?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotionSafe();
  const n = steps.length;

  return (
    <m.ol
      className={`relative flex overflow-hidden pt-1 ${vertical ? "flex-col gap-10 pl-8" : "flex-col gap-6 pl-8 md:flex-row md:gap-0 md:pl-0 md:pt-9"} ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ staggerChildren: 0.12 }}
    >
      {/* Track */}
      <span
        aria-hidden
        className={`absolute bg-(--tone-line) ${
          vertical ? "bottom-2 left-1.25 top-2 w-px" : "bottom-2 left-1.25 top-2 w-px md:bottom-auto md:left-1.5 md:right-1.5 md:top-2.5 md:h-px md:w-auto"
        }`}
      >
        {!reduce && (
          // Transform-only travel: the wrapper is the size of the track and slides by its own length.
          <span
            className={`flow-signal absolute inset-0 ${vertical ? "" : "flow-signal--h"}`}
            style={{ ["--flow-dur" as string]: `${1.2 + n * 0.5}s` }}
          >
            <span className="absolute left-[-5px] top-[-5px] h-[11px] w-[11px] rounded-full bg-[color:var(--tone-accent)] shadow-[0_0_0_5px_color-mix(in_srgb,var(--tone-accent)_25%,transparent)]" />
          </span>
        )}
      </span>
      {steps.map((s, i) => (
        <m.li
          key={s}
          className={`relative ${vertical ? "" : "md:flex-1 md:pr-4"}`}
          variants={{ hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: ease.out }}
        >
          <span
            aria-hidden
            className={`absolute h-[11px] w-[11px] rounded-full border-2 border-[color:var(--tone-accent)] bg-[color:var(--tone-bg)] ${
              vertical ? "-left-8 top-1.5" : "-left-8 top-1.5 md:-top-8 md:left-[1px]"
            }`}
          />
          <span className="block font-mono text-[0.66rem] font-bold tracking-[0.16em] text-[color:var(--tone-accent)]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="mt-1 block font-display text-[clamp(1.15rem,1.8vw,1.5rem)] font-extrabold tracking-[-0.02em]">{s}</span>
        </m.li>
      ))}
    </m.ol>
  );
}
