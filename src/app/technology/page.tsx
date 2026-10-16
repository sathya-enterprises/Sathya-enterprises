import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { meta } from "@/content/pages";
import { DivisionPage } from "@/components/division/DivisionPage";

export const metadata: Metadata = pageMeta({ ...meta.technology, path: "/technology", absoluteTitle: true });

export default function TechnologyPage() {
  return <DivisionPage id="technology" />;
}
