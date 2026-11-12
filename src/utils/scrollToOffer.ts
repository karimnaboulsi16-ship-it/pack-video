export interface ScrollTargetElement {
  getBoundingClientRect: () => { top: number };
}

export interface QueryableDocument {
  getElementById: (id: string) => ScrollTargetElement | null;
  querySelector: (selector: string) => ScrollTargetElement | null;
}

export function resolveOfferElement(doc: QueryableDocument): ScrollTargetElement | null {
  return (
    doc.getElementById('oferta-principal') ||
    doc.getElementById('checkout') ||
    doc.querySelector('.price-section')
  );
}

export function computeTargetScrollTop(
  rectTop: number,
  currentScrollY: number,
  offsetPx: number = 16
): number {
  return Math.max(0, Math.round(rectTop + currentScrollY - offsetPx));
}

export function needsScrollCorrection(
  rectTop: number,
  offsetPx: number = 16,
  tolerancePx: number = 40
): boolean {
  return Math.abs(rectTop - offsetPx) > tolerancePx;
}
