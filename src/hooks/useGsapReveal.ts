"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade + slide up animation on scroll for a container's direct children.
 * Configured with continuous multi-directional scroll triggers so animations replay every time sections enter viewport.
 */
export function useRevealOnScroll<T extends HTMLElement>(
  stagger = 0.1,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.children,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            end: "bottom top",
            toggleActions: "play reset play reset",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/**
 * Split reveal for two-column layouts (left slides from left, right from right).
 * Re-triggers on repeated scrolling.
 */
export function useSplitReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    const [left, right] = Array.from(ref.current.children);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          end: "bottom top",
          toggleActions: "play reset play reset",
        },
      });

      tl.fromTo(
        left,
        { opacity: 0, x: -36 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      ).fromTo(
        right,
        { opacity: 0, x: 36 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "<0.15"
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Scale-in reveal for stat cards.
 * Re-triggers on repeated scrolling.
 */
export function useScaleReveal<T extends HTMLElement>(stagger = 0.08) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.children,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.65,
          stagger,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            end: "bottom top",
            toggleActions: "play reset play reset",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
