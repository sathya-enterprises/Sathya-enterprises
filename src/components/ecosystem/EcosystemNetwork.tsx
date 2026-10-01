"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight } from "lucide-react";
import { businessBySlug, businesses, divisionById, divisions } from "@/content/site";
import { ease } from "@/lib/motion";

type Edge = { a: string; b: string };
type Path = Edge & { d: string };

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Every published "related" link becomes one undirected edge. */
function buildEdges(): Edge[] {
  const seen = new Set<string>();
  const edges: Edge[] = [];
  for (const b of businesses) {
    for (const r of b.related) {
      const key = [b.slug, r].sort().join("|");
      if (!seen.has(key) && businessBySlug[r]) {
        seen.add(key);
        edges.push({ a: b.slug, b: r });
      }
    }
  }
  return edges;
}

/**
 * The full ecosystem as a network. Columns are divisions; curves are the real cross-links between
 * businesses. Select a business (hover, focus or tap) to trace what it connects to.
 */
export function EcosystemNetwork() {
  const edges = useMemo(() => buildEdges(), []);
  const [active, setActive] = useState<string | null>(null);
  const [paths, setPaths] = useState<Path[]>([]);
  const wrap = useRef<HTMLDivElement>(null);
  const nodes = useRef<Record<string, HTMLElement | null>>({});

  const neighbours = useMemo(() => {
    if (!active) return new Set<string>();
    const s = new Set<string>([active]);
    edges.forEach((e) => {
      if (e.a === active) s.add(e.b);
      if (e.b === active) s.add(e.a);
    });
    return s;
  }, [active, edges]);

  const measure = useCallback(() => {
    const root = wrap.current;
    if (!root || window.innerWidth < 1024) return setPaths([]);
    const box = root.getBoundingClientRect();
    const col = (slug: string) => divisions.findIndex((d) => d.id === businessBySlug[slug].division);
    const rect = (slug: string) => nodes.current[slug]?.getBoundingClientRect();
    const next: Path[] = [];
    for (const e of edges) {
      const ra = rect(e.a);
      const rb = rect(e.b);
      if (!ra || !rb) continue;
      const [ca, cb] = [col(e.a), col(e.b)];
      const ya = ra.top + ra.height / 2 - box.top;
      const yb = rb.top + rb.height / 2 - box.top;
      let d: string;
      if (ca === cb) {
        // Same division: loop into the gutter — rightwards, except the last column, which loops left.
        const bulge = 26 + Math.abs(ya - yb) * 0.18;
        const left = ca === divisions.length - 1;
        const xa = (left ? ra.left : ra.right) - box.left;
        const xb = (left ? rb.left : rb.right) - box.left;
        const x = left ? Math.min(xa, xb) - bulge : Math.max(xa, xb) + bulge;
        d = `M${xa},${ya} C${x},${ya} ${x},${yb} ${xb},${yb}`;
      } else {
        const [l, r, yl, yr] = ca < cb ? [ra, rb, ya, yb] : [rb, ra, yb, ya];
        const x1 = l.right - box.left;
        const x2 = r.left - box.left;
        const k = (x2 - x1) * 0.45;
        d = `M${x1},${yl} C${x1 + k},${yl} ${x2 - k},${yr} ${x2},${yr}`;
      }
      next.push({ ...e, d });
    }
    setPaths(next);
  }, [edges]);

  useIsoLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [measure]);

  const current = active ? businessBySlug[active] : null;

  return (
    <div>
      <div ref={wrap} className="relative" onMouseLeave={() => setActive(null)}>
        <svg aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block">
          {paths.map((p) => {
            const on = active && (p.a === active || p.b === active);
            return (
              <path
                key={p.a + p.b}
                d={p.d}
                fill="none"
                stroke={on ? "var(--color-red)" : "var(--color-charcoal)"}
                strokeOpacity={on ? 1 : active ? 0.04 : 0.1}
                strokeWidth={on ? 2 : 1}
                style={{ transition: "stroke 250ms, stroke-opacity 250ms, stroke-width 250ms" }}
              />
            );
          })}
        </svg>

        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {divisions.map((d) => (
            <div key={d.id}>
              <div data-tone={d.id} className="tone mb-5 rounded-md border border-[color:var(--tone-line)] px-4 py-3">
                <p className="font-mono text-[0.66rem] font-bold tracking-[0.16em] text-[color:var(--tone-accent)]">{d.index}</p>
                <Link href={d.href} className="font-display text-[1.35rem] font-extrabold tracking-[-0.02em] hover:underline">
                  {d.name}
                </Link>
              </div>
              <ul className="space-y-2">
                {businesses
                  .filter((b) => b.division === d.id)
                  .map((b) => {
                    const on = b.slug === active;
                    const near = neighbours.has(b.slug);
                    return (
                      <li key={b.slug}>
                        <button
                          ref={(el) => {
                            nodes.current[b.slug] = el;
                          }}
                          type="button"
                          aria-pressed={on}
                          onMouseEnter={() => setActive(b.slug)}
                          onFocus={() => setActive(b.slug)}
                          onClick={() => setActive(on ? null : b.slug)}
                          className={`relative flex w-full items-center justify-between gap-2 rounded-full border px-4 py-2.5 text-left text-[0.9rem] font-bold transition-[background-color,color,border-color,opacity] duration-200 ${
                            on
                              ? "border-red bg-red text-white"
                              : near
                                ? "border-gold bg-gold text-charcoal"
                                : active
                                  ? "border-line bg-ivory opacity-40"
                                  : "border-line-strong bg-ivory hover:border-red"
                          }`}
                        >
                          {b.name}
                          {b.also && (
                            <span className="font-mono text-[0.56rem] tracking-[0.12em] opacity-70">
                              +{b.also.map((a) => divisionById[a].name.slice(0, 4)).join(" ")}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Inspector */}
      <div className="sticky bottom-4 z-20 mt-10" aria-live="polite">
        <AnimatePresence mode="wait">
          {current ? (
            <m.div
              key={current.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: ease.out }}
              data-tone={current.division}
              className="tone flex flex-col gap-4 rounded-lg border border-[color:var(--tone-line)] p-5 shadow-3 sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div>
                <p className="font-mono text-[0.64rem] font-bold tracking-[0.16em] text-[color:var(--tone-accent)]">
                  {divisionById[current.division].name} — {current.index} · CONNECTS TO {neighbours.size - 1}
                </p>
                <p className="mt-1 font-display text-[1.3rem] font-extrabold tracking-[-0.02em]">{current.headline}</p>
                <p className="mt-1 max-w-[70ch] text-[0.9rem] text-[color:var(--tone-soft)]">{current.intro}</p>
              </div>
              <Link
                href={`/${current.slug}`}
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[color:var(--tone-ink)] px-5 py-3 text-[0.9rem] font-bold text-[color:var(--tone-bg)] sm:self-auto"
              >
                Open {current.short}
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </Link>
            </m.div>
          ) : (
            <m.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-charcoal-soft"
            >
              Select any business to trace its connections — {edges.length} links across {businesses.length} businesses
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
