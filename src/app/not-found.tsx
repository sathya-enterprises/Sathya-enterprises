import { Logo } from "@/components/brand/Logo";
import { ButtonLink, Eyebrow } from "@/components/home/primitives";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] items-center bg-ivory pt-(--header-h)">
      <div className="max-w-xl">
        <Logo size={64} />
        <div className="mt-6">
          <Eyebrow>404</Eyebrow>
        </div>
        <h1 className="mt-5 font-display text-[clamp(2.5rem,8vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-ink">
          Page <span className="text-red">not found.</span>
        </h1>
        <p className="t-lead mt-4 text-ink-soft">This page doesn&apos;t exist — let&apos;s get you back on course.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Back to Home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
