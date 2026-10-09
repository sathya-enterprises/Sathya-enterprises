"use client";

import { useId, useRef, useState } from "react";
import { m, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { Building2, ChevronDown, Mail, Nfc, Phone, Send, Sparkles, Timer, User } from "lucide-react";
import { contact } from "@/content/site";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

/**
 * "Start growing" — a frosted-glass enquiry panel beside a glass membership-style card, floating over
 * soft, slowly drifting pools of brand colour on the ivory page (after the Vitreous banking hero, in a
 * light key). The card fills in live from the form: the name typed becomes the card holder, the
 * chosen service its plan.
 *
 * There is no form backend yet, so sending composes the enquiry in the visitor's email app,
 * addressed to the published email. Swap `send` for a real endpoint when one exists.
 */

const GLASS =
  "border border-white/80 bg-white/45 shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_30px_70px_-30px_rgb(158_16_38/0.28)] backdrop-blur-xl";
const FIELD =
  "peer w-full rounded-2xl border border-ink/12 bg-white/70 py-3.5 pl-4 pr-11 text-[0.95rem] text-ink outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-ink-soft/75 hover:border-ink/25 focus:border-red focus:bg-white focus:shadow-[0_0_0_3px_rgb(200_16_46/0.14)]";

const FIELDS = [
  { name: "name", label: "Full Name", type: "text", auto: "name", required: true, icon: User },
  { name: "company", label: "Business (optional)", type: "text", auto: "organization", required: false, icon: Building2 },
  { name: "email", label: "Email Address", type: "email", auto: "email", required: true, icon: Mail },
  { name: "phone", label: "Phone Number", type: "tel", auto: "tel", required: true, icon: Phone },
] as const;

/** Soft pools of brand colour drifting slowly under a faint caustic texture, on ivory. */
function LiquidBackdrop({ progress }: { progress: MotionValue<number> }) {
  const filterId = useId().replace(/:/g, "");
  // progress 0 → 1 across the section's pass through the screen; 0.5 = section fills the screen.
  const y1 = useTransform(progress, (v) => `${(v - 0.5) * -28}%`);
  const y2 = useTransform(progress, (v) => `${(v - 0.5) * 18}%`);
  const y3 = useTransform(progress, (v) => `${(v - 0.5) * -12}%`);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-ivory">
      {/* Each pool sits on its own depth: they slide past each other as the section scrolls. */}
      <m.div style={{ y: y1 }} className="absolute inset-0">
        <div className="liquid-pool left-[-12%] top-[-18%] h-[65%] w-[55%] bg-gold/40 [--dx:8%] [--dy:10%]" />
      </m.div>
      <m.div style={{ y: y2 }} className="absolute inset-0">
        <div className="liquid-pool right-[-14%] top-[12%] h-[75%] w-[50%] bg-red/[0.16] [--dx:-10%] [--dy:6%] [animation-delay:-6s]" />
      </m.div>
      <m.div style={{ y: y3 }} className="absolute inset-0">
        <div className="liquid-pool bottom-[-30%] left-[22%] h-[65%] w-[55%] bg-gold-tint/80 [--dx:6%] [--dy:-8%] [animation-delay:-12s]" />
      </m.div>
      {/* Caustic cells, like light through water. Static texture, moved slowly as one layer. */}
      <svg className="liquid-cells absolute -inset-[10%] h-[120%] w-[120%] opacity-30 mix-blend-multiply">
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="2" seed="7" />
          <feColorMatrix values="0 0 0 0 0.96  0 0 0 0 0.78  0 0 0 0 0.6  0 0 0 -2.2 1.4" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>
    </div>
  );
}

