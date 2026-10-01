"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { ease, dur } from "@/lib/motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: dur.reveal, ease: ease.out }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
