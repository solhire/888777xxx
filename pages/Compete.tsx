import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { api } from '../services/api';
import { Challenge } from '../types';

const ChallengeRow: React.FC<{ challenge: Challenge; delay: number }> = ({ challenge, delay }) => (
  <div 
    className="flex flex-col md:flex-row justify-between items-center p-6 bg-z-obsidian/30 border-b border-z-steel-gray/10 hover:bg-z-obsidian/60 hover:border-z-violet-base/30 transition-all duration-300 group opacity-0 animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex-1 w-full md:w-auto mb-4 md:mb-0">
      <div className="flex items-center gap-3 mb-2">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm 
          ${challenge.difficulty === 'EASY' ? 'bg-green-500/20 text-green-400' : 
            challenge.difficulty === 'MED' ? 'bg-yellow-500/20 text-yellow-400' : 
            challenge.difficulty === 'HARD' ? 'bg-orange-500/20 text-orange-400' : 
            'bg-red-500/20 text-red-500'}`}>
          {challenge.difficulty}
        </span>
        <h3 className="font-display font-bold text-xl text-white italic">{challenge.title}</h3>
      </div>
      <div className="flex items-center gap-4 text-sm font-mono text-z-steel-gray">
        <span>ENTRY: FREE</span>
        <span>•</span>
        <span>{challenge.participants} PLAYERS</span>
      </div>
    </div>

    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
      <div className="text-right">
        <div className="text-xs text-z-steel-gray font-bold uppercase">Prize Pool</div>
        <div className="text-2xl font-display font-bold text-z-violet-peak group-hover:text-white transition-colors shadow-z-violet-base drop-shadow-[0_0_8px_rgba(106,0,255,0.5)]">
          {challenge.reward} SOL
        </div>
      </div>
      <Button size="sm" className="transform skew-x-0">JOIN</Button>
    </div>
  </div>
);

export const Compete: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await api.getChallenges();
        setChallenges(data);
      } catch (error) {
        console.error("Failed to fetch challenges:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen max-w-7xl mx-auto px-4">
      <header className="mb-16 opacity-0 animate-fade-in-up">
        <h1 className="font-display font-black text-6xl text-white italic transform -skew-x-3 mb-4">
          ACTIVE CHALLENGES
        </h1>
        <p className="text-z-onyx font-mono max-w-xl border-l-2 border-z-violet-base pl-4">
          Select your arena. Prove your worth. Payouts are automated upon match verification.
        </p>
      </header>

      <div className="bg-z-obsidian/40 border border-z-steel-gray/20 backdrop-blur-sm opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="px-4 py-3 bg-z-steel-gray/10 border-b border-z-steel-gray/20 flex justify-between items-center">
          <span className="font-mono text-xs text-z-violet-base font-bold">LIVE FEED_</span>
          <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-xs text-red-400 font-bold">ONLINE PLAYERS</span>
          </div>
        </div>
        
        <div className="divide-y divide-z-steel-gray/10">
          {isLoading ? (
             <div className="p-8 text-center text-z-steel-gray font-mono animate-pulse">Loading challenges...</div>
          ) : challenges.length === 0 ? (
             <div className="p-8 text-center text-z-steel-gray font-mono">No active challenges found.</div>
          ) : (
            challenges.map((c, i) => (
              <ChallengeRow key={c.title} challenge={c} delay={300 + (i * 100)} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
