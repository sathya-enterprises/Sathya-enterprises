"use client";

import { useEffect, useRef } from "react";

/**
 * Glowing water-cell background (the Vanta.js "cells" effect used on vitreous-tau.vercel.app):
 * layered worley noise, lit like light through water, drifting slowly. Plain WebGL on one
 * full-screen triangle — no three.js. Renders at reduced resolution (it is soft by nature), pauses
 * while off screen or in a background tab, and draws a single still frame for reduced motion.
 */

const VERTEX = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// The Vanta cells shader; `uView` (CSS pixels) keeps the pattern's scale independent of render resolution.
const FRAGMENT = `
// highp is required: the sin/fract hash in noise() breaks down at mediump on most real GPUs and
// the cells wash out to a white blur (three.js, which Vanta runs on, also defaults to highp).
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 iResolution;
uniform vec2 uView;
uniform float iTime;
uniform vec3 color1;
uniform vec3 color2;
uniform float size;

float length2(vec2 p) { return dot(p, p); }

float noise(vec2 p) {
  return fract(sin(fract(sin(p.x) * (43.13311)) + p.y) * 31.0011);
}

float worley(vec2 p) {
  float d = 1e30;
  for (int xo = -1; xo <= 1; ++xo) {
    for (int yo = -1; yo <= 1; ++yo) {
      vec2 tp = floor(p) + vec2(xo, yo);
      d = min(d, length2(p - tp - vec2(noise(tp))));
    }
  }
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float timeOffset = 0.15 * sin(iTime * 2.0 + 10.0 * (uv.x - uv.y));
  return 3.0 * exp(-4.0 * abs(2.0 * d - 1.0 + timeOffset));
}

float fworley(vec2 p) {
  return sqrt(sqrt(sqrt(
    1.1 *
    worley(p * 5. + .3 + iTime * .0525) *
    sqrt(worley(p * 50. / size + 0.3 + iTime * -0.15)) *
    sqrt(sqrt(worley(p * -10. + 9.3))))));
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float t = fworley(uv * uView / 1500.0);
  t *= exp(-length2(abs(0.7 * uv - 1.0)));
  float tExp = pow(t, 0.5 - t);
  vec3 c1 = color1 * (1.0 - t);
  vec3 c2 = color2 * tExp;
  gl_FragColor = vec4(pow(t, 1.0 - t) * (c1 + c2), 1.0);
}
`;

/**
 * Hex → linear RGB. three.js (which Vanta runs on) converts colours to linear before handing them to
 * the shader, and the shader writes them out as is — so this is what gives the effect its depth.
 */
const srgbToLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const hexToRgb = (hex: string) =>
  [1, 3, 5].map((i) => srgbToLinear(parseInt(hex.slice(i, i + 2), 16) / 255)) as [number, number, number];

export function CellsBackdrop({
  color1 = "#0f766e",
  color2 = "#22d3ee",
  size = 2,
  speed = 1.5,
  /** Render resolution relative to CSS pixels. */
  quality = 0.6,
  className = "",
}: {
  color1?: string;
  color2?: string;
  size?: number;
  speed?: number;
  quality?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", { antialias: false, depth: false, powerPreference: "low-power" });
    if (!canvas || !gl) return;

    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, shader(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // One triangle covering the screen.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    gl.uniform3fv(u("color1"), hexToRgb(color1));
    gl.uniform3fv(u("color2"), hexToRgb(color2));
    gl.uniform1f(u("size"), size);
    const uRes = u("iResolution");
    const uView = u("uView");
    const uTime = u("iTime");

    // Vanta advances iTime by speed / 60 per frame; here by real time, so it runs the same at any frame rate.
    let time = 1;
    let last = 0;
    let frame = 0;
    let running = false;
    let visible = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const draw = () => {
      gl.uniform1f(uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * quality));
      canvas.height = Math.max(1, Math.round(height * quality));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uView, width, height);
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw();
    });
    ro.observe(canvas);

    const tick = (now: number) => {
      if (last) time += (Math.min(now - last, 50) / 1000) * speed;
      last = now;
      draw();
      frame = requestAnimationFrame(tick);
    };
    const update = () => {
      const should = visible && !document.hidden && !reduced;
      if (should && !running) {
        running = true;
        last = 0;
        frame = requestAnimationFrame(tick);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    };
    draw();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      update();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", update);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", update);
      // No loseContext() here: React re-runs effects on the same canvas (dev Strict Mode), and
      // getContext() would hand back the dead context — the browser frees it with the canvas.
    };
  }, [color1, color2, size, speed, quality]);

  return <canvas ref={ref} aria-hidden className={`block h-full w-full bg-[#0b2a33] ${className}`} />;
}
