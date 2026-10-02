/**
 * Swim simulation for every creature in the ocean backdrop.
 * Units are screen-relative: x in vw (creature's leading box edge), y in svh (top of its box).
 *
 * Each creature cruises on its own in its current direction, gets pushed along by scrolling,
 * floats up and down on layered sine waves around a depth that weaves with page progress, and
 * pitches its nose to follow its actual path. It wraps around off-screen so the sea is never empty.
 */

export type SwimConfig = {
  /** Starting x (vw). */
  x: number;
  /** Cruise speed, vw per second. */
  speed: number;
  /** Extra travel per full page of scroll, vw. */
  gain: number;
  /** +1 travels left→right while scrolling down, -1 right→left. */
  heading: 1 | -1;
  /** Depth (svh) at page progress stops, interpolated piecewise. */
  depth: { at: number[]; y: number[] };
  /** Float amplitude (svh) and base angular frequency (rad/s). */
  float: number;
  freq: number;
  phase: number;
};

export type SwimState = {
  x: number;
  y: number;
  /** Nose angle in degrees: positive = nose down, in the direction of travel. */
  pitch: number;
  /** +1 facing right, -1 facing left. */
  facing: 1 | -1;
  /** Current horizontal speed relative to cruise (1 = cruising). Drives tail-beat speed. */
  effort: number;
};

const piecewise = (at: number[], ys: number[], v: number) => {
  if (v <= at[0]) return ys[0];
  for (let i = 1; i < at.length; i++) {
    if (v <= at[i]) return ys[i - 1] + ((v - at[i - 1]) / (at[i] - at[i - 1])) * (ys[i] - ys[i - 1]);
  }
  return ys[ys.length - 1];
};

export function createSwimmer(c: SwimConfig) {
  const s: SwimState = { x: c.x, y: piecewise(c.depth.at, c.depth.y, 0), pitch: 0, facing: c.heading, effort: 1 };
  let vx = c.speed;

  /**
   * Advance by `dt` seconds. `t` is elapsed seconds, `progress` the page scroll progress (0–1),
   * `dp` the progress change since the last step, `dir` the last scroll direction, `aspect` the
   * viewport width/height (so pitch uses true screen angles), `box` the creature's width in vw —
   * it re-enters from the other side the moment it has fully left, so it is almost always in view.
   */
  function step(t: number, dt: number, progress: number, dp: number, dir: 1 | -1, aspect: number, box: number) {
    const travel = c.heading * dir;
    const dx = travel * c.speed * dt + dp * c.gain * c.heading;
    let x = s.x + dx;
    if (x > 100) x = -box;
    else if (x < -box) x = 100;
    s.x = x;

    const prevY = s.y;
    const float = c.float * (Math.sin(t * c.freq + c.phase) + 0.45 * Math.sin(t * c.freq * 2.3 + c.phase * 1.7));
    s.y = piecewise(c.depth.at, c.depth.y, progress) + float;

    if (dt > 0) {
      // Smooth horizontal velocity so scroll bursts don't snap the angle.
      vx += (dx / dt - vx) * Math.min(1, dt * 6);
      const vy = (s.y - prevY) / dt;
      // Convert to the same screen units before taking the angle (vw vs svh differ by the aspect).
      const angle = (Math.atan2(vy, Math.abs(vx) * aspect + 0.0001) * 180) / Math.PI;
      const target = Math.max(-32, Math.min(32, angle));
      s.pitch += (target - s.pitch) * Math.min(1, dt * 4);
    }
    s.facing = (vx === 0 ? travel : Math.sign(vx)) as 1 | -1;
    s.effort = Math.min(3, Math.abs(vx) / c.speed);
    return s;
  }

  return { state: s, step };
}

/** The cast: whale, calf and three fish schools. */
export const CAST = {
  whale: { x: 8, speed: 3.2, gain: 140, heading: 1, depth: { at: [0, 0.25, 0.55, 0.8, 1], y: [52, 30, 50, 28, 42] }, float: 5, freq: 0.32, phase: 0 },
  calf: { x: -22, speed: 3.2, gain: 140, heading: 1, depth: { at: [0, 0.3, 0.6, 0.85, 1], y: [66, 44, 60, 40, 52] }, float: 6, freq: 0.4, phase: 1.4 },
  far: { x: 80, speed: 1.2, gain: 70, heading: -1, depth: { at: [0, 1], y: [40, 60] }, float: 6, freq: 0.5, phase: 2.6 },
  gold: { x: 70, speed: 4.5, gain: 220, heading: -1, depth: { at: [0, 1], y: [18, 26] }, float: 9, freq: 0.55, phase: 2.1 },
  red: { x: 10, speed: 3.6, gain: 190, heading: 1, depth: { at: [0, 1], y: [70, 64] }, float: 8, freq: 0.6, phase: 3.3 },
} satisfies Record<string, SwimConfig>;

export type CastName = keyof typeof CAST;

/** On-screen width per creature (fraction of viewport width, px cap) — matches the SVG classes. */
const FOOTPRINT: Record<CastName, { vw: (w: number) => number; max: number }> = {
  whale: { vw: (w) => (w < 640 ? 0.72 : w < 1024 ? 0.44 : 0.36), max: 540 },
  calf: { vw: (w) => (w < 640 ? 0.38 : 0.22), max: 260 },
  far: { vw: () => 0.3, max: 180 },
  gold: { vw: () => 0.44, max: 300 },
  red: { vw: () => 0.4, max: 260 },
};

/** A creature's current width in vw for this viewport width (px). */
export const boxVw = (name: CastName, width: number) => (Math.min(FOOTPRINT[name].vw(width) * width, FOOTPRINT[name].max) / width) * 100;
