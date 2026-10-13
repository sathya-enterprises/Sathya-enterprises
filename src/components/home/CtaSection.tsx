"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { brand, contact } from "@/content/site";
import { useArrival } from "@/lib/useArrival";
import { ButtonLink, Eyebrow, RiseLetters } from "./primitives";
import { Shape } from "./ShapeField";

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

/**
 * Closing panel: warm gold-light card with two brand shapes tucked into its corners. On arrival the
 * shapes grow in, the headline rises letter by letter, then the copy, buttons and email follow
 * (replays on return). Nothing runs per scroll frame or on a loop.
 */
export function CtaSection({
  secondary = { href: "/#ecosystem", label: "Explore Ecosystem" },
}: {
  /** Second button, e.g. on to the next division. */
  secondary?: { href: string; label: string };
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const arrived = useArrival(ref);

  return (
    <section
      ref={ref}
      id="contact"
      data-arrived={arrived}
      className="relative flex items-center bg-ivory py-[clamp(1.5rem,4vw,3rem)] lg:min-h-svh lg:pt-[calc(var(--header-h)+1.5rem)]"
    >
      <div className="container-x w-full">
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-gold/40 bg-gold-light px-5 py-[clamp(4.5rem,12vw,8rem)] text-center text-ink lg:py-[6vh]">
          <div aria-hidden className="absolute -left-16 -top-16 w-48 text-red md:-left-20 md:-top-20 md:w-72">
            <div className="rise-shape">
              <Shape kind="circle" />
            </div>
          </div>
          <div aria-hidden className="absolute -bottom-20 -right-16 w-56 rotate-12 text-gold md:-bottom-24 md:-right-20 md:w-80">
            <div className="rise-shape" style={step(2)}>
              <Shape kind="clover" />
            </div>
          </div>

          <div className="relative">
            <div className="rise">
              <Eyebrow>What&apos;s Next</Eyebrow>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,min(10vw,11vh),7rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] md:mt-8 lg:mt-[3vh]">
              <RiseLetters text="Let's build" line={1} />
              <br />
              <span className="text-red">
                <RiseLetters text="what's next." line={3} />
              </span>
            </h2>
            <p className="rise t-lead mx-auto mt-6 max-w-xl text-ink-soft md:mt-8 lg:mt-[3vh]" style={step(6)}>
              {brand.summary}
            </p>
          </div>

          <div
            className="rise relative mx-auto mt-10 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4 lg:mt-[4vh]"
            style={step(7)}
          >
            <ButtonLink href="/contact">Start a Conversation</ButtonLink>
            <ButtonLink href={secondary.href} variant="secondary">
              {secondary.label}
            </ButtonLink>
          </div>

          <a
            href={`mailto:${contact.email.value}`}
            style={step(8)}
            className="rise link-draw relative mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-red md:text-base lg:mt-[3vh]"
          >
            {contact.email.value}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
