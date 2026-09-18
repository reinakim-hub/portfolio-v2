"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals its children once, the first time they scroll into view: opacity
 * plus an ~8px upward shift, ~400ms ease-out (see `.reveal-up` in
 * globals.css). Fails open — visible immediately — if IntersectionObserver
 * isn't available or its setup throws, so a broken observer can't leave
 * content permanently hidden. (JS being disabled entirely is handled
 * separately, by the `<noscript>` rule in the root layout.)
 *
 * Content already inside the viewport at mount doesn't wait on the
 * observer's own callback at all — it's checked synchronously via a plain
 * `getBoundingClientRect()` read and made visible immediately. This closes
 * a real gap found while diagnosing AI Lab appearing to have "no content":
 * `IntersectionObserver`'s spec-mandated initial callback (reporting an
 * already-intersecting element as such, with no scroll needed) can be
 * delayed past a page's own initial paint depending on exactly when the
 * browser's rendering pipeline gets around to it — confirmed live on this
 * site, not just theorized: elements already on-screen at load stayed at
 * `opacity: 0` for several seconds with zero user interaction, then
 * appeared instantly the moment *any* real input (even a mouse move with
 * no click) reached the page. Essential above-the-fold content — a page's
 * own introduction, first list of content — must not depend on that
 * timing, or on the user scrolling, to become visible. The observer stays
 * in place for content genuinely below the fold, which still reveals on
 * scroll exactly as before.
 */
export default function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const alreadyInViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyInViewport) {
      setVisible(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(id);
    }

    try {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
      );
      observer.observe(el);
      return () => observer.disconnect();
    } catch {
      const id = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(id);
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-up ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
