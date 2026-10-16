"use client";

import { useRef } from "react";
import { useArrival } from "@/lib/useArrival";

type Tag = "div" | "li" | "article" | "details";

/**
 * One card or row that lifts in when it itself scrolls into view (and resets once it has left, so
 * it replays). The flag sits on the element itself (.reveal[data-shown] in globals.css), not on a
 * parent section, so cards further down a long grid wait for their own turn. `i` staggers cards
 * that arrive together, e.g. the columns of one row.
 */
export function Reveal({
  as: El = "div",
  i = 0,
  className = "",
  style,
  children,
  ...rest
}: {
  as?: Tag;
  i?: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  id?: string;
  open?: boolean;
  "aria-labelledby"?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const shown = useArrival(ref, "0px 0px -8% 0px");
  return (
    <El
      ref={ref as React.Ref<never>}
      data-shown={shown}
      className={`reveal ${className}`}
      style={{ "--i": i, ...style } as React.CSSProperties}
      {...rest}
    >
      {children}
    </El>
  );
}
