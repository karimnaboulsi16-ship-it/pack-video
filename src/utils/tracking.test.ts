import test from 'node:test';
import assert from 'node:assert/strict';
import { preserveTrackingParams } from './tracking';

const KIRVANO_BASE = 'https://pay.kirvano.com/ddac7633-64ed-4903-8087-052abc044530';

test('preserves UTMs and exact-case fbclid from page query string', () => {
  const result = preserveTrackingParams(
    KIRVANO_BASE,
    '?utm_source=meta&utm_medium=cpc&utm_campaign=Camp_01&fbclid=IwAR0AbCdEf123XyZ'
  );
  const parsed = new URL(result);
  assert.equal(parsed.origin + parsed.pathname, KIRVANO_BASE);
  assert.equal(parsed.searchParams.get('utm_source'), 'meta');
  assert.equal(parsed.searchParams.get('utm_medium'), 'cpc');
  assert.equal(parsed.searchParams.get('utm_campaign'), 'Camp_01');
  assert.equal(parsed.searchParams.get('fbclid'), 'IwAR0AbCdEf123XyZ');
});

test('preserves existing LowTrack parameters already attached to targetHref without overwriting', () => {
  const decoratedByLowtrack = `${KIRVANO_BASE}?click_id=lt_123_abc&utm_source=lowtrack_src`;
  const result = preserveTrackingParams(
    decoratedByLowtrack,
    '?utm_source=meta&utm_content=adset2&fbclid=CaseSensitiveID99'
  );
  const parsed = new URL(result);
  assert.equal(parsed.searchParams.get('click_id'), 'lt_123_abc');
  assert.equal(parsed.searchParams.get('utm_source'), 'lowtrack_src');
  assert.equal(parsed.searchParams.get('utm_content'), 'adset2');
  assert.equal(parsed.searchParams.get('fbclid'), 'CaseSensitiveID99');
});

test('ignores internal autostart parameter and returns base URL when search is empty', () => {
  const result = preserveTrackingParams(KIRVANO_BASE, '?autostart=1&utm_term=video1');
  const parsed = new URL(result);
  assert.equal(parsed.searchParams.get('autostart'), null);
  assert.equal(parsed.searchParams.get('utm_term'), 'video1');

  assert.equal(preserveTrackingParams(KIRVANO_BASE, ''), KIRVANO_BASE);
});
