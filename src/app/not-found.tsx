import Link from "next/link";
import { CoreMark } from "@/components/brand/CoreMark";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-[var(--header-h)]">
      <CoreMark size={56} />
      <p className="t-eyebrow mt-8 text-red-deep">404</p>
      <h1 className="t-display mt-4">
        NOT IN THE
        <br />
        <span className="text-red">ECOSYSTEM.</span>
      </h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="rounded-full bg-red px-6 py-3.5 font-bold text-white hover:bg-gold hover:text-charcoal">
          Back to home
        </Link>
        <Link href="/ecosystem" className="rounded-full border-[1.5px] border-line-strong px-6 py-3.5 font-bold hover:border-red hover:text-red">
          Explore Our Businesses
        </Link>
      </div>
    </section>
  );
}
