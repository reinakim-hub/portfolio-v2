"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type LightboxImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** True for a PNG-sourced image with real transparent regions — gives
   * the enlarged view a white backdrop so transparency (and any dark
   * annotations drawn on it) stays readable over the dark overlay. */
  pngBackground?: boolean;
};

type OpenLightbox = (image: LightboxImage, trigger: HTMLElement | null) => void;

const LightboxContext = createContext<OpenLightbox | null>(null);

/**
 * Provides the site's single shared lightbox modal. Mounted once in the root
 * layout so any `LightboxImage` trigger, anywhere on the page, can open the
 * same overlay via `useLightbox()`. Handles Escape-to-close, moving focus
 * into the dialog on open, and returning focus to the exact element that
 * opened it on close.
 */
export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [image, setImage] = useState<LightboxImage | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const open = useCallback<OpenLightbox>((img, trigger) => {
    triggerRef.current = trigger;
    setImage(img);
  }, []);

  const close = useCallback(() => {
    setImage(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  useEffect(() => {
    if (!image) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    // Lock both `<html>` and `<body>` — `document.scrollingElement` is
    // `<html>` in standards mode, so `overflow:hidden` on `body` alone
    // doesn't reliably stop real wheel/touch scrolling of the page behind
    // the overlay in every browser (confirmed live: a real wheel scroll
    // still moved `window.scrollY` with only `body` locked). Locking the
    // root element is what actually stops the scroll; `body` is kept
    // locked too for the same overflow-propagation reasons libraries
    // conventionally lock both.
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [image, close]);

  return (
    <LightboxContext.Provider value={open}>
      {children}
      {image && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={image.alt || "Image preview"}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/90 p-6"
          onClick={close}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Close image"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span aria-hidden="true">&times;</span>
          </button>

          <div
            className={`relative max-h-[78vh] max-w-[92vw] ${image.pngBackground ? "bg-white" : ""}`}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              unoptimized={image.src.endsWith(".gif")}
              className="max-h-[78vh] w-auto h-auto max-w-[92vw] object-contain"
            />
          </div>

          {image.alt && (
            <p
              className="max-w-[92vw] text-center text-sm text-white/80"
              onClick={(event) => event.stopPropagation()}
            >
              {image.alt}
            </p>
          )}
        </div>
      )}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error("useLightbox must be used within a LightboxProvider");
  }
  return ctx;
}
