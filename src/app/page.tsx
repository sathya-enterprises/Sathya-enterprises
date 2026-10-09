import { HeroParallax } from "@/components/home/HeroParallax";
import { StoryTelling } from "@/components/home/StoryTelling";
import { EcosystemCards } from "@/components/home/EcosystemCards";
import { MoneySystemSequence } from "@/components/home/MoneySystemSequence";
import { StartGrowing } from "@/components/home/StartGrowing";
import { CtaSection } from "@/components/home/CtaSection";

export default function Home() {
  return (
    <main className="bg-[#FFFDF8] min-h-screen">
      <HeroParallax />
      <StoryTelling />
      <EcosystemCards />
      <MoneySystemSequence />
      <StartGrowing />
      <CtaSection />
    </main>
  );
}
