import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getCheckoutLinkTarget,
  isCheckoutHref,
  preserveTrackingParams,
  shouldFireBrowserInitiateCheckout
} from './tracking';

const CHECKOUT_BASE = 'https://pay.wiapy.com/KwLhGeQR_aVF';

test('preserves UTMs and exact-case fbclid from page query string', () => {
  const result = preserveTrackingParams(
    CHECKOUT_BASE,
    '?utm_source=meta&utm_medium=cpc&utm_campaign=Camp_01&fbclid=IwAR0AbCdEf123XyZ'
  );
  const parsed = new URL(result);
  assert.equal(parsed.origin + parsed.pathname, CHECKOUT_BASE);
  assert.equal(parsed.searchParams.get('utm_source'), 'meta');
  assert.equal(parsed.searchParams.get('utm_medium'), 'cpc');
  assert.equal(parsed.searchParams.get('utm_campaign'), 'Camp_01');
  assert.equal(parsed.searchParams.get('fbclid'), 'IwAR0AbCdEf123XyZ');
});

test('preserves existing LowTrack parameters already attached to targetHref without overwriting', () => {
  const decoratedByLowtrack = `${CHECKOUT_BASE}?click_id=lt_123_abc&utm_source=lowtrack_src`;
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
  const result = preserveTrackingParams(CHECKOUT_BASE, '?autostart=1&utm_term=video1');
  const parsed = new URL(result);
  assert.equal(parsed.searchParams.get('autostart'), null);
  assert.equal(parsed.searchParams.get('utm_term'), 'video1');

  assert.equal(preserveTrackingParams(CHECKOUT_BASE, ''), CHECKOUT_BASE);
});

test('uses same-tab navigation on mobile and in-app browsers when top-level, and _blank on desktop or iframes', () => {
  const iosSafari =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
  const instagramIos =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 Mobile/21F90 Instagram 330.0.0.23.92';
  const tiktokAndroid =
    'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/125.0.0.0 Mobile Safari/537.36 BytedanceWebview/d8a21c6';
  const desktopChrome =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36';

  assert.equal(getCheckoutLinkTarget(iosSafari, false), undefined);
  assert.equal(getCheckoutLinkTarget(instagramIos, false), undefined);
  assert.equal(getCheckoutLinkTarget(tiktokAndroid, false), undefined);
  assert.equal(getCheckoutLinkTarget(desktopChrome, false), '_blank');
  assert.equal(getCheckoutLinkTarget(iosSafari, true), '_blank');
});

test('suppresses duplicate browser InitiateCheckout when LowTrack CAPI is loaded and distinguishes checkout URLs', () => {
  assert.equal(shouldFireBrowserInitiateCheckout({ __ltPixelLoaded: true }), false);
  assert.equal(shouldFireBrowserInitiateCheckout({ LowTrack: {} }), false);
  assert.equal(shouldFireBrowserInitiateCheckout({}), true);

  assert.equal(isCheckoutHref(CHECKOUT_BASE), true);
  assert.equal(isCheckoutHref('#oferta-principal'), false);
  assert.equal(isCheckoutHref(null), false);
});


