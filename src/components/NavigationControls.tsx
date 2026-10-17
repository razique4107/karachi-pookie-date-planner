import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationControlsProps {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  isNextDisabled?: boolean;
  validationError?: string | null;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  onBack,
  onNext,
  nextLabel = "Next little thing",
  validationError,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto mt-10 pt-4 flex flex-col items-center gap-3">
      {/* Validation banner if user attempts to advance without selecting */}
      {validationError && (
        <div 
          role="alert" 
          className="text-xs sm:text-sm font-medium text-[#410C1B] bg-[#CB8C96]/20 border border-[#CB8C96]/40 px-4 py-2 rounded-full inline-flex items-center gap-2 animate-bounce"
        >
          <span>✨</span>
          <span>{validationError}</span>
        </div>
      )}

      <div className="w-full flex items-center justify-between">
        {/* Understated back link */}
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-[#32141D]/60 hover:text-[#32141D] transition-colors py-2 px-3 rounded-lg flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#32141D] cursor-pointer group"
          aria-label="Go back to previous question"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>back</span>
        </button>

        {/* Deep wine rounded button */}
        <button
          type="button"
          onClick={onNext}
          className="bg-[#410C1B] text-[#F8F6F0] text-sm sm:text-base font-semibold px-6 sm:px-7 py-3 rounded-full border border-[#32141D] shadow-[3px_3px_0px_#32141D] hover:shadow-[4px_4px_0px_#32141D] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#32141D] transition-all cursor-pointer flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#410C1B]"
        >
          <span>{nextLabel}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
