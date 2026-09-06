import Image from "next/image";

type GalleryImage = { src: string; alt: string; width: number; height: number };

export default function ImageGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="columns-2 gap-4">
      {images.map((image) => (
        <div
          key={image.src}
          className="mb-4 overflow-hidden rounded-tile break-inside-avoid"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            unoptimized={image.src.endsWith(".gif")}
            className="h-auto w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
