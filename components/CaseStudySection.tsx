export default function CaseStudySection({
  id,
  title,
  paragraphs,
  challenge,
  impact,
}: {
  id?: string;
  title: string;
  paragraphs: React.ReactNode[];
  challenge?: React.ReactNode[];
  impact?: React.ReactNode[];
}) {
  return (
    <section id={id} className={id ? "scroll-mt-24" : undefined}>
      <h2 className="text-3xl font-extrabold tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-4 max-w-prose space-y-4 text-body">
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {challenge && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-ink">Challenge</h3>
          <div className="mt-3 max-w-prose space-y-4 text-body">
            {challenge.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {impact && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-ink">Impact</h3>
          <div className="mt-3 max-w-prose space-y-4 text-body">
            {impact.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
