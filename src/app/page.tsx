import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { brand } from "@/content/site";
import { Hero } from "@/components/home/Hero";
import { BusinessMarquee } from "@/components/home/BusinessMarquee";
import { Statement } from "@/components/home/Statement";
import { EcosystemExplorer } from "@/components/home/EcosystemExplorer";
import { SystemJourney } from "@/components/system/SystemJourney";
import { BusinessIndex } from "@/components/home/BusinessIndex";
import { Outlook } from "@/components/home/Outlook";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = pageMeta({
  title: "Sathya Enterprises — Digital, Technology, Products & Services | Bengaluru",
  description: `${brand.positioning} ${brand.summary}`,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <Hero />
      <BusinessMarquee />
      <Statement />
      <EcosystemExplorer />
      <SystemJourney />
      <BusinessIndex />
      <Outlook />
      <FinalCta />
    </>
  );
}
