import type { StaticImageData } from "next/image";
import type { Business, DivisionId } from "@/content/site";
import type { Step } from "./MoneySystemSequence";
import digitalPhoto from "@/assets/photos/digital.webp";
import technologyPhoto from "@/assets/photos/technology.webp";
import workshopPhoto from "@/assets/photos/workshop.webp";
import productsPhoto from "@/assets/photos/products.webp";
import teamPhoto from "@/assets/photos/team.webp";
import servicesPhoto from "@/assets/photos/services.webp";

/**
 * Business → card data for the home page's carousel (EcosystemCards) and flying cards
 * (MoneySystemSequence). A plain module, not "use client", so server pages can call it too.
 */

const PHOTOS: Record<DivisionId, StaticImageData[]> = {
  digital: [digitalPhoto, teamPhoto],
  technology: [technologyPhoto, workshopPhoto],
  solutions: [productsPhoto, servicesPhoto, workshopPhoto],
};

/** Card data for a list of businesses; photos cycle within each division. */
export function toCards(items: Business[]) {
  const seen: Record<string, number> = {};
  return items.map((b) => {
    const n = (seen[b.division] = (seen[b.division] ?? -1) + 1);
    return {
      slug: b.slug,
      title: b.name,
      division: b.division,
      description: b.intro,
      cta: b.cta,
      photo: PHOTOS[b.division][n % PHOTOS[b.division].length],
    };
  });
}

/** Flight paths for the flying cards, reused in turn (same values as MoneySystemSequence's own steps). */
const PATHS: Pick<Step, "y" | "r">[] = [
  { y: [10, 50, -10, 10], r: [20, -10, -45, 20] },
  { y: [0, 47.5, -10, 15], r: [-25, 15, -45, 30] },
  { y: [0, 52.5, -10, 5], r: [15, -5, -40, 60] },
  { y: [0, 50, 30, -80], r: [20, -10, 60, 5] },
  { y: [0, 55, -15, 30], r: [25, -15, 60, 95] },
  { y: [0, 45, -5, 20], r: [-20, 10, -50, 40] },
];

/** Each business as a flying card: its short name, and the first few things it does. */
export function toSteps(items: Business[]): Step[] {
  return toCards(items).map((c, i) => {
    const b = items[i];
    const what = b.groups.flatMap((g) => g.items.map((it) => it.label));
    return {
      num: String(i + 1).padStart(2, "0"),
      title: b.short,
      desc: what.length ? what.slice(0, 4).join(", ") : b.intro,
      photo: c.photo,
      ...PATHS[i % PATHS.length],
    };
  });
}
