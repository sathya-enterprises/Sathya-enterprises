import { siFacebook, siInstagram, siWhatsapp, siX, siYoutube } from "simple-icons";

/** LinkedIn isn't in simple-icons (trademark policy), so its "in" mark is drawn here. */
const LINKEDIN =
  "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.15 1.46-2.15 2.96V21H9z";

const paths = {
  instagram: siInstagram.path,
  facebook: siFacebook.path,
  linkedin: LINKEDIN,
  youtube: siYoutube.path,
  x: siX.path,
  whatsapp: siWhatsapp.path,
} as const;

export type SocialId = keyof typeof paths;

/** Brand glyph (simple-icons, CC0) in the current text colour. Decorative — the link carries the label. */
export function SocialIcon({ id, className }: { id: SocialId; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false" fill="currentColor">
      <path d={paths[id]} />
    </svg>
  );
}
