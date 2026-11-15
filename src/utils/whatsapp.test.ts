import test from 'node:test';
import assert from 'node:assert/strict';
import {
  WHATSAPP_DEFAULT_MESSAGE,
  WHATSAPP_PHONE,
  buildWhatsAppUrl,
} from './whatsapp';

test('buildWhatsAppUrl includes phone number and encoded automatic help message', () => {
  const urlString = buildWhatsAppUrl();
  const parsed = new URL(urlString);

  assert.equal(parsed.origin, 'https://wa.me');
  assert.equal(parsed.pathname, `/${WHATSAPP_PHONE}`);
  assert.equal(parsed.searchParams.get('text'), WHATSAPP_DEFAULT_MESSAGE);
  assert.ok(urlString.startsWith('https://wa.me/5515996788845?text='));
});

test('buildWhatsAppUrl normalizes phone digits and handles empty message', () => {
  assert.equal(
    buildWhatsAppUrl('(15) 99678-8845', '   '),
    'https://wa.me/15996788845'
  );
  assert.equal(
    buildWhatsAppUrl('55 15 99678-8845', 'Preciso de ajuda'),
    'https://wa.me/5515996788845?text=Preciso%20de%20ajuda'
  );
});
