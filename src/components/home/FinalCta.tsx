import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { contact } from "@/content/site";

/** Closing call to action: a glass panel on the water with a travelling red–gold edge and drifting light. */
export function FinalCta({
  secondary = { href: "/#divisions", label: "Explore Our Businesses" },
}: {
  secondary?: { href: string; label: string };
}) {
  return (
    <section aria-labelledby="final-cta-title" className="on-water container-x py-16 sm:py-24 lg:py-28">
      <div
        className="reveal-zoom edge-glow relative overflow-hidden rounded-lg border border-white/12 bg-sea-abyss/85 px-5 py-10 sm:px-10 sm:py-16 lg:px-14 lg:py-20"
        style={{ ["--edge-opacity" as string]: "1" }}
      >
        <div className="relative">
          <p className="t-eyebrow text-gold">Start a Conversation</p>
          <h2 id="final-cta-title" className="mt-3 font-display text-[clamp(2.4rem,9vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
            Let&apos;s build <span className="text-gold">what&apos;s next.</span>
          </h2>
          <p className="mt-5 max-w-[48ch] text-[1.05rem] text-ivory/85">{contact.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-red px-6 py-4 sm:w-auto sm:py-3.5 font-bold text-white shadow-[0_12px_30px_-10px_rgb(200_16_46/0.7)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-red-deep"
            >
              Start a conversation
              <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={secondary.href}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 sm:w-auto sm:py-3.5 font-bold text-charcoal transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-ivory"
            >
              {secondary.label}
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
