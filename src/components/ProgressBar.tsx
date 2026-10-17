import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  // Calculate percentage: Step 1 (16.6%), Step 2 (33.3%), etc.
  const progressPercent = Math.min(100, Math.max(10, Math.round((currentStep / totalSteps) * 100)));

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 bg-[#32141D]/5 z-50 overflow-hidden" 
      role="progressbar" 
      aria-valuenow={progressPercent} 
      aria-valuemin={0} 
      aria-valuemax={100}
      aria-label={`Step ${currentStep} of ${totalSteps}`}
    >
      <div 
        className="h-full bg-[#ED2517] transition-all duration-300 ease-out" 
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
};
