"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, Building2, Cpu, Handshake, Package, type LucideIcon } from "lucide-react";
import type { Photo } from "@/content/photos";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { ease } from "@/lib/motion";

const icons: LucideIcon[] = [Building2, Package, Cpu, Handshake];

/**
 * Looking Ahead — the four growth areas from the live site on a photo panel.
 *   lg: heading, line and contact link on the left (5 cols); the four areas as numbered rows on the right
 *       (7 cols). Phones and tablets: heading first, rows underneath.
 * Scroll: the panel grows from slightly inset to full size as it arrives, the photo drifts behind it,
 * the heading slides in, and each row's rule draws across before its text rises.
 */
export function LookingAhead({ items, photo }: { items: { title: string; body: string }[]; photo: Photo }) {
  const reduced = useReducedMotionSafe();
  const panel = useRef<HTMLDivElement>(null);
  const { scrollYProgress: enter } = useScroll({ target: panel, offset: ["start end", "start 0.35"] });
  const { scrollYProgress: through } = useScroll({ target: panel, offset: ["start end", "end start"] });
  const scale = useTransform(enter, [0, 1], [0.9, 1]);
  const photoY = useTransform(through, [0, 1], ["-10%", "10%"]);
  const headX = useTransform(enter, [0, 1], ["-12%", "0%"]);

  return (
    <section aria-labelledby="ahead-title" className="container-x py-16 sm:py-24 lg:py-28">
      <m.div
        ref={panel}
        style={reduced ? undefined : { scale }}
        className="relative isolate overflow-hidden rounded-lg border border-white/12"
      >
        <m.div style={reduced ? undefined : { y: photoY }} className="absolute inset-x-0 -inset-y-[12%] -z-10">
          <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover" />
        </m.div>
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-b from-sea-abyss/75 via-sea-abyss/85 to-sea-abyss/95 lg:bg-linear-to-r lg:from-sea-abyss/95 lg:via-sea-abyss/85 lg:to-sea-abyss/70"
        />

        <div className="grid gap-10 px-5 py-12 sm:px-10 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:px-14 lg:py-20">
          <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="t-eyebrow text-gold">Looking ahead</p>
              <m.h2
                id="ahead-title"
                style={reduced ? undefined : { x: headX }}
                className="mt-3 font-display text-[clamp(2.6rem,8vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
              >
                What&apos;s <span className="block text-gold">next?</span>
              </m.h2>
              <p className="mt-5 max-w-[36ch] text-[1.05rem] text-ivory/85">
                The ecosystem is built to keep growing. These are the four directions it grows in next.
              </p>
            </div>
            <Link
              href="/contact"
              className="group mt-8 inline-flex w-fit items-center gap-2 font-semibold text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
            >
              Partner with us
              <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ol className="lg:col-span-7">
            {items.map((it, i) => {
              const Icon = icons[i % icons.length];
              return (
                <m.li
                  key={it.title}
                  className="relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 py-6 sm:gap-6 sm:py-7"
                  initial="hidden"
                  whileInView="shown"
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ delayChildren: i * 0.08, staggerChildren: 0.12 }}
                >
                  {/* The rule above each row draws in from the left */}
                  <m.span
                    aria-hidden
                    variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
                    transition={{ duration: 0.9, ease: ease.out }}
                    className="absolute inset-x-0 top-0 h-px origin-left bg-white/25"
                  />
                  <m.span
                    aria-hidden
                    variants={{ hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.7, ease: ease.out }}
                    className="font-mono text-[0.85rem] font-bold text-gold sm:pt-1.5"
                  >
                    0{i + 1}
                  </m.span>
                  <m.div variants={{ hidden: { opacity: 0, y: 28 }, shown: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, ease: ease.out }}>
                    <h3 className="font-display text-[clamp(1.5rem,3.2vw,2.25rem)] font-extrabold leading-none tracking-[-0.03em]">{it.title}</h3>
                    <p className="mt-2 text-[1rem] text-ivory/75">{it.body}</p>
                  </m.div>
                  <m.span
                    variants={{ hidden: { opacity: 0, scale: 0.6, rotate: -20 }, shown: { opacity: 1, scale: 1, rotate: 0 } }}
                    transition={{ duration: 0.7, ease: ease.out }}
                    className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 sm:h-12 sm:w-12"
                  >
                    <Icon aria-hidden className="h-5 w-5 text-gold" />
                  </m.span>
                </m.li>
              );
            })}
          </ol>
        </div>
      </m.div>
    </section>
  );
}
