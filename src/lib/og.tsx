import { ImageResponse } from "next/og";
import type { DivisionId } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

/** Archivo ExtraBold for the cards (fetched once at build; falls back to the default face offline). */
const archivo: Promise<ArrayBuffer | null> = (async () => {
  try {
    const css = await (
      await fetch("https://fonts.googleapis.com/css2?family=Archivo:wght@800", {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.30 (KHTML, like Gecko) Safari/534.30" },
      })
    ).text();
    // Google returns one @font-face per subset; take the latin one.
    const url = css.match(/\/\* latin \*\/[^}]*?src: url\((.+?)\) format\('(?:truetype|opentype|woff)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
})();
export const ogContentType = "image/png";

const tones: Record<DivisionId | "default", { bg: string; ink: string; accent: string; soft: string }> = {
  default: { bg: "#fffdf8", ink: "#1a1a1a", accent: "#c8102e", soft: "#4a4642" },
  digital: { bg: "#fffdf8", ink: "#1a1a1a", accent: "#c8102e", soft: "#4a4642" },
  technology: { bg: "#1a1a1a", ink: "#fffdf8", accent: "#f4c542", soft: "#bdb8b0" },
  products: { bg: "#fff5d6", ink: "#1a1a1a", accent: "#9e1026", soft: "#4a4642" },
  services: { bg: "#9e1026", ink: "#fffdf8", accent: "#f4c542", soft: "#f3d6da" },
};

/** Social card in the site's own language: the core mark, an index line, and a big headline. */
export async function ogImage({ eyebrow, title, tone = "default" }: { eyebrow: string; title: string; tone?: DivisionId | "default" }) {
  const t = tones[tone];
  const font = await archivo;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: t.bg,
          color: t.ink,
          padding: "64px 72px",
          fontFamily: font ? "Archivo" : undefined,
          position: "relative",
        }}
      >
        {/* The core mark */}
        <svg width="250" height="250" viewBox="0 0 32 32" style={{ position: "absolute", right: 72, top: 70 }}>
          <circle cx="16" cy="16" r="6" fill="#c8102e" />
          <circle cx="16" cy="4.5" r="2.4" fill="#f4c542" />
          <circle cx="27.5" cy="16" r="2.4" fill="#f4c542" />
          <circle cx="16" cy="27.5" r="2.4" fill="#f4c542" />
          <circle cx="4.5" cy="16" r="2.4" fill="#f4c542" />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, fontWeight: 800, letterSpacing: 5, color: t.accent }}>
          {eyebrow.toUpperCase()}
        </div>
        <div style={{ display: "flex", maxWidth: 760, fontSize: title.length > 40 ? 68 : 84, fontWeight: 800, lineHeight: 0.98, letterSpacing: -3 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 24, fontWeight: 700 }}>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontSize: 34, fontWeight: 800 }}>SATHYA</span>
            <span style={{ fontSize: 34, fontWeight: 800, color: "#c8102e" }}>ENTERPRISES</span>
          </div>
          <span style={{ letterSpacing: 4, color: t.soft }}>BUILD. MARKET. AUTOMATE. GROW.</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: font ? [{ name: "Archivo", data: font, weight: 800, style: "normal" }] : undefined,
    },
  );
}
