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
