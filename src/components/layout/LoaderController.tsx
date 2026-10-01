"use client";

import { useEffect } from "react";

/**
 * Marks the document "ready" once the intro has finished, so later client-side navigations
 * start their entrances immediately instead of waiting for a loader that no longer plays.
 */
export function LoaderController() {
  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("se-ready")) return;
    const ready = () => html.classList.add("se-ready");
    const loader = document.querySelector(".loader");
    let t = window.setTimeout(ready, 4500);
    const onEnd = (e: Event) => {
      if ((e as AnimationEvent).animationName !== "loader-done") return;
      window.clearTimeout(t);
      // Let any entrance still in flight finish before switching timings.
      t = window.setTimeout(ready, 1200);
    };
    loader?.addEventListener("animationend", onEnd);
    return () => {
      loader?.removeEventListener("animationend", onEnd);
      window.clearTimeout(t);
    };
  }, []);
  return null;
}
