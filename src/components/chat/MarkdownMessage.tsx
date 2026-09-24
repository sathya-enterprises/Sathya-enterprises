"use client";

import React from "react";
import Link from "next/link";

interface MarkdownMessageProps {
  content: string;
}

export default function MarkdownMessage({ content }: MarkdownMessageProps) {
  if (!content) return null;

  // Split into paragraphs / blocks
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className="space-y-2.5 text-zinc-800 text-[13.5px] leading-relaxed font-sans">
      {blocks.map((block, bIdx) => {
        const lines = block.split("\n").filter((l) => l.trim().length > 0);

        // Check if this block is a list
        const isList = lines.every((line) =>
          /^(\s*[-*•]|\s*\d+[.)]|\s*[0-9]️⃣)/.test(line.trim())
        );

        if (isList) {
          return (
            <ul key={bIdx} className="space-y-1.5 my-1.5 pl-3 list-none">
              {lines.map((line, lIdx) => {
                // Strip list bullet
                const cleaned = line.replace(/^(\s*[-*•]|\s*\d+[.)]|\s*[0-9]️⃣)\s*/, "");
                return (
                  <li key={lIdx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold mt-0.5 flex-shrink-0 text-xs">
                      •
                    </span>
                    <span className="flex-1">{parseInline(cleaned)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Regular paragraph
        return (
          <p key={bIdx} className="m-0">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {parseInline(line)}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

// Parses inline bold **text**, links [text](url), paths like /contact, emails
function parseInline(text: string): React.ReactNode[] {
  // Regex to match **bold**, [label](url), /contact, /ecosystem, emails
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\/[a-z0-9#-]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    if (!part) return null;

    // Bold **text**
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-bold text-zinc-950">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Markdown link [label](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      return (
        <Link
          key={idx}
          href={href}
          className="text-amber-700 font-semibold underline underline-offset-2 hover:text-amber-900 transition-colors"
        >
          {label}
        </Link>
      );
    }

    // Route links like /contact or /ecosystem
    if (/^\/(contact|ecosystem|about|services)/.test(part)) {
      return (
        <Link
          key={idx}
          href={part}
          className="text-amber-700 font-semibold underline underline-offset-2 hover:text-amber-900 transition-colors inline-block"
        >
          {part}
        </Link>
      );
    }

    // Email address
    if (part.includes("@") && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
      return (
        <a
          key={idx}
          href={`mailto:${part}`}
          className="text-amber-700 font-semibold underline underline-offset-2 hover:text-amber-900 transition-colors"
        >
          {part}
        </a>
      );
    }

    return <span key={idx}>{part}</span>;
  });
}
