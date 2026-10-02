/** Side-on whale facing right. The tail flukes beat and the body bobs via CSS; scroll moves the whole thing. */
export function Whale({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 160" className={className} aria-hidden focusable="false">
      <g className="whale-swim">
        <path
          className="whale-tail"
          fill="var(--color-whale)"
          d="M76 79C52 77 36 69 22 49C16 41 6 39 0 43C10 56 18 70 30 81C18 91 10 104 0 116C6 120 16 118 22 110C36 92 52 87 76 87Z"
        />
        <path
          fill="var(--color-whale)"
          d="M70 76C120 60 170 32 240 30C300 28 360 38 390 66C398 74 396 84 386 90C350 112 280 122 220 118C160 114 110 98 70 90Z"
        />
        <path fill="var(--color-whale-belly)" d="M386 90C350 112 280 122 220 118C250 107 330 99 382 86Z" />
        <path
          fill="none"
          stroke="var(--color-whale)"
          strokeOpacity="0.35"
          strokeWidth="1.6"
          strokeLinecap="round"
          d="M370 94C340 104 300 110 262 112M356 98C330 106 300 110 274 112"
        />
        <path fill="var(--color-whale)" d="M168 41C176 31 186 26 198 25C189 31 185 36 183 43Z" />
        <path fill="#1a3449" d="M272 102C264 124 242 144 214 150C232 133 246 116 252 104Z" />
        <path fill="none" stroke="#1a3449" strokeWidth="2" strokeLinecap="round" d="M394 80C372 88 346 91 318 88" />
        <circle cx="340" cy="72" r="3.4" fill="var(--color-sea-abyss)" />
        <path fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="3" strokeLinecap="round" d="M200 40C250 34 310 38 352 52" />
      </g>
    </svg>
  );
}
