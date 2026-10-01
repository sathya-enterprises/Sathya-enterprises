import { ViewTransition } from "react";

/** Route-level crossfade + rise. CSS lives in globals.css › Page transitions. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      {children}
    </ViewTransition>
  );
}
