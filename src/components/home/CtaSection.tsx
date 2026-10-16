"use client";

import { useId, useRef, useState } from "react";
import { CalendarCheck, LayoutGrid, Mail, MessageCircle, MessagesSquare, type LucideIcon } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { contact, whatsappHref } from "@/content/site";
import { useArrival } from "@/lib/useArrival";

type Stop = { label: string; href: string; external?: boolean; Icon: LucideIcon };

/** Wheel radii on its canvas (centre 0,0): pie, "scroll to explore" ring, label band. */
const R_PIE = 200;
const R_RING = 300;
const R_RIM = 500;

/** Segment colours per band (label colour for the outer band), offset band to band like the reference. */
const OUTER = [
  { fill: "var(--color-red)", text: "var(--color-ivory)" },
  { fill: "var(--color-gold)", text: "var(--color-ink)" },
  { fill: "var(--color-red-deep)", text: "var(--color-gold)" },
  { fill: "var(--color-gold-tint)", text: "var(--color-red)" },
  { fill: "var(--color-ink)", text: "var(--color-gold)" },
];
const RING = ["var(--color-ink)", "var(--color-red)", "var(--color-gold)", "var(--color-red-deep)", "var(--color-gold-tint)"];
const RING_TEXT = ["var(--color-gold)", "var(--color-ivory)", "var(--color-ink)", "var(--color-gold)", "var(--color-red)"];
const PIE = ["var(--color-gold)", "var(--color-red-deep)", "var(--color-gold-tint)", "var(--color-red)", "var(--color-ink)"];

/**
 * Point at radius r and angle deg (0 = top, clockwise) on the wheel's canvas, as "x y". Rounded,
 * because the server's and the browser's Math.cos/sin can differ in the last digit and break hydration.
 */
function polar(r: number, deg: number) {
  const a = (deg - 90) * (Math.PI / 180);
  return `${Math.round(Math.cos(a) * r * 100) / 100} ${Math.round(Math.sin(a) * r * 100) / 100}`;
}

/** A wedge of the ring r0–r1 between angles a0 and a1 (a pie slice when r0 is 0). */
function wedge(r0: number, r1: number, a0: number, a1: number) {
  const outer = `${polar(r1, a0)} A ${r1} ${r1} 0 0 1 ${polar(r1, a1)}`;
  return r0 === 0 ? `M 0 0 L ${outer} Z` : `M ${outer} L ${polar(r0, a1)} A ${r0} ${r0} 0 0 0 ${polar(r0, a0)} Z`;
}

/** Clockwise arc at radius r from a0 to a1, for text to run along. */
function arc(r: number, a0: number, a1: number) {
  return `M ${polar(r, a0)} A ${r} ${r} 0 0 1 ${polar(r, a1)}`;
}

/**
 * Closing CTA, after southsidestory.in: a giant red-and-gold wheel sits at the foot of a pinned
 * screen in front of a sunburst. Each outer segment is one action, its label printed along the rim
 * and a medallion standing on top; a "scroll to explore" ring sits inside. Scrolling (or clicking the
 * ring) turns the wheel one segment — the sunburst turns the other way — bringing the next action
 * to the top. Turns are CSS transitions on a per-stop angle; nothing runs per frame.
 */
