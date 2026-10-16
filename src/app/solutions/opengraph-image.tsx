import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Sathya Enterprises — Solutions deliver real-world value.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "03 · Solutions", title: "Solutions deliver real-world value.", tone: "solutions" });
}
