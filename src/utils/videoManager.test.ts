import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isCarouselItemInView,
  isRectNearViewport,
} from './videoManager';

test('isRectNearViewport detects vertical and horizontal visibility with margins', () => {
  const rect = { left: 20, right: 320, top: 950, bottom: 1300, width: 300, height: 350 };
  assert.equal(isRectNearViewport(rect, 390, 844, 120, 220), true);
  assert.equal(isRectNearViewport(rect, 390, 844, 120, 50), false);
});

test('isCarouselItemInView keeps visible and upcoming carousel items active while pausing distant ones', () => {
  const container = { left: 100, right: 1100, top: 300, bottom: 750, width: 1000, height: 450 };

  // Currently visible
  assert.equal(
    isCarouselItemInView({ left: 200, right: 450, top: 300, bottom: 744, width: 250, height: 444 }, container),
    true
  );

  // Pre-warm zone just entering from the right
  assert.equal(
    isCarouselItemInView({ left: 1220, right: 1470, top: 300, bottom: 744, width: 250, height: 444 }, container, 160),
    true
  );

  // Far off-screen to the right
  assert.equal(
    isCarouselItemInView({ left: 1500, right: 1750, top: 300, bottom: 744, width: 250, height: 444 }, container, 160),
    false
  );

  // Exited far past left edge
  assert.equal(
    isCarouselItemInView({ left: -350, right: -100, top: 300, bottom: 744, width: 250, height: 444 }, container, 160),
    false
  );
});
