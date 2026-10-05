"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { ArrowLeft, ArrowRight, Pause, Play, Quote } from "lucide-react";
import { divisionById, type Testimonial } from "@/content/site";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { ease } from "@/lib/motion";

/** Time each slide stays before autoplay moves on, ms. */
const DELAY = 5500;

/** Monogram tint per division, so the avatars in a row don't all look the same. */
const tint: Record<Testimonial["division"], string> = {
  digital: "from-gold to-red text-charcoal",
  technology: "from-sea-shallow to-sea-deep text-ivory",
  products: "from-gold-tint to-gold text-charcoal",
  services: "from-red to-red-deep text-ivory",
};

/** The client's photo when there is one; until then a monogram for their business. */
function Avatar({ t }: { t: Testimonial }) {
  return (
    <span className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full ring-2 ring-gold/50 ring-offset-2 ring-offset-sea-abyss">
      {t.photo ? (
        <Image src={t.photo} alt="" fill sizes="48px" className="object-cover" />
      ) : (
        <span
          aria-hidden
          className={`grid h-full w-full place-items-center bg-linear-to-br font-display text-[0.95rem] font-extrabold tracking-[-0.02em] [text-shadow:none] ${tint[t.division]}`}
        >
          {t.initials}
        </span>
      )}
    </span>
  );
}

const control =
  "grid h-12 w-12 place-items-center rounded-full border border-white/25 text-ivory transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-charcoal";

