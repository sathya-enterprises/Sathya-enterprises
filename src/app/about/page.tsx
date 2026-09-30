"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { useRevealOnScroll, useSplitReveal } from "@/hooks/useGsapReveal";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  { num: "01", title: "Connected by Design", body: "Every business we run feeds the next. Digital creates attention, technology turns attention into systems, and services deliver real-world value." },
  { num: "02", title: "Systems Over Tasks", body: "We don't just execute — we build repeatable, scalable systems that work even when we aren't actively involved." },
  { num: "03", title: "Attention Is Currency", body: "We understand that the first job of any business is to earn attention, and we've built an entire ecosystem around doing that well." },
  { num: "04", title: "Technology as Leverage", body: "AI, automation, and SaaS aren't buzzwords — they are the tools we use to deliver more value without proportionally growing costs." },
  { num: "05", title: "Service First", body: "Every product, every service, every system we build is designed to solve a real problem for a real person in the real world." },
  { num: "06", title: "Open to Partners", body: "Sathya Enterprises is an open network. We actively look for partners, vendors, and collaborators who share our values." },
];

const TIMELINE = [
  { year: "2020", event: "Founded with a focus on digital marketing for local businesses in Bengaluru." },
  { year: "2022", event: "Expanded into technology — SaaS products, AI automation, and WhatsApp business solutions." },
  { year: "2023", event: "Launched the physical services arm: water pumps, borewell, CCTV, and travel." },
  { year: "2024", event: "Introduced interiors, architecture, and startup consulting to the ecosystem." },
  { year: "2025+", event: "Scaling the money-making system across 10+ verticals with an open partner network." },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const missionSplitRef = useSplitReveal<HTMLDivElement>();
  const valuesRef = useRevealOnScroll<HTMLDivElement>(0.1);
  const timelineRef = useRevealOnScroll<HTMLDivElement>(0.12);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Hero entrance & CTA scale animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          opacity: 0,
          y: 28,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
        });
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
              end: "bottom top",
              toggleActions: "play reset play reset",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Page hero */}
      <section className="page-hero page-hero--gold" aria-labelledby="about-heading">
        <div className="container" ref={heroRef}>
          <span className="eyebrow">About</span>
          <h1 id="about-heading" className="t-h2" style={{ maxWidth: "22ch", marginBottom: "1.5rem" }}>
            MORE THAN A BUSINESS.<br />A GROWING ECOSYSTEM.
          </h1>
          <p className="t-lead">
            Sathya Enterprises is a connected business ecosystem based in
            Bengaluru, India — operating across digital growth, technology, data,
            products, infrastructure and business services.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section aria-labelledby="mission-heading">
        <div className="container">
          <div ref={missionSplitRef} className="split">
            <div>
              <span className="eyebrow">Our Mission</span>
              <h2 id="mission-heading" className="t-h2">BUILD. MARKET. AUTOMATE. GROW.</h2>
            </div>
            <div>
              <p className="t-lead" style={{ marginBottom: "1.25rem" }}>
                Sathya Enterprises operates across digital growth, technology,
                data, products, infrastructure and business services — built as
                one connected ecosystem rather than a collection of unrelated
                ventures.
              </p>
              <p className="t-body">
                Every part of the business feeds the next: digital work creates
                attention, technology turns that attention into systems, and
                services and products deliver the real-world value customers came
                for. This isn&apos;t a portfolio of businesses — it&apos;s one system.
              </p>
              <div style={{ marginTop: "2rem" }}>
                <Link className="btn" href="/ecosystem">
                  Explore the Ecosystem <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section--gold" aria-labelledby="values-heading">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="section-head__main" style={{ margin: "0 auto" }}>
              <span className="eyebrow">What We Stand For</span>
              <h2 id="values-heading" className="t-h2">OUR PRINCIPLES</h2>
            </div>
          </div>
          <div ref={valuesRef} className="values-grid">
            {VALUES.map((v) => (
              <div key={v.num} className="value-item">
                <p className="value-item__num">{v.num}</p>
                <h3 className="value-item__title">{v.title}</h3>
                <p className="t-body">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section aria-labelledby="timeline-heading">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="section-head__main" style={{ margin: "0 auto" }}>
              <span className="eyebrow">Our Journey</span>
              <h2 id="timeline-heading" className="t-h2">HOW WE GOT HERE</h2>
            </div>
          </div>
          <div ref={timelineRef} style={{ maxWidth: "640px", margin: "3rem auto 0" }}>
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: "1.5rem",
                  paddingBottom: i < TIMELINE.length - 1 ? "2rem" : 0,
                  marginBottom: i < TIMELINE.length - 1 ? "2rem" : 0,
                  borderBottom: i < TIMELINE.length - 1 ? "1px solid var(--color-line)" : "none",
                }}
              >
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "var(--color-gold)",
                  letterSpacing: "0.08em",
                  paddingTop: "0.2rem",
                }}>
                  {item.year}
                </span>
                <p className="t-body">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section--gold">
        <div className="container">
          <div ref={ctaRef} className="cta-band">
            <h2 className="t-h2">WANT TO WORK WITH US?</h2>
            <p className="t-lead">Whether you need digital marketing, tech solutions, or physical services — let&apos;s talk.</p>
            <div className="btn-row" style={{ justifyContent: "center" }}>
              <Link className="btn btn--lg" href="/contact">
                Start a Conversation <ArrowRightIcon />
              </Link>
              <Link className="btn btn--secondary btn--lg" href="/ecosystem">
                See All Services <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
