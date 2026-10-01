import Link from "next/link";
import { businesses } from "@/content/site";

/**
 * Every business on a slow ticker — motion that also gives crawlers and visitors a link to each page.
 * Pure CSS; pauses on hover/focus; becomes a swipeable row under reduced motion.
 */
export function BusinessMarquee({ tone = "light" }: { tone?: "light" | "dark" }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {businesses.map((b) => (
        <li key={b.slug} className="flex items-center">
          <Link
            href={`/${b.slug}`}
            tabIndex={hidden ? -1 : undefined}
            className={`whitespace-nowrap px-5 font-display text-[clamp(1.4rem,3.4vw,2.6rem)] font-extrabold tracking-[-0.03em] transition-colors duration-200 sm:px-7 ${
              tone === "dark" ? "text-ivory/80 hover:text-gold" : "text-charcoal hover:text-red"
            }`}
          >
            {b.name}
          </Link>
          <svg aria-hidden viewBox="0 0 32 32" className="h-4 w-4 shrink-0 sm:h-5 sm:w-5">
            <circle cx="16" cy="16" r="6" fill="var(--color-red)" />
            <circle cx="16" cy="5" r="2.6" fill="var(--color-gold)" />
            <circle cx="27" cy="16" r="2.6" fill="var(--color-gold)" />
            <circle cx="16" cy="27" r="2.6" fill="var(--color-gold)" />
            <circle cx="5" cy="16" r="2.6" fill="var(--color-gold)" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <nav
      aria-label="All businesses"
      className={`marquee group relative overflow-hidden border-y py-5 sm:py-7 ${
        tone === "dark" ? "border-line-inverse bg-charcoal" : "border-line bg-ivory"
      }`}
    >
      <div className="marquee__track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </nav>
  );
}
