import React, { useState } from 'react';
import { BouquetOption } from '../config/dateInvitationConfig';
import { Sparkles } from 'lucide-react';

interface BouquetCardProps {
  option: BouquetOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
  unselectedPill: string;
  selectedPill: string;
}

export const BouquetCard: React.FC<BouquetCardProps> = ({
  option,
  isSelected,
  onSelect,
  unselectedPill,
  selectedPill,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(option.id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={() => onSelect(option.id)}
      onKeyDown={handleKeyDown}
      className={`group flex flex-col rounded-2xl border overflow-hidden transition-all duration-200 cursor-pointer text-left select-none outline-none focus-visible:ring-2 focus-visible:ring-[#ED2517] focus-visible:ring-offset-2 ${
        isSelected
          ? 'bg-[#FCF7F7] border-[#32141D] shadow-[3px_3px_0px_#32141D] ring-1 ring-[#32141D]'
          : 'bg-[#FFFFFF] border-[#32141D]/20 shadow-[2px_2px_0px_rgba(50,20,29,0.12)] hover:border-[#32141D]/60 hover:shadow-[3px_3px_0px_rgba(50,20,29,0.3)] hover:-translate-y-0.5'
      }`}
    >
      {/* Bouquet photograph occupying top width of card */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#F5F2EB] border-b border-[#32141D]/15">
        {!imageError ? (
          <img
            src={option.image}
            alt={option.alt}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#F1ECE1] text-[#32141D]/60">
            <Sparkles className="w-8 h-8 mb-2 text-[#CB8C96]" />
            <span className="text-sm font-semibold">{option.title}</span>
          </div>
        )}
      </div>

      {/* Card body below photo */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#32141D] tracking-tight mb-1">
            {option.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#32141D]/70 font-normal leading-snug">
            {option.description}
          </p>
        </div>

        {/* Pink handwritten accent label */}
        <div className="mt-3 pt-2 border-t border-[#32141D]/10 flex items-center justify-between">
          <span
            className={`font-handwriting text-base sm:text-lg tracking-wide transition-all ${
              isSelected
                ? 'text-[#ED2517] font-bold'
                : 'text-[#CB8C96] group-hover:text-[#32141D]'
            }`}
          >
            {isSelected ? `✓ ${selectedPill}` : `→ ${unselectedPill}`}
          </span>
          {isSelected && (
            <span className="text-xs bg-[#410C1B] text-white px-2 py-0.5 rounded-full font-medium">
              chosen
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
