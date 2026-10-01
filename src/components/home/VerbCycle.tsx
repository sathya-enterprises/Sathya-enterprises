"use client";

import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import * as m from "motion/react-m";
import { brand } from "@/content/site";

const STEP = 1800;

/** BUILD. MARKET. AUTOMATE. GROW. — each verb takes the stage in turn, with a progress hairline. */
export function VerbCycle() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotionSafe();

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % brand.verbs.length), STEP);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  return (
    <div ref={ref}>
      <p className="sr-only">{brand.tagline}</p>
      <ol aria-hidden className="grid grid-cols-4 gap-2">
        {brand.verbs.map((v, i) => {
          const on = i === active;
          return (
            <li key={v} className="min-w-0">
              <span className="block h-[2px] overflow-hidden rounded-full bg-line">
                {on && !reduce ? (
                  <m.span
                    key={`p-${active}`}
                    className="block h-full origin-left bg-red"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: STEP / 1000, ease: "linear" }}
                  />
                ) : (
                  <span className={`block h-full ${i < active || reduce ? "bg-charcoal/25" : ""}`} />
                )}
              </span>
              <span
                className={`mt-3 block truncate font-mono text-[0.7rem] font-bold tracking-[0.14em] transition-colors duration-300 sm:text-[0.78rem] ${
                  on ? "text-red" : "text-charcoal-soft/70"
                }`}
              >
                {v}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
