import LightboxImage from "./LightboxImage";

type GalleryImage = { src: string; alt: string; width: number; height: number };

export default function ImageGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="columns-2 gap-4">
      {images.map((image) => (
        <div
          key={image.src}
          className="mb-4 overflow-hidden break-inside-avoid"
        >
          <LightboxImage
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="h-auto w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