/** The glass card: tilts towards the pointer and floats gently. */
function GrowthCard({ holder, plan }: { holder: string; plan: string }) {
  const reduced = useReducedMotionSafe();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 18 });
  const shine = useTransform(px, [-0.5, 0.5], ["20%", "80%"]);
  const shineBg = useTransform(shine, (s) => `radial-gradient(circle at ${s} 0%, rgb(255 255 255 / 0.7), transparent 55%)`);

  return (
    <div
      className="[perspective:1200px]"
      onPointerMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <div className="card-float">
        <m.div
          style={{ rotateX, rotateY }}
          className={`relative aspect-[1.586] w-full overflow-hidden rounded-[28px] p-[7%] text-ink ${GLASS}`}
        >
          <m.div aria-hidden style={{ background: shineBg }} className="pointer-events-none absolute inset-0" />

          <div className="relative flex h-full flex-col">
            <div className="flex items-start justify-between">
              <p className="font-display text-[clamp(1.2rem,2.4vw,1.75rem)] font-extrabold uppercase leading-none tracking-[-0.03em]">
                Sathya
              </p>
              <Nfc aria-hidden className="h-8 w-8 text-ink-soft md:h-9 md:w-9" />
            </div>

            {/* Chip */}
            <div
              aria-hidden
              className="mt-[5%] h-[18%] w-[15%] rounded-[22%] bg-[linear-gradient(135deg,#ffe08a,var(--color-gold)_45%,#d99a1e)] shadow-[inset_0_0_0_1px_rgb(120_70_0/0.35)]"
            >
              <div className="h-full w-full rounded-[22%] bg-[linear-gradient(transparent_32%,rgb(120_70_0/0.3)_32%,rgb(120_70_0/0.3)_36%,transparent_36%,transparent_64%,rgb(120_70_0/0.3)_64%,rgb(120_70_0/0.3)_68%,transparent_68%),linear-gradient(90deg,transparent_40%,rgb(120_70_0/0.3)_40%,rgb(120_70_0/0.3)_44%,transparent_44%)]" />
            </div>

            <p className="mt-auto whitespace-nowrap font-mono text-[clamp(0.62rem,1.05vw,0.95rem)] font-bold tracking-[0.12em]">
              BUILD · MARKET · AUTOMATE · GROW
            </p>

            <div className="mt-[5%] flex items-end gap-[8%]">
              <div className="min-w-0">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-ink-soft">Growth partner</p>
                <p className="mt-1 truncate text-sm font-bold uppercase tracking-wide">{holder || "Your Name"}</p>
              </div>
              <div className="min-w-0">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-ink-soft">Plan</p>
                <p className="mt-1 truncate text-sm font-bold">{plan || "Any service"}</p>
              </div>
              <p className="ml-auto font-display text-[clamp(1.6rem,3.2vw,2.4rem)] font-extrabold italic leading-none tracking-[-0.04em] text-red">
                SE
              </p>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
}

