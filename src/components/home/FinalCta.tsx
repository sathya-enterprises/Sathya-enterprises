import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { brand, contact } from "@/content/site";
import { RollText } from "@/components/ui/RollText";
import { Reveal } from "@/components/motion/Reveal";
import { FloatingShapes, type ShapeSpec } from "@/components/motion/FloatingShapes";
import { Magnetic } from "@/components/motion/Interactive";

const shapes: ShapeSpec[] = [
  { kind: "orbit", x: 84, y: 16, size: 120, color: "var(--color-gold)", depth: 0.5, rotate: 8 },
  { kind: "ring", x: 92, y: 52, size: 64, color: "var(--color-ivory)", depth: 0.9, desktopOnly: true },
  { kind: "tile", x: 72, y: 8, size: 40, color: "var(--color-gold)", depth: 0.4, rotate: -18, desktopOnly: true },
  { kind: "plus", x: 96, y: 10, size: 30, color: "var(--color-ivory)", depth: 0.7, rotate: 10 },
];

export function FinalCta({
  secondary = { href: "/ecosystem", label: "Explore Our Businesses" },
}: {
  secondary?: { href: string; label: string };
}) {
  return (
    <section aria-label="Start a conversation" className="relative isolate overflow-hidden bg-red text-ivory">
      <FloatingShapes shapes={shapes} className="z-[2]" />
      <div className="container-x section-y">
        <p className="t-eyebrow text-gold">Start a Conversation</p>
        <Link href="/contact" className="group mt-6 block w-fit rounded-md">
          <span className="sr-only">{contact.heading}</span>
          <span className="block font-display font-extrabold leading-[0.92] tracking-[-0.045em] [font-stretch:112%] text-[clamp(2.2rem,8.4vw,9.25rem)]">
            <RollText text="LET'S BUILD" />
            <br />
            <span className="whitespace-nowrap">
              <RollText text="WHAT'S NEXT." />
              <ArrowUpRight
                aria-hidden
                className="ml-2 inline-block h-[0.55em] w-[0.55em] align-baseline text-gold transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-2 group-hover:translate-x-2"
              />
            </span>
          </span>
        </Link>
        <Reveal className="mt-12 grid gap-8 border-t border-ivory/20 pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <p className="t-lead max-w-[52ch] text-ivory/80">{brand.summary}</p>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3.5 font-bold text-red transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-gold hover:text-charcoal"
            >
              Start a Conversation
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Link>
            </Magnetic>
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ivory/40 px-6 py-3.5 font-bold transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-ivory"
            >
              {secondary.label}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
