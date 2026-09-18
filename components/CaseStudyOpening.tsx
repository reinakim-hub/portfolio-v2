"use client";

import { useEffect, useRef } from "react";

/** Shared opening visual with a one-time downward-scroll assist. */
export default function CaseStudyOpening({
  children,
}: {
  children: React.ReactNode;
}) {
  const openingRef = useRef<HTMLDivElement>(null);
  const advanceRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const opening = openingRef.current;
    const introduction = document.getElementById("introduction");
    if (!opening || !introduction) return;
    let used = Boolean(window.location.hash);
    if (used) opening.dataset.introComplete = "true";
    let touchY: number | null = null;
    let touchCaptured = false;

    const eligible = () => {
      const hero = opening.getBoundingClientRect();
      return !used && hero.top <= 160 && hero.bottom > 96 &&
        introduction.getBoundingClientRect().top > 160;
    };
    const advance = () => {
      used = true;
      // The navigation is a bottom dock; use the layout's top inset for arrival.
      const headerBottom = parseFloat(getComputedStyle(document.querySelector("main")!).paddingTop) || 80;
      const sidebar = opening.closest(".case-study-page")?.querySelector(".case-study-left");
      const columnPadding = sidebar ? parseFloat(getComputedStyle(sidebar).paddingTop) : 48;
      const top = window.scrollY + introduction.getBoundingClientRect().top - headerBottom - columnPadding;
      opening.dataset.introComplete = "true";
      window.scrollTo({
        top: Math.max(0, top),
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    };
    advanceRef.current = advance;
    const onScroll = () => {
      // Anchor navigation/restored scroll also consumes the one-time assist.
      if (introduction.getBoundingClientRect().top <= 128) {
        used = true;
        opening.dataset.introComplete = "true";
      }
    };
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || event.deltaY <= 0 ||
          Math.abs(event.deltaX) > event.deltaY || !eligible()) return;
      if (!(event.target instanceof Element) || !event.target.closest("main")) return;
      // Leave independently scrollable sidebars and controls alone.
      for (let node: Element | null = event.target; node && node !== document.body; node = node.parentElement) {
        if (node.scrollHeight > node.clientHeight + 1 &&
            /auto|scroll/.test(getComputedStyle(node).overflowY)) return;
      }
      event.preventDefault();
      advance();
    };
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches.length === 1 && eligible() ? event.touches[0].clientY : null;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      if (touchCaptured) {
        event.preventDefault();
      } else if (touchY !== null && !used &&
          touchY - event.touches[0].clientY > 24) {
        event.preventDefault();
        touchCaptured = true;
        advance();
      }
    };
    const onTouchEnd = () => {
      touchY = null;
      touchCaptured = false;
    };
    onScroll();
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    opening.addEventListener("touchstart", onTouchStart, { passive: true });
    opening.addEventListener("touchmove", onTouchMove, { passive: false });
    opening.addEventListener("touchend", onTouchEnd, { passive: true });
    opening.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      advanceRef.current = null;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      opening.removeEventListener("touchstart", onTouchStart);
      opening.removeEventListener("touchmove", onTouchMove);
      opening.removeEventListener("touchend", onTouchEnd);
      opening.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <div ref={openingRef} className="case-study-opening xl:flex xl:min-h-[calc(100dvh-8rem)] xl:flex-col">
      <div className="case-study-hero">{children}</div>
      <div className="case-study-cue mt-8 flex flex-col items-center gap-2 pb-10 text-center xl:mt-auto xl:pb-12">
        <a
          href="#introduction"
          onClick={(event) => {
            if (advanceRef.current) {
              event.preventDefault();
              advanceRef.current();
            }
          }}
          className="inline-flex flex-col items-center gap-2 text-sm text-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span>Scroll to view more</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="scroll-cue-arrow">
            <path d="M12 4v16m0 0-6-6m6 6 6-6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
