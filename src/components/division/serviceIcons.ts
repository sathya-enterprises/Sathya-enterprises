import { Building2, Cctv, Drill, Droplets, Plane, Rocket, type LucideIcon } from "lucide-react";

/** Shared by server and client components, so it lives outside any "use client" module. */
export const serviceIcons: Record<string, LucideIcon> = {
  "water-pumps": Droplets,
  "borewell-services": Drill,
  "cctv-security": Cctv,
  travels: Plane,
  "interiors-architecture": Building2,
  "startup-consulting": Rocket,
};
