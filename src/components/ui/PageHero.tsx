import Link from "next/link";
import type { Photo } from "@/content/photos";
import { SplitHeading } from "./SplitHeading";
import { SectionPhoto } from "./SectionPhoto";

/** Page opening set straight on the water: breadcrumb, one h1, an intro and an optional photo beside them. */
export function PageHero({
  crumb,
  index,
  title,
  intro,
  photo,
  children,
}: {
  crumb: string;
  index?: string;
  title: React.ReactNode[];
  intro?: string;
  photo?: Photo;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`on-water container-x pt-[calc(var(--header-h)+2.5rem)] pb-8 sm:pt-[calc(var(--header-h)+4rem)] ${photo ? "grid items-center gap-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : ""}`}
    >
      <div className="max-w-3xl">
        <nav aria-label="Breadcrumb" className="enter t-eyebrow flex flex-wrap items-center gap-2 text-gold" style={{ ["--i" as string]: 0 }}>
          <Link href="/" className="opacity-80 hover:opacity-100">
            Home
          </Link>
          <span aria-hidden className="opacity-60">
            /
          </span>
          <span aria-current="page">{crumb}</span>
          {index && <span className="ml-1 rounded-full border border-white/20 px-2 py-0.5 text-ivory/70">{index}</span>}
        </nav>
        <SplitHeading lines={title} className="mt-4 font-display text-[clamp(2.1rem,7vw,3.75rem)] font-extrabold leading-[0.98] tracking-[-0.035em]" />
        {intro && (
          <p className="enter mt-4 max-w-[52ch] text-[1.05rem] text-ivory/85" style={{ ["--i" as string]: 2 }}>
            {intro}
          </p>
        )}
        {children}
      </div>
      {photo && (
        <div className="enter" style={{ ["--i" as string]: 3 }}>
          <SectionPhoto photo={photo} eager sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[4/3] md:aspect-square" />
        </div>
      )}
    </section>
  );
}
