"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { reach } from "@/content/site";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { landDots } from "./landDots";
import { Accent, Reveal, SectionHeader } from "./primitives";

type Vec = [number, number, number];

const RAD = Math.PI / 180;
/** Auto-spin, degrees per second. */
const SPIN = 7;
/** Drag sensitivity, degrees per CSS pixel. */
const DRAG = 0.32;
/** Latitude the globe leans towards the viewer, and the range dragging may tilt it within. */
const TILT = 18;
const TILT_MIN = -15;
const TILT_MAX = 45;
/** Each route's cycle (s): it draws out from its start, holds, then retracts into its end. */
const CYCLE = 5.2;
const STAGGER = 0.65;
/** Points sampled along each route. */
const STEPS = 72;

function toVec(lon: number, lat: number): Vec {
  const c = Math.cos(lat * RAD);
  return [c * Math.sin(lon * RAD), Math.sin(lat * RAD), c * Math.cos(lon * RAD)];
}

/** Great-circle path from a to b, lifted off the surface in an arch that grows with distance. */
function routePath(a: Vec, b: Vec): Vec[] {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const angle = Math.acos(dot);
  const sin = Math.sin(angle) || 1;
  const lift = 0.04 + 0.22 * (angle / Math.PI);
  return Array.from({ length: STEPS + 1 }, (_, i) => {
    const t = i / STEPS;
    const wa = Math.sin((1 - t) * angle) / sin;
    const wb = Math.sin(t * angle) / sin;
    const h = 1 + lift * Math.sin(Math.PI * t);
    return [(wa * a[0] + wb * b[0]) * h, (wa * a[1] + wb * b[1]) * h, (wa * a[2] + wb * b[2]) * h];
  });
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - (1 - t) ** 3;

/** A #rrggbb brand token at the given opacity. */
function fade(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${n >> 16} ${(n >> 8) & 255} ${n & 255} / ${alpha})`;
}

/**
 * "Available worldwide": a dotted globe turning on its own, Bengaluru pinned, with routes arching
 * out to each place and between a few of them. Drawn on a 2D canvas — no WebGL — and it only
 * animates while on screen and in a visible tab. Drag to turn it; it picks the spin back up after.
 * With reduced motion it holds still, India facing, every route drawn in full.
 */
export function GlobalReach() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInView(ref, { margin: "200px 0px 200px 0px" });
  const inViewRef = useRef(inView);
  const loop = useRef<{ start: () => void; stop: () => void } | null>(null);
  const reduced = useReducedMotionSafe();
  const places = [reach.hub, ...reach.places];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const css = getComputedStyle(document.documentElement);
    const token = (name: string) => css.getPropertyValue(name).trim();
    const C = {
      ink: token("--color-ink"),
      red: token("--color-red"),
      gold: token("--color-gold"),
      ivory: token("--color-ivory"),
    };
    const font = getComputedStyle(canvas).fontFamily;

    // Land dots, split into x0/z0 (turned by longitude each frame) and y (fixed).
    const land = landDots();
    const dx = new Float32Array(land.length);
    const dy = new Float32Array(land.length);
    const dz = new Float32Array(land.length);
    land.forEach(([lon, lat], i) => ([dx[i], dy[i], dz[i]] = toVec(lon, lat)));

    const byCity = new Map(places.map((p) => [p.city, toVec(p.lon, p.lat)]));
    const hub = byCity.get(reach.hub.city)!;
    const routes = [
      ...reach.places.map((p) => routePath(hub, byCity.get(p.city)!)),
      ...reach.links.map(([a, b]) => routePath(byCity.get(a)!, byCity.get(b)!)),
    ];
    const ends = [...reach.places.map((p) => p.city), ...reach.links.map(([, b]) => b)];

    let w = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(w * dpr);
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(last);
    });
    ro.observe(canvas);

    // View: the longitude facing the viewer, and the tilt. Starts with India a little left of centre.
    let lon0 = reach.hub.lon + 22;
    let tilt = TILT;
    let cl = 1;
    let sl = 0;
    let ct = 1;
    let st = 0;
    const setView = () => {
      cl = Math.cos(lon0 * RAD);
      sl = Math.sin(lon0 * RAD);
      ct = Math.cos(tilt * RAD);
      st = Math.sin(tilt * RAD);
    };
    /** Screen x/y (unit disk, y up) and depth z (towards the viewer) of a point. */
    const project = (p: Vec, out: Vec) => {
      const x = p[0] * cl - p[2] * sl;
      const z = p[2] * cl + p[0] * sl;
      out[0] = x;
      out[1] = p[1] * ct - z * st;
      out[2] = p[1] * st + z * ct;
      return out;
    };
    /** In front of the globe, or lifted out past its edge. */
    const visible = (q: Vec) => q[2] > 0 || q[0] * q[0] + q[1] * q[1] > 1;

    const q: Vec = [0, 0, 0];
    const draw = (time: number) => {
      setView();
      const size = w * dpr;
      const r = size * 0.4;
      const cx = size / 2;
      const cy = size / 2;
      const sx = (v: number) => cx + v * r;
      const sy = (v: number) => cy - v * r;
      ctx.clearRect(0, 0, size, size);

      // Glow and sphere.
      const glow = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.25);
      glow.addColorStop(0, fade(C.gold, 0.35));
      glow.addColorStop(1, fade(C.gold, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);
      // Karnataka flag on the sphere: yellow over red, split at the equator of the view, with a soft
      // highlight on top so it still reads as a ball.
      const body = ctx.createLinearGradient(0, cy - r, 0, cy + r);
      body.addColorStop(0.5, C.gold);
      body.addColorStop(0.5, C.red);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = body;
      ctx.fill();
      const shine = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r);
      shine.addColorStop(0, fade(C.ivory, 0.35));
      shine.addColorStop(1, fade(C.ivory, 0));
      ctx.fillStyle = shine;
      ctx.fill();
      ctx.lineWidth = dpr;
      ctx.strokeStyle = fade(C.ink, 0.18);
      ctx.stroke();

      // Land, in three depth bands so the edge fades: one path and one fill per band. Red dots on
      // the yellow half, yellow dots on the red half.
      const dot = Math.max(1.2 * dpr, r * 0.0105);
      for (const upper of [true, false]) {
        for (let band = 0; band < 3; band++) {
          const lo = [0, 0.35, 0.7][band];
          const hi = [0.35, 0.7, 1.01][band];
          ctx.beginPath();
          for (let i = 0; i < dx.length; i++) {
            const z = dz[i] * cl + dx[i] * sl;
            const x = dx[i] * cl - dz[i] * sl;
            const depth = dy[i] * st + z * ct;
            if (depth < lo || depth >= hi) continue;
            const py = dy[i] * ct - z * st;
            if (py >= 0 !== upper) continue;
            const s = dot * (0.65 + 0.35 * depth);
            ctx.rect(sx(x) - s / 2, sy(py) - s / 2, s, s);
          }
          ctx.fillStyle = upper ? fade(C.red, [0.35, 0.6, 0.85][band]) : fade(C.gold, [0.35, 0.6, 0.85][band]);
          ctx.fill();
        }
      }

      // Routes: a faint track always, and a bright stroke running along it on its cycle.
      const arrived = new Set<string>();
      ctx.lineCap = "round";
      routes.forEach((pts, k) => {
        const phase = reduced ? 0.45 : (((time / 1000 - k * STAGGER) % CYCLE) + CYCLE) % CYCLE / CYCLE;
        const head = reduced ? 1 : easeOut(clamp01(phase / 0.32));
        const tail = reduced ? 0 : easeOut(clamp01((phase - 0.62) / 0.3));
        if (head >= 1 && tail <= 0) arrived.add(ends[k]);

        const segment = (from: number, to: number, style: string | CanvasGradient, width: number, dash: number[]) => {
          ctx.beginPath();
          ctx.setLineDash(dash);
          let pen = false;
          for (let i = Math.floor(from * STEPS); i <= Math.ceil(to * STEPS); i++) {
            project(pts[i], q);
            if (!visible(q)) {
              pen = false;
              continue;
            }
            if (pen) ctx.lineTo(sx(q[0]), sy(q[1]));
            else ctx.moveTo(sx(q[0]), sy(q[1]));
            pen = true;
          }
          ctx.strokeStyle = style;
          ctx.lineWidth = width;
          ctx.stroke();
        };

        segment(0, 1, fade(C.ivory, 0.5), dpr, [2 * dpr, 4 * dpr]);
        if (head <= tail) return;
        // Ivory, so the route shows on both halves of the flag.
        segment(tail, head, C.ivory, 2 * dpr, []);

        // A spark at the leading end while it travels.
        if (head < 1) {
          project(pts[Math.round(head * STEPS)], q);
          if (visible(q)) {
            ctx.beginPath();
            ctx.arc(sx(q[0]), sy(q[1]), 3 * dpr, 0, Math.PI * 2);
            ctx.fillStyle = C.ivory;
            ctx.shadowColor = C.ivory;
            ctx.shadowBlur = 10 * dpr;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });
      ctx.setLineDash([]);

      // Pins, back to front, labelled when they face the viewer.
      ctx.font = `700 ${11 * dpr}px ${font}`;
      ctx.textBaseline = "middle";
      const pins = places
        .map((p) => ({ p, at: project(byCity.get(p.city)!, [0, 0, 0]) }))
        .filter(({ at }) => at[2] > 0)
        .sort((m, n) => m.at[2] - n.at[2]);
      for (const { p, at } of pins) {
        const isHub = p === reach.hub;
        const x = sx(at[0]);
        const y = sy(at[1]);
        const alpha = clamp01(at[2] / 0.25);
        ctx.globalAlpha = alpha;

        // Pulse: always on the hub, on a place while a route rests on it.
        if (!reduced && (isHub || arrived.has(p.city))) {
          const t = ((time / 1000) % 1.6) / 1.6;
          ctx.beginPath();
          ctx.arc(x, y, (6 + 16 * t) * dpr, 0, Math.PI * 2);
          ctx.strokeStyle = C.ivory;
          ctx.lineWidth = 2 * dpr;
          ctx.globalAlpha = alpha * (1 - t);
          ctx.stroke();
          ctx.globalAlpha = alpha;
        }
        ctx.beginPath();
        ctx.arc(x, y, (isHub ? 6 : 4.5) * dpr, 0, Math.PI * 2);
        ctx.fillStyle = isHub ? C.red : C.gold;
        ctx.fill();
        ctx.lineWidth = 2 * dpr;
        ctx.strokeStyle = C.ivory;
        ctx.stroke();

        if (at[2] > 0.3) {
          const label = (isHub ? p.city + " · HQ" : p.city).toUpperCase();
          const tw = ctx.measureText(label).width;
          const lx = x + 10 * dpr;
          ctx.fillStyle = fade(C.ivory, 0.88);
          ctx.beginPath();
          ctx.roundRect(lx - 4 * dpr, y - 9 * dpr, tw + 8 * dpr, 18 * dpr, 9 * dpr);
          ctx.fill();
          ctx.fillStyle = isHub ? C.red : C.ink;
          ctx.fillText(label, lx, y + 0.5 * dpr);
        }
        ctx.globalAlpha = 1;
      }
    };

    // Dragging turns it; letting go eases back into the spin.
    let dragging = false;
    let px = 0;
    let py = 0;
    let speed = reduced ? 0 : SPIN;
    const down = (e: PointerEvent) => {
      dragging = true;
      px = e.clientX;
      py = e.clientY;
      speed = 0;
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      lon0 -= (e.clientX - px) * DRAG;
      tilt = Math.min(TILT_MAX, Math.max(TILT_MIN, tilt + (e.clientY - py) * DRAG));
      px = e.clientX;
      py = e.clientY;
      if (!running) draw(last);
    };
    const up = () => {
      dragging = false;
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);

    let raf = 0;
    let last = 0;
    let prev = 0;
    let running = false;
    const frame = (now: number) => {
      const dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0;
      prev = now;
      if (!dragging && !reduced) {
        speed += (SPIN - speed) * Math.min(1, dt * 1.5);
        lon0 += speed * dt;
      }
      last = now;
      draw(now);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running || reduced || !inViewRef.current || document.hidden) return;
      running = true;
      prev = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) lon0 = reach.hub.lon + 10;
    draw(last);
    loop.current = { start, stop };
    start();

    return () => {
      loop.current = null;
      stop();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
    // places derives from static content.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // Only animate while near the screen.
  useEffect(() => {
    inViewRef.current = inView;
    if (inView) loop.current?.start();
    else loop.current?.stop();
  }, [inView]);

  return (
    <section ref={ref} id="worldwide" aria-labelledby="worldwide-title" className="relative overflow-hidden bg-ivory py-[var(--section-y)]">
      <div className="mx-auto grid max-w-[var(--container)] items-center gap-12 px-[var(--gutter)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8">
        <div>
          <SectionHeader
            eyebrow="Available Worldwide"
            title={
              <span id="worldwide-title">
                Rooted in Bengaluru.
                <br />
                <Accent>Working Worldwide.</Accent>
              </span>
            }
            lead="Our team works from Bengaluru, and our work travels. Brands across time zones run on what we build, market and deliver — the same ecosystem, wherever you are."
          />
          <Reveal delay={0.15} className="mt-8">
            <ul aria-label="Where we work" className="flex flex-wrap gap-2">
              {places.map((p) => {
                const isHub = p === reach.hub;
                return (
                  <li
                    key={p.city}
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide ${
                      isHub ? "bg-red text-ivory" : "border border-line bg-white text-ink"
                    }`}
                  >
                    <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${isHub ? "bg-gold" : "bg-red"}`} />
                    {p.city}
                    <span className={`font-normal normal-case tracking-normal ${isHub ? "text-ivory/80" : "text-ink-soft"}`}>
                      {isHub ? "HQ" : p.country}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={48} className="relative mx-auto w-full max-w-[640px]">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={`Globe with routes from ${reach.hub.city} to ${reach.places.map((p) => p.city).join(", ")}`}
            className="block aspect-square w-full cursor-grab touch-pan-y font-mono active:cursor-grabbing"
          />
        </Reveal>
      </div>
    </section>
  );
}
