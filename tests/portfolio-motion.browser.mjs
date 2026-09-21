// Run against a production server with Playwright available. Optionally set
// PLAYWRIGHT_MODULE to an existing installation; no app dependency is needed.
// PORTFOLIO_URL defaults to http://localhost:3002.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const base = process.env.PORTFOLIO_URL || 'http://localhost:3002';
const errors = [];
const projects = [
  ['sap', '/sap', 'rgb(0, 112, 242)', 'rgb(0, 77, 193)', '#004DC1'],
  ['nokia', '/nokia', 'rgb(0, 90, 255)', 'rgb(0, 57, 185)', '#0039B9'],
  ['simplii', '/simpliifinancial', 'rgb(240, 120, 182)', 'rgb(228, 94, 163)', '#F078B6'],
  ['ssfb', '/ssfb', 'rgb(8, 8, 8)', 'rgba(0, 217, 61, 0.18)', '#00D93D'],
];
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

async function home(page) {
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.locator('#sap-thumbnail').waitFor();
  await page.waitForFunction(() => [...document.querySelectorAll('[data-motion-stage] img')].every(img => img.complete));
  await pause(950);
}

async function observe(page) {
  await page.evaluate(() => {
    window.motionChecks = [];
    window.oldOverlayCount = 0;
    window.motionObserver?.disconnect();
    window.motionObserver = new MutationObserver(records => {
      for (const record of records) for (const node of record.addedNodes) {
        if (node instanceof Element && (node.matches('[data-motion-overlay]') || node.querySelector('[data-motion-overlay]'))) window.oldOverlayCount++;
      }
    });
    window.motionObserver.observe(document.body, { childList: true, subtree: true });
    window.nativeViewTransition ??= document.startViewTransition.bind(document);
    document.startViewTransition = callback => {
      const record = {
        from: location.pathname,
        beforeBackground: getComputedStyle(document.body).backgroundColor,
      };
      const transition = window.nativeViewTransition(callback);
      window.motionChecks.push(record);
      transition.ready.then(() => {
        const root = document.documentElement;
        const incoming = getComputedStyle(root, '::view-transition-new(root)');
        const outgoing = getComputedStyle(root, '::view-transition-old(root)');
        const animation = document.getAnimations().find(item => item.animationName === 'page-crossfade-in');
        Object.assign(record, {
          actualContent: !!document.querySelector('.case-study-page #introduction'),
          duration: incoming.animationDuration, easing: incoming.animationTimingFunction,
          oldOpacity: outgoing.opacity, oldAnimation: outgoing.animationName,
          clip: incoming.clipPath,
          opacity: animation.effect.getKeyframes().map(frame => frame.opacity),
          bodyBackground: getComputedStyle(document.body).backgroundColor,
          oldEntrances: [...document.querySelectorAll('.case-study-left > *, .case-study-summary > *, .case-study-hero, .case-study-cue, .case-study-rule')].map(el => getComputedStyle(el).animationName),
        });
      }).catch(error => { record.error = error.message; });
      transition.finished.then(() => { record.finished = true; });
      return transition;
    };

  });
}

