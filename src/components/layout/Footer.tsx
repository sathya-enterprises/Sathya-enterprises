import Image from "next/image";
import Link from "next/link";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
  MessageCircleIcon,
} from "@/components/ui/Icons";

const FOOTER_COLS = [
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/ecosystem", label: "Our Ecosystem" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Digital",
    links: [
      { href: "/digital-marketing", label: "Digital Marketing" },
      { href: "/logo-design", label: "Logo Design" },
      { href: "/web-development", label: "Web Development" },
      { href: "/seo", label: "SEO" },
      { href: "/sem", label: "SEM" },
      { href: "/social-media-management", label: "Social Media" },
      { href: "/instagram-marketing", label: "Instagram" },
      { href: "/lead-generation", label: "Lead Generation" },
    ],
  },
  {
    heading: "Technology",
    links: [
      { href: "/saas-products", label: "SaaS" },
      { href: "/ai-automation", label: "AI Automation" },
      { href: "/whatsapp-business-solutions", label: "WhatsApp" },
      { href: "/data-solutions", label: "Data" },
    ],
  },
  {
    heading: "Services",
    links: [
      { href: "/water-pumps", label: "Water Pumps" },
      { href: "/borewell-services", label: "Borewell" },
      { href: "/cctv-security", label: "CCTV" },
      { href: "/travels", label: "Travels" },
      { href: "/interiors-architecture", label: "Interiors" },
      { href: "/interiors-architecture", label: "Architecture" },
      { href: "/startup-consulting", label: "Startup Consulting" },
    ],
  },
];

const SOCIAL = [
  { href: "https://instagram.com/", label: "Instagram", icon: InstagramIcon },
  { href: "https://linkedin.com/", label: "LinkedIn", icon: LinkedinIcon },
  { href: "https://facebook.com/", label: "Facebook", icon: FacebookIcon },
  { href: "https://wa.me/910000000000", label: "WhatsApp", icon: MessageCircleIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="footer"
      role="contentinfo"
      style={{ borderTop: "1px solid rgba(200,168,75,0.2)" }}
    >
      <div className="container">
        <div className="footer__top">
          {/* Brand block with Logo */}
          <div>
            <div className="flex items-center gap-3.5 mb-5">
              <Image
                src="/images/logo.png"
                alt="Sathya Enterprises Logo"
                width={32}
                height={32}
                className="object-contain"
                style={{ filter: "drop-shadow(0 0 6px rgba(200,168,75,0.45))" }}
              />
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight font-display m-0 leading-none">
                  Sathya <span className="text-amber-500">Enterprises</span>
                </h3>
                <p className="text-[10px] font-mono tracking-widest text-amber-500/80 uppercase mt-1 m-0">
                  Digital · Tech · Services
                </p>
              </div>
            </div>

            <p className="footer__desc">
              Sathya Enterprises operates across digital growth, technology, data,
              products, infrastructure and business services — one connected
              ecosystem built to grow.
            </p>

            <address className="footer__contact" style={{ fontStyle: "normal" }}>
              <a href="tel:+910000000000" aria-label="Call us">
                <PhoneIcon /> +91 00000 00000
              </a>
              <a href="mailto:hello@sathyaenterprises.com" aria-label="Email us">
                <MailIcon /> hello@sathyaenterprises.com
              </a>
              <span>
                <MapPinIcon /> Bengaluru, Karnataka, India
              </span>
            </address>

            <div className="footer__social">
              {SOCIAL.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  className="icon-badge"
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ borderRadius: "50%" }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <nav className="footer__cols" aria-label="Footer navigation">
            {FOOTER_COLS.map((col) => (
              <div key={col.heading} className="footer__col">
                <h5>{col.heading}</h5>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Large wordmark */}
        <p
          className="footer__wordmark"
          aria-hidden="true"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
        >
          Sathya <span>Enterprises</span>
        </p>
        <p className="footer__tagline">BUILD. MARKET. AUTOMATE. GROW.</p>

        {/* Gold gradient divider */}
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(200,168,75,0.3), transparent)",
            marginBottom: "0",
          }}
        />

        {/* Bottom bar */}
        <div className="footer__bottom">
          <span>© {year} Sathya Enterprises. All rights reserved.</span>
          <nav className="footer__legal" aria-label="Legal links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
