import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  TrendingUp,
  Clock,
  Sparkles,
  Globe,
  LockOpen
} from 'lucide-react';

const D = [
  'João', 'Maria', 'Carlos', 'Ana', 'Lucas', 'Sofia', 'Pedro', 'Laura',
  'Diego', 'Camila', 'Rodrigo', 'Valéria', 'Felipe', 'Beatriz',
  'Mateus', 'Rafael', 'Luciana', 'Fernanda', 'Gabriel', 'Daniela'
];

const Te = [
  'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre',
  'Salvador', 'Fortaleza', 'Brasília', 'Recife', 'Florianópolis',
  'Goiânia', 'Campinas', 'Manaus', 'Vitória', 'Belém'
];

import {
  ROULETTE_SLICES as Ee,
  polarToCartesian as De
} from './utils/roulette';

const E = [
  {
    question: 'Como eu recebo os vídeos?',
    answer: 'Imediatamente após a confirmação da compra, você recebe um e-mail com acesso instantâneo aos links organizados por pastas e nichos (Google Drive). O acesso é liberado na hora.'
  },
  {
    question: 'Os vídeos têm marca d\'água?',
    answer: 'Não. Todos os mais de 250.000 vídeos são 100% limpos, sem marcas d\'água, prontos para você postar.'
  },
  {
    question: 'Qual é o formato dos vídeos?',
    answer: 'Todos em formato MP4 de alta definição, no padrão vertical 9:16 (ideal para Reels do Instagram, TikTok e YouTube Shorts).'
  },
  {
    question: 'Posso usar os vídeos para meu negócio ou perfil próprio?',
    answer: 'Sim! Você pode usar em perfis pessoais, páginas de nicho sem rosto (faceless), marcas próprias ou para divulgar produtos como afiliado. Totalmente livre e sem restrições.'
  },
  {
    question: 'Posso usar os vídeos para contas de clientes ou agência?',
    answer: 'Sim, com certeza. Você tem licença comercial completa para criar conteúdo para seus próprios projetos, clientes ou para sua agência.'
  },
  {
    question: 'Possui garantia?',
    answer: 'Sim! Você tem garantia dupla de satisfação de 30 dias. Se não gostar por qualquer motivo, basta solicitar e devolvemos 100% do seu dinheiro sem perguntas.'
  },
  {
    question: 'Funciona no meu estado ou cidade?',
    answer: 'Sim! O produto é 100% digital. Você pode acessar de qualquer lugar do Brasil e do mundo, precisando apenas de internet para baixar.'
  }
];


const PROOF_PRINTS = [
  {
    src: '/assets/aistudio/15A09D17-3AE4-4038-9C55-9F5608BC69C8_ee0c95bc.jpg',
    alt: 'Resultado Jefferson Santos - R$ 10.842,61 com vídeos virais no YouTube Studio'
  },
  {
    src: '/assets/aistudio/67ABB4DC-AB78-4D1D-AD3A-0A0DBCA83205_b0b9e57a.png',
    alt: 'Resultado Poder Digital - € 5.892,85 com vídeos virais no YouTube Studio'
  },
  {
    src: '/assets/aistudio/509F30C9-6BA9-48DD-B8E8-AB8FB830A136_c1f64d86.png',
    alt: 'Resultado Mentalidade Alfa - US$ 3.421,17 com vídeos virais no YouTube Studio'
  },
  {
    src: '/assets/aistudio/6518C8B7-610F-4536-8EEA-63D0440DAAF7_0fb170f3.png',
    alt: 'Resultado Império Digital - R$ 8.764,32 com vídeos virais no YouTube Studio'
  },
  {
    src: '/assets/aistudio/C929D58F-F17A-4488-8B26-79CA80C5B0EC_03451255.png',
    alt: 'Resultado Trilha Livre - R$ 6.482,15 com vídeos virais no YouTube Studio'
  }
];

const ve = 'https://pay.kirvano.com/ddac7633-64ed-4903-8087-052abc044530';
const ye = 'https://pay.kirvano.com/ddac7633-64ed-4903-8087-052abc044530';

let activeOscillators: any[] = [];
let audioCtxInstance: AudioContext | null = null;

function de(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioCtxInstance) {
    audioCtxInstance = new AudioCtx();
  }
  if (audioCtxInstance.state === 'suspended') {
    audioCtxInstance.resume();
  }
  return audioCtxInstance;
}

function fe(e: AudioContext, t: number, n: boolean) {
  const s = e.createOscillator();
  const c = e.createGain();
  s.type = 'triangle';
  s.frequency.setValueAtTime(2400, t);
  s.frequency.exponentialRampToValueAtTime(600, t + 0.015);
  c.gain.setValueAtTime(n ? 0.2 : 0.12, t);
  c.gain.exponentialRampToValueAtTime(0.001, t + 0.018);
  s.connect(c);
  c.connect(e.destination);
  s.start(t);
  s.stop(t + 0.025);
}

function pe() {
  const e = de();
  if (!e) return;
  he();
  const t = e.currentTime + 0.02;
  [
    0, 0.04, 0.08, 0.12, 0.16, 0.2, 0.24, 0.28, 0.32, 0.37, 0.42, 0.47, 0.52,
    0.58, 0.64, 0.7, 0.77, 0.84, 0.91, 0.99, 1.07, 1.16, 1.25, 1.35, 1.46,
    1.58, 1.7, 1.83, 1.97, 2.12, 2.28, 2.45, 2.63, 2.82, 3.02, 3.24, 3.48,
    3.74, 4.02, 4.32, 4.64, 4.98, 5.3
  ].forEach(n => {
    const r = n >= 4;
    fe(e, t + n, r);
  });
}

function me() {
  const e = de();
  if (!e) return;
  he();
  const t = e.currentTime + 0.05;
  const n = e.createOscillator();
  const r = e.createGain();
  n.type = 'sine';
  n.frequency.setValueAtTime(160, t);
  n.frequency.exponentialRampToValueAtTime(45, t + 0.25);
  r.gain.setValueAtTime(0.5, t);
  r.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
  n.connect(r);
  r.connect(e.destination);
  n.start(t);
  n.stop(t + 0.35);

  [
    { freq: 523.25, time: 0, dur: 0.16 },
    { freq: 659.25, time: 0.14, dur: 0.16 },
    { freq: 783.99, time: 0.28, dur: 0.18 },
    { freq: 1046.5, time: 0.44, dur: 0.22 },
    { freq: 1318.5, time: 0.62, dur: 0.26 },
    { freq: 1567.98, time: 0.82, dur: 0.85 }
  ].forEach(({ freq: n, time: r, dur: i }) => {
    const a = t + r;
    const o = e.createOscillator();
    const s = e.createOscillator();
    const c = e.createBiquadFilter();
    const l = e.createGain();
    o.type = 'sawtooth';
    s.type = 'triangle';
    o.frequency.setValueAtTime(n, a);
    s.frequency.setValueAtTime(n * 1.004, a);
    c.type = 'lowpass';
    c.frequency.setValueAtTime(2600, a);
    c.frequency.exponentialRampToValueAtTime(1400, a + i);
    l.gain.setValueAtTime(0.24, a);
    l.gain.exponentialRampToValueAtTime(0.001, a + i);
    o.connect(c);
    s.connect(c);
    c.connect(l);
    l.connect(e.destination);
    o.start(a);
    s.start(a);
    o.stop(a + i + 0.05);
    s.stop(a + i + 0.05);
  });

  [523.25, 659.25, 783.99, 1046.5].forEach(n => {
    const r = t + 0.85;
    const i = 1.6;
    const a = e.createOscillator();
    const o = e.createGain();
    const s = e.createBiquadFilter();
    a.type = 'sawtooth';
    a.frequency.setValueAtTime(n, r);
    s.type = 'lowpass';
    s.frequency.setValueAtTime(2800, r);
    s.frequency.exponentialRampToValueAtTime(800, r + i);
    o.gain.setValueAtTime(0.12, r);
    o.gain.exponentialRampToValueAtTime(0.001, r + i);
    a.connect(s);
    s.connect(o);
    o.connect(e.destination);
    a.start(r);
    a.stop(r + i + 0.05);
  });

  [
    { freq: 1318.51, delay: 0.95 },
    { freq: 1567.98, delay: 1.1 },
    { freq: 2093, delay: 1.25 },
    { freq: 2637.02, delay: 1.4 },
    { freq: 2093, delay: 1.55 },
    { freq: 2637.02, delay: 1.7 },
    { freq: 3135.96, delay: 1.85 }
  ].forEach(({ freq: n, delay: r }) => {
    const i = t + r;
    const a = e.createOscillator();
    const o = e.createGain();
    a.type = 'sine';
    a.frequency.setValueAtTime(n, i);
    o.gain.setValueAtTime(0.22, i);
    o.gain.exponentialRampToValueAtTime(0.001, i + 0.35);
    a.connect(o);
    o.connect(e.destination);
    a.start(i);
    a.stop(i + 0.4);
  });
}

function he() {
  activeOscillators.forEach(e => {
    try {
      e.stop();
    } catch {}
  });
  activeOscillators = [];
}

