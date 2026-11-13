import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ROULETTE_SLICES,
  buildRouletteTickOffsets,
  computeWinningRotation,
  polarToCartesian
} from '../utils/roulette';

const SPIN_DURATION_MS = 5000;
const TICK_OFFSETS_SEC = buildRouletteTickOffsets(5.0, 26);

// Precompute static SVG path geometry once at module load
const PRECOMPUTED_SLICES = ROULETTE_SLICES.map((slice, idx) => {
  const startAngle = idx * 45 - 22.5;
  const endAngle = idx * 45 + 22.5;
  const start = polarToCartesian(150, 150, 135, startAngle);
  const end = polarToCartesian(150, 150, 135, endAngle);
  return {
    ...slice,
    path: `M 150 150 L ${start.x} ${start.y} A 135 135 0 0 1 ${end.x} ${end.y} Z`,
    labelAngle: idx * 45
  };
});

const RouletteWheelSvg = React.memo(function RouletteWheelSvg() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full block" aria-hidden="true">
      <circle cx="150" cy="150" r="148" fill="#181A22" stroke="#CCFF00" strokeWidth="3" />
      <circle
        cx="150"
        cy="150"
        r="142"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeDasharray="4 16"
        opacity="0.6"
      />
      {PRECOMPUTED_SLICES.map((slice, idx) => (
        <g key={idx}>
          <path d={slice.path} fill={slice.bg} stroke="#181A22" strokeWidth="2" />
          <text
            x="150"
            y="52"
            transform={`rotate(${slice.labelAngle}, 150, 150)`}
            textAnchor="middle"
            dominantBaseline="central"
            fill={slice.color}
            fontSize={slice.isWinner ? '18' : '15'}
            fontWeight="900"
            fontFamily="Montserrat, sans-serif"
            letterSpacing="0.5px"
          >
            {slice.label}
          </text>
        </g>
      ))}
      <circle cx="150" cy="150" r="28" fill="#121318" stroke="#CCFF00" strokeWidth="3" />
      <circle cx="150" cy="150" r="18" fill="#CCFF00" />
      <text
        x="150"
        y="151"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#000000"
        fontSize="8"
        fontWeight="900"
        fontFamily="Montserrat, sans-serif"
        letterSpacing="0.5px"
      >
        GIRAR
      </text>
    </svg>
  );
});

let sharedAudioCtx: AudioContext | null = null;
let activeNodes: OscillatorNode[] = [];

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new Ctx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

function stopAllRouletteAudio() {
  activeNodes.forEach((node) => {
    try {
      node.stop();
      node.disconnect();
    } catch {}
  });
  activeNodes = [];
}

function playTickSound(ctx: AudioContext, atTime: number, accent: boolean) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(2200, atTime);
  osc.frequency.exponentialRampToValueAtTime(580, atTime + 0.015);
  gain.gain.setValueAtTime(accent ? 0.18 : 0.1, atTime);
  gain.gain.exponentialRampToValueAtTime(0.001, atTime + 0.018);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(atTime);
  osc.stop(atTime + 0.024);
  activeNodes.push(osc);
}

function playSpinAudioSequence() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    stopAllRouletteAudio();
    const base = ctx.currentTime + 0.03;
    TICK_OFFSETS_SEC.forEach((offset, idx) => {
      playTickSound(ctx, base + offset, idx >= TICK_OFFSETS_SEC.length - 4);
    });
  } catch {}
}

