"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { about } from "@/content/site";

const SAT = [
  [16, 5],
  [27, 16],
  [16, 27],
  [5, 16],
];

/**
 * The six About statements read as chapters. On wide screens the mark on the left builds up
 * chapter by chapter — core first, then satellites, then the orbit — until the ecosystem is whole.
 */
export function Chapters() {
  const ref = useRef<HTMLOListElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] });
  useMotionValueEvent(scrollYProgress, "change", (p) =>
    setStep(Math.min(about.chapters.length - 1, Math.max(0, Math.floor(p * about.chapters.length)))),
  );

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
      <div className="hidden lg:block">
        <div className="sticky top-[calc(var(--header-h)+4rem)]">
          <svg viewBox="0 0 32 32" className="h-56 w-56 overflow-visible" aria-hidden>
            <circle
              cx="16"
              cy="16"
              r="11"
              fill="none"
              stroke="var(--color-line-strong)"
              strokeDasharray="1 2"
              style={{ opacity: step >= 5 ? 1 : 0, transition: "opacity 500ms var(--ease-out)" }}
            />
            <circle cx="16" cy="16" r="6" fill="var(--color-red)" />
            {SAT.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="2.4"
                fill="var(--color-gold)"
                style={{
                  opacity: step >= i + 1 ? 1 : 0.12,
                  transform: step >= i + 1 ? "scale(1)" : "scale(0.5)",
                  transformOrigin: `${x}px ${y}px`,
                  transition: "opacity 500ms var(--ease-out), transform 500ms var(--ease-out)",
                }}
              />
            ))}
          </svg>
          <p className="mt-8 font-mono text-[0.72rem] font-bold tracking-[0.16em] text-red-deep">
            {String(step + 1).padStart(2, "0")} / {String(about.chapters.length).padStart(2, "0")} — {about.chapters[step].label.toUpperCase()}
          </p>
        </div>
      </div>

      <ol ref={ref} className="space-y-6">
        {about.chapters.map((c, i) => (
          <li
            key={c.label}
            className={`rounded-lg border p-8 transition-[background-color,border-color,opacity] duration-500 sm:p-10 lg:min-h-[44vh] ${
              i === step ? "border-line lg:border-gold lg:bg-gold-light" : "border-line lg:opacity-50"
            }`}
          >
            <p className="font-mono text-[0.72rem] font-bold tracking-[0.16em] text-red">
              {String(i + 1).padStart(2, "0")} · {c.label.toUpperCase()}
            </p>
            <p className="mt-6 font-display text-[clamp(1.5rem,2.8vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.025em]">{c.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
