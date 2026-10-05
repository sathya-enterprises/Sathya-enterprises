import type { StaticImageData } from "next/image";
import team from "@/assets/photos/team.jpg";
import digital from "@/assets/photos/digital.jpg";
import technology from "@/assets/photos/technology.jpg";
import products from "@/assets/photos/products.jpg";
import services from "@/assets/photos/services.jpg";
import meeting from "@/assets/photos/meeting.jpg";
import workshop from "@/assets/photos/workshop.jpg";
import type { DivisionId } from "./site";

export type Photo = { src: StaticImageData; alt: string };

/**
 * Section photography, all from Unsplash (Unsplash License — free for commercial use, no attribution
 * required). Self-hosted so Next can optimise them. Sources:
 * team — Annie Spratt (QckxruozjRg) · digital — Swello (4lKFi3KqnD8) · technology — v-jFS1AsHXo
 * · products — images.unsplash.com/photo-1551288049-bebda4e38f71 · services — Ennio Dybeli (KDdNjUQwzSw).
 */
export const teamPhoto: Photo = { src: team, alt: "A team working together on laptops around a shared table" };

export const divisionPhotos: Record<DivisionId, Photo> = {
  digital: { src: digital, alt: "Social media post analytics open on a smartphone" },
  technology: { src: technology, alt: "Code on a monitor in a developer's workspace" },
  products: { src: products, alt: "An analytics dashboard with charts on a laptop screen" },
  services: { src: services, alt: "Security cameras mounted on the corner of a building" },
};

/**
 * meeting — Smartworks Coworking (cW4lLTavU80) · workshop — Smartworks Coworking (Uz8THWPXwhI). Unsplash
 * License, same terms as above.
 */
export const meetingPhoto: Photo = { src: meeting, alt: "A team applauding a colleague at the end of a presentation in a meeting room" };
export const workshopPhoto: Photo = { src: workshop, alt: "A team around a boardroom table watching a presentation on a screen" };
