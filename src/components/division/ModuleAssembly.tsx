"use client";

import { useRef } from "react";
import { useScroll, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";

/** Scattered starting offsets — modules drift in and lock into the grid as you scroll. */
const SCATTER = [
  [-40, -50, -6],
  [30, -70, 5],
  [50, -30, -4],
  [-50, 40, 4],
  [40, 60, -5],
  [60, 40, 6],
  [-30, 70, -3],
];

function Module({
  label,
  i,
  progress,
  future,
  wide,
}: {
  label: string;
  i: number;
  progress: MotionValue<number>;
  future?: boolean;
  wide?: boolean;
}) {
  const [dx, dy, rot] = SCATTER[i % SCATTER.length];
  const start = i * 0.06;
  const x = useTransform(progress, [start, start + 0.5], [dx, 0]);
  const y = useTransform(progress, [start, start + 0.5], [dy, 0]);
  const rotate = useTransform(progress, [start, start + 0.5], [rot, 0]);
  const opacity = useTransform(progress, [start, start + 0.3], [0, 1]);
  return (
    <m.li
      style={{ x, y, rotate, opacity }}
      className={`flex min-h-[120px] flex-col justify-between rounded-md p-5 ${wide ? "col-span-2" : ""} ${
        future
          ? "border-2 border-dashed border-gold/50 text-gold"
          : "border border-[color:var(--tone-line)] bg-ivory/[0.04] text-ivory"
      }`}
    >
      <span className="font-mono text-[0.62rem] font-bold tracking-[0.16em] text-gold">
        {future ? "+ NEXT" : `MODULE ${String(i + 1).padStart(2, "0")}`}
      </span>
      <span className="font-display text-[1.3rem] font-extrabold leading-tight tracking-[-0.02em]">{label}</span>
    </m.li>
  );
}

/** The published SaaS ecosystem — "start with one module, add more as the business grows". */
export function ModuleAssembly({ modules }: { modules: string[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.25"] });
  return (
    <ul ref={ref} className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {modules.map((label, i) => (
        <Module
          key={label}
          label={label}
          i={i}
          progress={scrollYProgress}
          future={/future/i.test(label)}
          wide={i === 0 || /future/i.test(label)}
        />
      ))}
    </ul>
  );
}
