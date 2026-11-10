/**
 * Pure calculation logic for Viral Pack Pro roulette and social proof
 */

export interface RouletteSlice {
  label: string;
  bg: string;
  color: string;
  isWinner?: boolean;
}

export const ROULETTE_SLICES: RouletteSlice[] = [
  { label: '90%', bg: '#CCFF00', color: '#000000' },
  { label: '0%', bg: '#374151', color: '#9CA3AF' },
  { label: '50%', bg: '#2563EB', color: '#FFFFFF' },
  { label: '0%', bg: '#374151', color: '#9CA3AF' },
  { label: '85%', bg: '#CCFF00', color: '#000000', isWinner: true },
  { label: '20%', bg: '#EA580C', color: '#FFFFFF' },
  { label: '0%', bg: '#374151', color: '#9CA3AF' },
  { label: '70%', bg: '#7C3AED', color: '#FFFFFF' }
];

export function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: Number((centerX + radius * Math.cos(angleInRadians)).toFixed(2)),
    y: Number((centerY + radius * Math.sin(angleInRadians)).toFixed(2))
  };
}

export function computeViewerFluctuation(current: number, randomDelta: number = 0): number {
  const next = current + randomDelta;
  if (next < 64) return 66;
  if (next > 96) return 92;
  return next;
}

export function computeWinningRotation(baseRotations = 8.5, jitter = 0): number {
  // 360 * 8.5 = 3060 degrees, pointing to the 85% discount slice
  return Math.round(360 * baseRotations + jitter);
}

export function getWinnerSlice(): RouletteSlice {
  const winner = ROULETTE_SLICES.find(s => s.isWinner);
  if (!winner) throw new Error('Winner slice not defined');
  return winner;
}
