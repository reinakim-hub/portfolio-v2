import ProseColumn from "./ProseColumn";

export default function CalloutNote({
  label,
  paragraphs,
}: {
  label: string;
  paragraphs: React.ReactNode[];
}) {
  return (
    <ProseColumn className="space-y-4 text-accent">
      {paragraphs.map((paragraph, i) => (
        <p key={i}>
          {i === 0 && (
            <>
              <strong className="font-semibold">{label}:</strong>{" "}
            </>
          )}
          {paragraph}
        </p>
      ))}
    </ProseColumn>
  );
}
