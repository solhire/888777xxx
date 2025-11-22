import React from 'react';
import { AimTrainer } from '../components/minigames/AimTrainer';

export const Minigames: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen px-4 container-fluid relative">
        {/* Banner / Beta Notice */}
        <div className="w-full max-w-6xl mx-auto mb-8 animate-fade-in-up">
            <div className="bg-gradient-to-r from-z-violet-base/20 via-z-violet-peak/20 to-z-violet-base/20 border border-z-violet-peak/50 p-6 rounded-lg backdrop-blur-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <span className="bg-z-violet-base text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest rounded animate-pulse">BETA ACCESS</span>
                            <h2 className="text-z-violet-peak font-display font-bold text-xl italic">TRAINING PROTOCOLS ONLINE</h2>
                        </div>
                        <p className="text-z-steel-gray font-mono text-sm max-w-xl">
                            Current module: <span className="text-white">Neuro-Aim v1.0</span>. Additional simulation modules and <span className="text-z-cyan">SOL rewards</span> coming soon.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="text-right hidden md:block">
                           <div className="text-[10px] text-z-steel-gray font-mono uppercase tracking-widest">STATUS</div>
                           <div className="text-green-400 font-bold text-sm flex items-center justify-end gap-2">
                               <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]"></span>
                               OPERATIONAL
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>

      <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <h1 className="heading-hero text-5xl md:text-8xl text-white mb-4 transform -skew-x-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-z-cyan to-z-violet-peak">REFLEX</span> SIM
        </h1>
        <p className="text-z-text-secondary font-mono max-w-xl mx-auto uppercase tracking-widest text-sm md:text-base">
          Calibrate your precision. Prepare for the arena.
        </p>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <AimTrainer />
      </div>
    </div>
  );
};
