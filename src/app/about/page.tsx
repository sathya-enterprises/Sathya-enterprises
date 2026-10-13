import type { Metadata } from "next";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { about } from "@/content/site";
import { HeroParallax } from "@/components/home/HeroParallax";
import { StoryTelling, type Chapter } from "@/components/home/StoryTelling";
import { EcosystemCards } from "@/components/home/EcosystemCards";

export const metadata: Metadata = pageMeta({
  title: "About",
  description: `${about.intro} ${about.chapters[1].body}`,
  path: "/about",
});

/** The live About chapters, told with the home page's chapter slider: a short lead + one big word each. */
const chapters: Chapter[] = about.chapters.map((c, i) => {
  const [lead, ...rest] = c.title === "Who We Are" ? ["Who", "We Are"] : c.title.split(" ");
  return {
    lead,
    // Non-breaking space: the big word is laid out letter by letter and must stay on one line.
    word: rest.join(" ").replace(/ /g, String.fromCharCode(160)),
    stop: i % 2 ? "text-gold" : "text-red",
    body: c.body,
  };
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <JsonLd data={[breadcrumbLd([{ name: "About", path: "/about" }])]} />
      <HeroParallax top="About" bottom="More than a business" label="About Sathya Enterprises" />
      <StoryTelling chapters={chapters} label="Our story" />
      <EcosystemCards />
    </div>
  );
}
