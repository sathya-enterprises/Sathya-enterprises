"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { ButtonLink, Eyebrow } from "./primitives";
import { ShapeField } from "./ShapeField";

export function HeroParallax() {
  const ref = useRef<HTMLElement>(null);

  // Text drifts up and fades as the hero leaves; the shapes move at their own depths.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  // Function form on purpose: the array form gets handed to a native scroll timeline, which misreads
  // this section's range and starts the fade early (text sat at ~84% opacity at the top of the page).
  const textOpacity = useTransform(scrollYProgress, (p) => Math.max(0, 1 - p / 0.6));

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden bg-ivory pb-16 pt-[calc(var(--header-h)+2.5rem)] md:pb-24"
    >
      <ShapeField progress={scrollYProgress} />

      <m.div style={{ y: textY, opacity: textOpacity }} className="container-x relative text-center">
        <div className="enter" style={{ "--i": 0 } as React.CSSProperties}>
          <Eyebrow>Build. Market. Automate. Grow.</Eyebrow>
        </div>

        <h1 className="mt-6 font-display text-[clamp(2.75rem,12vw,8rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-charcoal md:mt-8">
          <span className="enter-mask">
            <span className="enter block" style={{ "--i": 1 } as React.CSSProperties}>Sathya</span>
          </span>
          <span className="enter-mask">
            <span className="enter block text-red" style={{ "--i": 2 } as React.CSSProperties}>Enterprises</span>
          </span>
        </h1>

        <p className="enter t-lead mx-auto mt-6 max-w-xl text-charcoal-soft md:mt-8" style={{ "--i": 3 } as React.CSSProperties}>
          Digital growth, technology, data, products, infrastructure and business services — built as one connected ecosystem.
        </p>

        <div
          className="enter mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4 md:mt-10"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          <ButtonLink href="#ecosystem">Explore Our Businesses</ButtonLink>
          <ButtonLink href="#contact" variant="secondary">
            Start a Conversation
          </ButtonLink>
        </div>
      </m.div>
    </section>
  );
}
