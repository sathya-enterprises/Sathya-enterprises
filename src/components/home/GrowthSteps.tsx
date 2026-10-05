import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type GrowthStep = { verb: string; line: string; links: { href: string; label: string }[] };

/**
 * Build. Market. Automate. Grow. — told as a timeline. Phones get one vertical rail with the steps beside
 * it; from lg the heading pins on the left while the steps scroll past on the right. As you scroll, the
 * rail fills with gold and each step's node lights up when it reaches the middle of the screen (CSS
 * scroll-driven; without support or with reduced motion every step simply shows lit).
 */
export function GrowthSteps({ steps }: { steps: GrowthStep[] }) {
  return (
    <section aria-labelledby="how-title" className="container-x py-16 sm:py-24 lg:py-28">
      <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="reveal lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
          <p className="t-eyebrow text-gold">How we help</p>
          <h2 id="how-title" className="mt-3 max-w-[14ch] font-display text-[clamp(1.9rem,6vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
            Build. Market. Automate. <span className="text-gold">Grow.</span>
          </h2>
        </div>

        <div className="timeline relative mt-10 lg:mt-0">
          {/* The rail, and its gold fill that follows the scroll */}
          <span aria-hidden className="absolute bottom-6 left-[calc(1.25rem-0.5px)] top-6 w-px bg-white/20 sm:left-[calc(1.5rem-0.5px)]" />
          <span aria-hidden className="timeline-fill absolute bottom-6 left-[calc(1.25rem-0.5px)] top-6 w-px origin-top bg-gold sm:left-[calc(1.5rem-0.5px)]" />

          <ol className="relative">
            {steps.map((s, i) => (
              <li key={s.verb} className="timeline-step relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 pb-12 last:pb-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6 sm:pb-16">
                <span
                  aria-hidden
                  className="timeline-node relative z-10 grid h-10 w-10 place-items-center rounded-full border-2 border-gold bg-gold font-mono text-[0.78rem] font-bold text-charcoal sm:h-12 sm:w-12 sm:text-[0.85rem]"
                >
                  0{i + 1}
                </span>
                <div className="timeline-body pt-0.5 sm:pt-1">
                  <h3 className="font-display text-[clamp(2.25rem,9vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">{s.verb}</h3>
                  <p className="mt-3 max-w-[38ch] text-[1.05rem] text-ivory/85 sm:text-[1.15rem]">{s.line}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] font-semibold">
                    {s.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="group inline-flex items-center gap-1 py-1 text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
                        >
                          {l.label}
                          <ArrowUpRight aria-hidden className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
