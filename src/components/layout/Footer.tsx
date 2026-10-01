import Link from "next/link";
import { CoreMark } from "@/components/brand/CoreMark";
import { brand, businessesIn, contact, divisions } from "@/content/site";

export function Footer() {
  return (
    <footer data-tone="technology" className="tone relative overflow-hidden">
      <div className="container-x pt-16 pb-8 sm:pt-24 sm:pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_3fr]">
          <div>
            <CoreMark size={40} />
            <p className="mt-6 max-w-[34ch] text-[0.95rem] text-(--tone-soft)">{brand.summary}</p>
            <ul className="mt-8 space-y-2 text-[0.95rem]">
              <li>
                <a className="link-draw" href={`mailto:${contact.email.value}`}>
                  {contact.email.value}
                </a>
              </li>
              <li className="text-(--tone-soft)">
                {contact.phone.value}
                {contact.phone.placeholder && (
                  <span className="ml-2 rounded-full border border-(--tone-line) px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em]">
                    Placeholder
                  </span>
                )}
              </li>
              <li className="text-(--tone-soft)">{contact.location}</li>
            </ul>
          </div>

          <nav aria-label="Footer" className="grid gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-5">
            <div>
              <h2 className="t-eyebrow text-gold">Company</h2>
              <ul className="mt-3 flex flex-wrap gap-2 text-[0.88rem] text-(--tone-soft) sm:mt-4 sm:block sm:space-y-2 sm:text-[0.92rem]">
                {[
                  ["/about", "About"],
                  ["/ecosystem", "Our Ecosystem"],
                  ["/money-making-system", "Money-Making System"],
                  ["/contact", "Contact"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link className="inline-flex rounded-full border border-[color:var(--tone-line)] px-3 py-2 hover:text-ivory sm:rounded-none sm:border-0 sm:p-0" href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {divisions.map((d) => (
              <div key={d.id}>
                <h2 className="t-eyebrow text-gold">
                  <Link href={d.href} className="hover:text-ivory">
                    {d.name}
                  </Link>
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2 text-[0.88rem] text-(--tone-soft) sm:mt-4 sm:block sm:space-y-2 sm:text-[0.92rem]">
                  {businessesIn(d.id, { includeAlso: false }).map((b) => (
                    <li key={b.slug}>
                      <Link className="inline-flex rounded-full border border-[color:var(--tone-line)] px-3 py-2 hover:text-ivory sm:rounded-none sm:border-0 sm:p-0" href={`/${b.slug}`}>
                        {b.short}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p aria-hidden className="mt-14 select-none font-display font-extrabold text-ivory sm:mt-20">
          <span className="block leading-[0.82] tracking-tighter font-stretch-125% text-[clamp(3.4rem,14.6vw,14.5rem)]">SATHYA</span>
          <span className="block pl-[0.04em] leading-none tracking-[-0.02em] text-gold font-stretch-112% text-[clamp(1.75rem,6.5vw,6.45rem)]">ENTERPRISES</span>
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-(--tone-line) pt-6 text-[0.85rem] text-(--tone-soft) sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sathya Enterprises. All rights reserved.</p>
          <p className="font-mono text-[0.7rem] font-bold tracking-[0.16em] text-gold">{brand.tagline}</p>
          <p className="flex gap-5">
            <Link className="link-draw hover:text-ivory" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="link-draw hover:text-ivory" href="/terms">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
