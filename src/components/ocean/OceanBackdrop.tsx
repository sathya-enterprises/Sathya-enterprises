"use client";

import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { Whale } from "./Whale";

/** Scroll distance (px) over which the whale settles back into the deep. */
const SETTLE = 1000;

/**
 * Every page sits in calm water: a fixed, decorative sea behind all content — a depth gradient with
 * soft light from the surface, a real humpback (see Whale.tsx) and darker edges.
 *
 * Over the first screenful of scrolling the whale drifts up and back into the blue (rises, grows a
 * touch, dims), so it owns the first view and stays out of the way of the content below. Between
 * scrolls it floats very slowly (CSS). Transform and opacity only, on one composited layer.
 * Reduced motion: it simply stays put.
 */
export function OceanBackdrop() {
  const reduced = useReducedMotionSafe();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, SETTLE], ["0%", "-8%"]);
  const scale = useTransform(scrollY, [0, SETTLE], [1, 1.06]);
  const opacity = useTransform(scrollY, [0, SETTLE], [1, 0.4]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[linear-gradient(to_bottom,var(--color-sea-shallow),var(--color-sea)_45%,var(--color-sea-deep))]"
    >
      <m.div style={reduced ? undefined : { y, scale, opacity }} className="absolute inset-0 origin-right will-change-transform">
        <div className="whale-float absolute inset-x-0 -inset-y-[3%]">
          <Whale />
        </div>
      </m.div>

      {/* Soft light from the surface */}
      <div className="absolute inset-x-0 top-0 h-[70svh] bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,rgb(170_220_238/0.16),transparent_70%)]" />

      {/* The edges of the sea fall away into the dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_40%,transparent_55%,rgb(3_14_22/0.5)_100%)]" />
    </div>
  );
}
