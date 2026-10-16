import { PageIntro } from "@/components/inner/Sections";

/**
 * Legal page shell. The live site has no policy text yet, only a placeholder line, so these pages
 * carry that line and stay out of search results (noindex in their metadata) until the real text is in.
 */
export function LegalPage({ title, body }: { title: string; body: string }) {
  return (
    <div className="min-h-[70svh] bg-gold">
      <PageIntro kicker="Legal" title={title} lead={<p>{body}</p>} actions={false} />
    </div>
  );
}
