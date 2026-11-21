export function preserveTrackingParams(
  targetHref: string,
  currentSearch: string
): string {
  if (!targetHref) return targetHref;

  try {
    const baseOrigin =
      typeof window !== 'undefined' && window.location?.origin
        ? window.location.origin
        : 'https://localhost';
    const url = new URL(targetHref, baseOrigin);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return targetHref;
    }

    if (currentSearch && currentSearch.length > 1) {
      const searchString = currentSearch.startsWith('?')
        ? currentSearch.slice(1)
        : currentSearch;
      const incoming = new URLSearchParams(searchString);
      incoming.forEach((value, key) => {
        if (!key || key === 'autostart' || value === '') return;
        if (!url.searchParams.has(key)) {
          url.searchParams.set(key, value);
        }
      });
    }

    return url.toString();
  } catch {
    return targetHref;
  }
}

const MOBILE_OR_IN_APP_UA_RE =
  /Instagram|FBAN|FBAV|FB_IAB|TikTok|BytedanceWebview|musical_ly|Kwai|WhatsApp|Line\/|iPhone|iPad|iPod|Android|Mobile/i;

export function isInsideIframe(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

export function getCheckoutLinkTarget(
  userAgent?: string,
  isFramed?: boolean
): '_blank' | undefined {
  const framed = isFramed ?? isInsideIframe();
  if (framed) return '_blank';

  const ua =
    userAgent ?? (typeof navigator !== 'undefined' ? navigator.userAgent : '');
  if (ua && MOBILE_OR_IN_APP_UA_RE.test(ua)) {
    return undefined;
  }

  return '_blank';
}

export function isCheckoutHref(href: string | null | undefined): boolean {
  return typeof href === 'string' && href.includes('pay.wiapy.com');
}

export function shouldFireBrowserInitiateCheckout(
  win: { __ltPixelLoaded?: boolean; LowTrack?: unknown } | undefined =
    typeof window !== 'undefined'
      ? (window as unknown as { __ltPixelLoaded?: boolean; LowTrack?: unknown })
      : undefined
): boolean {
  if (!win) return false;
  return !win.__ltPixelLoaded && !win.LowTrack;
}


