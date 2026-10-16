"use client";

import { useRef } from "react";
import Image from "next/image";
import { founder } from "@/content/site";
import { useArrival } from "@/lib/useArrival";
import { ButtonLink, RiseLetters } from "./primitives";
import founderPhoto from "@/assets/founder/sathya-cutout.webp";

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

/**
 * "Founder and CEO", laid out like the reference: the whole section is a Karnataka flag split in two —
 * yellow on the left carrying the story, red on the right — with the founder's cut-out
 * standing on the seam and the title set huge across the foot of the section. Phones turn the flag
 * the right way up: yellow over red, photo on the yellow, story on the red.
 */
export function FounderSection() {
  const ref = useRef<HTMLElement>(null);
  const arrived = useArrival(ref);

  return (
    <section
      ref={ref}
      id="founder"
      aria-labelledby="founder-title"
      data-arrived={arrived}
      className="relative flex min-h-[80vh] flex-col overflow-hidden bg-red text-ivory lg:block lg:bg-[linear-gradient(to_right,var(--color-gold)_52%,var(--color-red)_52%)]"
    >
      {/* Founder cut-out: on the yellow on phones, straddling the seam on desktop */}
      <div className="relative order-1 h-[60vh] w-full bg-gold lg:absolute lg:bg-transparent lg:bottom-0 lg:left-[52%] lg:h-[88%] lg:w-[34%] lg:max-w-none lg:-translate-x-[38%]">
        <Image
          src={founderPhoto}
          alt={`${founder.name}, ${founder.role} of Sathya Enterprises`}
          sizes="(min-width: 1024px) 34vw, 90vw"
          className="rise absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
          style={step(2)}
        />
      </div>

      {/* Story: on the red on phones, on the yellow on desktop */}
      <div className="container-x relative order-2 py-16 lg:pb-[clamp(7rem,16vw,15rem)] lg:pt-[clamp(4rem,8vw,7rem)]">
        <div className="lg:w-[44%]">
          <p className="rise t-eyebrow flex items-center gap-2 text-gold lg:text-red">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold lg:bg-red" />
            Meet the Founder
          </p>
          <div className="mt-6 space-y-4 text-ivory/90 lg:text-ink-soft">
            {founder.paragraphs.flat().map((line, i) => (
              <p key={i} className={`rise ${i === 0 ? "t-lead text-ivory lg:text-ink" : ""}`} style={step(3 + i)}>
                {line}
              </p>
            ))}
          </div>
          <div className="rise mt-10" style={step(3 + founder.paragraphs.flat().length)}>
            <ButtonLink href="/contact" variant="secondary">
              Book A Free Consultation
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Title set huge across the foot, over the photo like the reference */}
      <h2
        id="founder-title"
        className="pointer-events-none order-3 whitespace-nowrap px-4 pb-6 text-center font-display text-[clamp(2.25rem,10vw,10.5rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.04em] text-ivory/90 lg:absolute lg:inset-x-0 lg:bottom-0 lg:pb-[1.5vw]"
      >
        <RiseLetters text={founder.title} line={1} />
      </h2>
    </section>
  );
}
