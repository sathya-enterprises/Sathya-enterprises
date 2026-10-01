import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

/**
 * Server-rendered headline whose words rise into place (CSS `.enter-word`).
 * Words are always painted and never clipped (opacity 1, no mask) so the heading is visible to crawlers
 * and counts for LCP on first paint; only transform animates. Each line keeps its own wrapper so breaks are designed.
 */
export function SplitHeading({
  lines,
  as: Tag = "h1",
  className,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2";
  className?: string;
}) {
  let w = 0;
  const split = (node: ReactNode): ReactNode => {
    if (typeof node === "string") {
      return node.split(/(\s+)/).map((part, i) =>
        /^\s+$/.test(part) || part === "" ? (
          part
        ) : (
          <span key={i} className="enter-word" style={{ ["--w" as string]: w++ }}>
            {part}
          </span>
        ),
      );
    }
    if (isValidElement(node)) {
      const el = node as ReactElement<{ children?: ReactNode }>;
      return cloneElement(el, undefined, Children.map(el.props.children, split));
    }
    return node;
  };
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block">
          {split(line)}
        </span>
      ))}
    </Tag>
  );
}
