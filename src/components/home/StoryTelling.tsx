"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useMotionValueEvent, useScroll } from "motion/react";
import { brand } from "@/content/site";
import businessPhoto from "@/assets/story/business.jpg";
import ecosystemPhoto from "@/assets/story/ecosystem.jpg";
import oneTeamPhoto from "@/assets/story/one-team.jpg";
import growthPhoto from "@/assets/story/growth.jpg";

export type Chapter = {
  lead: string;
  word: string;
  /** Colour of the closing full stop — red and gold alternate. */
  stop: string;
  body: string;
  /** Full-screen photo behind the chapter (Unsplash). */
  image: StaticImageData;
};

const CHAPTERS: Chapter[] = [
  {
    lead: "More than a",
    word: "Business",
    stop: "text-red",
    body: brand.positioning,
    image: businessPhoto,
  },
  {
    lead: "A growing",
    word: "Ecosystem",
    stop: "text-gold",
    body: "Sathya Enterprises operates across digital growth, technology, data, products, infrastructure and business services.",
    image: ecosystemPhoto,
  },
  {
    lead: "Built as",
    word: "One",
    stop: "text-red",
    body: "Every part of the business feeds the next: digital work creates attention, technology turns that attention into systems, and services and products deliver the real-world value customers came for.",
    image: oneTeamPhoto,
  },
  {
    lead: "Made to",
    word: "Grow",
    stop: "text-gold",
    body: "New businesses, new products, new technology and new partnerships — all connected back to the same ecosystem.",
    image: growthPhoto,
  },
];

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

export function StoryTelling({ chapters = CHAPTERS, label = "Our story" }: { chapters?: Chapter[]; label?: string } = {}) {
  const LAST = chapters.length - 1;
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

    // Non-passive wheel/touch listeners make the browser wait on the main thread before every
    // scroll, so they are only attached while the section is on or near the screen.
    let attached = false;
    const attach = (on: boolean) => {
      if (on === attached) return;
      attached = on;
      if (on) {
        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("scroll", onScroll, { passive: true });
      } else {
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("scroll", onScroll);
        engaged = false;
      }
    };
    const io = new IntersectionObserver(([e]) => attach(e.isIntersecting), { rootMargin: "50% 0px" });
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      attach(false);
    };
  }, [LAST]);

  return (
    <section ref={ref} id="story" aria-label={label} className="relative bg-[#141011]" style={{ height: `${(LAST + 1) * 100}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* One photo per chapter, crossfading with it; a dark shade keeps the headline legible */}
        <div aria-hidden className="absolute inset-0">
          {chapters.map((chapter, i) => (
            <div key={chapter.word} className="story-photo absolute inset-0" data-active={i === active}>
              <Image src={chapter.image} alt="" fill sizes="100vw" quality={75} placeholder="blur" className="object-cover" />
            </div>
          ))}
        </div>
        <div aria-hidden className="absolute inset-0 bg-[rgb(16_10_12/0.55)]" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_50%,rgb(16_10_12/0.5),transparent)]" />

        {/* Text sits above the backdrop and swaps chapter by chapter */}
        <div className="absolute inset-0 flex items-center">
          {chapters.map((chapter, i) => (
            <ChapterText key={chapter.word} chapter={chapter} state={textState(i)} />
          ))}
        </div>

        {/* Progress bars: which chapter you're on */}
        <div
          aria-hidden
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 md:bottom-auto md:left-auto md:right-[var(--gutter)] md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:flex-col"
        >
          {chapters.map((c, i) => (
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
