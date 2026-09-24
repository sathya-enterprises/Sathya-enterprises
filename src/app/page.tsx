import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustRibbon from "@/components/home/TrustRibbon";
import AboutSection from "@/components/home/AboutSection";
import EcosystemSection from "@/components/home/EcosystemSection";
import MoneySystemSection from "@/components/home/MoneySystemSection";
import ProcessSection from "@/components/home/ProcessSection";
import DigitalSection from "@/components/home/DigitalSection";
import TechnologySection from "@/components/home/TechnologySection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StatsSection from "@/components/home/StatsSection";
import WhatsNextSection from "@/components/home/WhatsNextSection";
import FaqSection from "@/components/home/FaqSection";
import CtaSection from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title: "Sathya Enterprises — Build. Market. Automate. Grow.",
  description:
    "Sathya Enterprises is a connected business ecosystem across digital marketing, technology, SaaS, data, products and services — Bengaluru, India.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustRibbon />
      <AboutSection />
      <EcosystemSection />
      <MoneySystemSection />
      <ProcessSection />
      <DigitalSection />
      <TechnologySection />
      <ServicesSection />
      <TestimonialsSection />
      <StatsSection />
      <WhatsNextSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
