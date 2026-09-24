"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhoneIcon, MailIcon, MapPinIcon } from "@/components/ui/Icons";
import { useSplitReveal } from "@/hooks/useGsapReveal";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  "Digital Marketing",
  "Web Development",
  "SEO / SEM",
  "AI Automation",
  "SaaS Products",
  "WhatsApp Business Solutions",
  "Water Pumps / Borewell",
  "CCTV & Security",
  "Travels",
  "Interiors & Architecture",
  "Startup Consulting",
  "Other",
];

const CONTACT_INFO = [
  { label: "Email", value: "hello@sathyaenterprises.com", href: "mailto:hello@sathyaenterprises.com", icon: MailIcon },
  { label: "Phone", value: "+91 00000 00000", href: "tel:+910000000000", icon: PhoneIcon },
  { label: "Location", value: "Bengaluru, Karnataka, India", href: null, icon: MapPinIcon },
];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useSplitReveal<HTMLDivElement>();

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
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
    formRef.current?.reset();
  };

  return (
    <>
      {/* Page hero */}
      <section className="page-hero page-hero--gold" aria-labelledby="contact-heading">
        <div className="container" ref={heroRef}>
          <span className="eyebrow">Get in Touch</span>
          <h1 id="contact-heading" className="t-h2" style={{ maxWidth: "22ch", marginBottom: "1rem" }}>
            LET&apos;S BUILD WHAT&apos;S NEXT.
          </h1>
          <p className="t-lead">
            Tell us what you need. We&apos;ll get back to you within one business day.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section aria-label="Contact form and information">
        <div className="container">
          <div ref={gridRef} className="contact-grid">
            {/* Info side */}
            <div className="contact-info">
              <div>
                <span className="eyebrow">Reach us directly</span>
                {CONTACT_INFO.map(({ label, value, href, icon: Icon }) => (
                  <div key={label} className="contact-info-item" style={{ marginBottom: "1.25rem" }}>
                    <span className="contact-info-item__label">
                      <Icon size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: "0.35rem" }} />
                      {label}
                    </span>
                    {href ? (
                      <a className="contact-info-item__value" href={href}>{value}</a>
                    ) : (
                      <span className="contact-info-item__value">{value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: "2rem", borderTop: "1px solid var(--color-line)" }}>
                <span className="eyebrow">Business hours</span>
                <p className="t-body" style={{ marginTop: "0.5rem" }}>
                  Monday – Saturday<br />
                  9:00 AM – 7:00 PM IST
                </p>
              </div>

              <div style={{ paddingTop: "2rem", borderTop: "1px solid var(--color-line)" }}>
                <span className="eyebrow">Response time</span>
                <p className="t-body" style={{ marginTop: "0.5rem" }}>
                  We typically respond within<br />
                  <strong>1 business day</strong>.
                </p>
              </div>
            </div>

            {/* Form side */}
            <div>
              {status === "success" ? (
                <div style={{
                  padding: "3rem 2rem",
                  border: "1px solid var(--color-line)",
                  background: "var(--color-surface)",
                  textAlign: "center",
                }}>
                  <span className="eyebrow" style={{ color: "var(--color-gold)" }}>Message sent</span>
                  <h2 className="t-h2" style={{ fontSize: "1.75rem", marginTop: "0.5rem", marginBottom: "0.75rem" }}>
                    We&apos;ll be in touch!
                  </h2>
                  <p className="t-body">
                    Thank you for reaching out. Our team will get back to you within one business day.
                  </p>
                  <button
                    className="btn btn--secondary"
                    style={{ marginTop: "2rem" }}
                    onClick={() => setStatus("idle")}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  className="contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="first_name" className="form-label">First Name *</label>
                      <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        className="form-input"
                        required
                        placeholder="Rajesh"
                        autoComplete="given-name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="last_name" className="form-label">Last Name</label>
                      <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        className="form-input"
                        placeholder="Kumar"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-input"
                      required
                      placeholder="rajesh@company.com"
                      autoComplete="email"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="form-input"
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service" className="form-label">Service Interested In</label>
                    <select id="service" name="service" className="form-select">
                      <option value="">— Select a service —</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-textarea"
                      required
                      placeholder="Tell us about your project, requirements, or questions…"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn--lg"
                    disabled={status === "loading"}
                    style={{ alignSelf: "flex-start" }}
                  >
                    {status === "loading" ? "Sending…" : "Send Message →"}
                  </button>

                  {status === "error" && (
                    <p style={{ color: "var(--color-red)", fontSize: "0.875rem" }}>
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
