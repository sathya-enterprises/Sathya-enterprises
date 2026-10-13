import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { divisionById } from "@/content/site";
import { DivisionPage } from "@/components/division/DivisionPage";

const division = divisionById.technology;

export const metadata: Metadata = pageMeta({
  title: "SaaS, AI Automation, WhatsApp Solutions & Data",
  description: `${division.role} Sathya Enterprises Technology in Bengaluru: ${division.summary.slice(0, -1)} — software built to run the business.`,
  path: "/technology",
});

export default function TechnologyPage() {
  return <DivisionPage id="technology" tagline="Creates systems" title={["Software that", "creates systems."]} headline={["Business ", "systems."]} />;
}