function playWinFanfare() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    stopAllRouletteAudio();
    const base = ctx.currentTime + 0.04;

    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bass.type = 'sine';
    bass.frequency.setValueAtTime(160, base);
    bass.frequency.exponentialRampToValueAtTime(48, base + 0.24);
    bassGain.gain.setValueAtTime(0.4, base);
    bassGain.gain.exponentialRampToValueAtTime(0.001, base + 0.28);
    bass.connect(bassGain);
    bassGain.connect(ctx.destination);
    bass.start(base);
    bass.stop(base + 0.3);
    activeNodes.push(bass);

    [
      { freq: 523.25, time: 0, dur: 0.15 },
      { freq: 659.25, time: 0.13, dur: 0.15 },
      { freq: 783.99, time: 0.26, dur: 0.17 },
      { freq: 1046.5, time: 0.41, dur: 0.22 },
      { freq: 1318.5, time: 0.58, dur: 0.25 },
      { freq: 1567.98, time: 0.76, dur: 0.75 }
    ].forEach(({ freq, time, dur }) => {
      const startAt = base + time;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startAt);
      gain.gain.setValueAtTime(0.2, startAt);
      gain.gain.exponentialRampToValueAtTime(0.001, startAt + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startAt);
      osc.stop(startAt + dur + 0.04);
      activeNodes.push(osc);
    });
  } catch {}
}

async function fireWinConfetti() {
  if (typeof window === 'undefined') return;
  try {
    const mod = await import('canvas-confetti');
    const confetti = mod.default;
    confetti({
      particleCount: 40,
      spread: 65,
      origin: { y: 0.62 },
      zIndex: 99999999,
      ticks: 75,
      gravity: 1.4,
      scalar: 0.9,
      colors: ['#CCFF00', '#FFD700', '#FFFFFF', '#00FFFF']
    });
    window.setTimeout(() => {
      try {
        confetti.reset();
      } catch {}
    }, 950);
  } catch {}
}

interface RouletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWin: () => void;
}

