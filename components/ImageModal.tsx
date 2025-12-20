
import React, { useEffect, useState } from 'react';

interface ImageModalProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, images.length]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center modal-blur p-6 md:p-12 cursor-zoom-out select-none animate-fade-in"
      onClick={onClose}
    >
      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <button 
            className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-2xl border border-white/10 text-white/40 hover:text-white transition-all z-[110] group"
            onClick={handlePrev}
          >
            <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button 
            className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-2xl border border-white/10 text-white/40 hover:text-white transition-all z-[110] group"
            onClick={handleNext}
          >
            <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </>
      )}

      {/* Unified Image Container - Fixed max-width to sync visual scale */}
      <div 
        className="relative w-full max-w-[800px] sm:w-[800px] aspect-[4/3] shadow-[0_0_120px_rgba(0,0,0,0.9)] rounded-[2.5rem] overflow-hidden border border-white/10 bg-black flex items-center justify-center animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={images[currentIndex]} 
          alt="Evidence Display" 
          width={800}
          height={600}
          className="block w-full h-full object-cover pointer-events-none" 
        />
        <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-[2.5rem]" />
      </div>

      {/* Status Bar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 px-6 py-2.5 bg-black/80 backdrop-blur-3xl rounded-full border border-white/10 shadow-2xl z-[110]">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-mono text-white/60 tracking-[0.2em] uppercase">EVIDENCE_VIEWER_NODE</span>
        </div>
        <div className="w-px h-3 bg-white/10" />
        <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">{currentIndex + 1} / {images.length}</span>
      </div>

      <button className="fixed top-10 right-10 p-4 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-2xl border border-white/10 text-white/40 hover:text-white z-[110]" onClick={onClose}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-up { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-scale-up { animation: scale-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};
