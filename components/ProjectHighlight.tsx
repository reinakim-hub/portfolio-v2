import Image from "next/image";
import Link from "next/link";

export default function ProjectHighlight({
  href,
  title,
  subtitle,
  image,
  imageAlt,
  paragraphs,
  imageBg,
}: {
  href: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  paragraphs: React.ReactNode[];
  imageBg?: string;
}) {
  return (
    <div className="max-w-xl">
      <div
        className={`mb-10 overflow-hidden rounded-card ${imageBg ?? "bg-neutral-100"}`}
      >
        <Image
          src={image}
          alt={imageAlt}
          width={1200}
          height={630}
          className="h-auto w-full object-cover"
        />
      </div>
      <h3 className="text-2xl font-bold leading-snug">
        <Link href={href} className="text-accent underline hover:no-underline">
          {title}
          <br />
          {subtitle}
        </Link>{" "}
        <span aria-hidden="true">🔗</span>
      </h3>
      <div className="mt-4 space-y-4 text-body">
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
