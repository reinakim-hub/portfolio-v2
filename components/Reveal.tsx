"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals its children once, the first time they scroll into view: opacity
 * plus an ~8px upward shift, ~400ms ease-out (see `.reveal-up` in
 * globals.css). Fails open — visible immediately — if IntersectionObserver
 * isn't available or its setup throws, so a broken observer can't leave
 * content permanently hidden. (JS being disabled entirely is handled
 * separately, by the `<noscript>` rule in the root layout.)
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
