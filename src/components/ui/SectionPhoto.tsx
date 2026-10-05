import Image from "next/image";
import type { Photo } from "@/content/photos";

/**
 * A framed photo set on the water: rounded, hairline border, soft shadow, blur-up while loading.
 * Below the fold it opens from a clipped strip and the image settles from a zoom as it scrolls through.
 */
export function SectionPhoto({
  photo,
  sizes,
  className = "aspect-[4/3]",
  eager,
  children,
}: {
  photo: Photo;
  /** Rendered width hint for the responsive srcset, e.g. "(min-width: 768px) 40vw, 100vw". */
  sizes: string;
  /** Sets the frame's aspect ratio (and any extra layout classes). */
  className?: string;
  /** Load immediately — only for photos visible on first paint (these skip the scroll reveal). */
  eager?: boolean;
  /** Overlays laid on top of the photo (badges, captions). */
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-white/15 bg-sea-abyss shadow-[0_24px_48px_-24px_rgb(0_0_0/0.6)] ${eager ? "" : "photo-reveal"} ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        loading={eager ? "eager" : undefined}
        fetchPriority={eager ? "high" : undefined}
        className="photo-parallax object-cover"
      />
      <span aria-hidden className="absolute inset-0 bg-linear-to-t from-sea-abyss/55 via-transparent to-transparent" />
      {children}
    </div>
  );
}