const le = {
  reset: () => {
    try {
      confetti.reset();
    } catch {}
  }
};

function _e() {
  if (typeof window !== 'undefined') {
    confetti({
      particleCount: 45,
      spread: 65,
      origin: { y: 0.62 },
      zIndex: 99999999,
      ticks: 80,
      gravity: 1.4,
      scalar: 0.9,
      colors: ['#CCFF00', '#FFD700', '#FFFFFF', '#00FFFF']
    });
    setTimeout(() => {
      try {
        confetti.reset();
      } catch {}
    }, 1000);
  }
}


const META_PIXEL_ID = '1428966156115611';
const META_CAPI_TOKEN = 'EAAXhiY72ZBSoBS26By4bknM8AaKZCJGTz2HSJzdkwLifCnki6FIuthC0UR8WpthHWYR95pr4ZAN2E8RY9RhhbZCGG79gr8B93sZBy38SqI6MfxUcS8My90eam59JfAtu53xHOJyP1O32TkQCI6BQg2kjAplZAL0MWxY1k1oHDhjdJpmWBvYqxv01KgjLjG2QZDZD';

function sendCapiEvent(eventName: string, data?: any) {
  if (typeof window === 'undefined') return;
  try {
    const url = `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`;
    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: window.location.href,
          custom_data: data || {}
        }
      ]
    };
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});
  } catch (e) {}
}

function we(eventName: string, data?: any) {
  if (typeof window !== 'undefined') {
    if ((window as any).fbq) {
      try {
        (window as any).fbq('track', eventName, data);
      } catch {}
    }
    sendCapiEvent(eventName, data);
  }
}

const oe = TrendingUp;
const re = Clock;
const ae = Sparkles;
const C = Globe;
const ie = LockOpen;

// Helper to render JSX elements
function _jsx(type: any, props: any, key?: any) {
  if (!props) return React.createElement(type, key !== undefined ? { key } : null);
  const { children, ...rest } = props;
  const p = key !== undefined ? { ...rest, key } : rest;
  if (children !== undefined) {
    if (Array.isArray(children)) {
      return React.createElement(type, p, ...children);
    }
    return React.createElement(type, p, children);
  }
  return React.createElement(type, p);
}

function _jsxs(type: any, props: any, key?: any) {
  if (!props) return React.createElement(type, key !== undefined ? { key } : null);
  const { children, ...rest } = props;
  const p = key !== undefined ? { ...rest, key } : rest;
  if (children !== undefined) {
    if (Array.isArray(children)) {
      return React.createElement(type, p, ...children);
    }
    return React.createElement(type, p, children);
  }
  return React.createElement(type, p);
}

const _Fragment = React.Fragment;


