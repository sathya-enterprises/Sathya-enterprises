"use client";

import { useRef } from "react";
import Image from "next/image";
import { founder } from "@/content/site";
import { useArrival } from "@/lib/useArrival";
import { ButtonLink, Eyebrow, RiseLetters } from "./primitives";
import { Shape } from "./ShapeField";
import founderPhoto from "@/assets/founder/sathya-cutout.webp";

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

/**
 * "Our Visionary": the founder's story beside a warm gold panel where his cut-out stands in front of
 * a gold circle, a red clover tucked into the corner and a red name tag over his shoulder. On arrival
 * the shapes grow in, the photo lifts, the headline rises letter by letter and the story follows
 * (replays on return). Phones stack the photo above the story.
 */
export function FounderSection() {
  const ref = useRef<HTMLElement>(null);
  const arrived = useArrival(ref);
  const [first, ...rest] = founder.title.split(" ");

  return (
    <section
      ref={ref}
      id="founder"
      aria-labelledby="founder-title"
      data-arrived={arrived}
      className="section-y relative overflow-hidden bg-ivory text-ink"
    >
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Photo panel */}
        <div className="relative mx-auto w-full max-w-[520px] lg:order-2">
          <div className="rise relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] border border-gold/40 bg-gradient-to-b from-gold-light to-gold-tint">
            <div aria-hidden className="absolute left-1/2 top-[14%] w-[88%] -translate-x-1/2 text-gold">
              <div className="rise-shape" style={step(1)}>
                <Shape kind="circle" />
              </div>
            </div>
            <div aria-hidden className="absolute -left-10 -top-10 w-32 -rotate-12 text-red md:w-40">
              <div className="rise-shape" style={step(3)}>
                <Shape kind="clover" />
              </div>
            </div>
            <Image
              src={founderPhoto}
              alt={`${founder.name}, ${founder.role} of Sathya Enterprises`}
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="rise absolute bottom-0 left-1/2 h-[88%] w-auto max-w-none -translate-x-1/2 object-contain"
              style={step(2)}
            />
          </div>

          <div
            className="rise absolute -bottom-6 left-4 rounded-[var(--radius-md)] bg-red px-5 py-4 text-ivory shadow-2 md:-left-6"
            style={step(5)}
          >
            <p className="font-display text-xl font-extrabold uppercase leading-none tracking-[-0.02em]">{founder.name}</p>
            <p className="t-eyebrow mt-2 flex items-center gap-2 text-gold">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
              {founder.role}, Sathya Enterprises
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="relative lg:order-1">
          <div className="rise">
            <Eyebrow>Meet the Founder</Eyebrow>
          </div>
          <h2
            id="founder-title"
            className="mt-6 font-display text-[clamp(2.75rem,min(8vw,11vh),6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]"
          >
            <RiseLetters text={first} line={1} />
            <br />
            <RiseLetters text={rest.join(" ")} line={2} gradient />
          </h2>
          <div aria-hidden className="rise-line mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-red to-gold" />

          <div className="mt-8 space-y-4 text-ink-soft">
            {founder.paragraphs.flat().map((line, i) => (
              <p key={i} className={`rise ${i === 0 ? "t-lead text-ink" : ""}`} style={step(4 + i)}>
                {line}
              </p>
            ))}
          </div>

          <div className="rise mt-10" style={step(4 + founder.paragraphs.flat().length)}>
            <ButtonLink href="/contact">Book A Free Consultation</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
