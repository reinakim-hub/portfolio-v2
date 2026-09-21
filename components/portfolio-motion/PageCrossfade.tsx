'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useLayoutEffect, useMemo, type ComponentProps, type ReactNode } from 'react';

type Job = {
  target: string;
  resolve: () => void;
  transition?: ViewTransition;
  timer: number;
};

function createCrossfade() {
  let active: Job | null = null;
  const finish = (job: Job) => {
    clearTimeout(job.timer);
    if (active !== job) return;
    active = null;
    document.documentElement.classList.remove('page-crossfade');
    delete document.documentElement.dataset.pageCrossfade;
  };
  const cancel = () => {
    if (!active) return;
    const job = active;
    job.resolve();
    job.transition?.skipTransition();
    finish(job);
  };
  return {
    cancel,
    start(href: string, navigate: () => void) {
      const root = document.documentElement;
      const target = new URL(href, location.href);
      if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches ||
          root.classList.contains('theme-reveal') || target.origin !== location.origin ||
          target.pathname === location.pathname) return false;
      cancel();
      let resolve!: () => void;
      const committed = new Promise<void>(done => { resolve = done; });
      const job: Job = { target: target.pathname, resolve, timer: 0 };
      active = job;
      root.classList.add('page-crossfade');
      root.dataset.pageCrossfade = 'pending';
      // Safety fallback only; successful navigation never waits for this timer.
      job.timer = window.setTimeout(cancel, 4000);
      let navigated = false;
      const navigateOnce = () => { if (!navigated) { navigated = true; navigate(); } };
      try {
        job.transition = document.startViewTransition(() => {
          // Start as soon as the browser captures the outgoing frame. There is
          // no exit animation or loading delay before requesting the route.
          navigateOnce();
          return committed;
        });
        void job.transition.ready.then(() => {
          if (active === job) root.dataset.pageCrossfade = 'running';
        }, () => {});
        void job.transition.finished.then(() => finish(job), () => finish(job));
      } catch {
        cancel();
        navigateOnce();
      }
      return true;
    },
    ready(path: string) { if (active?.target === path) active.resolve(); },
    routeChanged(path: string) {
      if (active && path !== active.target) cancel();
    },
  };
}

const CrossfadeContext = createContext<ReturnType<typeof createCrossfade> | null>(null);

/** Persistent controller; every link activation starts a fresh browser capture. */
export function PageCrossfadeProvider({ children }: { children: ReactNode }) {
  const controller = useMemo(() => createCrossfade(), []);
  const pathname = usePathname();
  useEffect(() => controller.routeChanged(pathname), [controller, pathname]);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') controller.cancel(); };
    window.addEventListener('popstate', controller.cancel);
    window.addEventListener('resize', controller.cancel);
    window.addEventListener('pagehide', controller.cancel);
    window.addEventListener('keydown', escape);
    reduced.addEventListener('change', controller.cancel);
    return () => {
      controller.cancel();
      window.removeEventListener('popstate', controller.cancel);
      window.removeEventListener('resize', controller.cancel);
      window.removeEventListener('pagehide', controller.cancel);
      window.removeEventListener('keydown', escape);
      reduced.removeEventListener('change', controller.cancel);
    };
  }, [controller]);
  return <CrossfadeContext.Provider value={controller}>{children}</CrossfadeContext.Provider>;
}

/** Signal actual case-study commit, including cached/prefetched destinations. */
export function PageCrossfadeReady() {
  const controller = useContext(CrossfadeContext);
  const pathname = usePathname();
  useLayoutEffect(() => controller?.ready(pathname), [controller, pathname]);
  return null;
}

type Props = Omit<ComponentProps<typeof Link>, 'href' | 'onNavigate'> & { href: string };

export function ProjectNavigationLink({ href, ...props }: Props) {
  const controller = useContext(CrossfadeContext);
  const router = useRouter();
  return <Link {...props} href={href} onNavigate={event => {
    const navigate = () => props.replace
      ? router.replace(href, { scroll: props.scroll })
      : router.push(href, { scroll: props.scroll });
    if (controller?.start(href, navigate)) event.preventDefault();
  }} />;
}