export function CtaSection({
  secondary = { href: "/#ecosystem", label: "Ecosystem" },
}: {
  /** Second stop, e.g. on to the next division. Keep it short — it's printed on the wheel. */
  secondary?: { href: string; label: string };
} = {}) {
  const stops: Stop[] = [
    { label: "Let's Talk", href: "/contact", Icon: MessagesSquare },
    { label: secondary.label, href: secondary.href, Icon: LayoutGrid },
    { label: "WhatsApp", href: whatsappHref(), external: true, Icon: MessageCircle },
    { label: "Email Us", href: `mailto:${contact.email.value}`, Icon: Mail },
    { label: "Book a Call", href: "/contact", Icon: CalendarCheck },
  ];
  const n = stops.length;
  const turn = 360 / n;
  const uid = useId();

  const ref = useRef<HTMLElement>(null);
  const arrived = useArrival(ref, "0px 0px -20% 0px");
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(n - 1, Math.max(0, Math.floor(p * n)));
    setActive((cur) => (cur === next ? cur : next));
  });

  /** Scroll to the middle of stop i's stretch, which turns the wheel there. */
  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / n) * travel, behavior: "smooth" });
  };
  const next = () => goTo((active + 1) % n);

  return (
    <section
      ref={ref}
      id="contact"
      data-arrived={arrived}
      aria-label="Get started"
      className="relative bg-gold-light"
      style={{ height: `${n * 60 + 100}svh` }}
    >
      <div className="cta-stage sticky top-0 h-svh overflow-hidden bg-gold-light">
        {/* Sunburst behind the wheel, turning the other way. */}
        <svg
          aria-hidden
          viewBox="-1000 -1000 2000 2000"
          className="cta-turn absolute left-1/2 top-[var(--cy)] h-[300vmax] w-[300vmax] max-w-none -translate-x-1/2 -translate-y-1/2"
          style={{ rotate: `${active * turn * 0.5}deg` }}
        >
          {Array.from({ length: 12 }, (_, k) => (
            <path
              key={k}
              d={`M 0 0 L ${polar(1000, k * 30 - 6)} L ${polar(1000, k * 30 + 6)} Z`}
              fill={k % 3 === 0 ? "var(--color-gold)" : k % 3 === 1 ? "var(--color-red)" : "var(--color-red-tint)"}
            />
          ))}
        </svg>

        {/* The wheel. Its canvas runs past the rim so the medallions on top fit. */}
        <div className="cta-wheel-in absolute left-1/2 top-[var(--cy)] h-[calc(var(--r)*3.6)] w-[calc(var(--r)*3.6)] -translate-x-1/2 -translate-y-1/2">
          <svg viewBox="-900 -900 1800 1800" className="cta-turn h-full w-full" style={{ rotate: `${-active * turn}deg` }}>
            <defs>
              {stops.map((_, i) => (
                <g key={i}>
                  <path id={`${uid}-l${i}`} d={arc(R_RING + 105, i * turn - turn / 2 + 2, i * turn + turn / 2 - 2)} />
                  <path id={`${uid}-r${i}`} d={arc(R_PIE + 64, i * turn + 3, (i + 1) * turn - 3)} />
                  <path id={`${uid}-s${i}`} d={arc(R_PIE + 30, i * turn + 3, (i + 1) * turn - 3)} />
                </g>
              ))}
            </defs>

            {stops.map(({ label, href, external, Icon }, i) => {
              const a0 = i * turn - turn / 2;
              const a1 = i * turn + turn / 2;
              const size = Math.min(70, Math.round(430 / (label.length * 0.74)));
              return (
                <g key={i}>
                  {/* Brand shapes either side of the medallion. */}
                  <g aria-hidden transform={`rotate(${i * turn})`}>
                    <circle cx="-150" cy="-560" r="44" fill="var(--color-gold)" />
                    <rect x="112" y="-612" width="78" height="78" rx="18" fill="var(--color-red)" transform="rotate(14 151 -573)" />
                  </g>

                  {/* The action: medallion on the rim plus its outer band, one link. */}
                  <a
                    href={href}
                    aria-label={label}
                    tabIndex={i === active ? 0 : -1}
                    className="cta-seg"
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    <g aria-hidden transform={`rotate(${i * turn})`}>
                      <circle cy="-660" r="128" fill="var(--color-ivory)" stroke="var(--color-red-deep)" strokeWidth="12" />
                      <circle cy="-660" r="100" fill={OUTER[i].fill} />
                      <Icon x={-58} y={-718} width={116} height={116} color={OUTER[i].text} strokeWidth={1.75} />
                    </g>
                    <path d={wedge(R_RING, R_RIM, a0, a1)} fill={OUTER[i].fill} />
                    <text
                      className="font-display font-extrabold uppercase"
                      fill={OUTER[i].text}
                      fontSize={size}
                      letterSpacing="-1"
                      dominantBaseline="middle"
                      textAnchor="middle"
                    >
                      <textPath href={`#${uid}-l${i}`} startOffset="50%">
                        {label}
                      </textPath>
                    </text>
                  </a>
                </g>
              );
            })}

            {/* "Scroll to explore" ring, offset half a segment: clicking it turns the wheel on. */}
            <g aria-hidden className="cursor-pointer" onClick={next}>
              {stops.map((_, i) => (
                <g key={i}>
                  <path d={wedge(R_PIE, R_RING, i * turn, (i + 1) * turn)} fill={RING[i]} />
                  <text className="font-mono font-bold" fill={RING_TEXT[i]} fontSize="22" letterSpacing="7" dominantBaseline="middle" textAnchor="middle">
                    <textPath href={`#${uid}-r${i}`} startOffset="50%">
                      SCROLL TO
                    </textPath>
                  </text>
                  <text className="font-mono font-bold" fill={RING_TEXT[i]} fontSize="22" letterSpacing="7" dominantBaseline="middle" textAnchor="middle">
                    <textPath href={`#${uid}-s${i}`} startOffset="50%">
                      EXPLORE
                    </textPath>
                  </text>
                </g>
              ))}
            </g>
            {/* Pie at the centre, offset again. */}
            {stops.map((_, i) => (
              <path key={i} aria-hidden d={wedge(0, R_PIE, i * turn - turn / 2, i * turn + turn / 2)} fill={PIE[i]} />
            ))}
            <circle aria-hidden r="34" fill="var(--color-ivory)" stroke="var(--color-red-deep)" strokeWidth="10" />
          </svg>
        </div>

        <button
          type="button"
          onClick={next}
          className="sr-only focus:not-sr-only focus:absolute focus:bottom-4 focus:left-1/2 focus:-translate-x-1/2 focus:rounded-full focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink"
        >
          Next: {stops[(active + 1) % n].label}
        </button>
      </div>
    </section>
  );
}
