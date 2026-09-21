/**
 * Small uppercase label used to head a section or tag a project.
 * Case-study subsection labels reuse the `quiet` treatment via `SectionLabel`.
 *
 * `quiet` (opt-in, defaults off) swaps the uppercase/tracked/`copy-caption`
 * treatment for Home's own plain section-label style — normal
 * capitalization and letter-spacing, `text-sm font-normal text-muted`,
 * byte-for-byte the same as `SECTION_HEADING` in `app/page.tsx` — so a
 * page can reuse this exact treatment instead of re-deriving it. About's
 * "Background"/"Beyond design" and case-study subsection labels use it;
 * other callers keep the default uppercase style.
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
