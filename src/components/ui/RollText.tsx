/** Per-character roll on hover of the nearest `.group` (decorative; give the parent an accessible name). */
export function RollText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span aria-hidden className={`inline-block ${className}`}>
      {Array.from(text).map((ch, i) =>
        ch === " " ? (
          <span key={i}> </span>
        ) : (
          <span key={i} className="relative inline-block overflow-hidden align-top">
            <span
              className="block transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-full motion-reduce:transition-none"
              style={{ transitionDelay: `${i * 18}ms` }}
            >
              {ch}
            </span>
            <span
              className="absolute inset-x-0 top-full block text-gold transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-full motion-reduce:transition-none"
              style={{ transitionDelay: `${i * 18}ms` }}
            >
              {ch}
            </span>
          </span>
        ),
      )}
    </span>
  );
}
