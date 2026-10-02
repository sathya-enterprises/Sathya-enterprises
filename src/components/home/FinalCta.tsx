import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { contact } from "@/content/site";

/** Closing call to action, set straight on the water like the rest of the page. */
export function FinalCta({
  secondary = { href: "/#divisions", label: "Explore Our Businesses" },
}: {
  secondary?: { href: string; label: string };
}) {
  return (
    <section aria-labelledby="final-cta-title" className="reveal-zoom on-water container-x py-20 sm:py-32">
      <p className="t-eyebrow text-gold">Start a Conversation</p>
      <h2 id="final-cta-title" className="mt-3 font-display text-[clamp(2.4rem,9vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
        Let&apos;s build <span className="text-gold">what&apos;s next.</span>
      </h2>
      <p className="mt-5 max-w-[48ch] text-[1.05rem] text-ivory/85">{contact.intro}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-red px-6 py-3.5 font-bold text-white transition-colors duration-200 hover:bg-red-deep">
          Start a conversation
          <ArrowUpRight aria-hidden className="h-4 w-4" />
        </Link>
        <Link href={secondary.href} className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 font-bold text-charcoal transition-colors duration-200 hover:bg-ivory">
          {secondary.label}
          <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
