import { businessBySlug, divisionById } from "@/content/site";
import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { titleCase } from "@/lib/seo";

export const alt = "Sathya Enterprises";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = businessBySlug[slug];
  const d = divisionById[b.division];
  return ogImage({ eyebrow: `${d.name} — ${b.name}`, title: titleCase(b.headline), tone: b.division });
}
