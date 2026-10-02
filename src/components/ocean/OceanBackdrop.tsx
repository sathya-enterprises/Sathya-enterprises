"use client";

import { useRef, useState } from "react";
import {
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import * as m from "motion/react-m";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { Whale } from "./Whale";
import { FishSchool, Jellyfish } from "./SeaLife";
import { CAST, boxVw, createSwimmer, type CastName } from "./swim";

const BUBBLES = [
  { left: "8%", size: 8, dur: 9, delay: 0 },
  { left: "17%", size: 5, dur: 7, delay: 2.5 },
  { left: "29%", size: 10, dur: 11, delay: 1 },
  { left: "44%", size: 6, dur: 8, delay: 4 },
  { left: "58%", size: 9, dur: 10, delay: 0.5 },
  { left: "71%", size: 5, dur: 7.5, delay: 3 },
  { left: "83%", size: 12, dur: 12, delay: 1.8 },
  { left: "93%", size: 6, dur: 9, delay: 5 },
];

const NAMES = Object.keys(CAST) as CastName[];

/** Turns a creature to face the way it is actually travelling (all art is drawn facing right). */
function Facing({ facing, children }: { facing: 1 | -1; children: React.ReactNode }) {
  return (
    <m.div animate={{ scaleX: facing }} transition={{ duration: 0.45, ease: [0.65, 0.05, 0.36, 1] }}>
      {children}
    </m.div>
  );
}

type CreatureMotion = { x: MotionValue<string>; y: MotionValue<string>; rotate: MotionValue<number> };

function useCreatureMotion(name: CastName): CreatureMotion {
  const c = CAST[name];
  return {
    x: useMotionValue(`${c.x}vw`),
    y: useMotionValue(`${c.depth.y[0]}svh`),
    rotate: useMotionValue(0),
  };
}

/**
 * Every page is a dive, underwater from the first pixel. A fixed, decorative sea sits behind all
 * content: scrolling carries the water itself upward (a tall shallow → abyss gradient) while light
 * rays fade overhead and the seabed rises behind the footer.
 *
 * Creatures swim on their own, get pushed by scrolling, float up and down and pitch to follow their
 * path (see swim.ts). All drawn as lightweight SVG.
 */
export function OceanBackdrop() {
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll();
  // Reduced motion: hold one calm frame.
  const still = useMotionValue(0.3);
  const p: MotionValue<number> = reduced ? still : scrollYProgress;

  // Last scroll direction — creatures cruise that way.
  const dirRef = useRef<1 | -1>(1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const d = v - (scrollYProgress.getPrevious() ?? v);
    if (d > 0.0003) dirRef.current = 1;
    else if (d < -0.0003) dirRef.current = -1;
  });

  // One simulation per creature, stepped in a single frame loop.
  const swimmers = useRef<Record<CastName, ReturnType<typeof createSwimmer>> | null>(null);
  const motion: Record<CastName, CreatureMotion> = {
    whale: useCreatureMotion("whale"),
    calf: useCreatureMotion("calf"),
    far: useCreatureMotion("far"),
    gold: useCreatureMotion("gold"),
    red: useCreatureMotion("red"),
  };
  const [facing, setFacing] = useState(() => Object.fromEntries(NAMES.map((n) => [n, CAST[n].heading])) as Record<CastName, 1 | -1>);
  const facingRef = useRef(facing);
  const lastP = useRef<number | null>(null);

  useAnimationFrame((time, delta) => {
    if (reduced) return;
    swimmers.current ??= Object.fromEntries(NAMES.map((n) => [n, createSwimmer(CAST[n])])) as Record<CastName, ReturnType<typeof createSwimmer>>;
    const dt = Math.min(delta, 64) / 1000;
    const progress = scrollYProgress.get();
    const dp = lastP.current === null ? 0 : progress - lastP.current;
    lastP.current = progress;
    const width = window.innerWidth;
    const aspect = width / window.innerHeight;
    let flipped = false;
    for (const n of NAMES) {
      const s = swimmers.current[n].step(time / 1000, dt, progress, dp, dirRef.current, aspect, boxVw(n, width));
      motion[n].x.set(`${s.x}vw`);
      motion[n].y.set(`${s.y}svh`);
      motion[n].rotate.set(s.pitch * s.facing);
      if (s.facing !== facingRef.current[n]) flipped = true;
    }
    if (flipped) {
      const next = Object.fromEntries(NAMES.map((n) => [n, swimmers.current![n].state.facing])) as Record<CastName, 1 | -1>;
      facingRef.current = next;
      setFacing(next);
    }
  });

  // The water column: 260svh tall, scrolled up 160svh over the page — the sea going up.
  const waterY = useTransform(p, [0, 1], ["0svh", "-160svh"]);
  const rays = useTransform(p, [0, 0.45], [0.6, 0]);
  const raysY = useTransform(p, [0, 0.45], ["0svh", "-20svh"]);
  const jellyAY = useTransform(p, [0.1, 0.65], ["110svh", "-40svh"]);
  const jellyBY = useTransform(p, [0.4, 1], ["110svh", "-20svh"]);
  const snowY = useTransform(p, [0, 1], ["0svh", "-120svh"]);
  const metersText = useTransform(p, (v) => `${Math.round(Math.min(Math.max(v, 0), 1) * 3200)} m`);
  const bedY = useTransform(p, [0.8, 1], ["100%", "0%"]);

  const creature = (n: CastName, className: string, children: React.ReactNode) => (
    <m.div
      style={{ x: motion[n].x, y: motion[n].y, rotate: motion[n].rotate }}
      className={`absolute left-0 top-0 will-change-transform ${className}`}
    >
      <Facing facing={facing[n]}>{children}</Facing>
    </m.div>
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-sea-abyss">
      {/* The water column */}
      <m.div
        style={{ y: waterY }}
        className="absolute inset-x-0 top-0 h-[260svh] bg-[linear-gradient(to_bottom,var(--color-sea-shallow)_0%,var(--color-sea)_22%,var(--color-sea-deep)_55%,var(--color-sea-abyss)_100%)] will-change-transform"
      />

      {/* Light rays from the surface */}
      <m.div style={{ opacity: rays, y: raysY }} className="absolute inset-0">
        {[10, 32, 56, 78].map((left, i) => (
          <span
            key={left}
            className="absolute -top-10 h-[85svh] w-14 origin-top -skew-x-12 bg-linear-to-b from-white/45 to-transparent sm:w-24"
            style={{ left: `${left}%`, opacity: 0.45 + (i % 2) * 0.25 }}
          />
        ))}
      </m.div>

      {/* Marine snow: a slow, far layer drifting up past you */}
      <m.div
        style={{
          y: snowY,
          backgroundImage: "radial-gradient(rgb(255 253 248 / 0.45) 1px, transparent 1.6px)",
          backgroundSize: "86px 112px",
        }}
        className="absolute inset-x-0 top-0 h-[260svh]"
      />

      {/* Creatures */}
      {creature("far", "w-[30vw] max-w-[180px] opacity-40", <FishSchool color="var(--color-whale-belly)" className="w-full" />)}

      <m.div style={{ y: jellyAY }} className="absolute left-[8%] top-0 w-14 sm:w-20">
        <Jellyfish className="w-full" />
      </m.div>
      <m.div style={{ y: jellyBY }} className="absolute right-[10%] top-0 w-10 sm:w-16">
        <Jellyfish className="w-full" delay={1.2} />
      </m.div>

      {creature("calf", "w-[38vw] max-w-[260px] sm:w-[22vw]", <Whale className="w-full opacity-90" />)}
      {creature("whale", "w-[72vw] max-w-[540px] sm:w-[44vw] lg:w-[36vw]", <Whale className="w-full" />)}
      {creature("gold", "w-[44vw] max-w-[300px]", <FishSchool color="var(--color-gold)" className="w-full" />)}
      {creature("red", "w-[40vw] max-w-[260px]", <FishSchool color="var(--color-red)" className="w-full" />)}

      {/* Bubbles */}
      <div className="absolute inset-0">
        {BUBBLES.map((b) => (
          <span
            key={b.left}
            className="bubble absolute -bottom-4 rounded-full border border-white/50 bg-white/10"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              ["--b-dur" as string]: `${b.dur}s`,
              ["--b-delay" as string]: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Depth gauge */}
      <div className="absolute bottom-6 right-3 flex items-end gap-2 sm:right-6">
        <m.span className="font-mono text-[0.7rem] font-bold tracking-[0.12em] text-ivory/85">{metersText}</m.span>
        <span className="relative h-28 w-[3px] overflow-hidden rounded-full bg-white/25 sm:h-40">
          <m.span style={{ scaleY: p }} className="absolute inset-0 origin-top bg-gold" />
        </span>
      </div>

      {/* Seabed rises into view at the end of the dive */}
      <m.div style={{ y: bedY }} className="absolute inset-x-0 bottom-0 h-[26svh]">
        <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {[180, 260, 900, 980, 1260].map((x, i) => (
            <path
              key={x}
              className="kelp"
              style={{ ["--k-dur" as string]: `${5 + i}s` }}
              fill="none"
              stroke="#1d5b4a"
              strokeWidth="10"
              strokeLinecap="round"
              d={`M${x} 250C${x - 30} 200 ${x + 30} 160 ${x} 110S${x - 20} 50 ${x + 6} 20`}
            />
          ))}
          <path fill="#0a2536" d="M0 170C220 130 420 190 700 160S1180 120 1440 165V260H0Z" />
          <path fill="#03111c" d="M0 215C300 190 560 240 860 212S1260 196 1440 220V260H0Z" />
        </svg>
      </m.div>
    </div>
  );
}
