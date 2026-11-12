import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EXTRA_BONUS_CARDS,
  EXTRA_CHECKLIST_BONUSES,
  OFFER_PRIMARY_ELEMENT_ID,
  OFFER_SECTION_FALLBACK_ID,
  computeOfferScrollTop,
  hasScrollTargetDrifted,
} from './offer';

test('EXTRA_BONUS_CARDS includes both requested bonuses', () => {
  const titles = EXTRA_BONUS_CARDS.map((b) => b.title);
  assert.ok(titles.includes("Vídeos sem marca d'água e sem copyright"));
  assert.ok(titles.includes('Suporte exclusivo com especialista até viralizar'));
  assert.equal(EXTRA_BONUS_CARDS.length, 2);
});

test('EXTRA_CHECKLIST_BONUSES includes both requested offer items', () => {
  assert.deepEqual(EXTRA_CHECKLIST_BONUSES, [
    "Vídeos sem marca d'água e sem copyright",
    'Suporte exclusivo com especialista até monetizar',
  ]);
});

test('OFFER_PRIMARY_ELEMENT_ID and fallback ID are configured cleanly', () => {
  assert.equal(OFFER_PRIMARY_ELEMENT_ID, 'oferta-principal');
  assert.equal(OFFER_SECTION_FALLBACK_ID, 'checkout');
});

test('computeOfferScrollTop accurately sums rect.top and currentScrollY minus offset', () => {
  assert.equal(computeOfferScrollTop(5200, 0, 16), 5184);
  assert.equal(computeOfferScrollTop(1200, 4000, 16), 5184);
  // Clamps to 0 when target is near the very top
  assert.equal(computeOfferScrollTop(5, 0, 16), 0);
});

test('hasScrollTargetDrifted detects layout shift drift accurately', () => {
  assert.equal(hasScrollTargetDrifted(16, 16, 36), false);
  assert.equal(hasScrollTargetDrifted(45, 16, 36), false);
  assert.equal(hasScrollTargetDrifted(120, 16, 36), true);
  assert.equal(hasScrollTargetDrifted(-800, 16, 36), true);
});
