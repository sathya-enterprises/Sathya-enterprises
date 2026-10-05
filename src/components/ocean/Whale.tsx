import Image from "next/image";
import humpback from "@/assets/photos/whale-underwater.webp";

/**
 * The site's whale: a real humpback just under the surface, photographed by Chinh Le Duc on Unsplash
 * (8t9uyncwnHc, Unsplash License). Colour-graded from royal blue to the site's sea teal so its water is
 * the same water as the backdrop, then faded into it at the edges (globals.css › Whale):
 *   lg:      the right ~72% of the screen, head pointing at the hero text, body running off the right
 *            edge (the photo crops the tail there, so the crop reads as the edge of the screen).
 *   smaller: the full screen behind the centred hero, dimmed so the text stays readable.
 */
export function Whale() {
  return (
    <div className="whale-photo absolute inset-0 opacity-45 lg:left-auto lg:w-[72vw] lg:opacity-100">
      <Image
        src={humpback}
        alt=""
        fill
        placeholder="blur"
        loading="eager"
        sizes="(min-width: 1024px) 72vw, 100vw"
        className="object-cover object-[18%_center] lg:object-left"
      />
    </div>
  );
}
