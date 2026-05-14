import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const SimplePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasShown = localStorage.getItem('popupShown');
    if (!hasShown) {
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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

  return createPortal(
    <div>
      <div
        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div
        className="fixed z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 'min(800px, 90vw)' }}
      >
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 z-10 flex items-center justify-center h-9 w-9 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all hover:scale-110 focus:outline-none"
            aria-label="Fechar"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
          <img
            src="/images/Pop-up-Desktop.png"
            alt="SECABC - Clique para saber mais"
            onClick={handleImageClick}
            className="hidden md:block w-full h-auto cursor-pointer"
          />
          <img
            src="/images/Pop-up-Mobile.png"
            alt="SECABC - Clique para saber mais"
            onClick={handleImageClick}
            className="block md:hidden w-full h-auto cursor-pointer"
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SimplePopup;
