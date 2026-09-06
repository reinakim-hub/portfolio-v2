import Image from "next/image";
import Link from "next/link";

type Meta = { icon: string; label: string; value: string };

export default function AcademicProjectCard({
  href,
  title,
  image,
  imageAlt,
  imageBg,
  description,
  meta,
}: {
  href: string;
  title: React.ReactNode;
  image: string;
  imageAlt: string;
  imageBg?: string;
  description: string;
  meta: Meta[];
}) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 sm:items-start sm:gap-12">
      <div
        className={`overflow-hidden rounded-card ${imageBg ?? "bg-neutral-950"}`}
      >
        <Image
          src={image}
          alt={imageAlt}
          width={1200}
          height={800}
          unoptimized={image.endsWith(".gif")}
          className="h-auto w-full object-cover"
        />
      </div>
      <div>
        <h3 className="text-xl font-bold leading-snug">
          <Link href={href} className="text-accent underline hover:no-underline">
            {title}
          </Link>{" "}
          <span aria-hidden="true">🔗</span>
        </h3>
        <p className="mt-3 text-body">{description}</p>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="font-semibold text-ink">
                <span aria-hidden="true">{item.icon} </span>
                {item.label}
              </dt>
              <dd className="mt-1 text-muted">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
