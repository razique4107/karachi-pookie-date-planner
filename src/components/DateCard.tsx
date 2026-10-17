import React from 'react';
import { DynamicDateOption } from '../utils/dateUtils';

interface DateCardProps {
  option: DynamicDateOption;
  isSelected: boolean;
  onSelect: (option: DynamicDateOption) => void;
}

export const DateCard: React.FC<DateCardProps> = ({
  option,
  isSelected,
  onSelect,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(option);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={() => onSelect(option)}
      onKeyDown={handleKeyDown}
      className={`group flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#ED2517] focus-visible:ring-offset-2 min-w-[90px] sm:min-w-[120px] ${
        isSelected
          ? 'bg-[#DDF0E8] border-[#32141D] shadow-[3px_3px_0px_#32141D] ring-2 ring-[#32141D] -translate-y-1'
          : 'bg-[#FFFFFF] border-[#32141D]/20 shadow-[2px_2px_0px_rgba(50,20,29,0.12)] hover:border-[#32141D]/60 hover:shadow-[3px_3px_0px_rgba(50,20,29,0.25)] hover:-translate-y-0.5'
      }`}
    >
      {/* Small muted weekday label near the top */}
      <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#32141D]/70 uppercase mb-1">
        {option.weekdayShort}
      </span>

      {/* Large, elegant date number */}
      <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#32141D] leading-none my-1 tracking-tight">
        {option.day}
      </span>

      {/* Tiny dusty-pink month label with year */}
      <span className="font-handwriting text-base sm:text-lg text-[#CB8C96] font-bold tracking-wide mt-1">
        {option.monthShort}
      </span>
    </div>
  );
};
