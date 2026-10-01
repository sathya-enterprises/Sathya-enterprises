"use client";

import Link from "next/link";
import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { brand } from "@/content/site";
import { CoreOrbit } from "./CoreOrbit";
import { VerbCycle } from "./VerbCycle";
import { DivisionDeck } from "./DivisionDeck";
import { FloatingShapes, type ShapeSpec } from "@/components/motion/FloatingShapes";
import { Magnetic } from "@/components/motion/Interactive";

/** Brand geometry framing the name — placed in the composition's open space. */
const shapes: ShapeSpec[] = [
  { kind: "orbit", x: 86, y: 9, size: 92, color: "var(--color-gold)", depth: 0.9, rotate: 12 },
  { kind: "ring", x: 93, y: 24, size: 64, color: "var(--color-red)", depth: 1.2, desktopOnly: true },
  { kind: "tile", x: 60, y: 39, size: 46, color: "var(--color-gold)", depth: 0.5, rotate: -14, desktopOnly: true },
  { kind: "pill", x: 44, y: 49, size: 60, color: "var(--color-charcoal)", depth: -0.4, rotate: -24, desktopOnly: true },
  { kind: "plus", x: 50, y: 86, size: 30, color: "var(--color-red-deep)", depth: 0.7, rotate: 20, desktopOnly: true },
  { kind: "dot", x: 4, y: 93, size: 22, color: "var(--color-red)", depth: 1.1, desktopOnly: true },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Scroll-linked exit: the name lifts away faster than the orbit, which recedes into the next section.
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const orbitScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const orbitY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0.45, 0.95], [1, 0]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-[calc(var(--header-h)+2.5rem)] pb-16 sm:pt-[calc(var(--header-h)+3.5rem)] lg:min-h-[100svh] lg:pb-10"
    >
      {/* Hairline grid — quiet structure, not decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(to_right,var(--color-line)_1px,transparent_1px)] [background-size:calc((min(100vw,var(--container-wide))-2*var(--gutter))/6)_100%] [background-position:center] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <FloatingShapes shapes={shapes} className="z-[2]" />

      <div className="container-wide">
        <m.div style={{ y: nameY, opacity: fade }}>
          <p className="enter t-eyebrow flex items-center gap-3 text-red-deep" style={{ ["--i" as string]: 0 }}>
            <span className="inline-block h-px w-8 bg-red" aria-hidden />
            01 — Sathya Enterprises
          </p>
          <h1 id="hero-title" className="mt-5 font-display font-extrabold text-charcoal">
            {/* Painted immediately (LCP); letters only travel into place as the loader lifts. */}
            <span className="block pb-[0.04em] leading-[0.84] tracking-[-0.05em] [font-stretch:125%] text-[17.6vw] lg:text-[clamp(3.6rem,14.2vw,14rem)]">
              {Array.from(brand.first).map((ch, i) => (
                <span key={i} className="enter-word" style={{ ["--w" as string]: i }}>
                  {ch}
                </span>
              ))}
            </span>
            <span className="block pl-[0.06em] leading-[0.95] tracking-[-0.02em] text-red [font-stretch:112%] text-[9.3vw] lg:text-[clamp(1.85rem,6.3vw,6.2rem)]">
              <span className="enter-word" style={{ ["--w" as string]: 6 }}>
                {brand.second}
              </span>
            </span>
          </h1>
        </m.div>

        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,580px)]">
          <m.div style={{ opacity: fade }}>
            <p
              className="enter font-display text-[clamp(1.45rem,2.6vw,2.35rem)] font-bold leading-[1.08] tracking-[-0.025em]"
              style={{ ["--i" as string]: 3 }}
            >
              One Enterprise.
              <br />
              Multiple Businesses.
              <br />
              <span className="text-red">One Connected Ecosystem.</span>
            </p>

            <div className="enter mt-8" style={{ ["--i" as string]: 4 }}>
              <VerbCycle />
            </div>

            <div className="enter mt-8 flex flex-wrap gap-3 lg:mt-10" style={{ ["--i" as string]: 5 }}>
              <Magnetic>
              <Link
                href="#ecosystem"
                className="group inline-flex items-center gap-2.5 rounded-full bg-red px-6 py-3.5 font-bold text-white transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-gold hover:text-charcoal"
              >
                Explore Our Businesses
                <ArrowDownRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </Link>
              </Magnetic>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-line-strong px-6 py-3.5 font-bold transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-red hover:text-red"
              >
                Start a Conversation
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </m.div>

          {/* Touch / narrow screens: a swipeable division deck. */}
          <div className="enter lg:hidden" style={{ ["--i" as string]: 6 }}>
            <DivisionDeck />
          </div>
          {/* Motion owns the outer transform (scroll); CSS owns the inner entrance. Never both on one node. */}
          <m.div style={{ scale: orbitScale, y: orbitY }} className="hidden lg:-mt-[10vw] lg:block">
            <div className="enter" style={{ ["--i" as string]: 3 }}>
              <CoreOrbit />
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
