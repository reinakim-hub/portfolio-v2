/**
 * The shared reading wrapper for case-study body text: headings, paragraphs,
 * lists, and the text-section dividers above them all size and center
 * against this same wrapper, so a heading and the paragraphs beneath it
 * share one left/right edge instead of the heading spanning the full
 * (much wider) middle column while the text below it sits narrower.
 * A shared rem-based width keeps lines readable without changing when a
 * caller applies a different font size; `w-full` lets it shrink to
 * fill a narrower column where there's no extra space to center into;
 * `mx-auto` (`margin-inline: auto`) centers it within the middle column
 * once there is. Text stays left-aligned — only the block itself centers.
 * Images/galleries are deliberately not wrapped in this: they're meant to
 * stay full-width in the middle column, wider than the prose.
 */
export default function ProseColumn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`reading-column ${className}`}>{children}</div>;
}
