import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";

const body = "This page will host the full Sathya Enterprises terms of service. Draft content to be added before launch.";

export const metadata: Metadata = pageMeta({
  title: "Terms of Service",
  description: "The terms that apply to using Sathya Enterprises websites and services.",
  path: "/terms",
  noindex: true,
});

export default function TermsPage() {
  return <LegalPage title="Terms of Service" body={body} />;
}
