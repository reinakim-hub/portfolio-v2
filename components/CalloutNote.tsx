export default function CalloutNote({
  icon = "📝",
  label,
  paragraphs,
}: {
  icon?: string;
  label: string;
  paragraphs: React.ReactNode[];
}) {
  return (
    <div className="space-y-4 text-accent">
      {paragraphs.map((paragraph, i) => (
        <p key={i}>
          {i === 0 && (
            <>
              <span aria-hidden="true">{icon} </span>
              <strong className="font-semibold">{label}:</strong>{" "}
            </>
          )}
          {paragraph}
        </p>
      ))}
    </div>
  );
}
