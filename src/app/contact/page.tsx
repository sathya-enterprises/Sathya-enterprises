import type { Metadata } from "next";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Suspense } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { brand, contact } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { CoreMark } from "@/components/brand/CoreMark";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: `${contact.intro} Sathya Enterprises, ${contact.location}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Contact", path: "/contact" }])]} />
      <PageHero
        crumb="Contact"
        index="25"
        title={["LET'S BUILD", <span key="n" className="text-red">{"WHAT'S NEXT."}</span>]}
        intro={contact.intro}
      />

      <section className="pb-[var(--section-y)]">
        <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
          <Suspense fallback={<div className="min-h-[640px]" />}>
            <EnquiryForm />
          </Suspense>

          <aside className="lg:pt-1">
            <div className="sticky top-[calc(var(--header-h)+2rem)] space-y-6">
              <div data-tone="technology" className="tone rounded-lg p-8">
                <p className="t-eyebrow text-gold">Reach Us</p>
                <p className="mt-2 font-display text-[1.5rem] font-extrabold tracking-[-0.02em]">Direct Contact</p>
                <ul className="mt-8 space-y-5 text-[0.95rem]">
                  <li className="flex gap-3">
                    <Phone aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>
                      {contact.phone.value}
                      {contact.phone.placeholder && (
                        <span className="ml-2 rounded-full border border-[color:var(--tone-line)] px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[color:var(--tone-soft)]">
                          Placeholder
                        </span>
                      )}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Mail aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <a className="link-draw" href={`mailto:${contact.email.value}`}>
                      {contact.email.value}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {contact.location}
                  </li>
                </ul>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-gold-light p-6">
                <CoreMark size={40} />
                <p className="font-mono text-[0.7rem] font-bold leading-relaxed tracking-[0.14em] text-red-deep">
                  {brand.verbs.slice(0, 2).join(" ")}
                  <br />
                  {brand.verbs.slice(2).join(" ")}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
