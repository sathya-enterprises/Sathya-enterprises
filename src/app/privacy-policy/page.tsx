import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { LegalPlaceholder } from "@/components/legal/LegalPlaceholder";

export const metadata: Metadata = pageMeta({ title: "Privacy Policy", description: "Privacy Policy for Sathya Enterprises — draft content to be added before launch.", path: "/privacy-policy", noindex: true });

export default function PrivacyPage() {
  return (
    <LegalPlaceholder
      crumb="Privacy Policy"
      title="PRIVACY POLICY"
      body="This page will host the full Sathya Enterprises privacy policy, covering what information is collected across our websites and services, how it is used, and how it is protected. Draft content to be added before launch."
    />
  );
}