export const RouletteModal = React.memo(function RouletteModal({
  isOpen,
  onClose,
  onWin
}: RouletteModalProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  const wheelRef = useRef<HTMLDivElement>(null);
  const spinLockRef = useRef(false);
  const finishedRef = useRef(false);
  const animRef = useRef<Animation | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const finishSpin = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    setIsSpinning(false);
    setHasSpun(true);
    playWinFanfare();
    fireWinConfetti();
    onWin();
  }, [onWin]);

  const handleSpin = useCallback(() => {
    if (spinLockRef.current || hasSpun) return;
    spinLockRef.current = true;
    finishedRef.current = false;
    setIsSpinning(true);

    const jitter = Math.floor(Math.random() * 5) - 2;
    const targetDeg = computeWinningRotation(8.5, jitter);

    rafRef.current = window.requestAnimationFrame(() => {
      const wheelEl = wheelRef.current;
      if (wheelEl && typeof wheelEl.animate === 'function') {
        try {
          animRef.current?.cancel();
          const anim = wheelEl.animate(
            [
              { transform: 'rotate3d(0, 0, 1, 0deg)' },
              { transform: `rotate3d(0, 0, 1, ${targetDeg}deg)` }
            ],
            {
              duration: SPIN_DURATION_MS,
              easing: 'cubic-bezier(0.08, 0.88, 0.14, 1)',
              fill: 'forwards'
            }
          );
          animRef.current = anim;
          anim.onfinish = finishSpin;
        } catch {
          if (wheelEl) {
            wheelEl.style.transition = `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.08, 0.88, 0.14, 1)`;
            wheelEl.style.transform = `rotate3d(0, 0, 1, ${targetDeg}deg)`;
          }
        }
      } else if (wheelEl) {
        wheelEl.style.transition = `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.08, 0.88, 0.14, 1)`;
        wheelEl.style.transform = `rotate3d(0, 0, 1, ${targetDeg}deg)`;
      }

      // Schedule audio ticks one frame after GPU animation starts so frame 0 stays crisp
      window.requestAnimationFrame(() => {
        playSpinAudioSequence();
      });
    });

    // Guarantee resolution even if WAAPI onfinish is suppressed
    fallbackTimerRef.current = window.setTimeout(finishSpin, SPIN_DURATION_MS + 120);
  }, [finishSpin, hasSpun]);

  const handleContinue = useCallback(() => {
    stopAllRouletteAudio();
    import('canvas-confetti')
      .then((m) => {
        try {
          m.default.reset();
        } catch {}
      })
      .catch(() => {});
    onClose();
  }, [onClose]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      if (fallbackTimerRef.current !== null) window.clearTimeout(fallbackTimerRef.current);
      try {
        animRef.current?.cancel();
      } catch {}
      stopAllRouletteAudio();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-4 bg-black/95 overflow-y-auto">
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#121318] border-2 border-[#CCFF00]/50 rounded-3xl p-5 sm:p-6 shadow-[0_0_40px_rgba(204,255,0,0.2)] text-white text-center my-auto">
        <div className="inline-block bg-[#CCFF00]/15 border border-[#CCFF00]/40 text-[#CCFF00] text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider mb-2">
          🎰 ROLETA DE DESCONTO
        </div>
        <h2 className="text-xl sm:text-2xl font-heading font-black text-white leading-tight mb-1">
          Garanta seu desconto, boa sorte!
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 font-medium mb-3">
          Gire a roleta e descubra sua porcentagem de desconto exclusiva:
        </p>

        <div
          onClick={handleSpin}
          role="button"
          tabIndex={0}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
              ev.preventDefault();
              handleSpin();
            }
          }}
          className={`relative w-64 h-64 sm:w-72 sm:h-72 mx-auto my-2 flex items-center justify-center select-none ${
            !isSpinning && !hasSpun ? 'cursor-pointer' : ''
          }`}
          title="Toque para girar a roleta"
        >
          {/* Static top pointer without per-frame drop-shadow filter repaints */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <div className="w-0 h-0 border-l-[13px] border-l-transparent border-r-[13px] border-r-transparent border-t-[26px] border-t-[#CCFF00]" />
          </div>

          <div className="absolute inset-0 rounded-full border-4 border-[#262A36] pointer-events-none z-10" />

          {/* Dedicated GPU compositor layer for buttery-smooth 60-120fps spin */}
          <div
            ref={wheelRef}
            className="w-full h-full will-change-transform"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)',
              contain: 'layout style paint'
            }}
          >
            <RouletteWheelSvg />
          </div>
        </div>

        {hasSpun ? (
          <div className="mt-3 p-4 rounded-2xl bg-[#181B14] border-2 border-[#CCFF00] text-center shadow-[0_0_25px_rgba(204,255,0,0.3)]">
            <div className="inline-block bg-[#CCFF00] text-black text-[11px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider mb-2">
              🎉 DESCONTO DESBLOQUEADO!
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-1.5">
              VOCÊ GANHOU <span className="text-[#CCFF00]">85%</span> DE DESCONTO!
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mb-4">
              Seu desconto de <strong className="text-white">85%</strong> foi aplicado com sucesso para o seu acesso.
            </p>
            <button
              type="button"
              onClick={handleContinue}
              className="w-full py-3.5 px-6 rounded-xl font-black text-sm sm:text-base uppercase tracking-wide bg-[#CCFF00] hover:bg-[#bbf000] text-black shadow-lg shadow-[#CCFF00]/30 transition-transform duration-150 active:scale-[0.98] cursor-pointer"
            >
              CONTINUAR →
            </button>
          </div>
        ) : (
          <div className="mt-3">
            <button
              type="button"
              onClick={handleSpin}
              disabled={isSpinning}
              className={`w-full py-3.5 sm:py-4 px-6 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider transition-transform duration-150 cursor-pointer shadow-xl ${
                isSpinning
                  ? 'bg-gray-700 text-gray-300 cursor-not-allowed opacity-85'
                  : 'bg-[#CCFF00] hover:bg-[#bbf000] text-black shadow-[#CCFF00]/30 active:scale-[0.98]'
              }`}
            >
              {isSpinning ? '🎰 GIRANDO A ROLETA...' : '🎰 TOQUE PARA GIRAR!'}
            </button>
            <p className="text-[11px] text-gray-400 mt-2 font-medium">
              {isSpinning ? '🎰 A sorte está girando...' : '👆 Toque na roleta ou no botão para girar'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});
