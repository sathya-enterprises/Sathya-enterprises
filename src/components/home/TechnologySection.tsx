"use client";

import Link from "next/link";
import { useRevealOnScroll } from "@/hooks/useGsapReveal";
import {
  CpuIcon,
  BotIcon,
  MessageCircleIcon,
  DatabaseIcon,
  ZapIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@/components/ui/Icons";

const TECH_VERTICALLY_INTEGRATED = [
  {
    num: "SYS-01",
    label: "Money-Making System",
    href: "/money-making-system",
    badge: "Flagship Architecture",
    featured: true,
    desc: "An end-to-end automated commercial flywheel connecting top-of-funnel algorithmic traffic directly to CRM pipelines, automated follow-ups, and recurring revenue realization.",
    icon: ZapIcon,
    metrics: "Automated · Multi-Channel · Real-Time",
    tags: ["Lead Capture", "Instant Routing", "Stripe / Razorpay", "Zero Dropoff"],
  },
  {
    num: "SYS-02",
    label: "Enterprise SaaS Products",
    href: "/saas-products",
    badge: "Cloud Software",
    featured: false,
    desc: "Specialized, lightweight B2B applications engineered to replace cumbersome legacy workflows with zero-latency cloud systems.",
    icon: CpuIcon,
    metrics: "Multi-Tenant · 99.9% Uptime",
    tags: ["React 19", "Microservices", "REST & GraphQL"],
  },
  {
    num: "SYS-03",
    label: "AI Workflow Automation",
    href: "/ai-automation",
    badge: "Autonomous Agents",
    featured: false,
    desc: "Deploy customized LLM agents, automated document extraction, and intelligent customer triage without expanding payroll.",
    icon: BotIcon,
    metrics: "24/7 Agent Availability",
    tags: ["LLM Orchestration", "Python Pipelines", "OCR & Vision"],
  },
  {
    num: "SYS-04",
    label: "WhatsApp Business Solutions",
    href: "/whatsapp-business-solutions",
    badge: "Conversational Commerce",
    featured: false,
    desc: "Official Meta Cloud API integrations: automated catalog browsing, transactional alerts, OTP validation, and support routing.",
    icon: MessageCircleIcon,
    metrics: "98% Read Rates within 5m",
    tags: ["Meta Cloud API", "Chatbot Logic", "Payment Gateway"],
  },
  {
    num: "SYS-05",
    label: "Data & Business Intelligence",
    href: "/data-solutions",
    badge: "Analytics Engine",
    featured: false,
    desc: "Unified analytics dashboards, warehousing, and predictive modeling that provide immediate operational clarity for executives.",
    icon: DatabaseIcon,
    metrics: "Sub-Second Querying",
    tags: ["ETL Pipelines", "Data Warehousing", "Executive KPI"],
  },
];

export default function TechnologySection() {
  const gridRef = useRevealOnScroll<HTMLDivElement>(0.1);

  return (
    <section aria-labelledby="tech-heading" className="section--gold">
      <div className="container">
        {/* Section Head */}
        <div className="section-head section-head--split">
          <div className="section-head__main">
            <span className="eyebrow">Technology Infrastructure</span>
            <h2 id="tech-heading" className="t-h2">
              ENGINEERED TO AUTOMATE
            </h2>
            <p className="t-lead" style={{ marginTop: "0.75rem" }}>
              Proprietary software products, intelligent automation bots, and high-throughput data pipes built for relentless operational scale.
            </p>
          </div>
          <div className="section-head__aside">
            <Link className="btn btn--secondary" href="/ecosystem#technology">
              <span>Explore Tech Suite</span>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>

        {/* Bento Grid - 3 Card Grid */}
        <div ref={gridRef} className="grid grid--3">
          {TECH_VERTICALLY_INTEGRATED.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.href}
                href={t.href}
                className="card tech-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "2rem",
                  background: t.featured
                    ? "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)"
                    : "#ffffff",
                  color: t.featured ? "var(--color-chalk)" : "var(--color-ink)",
                  gridColumn: t.featured ? "span 1" : undefined,
                  position: "relative",
                  overflow: "hidden",
                  border: t.featured
                    ? "1px solid rgba(200,168,75,0.4)"
                    : "1px solid var(--color-line)",
                }}
              >
                <div>
                  {/* Top Bar: Icon + Badge + Code */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: "46px",
                        height: "46px",
                        borderRadius: "10px",
                        background: t.featured
                          ? "rgba(200,168,75,0.15)"
                          : "var(--color-surface)",
                        border: t.featured
                          ? "1px solid rgba(200,168,75,0.3)"
                          : "1px solid var(--color-line)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: t.featured ? "var(--color-gold)" : "var(--color-ink)",
                      }}
                      className="tech-icon-box"
                    >
                      <Icon size={24} />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "9999px",
                          background: t.featured
                            ? "rgba(200,168,75,0.18)"
                            : "var(--color-surface)",
                          color: t.featured
                            ? "var(--color-gold)"
                            : "var(--color-ink-soft)",
                          fontWeight: 700,
                          border: t.featured
                            ? "1px solid rgba(200,168,75,0.35)"
                            : "1px solid var(--color-line)",
                        }}
                      >
                        {t.badge}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          letterSpacing: "0.12em",
                          color: "var(--color-gold)",
                          fontWeight: 700,
                        }}
                      >
                        {t.num}
                      </span>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3
                    className="card__title"
                    style={{
                      fontSize: "1.35rem",
                      fontWeight: 900,
                      lineHeight: 1.2,
                      marginBottom: "0.75rem",
                      color: t.featured ? "#ffffff" : "var(--color-ink)",
                    }}
                  >
                    {t.label}
                  </h3>

                  <p
                    className="t-body"
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.65,
                      color: t.featured
                        ? "rgba(255,253,248,0.78)"
                        : "var(--color-ink-soft)",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {t.desc}
                  </p>
                </div>

                {/* Bottom Meta & Tags */}
                <div>
                  {/* Highlight Metric */}
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--color-gold)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "var(--color-gold)",
                      }}
                    />
                    {t.metrics}
                  </div>

                  {/* Tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.35rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          letterSpacing: "0.04em",
                          padding: "0.25rem 0.6rem",
                          background: t.featured
                            ? "rgba(255,253,248,0.06)"
                            : "var(--color-surface)",
                          border: t.featured
                            ? "1px solid rgba(255,253,248,0.12)"
                            : "1px solid var(--color-line)",
                          color: t.featured
                            ? "rgba(255,253,248,0.7)"
                            : "var(--color-ink-soft)",
                          borderRadius: "2px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Footer */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "0.85rem",
                      borderTop: t.featured
                        ? "1px solid rgba(255,253,248,0.1)"
                        : "1px solid var(--color-line)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--color-gold)",
                      }}
                    >
                      System Architecture
                    </span>
                    <ArrowUpRightIcon size={18} style={{ color: "var(--color-gold)" }} />
                  </div>
                </div>

                <span className="card__line" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
