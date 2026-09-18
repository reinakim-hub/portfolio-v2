import Link from "next/link";
import EyebrowLabel from "./EyebrowLabel";
import ProseColumn from "./ProseColumn";

const linkStyle =
  "focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

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
 *
 * `xl:hidden`: from `xl` up, `CaseStudySidebar` renders this same
 * navigation itself (compact, pinned toward the left sidebar's bottom
 * edge) — see its own doc comment. This instance stays visible below `xl`
 * (after the narrative, its original position) so exactly one accessible
 * instance of the navigation exists at any given breakpoint, never both.
 */
export default function CaseStudyNextNav({
  next,
}: {
  next?: { label: string; href: string };
}) {
  return (
    <ProseColumn className="mt-12 border-t border-rule pt-8 xl:hidden">
      {next && (
        <div>
          <EyebrowLabel>Next case study</EyebrowLabel>
          <Link
            href={next.href}
            className={`mt-3 inline-flex items-center gap-2 font-heading text-3xl font-extrabold tracking-tight text-ink underline-offset-4 hover:text-accent hover:underline ${linkStyle}`}
          >
            {next.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
      <Link
        href="/#projects"
        className={`inline-block text-sm text-muted underline-offset-4 hover:text-accent hover:underline ${linkStyle} ${next ? "mt-6" : ""}`}
      >
        All work
      </Link>
    </ProseColumn>
  );
}
