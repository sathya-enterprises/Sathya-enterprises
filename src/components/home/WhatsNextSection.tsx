"use client";

import { useRevealOnScroll } from "@/hooks/useGsapReveal";

const UPCOMING = [
  {
    title: "NEW BUSINESS",
    body: "Every new vertical we take on connects back to the same ecosystem.",
  },
  {
    title: "NEW PRODUCT",
    body: "From SaaS modules to data products, the product line keeps expanding.",
  },
  {
    title: "NEW TECHNOLOGY",
    body: "AI, automation and data tooling get adopted as soon as they add value.",
  },
  {
    title: "NEW PARTNERSHIP",
    body: "Service providers and partners extend what Sathya Enterprises can deliver.",
  },
];

export default function WhatsNextSection() {
  const ref = useRevealOnScroll<HTMLDivElement>(0.1);

  return (
    <section aria-labelledby="next-heading">
      <div className="container">
        <div className="section-head section-head--center">
          <div className="section-head__main" style={{ margin: "0 auto" }}>
            <span className="eyebrow">Looking Ahead</span>
            <h2 id="next-heading" className="t-h2">WHAT&apos;S NEXT?</h2>
          </div>
        </div>

        <div ref={ref} className="grid grid--4">
          {UPCOMING.map((item) => (
            <div key={item.title} className="card">
              <h3 className="card__title">{item.title}</h3>
              <p className="t-body">{item.body}</p>
              <span className="card__line" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
