import React, { useEffect, useState } from 'react';
import { computeViewerFluctuation } from '../utils/roulette';

interface ViewerCounterBadgeProps {
  paused?: boolean;
}

export const ViewerCounterBadge = React.memo(function ViewerCounterBadge({
  paused = false
}: ViewerCounterBadgeProps) {
  const [viewerCount, setViewerCount] = useState<number>(74);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setViewerCount((current) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return computeViewerFluctuation(current, delta);
      });
    }, 3800);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div className="flex justify-center -mt-1 mb-7">
      <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-red-950/75 border border-red-500/60 shadow-[0_0_25px_rgba(239,68,68,0.35)] text-red-400 text-xs sm:text-sm font-semibold tracking-wide">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        <span>
          <strong className="text-red-200 font-black">{viewerCount} pessoas</strong>{' '}
          estão nesta página e adquirindo o pack agora mesmo
        </span>
      </div>
    </div>
  );
});
