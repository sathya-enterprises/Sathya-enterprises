"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

/**
 * Reduced-motion preference that is hydration-safe: the server snapshot (false) is used while
 * hydrating, then React re-renders with the real value. Use this whenever the preference changes
 * *what is rendered*; MotionConfig reducedMotion="user" already covers *how* things animate.
 */
export function useReducedMotionSafe() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
