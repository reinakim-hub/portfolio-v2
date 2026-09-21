import { MOTION } from './motion-config';

/** Let the middle content lag slightly, then settle with a small spring. */
export function playIntroScrollBounce(opening: HTMLElement): () => void {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || typeof Element.prototype.animate !== 'function') return () => {};

  const content = opening.closest('[data-motion-stage]')?.querySelector<HTMLElement>('[data-intro-scroll-content]');
  if (!content) return () => {};
  content.dataset.introScrollBounce = '';
  let animation: Animation | undefined;
  const cleanup = () => {
    animation?.cancel();
    delete content.dataset.introScrollBounce;
    window.removeEventListener('resize', cleanup);
    window.removeEventListener('popstate', cleanup);
    window.removeEventListener('pagehide', cleanup);
    window.removeEventListener('keydown', onKeyDown);
    reduced.removeEventListener('change', cleanup);
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') cleanup();
  };
  window.addEventListener('resize', cleanup);
  window.addEventListener('popstate', cleanup);
  window.addEventListener('pagehide', cleanup);
  window.addEventListener('keydown', onKeyDown);
  reduced.addEventListener('change', cleanup);
  try {
    animation = content.animate([
      { transform: 'translateY(0px)', offset: 0 },
      { transform: 'translateY(14px)', offset: .22 },
      { transform: 'translateY(-5px)', offset: .58 },
      { transform: 'translateY(2px)', offset: .8 },
      { transform: 'translateY(0px)', offset: 1 },
    ], { duration: MOTION.introScrollBounce, easing: MOTION.leaveEase });
    void animation.finished.then(cleanup, cleanup);
  } catch {
    cleanup();
  }
  return cleanup;
}
