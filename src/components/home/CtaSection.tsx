"use client";

import { ArrowUpRight } from "lucide-react";
import { brand, contact } from "@/content/site";
import { ButtonLink, Eyebrow, Reveal } from "./primitives";
import { Shape } from "./ShapeField";

/**
 * Closing panel: warm gold-light card with two still brand shapes tucked into its corners. The only motion is the
 * content rising in when it scrolls into view — nothing runs per scroll frame or on a loop.
 */
export function CtaSection() {
  return (
    <section id="contact" className="relative flex items-center bg-ivory py-[clamp(1.5rem,4vw,3rem)] lg:min-h-svh lg:pt-[calc(var(--header-h)+1.5rem)]">
      <div className="container-x w-full">
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-gold/40 bg-gold-light px-5 py-[clamp(4.5rem,12vw,8rem)] text-center text-ink lg:py-[6vh]">
          <div aria-hidden className="absolute -left-16 -top-16 w-48 text-red md:-left-20 md:-top-20 md:w-72">
            <Shape kind="circle" />
          </div>
          <div aria-hidden className="absolute -bottom-20 -right-16 w-56 rotate-12 text-gold md:-bottom-24 md:-right-20 md:w-80">
            <Shape kind="clover" />
          </div>

          <Reveal className="relative">
            <Eyebrow>What&apos;s Next</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,min(10vw,11vh),7rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] md:mt-8 lg:mt-[3vh]">
              Let&apos;s build
              <br />
              <span className="text-red">what&apos;s next.</span>
            </h2>
            <p className="t-lead mx-auto mt-6 max-w-xl text-ink-soft md:mt-8 lg:mt-[3vh]">{brand.summary}</p>
          </Reveal>

          <Reveal delay={0.1} className="relative mx-auto mt-10 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4 lg:mt-[4vh]">
            <ButtonLink href={`mailto:${contact.email.value}`}>Start a Conversation</ButtonLink>
            <ButtonLink href="#ecosystem" variant="secondary">
              Explore Ecosystem
            </ButtonLink>
          </Reveal>

          <a
            href={`mailto:${contact.email.value}`}
            className="link-draw relative mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-red md:text-base lg:mt-[3vh]"
          >
            {contact.email.value}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
