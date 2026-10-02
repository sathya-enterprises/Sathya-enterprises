import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SocialIcon } from "@/components/brand/SocialIcon";
import { brand, contact, divisions, socials } from "@/content/site";

const pages = [
  { href: "/", label: "Home" },
  ...divisions.map((d) => ({ href: d.href, label: d.name.charAt(0) + d.name.slice(1).toLowerCase() })),
  { href: "/contact", label: "Contact" },
];

/** Minimal footer resting on the seabed: brand, the six pages, socials, one way to get in touch. */
export function Footer() {
  const profiles = socials.filter((s) => s.url);
  return (
    <footer className="relative bg-linear-to-b from-transparent to-sea-abyss/90 text-ivory">
      <div className="reveal reveal-end container-x pt-24 pb-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Sathya Enterprises — home">
            <Logo size={52} />
            <span>
              <span className="block font-display text-[1.1rem] font-extrabold">Sathya Enterprises</span>
              <span className="block font-mono text-[0.65rem] font-bold tracking-[0.14em] text-gold">{brand.tagline}</span>
            </span>
          </Link>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[0.95rem] font-semibold">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="opacity-85 hover:text-gold hover:opacity-100">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {profiles.length > 0 && (
          <ul aria-label="Social media" className="mt-8 flex flex-wrap gap-3">
            {profiles.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={`Sathya Enterprises on ${s.label}`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-charcoal"
                >
                  <SocialIcon id={s.id} className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 text-[0.85rem] text-ivory/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Sathya Enterprises ·{" "}
            <a href={`mailto:${contact.email.value}`} className="hover:text-gold">
              {contact.email.value}
            </a>
          </p>
          <p className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-gold">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gold">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
