"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { animate, m, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { ease } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { brand } from "@/content/site";
import { Shape } from "./ShapeField";
import meetingPhoto from "@/assets/photos/meeting.jpg";
import technologyPhoto from "@/assets/photos/technology.jpg";
import teamPhoto from "@/assets/photos/team.jpg";

type ShapeKind = "clover" | "circle" | "square" | "hexagon";

type Chapter = {
  lead: string;
  word: string;
  /** Colour of the closing full stop — red and gold alternate. */
  stop: string;
  body: string;
  photo: StaticImageData;
  /** Foreground shapes: the closest layer, so they travel the furthest. */
  shapes: { kind: ShapeKind; color: string; place: string }[];
};

const CHAPTERS: Chapter[] = [
  {
    lead: "More than a",
    word: "Business",
    stop: "text-red",
    body: brand.positioning,
    photo: meetingPhoto,
    shapes: [
      { kind: "clover", color: "text-gold", place: "-right-[14%] bottom-[-12%] w-[58vw] md:w-[30vw]" },
      { kind: "circle", color: "text-red", place: "-left-[10%] bottom-[-8%] w-[34vw] md:w-[16vw]" },
    ],
  },
  {
    lead: "A growing",
    word: "Ecosystem",
    stop: "text-gold",
    body: "Sathya Enterprises operates across digital growth, technology, data, products, infrastructure and business services.",
    photo: technologyPhoto,
    shapes: [
      { kind: "hexagon", color: "text-red", place: "-left-[16%] bottom-[-14%] w-[56vw] md:w-[28vw]" },
      { kind: "square", color: "text-gold", place: "-right-[8%] bottom-[-6%] w-[30vw] md:w-[15vw]" },
    ],
  },
  {
    lead: "Built as",
    word: "One",
    stop: "text-red",
    body: "Every part of the business feeds the next: digital work creates attention, technology turns that attention into systems, and services and products deliver the real-world value customers came for.",
    photo: teamPhoto,
    shapes: [
      { kind: "circle", color: "text-gold", place: "-left-[12%] bottom-[-16%] w-[60vw] md:w-[30vw]" },
      { kind: "clover", color: "text-red", place: "-right-[10%] bottom-[-8%] w-[32vw] md:w-[16vw]" },
    ],
  },
];

const LAST = CHAPTERS.length - 1;
const clamp = (v: number) => Math.max(-1, Math.min(1, v));

/**
 * One full-screen scene. Scenes sit stacked like slides; scrolling slides them up one screen at a
 * time. Inside each scene the layers lag behind by different amounts (back 35%, middle 20%,
 * front 14%), which is what gives the depth.
 */
function Scene({ index, t, chapter }: { index: number; t: MotionValue<number>; chapter: Chapter }) {
  // d: where this scene sits relative to the screen. 0 = on screen, 1 = one screen below, -1 = above.
  const d = useTransform(t, (v) => clamp(index - v));
  const y = useTransform(d, (v) => `${v * 100}%`);
  const backY = useTransform(d, (v) => `${-v * 35}svh`);
  const midY = useTransform(d, (v) => `${-v * 20}svh`);
  const frontY = useTransform(d, (v) => `${-v * 14}svh`);
  // The scene on screen is pushed in slightly; it settles back as it leaves.
  const zoom = useTransform(d, (v) => 1.12 - 0.12 * Math.abs(v));

  return (
    <m.div style={{ y }} className="absolute inset-0 overflow-hidden bg-charcoal">
      {/* Back: photograph */}
      <m.div style={{ y: backY, scale: zoom }} className="absolute inset-x-0 -inset-y-[36svh]">
        <Image src={chapter.photo} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />
      </m.div>

      {/* Middle: shade for legibility */}
      <m.div style={{ y: midY }} className="absolute inset-x-0 -inset-y-[22svh]">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/55 to-charcoal/90" />
      </m.div>

      {/* Front: brand shapes rising from the bottom edge */}
      <m.div style={{ y: frontY }} aria-hidden className="absolute inset-x-0 -inset-y-[16svh]">
        {chapter.shapes.map((s) => (
          <div key={s.kind + s.place} className={`absolute ${s.place} ${s.color}`}>
            <Shape kind={s.kind} />
          </div>
        ))}
      </m.div>
    </m.div>
  );
}

type TextState = "past" | "active" | "future";

/**
 * Headline + copy for one chapter. Letters drop in one after another, each a little slower than the
 * last (a wave), and leave upwards when the next chapter arrives — in either scroll direction.
 */
function ChapterText({ chapter, state }: { chapter: Chapter; state: TextState }) {
  const shift = state === "active" ? "0" : state === "past" ? "-1" : "1";
  const letters = [...chapter.word.toUpperCase()];

  return (
    <div
      aria-hidden={state !== "active"}
      className="story-text absolute inset-x-0 mx-auto max-w-5xl px-[var(--gutter)] text-center"
      data-state={state}
      style={{ "--shift": shift, "--show": state === "active" ? 1 : 0 } as React.CSSProperties}
    >
      <p className="story-lead t-h3 uppercase text-gold">{chapter.lead}</p>

      <h2 className="mt-3 font-display text-[clamp(2.75rem,13vw,11rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-ivory md:mt-4">
        <span className="sr-only">
          {chapter.lead} {chapter.word}.
        </span>
        <span aria-hidden className="inline-flex">
          {letters.map((letter, i) => (
            <span key={i} className="story-letter" style={{ "--n": i } as React.CSSProperties}>
              {letter}
            </span>
          ))}
          <span className={`story-letter ${chapter.stop}`} style={{ "--n": letters.length } as React.CSSProperties}>
            .
          </span>
        </span>
      </h2>

      <p className="story-body t-lead mx-auto mt-6 max-w-xl text-ivory/85 md:mt-8">{chapter.body}</p>
    </div>
  );
}

