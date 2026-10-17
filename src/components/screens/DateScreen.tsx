import React, { useState, useMemo } from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { HeaderEyebrow } from '../HeaderEyebrow';
import { DateCard } from '../DateCard';
import { NavigationControls } from '../NavigationControls';
import { 
  DynamicDateOption, 
  generateDynamicDateOptions, 
  getKarachiTodayString, 
  parseDateInputToOption 
} from '../../utils/dateUtils';
import { Calendar, Check } from 'lucide-react';

interface DateScreenProps {
  selectedDate: DynamicDateOption | null;
  onSelectDate: (date: DynamicDateOption | null) => void;
  onBack: () => void;
  onNext: () => void;
}

export const DateScreen: React.FC<DateScreenProps> = ({
  selectedDate,
  onSelectDate,
  onBack,
  onNext,
}) => {
  const config = SITE_CONFIG.dates;
  const [validationError, setValidationError] = useState<string | null>(null);

  // Generate the 4 dynamic future date presets
  const dynamicPresets = useMemo(() => generateDynamicDateOptions(), []);
  const todayStr = useMemo(() => getKarachiTodayString(), []);

  // Sync calendar picker with current selectedDate
  const calendarValue = selectedDate?.dateKey ?? '';

  const handlePresetSelect = (preset: DynamicDateOption) => {
    setValidationError(null);
    onSelectDate(preset);
  };

  const handleCalendarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    if (!rawValue) {
      onSelectDate(null);
      setValidationError("Please select a date!");
      return;
    }

    // Reject past dates
    if (rawValue < todayStr) {
      onSelectDate(null);
      setValidationError("Please select today or an upcoming date in Asia/Karachi!");
      return;
    }

    setValidationError(null);
    const parsedOption = parseDateInputToOption(rawValue);
    if (parsedOption) {
      onSelectDate(parsedOption);
    }
  };

  const handleNextClick = () => {
    if (!selectedDate || selectedDate.dateKey < todayStr) {
      setValidationError(selectedDate ? "Please select today or an upcoming date in Asia/Karachi!" : config.validationMessage);
      return;
    }
    setValidationError(null);
    onNext();
  };

  // Check if current selection matches any of the 4 presets
  const isCustomDate = selectedDate && !dynamicPresets.some((p) => p.dateKey === selectedDate.dateKey);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center animate-fadeIn">
      <HeaderEyebrow
        eyebrow={config.eyebrow}
        heading={config.heading}
        supporting={config.supporting}
        center={true}
      />

      {/* 4 Dynamic Preset Date Cards */}
      <div className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-2 px-1">
        {dynamicPresets.map((preset) => (
          <DateCard
            key={preset.id}
            option={preset}
            isSelected={selectedDate?.dateKey === preset.dateKey}
            onSelect={handlePresetSelect}
          />
        ))}
      </div>

      {/* Calendar Picker Section */}
      <div className="w-full max-w-md mt-8 p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#32141D]/20 shadow-[2px_2px_0px_rgba(50,20,29,0.1)] flex flex-col items-center">
        <label 
          htmlFor="custom-date-picker" 
          className="text-xs sm:text-sm font-bold text-[#32141D]/80 mb-2 flex items-center gap-1.5"
        >
          <Calendar className="w-4 h-4 text-[#CB8C96]" />
          <span>{config.calendarLabel}</span>
        </label>

        <div className="w-full relative">
          <input
            id="custom-date-picker"
            type="date"
            min={todayStr}
            value={calendarValue}
            onChange={handleCalendarChange}
            className="w-full px-4 py-3 rounded-xl border border-[#32141D]/25 bg-[#FDFCF9] text-base font-semibold text-[#32141D] shadow-sm outline-none focus:border-[#32141D] focus:ring-1 focus:ring-[#32141D] cursor-pointer"
          />
        </div>

        {/* Selected date confirmation badge */}
        {selectedDate && (
          <div className="mt-3.5 px-3.5 py-1.5 rounded-full bg-[#DDF0E8] border border-[#32141D]/20 text-xs sm:text-sm font-semibold text-[#32141D] flex items-center gap-1.5 animate-fadeIn">
            <Check className="w-4 h-4 text-[#410C1B]" />
            <span>Selected: {selectedDate.fullLabel}</span>
            {isCustomDate && <span className="text-[11px] text-[#CB8C96]">(custom date)</span>}
          </div>
        )}
      </div>

      <NavigationControls
        onBack={onBack}
        onNext={handleNextClick}
        validationError={validationError}
      />
    </div>
  );
};
