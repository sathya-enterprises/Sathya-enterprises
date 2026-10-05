import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SocialIcon } from "@/components/brand/SocialIcon";
import { brand, contact, divisions, socials } from "@/content/site";

const divisionLinks = divisions.map((d) => ({ href: d.href, label: d.name.charAt(0) + d.name.slice(1).toLowerCase() }));
const companyLinks = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const heading = "font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-gold";
const link = "text-[0.95rem] text-ivory/80 transition-colors duration-200 hover:text-gold";

/**
 * A solid base under the water: brand and positioning, then Divisions / Company / Get in touch columns,
 * then the copyright line. Phones: brand on top, the two link lists side by side, contact below.
 */
export function Footer() {
  const profiles = socials.filter((s) => s.url);
  return (
    <footer className="relative border-t border-white/12 bg-sea-abyss text-ivory">
      <div className="container-x py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,2fr)_minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Sathya Enterprises — home">
              <Logo size={48} />
              <span>
                <span className="block font-display text-[1.1rem] font-extrabold">Sathya Enterprises</span>
                <span className="block font-mono text-[0.62rem] font-bold tracking-[0.14em] text-gold">{brand.tagline}</span>
              </span>
            </Link>
            <p className="mt-5 max-w-[34ch] text-[0.95rem] text-ivory/70">{brand.positioning}</p>
            {profiles.length > 0 && (
              <ul aria-label="Social media" className="mt-6 flex flex-wrap gap-3">
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
          </div>

          <nav aria-label="Divisions">
            <p className={heading}>Divisions</p>
            <ul className="mt-4 space-y-2.5">
              {divisionLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className={heading}>Company</p>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-1">
            <p className={heading}>Get in touch</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${contact.email.value}`} className={`${link} [overflow-wrap:anywhere]`}>
                  {contact.email.value}
                </a>
              </li>
              <li className="text-[0.95rem] text-ivory/80">{contact.location}</li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/12 pt-6 text-[0.85rem] text-ivory/60">© {new Date().getFullYear()} Sathya Enterprises</p>
      </div>
    </footer>
  );
}
