"use client";

import { useSplitReveal } from "@/hooks/useGsapReveal";

export default function AboutSection() {
  const ref = useSplitReveal<HTMLDivElement>();

  return (
    <section className="section--gold" aria-labelledby="about-heading">
      <div className="container">
        <div ref={ref} className="split">
          <div>
            <span className="eyebrow">Who we are</span>
            <h2 id="about-heading" className="t-h2">
              MORE THAN A BUSINESS.<br />A GROWING ECOSYSTEM.
            </h2>
          </div>
          <div>
            <p className="t-lead">
              Sathya Enterprises operates across digital growth, technology,
              data, products, infrastructure and business services — built as
              one connected ecosystem rather than a collection of unrelated
              ventures. Every part of the business feeds the next: digital work
              creates attention, technology turns that attention into systems,
              and services and products deliver the real-world value customers
              came for.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
