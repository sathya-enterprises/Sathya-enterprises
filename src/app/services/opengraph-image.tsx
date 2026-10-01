import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Sathya Enterprises Services — water pumps, borewell, CCTV, travel, interiors, architecture and startup support";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "04 — Services", title: "Services deliver real-world value.", tone: "services" });
}
