import { ProjectNavigationLink as Link } from "./portfolio-motion/PageCrossfade";
import EyebrowLabel from "./EyebrowLabel";

export type CaseStudyDestination = { label: string; href: string };

export default function CaseStudyNavigation({
  previous,
  next,
}: {
  previous?: CaseStudyDestination;
  next?: CaseStudyDestination;
}) {
  return (
    <nav aria-label="Case study navigation" className="grid grid-cols-2 gap-4">
      {previous && (
        <div className="min-w-0 text-left">
          <EyebrowLabel>Previous</EyebrowLabel>
          <Link href={previous.href} className="mt-2 inline-flex items-start gap-1.5 text-base font-bold text-ink underline-offset-4 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            <span aria-hidden="true">←</span>
            <span>{previous.label}</span>
          </Link>
        </div>
      )}
      {next && (
        <div className="col-start-2 min-w-0 text-right">
          <EyebrowLabel>Next</EyebrowLabel>
          <Link href={next.href} className="mt-2 inline-flex items-start justify-end gap-1.5 text-base font-bold text-ink underline-offset-4 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            <span>{next.label}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
