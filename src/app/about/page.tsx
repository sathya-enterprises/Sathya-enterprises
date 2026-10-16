import type { Metadata } from "next";
import { ChartLine, Compass, Network, Eye, Hammer, Handshake, Link2, MapPin, Plug, ShieldCheck, Target, Users } from "lucide-react";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { aboutPage, ctaBody, meta, onePartner } from "@/content/pages";
import { CtaSplit, FeatureFan, FeatureList, FeatureWheel, PageIntro, Section, SectionHeading, Steps } from "@/components/inner/Sections";
import whoWeArePhoto from "@/assets/story/who-we-are.webp";
import oneTeamPhoto from "@/assets/story/one-team.webp";

export const metadata: Metadata = pageMeta({ ...meta.about, path: "/about", absoluteTitle: true });

const PARTNER_ICONS = [Users, Plug, ChartLine, MapPin];
const VALUE_ICONS = [ShieldCheck, Eye, Hammer, Link2, Handshake];

export default function AboutPage() {
  const { whoWeAre, vision, mission, approach, valuesLead, values, process, cta } = aboutPage;

  return (
    <div className="min-h-screen bg-gold">
      <JsonLd data={[breadcrumbLd([{ name: "About", path: "/about" }])]} />

      <PageIntro
        kicker="About Sathya Enterprises"
        title="One enterprise. Multiple businesses. One connected ecosystem."
        lead={whoWeAre.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
        image={whoWeArePhoto}
      />

      <Section id="purpose-title" tone="red">
        <SectionHeading id="purpose-title" title="Why we exist" center />
        <FeatureFan
          label="Why we exist"
          items={[
            { Icon: Compass, title: "Our vision", body: vision },
            { Icon: Target, title: "Our mission", body: mission },
            { Icon: Network, title: "Our approach", body: approach },
          ]}
        />
      </Section>

      <Section id="partner-title">
        <FeatureList
          id="partner-title"
          title="Why one partner beats five vendors"
          lead="Most growing businesses juggle an agency, a web developer, an ads freelancer and a contractor. We replace the juggling with one team."
          items={onePartner.map((p, i) => ({ ...p, Icon: PARTNER_ICONS[i] }))}
        />
      </Section>

      <Section id="values-title" tone="red">
        <SectionHeading id="values-title" title="Our values" lead={valuesLead} center />
        <FeatureWheel label="Our values" items={values.map((v, i) => ({ Icon: VALUE_ICONS[i], title: v.title, body: v.body }))} />
      </Section>

      <Section id="process-title">
        <SectionHeading id="process-title" title="How we work" lead="From the first conversation to steady growth, in five steps." />
        <Steps items={process} />
      </Section>

      <CtaSplit heading={cta.heading} body={ctaBody} label={cta.label} image={oneTeamPhoto} />
    </div>
  );
}
