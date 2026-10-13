import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";

const body =
  "This page will host the full Sathya Enterprises privacy policy, covering what information is collected across our websites and services, how it is used, and how it is protected. Draft content to be added before launch.";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description: "How Sathya Enterprises collects, uses and protects information across its websites and services.",
  path: "/privacy-policy",
  noindex: true,
});

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" body={body} />;
}
