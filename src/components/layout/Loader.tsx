import { brand, divisions } from "@/content/site";

/** Satellite start offsets — each flies in from its own direction. */
const sats = [
  { cx: 16, cy: 5, fx: "0px", fy: "-34px" },
  { cx: 27, cy: 16, fx: "34px", fy: "0px" },
  { cx: 16, cy: 27, fx: "0px", fy: "34px" },
  { cx: 5, cy: 16, fx: "-34px", fy: "0px" },
];

/**
 * Branded intro — pure CSS (globals.css › Loader) so it plays before hydration and never blocks
 * the HTML underneath (the page is fully rendered beneath it, which keeps LCP honest).
 *
 * First load in a session: the full sequence. Later full loads: a short mark-only version.
 * Exit: four columns — one per division — lift away in a wave.
 * Reduced motion: no travel, just a quick crossfade.
 */
export function Loader() {
  return (
    <div className="loader" aria-hidden>
      {divisions.map((d, i) => (
        <span key={d.id} className="loader__col" data-tone={d.id} style={{ ["--c" as string]: i }} />
      ))}
      <div className="loader__content">
        <svg width="76" height="76" viewBox="0 0 32 32" className="loader__mark overflow-visible">
          <g className="loader__orbit" style={{ transformOrigin: "16px 16px" }}>
            {sats.map((s, i) => (
              <circle
                key={i}
                className="loader__sat"
                cx={s.cx}
                cy={s.cy}
                r="2.4"
                fill="var(--color-gold)"
                style={{ ["--fx" as string]: s.fx, ["--fy" as string]: s.fy, animationDelay: `${180 + i * 60}ms` }}
              />
            ))}
          </g>
          <circle className="loader__core" cx="16" cy="16" r="6" fill="var(--color-red)" style={{ transformOrigin: "16px 16px" }} />
        </svg>
        <p className="loader__name mt-8 text-center font-display font-extrabold leading-[0.86] tracking-[-0.04em] text-[clamp(3rem,15vw,7.5rem)]">
          <span className="loader__word [font-stretch:125%]">
            <span style={{ animationDelay: "250ms" }}>{brand.first}</span>
          </span>
          <span className="loader__word text-red [font-stretch:100%] text-[0.42em] tracking-[0.02em]">
            <span style={{ animationDelay: "380ms" }}>{brand.second}</span>
          </span>
        </p>
        <p className="loader__verbs mt-6 flex flex-wrap justify-center gap-x-3 font-mono text-[0.78rem] font-bold tracking-[0.2em] sm:text-[0.9rem]">
          {brand.verbs.map((v, i) => (
            <span key={v} className="loader__verb" style={{ animationDelay: `${620 + i * 120}ms` }}>
              <span className={i === brand.verbs.length - 1 ? "text-red" : ""}>{v}</span>
            </span>
          ))}
        </p>
        <span className="loader__track mt-8 block h-[2px] w-40 overflow-hidden rounded-full bg-line">
          <span className="loader__bar block h-full w-full bg-red" />
        </span>
      </div>
    </div>
  );
}
