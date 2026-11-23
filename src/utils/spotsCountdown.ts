export const INITIAL_SPOTS_REMAINING = 8;
export const MIN_SPOTS_REMAINING = 1;
export const SPOTS_STEP_INTERVAL_MS = 20_000;

export function decrementSpotsRemaining(
  current: number,
  min: number = MIN_SPOTS_REMAINING
): number {
  if (!Number.isFinite(current)) return INITIAL_SPOTS_REMAINING;
  return Math.max(min, Math.floor(current) - 1);
}

export function computeSpotsFromElapsedMs(
  elapsedMs: number,
  initial: number = INITIAL_SPOTS_REMAINING,
  min: number = MIN_SPOTS_REMAINING,
  intervalMs: number = SPOTS_STEP_INTERVAL_MS
): number {
  if (!Number.isFinite(elapsedMs) || elapsedMs <= 0 || intervalMs <= 0) {
    return initial;
  }
  const steps = Math.floor(elapsedMs / intervalMs);
  return Math.max(min, initial - steps);
}
