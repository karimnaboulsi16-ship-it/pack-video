export interface OfferBonusCard {
  id: string;
  badge: string;
  title: string;
  oldValueLabel: string;
  freeLabel: string;
}

export const EXTRA_BONUS_CARDS: OfferBonusCard[] = [
  {
    id: 'no-watermark-copyright',
    badge: 'BÔNUS #06',
    title: "Vídeos sem marca d'água e sem copyright",
    oldValueLabel: 'Valor: $47 USD',
    freeLabel: '✓ 100% GRÁTIS',
  },
  {
    id: 'exclusive-specialist-support',
    badge: 'BÔNUS #07',
    title: 'Suporte exclusivo com especialista até viralizar',
    oldValueLabel: 'Valor: $97 USD',
    freeLabel: '✓ 100% GRÁTIS',
  },
];

export const EXTRA_CHECKLIST_BONUSES: string[] = [
  "Vídeos sem marca d'água e sem copyright",
  'Suporte exclusivo com especialista até monetizar',
];

export const OFFER_PRIMARY_ELEMENT_ID = 'oferta-principal';
export const OFFER_SECTION_FALLBACK_ID = 'checkout';

export function computeOfferScrollTop(
  elementRectTop: number,
  currentScrollY: number,
  offsetPx = 16
): number {
  return Math.max(0, Math.round(elementRectTop + currentScrollY - offsetPx));
}

export function hasScrollTargetDrifted(
  elementRectTop: number,
  targetOffsetPx = 16,
  tolerancePx = 36
): boolean {
  return Math.abs(elementRectTop - targetOffsetPx) > tolerancePx;
}

export function findOfferTargetElement(doc: Document): HTMLElement | null {
  return (
    doc.getElementById(OFFER_PRIMARY_ELEMENT_ID) ||
    doc.getElementById(OFFER_SECTION_FALLBACK_ID) ||
    (doc.querySelector('.price-section') as HTMLElement | null)
  );
}

let activeScrollCleanup: (() => void) | null = null;

export function scrollToOfferSection(options?: {
  behavior?: ScrollBehavior;
  offsetPx?: number;
}): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  const target = findOfferTargetElement(document);
  if (!target) return false;

  if (activeScrollCleanup) {
    activeScrollCleanup();
    activeScrollCleanup = null;
  }

  const offsetPx = options?.offsetPx ?? 16;
  const behavior = options?.behavior ?? 'smooth';

  const scrollOnce = (scrollBehavior: ScrollBehavior) => {
    const top = computeOfferScrollTop(
      target.getBoundingClientRect().top,
      window.scrollY,
      offsetPx
    );
    window.scrollTo({ top, behavior: scrollBehavior });
  };

  scrollOnce(behavior);

  let cancelled = false;
  const cancel = () => {
    cancelled = true;
    cleanup();
  };

  const t1 = window.setTimeout(() => {
    if (cancelled) return;
    if (hasScrollTargetDrifted(target.getBoundingClientRect().top, offsetPx)) {
      scrollOnce('smooth');
    }
  }, 450);

  const t2 = window.setTimeout(() => {
    if (cancelled) return;
    if (hasScrollTargetDrifted(target.getBoundingClientRect().top, offsetPx)) {
      scrollOnce('auto');
    }
    cleanup();
  }, 900);

  const cleanup = () => {
    window.clearTimeout(t1);
    window.clearTimeout(t2);
    window.removeEventListener('wheel', cancel);
    window.removeEventListener('touchstart', cancel);
    window.removeEventListener('keydown', cancel);
    if (activeScrollCleanup === cleanup) {
      activeScrollCleanup = null;
    }
  };

  window.addEventListener('wheel', cancel, { passive: true, once: true });
  window.addEventListener('touchstart', cancel, { passive: true, once: true });
  window.addEventListener('keydown', cancel, { passive: true, once: true });
  activeScrollCleanup = cleanup;

  return true;
}
