import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { HeaderEyebrow } from '../HeaderEyebrow';
import { ArrowLeft, Send, Phone } from 'lucide-react';

interface PhoneScreenProps {
  phoneNumber: string;
  onChangePhoneNumber: (value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export const PhoneScreen: React.FC<PhoneScreenProps> = ({
  phoneNumber,
  onChangePhoneNumber,
  onBack,
  onSubmit,
}) => {
  const config = SITE_CONFIG.phone;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validatePhone = (val: string): boolean => {
    const trimmed = val.trim();
    if (!trimmed) return false;

    // Strip spaces, dashes, dots, parentheses
    const cleaned = trimmed.replace(/[\s\-\(\)\.]/g, '');

    // 1. Pakistani local mobile: starts with 03 followed by 9 digits (total 11 digits)
    const isPakistaniLocal = /^03\d{9}$/.test(cleaned);

    // 2. Pakistani international mobile: starts with +923 or 923 or 00923 followed by 9 digits
    const isPakistaniIntl = /^(\+92|92|0092)3\d{9}$/.test(cleaned);

    // 3. General international format: optional +, between 7 and 15 digits
    const isGeneralIntl = /^\+?\d{7,15}$/.test(cleaned);

    return isPakistaniLocal || isPakistaniIntl || isGeneralIntl;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      setErrorMessage("Please enter your number so I can coordinate with you!");
      return;
    }
    if (!validatePhone(phoneNumber)) {
      setErrorMessage(config.invalidErrorMessage);
      return;
    }
    setErrorMessage(null);
    onSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    onChangePhoneNumber(e.target.value);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center animate-fadeIn">
      <HeaderEyebrow
        eyebrow={config.eyebrow}
        heading={config.heading}
        supporting={config.supporting}
        center={true}
      />

      <form onSubmit={handleSubmit} className="w-full mt-4 flex flex-col items-center">
        <div className="w-full max-w-md">
          {/* Form Label */}
          <label 
            htmlFor="phone-input" 
            className="block text-xs sm:text-sm font-semibold tracking-wide text-[#32141D]/70 uppercase mb-2 ml-1"
          >
            {config.label}
          </label>

          {/* Large rounded telephone input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#32141D]/40">
              <Phone className="w-5 h-5" />
            </div>
            <input
              id="phone-input"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phoneNumber}
              onChange={handleChange}
              placeholder={config.placeholder}
              className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-white border text-lg sm:text-xl font-medium text-[#32141D] placeholder-[#32141D]/30 transition-all outline-none shadow-[2px_2px_0px_rgba(50,20,29,0.12)] focus:shadow-[3px_3px_0px_#32141D] focus:border-[#32141D] ${
                errorMessage ? 'border-[#ED2517] ring-1 ring-[#ED2517]' : 'border-[#32141D]/25'
              }`}
            />
          </div>

          {/* Understated inline error if invalid */}
          {errorMessage && (
            <p role="alert" className="mt-2.5 text-xs sm:text-sm font-medium text-[#ED2517] flex items-center gap-1.5 ml-1 animate-fadeIn">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </p>
          )}

          <p className="mt-3 text-xs text-[#32141D]/60 ml-1">
            {config.helpText}
          </p>
        </div>

        {/* Navigation buttons at bottom */}
        <div className="w-full max-w-md mt-10 pt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-medium text-[#32141D]/60 hover:text-[#32141D] transition-colors py-2 px-3 rounded-lg flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#32141D] cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>back</span>
          </button>

          <button
            type="submit"
            className="bg-[#410C1B] text-[#F8F6F0] text-sm sm:text-base font-semibold px-7 py-3.5 rounded-full border border-[#32141D] shadow-[3px_3px_0px_#32141D] hover:shadow-[4px_4px_0px_#32141D] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#32141D] transition-all cursor-pointer flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#410C1B]"
          >
            <span>{config.buttonText}</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
