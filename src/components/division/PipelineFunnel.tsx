"use client";

import * as m from "motion/react-m";
import { ease } from "@/lib/motion";

/** Attention narrowing into conversion — the published lead pipeline, drawn as a funnel. */
export function PipelineFunnel({ steps }: { steps: string[] }) {
  const n = steps.length;
  return (
    <m.ol
      aria-label="Lead pipeline"
      className="space-y-2"
      initial="hidden"
      animate="shown"
      transition={{ staggerChildren: 0.1, delayChildren: 0.5 }}
    >
      {steps.map((s, i) => {
        const w = 100 - (i * 56) / (n - 1);
        const last = i === n - 1;
        return (
          <li key={s} className="flex justify-center">
            <m.span
              style={{ width: `${w}%` }}
              variants={{ hidden: { scaleX: 0.2, opacity: 0 }, shown: { scaleX: 1, opacity: 1 } }}
              transition={{ duration: 0.8, ease: ease.out }}
              className={`flex h-12 items-center justify-between rounded-full px-5 sm:h-14 ${
                last ? "bg-red text-white" : i === 0 ? "bg-charcoal text-ivory" : "border border-line-strong bg-white/70"
              }`}
            >
              <span className="font-mono text-[0.66rem] font-bold tracking-[0.14em] opacity-70">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[0.98rem] font-extrabold tracking-[-0.01em] sm:text-[1.1rem]">{s}</span>
              <span aria-hidden className="w-5 text-right">{last ? "●" : "↓"}</span>
            </m.span>
          </li>
        );
      })}
    </m.ol>
  );
}
