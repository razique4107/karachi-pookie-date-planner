import React from 'react';

interface HeaderEyebrowProps {
  eyebrow: string;
  heading: string;
  supporting?: string;
  center?: boolean;
}

export const HeaderEyebrow: React.FC<HeaderEyebrowProps> = ({
  eyebrow,
  heading,
  supporting,
  center = true,
}) => {
  return (
    <div className={`mb-8 ${center ? 'text-center mx-auto' : ''} max-w-2xl`}>
      {/* Dusty-pink handwritten eyebrow accent */}
      <p 
        className="font-handwriting text-2xl sm:text-3xl text-[#CB8C96] tracking-wide mb-1 select-none"
        style={{ transform: 'rotate(-1deg)' }}
      >
        {eyebrow}
      </p>

      {/* Large dark-burgundy display heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#32141D] tracking-tight leading-[1.12] mb-3 [text-wrap:balance]">
        {heading}
      </h1>

      {/* Understated, readable supporting copy */}
      {supporting && (
        <p className="text-[#32141D]/75 text-base sm:text-lg font-normal leading-relaxed max-w-xl mx-auto [text-wrap:balance]">
          {supporting}
        </p>
      )}
    </div>
  );
};
