import React, { useState } from 'react';
import { KarachiDateFoodOption } from '../config/siteConfig';
import { Utensils } from 'lucide-react';

interface FoodCardProps {
  option: KarachiDateFoodOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
  unselectedPill: string;
  selectedPill: string;
}

export const FoodCard: React.FC<FoodCardProps> = ({
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
      className={`group relative flex items-center gap-3.5 sm:gap-4 p-3 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer text-left select-none outline-none focus-visible:ring-2 focus-visible:ring-[#ED2517] focus-visible:ring-offset-2 ${
        isSelected
          ? 'bg-[#FCF7F7] border-[#32141D] shadow-[3px_3px_0px_#32141D] ring-1 ring-[#32141D]'
          : 'bg-[#FFFFFF] border-[#32141D]/20 shadow-[2px_2px_0px_rgba(50,20,29,0.12)] hover:border-[#32141D]/60 hover:shadow-[3px_3px_0px_rgba(50,20,29,0.3)] hover:-translate-y-0.5'
      }`}
    >
      {/* Food photograph on the left: rounded square thumbnail */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden border border-[#32141D]/15 bg-[#F5F2EB]">
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
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#F1ECE1] text-[#32141D]/60 p-1 text-center">
            <Utensils className="w-5 h-5 mb-1 text-[#CB8C96]" />
            <span className="text-[10px] font-semibold line-clamp-1">{option.title}</span>
          </div>
        )}
      </div>

      {/* Card details */}
      <div className="flex-1 min-w-0 pr-1">
        {option.caption && (
          <div className="mb-0.5">
            <span className="inline-block text-[11px] font-semibold text-[#410C1B] bg-[#DDF0E8] border border-[#32141D]/10 px-2 py-0.5 rounded-full">
              {option.caption}
            </span>
          </div>
        )}

        <div className="flex items-start justify-between gap-1 mb-1">
          <h3 className="text-base sm:text-lg font-bold text-[#32141D] tracking-tight line-clamp-1">
            {option.title}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-[#32141D]/75 font-normal leading-snug line-clamp-2 mb-2">
          {option.description}
        </p>

        {/* Pink handwritten accent label */}
        <div className="flex items-center">
          <span
            className={`font-handwriting text-base sm:text-lg tracking-wide transition-all ${
              isSelected
                ? 'text-[#ED2517] font-bold'
                : 'text-[#CB8C96] group-hover:text-[#32141D]'
            }`}
          >
            {isSelected ? `✓ ${selectedPill}` : `→ ${unselectedPill}`}
          </span>
        </div>
      </div>
    </div>
  );
};
