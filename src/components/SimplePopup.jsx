import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const SimplePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasShown = localStorage.getItem('popupShown');
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('popupShown', 'true');
    setIsOpen(false);
  };

  const handleImageClick = () => {
    localStorage.setItem('popupShown', 'true');
    setIsOpen(false);
    window.open('https://caminhada.secabc.online', '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay — cobre tela toda, clique fora fecha */}
      <div
        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal — centralizado na viewport via translate, independente do scroll */}
      <div
        className="fixed z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 'min(800px, 90vw)' }}
      >
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Botão fechar */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 z-10 flex items-center justify-center h-9 w-9 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all hover:scale-110 focus:outline-none"
            aria-label="Fechar"
          >
            <X size={18} strokeWidth={2.5} />
          </button>

          {/* Imagem desktop — 800×450px, 16:9, visível em md+ */}
          <img
            src="/images/Pop-up-Desktop.png"
            alt="SECABC - Clique para saber mais"
            onClick={handleImageClick}
            className="hidden md:block w-full h-auto cursor-pointer"
          />

          {/* Imagem mobile — 380×520px, 3:4, visível abaixo de md */}
          <img
            src="/images/Pop-up-Mobile.png"
            alt="SECABC - Clique para saber mais"
            onClick={handleImageClick}
            className="block md:hidden w-full h-auto cursor-pointer"
          />

        </div>
      </div>
    </>
  );
};

export default SimplePopup;
