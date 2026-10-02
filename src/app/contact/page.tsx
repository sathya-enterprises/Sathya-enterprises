import type { Metadata } from "next";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Mail, MapPin, Phone } from "lucide-react";
import { contact } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryForm } from "@/components/contact/EnquiryForm";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: `${contact.intro} Sathya Enterprises, ${contact.location}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Contact", path: "/contact" }])]} />
      <PageHero crumb="Contact" title={["Let's build", <span key="n" className="text-gold">{"what's next."}</span>]} intro={contact.intro} />

      <section aria-label="Get in touch" className="on-water container-x pb-24 sm:pb-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          {/* Direct details first on phones (one tap away), beside the form on desktop. */}
          <ul className="reveal-stagger space-y-6 border-t border-white/20 pt-6 lg:order-2 lg:self-start">
            <li>
              <p className="flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-gold">
                <Mail aria-hidden className="h-4 w-4" /> Email
              </p>
              <a href={`mailto:${contact.email.value}`} className="mt-1 block break-all font-display text-[1.25rem] font-extrabold hover:text-gold">
                {contact.email.value}
              </a>
            </li>
            {!contact.phone.placeholder && (
              <li>
                <p className="flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-gold">
                  <Phone aria-hidden className="h-4 w-4" /> Phone
                </p>
                <a href={`tel:${contact.phone.value.replace(/\s/g, "")}`} className="mt-1 block font-display text-[1.25rem] font-extrabold hover:text-gold">
                  {contact.phone.value}
                </a>
              </li>
            )}
            <li>
              <p className="flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-gold">
                <MapPin aria-hidden className="h-4 w-4" /> Location
              </p>
              <p className="mt-1 font-display text-[1.25rem] font-extrabold">{contact.location}</p>
            </li>
          </ul>

          <div className="reveal border-t border-white/20 pt-6 lg:order-1">
            <h2 className="mb-6 font-display text-[1.6rem] font-extrabold tracking-[-0.02em]">Send an enquiry</h2>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
