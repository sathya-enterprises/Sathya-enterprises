"use client";

import * as m from "motion/react-m";
import { ease, dur } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. Medium tier = 24, subtle = 12. */
  y?: number;
  as?: "div" | "li" | "section" | "p" | "span";
};

/** Medium-tier section entrance: fade + rise once when scrolled into view. */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: RevealProps) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: dur.reveal, ease: ease.out, delay }}
    >
      {children}
    </Tag>
  );
}

/**
 * Headline reveal: each line slides up from behind a mask.
 * Pass lines explicitly so the break points are designed, not accidental.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  as = "h2",
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: 0.09, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em] mb-[-0.06em]">
          <m.span
            className={`block ${lineClassName ?? ""}`}
            variants={{ hidden: { y: "105%" }, shown: { y: "0%" } }}
            transition={{ duration: 0.9, ease: ease.out }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}
