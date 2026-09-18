"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { isTheme, THEMES, THEME_STORAGE_KEY, type ThemeId } from "./themes";

const CHANGE_EVENT = "reina-theme-change";

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

function getTheme(): ThemeId {
  const theme = document.documentElement.dataset.theme;
  return isTheme(theme) ? theme : "paper";
}

export default function ThemeSelector() {
  const selected = useSyncExternalStore(subscribe, getTheme, () => "paper");
  const transitionRef = useRef<ViewTransition | null>(null);
  const requestRef = useRef(0);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Some browsers hit-test a captured view as <html>. Keep the dots
    // responsive during the wipe, forwarding only hits inside a button.
    const onSnapshotClick = (event: MouseEvent) => {
      if (!transitionRef.current || event.target !== document.documentElement) return;
      for (const button of groupRef.current?.querySelectorAll("button") ?? []) {
        const box = button.getBoundingClientRect();
        if (event.clientX >= box.left && event.clientX <= box.right &&
            event.clientY >= box.top && event.clientY <= box.bottom) {
          button.click();
          break;
        }
      }
    };
    document.addEventListener("click", onSnapshotClick);
    return () => {
      document.removeEventListener("click", onSnapshotClick);
      transitionRef.current?.skipTransition();
    };
  }, []);

  function selectTheme(theme: ThemeId, button: HTMLButtonElement) {
    if (theme === getTheme()) return;
    const request = ++requestRef.current;
    transitionRef.current?.skipTransition();
    const root = document.documentElement;
    const { left, top, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const apply = () => {
      if (request !== requestRef.current) return;
      flushSync(() => {
        root.dataset.theme = theme;
        window.dispatchEvent(new Event(CHANGE_EVENT));
      });
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch {
        // Theme selection also works when storage is unavailable.
      }
    };

    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }

    // Old and new snapshots each contain their matching text/background
    // colors, so the circular wipe never exposes low-contrast text.
    root.classList.add("theme-reveal");
    const transition = document.startViewTransition(apply);
    transitionRef.current = transition;
    void transition.ready.then(() => {
      if (request !== requestRef.current) return;
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    }).catch(() => {
      // A skipped/unsupported snapshot still applies the selected theme.
    });
    void transition.finished.catch(() => {}).finally(() => {
      if (transitionRef.current === transition) {
        root.classList.remove("theme-reveal");
        transitionRef.current = null;
      }
    });
  }

  return (
    <div ref={groupRef} className="theme-selector" role="group" aria-label="Color theme">
      {THEMES.filter((theme) => theme.id !== selected).map((theme) => (
        <button
          key="theme-toggle"
          type="button"
          className="theme-choice"
          aria-label={`Switch to ${theme.name.toLowerCase()} theme`}
          title={`Switch to ${theme.name.toLowerCase()} theme`}
          onClick={(event) => selectTheme(theme.id, event.currentTarget)}
        >
          <svg
            className="theme-swatch"
            viewBox="0 0 48 48"
            aria-hidden="true"
            focusable="false"
          >
            <path
              className="theme-flower-petals"
              fill={theme.color}
              d="M24 11 C16 -2 3 5 8 19 C-7 23 0 39 14 36 C16 51 33 51 35 36 C49 40 56 24 41 19 C47 6 32 -2 24 11Z"
            />
            <circle cx="24" cy="25" r="7.5" fill={`var(--theme-${theme.id}-accent)`} />
          </svg>
        </button>
      ))}
    </div>
  );
}
