import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { HeaderEyebrow } from '../HeaderEyebrow';
import { BouquetCard } from '../BouquetCard';
import { NavigationControls } from '../NavigationControls';

interface FlowerScreenProps {
  selectedFlowerId: string | null;
  onSelectFlower: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export const FlowerScreen: React.FC<FlowerScreenProps> = ({
  selectedFlowerId,
  onSelectFlower,
  onBack,
  onNext,
}) => {
  const config = SITE_CONFIG.flowers;
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleNextClick = () => {
    if (!selectedFlowerId) {
      setValidationError(config.validationMessage);
      return;
    }
    setValidationError(null);
    onNext();
  };

  const handleSelect = (id: string) => {
    setValidationError(null);
    onSelectFlower(id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center animate-fadeIn">
      <HeaderEyebrow
        eyebrow={config.eyebrow}
        heading={config.heading}
        supporting={config.supporting}
        center={true}
      />

      {/* 2-column grid of bouquet cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-2">
        {config.options.map((option) => (
          <BouquetCard
            key={option.id}
            option={option}
            isSelected={selectedFlowerId === option.id}
            onSelect={handleSelect}
            unselectedPill={config.unselectedPill}
            selectedPill={config.selectedPill}
          />
        ))}
      </div>

      <NavigationControls
        onBack={onBack}
        onNext={handleNextClick}
        validationError={validationError}
      />
    </div>
  );
};
