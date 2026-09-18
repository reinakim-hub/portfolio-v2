"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  'a, button:not(:disabled), [role="button"]:not([aria-disabled="true"]), summary, input:not(:disabled):not([type="text"]):not([type="email"]):not([type="search"]):not([type="tel"]):not([type="url"]), select:not(:disabled)';

// Case-study lightbox triggers opt out of the interactive-hover treatment
// (see `LightboxImage`) so they read as plain content, not an obviously
// clickable control, even though they're real buttons underneath. Checked
// before `INTERACTIVE_SELECTOR` so it always wins for these triggers and
// anything inside them.
const CURSOR_EXCLUDE_SELECTOR = "[data-cc-cursor-exclude]";

// Home-only: the SAP/Nokia thumbnail links (`ProjectHighlight`'s
// `whiteCursorRing` prop) mark themselves with this attribute so the
// ring's stroke swaps to white while hovering/focusing them or any
// descendant — see `.cc-cursor-dot--white` in globals.css. Independent
// of `CURSOR_EXCLUDE_SELECTOR`/`INTERACTIVE_SELECTOR`: this only ever
// changes the ring's color, never whether it shows at all.
const CURSOR_WHITE_SELECTOR = "[data-cc-cursor-white]";

/**
 * A shared decorative dot that follows the (still fully visible) native
 * cursor with a ~70ms trailing lag (a CSS `transition` on the positioning
 * wrapper, fed position updates throttled to one per animation frame — no
 * React state, so pointer movement never triggers a render): a solid 10px
 * fill at rest, growing smoothly to a hollow 40px ring over an actual link
 * or enabled control. `pointer-events: none` + `aria-hidden` keep it
 * purely decorative: it can't intercept a click or reach a screen reader,
 * and it never hides or replaces the native cursor. Bails out entirely
 * (renders nothing) for coarse/touch pointers and `prefers-reduced-motion`,
 * since neither wants a trailing animated follower. It also hides on
 * window blur/leave and snaps — not flies — back to the pointer's position
 * on re-entry.
 */
export default function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (coarsePointer || reducedMotion) return;

    const wrap = wrapRef.current;
    const dot = dotRef.current;
    if (!wrap || !dot) return;

    let target = { x: -100, y: -100 };
    let shown = false;
    let rafId = 0;

    const applyPosition = () => {
      wrap.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
    };

    const loop = () => {
      applyPosition();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const setActive = (el: EventTarget | null) => {
      // Single explicit toggle, always executed — never an early return
      // that could leave a previous state (e.g. the enlarged ring from a
      // link the pointer just left) stuck active. The exclusion check
      // short-circuits `isInteractive` to false before it ever reaches
      // `INTERACTIVE_SELECTOR`, so it always wins over that generic
      // link/button/role detection for excluded triggers and their
      // descendants.
      const target = el instanceof Element ? el : null;
      const isExcluded = !!target?.closest(CURSOR_EXCLUDE_SELECTOR);
      const isInteractive =
        !isExcluded && !!target?.closest(INTERACTIVE_SELECTOR);
      const isWhite = !!target?.closest(CURSOR_WHITE_SELECTOR);
      dot.classList.toggle("cc-cursor-dot--active", isInteractive);
      dot.classList.toggle("cc-cursor-dot--white", isWhite);
    };

    const onMove = (e: MouseEvent) => {
      setActive(e.target);
      target = { x: e.clientX, y: e.clientY };

      if (!shown) {
        shown = true;
        // Snap to the first known position instead of transitioning in
        // from the wrapper's off-screen default.
        wrap.style.transition = "none";
        applyPosition();
        void wrap.offsetHeight; // force reflow so the transition disable takes
        wrap.style.transition = "";
        wrap.style.opacity = "1";
      }
    };

    const onLeaveWindow = (e: MouseEvent) => {
      if (e.relatedTarget !== null) return; // moved to a child, not out
      wrap.style.opacity = "0";
    };

    const onEnterWindow = (e: MouseEvent) => {
      target = { x: e.clientX, y: e.clientY };
      wrap.style.transition = "none";
      applyPosition();
      void wrap.offsetHeight;
      wrap.style.transition = "";
      wrap.style.opacity = "1";
      setActive(e.target);
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    document.documentElement.addEventListener("mouseenter", onEnterWindow);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        onLeaveWindow,
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        onEnterWindow,
      );
    };
  }, []);

  return (
    <div ref={wrapRef} className="cc-cursor" aria-hidden="true">
      <div ref={dotRef} className="cc-cursor-dot" />
    </div>
  );
}
