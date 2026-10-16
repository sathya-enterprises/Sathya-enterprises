"use client";

import { useRef } from "react";
import { useArrival } from "@/lib/useArrival";

/**
 * A block of an inner page that plays its entrance when it scrolls into view and resets once it
 * has left, so it replays on every arrival. Children opt in with the .rise / .rise-line classes
 * (globals.css), staggered by `--i`. The content itself is server-rendered, so it is all in the
 * page's HTML for search engines; only the reveal runs on the client.
 */
export function Arrive({
  as: Tag = "section",
  className,
  children,
  margin = "0px 0px -15% 0px",
  ...rest
}: {
  as?: "section" | "article" | "div";
  className?: string;
  children: React.ReactNode;
  margin?: Parameters<typeof useArrival>[1];
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const arrived = useArrival(ref, margin);
  return (
    <Tag ref={ref as React.Ref<never>} data-arrived={arrived} className={className} {...rest}>
      {children}
    </Tag>
  );
}
