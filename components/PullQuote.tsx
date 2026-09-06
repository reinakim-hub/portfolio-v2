export default function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-2xl font-extrabold leading-snug text-accent sm:text-3xl">
      {children}
    </p>
  );
}
