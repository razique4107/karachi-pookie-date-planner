import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { HeaderEyebrow } from '../HeaderEyebrow';
import { Heart, Sparkles } from 'lucide-react';

interface InvitationScreenProps {
  onAccept: () => void;
}

export const InvitationScreen: React.FC<InvitationScreenProps> = ({ onAccept }) => {
  const config = SITE_CONFIG.invitation;
  const [imageError, setImageError] = useState(false);
  
  // Evasive button state
  const [movesCount, setMovesCount] = useState(0);
  const [noOffset, setNoOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [currentCaption, setCurrentCaption] = useState<string>(config.initialMicrocopy);
  const [noSelected, setNoSelected] = useState(false);

  // 5 predefined safe offset coordinates that keep the button inside its container and away from Yes button
  const safeOffsets = [
    { x: 35, y: -22 },
    { x: -30, y: 28 },
    { x: 40, y: 22 },
    { x: -35, y: -18 },
    { x: 15, y: 30 },
  ];

  // Evasive dodge logic (stops after maxMoves = 5)
  const handleEvasiveDodge = () => {
    if (movesCount < config.maxMoves && !noSelected) {
      const nextCount = movesCount + 1;
      setMovesCount(nextCount);
      
      const offsetIndex = (nextCount - 1) % safeOffsets.length;
      setNoOffset(safeOffsets[offsetIndex]);

      const captionIndex = (nextCount - 1) % config.noEvasiveCaptions.length;
      setCurrentCaption(config.noEvasiveCaptions[captionIndex]);
    }
  };

  // Click on No button
  const handleNoClick = (e: React.MouseEvent) => {
    // On mobile touch, if movesCount < 5, first dodge playfully
    if (movesCount < config.maxMoves) {
      e.preventDefault();
      handleEvasiveDodge();
      return;
    }

    // After 5 moves, user can genuinely select No
    setNoSelected(true);
  };

  // Keyboard navigation for accessibility
  const handleNoKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setNoSelected(true);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center animate-fadeIn">
      {/* Top square kitten photo with bunny hood */}
      <div className="relative mb-6">
        <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl p-1.5 bg-white border-2 border-[#32141D] shadow-[4px_4px_0px_#32141D] overflow-hidden transform -rotate-1 transition-transform hover:rotate-0 duration-300">
          {!imageError ? (
            <img
              src={config.kittenImage}
              alt={config.kittenAlt}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#FDFBF7] text-[#32141D]">
              <Sparkles className="w-10 h-10 text-[#CB8C96] mb-2" />
              <span className="font-handwriting text-xl text-[#32141D]">bunny kitten</span>
            </div>
          )}
        </div>

        {/* Small floating decorative heart tag */}
        <div 
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#ED2517] text-white flex items-center justify-center border-2 border-[#32141D] shadow-[2px_2px_0px_#32141D]"
          aria-hidden="true"
        >
          <Heart className="w-4 h-4 fill-white" />
        </div>
      </div>

      {/* Eyebrow, Display Heading, and Supporting Text */}
      <HeaderEyebrow
        eyebrow={config.eyebrow}
        heading={config.heading}
        supporting={config.supporting}
        center={true}
      />

      {/* Respectful funny message if No was actually selected */}
      {noSelected && (
        <div 
          role="status"
          className="mb-6 px-5 py-3 rounded-2xl bg-[#FFF5F6] border border-[#CB8C96] text-[#410C1B] text-sm sm:text-base font-medium inline-flex flex-col sm:flex-row items-center gap-3 shadow-[2px_2px_0px_rgba(50,20,29,0.15)] animate-fadeIn max-w-lg"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">😭</span>
            <span>{config.noClickedMessage}</span>
          </div>
          <button 
            type="button"
            onClick={onAccept}
            className="shrink-0 bg-[#ED2517] text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-[2px_2px_0px_#32141D] hover:bg-[#c91d12] cursor-pointer transition-all"
          >
            Say yes anyway? 💗
          </button>
        </div>
      )}

      {/* Interactive Button Arena */}
      <div className="w-full max-w-md mx-auto mt-2 min-h-[120px] flex flex-col items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
          {/* Large Coral-red Primary Button: "Yes, obviously 💗" */}
          <button
            type="button"
            onClick={onAccept}
            className="w-full sm:w-auto bg-[#ED2517] text-white text-lg sm:text-xl font-bold px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border-2 border-[#32141D] shadow-[4px_4px_0px_#32141D] hover:shadow-[5px_5px_0px_#32141D] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#32141D] transition-all cursor-pointer focus-visible:outline-3 focus-visible:outline-[#32141D] flex items-center justify-center gap-2.5 z-10"
          >
            <span>{config.yesButtonText}</span>
            <Heart className="w-5 h-5 fill-white text-white" />
          </button>

          {/* Evasive Secondary Button: "No 🙄" */}
          <div className="relative inline-block">
            <button
              type="button"
              onMouseEnter={handleEvasiveDodge}
              onClick={handleNoClick}
              onKeyDown={handleNoKeyDown}
              style={{
                transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
                transition: 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              className="text-sm sm:text-base font-semibold text-[#32141D]/75 bg-white hover:bg-[#FFF8F8] hover:text-[#32141D] px-6 py-3 rounded-full border border-[#32141D]/40 shadow-[2px_2px_0px_rgba(50,20,29,0.15)] hover:shadow-[3px_3px_0px_rgba(50,20,29,0.25)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#32141D] select-none"
              aria-label="No option"
            >
              <span>{config.noButtonText}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Microcopy Caption that changes as button evades */}
        <p 
          className="mt-6 text-sm sm:text-base text-[#CB8C96] font-handwriting text-xl sm:text-2xl select-none transition-all duration-200"
          style={{ transform: 'rotate(-0.5deg)' }}
        >
          {currentCaption}
        </p>
      </div>
    </div>
  );
};
