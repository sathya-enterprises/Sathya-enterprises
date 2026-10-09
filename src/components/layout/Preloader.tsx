"use client";

import { useEffect, useState } from "react";
import { brand } from "@/content/site";
import { Shape } from "@/components/home/ShapeField";

/** The four brand shapes that pop in, one after another — the same set that floats behind the hero. */
const SHAPES = [
  { kind: "clover", color: "text-gold" },
  { kind: "circle", color: "text-red" },
  { kind: "square", color: "text-gold" },
  { kind: "hexagon", color: "text-red" },
] as const;

/**
 * How long the preloader stays up, ms from the start of the page load: at least MIN_MS (long enough for
 * the gold line to fill — see .preloader__bar in globals.css), at most MAX_MS even if the page is slow.
 */
const MIN_MS = 1600;
const MAX_MS = 3500;
/** Must match the .preloader--out transition in globals.css. */
const EXIT_MS = 700;

/**
 * Opening curtain on every full page load: the four brand shapes pop in, then the name and a red → gold
 * line, on the same ivory as the page. It is in the server HTML, so it covers the page from the very first paint, and lifts once
 * the page has loaded and MIN_MS has passed (or at MAX_MS, whichever is first). Pure CSS animation —
 * nothing here competes with hydration. Moving between pages inside the site doesn't reload, so it
 * doesn't show again; if scripts never run, a CSS fallback in globals.css removes it anyway.
 */
export function Preloader() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    let timer: number | undefined;
    const lift = () => {
      window.clearTimeout(cap);
      window.removeEventListener("load", lift);
      // performance.now() counts from the start of the page load, so slow hydration counts toward MIN_MS.
      timer = window.setTimeout(() => {
        setPhase("out");
        timer = window.setTimeout(() => {
          setPhase("done");
          // Pages opened from here on enter without waiting for the curtain. Set once this page's
          // (delayed) entrances have finished, so they don't jump.
          timer = window.setTimeout(() => document.documentElement.setAttribute("data-preloaded", ""), 2500);
        }, EXIT_MS);
      }, Math.max(0, MIN_MS - performance.now()));
    };
    const cap = window.setTimeout(lift, Math.max(0, MAX_MS - performance.now()));
    if (document.readyState === "complete") lift();
    else window.addEventListener("load", lift);
    return () => {
      window.clearTimeout(cap);
      window.clearTimeout(timer);
      window.removeEventListener("load", lift);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div role="status" aria-label="Loading Sathya Enterprises" className={`preloader ${phase === "out" ? "preloader--out" : ""}`}>
      <div className="preloader__mark">
        <div aria-hidden className="flex items-center gap-3 md:gap-4">
          {SHAPES.map((s, i) => (
            <span key={s.kind} className={`preloader__shape w-10 md:w-14 ${s.color}`} style={{ "--i": i } as React.CSSProperties}>
              <Shape kind={s.kind} />
            </span>
          ))}
        </div>
        <p className="preloader__name mt-8 font-display text-[clamp(1.6rem,7vw,2.6rem)] font-extrabold uppercase leading-none tracking-[-0.035em] text-ink">
          Sathya <span className="text-red">Enterprises</span>
        </p>
        <p className="preloader__name t-eyebrow mt-3 text-ink-soft" style={{ animationDelay: "0.75s" }}>
          {brand.tagline}
        </p>
        <span aria-hidden className="preloader__bar" />
      </div>
    </div>
  );
}
