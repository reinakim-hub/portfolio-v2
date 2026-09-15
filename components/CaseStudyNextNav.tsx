import Link from "next/link";
import EyebrowLabel from "./EyebrowLabel";
import ProseColumn from "./ProseColumn";

const linkStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

/**
 * Closes out a case study's middle-column narrative: a quiet "Next case
 * study" label, the next project's name as a large text link (no
 * thumbnail, card, or marquee — just typography), and a quieter "All work"
 * link back to the homepage's project list. Sits in normal document flow
 * as the last thing in the scrolling middle column, inside the same
 * `ProseColumn` reading wrapper as the rest of the narrative, so its left
 * edge lines up with every heading and paragraph above it. The divider
 * above it is drawn the same way every other section divider in a case
 * study is: `border-t` + top padding on this component's own `ProseColumn`,
 * not on an outer full-width wrapper.
 *
 * `next` is omitted for the last case study in the site's project order —
 * only "All work" renders then, with no empty "next case study" label.
 */
export default function CaseStudyNextNav({
  next,
}: {
  next?: { label: string; href: string };
}) {
  return (
    <ProseColumn className="mt-12 border-t border-rule pt-8">
      {next && (
        <div>
          <EyebrowLabel>Next case study</EyebrowLabel>
          <Link
            href={next.href}
            className={`mt-3 inline-flex items-center gap-2 font-heading text-3xl font-extrabold tracking-tight text-ink hover:text-accent ${linkStyle}`}
          >
            {next.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
      <Link
        href="/#projects"
        className={`inline-block text-sm text-muted underline-offset-4 hover:text-ink hover:underline ${linkStyle} ${next ? "mt-6" : ""}`}
      >
        All work
      </Link>
    </ProseColumn>
  );
}
