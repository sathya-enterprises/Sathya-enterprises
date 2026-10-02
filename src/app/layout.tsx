import type { Metadata, Viewport } from "next";
import { Archivo, Manrope, Space_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { brand } from "@/content/site";
import { organizationLd, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { OceanBackdrop } from "@/components/ocean/OceanBackdrop";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sathya Enterprises — Build. Market. Automate. Grow.",
    template: "%s — Sathya Enterprises",
  },
  description: brand.summary,
  applicationName: "Sathya Enterprises",
  authors: [{ name: "Sathya Enterprises" }],
  creator: "Sathya Enterprises",
  category: "business",
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: "Sathya Enterprises",
    locale: "en_IN",
    title: "Sathya Enterprises — Build. Market. Automate. Grow.",
    description: brand.positioning,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: "#2a86a3",
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${manrope.variable} ${spaceMono.variable}`}
    >
      <head>
        <JsonLd data={organizationLd()} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-red px-5 py-3 font-bold text-white focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <OceanBackdrop />
          <Header />
          <div className="relative z-10">
            <main id="main">{children}</main>
            <Footer />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
