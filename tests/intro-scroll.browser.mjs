// PLAYWRIGHT_MODULE may point to an existing Playwright installation.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const base = process.env.PORTFOLIO_URL || 'http://localhost:3000';
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const open = async path => {
    await page.goto(base + path, { waitUntil: 'domcontentloaded' });
    await page.locator('.case-study-cue a').waitFor();
    await page.waitForTimeout(900);
  };
  for (const path of ['/sap', '/nokia', '/simpliifinancial', '/ssfb']) {
    await open(path);
    await page.locator('.case-study-cue a').click();
    const bounce = await page.locator('[data-intro-scroll-bounce]').evaluate(el => ({
      inMiddle: !!el.closest('[data-motion-stage]'),
      frames: el.getAnimations()[0].effect.getKeyframes().map(frame => frame.transform),
      headerTransform: getComputedStyle(document.querySelector('header')).transform,
      leftTransform: getComputedStyle(document.querySelector('.case-study-left')).transform,
      rightTransform: getComputedStyle(document.querySelector('.case-study-summary')).transform,
    }));
    assert.equal(bounce.inMiddle, true);
    assert.deepEqual(bounce.frames, ['translateY(0px)', 'translateY(14px)', 'translateY(-5px)', 'translateY(2px)', 'translateY(0px)']);
    assert.equal(bounce.headerTransform, 'none');
    assert.equal(bounce.leftTransform, 'none');
    assert.equal(bounce.rightTransform, 'none');
    await page.waitForFunction(() => scrollY > 100 && !document.querySelector('[data-intro-scroll-bounce]'));
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.locator('.case-study-cue a').dispatchEvent('click');
    assert.equal(await page.locator('[data-intro-scroll-bounce]').count(), 0, 'Only the first assisted scroll gets a bounce');
    console.log('middle-only bounce, scrolling and cleanup', path);
  }
  await open('/sap');
  await page.locator('.case-study-cue a').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('[data-intro-scroll-bounce]').count(), 1);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('[data-intro-scroll-bounce]').count(), 0);

  await open('/sap');
  await page.mouse.move(700, 400);
  await page.mouse.wheel(0, 120);
  await page.waitForFunction(() => !!document.querySelector('[data-intro-scroll-bounce]'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => !document.querySelector('[data-intro-scroll-bounce]'), null, { timeout: 250 });
  assert.equal(await page.locator('[data-intro-scroll-bounce]').count(), 0);
  await open('/sap');
  await page.locator('.case-study-cue a').click();
  assert.equal(await page.locator('[data-intro-scroll-bounce]').count(), 0);
  assert.ok(await page.evaluate(() => scrollY > 100));
  assert.deepEqual(errors, []);
  console.log('keyboard, wheel, Escape, reduced motion and runtime checks passed');
} finally {
  await browser.close();
}
