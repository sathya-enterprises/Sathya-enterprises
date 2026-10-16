"use client";

import { Children, useEffect, useRef, useState } from "react";
import { m, useInView } from "motion/react";
import { ease } from "@/lib/motion";
import { cardShell, LIT, mod, useEntrance, useTabVisible } from "./CardWheel";

/**
 * Cards in a deck: they are dealt onto the pile when the section arrives, then the top card (lit:
 * deep red, ringed in gold) is slid out to the side and tucked under the pile on its own, bringing
 * the next one up. Pointing at the deck holds it; a click or tap deals the next card.
 */

const INTERVAL_MS = 3200;
/** How far each card under the top one sits lower, and how many show. */
const STEP = 16;
const SHOWN = 3;

export function CardDeck({ children, label, className = "" }: { children: React.ReactNode; label: string; className?: string }) {
  const items = Children.toArray(children);
  const n = items.length;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const entrance = useEntrance(inView, 1500);
  const tabVisible = useTabVisible();
  const [top, setTop] = useState(0);
  const [held, setHeld] = useState(false);

  // The top card before the last deal, to send it round the side as it goes under.
  const [placed, setPlaced] = useState({ top: 0, prev: -1 });
  if (placed.top !== top) setPlaced({ top, prev: mod(placed.top, n) });

  const playing = inView && !held && tabVisible && entrance === "done";
  useEffect(() => {
    if (!playing || n < 2) return;
    const id = window.setTimeout(() => setTop((t) => t + 1), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [playing, top, n]);

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
      }}
      onClick={() => setTop((t) => t + 1)}
      className={`relative h-[17rem] w-full cursor-pointer md:h-[16rem] ${className}`}
      style={{ marginBottom: STEP * SHOWN }}
    >
      {items.map((item, i) => {
        const depth = mod(i - top, n);
        const isTop = depth === 0;
        const tucked = i === placed.prev && depth === n - 1;
        const tilt = i % 2 ? 2.5 : -2.5;
        const rest = {
          y: Math.min(depth, SHOWN) * STEP,
          scale: 1 - Math.min(depth, SHOWN) * 0.05,
          rotate: isTop ? 0 : tilt,
          opacity: depth > SHOWN ? 0 : 1,
        };
        return (
          <m.div
            key={i}
            initial={false}
            animate={
              entrance === "out"
                ? { x: 0, y: -160, rotate: tilt * 4, scale: 0.9, opacity: 0, zIndex: 50 - depth }
                : tucked
                  ? // Out to the side above the pile, then under it.
                    { ...rest, x: [0, 300, 0], rotate: [0, 9, tilt], zIndex: [60, 60, 50 - depth] }
                  : { ...rest, x: 0, zIndex: 50 - depth }
            }
            transition={
              entrance === "out"
                ? { duration: 0.3 }
                : entrance === "in"
                  ? { duration: 0.8, ease: ease.out, delay: 0.1 + (n - 1 - depth) * 0.12 }
                  : tucked
                    ? { duration: 0.9, ease: ease.inOut, times: [0, 0.5, 1] }
                    : { duration: 0.6, ease: ease.out }
            }
            aria-hidden={!isTop}
            className={`wheel-card absolute inset-x-0 top-0 h-full ${cardShell} ${isTop ? "outline-gold" : "outline-transparent"}`}
            style={{ transformOrigin: "50% 0%", ...(isTop ? LIT : null) }}
          >
            <div inert={!isTop} className="relative h-full overflow-hidden p-6">
              {item}
            </div>
          </m.div>
        );
      })}
    </div>
  );
}
