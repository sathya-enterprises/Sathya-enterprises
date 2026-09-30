"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Sathya Enterprises engineered a complete overhaul of our digital acquisition funnel. Our search rankings in Bengaluru jumped to the top tier within four months, and inbound inquiry volume increased by 240%.",
    author: "Ramesh Venkatesh",
    role: "Managing Director",
    company: "Zenon Commercial Products",
    vertical: "Digital Growth & SEO",
    metric: "+240%",
    metricLabel: "Inbound Pipeline Surge",
  },
  {
    id: 2,
    quote:
      "Their WhatsApp Business automation and CRM routing reduced our customer response time from hours to under 30 seconds. We converted 38% more qualified deals without having to expand our sales headcount.",
    author: "Priya Sharma",
    role: "Head of Operations",
    company: "NexaLogix Solutions",
    vertical: "Technology & Automation",
    metric: "+38%",
    metricLabel: "Lead-to-Deal Conversion",
  },
  {
    id: 3,
    quote:
      "From borewell groundwater survey and pump installation to facility-wide IP CCTV surveillance for our 4-acre commercial hub, Sathya provided seamless turnkey delivery with complete accountability.",
    author: "Karthik Narayanan",
    role: "VP of Infrastructure",
    company: "Deccan Logistics Hub",
    vertical: "Services & Engineering",
    metric: "100%",
    metricLabel: "Turnkey Accountability",
  },
  {
    id: 4,
    quote:
      "Emergency industrial pump installation and geophysical borewell survey delivered within 48 hours without halting manufacturing operations. Exceptional domain expertise.",
    author: "Anand Kulkarni",
    role: "Plant Director",
    company: "Precision Valves & Pumps",
    vertical: "Water & Ground Engineering",
    metric: "48h",
    metricLabel: "Emergency Turnaround",
  },
  {
    id: 5,
    quote:
      "Turnkey commercial workspace interior fit-out and biometric IP access control delivered for 3 commercial office hubs simultaneously. The craftsmanship and speed were best-in-class.",
    author: "Sneha Reddy",
    role: "Chief Development Officer",
    company: "Urban Living & Estates",
    vertical: "Interiors & IP Security",
    metric: "3 Hubs",
    metricLabel: "Multi-Site Deployment",
  },
  {
    id: 6,
    quote:
      "Managed corporate transportation and executive mobility fleet across Bengaluru with a 99.8% on-time dispatch track record and fully automated billing workflows.",
    author: "Vikramaditya Rao",
    role: "Director of Operations",
    company: "FinEdge Logistics",
    vertical: "Mobility & Fleet Systems",
    metric: "99.8%",
    metricLabel: "On-Time Dispatch Rate",
  },
];