export function StartGrowing() {
  const [holder, setHolder] = useState("");
  const [plan, setPlan] = useState("");
  const [sent, setSent] = useState(false);
  const titleId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();

  // Scroll-linked, both directions. p: 0 = section just below the screen, 0.5 = filling it, 1 = gone above.
  // Function transforms on purpose (the array form gets handed to a native scroll timeline, which
  // misreads this range). Entering, the form slides in from the left and the card swings in from the
  // right; leaving, both lift away at different speeds.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const p = useTransform(scrollYProgress, (v) => (reduced ? 0.5 : v));
  const enter = (v: number) => 1 - (1 - Math.min(1, v / 0.45)) ** 3; // ease-out cubic, done by 45%
  const leave = (v: number) => Math.max(0, (v - 0.55) / 0.45);
  const formStyle = {
    x: useTransform(p, (v) => `${(1 - enter(v)) * -22}%`),
    y: useTransform(p, (v) => `${leave(v) * -10}%`),
    opacity: useTransform(p, (v) => 0.15 + 0.85 * enter(v)),
  };
  const cardStyle = {
    x: useTransform(p, (v) => `${(1 - enter(v)) * 55}%`),
    y: useTransform(p, (v) => `${leave(v) * -28}%`),
    rotate: useTransform(p, (v) => (1 - enter(v)) * 22 - leave(v) * 8),
    scale: useTransform(p, (v) => 0.82 + 0.18 * enter(v)),
    opacity: useTransform(p, (v) => enter(v)),
  };

  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Name: ${f.get("name")}`,
      `Business: ${f.get("company") || "-"}`,
      `Email: ${f.get("email")}`,
      `Phone: ${f.get("phone")}`,
      `Service: ${plan || "-"}`,
    ].join("\n");
    const subject = `Enquiry — ${plan || "Sathya Enterprises"}`;
    window.location.href = `mailto:${contact.email.value}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section
      id="start"
      aria-labelledby={titleId}
      ref={sectionRef}
      className="relative isolate flex items-center overflow-hidden py-[var(--section-y)] lg:min-h-svh lg:py-[calc(var(--header-h)+2rem)]"
    >
      <LiquidBackdrop progress={p} />

      <div className="container-x relative grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        {/* Enquiry panel */}
        <m.div style={formStyle}>
          <form onSubmit={send} className={`rounded-[32px] p-6 text-ink sm:p-9 ${GLASS}`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <span aria-hidden className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-gold/50 bg-gold-light">
                  <Sparkles className="h-6 w-6 text-red" />
                </span>
                <div>
                  <h2 id={titleId} className="font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-extrabold leading-none tracking-[-0.03em]">
                    Start Growing
                  </h2>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-soft">
                    <Timer aria-hidden className="h-3.5 w-3.5 text-red" />
                    Takes under a minute
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3.5 py-2 text-[0.8rem] font-semibold" aria-live="polite">
                <span aria-hidden className="h-2 w-2 rounded-full bg-gold" />
                {plan ? `${plan} selected` : "No service chosen yet"}
              </span>
            </div>
  
            <div className="my-7 h-px bg-ink/10" />
  
            <div className="grid gap-4 sm:grid-cols-2">
              {FIELDS.map(({ icon: Icon, ...f }) => (
                <div key={f.name} className="relative">
                  <label htmlFor={`sg-${f.name}`} className="sr-only">
                    {f.label}
                    {f.required ? " (required)" : ""}
                  </label>
                  <input
                    id={`sg-${f.name}`}
                    name={f.name}
                    type={f.type}
                    autoComplete={f.auto}
                    required={f.required}
                    placeholder={f.label}
                    maxLength={f.name === "name" ? 40 : undefined}
                    onChange={f.name === "name" ? (e) => setHolder(e.target.value) : undefined}
                    className={FIELD}
                  />
                  <Icon aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-soft/80 peer-focus:text-red" />
                </div>
              ))}
            </div>
  
            <div className="my-7 h-px bg-ink/10" />
  
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="sm:w-[42%]">
                <label htmlFor="sg-service" className="mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-soft">
                  Service
                </label>
                <div className="relative">
                  <select
                    id="sg-service"
                    name="service"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    className={`${FIELD} appearance-none`}
                  >
                    <option value="">Choose a service</option>
                    {contact.requirements.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-red" />
                </div>
              </div>
              <button
                type="submit"
                className="group inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-red px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-ivory shadow-[0_14px_32px_-14px_rgb(200_16_46/0.7)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-red-deep active:translate-y-0"
              >
                Send Enquiry
                <Send aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
  
            <p role="status" className="mt-5 text-[0.82rem] text-ink-soft">
              {sent ? (
                <>
                  Your email app should have opened with the enquiry. If it didn&apos;t, write to{" "}
                  <a className="font-bold text-red underline" href={`mailto:${contact.email.value}`}>
                    {contact.email.value}
                  </a>
                  .
                </>
              ) : (
                "Opens your email app with the enquiry ready to send."
              )}
            </p>
          </form>
        </m.div>

        {/* Live card */}
        <m.div style={cardStyle} className="mx-auto w-full max-w-[460px] lg:mx-0 lg:justify-self-end">
          <GrowthCard holder={holder} plan={plan} />
        </m.div>
      </div>
    </section>
  );
}
