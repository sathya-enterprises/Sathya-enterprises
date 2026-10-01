"use client";

import * as m from "motion/react-m";
import { builtToGrow, whatsNext } from "@/content/site";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { ease } from "@/lib/motion";

/**
 * Built to Grow — the qualitative markers exactly as published (no invented numbers) —
 * and What's Next, drawn as open slots waiting to connect to the core.
 */
export function Outlook() {
  return (
    <section aria-labelledby="grow-title" className="section-y bg-gold-light">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div id="grow-title">
            <p className="t-eyebrow text-red-deep">Built to Grow</p>
            <LineReveal as="h2" lines={["BUILT", "TO GROW."]} className="t-h1 mt-4" />
          </div>
          <dl className="grid grid-cols-2 border-t border-red-deep/15 md:grid-cols-4">
            {builtToGrow.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.07}
                y={14}
                className={`flex flex-col-reverse justify-end border-b border-red-deep/15 py-6 pr-4 md:border-b-0 ${
                  i % 2 ? "border-l pl-5" : ""
                } ${i > 0 ? "md:border-l md:pl-6" : ""}`}
              >
                <dt className="mt-3 font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-charcoal-soft">
                  {s.label}
                </dt>
                <dd className="font-display text-[clamp(2rem,3.6vw,3.25rem)] font-extrabold leading-none tracking-[-0.035em] text-red">
                  {s.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <div className="mt-24 lg:mt-32">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="t-eyebrow text-red-deep">Looking Ahead</p>
              <LineReveal as="h2" lines={["WHAT'S NEXT?"]} className="t-h1 mt-4" />
            </div>
            <p className="max-w-[36ch] text-charcoal-soft md:text-right">
              Open slots in the ecosystem — each one connects back to the same core.
            </p>
          </div>

          <div className="relative mt-14">
            {/* Connector through the four open slots */}
            <m.span
              aria-hidden
              className="absolute left-0 right-0 top-[22px] hidden h-0 origin-left border-t-2 border-dashed border-red-deep/60 md:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 1.4, ease: ease.inOut }}
            />
            <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
              {whatsNext.map((w, i) => (
                <m.li
                  key={w.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                  transition={{ duration: 0.6, ease: ease.out, delay: 0.25 + i * 0.12 }}
                  className="grid grid-cols-[46px_1fr] gap-4 md:block"
                >
                  <span
                    aria-hidden
                    className="grid h-[46px] w-[46px] place-items-center rounded-full border-2 border-dashed border-red-deep bg-gold-light font-mono text-lg font-bold text-red-deep"
                  >
                    +
                  </span>
                  <div className="md:mt-6">
                    <h3 className="font-display text-[1.35rem] font-extrabold tracking-[-0.02em]">{w.title}</h3>
                    <p className="mt-2 max-w-[30ch] text-[0.95rem] text-charcoal-soft">{w.body}</p>
                  </div>
                </m.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
