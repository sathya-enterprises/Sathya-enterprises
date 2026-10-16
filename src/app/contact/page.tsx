import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { contact, whatsappHref } from "@/content/site";
import { contactPage, meta } from "@/content/pages";
import { StartGrowing } from "@/components/home/StartGrowing";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { WhatsAppIcon } from "@/components/layout/SocialIcon";
import { Faq, PageIntro, Section, SectionHeading } from "@/components/inner/Sections";

export const metadata: Metadata = pageMeta({ ...meta.contact, path: "/contact", absoluteTitle: true });

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: contactPage.faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ContactPage() {
  const details = [
    { Icon: Mail, label: "Email", value: contact.email.value, href: `mailto:${contact.email.value}` },
    // The phone number is still a placeholder — listed once it's real.
    ...(!contact.phone.placeholder
      ? [{ Icon: Phone, label: "Phone", value: contact.phone.value, href: `tel:${contact.phone.value.replace(/\s/g, "")}` }]
      : []),
    { Icon: WhatsAppIcon, label: "WhatsApp", value: contact.whatsapp.value, href: whatsappHref(), external: true },
    { Icon: MapPin, label: "Office", value: contact.location },
    { Icon: Clock, label: "Hours", value: contactPage.hours },
  ];

  return (
    <div className="min-h-screen bg-gold">
      <JsonLd data={[breadcrumbLd([{ name: "Contact", path: "/contact" }]), faqLd]} />

      <PageIntro kicker="Contact" title="Let's talk growth" lead={<p>{contactPage.intro}</p>} actions={false}>
        <ul className="divide-y divide-ivory/15 overflow-hidden rounded-[28px] bg-red shadow-2">
          {details.map(({ Icon, label, value, href, external }) => {
            const body = (
              <>
                <span className="inline-flex shrink-0 rounded-2xl bg-gold p-3 text-red">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span>
                  <span className="t-eyebrow block text-gold">{label}</span>
                  <span className="mt-1 block break-words text-lg font-bold text-ivory">{value}</span>
                </span>
              </>
            );
            const row = "flex items-center gap-4 p-5";
            return (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className={`${row} transition-colors hover:bg-red-deep`}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={row}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </PageIntro>

      <StartGrowing tone="gold" />

      <Section id="faq-title">
        <div className="mx-auto max-w-3xl">
          <SectionHeading id="faq-title" title="Frequently asked questions" center />
          <Faq items={contactPage.faq} />
        </div>
      </Section>

      <WhatsAppButton />
    </div>
  );
}
