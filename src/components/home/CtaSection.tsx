"use client";

import { ArrowUpRight } from "lucide-react";
import { brand, contact } from "@/content/site";
import { Accent, ButtonLink, Eyebrow, Reveal } from "./primitives";
import { Shape } from "./ShapeField";

/**
 * Closing panel: dark card with two still brand shapes tucked into its corners. The only motion is the
 * content rising in when it scrolls into view — nothing runs per scroll frame or on a loop.
 */
export function CtaSection() {
  return (
    <section id="contact" className="relative bg-ivory py-[clamp(1.5rem,4vw,3rem)]">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-charcoal px-5 py-[clamp(4.5rem,12vw,8rem)] text-center text-ivory">
          <div aria-hidden className="absolute -left-16 -top-16 w-48 text-red md:-left-20 md:-top-20 md:w-72">
            <Shape kind="circle" />
          </div>
          <div aria-hidden className="absolute -bottom-20 -right-16 w-56 rotate-12 text-gold md:-bottom-24 md:-right-20 md:w-80">
            <Shape kind="clover" />
          </div>

          <Reveal className="relative">
            <Eyebrow>What&apos;s Next</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,10vw,7rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] md:mt-8">
              Let&apos;s build
              <br />
              <Accent>what&apos;s next.</Accent>
            </h2>
            <p className="t-lead mx-auto mt-6 max-w-xl text-ivory/75 md:mt-8">{brand.summary}</p>
          </Reveal>

          <Reveal delay={0.1} className="relative mx-auto mt-10 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
            <ButtonLink href={`mailto:${contact.email.value}`}>Start a Conversation</ButtonLink>
            <ButtonLink href="#ecosystem" variant="secondary">
              Explore Ecosystem
            </ButtonLink>
          </Reveal>

          <a
            href={`mailto:${contact.email.value}`}
            className="link-draw relative mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-gold md:text-base"
          >
            {contact.email.value}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
