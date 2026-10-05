import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { contact } from "@/content/site";

/**
 * Common questions as native disclosure widgets (no JS for the open/close; keyboard and screen-reader
 * support built in). Answers slide open where the browser can animate <details> (globals.css › FAQ).
 *   lg: heading and a contact card pinned on the left (5 cols) while the questions scroll on the right (7).
 *   Phones/tablets: heading, questions, then the contact card.
 * Each question rises in as it scrolls into view.
 */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section aria-labelledby="faq-title" className="container-x py-16 sm:py-24 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="contents lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:col-span-5 lg:block lg:self-start">
          <Reveal>
            <p className="t-eyebrow text-gold">Questions</p>
            <h2 id="faq-title" className="mt-3 max-w-[14ch] font-display text-[clamp(1.9rem,5vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
              Before you <span className="text-gold">get in touch.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="order-last rounded-lg border border-white/12 bg-sea-abyss/85 p-6 sm:p-8 lg:mt-10">
            <p className="font-display text-[1.3rem] font-extrabold tracking-[-0.02em]">Still have a question?</p>
            <p className="mt-2 text-ivory/75">{contact.intro}</p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-red px-6 py-3.5 font-bold text-white transition-colors duration-300 hover:bg-red-deep"
              >
                Ask us directly
                <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <a href={`mailto:${contact.email.value}`} className="text-center font-semibold text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold">
                {contact.email.value}
              </a>
            </div>
          </Reveal>
        </div>

        <ul className="border-t border-white/15 lg:col-span-7">
          {items.map((it, i) => (
            <Reveal as="li" key={it.q} delay={i * 0.06} className="border-b border-white/15">
              <details className="faq group">
                <summary className="flex cursor-pointer list-none items-start gap-4 py-5 text-left font-display text-[1.1rem] font-bold leading-snug transition-colors hover:text-gold sm:gap-6 sm:py-6 sm:text-[1.25rem] [&::-webkit-details-marker]:hidden">
                  <span aria-hidden className="pt-1 font-mono text-[0.8rem] text-gold">
                    0{i + 1}
                  </span>
                  <span className="flex-1">{it.q}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/25 transition-colors duration-300 group-open:border-gold group-open:bg-gold group-open:text-charcoal">
                    <Plus aria-hidden className="h-4 w-4 transition-transform duration-300 group-open:rotate-45" />
                  </span>
                </summary>
                <p className="max-w-[60ch] pb-6 pl-8 pr-12 text-[1rem] leading-relaxed text-ivory/80 sm:pl-10">{it.a}</p>
              </details>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
