import CaseStudyNavigation, { type CaseStudyDestination } from "./CaseStudyNavigation";
import ProseColumn from "./ProseColumn";

/** Below desktop, project navigation follows the narrative. */
export default function CaseStudyNextNav({ previous, next }: {
  previous?: CaseStudyDestination;
  next?: CaseStudyDestination;
}) {
  return (
    <ProseColumn className="mt-12 border-t border-rule pt-8 xl:hidden">
      <CaseStudyNavigation previous={previous} next={next} />
    </ProseColumn>
  );
}
