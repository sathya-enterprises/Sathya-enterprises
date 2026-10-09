# Sathya Enterprises — Design System & Rebuild Rationale

This file is the contract for the visual system. Change tokens here first, then in
`src/app/globals.css`. Do not introduce colours, easings, or radii that are not listed.

---

## 1. Reference analysis (what was inspected)

All three references were fetched on 2026-10-01 (HTML + every stylesheet). Motion was
analysed from CSS tokens, keyframes and DOM structure — JS/canvas-driven motion (e.g.
Stripe's WebGL gradient, Labs' video hero) was inferred from markup, not watched frame-by-frame.

### 1a. Sathya Enterprises (source of truth) — sathyaenterprises-nine.vercel.app

Content: homepage, /about, /ecosystem, /money-making-system, /contact, /terms,
/privacy-policy and 21 business pages. All copy lives in `src/content/site.ts`, taken verbatim.

Brand tokens (from the live `:root`):

| Token          | Value                | Role                              |
| -------------- | -------------------- | --------------------------------- |
| red            | `#c8102e`            | primary, accents, CTAs            |
| red-deep       | `#9e1026`            | eyebrows, deep accent             |
| gold           | `#f4c542`            | secondary, hover state, satellites|
| gold-light     | `#fff5d6`            | warm surface                      |
| ivory          | `#fffdf8`            | page ground                       |
| charcoal       | `#1a1a1a`            | dark backgrounds only, never text |
| charcoal-soft  | `#4a4642`            | dark surfaces (soft)              |
| ink            | `#6e0b1c`            | text — headings and copy are red, never black |
| ink-soft       | `#8a2b2b`            | body copy                         |
| line           | `rgba(26,26,26,.1)`  | hairlines                         |
| tints          | `#ffe9ec`, `#ffe7ac` | soft red / soft gold fills        |

Type: Archivo (display), Manrope (body), Space Mono (eyebrows / indices).
Ease: `cubic-bezier(0.22, 1, 0.36, 1)`. Container 1280px. Pill buttons.
Brand mark (favicon): a red core with four gold satellites — this is literally the
ecosystem (one enterprise, four divisions) and becomes the central motif of the rebuild.
Logo artwork (red/gold whale, "SE Digital") exists in git history; the live site uses a wordmark.

Note: the last committed redesign replaced this palette with Stripe's
(`#635bff`, `#0a2540`, `#00d4b2`). That is the failure this rebuild corrects.

### 1b. Google Labs — what we take (principles only)

- **Per-category theming**: each category swaps a small token set (`--gl-cat-bg/accent/fill`)
  so one component reads differently per category. → Each Sathya division gets a *tone*
  built only from Sathya colours.
- **Floating shape field**: slow (6–12s) randomised float of simple geometry behind content.
  → Ecosystem nodes drift subtly; never decorative blobs.
- **Featured hero with progress**: autoplaying states with a visible progress bar and
  "skip to next section". → Hero verb cycle (BUILD/MARKET/AUTOMATE/GROW) with progress.
- **Filterable discovery grid** (All / Create / Develop…). → Business index filtered by division.
- **"Graduation" storytelling** (formerly X → now Y). → Signal flow ATTENTION → GROWTH.
- **Per-character CTA hover** (text stack swap). → Final CTA.
- Warm off-white ground, 2.4rem card radius, pill actions, header blur layer.

### 1c. Stripe — what we take (principles only)

- **One dominant ease-out** (`cubic-bezier(.25,1,.5,1)` used 41×) and fast UI (nav 240ms,
  cards 300ms). → One house ease, short UI timings.
- **Large display type with negative tracking** and a strict heading scale.
- **Bento/product storytelling**: show the system working rather than describing it.
  → Pipelines, module assemblies and flows drawn as live diagrams.
- **Reduced motion everywhere** (78 rules). → Every animation has a reduced path.
- Restraint: mostly static content, motion reserved for the moments that explain something.

What we do NOT take: layouts, copy, illustrations, logos, the purple/blue palette, Google colours.

---

## 2. Concept — "The Connected Core"

The favicon already says it: one red core, four gold satellites. The whole site is that
diagram, expanding.

- Loader: the core forms, four satellites snap into orbit, the name resolves.
- Hero: the core becomes a live orbital system of DIGITAL / TECHNOLOGY / PRODUCTS / SERVICES.
- Ecosystem: zoom into the orbit — each satellite opens its businesses; links between
  businesses come from the real "Related" lists on the live site.
- The System: a single signal travels ATTENTION → LEADS → CUSTOMERS → AUTOMATION → DATA → GROWTH
  through ATTRACT → CAPTURE → CONVERT → AUTOMATE → UNDERSTAND → GROW.
- Division pages: each has its own diagram language (pipeline, modules, three-sided market, field processes).

### Division tones (Labs-style theming, Sathya colours only)

| Division   | Ground      | Ink       | Accent   |
| ---------- | ----------- | --------- | -------- |
| Digital    | ivory       | charcoal  | red      |
| Technology | charcoal    | ivory     | gold     |
| Products   | gold-light  | charcoal  | red-deep |
| Services   | red-deep    | ivory     | gold     |

---

## 3. Tokens

