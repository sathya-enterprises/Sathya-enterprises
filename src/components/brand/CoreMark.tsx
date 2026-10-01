/**
 * The Sathya mark: a red core with four gold satellites (from the live favicon).
 * The four satellites are the four divisions — the whole site expands this diagram.
 */
export function CoreMark({
  size = 28,
  className,
  title,
}: {
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <circle cx="16" cy="16" r="6" fill="var(--color-red)" />
      <circle cx="16" cy="5" r="2.4" fill="var(--color-gold)" />
      <circle cx="27" cy="16" r="2.4" fill="var(--color-gold)" />
      <circle cx="16" cy="27" r="2.4" fill="var(--color-gold)" />
      <circle cx="5" cy="16" r="2.4" fill="var(--color-gold)" />
    </svg>
  );
}
