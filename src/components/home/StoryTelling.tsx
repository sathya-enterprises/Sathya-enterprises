"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useMotionValueEvent, useScroll } from "motion/react";
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

/**
 * One full-screen scene. Scenes sit stacked like slides; changing chapter slides them up one
 * screen at a time. Inside each scene the layers lag behind by different amounts (back 35%,
 * middle 20%, front 14%), which is what gives the depth, and the scene on screen slowly pushes in.
 *
 * Everything moves with CSS transitions on transform (see .story-slide in globals.css), so the
 * compositor runs the whole glide and nothing on the main thread can make it stutter.
 */
function Scene({ index, active, zoomed, chapter }: { index: number; active: number; zoomed: boolean; chapter: Chapter }) {
  // Where this scene sits: 0 = on screen, 1 = one screen below, -1 = above.
  const d = Math.max(-1, Math.min(1, index - active));

  return (
    <div className="story-slide absolute inset-0" style={{ "--d": d } as React.CSSProperties}>
      <div className="story-zoom absolute inset-0 overflow-hidden bg-charcoal" data-active={zoomed}>
        {/* Back: photograph */}
        <div className="story-layer absolute inset-0" style={{ "--depth": "35svh" } as React.CSSProperties}>
          <Image src={chapter.photo} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />
        </div>

        {/* Middle: shade for legibility */}
        <div className="story-layer absolute inset-0" style={{ "--depth": "20svh" } as React.CSSProperties}>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/55 to-charcoal/90" />
        </div>

        {/* Front: brand shapes rising from the bottom edge */}
        <div aria-hidden className="story-layer absolute inset-0" style={{ "--depth": "14svh" } as React.CSSProperties}>
          {chapter.shapes.map((s) => (
            <div key={s.kind + s.place} className={`absolute ${s.place} ${s.color}`}>
              <Shape kind={s.kind} />
            </div>
          ))}
        </div>
      </div>
    </div>
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

/**
 * After a chapter change, new wheel turns are ignored for this long (the gesture that caused it
 * is absorbed for as long as it lasts). Shorter than the 1.6s glide: a turn mid-glide simply
 * retargets it, which CSS transitions do smoothly.
 */
const LOCK_MS = 900;
/** Gaps shorter than this between wheel events mean the same gesture is still going. */
const GESTURE_GAP_MS = 250;

export function StoryTelling() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // One screen of scroll per chapter; the nearest chapter is the active one. The scenes then glide
  // to it on their own clock (1.6s) like a slider, so uneven wheel steps never jolt them.
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.round(Math.min(1, Math.max(0, v)) * LAST);
    activeRef.current = next;
    setActive(next);
  });

  // Whether the section is on screen (it covers the middle of the screen), or still to come / already
  // passed. Until it arrives, the chapter it will open on stays parked off screen, so the first
  // chapter animates in on arrival just like the others — and replays each time you come back.
  const { scrollYProgress: arrival } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const [phase, setPhase] = useState<"before" | "on" | "after">("before");
  const toPhase = (v: number) => (v <= 0 ? "before" : v >= 1 ? "after" : "on");
  useMotionValueEvent(arrival, "change", (v) => setPhase(toPhase(v)));
  // Also read it once after the first frame, for a page that loads already scrolled into the section.
  useEffect(() => {
    const id = requestAnimationFrame(() => setPhase(toPhase(arrival.get())));
    return () => cancelAnimationFrame(id);
  }, [arrival]);
  const shown = phase === "on" ? active : -1;
  const textState = (i: number): TextState =>
    i === shown ? "active" : i === active ? (phase === "before" ? "future" : "past") : i < active ? "past" : "future";

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
      const vh = window.innerHeight;
      return {
        pinned: r.top <= 1 && r.bottom >= vh - 1,
        // At least half the screen is the section, coming in from below / from above.
        enteringDown: r.top > 1 && r.top < vh / 2,
        enteringUp: r.bottom < vh - 1 && r.bottom > vh / 2,
        top: window.scrollY + r.top,
        at: -r.top / vh,
      };
    };
    const goTo = (i: number, top: number, behavior: ScrollBehavior = "instant") => {
      window.scrollTo({ top: top + i * window.innerHeight, behavior });
      lockUntil = performance.now() + LOCK_MS;
    };
    /** Returns true when the gesture was used here (caller should cancel the native scroll). */
    const step = (dir: number) => {
      const now = performance.now();
      // Events closer together than GESTURE_GAP_MS are one gesture (a trackpad flick and its momentum).
      const continuing = now - lastEvent < GESTURE_GAP_MS;
      lastEvent = now;
      const g = geometry();
      if (!g) return false;
      if (now < lockUntil) {
        // A page just turned. Absorb the rest of that gesture — extending the lock for as long as
        // it keeps coming, so trackpad momentum never turns a second page.
        if (continuing) lockUntil = Math.max(lockUntil, now + GESTURE_GAP_MS);
        return true;
      }
      if (!g.pinned) {
        engaged = false;
        // Once the section has scrolled halfway on, one wheel turn carries it the rest of the way
        // (first chapter going down, last going up), instead of the wheel pushing it there.
        if (dir > 0 && g.enteringDown) {
          goTo(0, g.top, "smooth");
          return true;
        }
        if (dir < 0 && g.enteringUp) {
          goTo(LAST, g.top, "smooth");
          return true;
        }
        return false;
      }
      if (!engaged) {
        engaged = true;
        // Just arrived with plain scrolling. If that gesture is still going (momentum), settle on
        // the chapter we came in on rather than skipping ahead. A fresh turn falls through and turns
        // the page straight away — the stage already shows a whole chapter, so it is never spent
        // just lining the page up.
        if (continuing) {
          goTo(Math.min(LAST, Math.max(0, dir > 0 ? Math.floor(g.at) : Math.ceil(g.at))), g.top);
          return true;
        }
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
          <Scene key={chapter.word} index={i} active={active} zoomed={i === shown} chapter={chapter} />
        ))}

        {/* Text sits above the scenes and swaps chapter by chapter */}
        <div className="absolute inset-0 flex items-center">
          {CHAPTERS.map((chapter, i) => (
            <ChapterText key={chapter.word} chapter={chapter} state={textState(i)} />
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
