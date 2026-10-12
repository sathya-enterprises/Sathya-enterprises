"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { brand } from "@/content/site";
import logo from "../../../public/logo-512.png";

/** Splash thrown up as the badge breaks the surface: outward reach, peak height (px), delay (s). */
const DROPS = [
  { dx: -46, dy: -70, size: 9, delay: 0 },
  { dx: -24, dy: -96, size: 6, delay: 0.04 },
  { dx: -10, dy: -60, size: 7, delay: 0.08 },
  { dx: 12, dy: -88, size: 7, delay: 0.02 },
  { dx: 30, dy: -64, size: 9, delay: 0.06 },
  { dx: 50, dy: -100, size: 6, delay: 0.1 },
  { dx: -62, dy: -36, size: 5, delay: 0.12 },
  { dx: 64, dy: -40, size: 5, delay: 0.14 },
];

/** One wave crest repeated across twice the stage width, so it can drift by half its width. */
const WATER = "M0 12 Q 25 2 50 12 T 100 12 T 150 12 T 200 12 T 250 12 T 300 12 T 350 12 T 400 12 V 40 H 0 Z";

/**
 * How long the preloader stays up, ms from the page's first paint (when its animation starts): at
 * least MIN_MS, long enough for the breach and the gold line to play out (see .preloader__* in
 * globals.css), at most MAX_MS even if the page is slow.
 */
const MIN_MS = 2200;
const MAX_MS = 4000;
/** Must match the .preloader--out transition in globals.css. */
const EXIT_MS = 700;

/** When the page first painted, ms since navigation start — the preloader's animation clock starts here. */
function firstPaint() {
  return performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0;
}

/**
 * Opening curtain on every full page load. The logo badge — the Sathya Enterprises humpback —
 * breaches up out of a strip of water, throwing a splash and ripples, settles and floats; then the
 * name, tagline and a red → gold line rise in, on the same ivory as the page. It is in the server
 * HTML, so it covers the page from the very first paint, and lifts once the page has loaded and
 * MIN_MS has passed since that paint (or at MAX_MS, whichever is first). Pure CSS animation — nothing
 * here competes with hydration. Moving between pages inside the site doesn't reload, so it doesn't
 * show again; if scripts never run, a CSS fallback in globals.css removes it anyway.
 */
export function Preloader() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    let timer: number | undefined;
    const since = () => performance.now() - firstPaint();
    const lift = () => {
      window.clearTimeout(cap);
      window.removeEventListener("load", lift);
      timer = window.setTimeout(() => {
        setPhase("out");
        timer = window.setTimeout(() => {
          setPhase("done");
          // Pages opened from here on enter without waiting for the curtain. Set once this page's
          // (delayed) entrances have finished, so they don't jump.
          timer = window.setTimeout(() => document.documentElement.setAttribute("data-preloaded", ""), 2500);
        }, EXIT_MS);
      }, Math.max(0, MIN_MS - since()));
    };
    const cap = window.setTimeout(lift, Math.max(0, MAX_MS - since()));
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
        {/* The breach: the badge rises out of the water (clipped at the surface), then floats. */}
        <div aria-hidden className="preloader__stage relative">
          <div className="preloader__surface absolute inset-x-0 top-0 bottom-[12%]">
            <div className="preloader__badge absolute inset-x-[6%] bottom-0 aspect-square">
              <Image src={logo} alt="" fill priority sizes="(min-width: 768px) 15rem, 56vw" className="object-contain" />
            </div>
          </div>

          {/* Ripples spreading from where it broke the surface */}
          <span className="preloader__ripple" />
          <span className="preloader__ripple" style={{ animationDelay: "0.9s" }} />

          {/* The water: two drifting wave bands, the front one over the badge's lower edge */}
          <div className="preloader__water absolute -inset-x-[12%] bottom-0 h-[18%] overflow-hidden">
            <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="preloader__wave preloader__wave--back absolute inset-y-0 left-0 h-full w-[200%]">
              <path d={WATER} fill="var(--color-whale-belly)" fillOpacity="0.55" />
            </svg>
            <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="preloader__wave absolute inset-y-0 left-0 top-[22%] h-full w-[200%]">
              <path d={WATER} fill="var(--color-sea-shallow)" fillOpacity="0.85" />
            </svg>
          </div>

          {/* Splash */}
          {DROPS.map((d) => (
            <span
              key={d.dx}
              className="preloader__drop"
              style={
                {
                  // Thrown off the badge's sides where it cuts the surface, never across its face.
                  left: `calc(50% ${d.dx < 0 ? "-" : "+"} 36%)`,
                  width: d.size,
                  height: d.size,
                  "--dx": `${d.dx}px`,
                  "--dy": `${d.dy}px`,
                  animationDelay: `${0.62 + d.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <p className="preloader__name mt-6 font-display text-[clamp(1.6rem,7vw,2.6rem)] font-extrabold uppercase leading-none tracking-[-0.035em] text-ink">
          Sathya <span className="text-red">Enterprises</span>
        </p>
        <p className="preloader__name t-eyebrow mt-3 text-ink-soft" style={{ animationDelay: "1.15s" }}>
          {brand.tagline}
        </p>
        <span aria-hidden className="preloader__bar" />
      </div>
    </div>
  );
}
