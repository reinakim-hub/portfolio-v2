// Node 24+ can execute the imported TypeScript with built-in type stripping.
// Run: node --test --test-isolation=none tests/motion-geometry.test.mjs
import assert from 'node:assert/strict';
import test from 'node:test';
import { coverRadius, exitOrigin } from '../components/portfolio-motion/motion-geometry.ts';

test('cover reaches every corner from center, edges and fractional entry points', () => {
  for (const size of [{ width: 450, height: 238 }, { width: 731.25, height: 809.5 }]) {
    for (const p of [{ x: 0, y: 0 }, { x: size.width, y: size.height },
      { x: size.width / 2, y: size.height / 2 }, { x: .5, y: size.height - .25 }]) {
      const radius = coverRadius(p, size);
      for (const x of [0, size.width]) for (const y of [0, size.height]) {
        assert.ok(radius >= Math.hypot(x - p.x, y - p.y) + 2.99);
      }
    }
  }
});

test('leave shrinks toward the actual exit edge, including outside events', () => {
  const size = { width: 450, height: 238 };
  assert.deepEqual(exitOrigin({ x: -20, y: 100 }, size), { x: -12, y: 100 });
  assert.deepEqual(exitOrigin({ x: 451, y: 100 }, size), { x: 462, y: 100 });
  assert.deepEqual(exitOrigin({ x: 200, y: -1 }, size), { x: 200, y: -12 });
  assert.deepEqual(exitOrigin({ x: 200, y: 250 }, size), { x: 200, y: 250 });
});