const VslPlayer = React.memo(function VslPlayer() {
  const [started, setStarted] = useState<boolean>(false);
  const [srcUrl, setSrcUrl] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const startVideo = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      try {
        e.stopPropagation();
      } catch (err) {}
    }

    if (started) return;

    // Direct iOS Safari friendly embedded URL with explicit playsinline, autoplay, unmuted and restart from 0
    const targetUrl = 'https://www.youtube.com/embed/Pm7LPpta5lk?autoplay=1&mute=0&controls=1&playsinline=1&webkit-playsinline=1&rel=0&modestbranding=1&enablejsapi=1&start=0';

    setSrcUrl(targetUrl);
    setStarted(true);

    // Warm iOS audio engine on this direct user touch gesture
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const tempCtx = new AudioCtx();
        if (tempCtx.state === 'suspended') {
          tempCtx.resume();
        }
      }
    } catch (err) {}
  };

  return (
    <div
      className="aspect-[9/16] w-full rounded-2xl overflow-hidden border-2 border-[#CCFF00]/60 shadow-[0_0_50px_rgba(204,255,0,0.35)] bg-black relative"
      style={{ WebkitTransform: 'translate3d(0,0,0)', transform: 'translate3d(0,0,0)' }}
    >
      {started && (
        <iframe
          ref={iframeRef}
          src={srcUrl}
          title="Viral Pack Pro VSL"
          className="absolute inset-0 w-full h-full border-0 pointer-events-auto rounded-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}

      {!started && (
        <div
          onClick={startVideo}
          onTouchEnd={startVideo}
          role="button"
          tabIndex={0}
          aria-label="Assistir ao vídeo agora"
          className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-gradient-to-b from-black/85 via-black/75 to-black/95 cursor-pointer group transition-all p-4 text-center select-none"
        >
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#CCFF00]/30 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 bg-[#CCFF00] hover:bg-[#bbf000] text-black font-black w-20 h-20 rounded-full shadow-[0_0_40px_rgba(204,255,0,0.8)] flex items-center justify-center animate-bounce transition-transform group-hover:scale-110 mb-4 pointer-events-none">
            <span className="text-3xl ml-1">▶</span>
          </div>
          <div className="relative z-10 bg-[#121318]/95 border border-[#CCFF00]/60 px-5 py-3 rounded-2xl shadow-xl pointer-events-none">
            <div className="text-[#CCFF00] font-black text-xs uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
              <span>🔊</span> Ativar Som
            </div>
            <p className="text-white text-xs sm:text-sm font-bold leading-snug">
              Toque para assistir ao vídeo imediatamente do início
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

export default function App() {
const [showRoulette, setShowRoulette] = useState<boolean>(true);
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [hasSpun, setHasSpun] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [dateStr, setDateStr] = useState<string>('');
  const [showCombo, setShowCombo] = useState<boolean>(false);
  const [showImgModal, setShowImgModal] = useState<boolean>(false);
  const [modalImg, setModalImg] = useState<string>('/assets/aistudio/e32ba904-ace3-4d70-be3f-c751679cab55_a7f0ecdf.png');
  const openModalWithImg = (src: string) => { setModalImg(src); setShowImgModal(true); };
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastData, setToastData] = useState<{ name: string; location: string; timeAgo: number }>({
    name: 'Andrés',
    location: 'Chile',
    timeAgo: 12
  });
  const [viewerCount, setViewerCount] = useState<number>(74);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const videoRef = useRef<any>(null);

  // Aliases for matching internal names in JSX
  const e = showRoulette;
  const t = setShowRoulette;
  const n = showQuestion;
  const r = setShowQuestion;
  const i = isSpinning;
  const a = setIsSpinning;
  const o = hasSpun;
  const s = setHasSpun;
  const c = rotation;
  const l = setRotation;
  const u = openFaq;
  const d = setOpenFaq;
  const f = dateStr;
  const p = setDateStr;
  const m = showCombo;
  const h = setShowCombo;
  const g = showImgModal;
  const _ = setShowImgModal;
  const v = showToast;
  const y = setShowToast;
  const b = toastData;
  const ee = setToastData;
  const te = viewerCount;
  const ne = setViewerCount;
  const S = videoPlaying;
  const se = setVideoPlaying;
  const ce = videoRef;
  const ue = () => {
    se(true);
    if (ce.current && ce.current.contentWindow) {
      try {
        ce.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*');
        ce.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
      } catch (e) {}
    }
  };
useEffect(()=>{we(`PageView`);let e=new Date().toLocaleDateString(`pt-BR`,{day:`numeric`,month:`long`,year:`numeric`});p(e)},[]),useEffect(()=>{let e=setInterval(()=>{ne(e=>{let t=e+(Math.floor(Math.random()*5)-2);return t<64?66+Math.floor(Math.random()*4):t>96?92-Math.floor(Math.random()*4):t})},3800);return()=>clearInterval(e)},[]),useEffect(()=>{let toastTimer: any, nextToastTimer: any; const showNextToast = () => { const r = D[Math.floor(Math.random()*D.length)],i=Te[Math.floor(Math.random()*Te.length)],a=Math.floor(Math.random()*59)+1;ee({name:r,location:i,timeAgo:a}),y(!0),toastTimer = setTimeout(() => { y(false); }, 6000); const o = Math.floor(Math.random() * 20001) + 15000; nextToastTimer = setTimeout(showNextToast, o); }; const initialTimer = setTimeout(() => { showNextToast(); }, 3000); return () => { clearTimeout(initialTimer); clearTimeout(toastTimer); clearTimeout(nextToastTimer); }; }, []),useEffect(() => {
    // Highly optimized video playback using IntersectionObserver (prevents CPU/GPU thrashing)
    const videos = document.querySelectorAll("video");
    videos.forEach((vid) => {
      vid.muted = true;
      vid.defaultMuted = true;
      vid.playsInline = true;
      vid.setAttribute("muted", "");
      vid.setAttribute("playsinline", "");
      vid.setAttribute("webkit-playsinline", "true");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.muted = true;
            if (video.paused) {
              const p = video.play();
              if (p !== undefined) p.catch(() => {});
            }
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    videos.forEach((vid) => observer.observe(vid));

    return () => {
      observer.disconnect();
    };
  }, []),useEffect(()=>(m||g||e||n?document.body.style.overflow=`hidden`:document.body.style.overflow=``,()=>{document.body.style.overflow=``}),[m,g,e,n]);let w=()=>{if(i||o)return;a(!0),pe();let e=3060+(Math.floor(Math.random()*5)-2);l(e),setTimeout(()=>{a(!1),s(!0),me(),_e(),we(`ViewContent`,{content_name:`Viral Pack Pro - Roleta 85% Desconto Ganho`,value:5.9,currency:`USD`})},5600)};useEffect(()=>{const handleKeyDown = (ev: KeyboardEvent) => { if (ev.key === "Escape") { h(false); _(false); } };return window.addEventListener("keydown", handleKeyDown), () => window.removeEventListener("keydown", handleKeyDown)},[]);const de = (idx: number) => { d(prev => prev === idx ? null : idx); },fe=(e: any)=>{we(`ViewContent`,{content_name:`Viral Pack Pro - Ver Oferta`,value:5.9,currency:`USD`});let t=document.getElementById(`checkout`);t&&(e.preventDefault(),t.scrollIntoView({behavior:`smooth`}))},ge=(e: any)=>{e.preventDefault(),we(`InitiateCheckout`,{content_name:`Viral Pack Pro - Oferta Checkout`,value:19,currency:`BRL`}),window.open(ye, '_blank')};return _jsxs(_Fragment,{children:[e&&_jsx(`div`,{className:`fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-4 bg-black/95 animate-fadeIn overflow-y-auto`,children:_jsxs(`div`,{className:`relative w-full max-w-sm sm:max-w-md bg-[#121318] border-2 border-[#CCFF00]/50 rounded-3xl p-5 sm:p-6 shadow-[0_0_60px_rgba(204,255,0,0.25)] text-white text-center my-auto`,children:[_jsx(`div`,{className:`inline-block bg-[#CCFF00]/15 border border-[#CCFF00]/40 text-[#CCFF00] text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider mb-2`,children:`🎰 ROLETA DE DESCONTO`}),_jsx(`h2`,{className:`text-xl sm:text-2xl font-heading font-black text-white leading-tight mb-1`,children:`Garanta seu desconto, boa sorte!`}),_jsx(`p`,{className:`text-xs sm:text-sm text-gray-300 font-medium mb-3`,children:`Gire a roleta e descubra sua porcentagem de desconto exclusiva:`}),_jsxs(`div`,{onClick:w,role:`button`,tabIndex:0,onKeyDown:(e: any)=>{(e.key===`Enter`||e.key===` `)&&w()},className:`relative w-64 h-64 sm:w-72 sm:h-72 mx-auto my-2 flex items-center justify-center select-none group transition-transform ${!i&&!o?`cursor-pointer hover:scale-[1.02]`:``}`,title:`Toque para girar a roleta`,children:[_jsx(`div`,{className:`absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-[0_4px_10px_rgba(204,255,0,0.8)] transition-transform ${i?`animate-bounce`:``}`,children:_jsx(`div`,{className:`w-0 h-0 border-l-[13px] border-l-transparent border-r-[13px] border-r-transparent border-t-[26px] border-t-[#CCFF00] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`})}),_jsx(`div`,{className:`absolute inset-0 rounded-full border-4 border-[#262A36] shadow-[0_0_30px_rgba(204,255,0,0.15)] pointer-events-none z-10 group-hover:border-[#CCFF00]/60 transition-colors`}),_jsxs(`svg`,{viewBox:`0 0 300 300`,className:`w-full h-full transform-gpu`,style:{transform:`rotate(${c}deg)`,transition:i?`transform 5.5s cubic-bezier(0.06, 0.88, 0.12, 1)`:`none`},children:[_jsx(`circle`,{cx:`150`,cy:`150`,r:`148`,fill:`#181A22`,stroke:`#CCFF00`,strokeWidth:`3`}),_jsx(`circle`,{cx:`150`,cy:`150`,r:`142`,fill:`none`,stroke:`#FFFFFF`,strokeWidth:`3`,strokeDasharray:`4 16`,opacity:`0.6`}),Ee.map((e,t)=>{let n=t*45-22.5,r=t*45+22.5,i=De(150,150,135,n),a=De(150,150,135,r),o=`M 150 150 L ${i.x.toFixed(2)} ${i.y.toFixed(2)} A 135 135 0 0 1 ${a.x.toFixed(2)} ${a.y.toFixed(2)} Z`,s=t*45;return _jsxs(`g`,{children:[_jsx(`path`,{d:o,fill:e.bg,stroke:`#181A22`,strokeWidth:`2`}),_jsx(`text`,{x:`150`,y:`52`,transform:`rotate(${s}, 150, 150)`,textAnchor:`middle`,dominantBaseline:`central`,fill:e.color,fontSize:e.isWinner?`18`:`15`,fontWeight:`900`,fontFamily:`Montserrat, sans-serif`,letterSpacing:`0.5px`,children:e.label})]},t)}),_jsx(`circle`,{cx:`150`,cy:`150`,r:`28`,fill:`#121318`,stroke:`#CCFF00`,strokeWidth:`3`}),_jsx(`circle`,{cx:`150`,cy:`150`,r:`18`,fill:`#CCFF00`}),_jsx(`text`,{x:`150`,y:`151`,textAnchor:`middle`,dominantBaseline:`central`,fill:`#000000`,fontSize:`8`,fontWeight:`900`,fontFamily:`Montserrat, sans-serif`,letterSpacing:`0.5px`,children:`GIRAR`})]})]}),o?_jsxs(`div`,{className:`mt-3 p-4 rounded-2xl bg-[#181B14] border-2 border-[#CCFF00] text-center shadow-[0_0_35px_rgba(204,255,0,0.35)] animate-fadeIn`,children:[_jsx(`div`,{className:`inline-block bg-[#CCFF00] text-black text-[11px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider mb-2`,children:`🎉 DESCONTO DESBLOQUEADO!`}),_jsxs(`h3`,{className:`text-xl sm:text-2xl font-black text-white leading-tight mb-1.5`,children:[`VOCÊ GANHOU `,_jsx(`span`,{className:`text-[#CCFF00]`,children:`85%`}),` DE DESCONTO!`]}),_jsxs(`p`,{className:`text-xs sm:text-sm text-gray-300 mb-4`,children:[`Seu desconto de `,_jsx(`strong`,{className:`text-white`,children:`85%`}),` foi aplicado com sucesso para o seu acesso.`]}),_jsx(`button`,{type:`button`,onClick:()=>{try{le.reset()}catch{}he(),t(!1),r(!0)},className:`w-full py-3.5 px-6 rounded-xl font-black text-sm sm:text-base uppercase tracking-wide bg-[#CCFF00] hover:bg-[#bbf000] text-black shadow-lg shadow-[#CCFF00]/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer`,children:`CONTINUAR →`})]}):_jsxs(`div`,{className:`mt-3`,children:[_jsx(`button`,{type:`button`,onClick:w,disabled:i,className:`w-full py-3.5 sm:py-4 px-6 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xl ${i?`bg-gray-700 text-gray-300 cursor-not-allowed opacity-80`:`bg-[#CCFF00] hover:bg-[#bbf000] text-black shadow-[#CCFF00]/30 hover:scale-[1.02] active:scale-[0.98] animate-pulse`}`,children:i?`🎰 GIRANDO A ROLETA...`:`🎰 TOQUE PARA GIRAR!`}),_jsx(`p`,{className:`text-[11px] text-gray-400 mt-2 font-medium`,children:i?`🎰 A sorte está girando...`:`👆 Toque na roleta ou no botão para girar`})]})]})}),n&&_jsx(`div`,{className:`fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/95 animate-fadeIn`,children:_jsxs(`div`,{className:`relative w-full max-w-md bg-[#121318] border border-[#CCFF00]/40 rounded-2xl p-5 sm:p-6 shadow-[0_0_40px_rgba(204,255,0,0.2)] text-white text-center`,children:[_jsx(`div`,{className:`inline-block bg-[#CCFF00]/15 border border-[#CCFF00]/40 text-[#CCFF00] text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider mb-3`,children:`⚡ PERGUNTA RÁPIDA`}),_jsxs(`h2`,{className:`text-sm sm:text-base font-body font-medium text-gray-200 leading-relaxed mb-5 max-w-sm mx-auto`,children:[`De acordo com a sua realidade, `,_jsx(`span`,{className:`text-amber-300 font-bold`,children:`qual você prefere agora?`})]}),_jsxs(`div`,{className:`space-y-3 mb-4`,children:[_jsxs(`button`,{type:`button`,onClick:()=>r(!1),className:`w-full text-left p-3.5 sm:p-4 rounded-xl bg-[#1A1C24] hover:bg-[#252833] border border-[#CCFF00]/40 hover:border-[#CCFF00] text-white font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-between group cursor-pointer shadow-sm`,children:[_jsx(`span`,{children:`🚀 Quero ter resultados 5 vezes mais rápido`}),_jsx(`span`,{className:`text-[#CCFF00] text-base font-black group-hover:translate-x-1 transition-transform`,children:`→`})]}),_jsxs(`button`,{type:`button`,onClick:()=>r(!1),className:`w-full text-left p-3.5 sm:p-4 rounded-xl bg-[#1A1C24] hover:bg-[#252833] border border-white/10 hover:border-white/30 text-gray-300 font-normal text-xs sm:text-sm transition-all duration-200 flex items-center justify-between group cursor-pointer`,children:[_jsx(`span`,{children:`💡 Quero pagar menos e ter resultados normais`}),_jsx(`span`,{className:`text-gray-400 text-base font-black group-hover:translate-x-1 transition-transform`,children:`→`})]})]}),_jsx(`p`,{className:`text-[11px] text-gray-400 font-medium`,children:`Selecione uma opção para continuar.`})]})}),_jsx(`section`,{className:`hero`,children:_jsxs(`div`,{className:`container fade-in`,children:[_jsx(`div`,{className:`pre-headline`,children:`🔥 +250.000 VÍDEOS VIRAIS — PRONTOS PARA POSTAR`}),_jsx(`div`,{className:`flex justify-center -mt-1 mb-7`,children:_jsxs(`div`,{className:`inline-flex items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-red-950/75 border border-red-500/60 shadow-[0_0_25px_rgba(239,68,68,0.35)] text-red-400 text-xs sm:text-sm font-semibold tracking-wide`,children:[_jsxs(`span`,{className:`relative flex h-2.5 w-2.5 shrink-0`,children:[_jsx(`span`,{className:`animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75`}),_jsx(`span`,{className:`relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500`})]}),_jsxs(`span`,{children:[_jsxs(`strong`,{className:`text-red-200 font-black`,children:[te,` pessoas`]}),` estão nesta página e adquirindo o pack agora mesmo`]})]})}),_jsxs(`h1`,{className:`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.18] max-w-5xl mx-auto mb-3 sm:mb-4`,children:[`Você sabia que pode ganhar de`,` `,_jsx(`span`,{className:`inline-block bg-amber-400/15 border border-amber-400/50 text-amber-300 px-2 py-0.5 rounded-lg animate-pulse font-extrabold shadow-[0_0_20px_rgba(251,191,36,0.3)]`,children:`R$ 5.000`}),` `,`a`,` `,_jsx(`span`,{className:`inline-block bg-amber-400/15 border border-amber-400/50 text-amber-300 px-2 py-0.5 rounded-lg animate-pulse font-extrabold shadow-[0_0_20px_rgba(251,191,36,0.3)]`,children:`R$ 30.000`}),` `,`reais por mês simplesmente postando vídeos na internet,`,` `,_jsx(`span`,{className:`bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent underline decoration-amber-400/50 underline-offset-8`,children:`sem mostrar o seu rosto`}),`?`]}),_jsx(`p`,{className:`text-base sm:text-lg md:text-xl font-bold text-amber-300 tracking-wide mb-6`,children:`Assista como eu e mais de 100 mil pessoas estamos vivendo da internet sem aparecer`}),_jsx(`div`,{className:`max-w-[300px] sm:max-w-[340px] mx-auto mb-6 relative`,children:_jsx(VslPlayer,{})}),_jsxs(`div`,{className:`my-6 text-center max-w-md mx-auto px-4`,children:[_jsx(`a`,{href:`#checkout`,onClick:fe,className:`btn btn-green btn-pulse-green cursor-pointer uppercase tracking-wider text-base sm:text-lg py-4 px-6 rounded-full shadow-[0_0_40px_rgba(0,255,68,0.7)] font-black block w-full`,children:`QUERO MEU PACK AGORA`})]}),_jsx(`div`,{className:`mockup mockup-carousel`,children:_jsxs(`div`,{className:`carousel-track`,children:[_jsx(`video`,{src:`/videos/preview1.mp4`,poster:`/videos/poster1.jpg`,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:`auto`,disablePictureInPicture:!0}),_jsx(`video`,{src:`/videos/preview2.mp4`,poster:`/videos/poster2.jpg`,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:`auto`,disablePictureInPicture:!0}),_jsx(`video`,{src:`/videos/preview3.mp4`,poster:`/videos/poster3.jpg`,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:`auto`,disablePictureInPicture:!0}),_jsx(`video`,{src:`/videos/preview4.mp4`,poster:`/videos/poster4.jpg`,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:`auto`,disablePictureInPicture:!0}),_jsx(`video`,{src:`/videos/preview1.mp4`,poster:`/videos/poster1.jpg`,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:`auto`,disablePictureInPicture:!0}),_jsx(`video`,{src:`/videos/preview2.mp4`,poster:`/videos/poster2.jpg`,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:`auto`,disablePictureInPicture:!0}),_jsx(`video`,{src:`/videos/preview3.mp4`,poster:`/videos/poster3.jpg`,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:`auto`,disablePictureInPicture:!0}),_jsx(`video`,{src:`/videos/preview4.mp4`,poster:`/videos/poster4.jpg`,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:`auto`,disablePictureInPicture:!0})]})}),_jsx(`div`,{className:`text-center mt-8 mb-4`,children:_jsx(`h3`,{className:`text-xl sm:text-2xl md:text-3xl font-black text-amber-300 tracking-tight`,children:`Mais de 50 nichos organizados para começar a ganhar dinheiro ainda esta semana`})})]})}),_jsx(`section`,{className:`bg-alt relative py-16 sm:py-20 overflow-hidden border-b border-white/5`,children:_jsx(`div`,{className:`container fade-in`,children:_jsxs(`div`,{className:`max-w-4xl mx-auto flex flex-col justify-center`,children:[_jsx(`span`,{className:`inline-block text-amber-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-2`,children:`É assim de simples que funciona`}),_jsxs(`h2`,{className:`text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-4`,children:[`Como você vai`,` `,_jsx(`span`,{className:`bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent`,children:`ganhar dinheiro de verdade`}),` `,`apenas postando esses vídeos`]}),_jsxs(`p`,{className:`text-gray-300 text-sm sm:text-base leading-relaxed mb-4`,children:[`Redes como `,_jsx(`strong`,{className:`text-white`,children:`TikTok, Instagram e YouTube`}),` pagam por retenção. Você posta esses vídeos prontos com ganchos virais e o algoritmo entrega `,_jsx(`strong`,{className:`text-amber-300`,children:`de graça para milhares de pessoas`}),`.`]}),_jsxs(`div`,{className:`space-y-2.5 mb-5 text-xs sm:text-sm text-gray-200`,children:[_jsxs(`div`,{className:`flex items-start gap-2.5 bg-white/[0.03] border border-white/5 rounded-xl p-3`,children:[_jsx(`span`,{className:`text-lg leading-none mt-0.5`,children:`💰`}),_jsxs(`p`,{className:`m-0 leading-snug`,children:[_jsx(`strong`,{className:`text-white`,children:`Fundos de Criadores:`}),` Pagamentos mensais em dólares do TikTok e YouTube apenas pelas visualizações dos seus vídeos.`]})]}),_jsxs(`div`,{className:`flex items-start gap-2.5 bg-white/[0.03] border border-white/5 rounded-xl p-3`,children:[_jsx(`span`,{className:`text-lg leading-none mt-0.5`,children:`🔗`}),_jsxs(`p`,{className:`m-0 leading-snug`,children:[_jsx(`strong`,{className:`text-white`,children:`Vendas como Afiliado:`}),` Você coloca um link na sua biografia (Hotmart, Kiwify, Amazon) e ganha comissões automáticas.`]})]}),_jsxs(`div`,{className:`flex items-start gap-2.5 bg-white/[0.03] border border-white/5 rounded-xl p-3`,children:[_jsx(`span`,{className:`text-lg leading-none mt-0.5`,children:`🎯`}),_jsxs(`p`,{className:`m-0 leading-snug`,children:[_jsx(`strong`,{className:`text-white`,children:`100% Pelo Seu Celular:`}),` Sem mostrar o seu rosto, sem gravar nada e sem precisar de experiência prévia.`]})]})]}),_jsx(`div`,{className:`mt-8 mb-4 text-left`,children:_jsxs(`p`,{className:`text-xl sm:text-2xl lg:text-3xl font-heading font-black text-white tracking-tight leading-snug`,children:[`A maior prova de que isso é real:`,` `,_jsx(`span`,{className:`text-emerald-400 drop-shadow-[0_0_25px_rgba(52,211,153,0.35)]`,children:`a maior inteligência artificial do mundo não mente!`})]})}),_jsxs(`div`,{className:`rounded-2xl bg-[#14151B] border border-white/10 shadow-2xl overflow-hidden`,children:[_jsxs(`div`,{className:`bg-[#1C1E26] px-4 py-3 border-b border-white/10 flex items-center justify-between`,children:[_jsxs(`div`,{className:`flex items-center gap-2.5`,children:[_jsx(`div`,{className:`w-7 h-7 rounded-full bg-[#10A37F] flex items-center justify-center text-white p-1`,children:_jsx(`svg`,{className:`w-full h-full fill-white`,viewBox:`0 0 24 24`,children:_jsx(`path`,{d:`M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6669zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813v6.7227zm1.1458-1.9776l2.5534-1.4727 2.5534 1.4727v2.9454l-2.5534 1.4727-2.5534-1.4727z`})})}),_jsx(`span`,{className:`font-bold text-white text-sm`,children:`ChatGPT`}),_jsx(`span`,{className:`text-[11px] font-semibold px-2 py-0.5 rounded bg-white/10 text-gray-300`,children:`GPT-4o`})]}),_jsxs(`div`,{className:`flex items-center gap-2 text-xs text-emerald-400 font-medium`,children:[_jsx(`span`,{className:`w-2 h-2 rounded-full bg-emerald-400 animate-pulse`}),`Verificado`]})]}),_jsxs(`div`,{className:`p-6 sm:p-7 space-y-6`,children:[_jsxs(`div`,{className:`flex items-start gap-3.5`,children:[_jsx(`div`,{className:`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white shrink-0`,children:`Você`}),_jsx(`div`,{className:`bg-[#262833] rounded-2xl rounded-tl-sm px-4 py-3 text-white text-sm sm:text-base font-medium leading-relaxed max-w-2xl`,children:`É realmente possível ganhar dinheiro em casa apenas postando vídeos virais sem mostrar o rosto em redes como TikTok e Instagram?`})]}),_jsxs(`div`,{className:`flex items-start gap-3.5`,children:[_jsx(`div`,{className:`w-8 h-8 rounded-full bg-[#10A37F] flex items-center justify-center shrink-0 p-1.5 shadow-md shadow-[#10A37F]/20`,children:_jsx(`svg`,{className:`w-full h-full fill-white`,viewBox:`0 0 24 24`,children:_jsx(`path`,{d:`M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6669zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813v6.7227zm1.1458-1.9776l2.5534-1.4727 2.5534 1.4727v2.9454l-2.5534 1.4727-2.5534-1.4727z`})})}),_jsxs(`div`,{className:`bg-[#1F212C] border border-white/5 rounded-2xl rounded-tl-sm p-4 text-gray-200 text-xs sm:text-sm leading-relaxed space-y-2`,children:[_jsxs(`p`,{className:`font-semibold text-white`,children:[`✅ `,_jsx(`strong`,{className:`text-emerald-400`,children:`Sim, é 100% real e comprovado.`}),` As contas temáticas sem rosto (`,_jsx(`em`,{className:`text-amber-300`,children:`faceless`}),`) são um dos modelos de negócio mais lucrativos na internet hoje.`]}),_jsxs(`div`,{className:`space-y-1.5 pl-1 text-gray-300`,children:[_jsxs(`p`,{children:[`• `,_jsx(`strong`,{className:`text-white`,children:`O algoritmo só mede retenção:`}),` Entrega vídeos virais de graça para milhares de pessoas, não importa quem você seja.`]}),_jsxs(`p`,{children:[`• `,_jsx(`strong`,{className:`text-white`,children:`Pagamentos diretos em dólares:`}),` Você recebe por visualizações no TikTok/YouTube e comissões automáticas de afiliados.`]}),_jsxs(`p`,{children:[`• `,_jsx(`strong`,{className:`text-white`,children:`100% anônimo:`}),` Tudo pelo celular, sem precisar aparecer e sem ter que gravar nada.`]})]})]})]})]})]})]})})}),_jsx(`section`,{className:`bg-alt`,children:_jsxs(`div`,{className:`container fade-in`,children:[_jsxs(`h2`,{className:`text-center text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto mb-10`,children:[`🔥 Mais de`,` `,_jsx(`span`,{className:`bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent`,children:`100.000 pessoas`}),` `,`já estão ganhando dinheiro na internet graças aos vídeos virais. Veja abaixo! ⬇️`]}),_jsxs(`div`,{children:[_jsx(`div`,{className:`review-carousel`,children:_jsx(`div`,{className:`review-track`,children:[...PROOF_PRINTS, ...PROOF_PRINTS].map((item, idx)=>_jsxs(`div`,{key:idx,className:`relative shrink-0 group cursor-pointer`,onClick:()=>openModalWithImg(item.src),title:`Clique para ampliar print`,children:[_jsx(`img`,{src:item.src,alt:item.alt,className:`review-img select-none`,loading:`lazy`,decoding:`async`}),_jsxs(`div`,{className:`absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/85 backdrop-blur-sm border border-[#00FF44]/50 text-[#00FF44] text-xs font-bold px-2.5 py-1 rounded-full pointer-events-none flex items-center gap-1.5 shadow-lg`,children:[_jsx(`span`,{children:`🔍`}),`Clique para ampliar`]})]}))})}),_jsx(`p`,{className:`text-center text-xs sm:text-sm text-gray-400 mt-3 font-medium`,children:`👆 Toque em qualquer print para ampliar e ver o resultado detalhado`})]})]})}),_jsx(`section`,{children:_jsxs(`div`,{className:`container fade-in`,children:[_jsx(`h2`,{className:`text-center`,children:`Veja a qualidade dos vídeos`}),_jsxs(`div`,{className:`grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6`,children:[_jsx(`div`,{className:`preview-card !min-h-0`,children:_jsx(`video`,{autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:`metadata`,disablePictureInPicture:!0,poster:`/videos/poster1.jpg`,src:`/videos/preview1.mp4`})}),_jsx(`div`,{className:`preview-card !min-h-0`,children:_jsx(`video`,{autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:`metadata`,disablePictureInPicture:!0,poster:`/videos/poster2.jpg`,src:`/videos/preview2.mp4`})}),_jsx(`div`,{className:`preview-card !min-h-0`,children:_jsx(`video`,{autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:`metadata`,disablePictureInPicture:!0,poster:`/videos/poster3.jpg`,src:`/videos/preview3.mp4`})}),_jsx(`div`,{className:`preview-card !min-h-0`,children:_jsx(`video`,{autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:`metadata`,disablePictureInPicture:!0,poster:`/videos/poster4.jpg`,src:`/videos/preview4.mp4`})}),_jsx(`div`,{className:`preview-card !min-h-0`,children:_jsx(`video`,{autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:`metadata`,disablePictureInPicture:!0,poster:`/videos/poster5.jpg`,src:`/videos/preview5.mp4`})}),_jsx(`div`,{className:`preview-card !min-h-0`,children:_jsx(`video`,{autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:`metadata`,disablePictureInPicture:!0,poster:`/videos/poster6.jpg`,src:`/videos/preview6.mp4`})})]}),_jsx(`div`,{className:`text-center`,style:{marginTop:`40px`},children:_jsx(`a`,{href:`#checkout`,onClick:fe,className:`btn btn-green`,children:`ACESSAR AGORA O PACK`})})]})}),_jsx(`section`,{className:`bg-black relative py-6 sm:py-8 border-y border-white/10`,children:_jsx(`div`,{className:`container fade-in relative z-10`,children:_jsx(`div`,{className:`max-w-2xl mx-auto px-4`,children:_jsxs(`blockquote`,{className:`m-0 p-0`,children:[_jsx(`p`,{className:`text-lg sm:text-xl md:text-2xl font-bold text-white text-center leading-snug sm:leading-normal m-0 tracking-tight`,children:`“Se você não encontrar uma forma de ganhar dinheiro enquanto dorme, trabalhará até o dia em que morrer.”`}),_jsx(`div`,{className:`flex justify-end items-center mt-2 pr-1 sm:pr-2`,children:_jsx(`cite`,{className:`not-italic text-sm sm:text-base font-semibold text-white/90 italic tracking-wide`,children:`— Warren Buffett`})})]})})})}),_jsx(`section`,{children:_jsxs(`div`,{className:`container fade-in`,children:[_jsx(`h2`,{className:`text-center`,children:`+50 nichos organizados por pastas`}),_jsxs(`div`,{className:`niche-grid`,children:[_jsxs(`div`,{className:`niche-card`,children:[_jsxs(`div`,{className:`niche-img-wrapper`,children:[_jsx(`img`,{src:`/imgs/nicho1.jpeg`,alt:`Carros de Luxo`,loading:`lazy`,decoding:`async`}),_jsx(`div`,{className:`niche-overlay`}),_jsx(`h3`,{className:`niche-title`,children:`CARROS DE LUXO`})]}),_jsx(`p`,{className:`niche-desc`,children:`Cenas de supercarros ultra virais para criar um perfil de sucesso em qualquer rede social.`})]}),_jsxs(`div`,{className:`niche-card`,children:[_jsxs(`div`,{className:`niche-img-wrapper`,children:[_jsx(`img`,{src:`/imgs/nicho2.jpeg`,alt:`Fitness`,loading:`lazy`,decoding:`async`}),_jsx(`div`,{className:`niche-overlay`}),_jsx(`h3`,{className:`niche-title`,children:`FITNESS`})]}),_jsx(`p`,{className:`niche-desc`,children:`Vídeos de academia, treinos pesados e estilo de vida fitness prontos para postar.`})]}),_jsxs(`div`,{className:`niche-card`,children:[_jsxs(`div`,{className:`niche-img-wrapper`,children:[_jsx(`img`,{src:`/imgs/nicho3.jpeg`,alt:`Motivação`,loading:`lazy`,decoding:`async`}),_jsx(`div`,{className:`niche-overlay`}),_jsx(`h3`,{className:`niche-title`,children:`MOTIVAÇÃO`})]}),_jsx(`p`,{className:`niche-desc`,children:`Clipes motivacionais com frases e cenas de impacto que geram milhares de compartilhamentos.`})]}),_jsxs(`div`,{className:`niche-card`,children:[_jsxs(`div`,{className:`niche-img-wrapper`,children:[_jsx(`img`,{src:`/imgs/nicho4.jpeg`,alt:`Filmes e Séries`,loading:`lazy`,decoding:`async`}),_jsx(`div`,{className:`niche-overlay`}),_jsx(`h3`,{className:`niche-title`,children:`FILMES E SÉRIES`})]}),_jsx(`p`,{className:`niche-desc`,children:`Um dos melhores nichos para viralizar e obter resultados rápidos.`})]}),_jsxs(`div`,{className:`niche-card`,children:[_jsxs(`div`,{className:`niche-img-wrapper`,children:[_jsx(`img`,{src:`/imgs/nicho5.jpeg`,alt:`Aesthetic & Luxo`,loading:`lazy`,decoding:`async`}),_jsx(`div`,{className:`niche-overlay`}),_jsx(`h3`,{className:`niche-title`,children:`AESTHETIC & LUXO`})]}),_jsx(`p`,{className:`niche-desc`,children:`Conteúdo de estilo de vida luxuoso e estético que o algoritmo ama entregar.`})]}),_jsxs(`div`,{className:`niche-card`,children:[_jsxs(`div`,{className:`niche-img-wrapper`,children:[_jsx(`img`,{src:`/imgs/nicho6.jpeg`,alt:`Natureza`,loading:`lazy`,decoding:`async`}),_jsx(`div`,{className:`niche-overlay`}),_jsx(`h3`,{className:`niche-title`,children:`NATUREZA`})]}),_jsx(`p`,{className:`niche-desc`,children:`Cenas relaxantes e visualmente impressionantes de paisagens e natureza.`})]})]}),_jsxs(`div`,{className:`niche-extra-block`,children:[_jsx(`h3`,{className:`niche-extra-title`,children:_jsx(`em`,{children:`E dezenas de outras coleções...`})}),_jsxs(`p`,{className:`niche-extra-desc`,children:[`O pack completo inclui `,_jsx(`strong`,{className:`text-neon`,children:`+250.000 Vídeos`}),` divididos em mais de 50 categorias para cobrir absolutamente qualquer nicho ou estilo de conteúdo.`]})]})]})}),
_jsx(`section`, {
  className: `bg-black py-16`,
  children: _jsxs(`div`, {
    className: `container mx-auto px-4`,
    children: [
      _jsx(`h2`, { className: `text-3xl sm:text-4xl font-black text-white text-center mb-12`, children: `Bônus Exclusivos` }),
      _jsx(`div`, {
        className: `grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto`,
        children: [
          
            _jsxs(`div`, {
              className: `bg-[#1A1A1A] border border-[#CCFF00]/30 rounded-2xl p-6 transition-transform hover:scale-105`,
              children: [
                _jsxs(`div`, {
                  className: `flex justify-between items-center mb-4`,
                  children: [
                    _jsx(`span`, { className: `bg-[#1A1A1A] border border-[#CCFF00] text-[#CCFF00] px-3 py-1 rounded-md text-xs font-bold`, children: `BONO #01` }),
                    _jsx(`span`, { className: `bg-[#CCFF00] text-black px-3 py-1 rounded-md text-xs font-bold uppercase`, children: `Gratis` })
                  ]
                }),
                _jsx(`h3`, { className: `text-white text-lg font-bold mb-4`, children: `Guia de Horários e Hashtags Virais` }),
                _jsxs(`div`, {
                  className: `flex justify-between items-center pt-4 border-t border-white/10`,
                  children: [
                    _jsx(`span`, { className: `text-gray-500 line-through text-sm`, children: `Valor: $27 USD` }),
                    _jsx(`span`, { className: `text-[#00FF44] font-bold text-sm`, children: `✓ 100% GRATIS` })
                  ]
                })
              ]
            })
          ,
            _jsxs(`div`, {
              className: `bg-[#1A1A1A] border border-[#CCFF00]/30 rounded-2xl p-6 transition-transform hover:scale-105`,
              children: [
                _jsxs(`div`, {
                  className: `flex justify-between items-center mb-4`,
                  children: [
                    _jsx(`span`, { className: `bg-[#1A1A1A] border border-[#CCFF00] text-[#CCFF00] px-3 py-1 rounded-md text-xs font-bold`, children: `BONO #02` }),
                    _jsx(`span`, { className: `bg-[#CCFF00] text-black px-3 py-1 rounded-md text-xs font-bold uppercase`, children: `Gratis` })
                  ]
                }),
                _jsx(`h3`, { className: `text-white text-lg font-bold mb-4`, children: `Audios y Músicas Motivacionales` }),
                _jsxs(`div`, {
                  className: `flex justify-between items-center pt-4 border-t border-white/10`,
                  children: [
                    _jsx(`span`, { className: `text-gray-500 line-through text-sm`, children: `Valor: $24 USD` }),
                    _jsx(`span`, { className: `text-[#00FF44] font-bold text-sm`, children: `✓ 100% GRATIS` })
                  ]
                })
              ]
            })
          ,
            _jsxs(`div`, {
              className: `bg-[#1A1A1A] border border-[#CCFF00]/30 rounded-2xl p-6 transition-transform hover:scale-105`,
              children: [
                _jsxs(`div`, {
                  className: `flex justify-between items-center mb-4`,
                  children: [
                    _jsx(`span`, { className: `bg-[#1A1A1A] border border-[#CCFF00] text-[#CCFF00] px-3 py-1 rounded-md text-xs font-bold`, children: `BONO #03` }),
                    _jsx(`span`, { className: `bg-[#CCFF00] text-black px-3 py-1 rounded-md text-xs font-bold uppercase`, children: `Gratis` })
                  ]
                }),
                _jsx(`h3`, { className: `text-white text-lg font-bold mb-4`, children: `Monetización Oculta con IA` }),
                _jsxs(`div`, {
                  className: `flex justify-between items-center pt-4 border-t border-white/10`,
                  children: [
                    _jsx(`span`, { className: `text-gray-500 line-through text-sm`, children: `Valor: $37 USD` }),
                    _jsx(`span`, { className: `text-[#00FF44] font-bold text-sm`, children: `✓ 100% GRATIS` })
                  ]
                })
              ]
            })
          ,
            _jsxs(`div`, {
              className: `bg-[#1A1A1A] border border-[#CCFF00]/30 rounded-2xl p-6 transition-transform hover:scale-105`,
              children: [
                _jsxs(`div`, {
                  className: `flex justify-between items-center mb-4`,
                  children: [
                    _jsx(`span`, { className: `bg-[#1A1A1A] border border-[#CCFF00] text-[#CCFF00] px-3 py-1 rounded-md text-xs font-bold`, children: `BONO #04` }),
                    _jsx(`span`, { className: `bg-[#CCFF00] text-black px-3 py-1 rounded-md text-xs font-bold uppercase`, children: `Gratis` })
                  ]
                }),
                _jsx(`h3`, { className: `text-white text-lg font-bold mb-4`, children: `Pack Profesional de Ediciones` }),
                _jsxs(`div`, {
                  className: `flex justify-between items-center pt-4 border-t border-white/10`,
                  children: [
                    _jsx(`span`, { className: `text-gray-500 line-through text-sm`, children: `Valor: $47 USD` }),
                    _jsx(`span`, { className: `text-[#00FF44] font-bold text-sm`, children: `✓ 100% GRATIS` })
                  ]
                })
              ]
            })
          
        ]
      })
    ]
  })
}),_jsx(`section`,{id:`checkout`,className:`price-section`,children:_jsxs(`div`,{className:`container fade-in`,children:[_jsxs(`div`,{className:`max-w-md mx-auto mb-10 text-center`,children:[_jsx(`p`,{className:`text-white font-bold text-base sm:text-lg mb-3 tracking-tight`,children:`Essa pessoa não é mais inteligente que você, e consegue fazer isso usando menos de 30 minutos por dia:`}),_jsxs(`div`,{onClick:()=>openModalWithImg('/assets/aistudio/e32ba904-ace3-4d70-be3f-c751679cab55_a7f0ecdf.png'),className:`relative rounded-2xl overflow-hidden border border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-[#0d1117] p-1.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group`,role:`button`,tabIndex:0,"aria-label":`Abrir imagem em tamanho real`,onKeyDown:(e: any)=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),openModalWithImg('/assets/aistudio/e32ba904-ace3-4d70-be3f-c751679cab55_a7f0ecdf.png'))},children:[_jsx(`img`,{src:`/assets/aistudio/e32ba904-ace3-4d70-be3f-c751679cab55_a7f0ecdf.png`,alt:`Depoimento de cliente gerando renda com vídeos virais (Toque para ampliar)`,className:`w-full h-auto rounded-xl object-contain shadow-md transition-opacity group-hover:opacity-95`,loading:`lazy`}),_jsxs(`div`,{className:`absolute bottom-3.5 right-3.5 bg-black/80 backdrop-blur-md border border-emerald-400/50 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transition-transform group-hover:scale-105`,children:[_jsx(`span`,{children:`🔍`}),` Clique para ampliar`]})]})]}),_jsx(`h2`,{className:`text-center`,children:`Aproveite esta oferta antes que o preço suba`}),_jsxs(`div`,{className:`price-card`,children:[_jsx(`img`,{src:`/assets/aistudio/e10db325-9613-442f-a51d-b7aaa1f9457e_bfb783b7.png`,alt:`Pack Viral Master Pro Mockup`,className:`price-card-img w-full max-w-[440px] h-auto rounded-2xl shadow-[0_10px_35px_rgba(204,255,0,0.25)] border border-[#CCFF00]/40 mx-auto mb-6 object-contain`,loading:`lazy`}),_jsxs(`ul`,{className:`checklist`,children:[_jsxs(`li`,{children:[_jsx(`span`,{className:`text-neon`,children:`✅`}),` +250.000 vídeos virais em MP4`]}),_jsxs(`li`,{children:[_jsx(`span`,{className:`text-neon`,children:`✅`}),` +50 nichos organizados por pastas`]}),_jsxs(`li`,{children:[_jsx(`span`,{className:`text-neon`,children:`✅`}),` Vídeos sem rosto (faceless)`]}),_jsxs(`li`,{children:[_jsx(`span`,{className:`text-neon`,children:`✅`}),` Uso 100% livre — sem restrições ou direitos autorais`]}),_jsxs(`li`,{children:[_jsx(`span`,{className:`text-neon`,children:`✅`}),` Acesso instantâneo imediato`]}),_jsxs(`li`,{children:[_jsx(`span`,{className:`text-neon`,children:`✅`}),` Garantia dupla de satisfação de 30 dias`]}),_jsxs(`li`,{children:[_jsx(`span`,{className:`text-neon`,children:`✅`}),` Atualizações futuras gratuitas`]}),_jsxs(`li`,{children:[_jsx(`span`,{className:`text-neon`,children:`🎁`}),` `,_jsxs(`span`,{children:[_jsx(`strong`,{className:`text-neon`,children:`BÔNUS:`}),` Guia de Horários e Hashtags Virais 🎁`]})]}),_jsxs(`li`,{children:[_jsx(`span`,{className:`text-neon`,children:`🎁`}),` `,_jsxs(`span`,{children:[_jsx(`strong`,{className:`text-neon`,children:`BÔNUS:`}),` Áudios e Músicas Motivacionais em Alta 🎁`]})]}),_jsxs(`li`,{children:[_jsx(`span`,{className:`text-neon`,children:`🎁`}),` `,_jsxs(`span`,{children:[_jsx(`strong`,{className:`text-neon`,children:`BÔNUS:`}),` Monetização Oculta com Inteligência Artificial 🎁`]})]}),_jsxs(`li`,{children:[_jsx(`span`,{className:`text-neon`,children:`🎁`}),` `,_jsxs(`span`,{children:[_jsx(`strong`,{className:`text-neon`,children:`BÔNUS:`}),` Pack Profissional de Efeitos e Edições 🎁`]})]}),, _jsxs(`li`,{children:[_jsx(`span`,{className:`text-neon`,children:`🎁`}),` `,_jsxs(`span`,{children:[_jsx(`strong`,{className:`text-neon`,children:`BÔNUS:`}),` Aprenda a viralizar 5x mais rápido 🎁`]})]})]}),_jsxs(`div`,{className:`pricing-cta-block`,children:[_jsxs(`div`,{className:`strike-container text-sec`,children:[`De `,_jsx(`span`,{className:`text-strike`,children:`R$ 97,00`}),` por apenas`]}),_jsx(`div`,{className:`real-price text-[#00FF44] drop-shadow-[0_0_25px_rgba(0,255,68,0.5)]`,children:`19`}),_jsx(`div`,{className:`subtexto text-sec`,children:`(Acesso vitalício — pagamento único)`}),_jsx(`a`,{href:ye,onClick:ge,className:`btn btn-green btn-pulse-green cursor-pointer`,children:`QUERO MEU PACK AGORA`}),_jsxs(`div`,{className:`mt-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-medium leading-relaxed text-center`,children:[`🛡️ Se você postar durante 15 dias e não obtiver resultados, nos envie os prints e devolvemos 100% do seu dinheiro mais `,_jsx(`span`,{className:`text-[#00FF44] font-bold`,children:`R$ 100 reais`}),` extras.`]}),_jsxs(`div`,{className:`scarcity-box`,children:[`⏳ `,_jsx(`strong`,{className:`text-alert`,children:`ATENÇÃO!`}),` A oferta promocional encerra hoje:`,` `,_jsx(`span`,{id:`dynamic-date`,className:`text-alert-date`,children:f}),` `,`às 23:59h.`]})]}),_jsx(`div`,{className:`microcopy text-sec`,children:`🔒 Pagamento 100% seguro via Kirvano · Acesso imediato logo após a compra`})]})]})}),_jsx(`section`,{children:_jsx(`div`,{className:`container fade-in`,children:_jsxs(`div`,{className:`guarantee-card`,children:[_jsx(`h2`,{className:`guarantee-title`,children:`Sua compra está 100% protegida`}),_jsx(`p`,{className:`guarantee-text`,children:`Se por qualquer motivo você não ficar satisfeito com o Viral Pack Pro, você tem 30 dias para pedir a devolução completa do seu dinheiro. Sem perguntas, sem complicações e sem letras miúdas. Ou você adora, ou devolvemos cada centavo.`}),_jsx(`p`,{className:`guarantee-subtext`,children:`Garantia válida por 30 dias após a compra — processada com segurança diretamente pela Kirvano.`})]})})}),_jsx(`section`,{className:`bg-alt relative py-16 sm:py-20 border-t border-white/5`,children:_jsxs(`div`,{className:`container fade-in`,children:[_jsx(`h2`,{className:`text-center font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-10 sm:mb-12`,children:`Por que este pack é diferente?`}),_jsxs(`div`,{className:`benefits-grid`,children:[_jsxs(`div`,{className:`benefit-card`,children:[_jsx(`div`,{className:`benefit-icon-box`,children:_jsx(oe,{className:`w-6 h-6 text-[#CCFF00]`})}),_jsxs(`div`,{children:[_jsx(`h3`,{className:`benefit-title`,children:`ALTO IMPACTO`}),_jsx(`p`,{className:`benefit-desc`,children:`Não são vídeos chatos de banco de imagem. Foram criados para prender a atenção nos primeiros 3 segundos.`})]})]}),_jsxs(`div`,{className:`benefit-card`,children:[_jsx(`div`,{className:`benefit-icon-box`,children:_jsx(re,{className:`w-6 h-6 text-[#CCFF00]`})}),_jsxs(`div`,{children:[_jsx(`h3`,{className:`benefit-title`,children:`ECONOMIZE TEMPO`}),_jsx(`p`,{className:`benefit-desc`,children:`Esqueça passar horas garimpando clipes ou editando do zero. Você baixa, adiciona seu texto e pronto.`})]})]}),_jsxs(`div`,{className:`benefit-card`,children:[_jsx(`div`,{className:`benefit-icon-box`,children:_jsx(ae,{className:`w-6 h-6 text-[#CCFF00]`})}),_jsxs(`div`,{children:[_jsx(`h3`,{className:`benefit-title`,children:`QUALIDADE PREMIUM`}),_jsx(`p`,{className:`benefit-desc`,children:`Vídeos em alta definição com estilo cinematográfico que deixam seu perfil profissional na hora.`})]})]}),_jsxs(`div`,{className:`benefit-card`,children:[_jsx(`div`,{className:`benefit-icon-box`,children:_jsx(C,{className:`w-6 h-6 text-[#CCFF00]`})}),_jsxs(`div`,{children:[_jsx(`h3`,{className:`benefit-title`,children:`MULTIPLATAFORMA`}),_jsx(`p`,{className:`benefit-desc`,children:`Otimizados no formato vertical 9:16, perfeitos para Reels do Instagram, TikTok e YouTube Shorts.`})]})]}),_jsxs(`div`,{className:`benefit-card md:col-span-2 md:max-w-xl md:mx-auto w-full`,children:[_jsx(`div`,{className:`benefit-icon-box`,children:_jsx(ie,{className:`w-6 h-6 text-[#CCFF00]`})}),_jsxs(`div`,{children:[_jsx(`h3`,{className:`benefit-title`,children:`ACESSO VITALÍCIO`}),_jsx(`p`,{className:`benefit-desc`,children:`Um único pagamento e você tem acesso para sempre, incluindo todas as futuras atualizações do pack.`})]})]})]})]})}),_jsx(`section`,{className:`bg-alt`,children:_jsxs(`div`,{className:`container fade-in`,children:[_jsx(`h2`,{className:`text-center`,children:`Perguntas Frequentes`}),_jsx(`div`,{className:`faq-container`,children:E.map((e,t)=>{let n=u===t;return _jsxs(`div`,{className:`faq-item ${n?`active`:``}`,children:[_jsxs(`div`,{className:`faq-question`,onClick:()=>de(t),role:`button`,tabIndex:0,onKeyDown:(e: any)=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),de(t))},children:[_jsx(`h3`,{children:e.question}),_jsx(`span`,{className:`icon`,children:`+`})]}),_jsx(`div`,{className:`faq-answer`,style:{maxHeight:n?`300px`:`0px`},children:_jsx(`p`,{children:e.answer})})]},t)})})]})}),_jsx(`section`,{className:`final-cta`,children:_jsxs(`div`,{className:`container text-center fade-in`,children:[_jsx(`h2`,{children:`Não continue perdendo tempo criando conteúdo do zero`}),_jsx(`p`,{className:`final-text`,children:`Enquanto você passa horas gravando, editando e caçando ideias… outros já estão postando conteúdo viral todo santo dia com este pack.`}),_jsx(`p`,{className:`final-small text-neon`,children:`250.000 vídeos. 50 nichos. Prontos para usar. Por menos do que custa um café.`}),_jsx(`a`,{href:ye,onClick:ge,className:`btn btn-green btn-pulse-green cursor-pointer`,children:`QUERO MEU PACK AGORA — 19`})]})}),_jsx(`footer`,{children:_jsxs(`div`,{className:`container text-center fade-in`,children:[_jsx(`p`,{className:`text-sec`,children:`© 2026 Viral Pack Pro. Todos os direitos reservados.`}),_jsx(`p`,{className:`text-sec`,children:`Este produto é 100% digital. Após a compra, você receberá acesso imediato por e-mail.`}),_jsx(`p`,{className:`text-sec`,children:`Suporte oficial: suporte@viralpackpro.com`})]})}),
      _jsx(`a`, {
        href: "https://wa.me/5515988081810?text=Ol%C3%A1,%20preciso%20de%20ajuda%20com%20o%20Viral%20Pack%20Pro",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "fixed bottom-20 right-5 z-[99999] flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2.5 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 text-xs sm:text-sm font-bold tracking-wide cursor-pointer",
        "aria-label": "Suporte via WhatsApp",
        children: [
          _jsx("svg", {
            className: "w-5 h-5 fill-current shrink-0",
            viewBox: "0 0 24 24",
            children: _jsx("path", {
              d: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
            })
          }),
          _jsx("span", { children: "Precisa de ajuda?" })
        ]
      })
,
_jsxs(`div`,{id:`sales-popup`,className:`sales-popup ${v?`show`:`hide`}`,children:[_jsx(`button`,{type:`button`,className:`popup-close`,onClick:()=>y(!1),"aria-label":`Fechar notificação`,children:`✕`}),_jsxs(`div`,{className:`popup-content`,children:[_jsxs(`p`,{className:`popup-title`,children:[_jsx(`strong`,{children:b.name}),` adquiriu o pack viral`]})]})]}),m&&_jsx(`div`,{className:`fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm`,role:`dialog`,"aria-modal":`true`,onClick:()=>h(!1),children:_jsxs(`div`,{className:`relative w-full max-w-md max-h-[92vh] overflow-y-auto bg-[#121318] border-2 border-[#CCFF00] rounded-2xl p-5 sm:p-6 shadow-[0_0_50px_rgba(204,255,0,0.3)] text-white text-center`,onClick:(e: any)=>e.stopPropagation(),children:[_jsx(`button`,{type:`button`,onClick:()=>h(!1),className:`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center text-lg font-bold transition-colors cursor-pointer`,"aria-label":`Fechar janela`,children:`✕`}),_jsx(`div`,{className:`flex justify-center mb-2.5`,children:_jsx(`img`,{src:`/assets/aistudio/combo_modal_thumb.webp`,alt:`Combo Pack Completo`,className:`w-32 sm:w-40 h-auto object-contain rounded-xl shadow-[0_4px_25px_rgba(204,255,0,0.25)] border border-[#CCFF00]/40`})}),_jsx(`div`,{className:`inline-block bg-[#CCFF00]/15 border border-[#CCFF00]/40 text-[#CCFF00] text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2`,children:`⚡ OFERTA ESPECIAL EXCLUSIVA`}),_jsxs(`h3`,{className:`text-xl sm:text-2xl font-black text-white leading-tight mb-1.5`,children:[`Leve o `,_jsx(`span`,{className:`text-[#CCFF00]`,children:`COMBO COMPLETO`}),` por apenas `,_jsx(`span`,{className:`text-[#CCFF00]`,children:`R$ 29,90`}),`!`]}),_jsx(`p`,{className:`text-xs sm:text-sm text-gray-300 font-medium mb-3`,children:`Desbloqueie os 3 produtos juntos com acesso vitalício:`}),_jsxs(`div`,{className:`bg-[#1A1C24] border border-white/10 rounded-xl p-3.5 sm:p-4 mb-3.5 text-left space-y-2 text-xs sm:text-sm text-gray-200`,children:[_jsxs(`div`,{className:`flex items-start gap-2.5`,children:[_jsx(`span`,{className:`text-[#CCFF00] font-black text-sm shrink-0 leading-none mt-0.5`,children:`✓`}),_jsxs(`span`,{className:`leading-snug`,children:[_jsx(`strong`,{className:`text-white`,children:`Viral Pack Pro:`}),` +250.000 vídeos virais sem marca d'água`]})]}),_jsxs(`div`,{className:`flex items-start gap-2.5`,children:[_jsx(`span`,{className:`text-[#CCFF00] font-black text-sm shrink-0 leading-none mt-0.5`,children:`✓`}),_jsxs(`span`,{className:`leading-snug`,children:[_jsx(`strong`,{className:`text-white`,children:`Masterclass com IA:`}),` Estratégia completa para canais sem rosto (faceless)`]})]}),_jsxs(`div`,{className:`flex items-start gap-2.5`,children:[_jsx(`span`,{className:`text-[#CCFF00] font-black text-sm shrink-0 leading-none mt-0.5`,children:`✓`}),_jsxs(`span`,{className:`leading-snug`,children:[_jsx(`strong`,{className:`text-white`,children:`+10.000 Modelos Canva`}),` + Pack de Músicas e Áudios VIP`]})]})]}),_jsxs(`div`,{className:`flex items-center justify-center gap-2.5 mb-3.5`,children:[_jsx(`span`,{className:`text-gray-400 text-sm line-through`,children:`197,00`}),_jsx(`span`,{className:`text-2xl sm:text-3xl font-black text-[#CCFF00]`,children:`R$ 29,90`}),_jsx(`span`,{className:`text-[11px] sm:text-xs text-gray-200 font-semibold bg-white/10 px-2 py-0.5 rounded-full`,children:`(Os 3 juntos)`})]}),_jsx(`a`,{href:ye,target:`_blank`,rel:`noopener noreferrer`,onClick:()=>{we(`InitiateCheckout`,{content_name:`Viral Pack Pro - Mega Combo`,value:10,currency:`USD`}),h(!1)},className:`block w-full py-3.5 px-4 rounded-xl font-black text-sm sm:text-base uppercase tracking-wide bg-[#CCFF00] hover:bg-[#bbf000] text-black shadow-lg shadow-[#CCFF00]/25 transition-all duration-200 text-center hover:scale-[1.02] active:scale-[0.98] cursor-pointer`,children:`SIM, QUERO OS 3 PRODUTOS POR R$ 29,90`}),_jsx(`a`,{href:ve,target:`_blank`,rel:`noopener noreferrer`,onClick:()=>{we(`InitiateCheckout`,{content_name:`Viral Pack Pro`,value:5.9,currency:`USD`}),h(!1)},className:`block mt-3 text-xs sm:text-sm text-gray-400 hover:text-gray-200 underline transition-colors cursor-pointer py-1`,children:`Não obrigado, prefiro levar apenas 1 produto por 19 →`})]})}),g&&_jsx(`div`,{className:`fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-md animate-fadeIn`,role:`dialog`,"aria-modal":`true`,onClick:()=>_(!1),children:_jsxs(`div`,{className:`relative max-w-3xl w-full max-h-[94vh] flex flex-col items-center justify-center`,onClick:(e: any)=>e.stopPropagation(),children:[_jsx(`button`,{type:`button`,onClick:()=>_(!1),className:`absolute -top-11 right-0 w-9 h-9 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center text-lg font-bold cursor-pointer transition-colors shadow-lg`,"aria-label":`Fechar imagem`,children:`✕`}),_jsx(`div`,{className:`relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-black max-h-[86vh] overflow-y-auto`,children:_jsx(`img`,{src:modalImg,alt:`Print de resultado ampliado`,className:`w-full max-h-[82vh] object-contain select-none rounded-xl`})}),_jsxs(`p`,{className:`text-gray-400 text-xs mt-2.5 flex items-center gap-1.5 font-medium`,children:[_jsx(`span`,{children:`✕`}),` Toque fora ou pressione o X para fechar`]})]})})]})}