### Type scale (fluid, Archivo display uses the `wdth` axis)
| Name      | Size                                | LH   | Tracking |
| --------- | ----------------------------------- | ---- | -------- |
| mega      | `clamp(3.5rem, 13vw, 13rem)`        | .86  | -0.045em |
| display   | `clamp(2.6rem, 7vw, 6rem)`          | .94  | -0.035em |
| h1        | `clamp(2.2rem, 5vw, 4.25rem)`       | .98  | -0.03em  |
| h2        | `clamp(1.75rem, 3.4vw, 3rem)`       | 1.02 | -0.025em |
| h3        | `clamp(1.25rem, 2vw, 1.6rem)`       | 1.15 | -0.015em |
| lead      | `clamp(1.06rem, 1.4vw, 1.3rem)`     | 1.55 | -0.005em |
| body      | `1rem`                              | 1.65 | 0        |
| small     | `.875rem`                           | 1.5  | 0        |
| eyebrow   | `.72rem` Space Mono, uppercase      | 1.2  | .18em    |

### Spacing (4px base)
`1:4 2:8 3:12 4:16 5:20 6:24 8:32 10:40 12:48 16:64 20:80 24:96 32:128`
Section rhythm: `--section-y: clamp(5rem, 11vw, 9.5rem)`. Gutter: `clamp(1rem, 4vw, 2.5rem)`.

### Containers
`--container: 1280px` (content), `--container-wide: 1520px` (diagrams), `--measure: 62ch` (prose).

### Radius
`sm 10px · md 18px · lg 28px · pill 999px` — 28px is inherited from the live category cards.

### Shadows (warm, charcoal-based — never coloured glows)
- `--shadow-1: 0 1px 2px rgba(26,26,26,.06), 0 2px 8px rgba(26,26,26,.04)`
- `--shadow-2: 0 12px 32px -12px rgba(26,26,26,.18)`
- `--shadow-3: 0 30px 60px -20px rgba(26,26,26,.28)`

### Breakpoints
`sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536` (Tailwind defaults, used as-is).
Interaction model switches on `(hover: hover) and (pointer: fine)`, not on width.

---

## 4. Motion system

| Token        | Value                              | Use                               |
| ------------ | ---------------------------------- | --------------------------------- |
| ease-out     | `cubic-bezier(0.22, 1, 0.36, 1)`   | default (Sathya's own ease)       |
| ease-in-out  | `cubic-bezier(0.65, 0.05, 0.36, 1)`| morphs, panels, page transitions  |
| micro        | 160ms                              | hover colour, underline           |
| ui           | 240ms                              | nav, menus, chips                 |
| reveal       | 640ms                              | section entrances                 |
| hero         | 1000ms                             | hero, loader stages               |
| stagger      | 60ms (lists), 90ms (headlines)     |                                   |

Hierarchy:
1. **Strong** — loader, hero entrance, The System pinned journey, page transitions.
2. **Medium** — section headline line-reveals, ecosystem state changes, panel expansion.
3. **Subtle** — hover lift (≤4px), arrow nudge, underline draw, magnetic CTA (≤6px).
4. **None** — body copy, lists, footer. They arrive with their section, not individually.

Rules: animate `transform` and `opacity` only (SVG `pathLength` allowed for connectors).
`MotionConfig reducedMotion="user"` + CSS `prefers-reduced-motion` fallbacks.
Hover-only interactions always have a tap / focus equivalent.
Loader runs once per session, ≤ 1.8s, and never blocks content in the HTML.

---

## 5. Motion & interaction layer (v2)

- **Loader** (`components/layout/Loader.tsx`, CSS in `globals.css`): plays on every full page load.
  First load in a session = full sequence (~2.3s total, exit starts at 1.3s); later full loads = mark-only (~1.3s).
  Exit is a wave of four columns, one per division, each with its colour on the leading edge.
  `LoaderController` adds `html.se-ready` afterwards so client navigations never wait.
- **Reduced motion keeps fades, drops travel.** Loader becomes a crossfade; nothing slides, spins, loops or parallaxes.
- **Never hide above-the-fold text with opacity or clipping.** Entrances (`.enter`, `.enter-word`) animate
  transform only, so headings are painted on the first frame (crawlers + LCP). The loader provides the reveal.
- **Floating shapes** (`motion/FloatingShapes.tsx`): brand geometry only (core, satellites, ring, tile, pill, plus,
  hex). Drift (CSS) + scroll and cursor parallax + hover/tap spring. Place them in open space, never over text.
- **Cards**: `TiltCard` (tilt + spotlight on mouse, press on touch). **Buttons**: `Magnetic` on primary CTAs only.
- **Mobile hero**: `DivisionDeck` (swipe + autoplay progress) replaces the orbit below `lg`.
- **Page transitions**: old page recedes, new page wipes up (clip-path) — the loader's language.

## 6. SEO

- `lib/seo.ts › pageMeta()` on every page: canonical, Open Graph, Twitter. Base URL from `NEXT_PUBLIC_SITE_URL`.
- JSON-LD: Organization + WebSite (layout), BreadcrumbList (inner pages), ItemList (division pages), Service (business pages).
- Generated OG cards per page (`opengraph-image.tsx`, shared renderer `lib/og.tsx`).
- `sitemap.ts`, `robots.ts`, `manifest.ts`. Legal placeholders are `noindex`.