const AUTOPLAY_MS = 5000;

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Compute responsive visible card count
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width <= 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - visibleCount);

  // Safe index normalization
  const goTo = useCallback(
    (newIndex: number) => {
      if (newIndex < 0) {
        setCurrentIndex(maxIndex);
      } else if (newIndex > maxIndex) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(newIndex);
      }
    },
    [maxIndex]
  );

  const prev = useCallback(() => {
    goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  const next = useCallback(() => {
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  // Autoplay loop with pause on hover
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setTimeout(() => {
      goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, maxIndex, isPaused, goTo]);

  // Section Entrance Animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector(".testimonials-container-inner"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom top",
            toggleActions: "play reset play reset",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section--dark"
      aria-labelledby="testimonials-heading"
      style={{ position: "relative", overflow: "hidden", paddingBlock: "var(--section-gap)" }}
    >
      {/* Background radial gold glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,168,75,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container testimonials-container-inner" style={{ position: "relative", zIndex: 1 }}>
        {/* Section Head: Google Labs Split Format */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          <div>
            <span className="eyebrow" style={{ color: "var(--color-gold)" }}>
              Client Voices & Field Case Studies
            </span>
            <h2
              id="testimonials-heading"
              className="t-h2"
              style={{ color: "var(--color-chalk)" }}
            >
              PROVEN IN THE FIELD
            </h2>
            <p className="t-lead" style={{ color: "rgba(255,253,248,0.7)", marginTop: "0.5rem" }}>
              How founders, enterprises, and operations leaders scale with our connected ecosystem.
            </p>
          </div>

          {/* Manual Controls & Window Counter */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "rgba(255,253,248,0.5)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              0{currentIndex + 1} &mdash; 0{Math.min(currentIndex + visibleCount, TESTIMONIALS.length)} / 0{TESTIMONIALS.length}
            </span>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial cards"
                className="carousel-ctrl-btn"
                style={{
                  width: "46px",
                  height: "46px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255,253,248,0.2)",
                  background: "rgba(255,253,248,0.03)",
                  color: "rgba(255,253,248,0.85)",
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  fontSize: "1.2rem",
                  borderRadius: "2px",
                }}
              >
                &larr;
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial cards"
                className="carousel-ctrl-btn"
                style={{
                  width: "46px",
                  height: "46px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255,253,248,0.2)",
                  background: "rgba(255,253,248,0.03)",
                  color: "rgba(255,253,248,0.85)",
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  fontSize: "1.2rem",
                  borderRadius: "2px",
                }}
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* 3-Card Carousel Track Container */}
        <div
          style={{
            overflow: "hidden",
            width: "100%",
            paddingBlock: "0.5rem",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={trackRef}
            className="carousel-track"
            style={{
              display: "flex",
              gap: "1.5rem",
              willChange: "transform",
              transition: "transform 0.65s cubic-bezier(0.2, 0.9, 0.2, 1)",
              transform: `translateX(calc(-1 * ${currentIndex} * ((100% - (${visibleCount} - 1) * 1.5rem) / ${visibleCount} + 1.5rem)))`,
            }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="carousel-card-slide"
                style={{
                  flex: `0 0 calc((100% - (${visibleCount} - 1) * 1.5rem) / ${visibleCount})`,
                  minWidth: `calc((100% - (${visibleCount} - 1) * 1.5rem) / ${visibleCount})`,
                  background: "linear-gradient(145deg, #141414 0%, #0c0c0c 100%)",
                  border: "1px solid rgba(255,253,248,0.12)",
                  padding: "2rem",
                  borderRadius: "2px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
                }}
              >
                <div>
                  {/* Top Bar: Vertical Pill + Outcome Metric Pill */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.75rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.625rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "0.25rem 0.6rem",
                        background: "rgba(200,168,75,0.12)",
                        color: "var(--color-gold)",
                        border: "1px solid rgba(200,168,75,0.25)",
                        borderRadius: "2px",
                        fontWeight: 700,
                      }}
                    >
                      {t.vertical}
                    </span>

                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1rem",
                        fontWeight: 900,
                        color: "var(--color-gold)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {t.metric}
                    </span>
                  </div>

                  {/* Decorative Quote Mark */}
                  <span
                    aria-hidden="true"
                    style={{
                      display: "block",
                      fontFamily: "Georgia, serif",
                      fontSize: "3rem",
                      color: "var(--color-gold)",
                      lineHeight: 0.8,
                      marginBottom: "0.75rem",
                      opacity: 0.4,
                    }}
                  >
                    &ldquo;
                  </span>

                  {/* Quote Body */}
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.65,
                      color: "rgba(255,253,248,0.85)",
                      fontStyle: "italic",
                      marginBottom: "2rem",
                    }}
                  >
                    {t.quote}
                  </p>
                </div>

                {/* Author Information */}
                <div
                  style={{
                    paddingTop: "1.25rem",
                    borderTop: "1px solid rgba(255,253,248,0.08)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                  }}
                >
                  {/* Monogram Avatar */}
                  <div
                    aria-hidden="true"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, var(--color-gold), rgba(200,168,75,0.35))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "0.95rem",
                      color: "var(--color-ink)",
                      flexShrink: 0,
                    }}
                  >
                    {t.author.charAt(0)}
                  </div>

                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "0.9375rem",
                        color: "var(--color-chalk)",
                        margin: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      {t.author}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6875rem",
                        color: "rgba(255,253,248,0.5)",
                        marginTop: "0.2rem",
                        letterSpacing: "0.03em",
                        margin: "0.2rem 0 0 0",
                      }}
                    >
                      {t.role} &middot;{" "}
                      <span style={{ color: "var(--color-gold)" }}>{t.company}</span>
                    </p>
                  </div>
                </div>

                {/* Bottom line accent */}
                <span className="card__line" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "2.5rem",
          }}
        >
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Jump to slide ${i + 1}`}
              style={{
                width: i === currentIndex ? "32px" : "8px",
                height: "6px",
                borderRadius: "9999px",
                backgroundColor:
                  i === currentIndex
                    ? "var(--color-gold)"
                    : "rgba(255,253,248,0.2)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.35s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .carousel-ctrl-btn:hover {
          border-color: var(--color-gold) !important;
          color: var(--color-gold) !important;
          background: rgba(200,168,75,0.08) !important;
        }
        .carousel-card-slide:hover {
          border-color: rgba(200,168,75,0.4) !important;
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.35);
        }
      `}</style>
    </section>
  );
}
