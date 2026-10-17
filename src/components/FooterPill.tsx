import React from 'react';

export const FooterPill: React.FC = () => {
  return (
    <footer className="mt-16 pb-8 flex justify-center items-center">
      <div 
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#32141D]/15 text-xs text-[#32141D]/60 shadow-sm backdrop-blur-[2px] transition-all hover:bg-white/90 hover:text-[#32141D]/80"
        aria-label="Footer note"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#CB8C96]" aria-hidden="true" />
        <span>little date invitation</span>
        <span className="text-[#CB8C96]" aria-hidden="true">💌</span>
      </div>
    </footer>
  );
};
