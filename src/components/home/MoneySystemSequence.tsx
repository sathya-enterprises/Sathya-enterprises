"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { m, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import { Eyebrow } from "./primitives";
import digitalPhoto from "@/assets/photos/digital.jpg";
import meetingPhoto from "@/assets/photos/meeting.jpg";
import teamPhoto from "@/assets/photos/team.jpg";
import technologyPhoto from "@/assets/photos/technology.jpg";
import productsPhoto from "@/assets/photos/products.jpg";
import workshopPhoto from "@/assets/photos/workshop.jpg";

type Step = {
  num: string;
  title: string;
  desc: string;
  photo: StaticImageData;
  /** Flight path: vertical position (% of card height) and tilt (deg) at four points across the screen. */
  y: [number, number, number, number];
  r: [number, number, number, number];
};

const STEPS: Step[] = [
  { num: "01", title: "Attract", desc: "Digital marketing, Instagram, SEO, SEM", photo: digitalPhoto, y: [10, 50, -10, 10], r: [20, -10, -45, 20] },
  { num: "02", title: "Capture", desc: "Websites, landing pages, lead generation", photo: meetingPhoto, y: [0, 47.5, -10, 15], r: [-25, 15, -45, 30] },
  { num: "03", title: "Convert", desc: "CRM, WhatsApp, follow-up", photo: teamPhoto, y: [0, 52.5, -10, 5], r: [15, -5, -40, 60] },
  { num: "04", title: "Automate", desc: "SaaS, AI, automation", photo: technologyPhoto, y: [0, 50, 30, -80], r: [20, -10, 60, 5] },
  { num: "05", title: "Understand", desc: "Data and analytics", photo: productsPhoto, y: [0, 55, -15, 30], r: [25, -15, 60, 95] },
  { num: "06", title: "Grow", desc: "Customers, revenue, scale", photo: workshopPhoto, y: [0, 45, -5, 20], r: [-20, 10, -50, 40] },
];

/** Each card flies for half of the section's scroll; starts are spread so the last one lands at the end. */
const FLIGHT = 0.5;
const STAGGER = (1 - FLIGHT) / (STEPS.length - 1);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Position along a 4-point path for flight progress p (0 → 1). */
function along(points: [number, number, number, number], p: number) {
  const s = p * 3;
  const i = Math.min(Math.floor(s), 2);
  return lerp(points[i], points[i + 1], s - i);
}

function Card({ step, index, progress }: { step: Step; index: number; progress: MotionValue<number> }) {
  const flight = useTransform(progress, (p) => Math.max(0, Math.min((p - index * STAGGER) / FLIGHT, 1)));
  // Enters just past the right edge, sweeps across and leaves past the left edge.
  const x = useTransform(flight, (f) => `${lerp(25, -650, f)}%`);
  const y = useTransform(flight, (f) => `${along(step.y, f)}%`);
  const rotate = useTransform(flight, (f) => along(step.r, f));
  const opacity = useTransform(flight, (f) => (f > 0 && f < 1 ? 1 : 0));
  // Alternating red / deep-red cards with gold accents.
  const red = index % 2 === 0;

  return (
    <m.li
      style={{ x, y, rotate, opacity }}
      className={`absolute left-full top-[11%] flex h-[min(30rem,44svh)] w-[calc(min(30rem,44svh)*0.68)] flex-col md:h-[min(30rem,56svh)] md:w-[calc(min(30rem,56svh)*0.66)] rounded-[var(--radius-md)] p-2 shadow-[0_28px_60px_-18px_rgb(158_16_38/0.55)] ${red ? "bg-red" : "bg-red-deep"}`}
    >
      <div className="relative h-[42%] overflow-hidden rounded-[calc(var(--radius-md)-6px)]">
        <Image src={step.photo} alt="" fill sizes="20rem" placeholder="blur" className="object-cover" />
        <span
          className={`absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm font-bold md:h-12 md:w-12 ${
            red ? "bg-gold text-red-deep" : "bg-ivory text-red"
          }`}
        >
          {step.num}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between p-3 text-ivory md:p-4">
        <h3 className="font-display text-[clamp(1.35rem,3.6svh,2.6rem)] font-extrabold uppercase leading-none tracking-tight">
          {step.title}
          <span className="text-gold">.</span>
        </h3>
        <p className="text-[0.8rem] leading-snug text-gold-light/90 md:text-base">{step.desc}</p>
      </div>
    </m.li>
  );
}

/**
 * Pinned for several screens: a giant headline slides sideways behind while the six steps fly in
 * from the right one after another, each on its own swooping path, and leave to the left.
 * Everything is tied to scroll position, so it plays backwards when scrolling up.
 */
export function MoneySystemSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const overflow = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const headlineX = useTransform(() => -scrollYProgress.get() * overflow.get());

  useEffect(() => {
    const measure = () => {
      const el = headlineRef.current;
      if (el) overflow.set(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (headlineRef.current) ro.observe(headlineRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [overflow]);

  return (
    <section ref={sectionRef} id="system" className="relative h-[600svh] bg-ivory">
      <div className="sticky top-0 h-svh overflow-hidden">
        <m.h2
          ref={headlineRef}
          style={{ x: headlineX }}
          className="absolute inset-y-0 left-0 flex w-max items-center whitespace-nowrap px-[var(--gutter)] font-display text-[30vw] font-extrabold uppercase leading-none tracking-[-0.05em] text-red lg:text-[24vw]"
        >
          Money-making&nbsp;
          <span className="bg-gradient-to-r from-red to-gold bg-clip-text text-transparent">system.</span>
        </m.h2>

        <div className="container-x absolute inset-x-0 bottom-[max(1.5rem,5svh)]">
          <div className="max-w-xs md:max-w-sm">
            <Eyebrow>The System</Eyebrow>
            <p className="mt-4 text-sm font-semibold leading-relaxed text-red-deep md:text-base">
              From attention to leads. From leads to customers. From customers to growth.
            </p>
          </div>
        </div>

        <ol aria-label="The six steps" className="absolute inset-0">
          {STEPS.map((step, i) => (
            <Card key={step.num} step={step} index={i} progress={scrollYProgress} />
          ))}
        </ol>
      </div>
    </section>
  );
}
