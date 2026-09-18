/**
 * Small uppercase label used to head a section or tag a project.
 * Deliberately quieter than `SectionLabel` (heading-sized), which the
 * case-study pages use — this one is for the homepage's grid-line layout.
 *
 * `quiet` (opt-in, defaults off) swaps the uppercase/tracked/`copy-caption`
 * treatment for Home's own plain section-label style — normal
 * capitalization and letter-spacing, `text-sm font-normal text-muted`,
 * byte-for-byte the same as `SECTION_HEADING` in `app/page.tsx` — so a
 * page can reuse this exact treatment instead of re-deriving it. Only
 * About's "Outside of work"/"Background" labels pass it; every other
 * caller keeps the default uppercase style unchanged.
 */
export default function EyebrowLabel({
  children,
  as: Tag = "h2",
  quiet = false,
  className = "",
}: {
  children: React.ReactNode;
  as?: "h2" | "h3" | "p" | "span";
  quiet?: boolean;
  className?: string;
}) {
  return (
    <Tag
      className={
        quiet
          ? `text-sm font-normal text-muted ${className}`
          : `copy-caption font-sans font-semibold uppercase tracking-[0.1em] text-muted ${className}`
      }
    >
      {children}
    </Tag>
  );
}
