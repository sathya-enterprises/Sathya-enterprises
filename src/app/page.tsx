import type { Metadata } from "next";
import { brand } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { HeroParallax } from "@/components/home/HeroParallax";
import { StoryTelling } from "@/components/home/StoryTelling";
import { FounderSection } from "@/components/home/FounderSection";
import { EcosystemCards } from "@/components/home/EcosystemCards";
import { MoneySystemSequence } from "@/components/home/MoneySystemSequence";
import { GlobalReach } from "@/components/home/GlobalReach";
import { BlogTeaser } from "@/components/home/BlogTeaser";
import { InvitationParallax } from "@/components/home/InvitationParallax";
import { CtaSection } from "@/components/home/CtaSection";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = pageMeta({
  title: "Sathya Enterprises — Build. Market. Lead. Grow.",
  description: brand.summary,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-ivory">
      <HeroParallax />
      <StoryTelling />
      <FounderSection />
      <EcosystemCards />
      <MoneySystemSequence />
      <GlobalReach />
      <BlogTeaser />
      <InvitationParallax />
      <CtaSection />
      <WhatsAppButton />
    </div>
  );
}
