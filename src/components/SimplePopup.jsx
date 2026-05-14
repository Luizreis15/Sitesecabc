import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const SimplePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup has already been shown
    const hasShown = localStorage.getItem('popupShown');
    
    if (!hasShown) {
      // Add a slight delay to ensure smooth page load before showing
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
    window.open('https://www.veramo.com.br/apresentacaosec', '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center justify-center border border-gray-100 animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 flex items-center justify-center h-10 w-10 bg-black/10 hover:bg-black/20 text-gray-800 rounded-full backdrop-blur-sm transition-all hover:scale-110 focus:outline-none"
          aria-label="Fechar"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Image Area */}
        <div 
          className="relative group cursor-pointer w-full flex justify-center bg-white"
          onClick={handleImageClick}
        >
          <img
            src="https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/848cb067be63499d62cc2394244ed8dd.png"
            alt="Apresentação SECABC e Veramo"
            className="w-full h-auto max-h-[85vh] object-contain transition-transform duration-500 group-hover:scale-[1.01]"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default SimplePopup;