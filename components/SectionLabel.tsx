export default function SectionLabel({
  children,
  size = "md",
}: {
  children: React.ReactNode;
  size?: "sm" | "md";
}) {
  return (
    <h3
      className="case-study-heading"
      style={size === "sm" ? { fontSize: "1.125rem" } : undefined}
    >
      {children}
    </h3>
  );
}
