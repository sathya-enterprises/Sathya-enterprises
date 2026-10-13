import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { divisionById } from "@/content/site";
import { DivisionPage } from "@/components/division/DivisionPage";

const division = divisionById.services;

export const metadata: Metadata = pageMeta({
  title: "Water Pumps, Borewell, CCTV, Travel, Interiors & Startup Consulting",
  description: `${division.role} Sathya Enterprises Services in Bengaluru: ${division.summary}`,
  path: "/services",
});

export default function ServicesPage() {
  return <DivisionPage id="services" tagline="Real-world value" title={["Services that", "deliver real-world value."]} headline={["In the ", "field."]} />;
}
