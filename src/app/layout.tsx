import type { Metadata } from "next";
import { Archivo, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SchemaOrg from "@/components/seo/SchemaOrg";
import ChatWidget from "@/components/chat/ChatWidget";
import Preloader from "@/components/ui/Preloader";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sathya Enterprises — Build. Market. Automate. Grow.",
  description:
    "Sathya Enterprises is a connected business ecosystem across digital marketing, technology, SaaS, data, products and services.",
  keywords:
    "Sathya Enterprises, digital marketing, AI automation, SaaS products, business ecosystem, startup consulting",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.sathyaenterprises.com" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.sathyaenterprises.com",
    siteName: "Sathya Enterprises",
    title: "Sathya Enterprises — Build. Market. Automate. Grow.",
    description:
      "Sathya Enterprises is a connected business ecosystem across digital marketing, technology, SaaS, data, products and services.",
    images: [
      {
        url: "https://www.sathyaenterprises.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sathya Enterprises",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sathya Enterprises — Build. Market. Automate. Grow.",
    description:
      "Sathya Enterprises is a connected business ecosystem across digital marketing, technology, SaaS, data, products and services.",
    images: ["https://www.sathyaenterprises.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${manrope.variable} ${spaceMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#fffdf8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Preloader />
        <SchemaOrg />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
