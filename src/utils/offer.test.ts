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

test('EXTRA_BONUS_CARDS includes all requested bonuses in BRL', () => {
  const titles = EXTRA_BONUS_CARDS.map((b) => b.title);
  assert.ok(titles.includes('Atualizações Semanais de Novos Vídeos'));
  assert.ok(titles.includes("Vídeos sem marca d'água e sem copyright"));
  assert.ok(titles.includes('Suporte exclusivo com especialista até viralizar'));
  assert.ok(titles.includes('Aprenda a vender como afiliado'));
  assert.ok(titles.includes('Aprenda a vender e usar legendas/hashtags certas'));
  assert.equal(EXTRA_BONUS_CARDS.length, 5);
  for (const card of EXTRA_BONUS_CARDS) {
    assert.ok(card.oldValueLabel.includes('R$'));
    assert.ok(!card.oldValueLabel.includes('USD'));
  }
});

test('EXTRA_CHECKLIST_BONUSES includes all requested offer items', () => {
  assert.deepEqual(EXTRA_CHECKLIST_BONUSES, [
    "Vídeos sem marca d'água e sem copyright",
    'Suporte exclusivo com especialista até monetizar',
    'Aprenda a vender como afiliado',
    'Aprenda a vender e usar legendas/hashtags certas',
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
