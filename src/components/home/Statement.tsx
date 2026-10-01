"use client";

import { useRef } from "react";
import { useScroll, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";
import { brand, divisions } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/Interactive";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.5, 1]);
  return (
    <m.span style={{ opacity }} className="inline">
      {children}{" "}
    </m.span>
  );
}

/**
 * "Who we are" — read at the pace of scrolling. Then the four roles that make the ecosystem a chain,
 * each set on its own division tone.
 */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = brand.whoWeAre.split(" ");

  return (
    <section aria-labelledby="who-title" className="section-y relative">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)]">
          <div>
            <p className="t-eyebrow text-red-deep">Who we are</p>
            <h2 id="who-title" className="mt-4 font-display text-[1.05rem] font-extrabold leading-tight tracking-[-0.01em]">
              MORE THAN A BUSINESS.
              <br />
              <span className="text-red">A GROWING ECOSYSTEM.</span>
            </h2>
          </div>
          <p
            ref={ref}
            className="font-display text-[clamp(1.5rem,3.1vw,2.75rem)] font-bold leading-[1.16] tracking-[-0.025em]"
          >
            <span>
              {words.map((w, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                  {w}
                </Word>
              ))}
            </span>
          </p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {divisions.map((d, i) => (
            <li key={d.id} className="bg-ivory">
              <Reveal delay={i * 0.08} y={16} className="h-full">
              <TiltCard className="h-full" max={4}>
              <div data-tone={d.id} className="tone relative flex h-full min-h-[132px] flex-col justify-between rounded-[inherit] p-5 sm:min-h-[220px] sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.7rem] font-bold tracking-[0.16em] text-[color:var(--tone-accent)]">
                    {d.index} · {d.name}
                  </span>
                  {i < divisions.length - 1 && (
                    <span aria-hidden className="font-mono text-sm text-[color:var(--tone-accent)]">
                      →
                    </span>
                  )}
                </div>
                <p className="mt-5 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] sm:mt-10 font-extrabold leading-[1.02] tracking-[-0.025em]">
                  {d.role}
                </p>
              </div>
              </TiltCard>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="t-eyebrow mt-6 text-center text-charcoal-soft">{brand.opportunities}</p>
      </div>
    </section>
  );
}
