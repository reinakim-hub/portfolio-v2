'use client';

import { ProjectNavigationLink as Link } from './PageCrossfade';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, type ComponentProps, type CSSProperties } from 'react';
import { MOTION, PROJECT_MOTION, type ProjectKey } from './motion-config';
import { clamp, coverRadius, exitOrigin, type Point } from './motion-geometry';
import styles from './PortfolioMotion.module.css';

type Props = Omit<ComponentProps<typeof Link>, 'href' | 'ref'> & {
  href: string;
  project: ProjectKey;
  variant?: 'thumbnail' | 'cta';
};

export function RadialProjectLink({
  project, variant = 'thumbnail', href, children, className = '', style,
  onPointerEnter, onPointerLeave, onFocus, onBlur, ...rest
}: Props) {
  const anchor = useRef<HTMLAnchorElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const hovering = useRef(false);
  const pathname = usePathname();
  const colors = PROJECT_MOTION[project];

  function reset() {
    hovering.current = false;
    if (!fill.current) return;
    fill.current.style.transition = 'none';
    fill.current.style.clipPath = 'circle(0px at 50% 50%)';
  }

  useEffect(() => { reset(); }, [pathname]);
  useEffect(() => {
    window.addEventListener('pageshow', reset);
    return () => window.removeEventListener('pageshow', reset);
  }, []);

  function show(point?: Point) {
    const layer = fill.current;
    const link = anchor.current;
    if (!layer || !link) return;
    const rect = link.getBoundingClientRect();
    const origin = point
      ? { x: clamp(point.x - rect.left, 0, rect.width), y: clamp(point.y - rect.top, 0, rect.height) }
      : { x: rect.width / 2, y: rect.height / 2 };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      layer.style.transition = 'none';
      layer.style.clipPath = 'circle(150% at 50% 50%)';
      return;
    }
    const visibleRadius = Number.parseFloat(getComputedStyle(layer).clipPath.match(/circle\(([\d.]+)/)?.[1] ?? '0');
    // Reset only when invisible. Re-entry during leave continues from its
    // current radius and center rather than snapping back to zero.
    if (visibleRadius < .1) {
      layer.style.transition = 'none';
      layer.style.clipPath = `circle(0px at ${origin.x}px ${origin.y}px)`;
      void layer.getBoundingClientRect();
    }
    layer.style.transition = `clip-path ${MOTION.enter}ms ${MOTION.enterEase}`;
    layer.style.clipPath = `circle(${coverRadius(origin, rect)}px at ${origin.x}px ${origin.y}px)`;
  }

  function hide(point?: Point) {
    const layer = fill.current;
    const link = anchor.current;
    if (!layer || !link) return;
    const rect = link.getBoundingClientRect();
    const origin = exitOrigin(point
      ? { x: point.x - rect.left, y: point.y - rect.top }
      : { x: rect.width / 2, y: rect.height }, rect);
    layer.style.transition = matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'none' : `clip-path ${MOTION.leave}ms ${MOTION.leaveEase}`;
    layer.style.clipPath = `circle(0px at ${origin.x}px ${origin.y}px)`;
  }

  return (
    <Link {...rest} href={href} ref={anchor}
      className={`${variant === 'thumbnail' ? `${styles.thumbnail} ${styles[project] ?? ''}` : styles.cta} ${className}`}
      style={{ '--project-base': colors.base, '--project-hover': colors.hover, ...style } as CSSProperties}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        if (event.defaultPrevented || event.pointerType === 'touch' || !matchMedia('(any-hover: hover)').matches) return;
        hovering.current = true;
        show({ x: event.clientX, y: event.clientY });
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        hovering.current = false;
        if (event.defaultPrevented || event.currentTarget.matches(':focus-visible')) return;
        hide({ x: event.clientX, y: event.clientY });
      }}
      onFocus={(event) => { onFocus?.(event); if (!event.defaultPrevented && event.currentTarget.matches(':focus-visible')) show(); }}
      onBlur={(event) => { onBlur?.(event); if (!event.defaultPrevented && !hovering.current) hide(); }}

    >
      {variant === 'thumbnail' ? <>
        <span ref={fill} className={styles.fill} aria-hidden="true" />
        <span className={styles.foreground}>{children}</span>
      </> : children}
    </Link>
  );
}
