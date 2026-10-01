import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "The Sathya Money-Making System — attract, capture, convert, automate, understand, grow";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Technology — 12", title: "The Sathya Money-Making System", tone: "technology" });
}