async function checkFade(page, count = 1) {
  await page.waitForFunction(() => !document.documentElement.classList.contains('page-crossfade'));
  const result = await page.evaluate(() => ({ checks: window.motionChecks, overlays: window.oldOverlayCount }));
  assert.equal(result.overlays, 0, 'No colored overlay is ever mounted');
  assert.equal(result.checks.length, count);
  for (const fade of result.checks) {
    assert.equal(fade.actualContent, true);
    assert.equal(fade.duration, '0.25s');
    assert.equal(fade.easing, 'ease-out');
    assert.equal(fade.error, undefined);
    assert.equal(fade.finished, true);
    assert.equal(fade.oldOpacity, '1');
    assert.equal(fade.oldAnimation, 'none');
    assert.equal(fade.clip, 'none');
    assert.equal(fade.bodyBackground, fade.beforeBackground);
    assert.deepEqual(fade.opacity, ['0', '1']);
    assert.ok(fade.oldEntrances.every(name => name === 'none'));
  }
}

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await home(page);
  for (const [width, height] of [[1920, 1080], [1440, 900], [1366, 768], [1280, 800]]) {
    await page.setViewportSize({ width, height });
    const metrics = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      columns: getComputedStyle(document.querySelector('[data-motion-stage]').parentElement).gridTemplateColumns,
      cards: [...document.querySelectorAll('[id$="-thumbnail"]')].map(el => el.getBoundingClientRect().toJSON()),
    }));
    assert.ok(metrics.width <= width, `No horizontal overflow at ${width}`);
    if (width > 1280) assert.ok(metrics.height <= height, `Home fits ${width}×${height}: ${metrics.height}`);
    assert.equal(metrics.cards.length, 4);
    console.log('layout', width, height, metrics.columns);
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const [project, , baseColor, hoverColor] of projects) {
    const link = page.locator(`#${project}-thumbnail`);
    const rect = await link.boundingBox();
    const foreground = await link.locator('[data-project-artwork]').evaluate(img => ({
      rect: img.getBoundingClientRect().toJSON(), transform: getComputedStyle(img).transform,
      opacity: getComputedStyle(img).opacity, filter: getComputedStyle(img).filter,
    }));
    assert.equal(await link.evaluate(el => getComputedStyle(el).backgroundColor), baseColor);
    if (project === 'simplii') {
      const mockup = await link.locator('[data-project-artwork]').evaluate(img => {
        const center = new DOMPoint(2048, 1458.5).matrixTransform(img.getScreenCTM());
        const frame = img.closest('a').getBoundingClientRect();
        return {
          src: img.querySelector('image').getAttribute('href'),
          offsetX: center.x - (frame.x + frame.width / 2),
          offsetY: center.y - (frame.y + frame.height / 2),
        };
      });
      assert.equal(mockup.src, '/images/SimpliiLearnMac16.png');
      assert.ok(Math.abs(mockup.offsetX) < 1 && Math.abs(mockup.offsetY) < 1, 'Visible laptop is centered');
    }
    const sample = () => link.evaluate(el => {
      const layer = el.firstElementChild;
      return { clip: getComputedStyle(layer).clipPath, target: layer.style.clipPath,
        duration: layer.style.transitionDuration, background: getComputedStyle(layer).backgroundColor };
    });
    // Each edge/corner and rapid re-entry are exercised on every project.
    for (const [x, y, outsideX, outsideY] of [
      [1, rect.height / 2, -4, rect.height / 2],
      [rect.width - 1, rect.height / 2, rect.width + 4, rect.height / 2],
      [rect.width / 2, 1, rect.width / 2, -4],
      [rect.width / 2, rect.height - 1, rect.width / 2, rect.height + 4],
      [1, 1, -4, -4], [rect.width - 1, rect.height - 1, rect.width + 4, rect.height + 4],
      [rect.width - 1, 1, rect.width + 4, -4], [1, rect.height - 1, -4, rect.height + 4],
    ]) {
      await page.mouse.move(rect.x + outsideX, rect.y + outsideY);
      await pause(380);
      await page.mouse.move(rect.x + x, rect.y + y);
      await pause(470);
      const shown = await sample();
      assert.equal(shown.duration, '440ms');
      assert.equal(shown.background, hoverColor);
      await page.mouse.move(rect.x + outsideX, rect.y + outsideY);
      await pause(65);
      const leaving = await sample();
      assert.equal(leaving.duration, '360ms');
      assert.ok(leaving.target.startsWith('circle(0px at '));
      await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
      const reentered = await sample();
      assert.ok(Number(reentered.clip.match(/circle\(([\d.]+)/)?.[1]) > 0, 'Re-entry retains rendered radius');
      await pause(470);
    }
    assert.deepEqual(await link.locator('[data-project-artwork]').evaluate(img => ({
      rect: img.getBoundingClientRect().toJSON(), transform: getComputedStyle(img).transform,
      opacity: getComputedStyle(img).opacity, filter: getComputedStyle(img).filter,
    })), foreground, `${project} artwork remains still and untinted`);
    if (project === 'sap') assert.ok(await page.locator('.cc-cursor-dot').evaluate(el => el.classList.contains('cc-cursor-dot--white')));
    console.log('hover/leave/re-entry/stationary artwork', project);
  }
  await page.mouse.move(5, 85);
  await pause(400);
  await page.keyboard.press('Tab');
  await page.locator('#sap-thumbnail').focus();
  await pause(470);
  assert.ok(await page.locator('#sap-thumbnail').evaluate(el => el.matches(':focus-visible') && getComputedStyle(el).outlineStyle !== 'none'));
  const focusedClip = await page.locator('#sap-thumbnail > span').first().evaluate(el => el.style.clipPath);
  await page.mouse.move(5, 90);
  assert.equal(await page.locator('#sap-thumbnail > span').first().evaluate(el => el.style.clipPath), focusedClip);
  await page.screenshot({ path: join(tmpdir(), 'portfolio-motion-desktop.png'), fullPage: true });

  // Actual content fades once; neither thumbnail nor CTA mounts a color layer.
  for (const [project, path, variant] of projects.flatMap(([project, path]) => [[project, path, 'thumbnail'], [project, path, 'cta']])) {
    const prefetched = new Set();
    const onResponse = response => {
      if (response.headers()['content-type']?.includes('text/x-component')) prefetched.add(new URL(response.url()).pathname);
    };
    page.on('response', onResponse);
    await home(page);
    assert.ok(prefetched.has(path), `Prefetched route: ${path}`);
    page.off('response', onResponse);
    await observe(page);
    const selector = variant === 'cta'
      ? `article a[href="${path}"]:last-child` : `#${project}-thumbnail`;
    const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    await page.locator(selector).click();
    await page.waitForURL(`${base}${path}`);
    await checkFade(page);
    assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), background);
    assert.equal(await page.locator('[data-motion-stage]').count(), 1);
    assert.equal(await page.locator('.scroll-cue-arrow').count(), 1);
    await page.locator('.case-study-cue a').click();
    await page.waitForFunction(() => scrollY > 100);
    await page.goBack();
    await page.waitForURL(base + '/');
    await page.goForward();
    await page.waitForURL(`${base}${path}`);
    assert.equal(await page.locator('[data-motion-overlay]').count(), 0);
    console.log('prefetched crossfade/history/scroll cue', project, variant);
  }

  await page.goto(base + '/sap', { waitUntil: 'domcontentloaded' });
  await observe(page);
  await page.locator('.case-study-summary a[href="/nokia"]').click();
  await page.waitForURL(base + '/nokia');
  await checkFade(page);
  await observe(page);
  await page.locator('.case-study-summary a[href="/sap"]').click();
  await page.waitForURL(base + '/sap');
  await checkFade(page);
  console.log('persistent provider retriggers on next/previous project navigation');

  await home(page);
  await observe(page);
  await page.keyboard.press('Tab');
  await page.locator('#sap-thumbnail').focus();
  await page.keyboard.press('Enter');
  await page.waitForURL(base + '/sap');
  await checkFade(page);

  await home(page);
  await observe(page);
  // Synthetic modified clicks check event pass-through without opening windows.
  const native = await page.locator('#sap-thumbnail').evaluate(el => {
    const results = [];
    for (const props of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { button: 1 }]) {
      const event = new MouseEvent('click', { bubbles: true, cancelable: true, ...props });
      let prevented;
      const stopNative = e => { prevented = e.defaultPrevented; e.preventDefault(); };
      document.addEventListener('click', stopNative, { once: true });
      el.dispatchEvent(event);
      results.push(prevented);
    }
    return results;
  });
  assert.deepEqual(native, [false, false, false, false]);
  assert.equal(await page.locator('[data-motion-overlay]').count(), 0);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('#simplii-thumbnail').hover();
  assert.equal(await page.locator('#simplii-thumbnail > span').first().evaluate(el => el.style.transition), 'none');
  await page.locator('#simplii-thumbnail').click();
  await page.waitForURL(base + '/simpliifinancial');
  await checkFade(page, 0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  console.log('keyboard/modified clicks/reduced motion passed');

  // Hold the route response: navigation must begin without a visual cover or timer.
  const slow = await context.newPage();
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  let routeRequested = false;
  await slow.route('**/*', async route => {
    if (new URL(route.request().url()).pathname === '/sap' && route.request().headers().rsc) {
      routeRequested = true;
      await gate;
    }
    await route.continue();
  });
  await home(slow);
  await observe(slow);
  await slow.locator('#sap-thumbnail').click();
  await pause(100);
  assert.equal(routeRequested, true);
  assert.equal(await slow.evaluate(() => document.documentElement.dataset.pageCrossfade), 'pending');
  assert.equal(await slow.evaluate(() => window.motionChecks[0].duration), undefined, 'Do not fade before the destination commits');
  assert.equal(new URL(slow.url()).pathname, '/');
  assert.equal(await slow.locator('[data-motion-overlay]').count(), 0);
  release();
  await slow.waitForURL(base + '/sap');
  await checkFade(slow);
  await slow.close();
  console.log('delayed route navigates without color cover');

  // About already has edge-to-edge photo gutters. Preserve that layout and its
  // shared track proportions; Lab and case studies match Home in pixels too.
  await home(page);
  const homeColumns = await page.locator('[data-motion-stage]').evaluate(el => getComputedStyle(el.parentElement).gridTemplateColumns);
  for (const path of ['/about', '/lab', '/nokia']) {
    const layoutPage = await context.newPage();
    // These checks measure the grid, not the unrelated photo/video downloads.
    await layoutPage.route('**/*', route => ['image', 'media'].includes(route.request().resourceType())
      ? route.abort() : route.continue());
    await layoutPage.goto(base + path, { waitUntil: 'domcontentloaded' });
    const columns = await layoutPage.locator('.page-gutter.grid, .page-gutter > .grid').first().evaluate(el => getComputedStyle(el).gridTemplateColumns);
    if (path === '/about') {
      const widths = columns.split(' ').map(parseFloat);
      assert.ok(Math.abs(widths[0] / widths[1] - .87 / 2.1) < .001);
      assert.ok(Math.abs(widths[0] - widths[2]) < .1);
      assert.equal(await layoutPage.locator('.about-layout').evaluate(el => getComputedStyle(el).paddingLeft), '12px');
    } else assert.equal(columns, homeColumns, `${path} keeps the shared column widths`);
    await layoutPage.close();
  }
  await home(page);
  await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
  for (const [project, , baseColor] of projects) {
    assert.equal(await page.locator(`#${project}-thumbnail`).evaluate(el => getComputedStyle(el).backgroundColor), baseColor);
  }
  await page.locator('#ssfb-thumbnail').hover();
  await pause(470);
  await page.screenshot({ path: join(tmpdir(), 'portfolio-motion-dark.png'), fullPage: true });

  await page.setViewportSize({ width: 1000, height: 800 });
  await observe(page);
  await page.locator('#nokia-thumbnail').hover();
  await pause(470);
  assert.ok(await page.locator('#nokia-thumbnail > span').first().evaluate(el => Number(getComputedStyle(el).clipPath.match(/circle\(([\d.]+)/)?.[1]) > 0));
  await page.locator('#nokia-thumbnail').click();
  await page.waitForURL(base + '/nokia');
  await checkFade(page);
  console.log('shared layout/dark theme/narrow mouse viewport passed');

  const touch = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobile = await touch.newPage();
  mobile.on('pageerror', error => errors.push(error.message));
  await home(mobile);
  await observe(mobile);
  await mobile.locator('#sap-thumbnail').tap();
  await mobile.waitForURL(base + '/sap');
  await checkFade(mobile);
  assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await touch.close();
  assert.deepEqual(errors, []);
  console.log('touch navigation and runtime checks passed');
} finally {
  await browser.close();
}
