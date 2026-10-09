"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { Briefcase, Handshake, MapPin, Users, type LucideIcon } from "lucide-react";
import type { Photo } from "@/content/photos";
import { CountUp } from "@/components/motion/CountUp";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { ease } from "@/lib/motion";

type Item = { title: string; body: string; figure?: { value: number; suffix: string } };

const icons: LucideIcon[] = [Users, Briefcase, Handshake];

/** Tiles rise into place one after another as the grid scrolls in (from below, alternating sides). */
function Tile({ i, className, children }: { i: number; className: string; children: React.ReactNode }) {
  return (
    <m.li
      className={className}
      initial={{ opacity: 0, y: 48, x: i % 2 ? 24 : -24 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease: ease.out, delay: i * 0.1 }}
    >
      {children}
    </m.li>
  );
}

/**
 * Built to Grow — a bento of the live site's four highlights around a team photo.
 *   lg:  photo (7 cols, two rows) · gold "10+" figure and the next highlight stacked beside it (5 cols)
 *        · the last two highlights side by side underneath (6 + 6)
 *   sm:  photo full width, then the tiles two per row · phones: one column
 * The photo drifts inside its frame as the page scrolls; the figure counts up when it arrives.
 */
export function BuiltToGrow({ items, photo }: { items: Item[]; photo: Photo }) {
  const reduced = useReducedMotionSafe();
  const frame = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const [figure, ...rest] = items;

  return (
    <section aria-labelledby="grow-title" className="container-x py-16 sm:py-24 lg:py-28">
      <div className="reveal flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <div>
          <p className="t-eyebrow text-gold">Built to grow</p>
          <h2 id="grow-title" className="mt-3 max-w-[18ch] font-display text-[clamp(1.9rem,5vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
            An ecosystem that <span className="text-gold">keeps adding value.</span>
          </h2>
        </div>
        <p className="max-w-[38ch] text-ivory/80">
          Every new business, client and partner makes the rest of the ecosystem more useful to the next one.
        </p>
      </div>

      <ul className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto]">
        {/* Photo */}
        <m.li
          ref={frame}
          className="relative min-h-[18rem] overflow-hidden rounded-lg border border-white/12 sm:col-span-2 sm:min-h-[24rem] lg:col-span-7 lg:row-span-2 lg:min-h-0"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 1, ease: ease.out }}
        >
          <m.div style={reduced ? undefined : { y }} className="absolute inset-x-0 -inset-y-[10%]">
            <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
          </m.div>
          <span aria-hidden className="absolute inset-0 bg-linear-to-t from-sea-abyss/80 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-sea-abyss/80 px-3 py-1.5 text-[0.85rem] font-semibold sm:bottom-6 sm:left-6">
            <MapPin aria-hidden className="h-4 w-4 text-gold" />
            Bengaluru, Karnataka
          </span>
        </m.li>

        {/* The figure */}
        {figure && (
          <Tile i={1} className="flex flex-col justify-between rounded-lg bg-gold p-6 text-ink [text-shadow:none] sm:p-8 lg:col-span-5">
            <p className="font-display text-[clamp(4.5rem,11vw,7.5rem)] font-extrabold leading-[0.85] tracking-[-0.06em]">
              {figure.figure ? (
                <>
                  <CountUp to={figure.figure.value} />
                  {figure.figure.suffix}
                </>
              ) : null}
            </p>
            <div className="mt-6">
              <h3 className="font-display text-[1.4rem] font-extrabold tracking-[-0.02em]">{figure.title}</h3>
              <p className="mt-1.5 max-w-[34ch] text-[0.98rem] text-ink/75">{figure.body}</p>
            </div>
          </Tile>
        )}

        {rest.map((it, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Tile
              key={it.title}
              i={i + 2}
              className={`flex flex-col rounded-lg border border-white/12 bg-sea-abyss/85 p-6 sm:p-8 ${i === 0 ? "lg:col-span-5" : "lg:col-span-6"}`}
            >
              <span className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/40">
                  <Icon aria-hidden className="h-5 w-5 text-gold" />
                </span>
                <span aria-hidden className="font-mono text-[0.75rem] font-bold text-ivory/45">
                  0{i + 2}
                </span>
              </span>
              <h3 className="mt-8 font-display text-[1.4rem] font-extrabold leading-tight tracking-[-0.02em]">{it.title}</h3>
              <p className="mt-1.5 text-[0.98rem] text-ivory/75">{it.body}</p>
            </Tile>
          );
        })}
      </ul>
    </section>
  );
}
