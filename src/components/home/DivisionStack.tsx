"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScroll, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";
import { ArrowRight } from "lucide-react";
import { businessHref, businessesIn, divisions, type Division } from "@/content/site";
import { divisionPhotos } from "@/content/photos";
import { serviceIcons } from "@/components/division/serviceIcons";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

/**
 * The four divisions as full-height panels that stack: each pins just under the header and the next
 * slides up from the bottom over it, while the covered one sinks back (scales down and dims). Same on
 * phones and desktop. Each panel pins a little lower than the last, so the edges of the stack peek out.
 * Reduced motion keeps the stacking (it is just sticky positioning) but drops the scale and dim.
 */
export function DivisionStack() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const reduced = useReducedMotionSafe();

  return (
    <ol ref={ref} className="mt-8 sm:mt-12">
      {divisions.map((d, i) => (
        <Panel key={d.id} division={d} index={i} count={divisions.length} progress={scrollYProgress} still={reduced} />
      ))}
    </ol>
  );
}

function Panel({
  division: d,
  index,
  count,
  progress,
  still,
}: {
  division: Division;
  index: number;
  count: number;
  progress: MotionValue<number>;
  still: boolean;
}) {
  // The stack's progress runs from the first panel pinning (0) to the last one pinning (1), so panel i
  // pins at i / (count - 1). From then on it shrinks a little for each panel that lands on top of it,
  // and dims while the very next one slides over it.
  const step = 1 / (count - 1);
  const start = index * step;
  const last = index === count - 1;
  const scale = useTransform(progress, last ? [0, 1] : [start, 1], last ? [1, 1] : [1, 1 - (count - 1 - index) * 0.05]);
  const dim = useTransform(progress, last ? [0, 1] : [start, start + step], last ? [0, 0] : [0, 0.55]);
  const photo = divisionPhotos[d.id];
  const items = businessesIn(d.id, { includeAlso: false });

  return (
    <li
      className="sticky mb-6 last:mb-0 sm:mb-10"
      style={{ top: `calc(var(--header-h) + 0.75rem + ${index * 0.75}rem)` }}
    >
      <m.article
        style={still ? undefined : { scale }}
        className="relative flex h-[calc(100svh-var(--header-h)-4.5rem)] min-h-[34rem] origin-top flex-col justify-end overflow-hidden rounded-lg border border-white/15 bg-sea-abyss shadow-[0_-24px_60px_-30px_rgb(0_0_0/0.8)] sm:max-h-[52rem]"
      >
        <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="100vw" className="object-cover" />
        {/* Darken toward the text: from the bottom on phones, from the left on wide screens */}
        <span aria-hidden className="absolute inset-0 bg-linear-to-t from-sea-abyss via-sea-abyss/80 to-sea-abyss/10 lg:bg-linear-to-r lg:via-sea-abyss/70 lg:to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-sea-abyss/75 px-3 py-1 font-mono text-[0.72rem] font-bold tracking-[0.16em] text-gold sm:left-8 sm:top-8">
          {d.index} / 0{count}
        </span>

        <div className="relative p-5 sm:p-8 lg:max-w-[46rem] lg:p-12">
          <h3 className="font-display text-[clamp(2.6rem,12vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
            {d.name.charAt(0) + d.name.slice(1).toLowerCase()}
          </h3>
          <p className="mt-2 text-[1.05rem] font-semibold text-gold sm:mt-3 sm:text-[1.35rem]">{d.role}</p>
          <p className="mt-2 max-w-[44ch] text-[0.95rem] text-ivory/85 sm:mt-3 sm:text-[1.08rem]">{d.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
            {items.map((b) => {
              const Icon = serviceIcons[b.slug];
              return (
                <li key={b.slug}>
                  <Link
                    href={businessHref(b)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-sea-abyss/70 px-3 py-1.5 text-[0.8rem] font-semibold transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-charcoal sm:px-3.5 sm:text-[0.85rem]"
                  >
                    {Icon && <Icon aria-hidden className="hidden h-3.5 w-3.5 sm:block" />}
                    {b.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={d.href}
            className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 sm:mt-6 font-bold text-charcoal transition-colors duration-300 hover:bg-ivory sm:w-auto sm:py-3.5"
          >
            Explore {d.name.charAt(0) + d.name.slice(1).toLowerCase()}
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Dims the panel as the next one covers it */}
        {!still && <m.span aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-sea-abyss" />}
      </m.article>
    </li>
  );
}
