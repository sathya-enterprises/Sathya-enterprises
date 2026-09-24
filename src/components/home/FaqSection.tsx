"use client";

import { useState } from "react";
import { useRevealOnScroll } from "@/hooks/useGsapReveal";

const FAQS = [
  {
    q: "Can I engage Sathya Enterprises for just a single service or vertical?",
    a: "Yes, absolutely. Many clients start with a single immediate requirement — such as SEO optimization, high-speed website development, industrial water pump installation, or CCTV security. As your business grows, the rest of our ecosystem is ready to plug in without needing new vendor searches.",
  },
  {
    q: "How does the 6-stage Money-Making System create measurable ROI?",
    a: "The system is an engineered flywheel. We begin by driving qualified traffic (ATTRACT), converting visitors on high-speed pages (CAPTURE), automating follow-ups and CRM via WhatsApp (CONVERT), automating operations with AI and SaaS tools (AUTOMATE), tracking data metrics (UNDERSTAND), and scaling profit margins (GROW).",
  },
  {
    q: "Where are your physical engineering and infrastructure services available?",
    a: "Our physical services — including water pump systems, borewell drilling, CCTV security surveillance, corporate travels, and interior architecture — operate across Bengaluru, Karnataka, and major regional corridors in South India. Our digital, SaaS, and AI automation solutions operate globally.",
  },
  {
    q: "How fast can we launch an engagement with your team?",
    a: "We believe in rapid deployment. After our initial diagnostic scoping call, digital and tech projects typically initiate within 48 to 72 hours. Emergency physical services (such as water pump maintenance or borewell assistance) offer same-day or priority dispatch.",
  },
  {
    q: "How does having marketing, software, and physical services under one roof help me?",
    a: "Conventional agencies operate in silos — developers blame designers, and marketers blame developers. Sathya Enterprises owns the entire lifecycle. You get a single, accountable partner delivering marketing momentum, automated software, and physical execution without communication breakdowns.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const listRef = useRevealOnScroll<HTMLDivElement>(0.08);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section aria-labelledby="faq-heading">
      <div className="container max-w-4xl">
        <div className="section-head section-head--center">
          <div className="section-head__main" style={{ margin: "0 auto" }}>
            <span className="eyebrow">Clarity</span>
            <h2 id="faq-heading" className="t-h2">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="t-lead" style={{ margin: "0.75rem auto 0", textAlign: "center" }}>
              Everything you need to know about partnering with the Sathya ecosystem.
            </p>
          </div>
        </div>

        <div
          ref={listRef}
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                style={{
                  border: "1px solid var(--color-line)",
                  backgroundColor: isOpen ? "var(--color-surface)" : "var(--color-chalk)",
                  transition: "background-color 0.2s, border-color 0.2s",
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.25rem 1.5rem",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "1rem",
                      color: "var(--color-ink)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.35,
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: isOpen ? "var(--color-red)" : "var(--color-gold)",
                      lineHeight: 1,
                      flexShrink: 0,
                      width: "20px",
                      textAlign: "center",
                      transition: "transform 0.2s",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 1.5rem 1.5rem 1.5rem",
                      borderTop: "1px solid var(--color-line)",
                      paddingTop: "1rem",
                    }}
                  >
                    <p
                      className="t-body"
                      style={{
                        fontSize: "0.9375rem",
                        lineHeight: 1.65,
                        color: "var(--color-ink-soft)",
                        margin: 0,
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
