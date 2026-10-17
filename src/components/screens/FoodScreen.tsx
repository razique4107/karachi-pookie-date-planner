import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { HeaderEyebrow } from '../HeaderEyebrow';
import { FoodCard } from '../FoodCard';
import { NavigationControls } from '../NavigationControls';

interface FoodScreenProps {
  selectedFoodId: string | null;
  onSelectFood: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export const FoodScreen: React.FC<FoodScreenProps> = ({
  selectedFoodId,
  onSelectFood,
  onBack,
  onNext,
}) => {
  const config = SITE_CONFIG.food;
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleNextClick = () => {
    if (!selectedFoodId) {
      setValidationError(config.validationMessage);
      return;
    }
    setValidationError(null);
    onNext();
  };

  const handleSelect = (id: string) => {
    setValidationError(null);
    onSelectFood(id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center animate-fadeIn">
      <HeaderEyebrow
        eyebrow={config.eyebrow}
        heading={config.heading}
        supporting={config.supporting}
        center={true}
      />

      {/* Balanced 2-column grid on tablet/desktop, 1-column on mobile */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mt-2">
        {config.options.map((option) => (
          <FoodCard
            key={option.id}
            option={option}
            isSelected={selectedFoodId === option.id}
            onSelect={handleSelect}
            unselectedPill={config.unselectedPill}
            selectedPill={config.selectedPill}
          />
        ))}
      </div>

      {/* Footnote as specified */}
      <div className="mt-4 text-center">
        <p className="text-xs sm:text-sm text-[#32141D]/60 italic font-medium">
          💡 {config.footnote}
        </p>
      </div>

      <NavigationControls
        onBack={onBack}
        onNext={handleNextClick}
        validationError={validationError}
      />
    </div>
  );
};
