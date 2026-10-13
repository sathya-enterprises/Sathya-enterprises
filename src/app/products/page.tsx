import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { divisionById } from "@/content/site";
import { DivisionPage } from "@/components/division/DivisionPage";

const division = divisionById.products;

export const metadata: Metadata = pageMeta({
  title: "SaaS Products, Data Products & Business Marketplace",
  description: `${division.role} Sathya Enterprises Products: ${division.summary.slice(0, -1)}, in one connected ecosystem.`,
  path: "/products",
});

export default function ProductsPage() {
  return <DivisionPage id="products" tagline="Data creates intelligence" title={["SaaS. Data.", "Marketplace. Physical."]} headline={["Product ", "lines."]} />;
}
