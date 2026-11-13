import React, { useEffect, useState } from 'react';

const NAMES = [
  'João', 'Maria', 'Carlos', 'Ana', 'Lucas', 'Sofia', 'Pedro', 'Laura',
  'Diego', 'Camila', 'Rodrigo', 'Valéria', 'Felipe', 'Beatriz',
  'Mateus', 'Rafael', 'Luciana', 'Fernanda', 'Gabriel', 'Daniela'
];

interface SalesToastPopupProps {
  paused?: boolean;
}

export const SalesToastPopup = React.memo(function SalesToastPopup({
  paused = false
}: SalesToastPopupProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [buyerName, setBuyerName] = useState<string>('Andrés');

  useEffect(() => {
    if (paused) {
      setVisible(false);
      return;
    }

    let hideTimer: number | undefined;
    let nextTimer: number | undefined;

    const showNextToast = () => {
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      setBuyerName(name);
      setVisible(true);
      hideTimer = window.setTimeout(() => {
        setVisible(false);
      }, 6000);
      const nextDelay = Math.floor(Math.random() * 20001) + 15000;
      nextTimer = window.setTimeout(showNextToast, nextDelay);
    };

    const initialTimer = window.setTimeout(showNextToast, 3000);

    return () => {
      window.clearTimeout(initialTimer);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
      if (nextTimer !== undefined) window.clearTimeout(nextTimer);
    };
  }, [paused]);

  return (
    <div id="sales-popup" className={`sales-popup ${visible ? 'show' : 'hide'}`}>
      <button
        type="button"
        className="popup-close"
        onClick={() => setVisible(false)}
        aria-label="Fechar notificação"
      >
        ✕
      </button>
      <div className="popup-content">
        <p className="popup-title">
          <strong>{buyerName}</strong> adquiriu o pack viral
        </p>
      </div>
    </div>
  );
});
