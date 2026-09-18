import LightboxImage from "./LightboxImage";

type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Opt-in pale-gray presentation frame (see `.screenshot-frame` in
   * `globals.css`) for a screenshot whose own white background would
   * otherwise blend into the page. Per-image, not gallery-wide — most
   * gallery images don't set this and render exactly as before. */
  frame?: boolean;
};

export default function ImageGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="columns-2 gap-4">
      {images.map((image) => (
        <div
          key={image.src}
          className={`mb-4 overflow-hidden break-inside-avoid ${image.frame ? "screenshot-frame" : ""}`}
        >
          <LightboxImage
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="case-study-image"
          />
        </div>
      ))}
    </div>
  );
}
