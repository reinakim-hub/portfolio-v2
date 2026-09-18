import ProseColumn from "./ProseColumn";

export default function CaseStudySection({
  id,
  title,
  paragraphs,
  challenge,
  impact,
  divider = false,
}: {
  id?: string;
  title: string;
  paragraphs: React.ReactNode[];
  challenge?: React.ReactNode[];
  impact?: React.ReactNode[];
  /** Draws the text-section divider on this section's own reading wrapper
   * (border-t + pt-10) instead of a full-width rule above it, so the rule
   * lines up with the heading/paragraphs it introduces. */
  divider?: boolean;
}) {
  return (
    <section id={id} className={id ? "scroll-mt-24" : undefined}>
      <ProseColumn className={divider ? "border-t border-rule pt-10" : undefined}>
        <h2 className="case-study-heading">{title}</h2>
        <div className="copy-body mt-4 space-y-4 text-body">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {challenge && (
          <div className="mt-8">
            <h3 className="text-base font-semibold text-ink">Challenge</h3>
            <div className="copy-body mt-3 space-y-4 text-body">
              {challenge.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {impact && (
          <div className="mt-8">
            <h3 className="text-base font-semibold text-ink">Impact</h3>
            <div className="copy-body mt-3 space-y-4 text-body">
              {impact.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </ProseColumn>
    </section>
  );
}
