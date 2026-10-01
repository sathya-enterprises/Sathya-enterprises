import Link from "next/link";
import { businessBySlug, divisionById, type Business } from "@/content/site";

const W = 420;
const H = 340;
const C = { x: W / 2, y: H / 2 };
const R = 128;
const r2 = (v: number) => Math.round(v * 100) / 100;

/**
 * Where this business sits: itself at the core, its published "related" businesses as satellites.
 * Pure SVG + CSS (lines draw in once); labels are real links.
 */
export function RelationMap({ business }: { business: Business }) {
  const related = business.related.map((s) => businessBySlug[s]).filter(Boolean);
  const n = related.length;
  const pts = related.map((_, i) => {
    const a = ((-90 + (360 / n) * i) * Math.PI) / 180;
    return { x: r2(C.x + R * Math.cos(a)), y: r2(C.y + R * 0.92 * Math.sin(a)) };
  });

  return (
    <figure className="relative mx-auto w-full max-w-[460px]">
      <div className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <ellipse cx={C.x} cy={C.y} rx={R} ry={R * 0.92} fill="none" stroke="var(--tone-line)" strokeDasharray="2 8" />
          {pts.map((p, i) => (
            <line
              key={i}
              x1={C.x}
              y1={C.y}
              x2={p.x}
              y2={p.y}
              stroke="var(--tone-accent)"
              strokeWidth="1.5"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="1"
              style={{ animation: `draw-line 0.9s var(--ease-out) ${1.1 + i * 0.12}s forwards` }}
            />
          ))}
          <circle cx={C.x} cy={C.y} r="40" fill="var(--color-red)" stroke="var(--tone-ink)" strokeOpacity="0.35" />
          <circle cx={C.x} cy={C.y} r="54" fill="none" stroke="var(--color-red)" strokeOpacity="0.25" />
        </svg>
        <span className="absolute left-1/2 top-1/2 w-[76px] -translate-x-1/2 -translate-y-1/2 text-center font-display text-[0.7rem] font-extrabold leading-tight text-white">
          {business.short}
        </span>
        {related.map((b, i) => (
          <Link
            key={b.slug}
            href={`/${b.slug}`}
            style={{ left: `${(pts[i].x / W) * 100}%`, top: `${(pts[i].y / H) * 100}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[color:var(--tone-line)] bg-[color:var(--tone-bg)] px-3 py-1.5 text-[0.78rem] font-bold shadow-1 transition-[border-color,color] duration-200 hover:border-[color:var(--tone-accent)] hover:text-[color:var(--tone-accent)]"
          >
            {b.short}
            <span className="ml-1.5 font-mono text-[0.58rem] tracking-[0.12em] text-[color:var(--tone-soft)]">
              {divisionById[b.division].name}
            </span>
          </Link>
        ))}
      </div>
      <figcaption className="mt-4 text-center font-mono text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[color:var(--tone-soft)]">
        Connected in the ecosystem
      </figcaption>
    </figure>
  );
}
