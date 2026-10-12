"use client";

import { useEffect, useState } from "react";
import { useInView } from "motion/react";

type Margin = NonNullable<NonNullable<Parameters<typeof useInView>[1]>["margin"]>;

/**
 * True once a section has scrolled well onto the screen (by default its top is above the lower
 * third), and false again only once it is completely off screen in either direction — so entrances
 * replay on every arrival, but nothing resets while any of it is still visible. Pair it with
 * `data-arrived` and the .rise / .rise-letter / .rise-shape classes in globals.css.
 */
export function useArrival(ref: React.RefObject<Element | null>, enterMargin: Margin = "0px 0px -33% 0px") {
  const entered = useInView(ref, { margin: enterMargin });
  const visible = useInView(ref);
  const [arrived, setArrived] = useState(false);
  useEffect(() => {
    // Between the two (partly visible, not yet far enough in) the current state is kept.
    const next = entered ? true : visible ? null : false;
    if (next === null) return;
    const id = requestAnimationFrame(() => setArrived(next));
    return () => cancelAnimationFrame(id);
  }, [entered, visible]);
  return arrived;
}
