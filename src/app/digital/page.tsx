import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { meta } from "@/content/pages";
import { DivisionPage } from "@/components/division/DivisionPage";

export const metadata: Metadata = pageMeta({ ...meta.digital, path: "/digital", absoluteTitle: true });

export default function DigitalPage() {
  return <DivisionPage id="digital" />;
}
