import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { meta } from "@/content/pages";
import { DivisionPage } from "@/components/division/DivisionPage";

export const metadata: Metadata = pageMeta({ ...meta.services, path: "/services", absoluteTitle: true });

export default function ServicesPage() {
  return <DivisionPage id="services" />;
}
