import React, { useEffect, useState } from 'react';
import {
  INITIAL_SPOTS_REMAINING,
  MIN_SPOTS_REMAINING,
  SPOTS_STEP_INTERVAL_MS,
  decrementSpotsRemaining
} from '../utils/spotsCountdown';

interface RemainingSpotsBadgeProps {
  paused?: boolean;
}

export const RemainingSpotsBadge = React.memo(function RemainingSpotsBadge({
  paused = false
}: RemainingSpotsBadgeProps) {
  const [spots, setSpots] = useState<number>(INITIAL_SPOTS_REMAINING);

  useEffect(() => {
    if (paused || spots <= MIN_SPOTS_REMAINING) return;
    const timer = window.setInterval(() => {
      setSpots((current) => decrementSpotsRemaining(current));
    }, SPOTS_STEP_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, spots]);

  return (
    <div
      data-testid="remaining-spots-badge"
      className="inline-flex flex-col items-center justify-center rounded-2xl border-2 border-[#ff3b30]/85 bg-[#ff3b30]/[0.08] px-6 py-3 mb-3 text-center select-none shadow-[0_0_20px_rgba(255,59,48,0.18)]"
      role="status"
      aria-live="polite"
    >
      <span
        data-testid="remaining-spots-label"
        className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-[#ff3b30]"
      >
        Vagas restantes com desconto
      </span>
      <span
        data-testid="remaining-spots-value"
        className="spots-number-blink text-5xl sm:text-6xl font-black leading-none mt-1 tabular-nums"
      >
        {spots}
      </span>
    </div>
  );
});
