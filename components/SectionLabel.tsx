export default function SectionLabel({
  children,
  size = "md",
}: {
  children: React.ReactNode;
  size?: "sm" | "md";
}) {
  return (
    <h3 className={`font-bold text-accent ${size === "sm" ? "text-lg" : "text-xl"}`}>
      {children}
    </h3>
  );
}