/**
 * Client words as a carousel: one card on phones, two on tablets, three from lg. Embla does the sliding
 * (drag/swipe, looping) and its Autoplay plugin advances every few seconds; a gold bar under the cards
 * fills toward the next move. Autoplay pauses while the pointer is over it or focus is inside, and the
 * pause button stops it for good (WCAG 2.2.2). With reduced motion it never starts on its own.
 *
 * Scroll: a giant outlined "CLIENT VOICES" drifts sideways behind the section, and the cards rise in
 * one after another the first time they come into view.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const reduced = useReducedMotionSafe();
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["8%", "-28%"]);

  const [autoplay] = useState(() => Autoplay({ delay: DELAY, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true }));
  const [viewportRef, embla] = useEmblaCarousel({ loop: true, align: "start" }, [autoplay]);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState(items.length);
  const [playing, setPlaying] = useState(true);
  /** The visitor pressed pause: hovering/focusing out must not restart it. */
  const [paused, setPaused] = useState(false);
  /** Bumps whenever autoplay (re)starts its timer, so the timer bar restarts with it. */
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    const onReInit = () => {
      setSnaps(embla.scrollSnapList().length);
      onSelect();
    };
    const onPlay = () => setPlaying(true);
    const onStop = () => setPlaying(false);
    const onTimer = () => setCycle((c) => c + 1);
    embla
      .on("select", onSelect)
      .on("reInit", onReInit)
      .on("autoplay:play", onPlay)
      .on("autoplay:stop", onStop)
      .on("autoplay:timerset", onTimer);
    return () => {
      embla
        .off("select", onSelect)
        .off("reInit", onReInit)
        .off("autoplay:play", onPlay)
        .off("autoplay:stop", onStop)
        .off("autoplay:timerset", onTimer);
    };
  }, [embla]);

  // Reduced motion (known only after hydration) or an explicit pause keeps it still — including against
  // the plugin's own resume on mouse-leave / focus-out.
  useEffect(() => {
    const plugin = embla?.plugins().autoplay;
    if (!embla || !plugin) return;
    if (!(reduced || paused)) {
      if (!plugin.isPlaying()) plugin.play();
      return;
    }
    plugin.stop();
    const hold = () => plugin.stop();
    embla.on("autoplay:play", hold);
    return () => {
      embla.off("autoplay:play", hold);
    };
  }, [embla, reduced, paused]);

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);
  const running = playing && !paused && !reduced;

  return (
    <section
      ref={section}
      aria-labelledby="voices-title"
      aria-roledescription="carousel"
      className="relative overflow-x-clip py-16 sm:py-24 lg:py-28"
    >
      {/* Giant outlined words drifting behind the section */}
      <m.p
        aria-hidden
        style={reduced ? undefined : { x: drift }}
        className="text-outline pointer-events-none absolute left-0 top-6 -z-0 whitespace-nowrap font-display text-[clamp(5rem,16vw,15rem)] font-extrabold uppercase leading-none tracking-[-0.05em] opacity-40 sm:top-10"
      >
        Client voices · Client voices
      </m.p>

      <div className="container-x relative">
        <div className="reveal flex flex-col gap-6 pt-[clamp(3rem,10vw,9rem)] sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="t-eyebrow text-gold">Client voices</p>
            <h2 id="voices-title" className="mt-3 max-w-[18ch] font-display text-[clamp(1.9rem,5vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
              One partner. <span className="text-gold">Every next step.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={running ? "Pause automatic sliding" : "Play automatic sliding"}
              className={control}
            >
              {running ? <Pause aria-hidden className="h-4 w-4" /> : <Play aria-hidden className="h-4 w-4" />}
            </button>
            <button type="button" onClick={prev} aria-label="Previous testimonial" className={control}>
              <ArrowLeft aria-hidden className="h-5 w-5" />
            </button>
            <button type="button" onClick={next} aria-label="Next testimonial" className={control}>
              <ArrowRight aria-hidden className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div ref={viewportRef} className="mt-10 overflow-hidden sm:mt-12">
          <m.ul
            className="-ml-4 flex touch-pan-y sm:-ml-6"
            aria-live={running ? "off" : "polite"}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ staggerChildren: 0.12 }}
          >
            {items.map((t, i) => (
              <li
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${items.length}`}
                className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:pl-6 md:basis-1/2 lg:basis-1/3"
              >
                <m.figure
                  variants={{ hidden: { opacity: 0, y: 60, rotate: 1.5 }, shown: { opacity: 1, y: 0, rotate: 0 } }}
                  transition={{ duration: 0.8, ease: ease.out }}
                  className={`flex h-full flex-col rounded-lg border p-6 transition-colors duration-500 sm:p-8 ${
                    i === selected ? "border-gold/60 bg-sea-abyss/90" : "border-white/12 bg-sea-abyss/80"
                  }`}
                >
                  <span className="flex items-start justify-between gap-4">
                    <Quote aria-hidden className="h-8 w-8 fill-gold text-gold" />
                    <span className="rounded-full border border-gold/40 px-3 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-gold">
                      {divisionById[t.division].name}
                    </span>
                  </span>
                  <blockquote className="mt-5 flex-1 text-[1.05rem] leading-relaxed text-ivory/90 sm:text-[1.1rem]">
                    <p>&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-white/12 pt-5">
                    <Avatar t={t} />
                    <span className="min-w-0">
                      <span className="block font-semibold leading-snug text-ivory">{t.role}</span>
                      <span className="mt-0.5 block text-[0.9rem] text-ivory/65">{t.place}</span>
                    </span>
                  </figcaption>
                </m.figure>
              </li>
            ))}
          </m.ul>
        </div>

        <div className="mt-8 flex items-center gap-6">
          <p aria-hidden className="shrink-0 font-mono text-[0.85rem] font-bold text-ivory/70">
            <span className="text-gold">0{selected + 1}</span> / 0{snaps}
          </p>
          {/* Time to the next slide: restarts on every move, freezes while paused */}
          <span aria-hidden className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/15">
            <span
              key={`${selected}-${cycle}`}
              className="absolute inset-0 origin-left bg-linear-to-r from-gold to-red"
              style={{
                animation: `voices-timer ${DELAY}ms linear both`,
                animationPlayState: running ? "running" : "paused",
              }}
            />
          </span>
          <div className="flex shrink-0 gap-1" role="group" aria-label="Choose a testimonial">
            {Array.from({ length: snaps }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => embla?.scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === selected || undefined}
                className="grid h-8 w-6 place-items-center"
              >
                <span className={`block h-2 rounded-full transition-all duration-300 ${i === selected ? "w-5 bg-gold" : "w-2 bg-white/35"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
