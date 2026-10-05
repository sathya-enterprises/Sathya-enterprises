"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

/**
 * A number that counts up from zero the first time it scrolls into view. The final value is in the
 * server HTML (crawlers and no-JS see it); the count only starts once hydrated, in view and motion-safe.
 */
export function CountUp({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {to}
    </span>
  );
}
