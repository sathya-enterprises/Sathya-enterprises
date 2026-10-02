/** Small decorative creatures for the dive. All face right; the scene flips them to match travel direction. */

function Fish({ color, x, y, size, delay }: { color: string; x: number; y: number; size: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      <g className="fish-wiggle" style={{ ["--f-delay" as string]: `${delay}s` }}>
        <path fill={color} d="M6 10L0 3V17Z" />
        <path fill={color} d="M4 10C10 2 26 2 34 10C26 18 10 18 4 10Z" />
        <path fill="#fff" fillOpacity="0.25" d="M12 8C18 5 26 5 31 9C24 8 18 8 12 8Z" />
        <circle cx="28.5" cy="8.6" r="1.3" fill="var(--color-sea-abyss)" />
      </g>
    </g>
  );
}

/** A loose school — positions are hand-placed so it reads as a group, not a grid. */
const SCHOOL = [
  { x: 0, y: 30, size: 1, delay: 0 },
  { x: 46, y: 6, size: 0.8, delay: 0.3 },
  { x: 52, y: 52, size: 0.9, delay: 0.6 },
  { x: 96, y: 26, size: 1.1, delay: 0.15 },
  { x: 104, y: 70, size: 0.7, delay: 0.45 },
  { x: 140, y: 0, size: 0.75, delay: 0.75 },
  { x: 150, y: 46, size: 0.95, delay: 0.2 },
];

export function FishSchool({ color, className }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 190 92" className={className} aria-hidden focusable="false">
      {SCHOOL.map((f, i) => (
        <Fish key={i} color={color} {...f} />
      ))}
    </svg>
  );
}

export function Jellyfish({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 60 100" className={className} aria-hidden focusable="false">
      <g className="jelly" style={{ ["--j-delay" as string]: `${delay}s`, transformBox: "fill-box", transformOrigin: "50% 30%" }}>
        <path
          fill="none"
          stroke="#fff"
          strokeOpacity="0.45"
          strokeWidth="1.6"
          strokeLinecap="round"
          d="M16 36C12 50 20 60 14 74M26 37C24 54 30 66 26 90M36 37C38 52 32 64 36 84M46 36C50 50 42 60 47 72"
        />
        <path
          fill="#fff"
          fillOpacity="0.22"
          stroke="#fff"
          strokeOpacity="0.55"
          strokeWidth="1.4"
          d="M5 35C5 10 55 10 55 35C48 31 42 37 36 33C30 38 24 31 18 35C12 31 8 37 5 35Z"
        />
        <path fill="var(--color-gold)" fillOpacity="0.5" d="M20 26C24 20 36 20 40 26C34 24 26 24 20 26Z" />
      </g>
    </svg>
  );
}
