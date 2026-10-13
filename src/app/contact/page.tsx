import type { Metadata } from "next";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { contact } from "@/content/site";
import { HeroParallax } from "@/components/home/HeroParallax";
import { StartGrowing } from "@/components/home/StartGrowing";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: `${contact.intro} Sathya Enterprises, ${contact.location}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <JsonLd data={[breadcrumbLd([{ name: "Contact", path: "/contact" }])]} />
      <HeroParallax top="Contact" bottom="Let's build what's next" label="Contact Sathya Enterprises" />
      <StartGrowing />
    </div>
  );
}
