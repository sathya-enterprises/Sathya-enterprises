import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { meta } from "@/content/pages";
import { DivisionPage } from "@/components/division/DivisionPage";

export const metadata: Metadata = pageMeta({ ...meta.solutions, path: "/solutions", absoluteTitle: true });

export default function SolutionsPage() {
  return <DivisionPage id="solutions" />;
}
