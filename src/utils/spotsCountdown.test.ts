import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_SPOTS_REMAINING,
  MIN_SPOTS_REMAINING,
  SPOTS_STEP_INTERVAL_MS,
  computeSpotsFromElapsedMs,
  decrementSpotsRemaining
} from './spotsCountdown';

test('decrementSpotsRemaining decrements from 8 down to 1 and stops at 1', () => {
  let current = INITIAL_SPOTS_REMAINING;
  assert.equal(current, 8);

  for (let expected = 7; expected >= MIN_SPOTS_REMAINING; expected--) {
    current = decrementSpotsRemaining(current);
    assert.equal(current, expected);
  }

  // Must remain clamped at 1
  assert.equal(decrementSpotsRemaining(1), 1);
  assert.equal(decrementSpotsRemaining(0), 1);
});

test('computeSpotsFromElapsedMs decrements once every 20 seconds until reaching 1', () => {
  assert.equal(SPOTS_STEP_INTERVAL_MS, 20_000);
  assert.equal(computeSpotsFromElapsedMs(0), 8);
  assert.equal(computeSpotsFromElapsedMs(19_999), 8);
  assert.equal(computeSpotsFromElapsedMs(SPOTS_STEP_INTERVAL_MS), 7);
  assert.equal(computeSpotsFromElapsedMs(SPOTS_STEP_INTERVAL_MS * 2), 6);
  assert.equal(computeSpotsFromElapsedMs(SPOTS_STEP_INTERVAL_MS * 7), 1);
  assert.equal(computeSpotsFromElapsedMs(SPOTS_STEP_INTERVAL_MS * 20), 1);
});
