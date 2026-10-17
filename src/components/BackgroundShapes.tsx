import React from 'react';

/**
 * Large, soft pale-mint abstract shapes partially extending beyond the page edges.
 * Low contrast and positioned behind all content.
 */
export const BackgroundShapes: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      {/* Top-left soft mint blob */}
      <div 
        className="absolute -top-24 -left-24 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#DDF0E8] opacity-65 blur-2xl transform -rotate-12 transition-transform duration-700" 
      />
      {/* Top-right subtle rose/mint warmth */}
      <div 
        className="absolute top-1/4 -right-28 w-72 h-72 sm:w-88 sm:h-88 rounded-[40%] bg-[#DDF0E8] opacity-50 blur-3xl transform rotate-45" 
      />
      {/* Bottom-left soft mint glow */}
      <div 
        className="absolute -bottom-20 -left-20 w-80 h-80 sm:w-96 sm:h-96 rounded-[50%_40%_60%_30%] bg-[#DDF0E8] opacity-60 blur-3xl" 
      />
      {/* Bottom-right accent */}
      <div 
        className="absolute bottom-10 -right-20 w-64 h-64 rounded-full bg-[#EBF7F2] opacity-70 blur-2xl" 
      />
    </div>
  );
};
