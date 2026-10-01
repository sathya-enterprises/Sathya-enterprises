/** Customers ↕ Businesses ↕ Service Providers — the published marketplace model as a live triangle. */
export function MarketplaceTriad({ sides }: { sides: string[] }) {
  const pts = [
    { x: 200, y: 40 },
    { x: 360, y: 300 },
    { x: 40, y: 300 },
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [2, 0],
  ];
  return (
    <figure className="relative mx-auto w-full max-w-[460px]">
      <div className="relative aspect-[400/340]">
        <svg viewBox="0 0 400 340" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          {edges.map(([a, b], i) => (
            <g key={i}>
              <line x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y} stroke="var(--tone-line)" strokeWidth="10" strokeLinecap="round" />
              <line
                x1={pts[a].x}
                y1={pts[a].y}
                x2={pts[b].x}
                y2={pts[b].y}
                stroke="var(--color-red-deep)"
                strokeWidth="2"
                strokeDasharray="4 8"
                data-ambient
                style={{ animation: `dash-flow ${1.4 + i * 0.3}s linear infinite` }}
              />
            </g>
          ))}
          <circle cx="200" cy="213" r="34" fill="var(--color-red)" />
          <circle cx="200" cy="213" r="46" fill="none" stroke="var(--color-red)" strokeOpacity="0.25" />
        </svg>
        <span className="absolute left-1/2 top-[62.6%] -translate-x-1/2 -translate-y-1/2 text-center font-mono text-[0.58rem] font-bold leading-tight tracking-[0.14em] text-white">
          ONE
          <br />
          PLATFORM
        </span>
        {sides.map((s, i) => (
          <span
            key={s}
            style={{ left: `${(pts[i].x / 400) * 100}%`, top: `${(pts[i].y / 340) * 100}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-charcoal px-4 py-2 font-display text-[0.92rem] font-extrabold tracking-[-0.01em] text-ivory shadow-2"
          >
            {s}
          </span>
        ))}
      </div>
      <figcaption className="mt-4 text-center font-mono text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[color:var(--tone-soft)]">
        Business Marketplace — three sides, one platform
      </figcaption>
    </figure>
  );
}
