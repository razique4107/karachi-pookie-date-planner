/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from './config/siteConfig';
import { DynamicDateOption } from './utils/dateUtils';
import { BackgroundShapes } from './components/BackgroundShapes';
import { ProgressBar } from './components/ProgressBar';
import { FooterPill } from './components/FooterPill';
import { InvitationScreen } from './components/screens/InvitationScreen';
import { FoodScreen } from './components/screens/FoodScreen';
import { FlowerScreen } from './components/screens/FlowerScreen';
import { DateScreen } from './components/screens/DateScreen';
import { PhoneScreen } from './components/screens/PhoneScreen';
import { ConfirmationScreen } from './components/screens/ConfirmationScreen';

type ScreenState = 'invitation' | 'food' | 'flowers' | 'date' | 'phone' | 'confirmation';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('invitation');
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);
  const [selectedFlowerId, setSelectedFlowerId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<DynamicDateOption | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // Scroll to top whenever screen transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen]);

  // Map screen state to numerical step (1-6)
  const getStepNumber = (): number => {
    switch (screen) {
      case 'invitation':
        return 1;
      case 'food':
        return 2;
      case 'flowers':
        return 3;
      case 'date':
        return 4;
      case 'phone':
        return 5;
      case 'confirmation':
        return 6;
      default:
        return 1;
    }
  };

  // Find active data objects from config
  const selectedFood = SITE_CONFIG.food.options.find(
    (item) => item.id === selectedFoodId
  );
  const selectedFlower = SITE_CONFIG.flowers.options.find(
    (item) => item.id === selectedFlowerId
  );

  // Complete reset to clean state (resets all selections, phone, calendar, and returns to Screen 1)
  const handleStartOver = () => {
    setSelectedFoodId(null);
    setSelectedFlowerId(null);
    setSelectedDate(null);
    setPhoneNumber('');
    setScreen('invitation');
  };

  return (
    <div className="relative min-h-screen bg-[#F8F6F0] text-[#32141D] flex flex-col justify-between font-sans selection:bg-[#CB8C96]/30 selection:text-[#32141D]">
      {/* Background Soft Mint Shapes */}
      <BackgroundShapes />

      {/* Thin Coral-Red Progress Line along top */}
      <ProgressBar currentStep={getStepNumber()} totalSteps={6} />

      {/* Main Container */}
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-8 sm:pt-12 pb-12 flex-1 flex flex-col justify-center">
        {screen === 'invitation' && (
          <InvitationScreen onAccept={() => setScreen('food')} />
        )}

        {screen === 'food' && (
          <FoodScreen
            selectedFoodId={selectedFoodId}
            onSelectFood={(id) => setSelectedFoodId(id)}
            onBack={() => setScreen('invitation')}
            onNext={() => setScreen('flowers')}
          />
        )}

        {screen === 'flowers' && (
          <FlowerScreen
            selectedFlowerId={selectedFlowerId}
            onSelectFlower={(id) => setSelectedFlowerId(id)}
            onBack={() => setScreen('food')}
            onNext={() => setScreen('date')}
          />
        )}

        {screen === 'date' && (
          <DateScreen
            selectedDate={selectedDate}
            onSelectDate={(date) => setSelectedDate(date)}
            onBack={() => setScreen('flowers')}
            onNext={() => setScreen('phone')}
          />
        )}

        {screen === 'phone' && (
          <PhoneScreen
            phoneNumber={phoneNumber}
            onChangePhoneNumber={setPhoneNumber}
            onBack={() => setScreen('date')}
            onSubmit={() => setScreen('confirmation')}
          />
        )}

        {screen === 'confirmation' && (
          <ConfirmationScreen
            selectedFood={selectedFood}
            selectedFlower={selectedFlower}
            selectedDate={selectedDate}
            onStartOver={handleStartOver}
          />
        )}
      </main>

      {/* Tiny unobtrusive footer pill */}
      <FooterPill />
    </div>
  );
}
