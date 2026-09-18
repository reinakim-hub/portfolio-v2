export default function PullQuote({
  children,
  weight = "extrabold",
}: {
  children: React.ReactNode;
  weight?: "bold" | "extrabold";
}) {
  return (
    <p className={`text-2xl ${weight === "bold" ? "font-bold" : "font-extrabold"} leading-snug text-accent sm:text-3xl`}>
      {children}
    </p>
  );
}
