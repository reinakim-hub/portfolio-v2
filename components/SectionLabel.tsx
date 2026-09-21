import EyebrowLabel from "./EyebrowLabel";

export default function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EyebrowLabel as="h3" quiet>
      {children}
    </EyebrowLabel>
  );
}
