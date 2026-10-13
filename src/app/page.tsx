import type { Metadata } from "next";
import { brand } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { HeroParallax } from "@/components/home/HeroParallax";
import { StoryTelling } from "@/components/home/StoryTelling";
import { EcosystemCards } from "@/components/home/EcosystemCards";
import { MoneySystemSequence } from "@/components/home/MoneySystemSequence";
import { InvitationParallax } from "@/components/home/InvitationParallax";
import { CtaSection } from "@/components/home/CtaSection";

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
      <EcosystemCards />
      <MoneySystemSequence />
      <InvitationParallax />
      <CtaSection />
    </div>
  );
}
