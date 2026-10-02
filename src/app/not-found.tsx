import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <section className="on-water container-x flex min-h-[80svh] items-center pt-[var(--header-h)]">
      <div className="max-w-xl">
        <Logo size={64} />
        <p className="t-eyebrow mt-6 text-gold">404</p>
        <h1 className="mt-2 font-display text-[clamp(2.2rem,8vw,3.75rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
          Lost at sea.
        </h1>
        <p className="mt-3 text-ivory/85">This page doesn&apos;t exist — let&apos;s get you back on course.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-gold px-6 py-3.5 font-bold text-charcoal hover:bg-ivory">
            Back to home
          </Link>
          <Link href="/contact" className="rounded-full bg-red px-6 py-3.5 font-bold text-white hover:bg-red-deep">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
