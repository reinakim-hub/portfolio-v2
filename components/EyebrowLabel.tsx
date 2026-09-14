/**
 * Small uppercase label used to head a section or tag a project.
 * Deliberately quieter than `SectionLabel` (blue, heading-sized), which the
 * case-study pages use — this one is for the homepage's grid-line layout.
 */
export default function EyebrowLabel({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: React.ReactNode;
  as?: "h2" | "h3" | "p" | "span";
  className?: string;
}) {
  return (
    <Tag
      className={`font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-muted ${className}`}
    >
      {children}
    </Tag>
  );
}
