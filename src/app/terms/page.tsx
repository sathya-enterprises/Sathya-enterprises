import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { LegalPlaceholder } from "@/components/legal/LegalPlaceholder";

export const metadata: Metadata = pageMeta({ title: "Terms", description: "Terms for Sathya Enterprises — draft content to be added before launch.", path: "/terms", noindex: true });

export default function TermsPage() {
  return (
    <LegalPlaceholder
      crumb="Terms"
      title="TERMS OF SERVICE"
      body="This page will host the full Sathya Enterprises terms of service. Draft content to be added before launch."
    />
  );
}
