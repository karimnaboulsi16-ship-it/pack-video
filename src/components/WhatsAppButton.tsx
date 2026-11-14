import React from 'react';

const WHATSAPP_URL = 'https://wa.me/5515996788845';

export const WhatsAppButton = React.memo(function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Alguma dúvida? Falar no WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[1000] inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.75)] transition-all duration-200 whitespace-nowrap select-none"
    >
      <svg
        viewBox="0 0 32 32"
        className="w-5 h-5 shrink-0 fill-current"
        aria-hidden="true"
      >
        <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.353.615 4.652 1.784 6.678L2.56 29.59l7.087-1.858A13.266 13.266 0 0 0 16.004 29.333C23.367 29.333 29.34 23.36 29.34 16S23.367 2.667 16.004 2.667zm0 24.442c-2.054 0-4.069-.553-5.826-1.598l-.418-.248-4.205 1.102 1.123-4.1-.272-.433A11.063 11.063 0 0 1 4.89 16c0-6.128 4.986-11.114 11.114-11.114 6.127 0 11.113 4.986 11.113 11.114 0 6.127-4.986 11.109-11.113 11.109zm6.096-8.323c-.334-.167-1.976-.975-2.283-1.086-.306-.112-.529-.167-.752.167-.223.334-.863 1.086-1.058 1.309-.195.223-.39.251-.724.084-.334-.167-1.41-.52-2.686-1.658-.993-.886-1.663-1.98-1.858-2.314-.195-.334-.021-.515.146-.681.15-.15.334-.39.501-.585.167-.195.223-.334.334-.557.112-.223.056-.418-.028-.585-.083-.167-.752-1.811-1.031-2.48-.271-.651-.547-.563-.752-.573l-.641-.011c-.223 0-.585.084-.891.418s-1.17 1.143-1.17 2.787 1.198 3.233 1.365 3.456c.167.223 2.357 3.599 5.71 5.047.798.344 1.421.55 1.906.704.801.255 1.53.219 2.106.133.643-.096 1.976-.808 2.255-1.588.279-.78.279-1.449.195-1.588-.083-.14-.306-.223-.64-.39z" />
      </svg>
      <span>Alguma dúvida?</span>
    </a>
  );
});
