import Link from "next/link";
import { TiltCard } from "@/components/motion/TiltCard";

export type GrowthStep = { verb: string; line: string; links: { href: string; label: string }[] };

function Cards({ steps, copy }: { steps: GrowthStep[]; copy?: boolean }) {
  return (
    <ul aria-hidden={copy || undefined} className="flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6">
      {steps.map((s, i) => (
        <li key={s.verb} className="w-[78vw] max-w-[340px] shrink-0 py-6 sm:w-[340px]">
          <TiltCard className="flex min-h-[300px] flex-col rounded-lg border border-white/15 bg-sea-abyss/55 p-7 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.6)] backdrop-blur-sm">
            <span className="flex items-center justify-between">
              <span className="font-mono text-[0.72rem] font-bold tracking-[0.16em] text-red">0{i + 1}</span>
              <span aria-hidden className="h-1 w-10 rounded-full bg-gold" />
            </span>
            {/* Only the first copy carries headings; the loop copy is decorative. */}
            {copy ? (
              <span className="mt-6 block font-display text-[2.6rem] font-extrabold leading-none tracking-[-0.04em]">{s.verb}</span>
            ) : (
              <h3 className="mt-6 font-display text-[2.6rem] font-extrabold leading-none tracking-[-0.04em]">{s.verb}</h3>
            )}
            <p className="mt-3 text-[1.02rem] text-ivory/85">{s.line}</p>
            <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 pt-6 text-[0.9rem] font-semibold">
              {s.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    tabIndex={copy ? -1 : undefined}
                    className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </TiltCard>
        </li>
      ))}
    </ul>
  );
}

/**
 * Build. Market. Automate. Grow. — the home page's only cards. They drift right → left on a loop and
 * tilt toward the pointer; hovering or tabbing in pauses the drift. Server-rendered, so every heading
 * and link is in the HTML; the extra copies that make the loop seamless are hidden from assistive tech.
 */
export function GrowthSteps({ steps }: { steps: GrowthStep[] }) {
  return (
    <section aria-labelledby="how-title" className="py-16 sm:py-24">
      <div className="reveal container-x">
        <p className="t-eyebrow text-gold">How we help</p>
        <h2 id="how-title" className="mt-3 max-w-[20ch] font-display text-[clamp(1.9rem,5vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
          Build. Market. Automate. <span className="text-gold">Grow.</span>
        </h2>
      </div>
      <div className="reveal-right step-marquee mt-6 overflow-x-clip">
        {/* Four sets so half the track (one loop) is always wider than even a very wide screen. */}
        <div className="step-marquee__track flex w-max" style={{ ["--marquee-dur" as string]: "64s" }}>
          <Cards steps={steps} />
          <Cards steps={steps} copy />
          <Cards steps={steps} copy />
          <Cards steps={steps} copy />
        </div>
      </div>
    </section>
  );
}
