import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveOfferElement,
  computeTargetScrollTop,
  needsScrollCorrection
} from './scrollToOffer';

test('resolveOfferElement prioritizes #oferta-principal, then #checkout, then .price-section', () => {
  const oferta = { getBoundingClientRect: () => ({ top: 100 }) };
  const checkout = { getBoundingClientRect: () => ({ top: 50 }) };
  const priceSection = { getBoundingClientRect: () => ({ top: 20 }) };

  const docAll = {
    getElementById: (id: string) =>
      id === 'oferta-principal' ? oferta : id === 'checkout' ? checkout : null,
    querySelector: () => priceSection
  };
  assert.equal(resolveOfferElement(docAll), oferta);

  const docCheckoutOnly = {
    getElementById: (id: string) => (id === 'checkout' ? checkout : null),
    querySelector: () => priceSection
  };
  assert.equal(resolveOfferElement(docCheckoutOnly), checkout);

  const docClassOnly = {
    getElementById: () => null,
    querySelector: (sel: string) => (sel === '.price-section' ? priceSection : null)
  };
  assert.equal(resolveOfferElement(docClassOnly), priceSection);
});

test('computeTargetScrollTop calculates accurate non-negative scroll offset', () => {
  assert.equal(computeTargetScrollTop(1200, 300, 16), 1484);
  assert.equal(computeTargetScrollTop(-400, 2000, 16), 1584);
  assert.equal(computeTargetScrollTop(5, 0, 16), 0);
});

test('needsScrollCorrection detects layout-shift drift beyond tolerance', () => {
  assert.equal(needsScrollCorrection(16, 16, 40), false);
  assert.equal(needsScrollCorrection(50, 16, 40), false);
  assert.equal(needsScrollCorrection(200, 16, 40), true);
  assert.equal(needsScrollCorrection(-100, 16, 40), true);
});
