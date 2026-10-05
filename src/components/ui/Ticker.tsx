import Link from "next/link";
import { Sparkle } from "lucide-react";

type Item = { label: string; href: string };

function Row({ items, copy, outline }: { items: Item[]; copy?: boolean; outline?: boolean }) {
  return (
    <ul aria-hidden={copy || undefined} className="flex shrink-0 items-center">
      {items.map((it) => (
        <li key={it.href} className="flex shrink-0 items-center">
          <Link
            href={it.href}
            tabIndex={copy ? -1 : undefined}
            className={`px-4 font-display text-[clamp(1.5rem,6vw,3.2rem)] font-extrabold uppercase leading-none tracking-[-0.03em] transition-colors duration-300 hover:text-gold sm:px-8 ${outline ? "text-outline hover:[-webkit-text-stroke-color:var(--color-gold)]" : "text-ivory"}`}
          >
            {it.label}
          </Link>
          <Sparkle aria-hidden className="h-4 w-4 shrink-0 fill-gold text-gold sm:h-6 sm:w-6" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Business names streaming across the water in one or two rows (the second runs the other way in outline).
 * The first copy of each row is real links; loop copies are decorative. Hover pauses it.
 */
export function Ticker({ items, label, double }: { items: Item[]; label: string; double?: boolean }) {
  const half = Math.ceil(items.length / 2);
  const rows = double ? [items.slice(0, half), items.slice(half)] : [items];
  return (
    <section aria-label={label} className="relative space-y-4 overflow-hidden border-y border-white/12 bg-sea-abyss/50 py-6 sm:space-y-6 sm:py-10">
      {rows.map((row, r) => (
        <div key={r} className="ticker overflow-x-clip">
          <div className={`ticker__track flex w-max ${r % 2 ? "ticker__track--reverse" : ""}`} style={{ ["--ticker-dur" as string]: `${row.length * 6}s` }}>
            <Row items={row} outline={r % 2 === 1} />
            <Row items={row} outline={r % 2 === 1} copy />
            <Row items={row} outline={r % 2 === 1} copy />
            <Row items={row} outline={r % 2 === 1} copy />
          </div>
        </div>
      ))}
    </section>
  );
}
