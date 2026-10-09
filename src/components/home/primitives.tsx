"use client";

import { m } from "motion/react";
import { ease } from "@/lib/motion";

/**
 * Shared homepage building blocks — one source for spacing, type and motion so every section
 * reads the same. Sizes come from the type scale in globals.css (t-h1, t-lead, t-eyebrow).
 */

/** Scroll reveal that replays every time the element re-enters the viewport (both directions). */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  x = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: false, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: ease.out, delay }}
    >
      {children}
    </m.div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="t-eyebrow inline-flex items-center gap-2 rounded-full border border-red/20 bg-white px-4 py-2 text-red">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </span>
  );
}

/** Red → gold accent used on the second line of every headline. */
export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="bg-gradient-to-r from-red to-gold bg-clip-text text-transparent">{children}</span>;
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal className={`max-w-2xl ${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && <div className="mb-5"><Eyebrow>{eyebrow}</Eyebrow></div>}
      <h2 className="t-h1 uppercase text-ink">{title}</h2>
      {lead && <p className={`t-lead mt-5 text-ink-soft ${centered ? "mx-auto" : ""}`}>{lead}</p>}
    </Reveal>
  );
}

const buttonBase =
  "inline-flex w-full items-center justify-center rounded-full px-7 py-4 text-sm font-bold uppercase tracking-wide transition-[background-color,transform] duration-200 active:scale-95 sm:w-auto";

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const look =
    variant === "primary"
      ? "bg-red text-ivory shadow-2 hover:bg-red-deep"
      : "border-2 border-gold bg-white text-ink hover:bg-gold-light";
  return (
    <a href={href} className={`${buttonBase} ${look}`}>
      {children}
    </a>
  );
}
