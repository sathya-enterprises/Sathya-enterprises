"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon } from "@/components/ui/Icons";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    num: "01",
    title: "ATTRACT",
    chips: ["Digital Marketing", "Instagram Marketing", "SEO", "SEM"],
  },
  {
    num: "02",
    title: "CAPTURE",
    chips: ["Website", "Landing Pages", "Lead Generation"],
  },
  {
    num: "03",
    title: "CONVERT",
    chips: ["CRM", "WhatsApp", "Follow-up"],
  },
  {
    num: "04",
    title: "AUTOMATE",
    chips: ["SaaS", "AI", "Automation"],
  },
  {
    num: "05",
    title: "UNDERSTAND",
    chips: ["Data", "Analytics"],
  },
  {
    num: "06",
    title: "GROW",
    chips: ["Customers", "Revenue", "Scale"],
  },
];

export default function MoneySystemSection() {
  const lineRef = useRef<SVGLineElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !lineRef.current) return;

    const stages = Array.from(wrap.querySelectorAll<HTMLElement>(".money-stage"));

    // Set initial state — visible by default, animate from there
    gsap.set(stages, { opacity: 0.45, x: 0 });

    const ctx = gsap.context(() => {
      // Stagger entrance — start from opacity 0, end at their resting 0.45
      gsap.fromTo(
        stages,
        { opacity: 0, x: -20 },
        {
          opacity: 0.45,
          x: 0,
          stagger: 0.1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrap,
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play reset play reset",
            onEnter: () => {
              // Highlight active stage after entrance
              gsap.to(stages[activeIdx], { opacity: 1, duration: 0.3 });
            },
            onEnterBack: () => {
              gsap.to(stages[activeIdx], { opacity: 1, duration: 0.3 });
            },
          },
        }
      );

      // Scrub the vertical progress line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { strokeDasharray: "0 1" },
          {
            strokeDasharray: "1 0",
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top 70%",
              end: "bottom 55%",
              scrub: 0.6,
            },
          }
        );
      }

      // Scroll-driven active stage highlight
      stages.forEach((stage, i) => {
        ScrollTrigger.create({
          trigger: stage,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            stages.forEach((s, j) =>
              gsap.to(s, { opacity: j === i ? 1 : 0.45, duration: 0.25 })
            );
            setActiveIdx(i);
          },
          onEnterBack: () => {
            stages.forEach((s, j) =>
              gsap.to(s, { opacity: j === i ? 1 : 0.45, duration: 0.25 })
            );
            setActiveIdx(i);
          },
        });
      });
    }, wrap);

    return () => ctx.revert();
  }, [activeIdx]);

  return (
    <section
      aria-labelledby="system-heading"
      style={{
        borderTop: "1px solid var(--color-line)",
        borderBottom: "1px solid var(--color-line)",
        paddingBlock: "clamp(4rem, 8vw, 7rem)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "start",
          }}
        >
          {/* LEFT: sticky section head */}
          <div style={{ position: "sticky", top: "6rem" }}>
            <span className="eyebrow">The System</span>
            <h2
              id="system-heading"
              className="t-h2"
              style={{ marginBottom: "1rem" }}
            >
              THE SATHYA MONEY-MAKING SYSTEM
            </h2>
            <p className="t-lead">
              From attention to leads. From leads to customers. From customers to
              growth.
            </p>
            <div style={{ marginTop: "2rem" }}>
              <Link className="btn btn--secondary" href="/ecosystem">
                <span className="btn__label">See the Full System</span>
                <ArrowRightIcon />
              </Link>
            </div>
          </div>

          {/* RIGHT: money stages */}
          <div className="money-system-wrap" ref={wrapRef}>
            {/* Vertical progress line */}
            <div className="money-timeline" aria-hidden="true">
              <svg
                width="28"
                viewBox="0 0 28 600"
                preserveAspectRatio="none"
                style={{ width: "2px", height: "100%", overflow: "visible" }}
              >
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="600"
                  stroke="var(--color-line)"
                  strokeWidth="2"
                />
                <line
                  ref={lineRef}
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="600"
                  stroke="var(--color-gold)"
                  strokeWidth="2"
                  pathLength="1"
                  strokeDasharray="0 1"
                />
              </svg>
            </div>

            <div className="money-stages">
              {STAGES.map((stage, i) => (
                <div
                  key={stage.num}
                  className={`money-stage${i === activeIdx ? " is-active" : ""}`}
                  style={{ opacity: 1 }} /* CSS fallback — GSAP takes over */
                >
                  <div className="money-stage__dot" aria-hidden="true" />
                  <span className="money-stage__num">{stage.num}</span>
                  <div className="money-stage__body">
                    <h3 className="money-stage__title">{stage.title}</h3>
                    <div className="money-stage__items">
                      {stage.chips.map((chip) => (
                        <span key={chip} className="chip">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
