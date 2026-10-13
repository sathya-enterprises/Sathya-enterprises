import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { divisionById } from "@/content/site";
import { DivisionPage } from "@/components/division/DivisionPage";

const division = divisionById.digital;

export const metadata: Metadata = pageMeta({
  title: "Digital Marketing, Websites, SEO & Lead Generation",
  description: `${division.role} Sathya Enterprises Digital in Bengaluru: ${division.summary.slice(0, -1)} — one growth system.`,
  path: "/digital",
});

export default function DigitalPage() {
  return <DivisionPage id="digital" tagline="Creates attention" title={["Every channel that", "creates attention."]} headline={["Digital ", "growth."]} />;
}
