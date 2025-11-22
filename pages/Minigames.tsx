import React from 'react';
import { AimTrainer } from '../components/minigames/AimTrainer';

export const Minigames: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen px-4 container-fluid">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="heading-hero text-5xl md:text-7xl text-white mb-4">TRAINING SIM</h1>
        <p className="text-z-text-secondary font-mono max-w-xl mx-auto">
          Hone your reflexes before you wager. Scores are local-only for now.
        </p>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <AimTrainer />
      </div>
    </div>
  );
};

