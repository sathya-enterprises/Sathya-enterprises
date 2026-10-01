import Link from "next/link";
import type { DivisionId } from "@/content/site";
import { SplitHeading } from "./SplitHeading";
import { FloatingShapes, type ShapeSpec } from "@/components/motion/FloatingShapes";

/** Shapes stay in the top band so they never sit on the page's own visual. */
const shapes: ShapeSpec[] = [
  { kind: "orbit", x: 90, y: 15, size: 74, color: "var(--color-gold)", depth: 0.8, rotate: -10 },
  { kind: "tile", x: 79, y: 17, size: 34, color: "var(--tone-accent)", depth: 0.5, rotate: 16, desktopOnly: true },
  { kind: "ring", x: 66, y: 16, size: 40, color: "var(--tone-accent)", depth: 1.1, desktopOnly: true },
  { kind: "plus", x: 97, y: 28, size: 24, color: "var(--tone-accent)", depth: 0.6, rotate: 12, desktopOnly: true },
];

/**
 * Shared opening for inner pages. Each page supplies its own `visual`, so pages share a grammar
 * (crumb · index · title · intro) without sharing a layout.
 */
export function PageHero({
  crumb,
  index,
  title,
  intro,
  tone,
  visual,
  children,
}: {
  crumb: string;
  index?: string;
  title: React.ReactNode[];
  intro?: string;
  tone?: DivisionId;
  visual?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section
      data-tone={tone}
      className={`${tone ? "tone" : ""} relative isolate overflow-hidden pt-[calc(var(--header-h)+3.5rem)] pb-16 sm:pt-[calc(var(--header-h)+5rem)] sm:pb-24`}
    >
      <FloatingShapes shapes={shapes} className="z-[2]" />
      <div className="container-wide">
        <nav aria-label="Breadcrumb" className="t-eyebrow flex flex-wrap items-center gap-2 text-[color:var(--tone-accent)]">
          <Link href="/" className="opacity-70 hover:opacity-100">
            Home
          </Link>
          <span aria-hidden className="opacity-50">
            /
          </span>
          <span aria-current="page">{crumb}</span>
          {index && (
            <span className="ml-2 rounded-full border border-[color:var(--tone-line)] px-2 py-0.5 text-[color:var(--tone-soft)]">
              {index}
            </span>
          )}
        </nav>
        <div className={`mt-8 grid gap-12 ${visual ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end" : ""}`}>
          <div>
            <SplitHeading lines={title} className="t-display" />
            {intro && (
              <p className="enter t-lead mt-8 max-w-[52ch] text-[color:var(--tone-soft)]" style={{ ["--i" as string]: 2 }}>
                {intro}
              </p>
            )}
            {children}
          </div>
          {visual && (
            <div className="enter" style={{ ["--i" as string]: 3 }}>
              {visual}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
