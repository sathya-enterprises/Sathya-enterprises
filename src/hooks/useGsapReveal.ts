"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade + slide up animation on scroll for a container's direct children
 */
export function useRevealOnScroll<T extends HTMLElement>(
  stagger = 0.1,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current!.children, {
        opacity: 0,
        y: 32,
        duration: 0.75,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/**
 * Split reveal for two-column layouts (left slides from left, right from right)
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
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.from(left, { opacity: 0, x: -36, duration: 0.8, ease: "power3.out" })
        .from(right, { opacity: 0, x: 36, duration: 0.8, ease: "power3.out" }, "<0.15");
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Scale-in reveal for stat cards
 */
export function useScaleReveal<T extends HTMLElement>(stagger = 0.08) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current!.children, {
        opacity: 0,
        scale: 0.92,
        duration: 0.65,
        stagger,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
