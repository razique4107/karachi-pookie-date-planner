import React, { useState } from 'react';
import { SITE_CONFIG, KarachiDateFoodOption, BouquetOption } from '../../config/siteConfig';
import { DynamicDateOption } from '../../utils/dateUtils';
import { Copy, Check, RotateCcw, Heart, Calendar, Utensils, Sparkles } from 'lucide-react';

interface ConfirmationScreenProps {
  selectedFood: KarachiDateFoodOption | undefined;
  selectedFlower: BouquetOption | undefined;
  selectedDate: DynamicDateOption | null | undefined;
  onStartOver: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  selectedFood,
  selectedFlower,
  selectedDate,
  onStartOver,
}) => {
  const config = SITE_CONFIG.confirmation;
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  // Dynamic date string formatted with weekday, day, month, year
  const dateFormatted = selectedDate 
    ? selectedDate.fullLabel
    : "Saturday, 17 October 2026";

  // Build the copyable invite summary text (never includes phone number)
  const generateInviteText = (): string => {
    const foodTitle = selectedFood ? `${selectedFood.title} (${selectedFood.description})` : 'Chai & Snacks';
    const flowerTitle = selectedFlower ? `${selectedFlower.title} (${selectedFlower.description})` : 'Pretty flowers';
    
    return [
      "✨ Official Date Confirmation ✨",
      `📅 Date: ${dateFormatted}`,
      `☕ Date Spot: ${foodTitle}`,
      `💐 Flowers: ${flowerTitle}`,
      "Ab bas tum, main, chai aur thori si main-character energy.",
      `— ${config.signature}`
    ].join("\n");
  };

  const handleCopy = async () => {
    const textToCopy = generateInviteText();
    let success = false;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        success = true;
      } catch {
        success = false;
      }
    }

    // Fallback if clipboard API is restricted
    if (!success) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        success = true;
      } catch {
        success = false;
      }
    }

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4 sm:py-8 animate-fadeIn">
      {/* Dusty-pink italic eyebrow */}
      <div className="text-center sm:text-left mb-6">
        <p 
          className="font-handwriting text-2xl sm:text-3xl text-[#CB8C96] tracking-wide inline-block"
          style={{ transform: 'rotate(-1deg)' }}
        >
          {config.eyebrow}
        </p>
      </div>

      {/* Two balanced columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center">
        {/* Left Column: Kitten Picture-Card Frame */}
        <div className="md:col-span-5 flex justify-center">
          <div className="w-full max-w-sm bg-white p-3 sm:p-4 rounded-3xl border-2 border-[#32141D] shadow-[5px_5px_0px_#32141D] transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F2EB] border border-[#32141D]/20">
              {!imageError ? (
                <img
                  src={config.kittenImage}
                  alt={config.kittenAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#FDFBF7] text-[#32141D]">
                  <Heart className="w-12 h-12 text-[#ED2517] mb-2 fill-[#ED2517]" />
                  <span className="font-handwriting text-2xl text-[#32141D]">joyful kitten</span>
                </div>
              )}
            </div>
            
            {/* Caption beneath photo inside card */}
            <div className="pt-3 pb-1 text-center">
              <p className="font-handwriting text-xl sm:text-2xl text-[#32141D]/80 select-none">
                {config.cardCaption}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Heading, Dynamic Date, Summary Chips, Copy CTA, Start Over */}
        <div className="md:col-span-7 flex flex-col text-center md:text-left">
          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#32141D] tracking-tight leading-[1.15] mb-4 [text-wrap:balance]">
            {config.heading}
          </h1>

          {/* Dynamic Date Highlight */}
          <div className="mb-4">
            <p className="text-xl sm:text-2xl text-[#32141D] font-semibold flex flex-wrap items-center justify-center md:justify-start gap-1.5">
              <span>See you</span>
              <span className="font-handwriting text-2xl sm:text-3xl text-[#CB8C96] font-bold italic tracking-wide">
                {dateFormatted}
              </span>
            </p>
          </div>

          {/* Supporting copy */}
          <p className="text-[#32141D]/80 text-base sm:text-lg font-normal leading-relaxed mb-6 max-w-lg [text-wrap:balance]">
            {config.supporting}
          </p>

          {/* Compact summary chips */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6 text-xs sm:text-sm text-[#32141D]/85">
            {selectedDate && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DDF0E8] border border-[#32141D]/20 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#32141D]" />
                {selectedDate.fullLabel}
              </span>
            )}
            {selectedFood && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#32141D]/15 font-medium shadow-sm">
                <Utensils className="w-3.5 h-3.5 text-[#CB8C96]" />
                {selectedFood.title}
              </span>
            )}
            {selectedFlower && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#32141D]/15 font-medium shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#ED2517]" />
                {selectedFlower.title}
              </span>
            )}
          </div>

          {/* Action Row: Yellow Pill Button & Start Over Link */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 mb-6">
            {/* Prominent Yellow Pill-Shaped Button (#F3D34D) */}
            <button
              type="button"
              onClick={handleCopy}
              className="w-full sm:w-auto bg-[#F3D34D] text-[#32141D] text-base sm:text-lg font-bold px-7 sm:px-8 py-3.5 rounded-full border-2 border-[#32141D] shadow-[3px_3px_0px_#32141D] hover:shadow-[4px_4px_0px_#32141D] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#32141D] transition-all cursor-pointer flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-[#32141D]"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-[#32141D]" />
                  <span>{config.copiedButtonText}</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 text-[#32141D]" />
                  <span>{config.copyButtonText}</span>
                </>
              )}
            </button>

            {/* Understated Start Over Link */}
            <button
              type="button"
              onClick={onStartOver}
              className="text-sm sm:text-base font-semibold text-[#32141D]/65 hover:text-[#32141D] underline underline-offset-4 decoration-[#32141D]/30 hover:decoration-[#32141D] transition-colors py-2 px-1 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{config.startOverText}</span>
            </button>
          </div>

          {/* Discreet Signature */}
          <div className="pt-2 border-t border-[#32141D]/10">
            <p className="text-xs sm:text-sm text-[#32141D]/60 font-medium">
              {config.signature}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
