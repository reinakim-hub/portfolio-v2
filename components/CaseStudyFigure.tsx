import Image from "next/image";

export default function CaseStudyFigure({
  src,
  alt,
  width,
  height,
  imageBg,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  imageBg?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-card ${imageBg ?? "bg-neutral-50"}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full object-cover"
      />
    </div>
  );
}