/** Wheel/swipe gestures arriving within this time of a chapter change are absorbed (trackpad momentum). */
const LOCK_MS = 1100;
/** Gaps shorter than this between wheel events mean the same gesture is still going. */
const GESTURE_GAP_MS = 250;

export function StoryTelling() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // One screen of scroll per chapter; the nearest chapter is the active one. The scenes then glide
  // to it on their own clock — 1.6s, eased — like a slider, so uneven wheel steps never jolt them.
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.round(Math.min(1, Math.max(0, v)) * LAST);
    activeRef.current = next;
    setActive(next);
  });
  const reduced = useReducedMotionSafe();
  const t = useMotionValue(0);
  useEffect(() => {
    const run = animate(t, active, { duration: reduced ? 0 : 1.6, ease: ease.inOut });
    return () => run.stop();
  }, [active, reduced, t]);

  // While the stage is pinned, one wheel flick or swipe = one chapter (like a vertical slider).
  // The page is moved straight to that chapter's scroll position, so the scroll position, the
  // scrollbar and keyboard scrolling all stay in step. Past the first/last chapter, gestures
  // fall through to normal page scrolling.
  useEffect(() => {
    let lockUntil = 0;
    let lastEvent = 0;
    let engaged = false;
    let touchY: number | null = null;
    let touchDone = false;

    const geometry = () => {
      const el = ref.current;
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const pinned = r.top <= 1 && r.bottom >= window.innerHeight - 1;
      return { pinned, top: window.scrollY + r.top, at: -r.top / window.innerHeight };
    };
    const goTo = (i: number, top: number) => {
      window.scrollTo({ top: top + i * window.innerHeight, behavior: "instant" });
      lockUntil = performance.now() + LOCK_MS;
    };
    /** Returns true when the gesture was used here (caller should cancel the native scroll). */
    const step = (dir: number) => {
      const now = performance.now();
      // Events closer together than GESTURE_GAP_MS are one gesture (a trackpad flick and its momentum).
      const continuing = now - lastEvent < GESTURE_GAP_MS;
      lastEvent = now;
      const g = geometry();
      if (!g?.pinned) {
        engaged = false;
        return false;
      }
      if (!engaged) {
        // Just arrived. If the gesture that brought us here is still going (momentum), or we're not
        // resting on a chapter, settle on the chapter we came in on — the first one going down, the
        // last one going up — rather than skipping ahead. A fresh gesture while resting turns the page.
        engaged = true;
        const settle = Math.min(LAST, Math.max(0, dir > 0 ? Math.floor(g.at) : Math.ceil(g.at)));
        if (continuing || Math.abs(g.at - settle) > 0.02) {
          goTo(settle, g.top);
          return true;
        }
      }
      if (now < lockUntil) {
        // Keep absorbing for as long as the gesture keeps coming, so momentum never turns a second page.
        lockUntil = Math.max(lockUntil, now + GESTURE_GAP_MS);
        return true;
      }
      const next = activeRef.current + dir;
      if (next < 0 || next > LAST) return false;
      goTo(next, g.top);
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX) || e.ctrlKey) return;
      if (step(Math.sign(e.deltaY))) e.preventDefault();
    };
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
      touchDone = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null) return;
      if (touchDone) {
        e.preventDefault();
        return;
      }
      const dy = touchY - e.touches[0].clientY;
      if (Math.abs(dy) < 30) {
        if (geometry()?.pinned && engaged) e.preventDefault();
        return;
      }
      if (step(Math.sign(dy))) {
        touchDone = true;
        e.preventDefault();
      } else {
        touchY = null; // leaving the section: let this swipe scroll the page
      }
    };
    const onScroll = () => {
      if (!geometry()?.pinned) engaged = false;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={ref} aria-label="Our story" className="relative bg-charcoal" style={{ height: `${(LAST + 1) * 100}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        {CHAPTERS.map((chapter, i) => (
          <Scene key={chapter.word} index={i} t={t} chapter={chapter} />
        ))}

        {/* Text sits above the scenes and swaps chapter by chapter */}
        <div className="absolute inset-0 flex items-center">
          {CHAPTERS.map((chapter, i) => (
            <ChapterText key={chapter.word} chapter={chapter} state={i === active ? "active" : i < active ? "past" : "future"} />
          ))}
        </div>

        {/* Progress bars: which chapter you're on */}
        <div
          aria-hidden
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 md:bottom-auto md:left-auto md:right-[var(--gutter)] md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:flex-col"
        >
          {CHAPTERS.map((c, i) => (
            <span
              key={c.word}
              className={`block rounded-full transition-all duration-500 ${
                i === active ? "h-1 w-8 bg-red md:h-8 md:w-1" : "h-1 w-4 bg-ivory/35 md:h-4 md:w-1"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
