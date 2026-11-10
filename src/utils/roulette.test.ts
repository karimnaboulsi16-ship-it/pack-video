import test from 'node:test';
import assert from 'node:assert/strict';
import {
  polarToCartesian,
  computeViewerFluctuation,
  computeWinningRotation,
  getWinnerSlice,
  ROULETTE_SLICES
} from './roulette';

test('polarToCartesian computes accurate coordinates at cardinal angles', () => {
  // Top: 0 degrees (due north in polarToCartesian with -90 offset)
  const top = polarToCartesian(150, 150, 100, 0);
  assert.equal(top.x, 150);
  assert.equal(top.y, 50);

  // Right: 90 degrees (due east)
  const right = polarToCartesian(150, 150, 100, 90);
  assert.equal(right.x, 250);
  assert.equal(right.y, 150);

  // Bottom: 180 degrees (due south)
  const bottom = polarToCartesian(150, 150, 100, 180);
  assert.equal(bottom.x, 150);
  assert.equal(bottom.y, 250);
});

test('ROULETTE_SLICES contains exactly 8 slices with 85% as winner', () => {
  assert.equal(ROULETTE_SLICES.length, 8);
  const winner = getWinnerSlice();
  assert.equal(winner.label, '85%');
  assert.equal(winner.bg, '#CCFF00');
  assert.equal(winner.isWinner, true);
});

test('computeViewerFluctuation clamps within realistic social proof range [64, 96]', () => {
  assert.equal(computeViewerFluctuation(74, 2), 76);
  assert.equal(computeViewerFluctuation(74, -2), 72);
  // Lower clamp
  assert.equal(computeViewerFluctuation(60, -5), 66);
  // Upper clamp
  assert.equal(computeViewerFluctuation(100, 5), 92);
});

test('computeWinningRotation calculates spin degrees targeting 85% discount', () => {
  const rotation = computeWinningRotation(8.5, 0);
  assert.equal(rotation, 3060);
  // With jitter within +/- 2 degrees
  const rotationWithJitter = computeWinningRotation(8.5, 2);
  assert.equal(rotationWithJitter, 3062);
});
