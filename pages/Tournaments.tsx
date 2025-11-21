import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { TournamentCountdown } from '../components/TournamentCountdown';
import { tournaments } from '../data/tournaments';

interface GameCardProps {
  id: string;
  title: string;
  image: string;
  logoOverlay?: string;
  activeTournaments: number;
  totalPrizePool: string;
  delay: number;
  isComingSoon?: boolean;
}

const GameCard: React.FC<GameCardProps & { onSelect: (id: string) => void }> = ({ id, title, image, logoOverlay, activeTournaments, totalPrizePool, delay, isComingSoon, onSelect }) => (
  <div 
    className="group relative overflow-hidden rounded-lg border border-z-steel-gray/20 bg-z-obsidian/60 hover:border-z-violet-base/60 transition-all duration-700 opacity-0 animate-fade-in-up cursor-pointer backdrop-blur-sm"
    style={{ animationDelay: `${delay}ms` }}
    onClick={() => onSelect(id)}
  >
    {/* Animated Background Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-z-violet-base/0 via-z-violet-base/0 to-z-violet-peak/0 group-hover:from-z-violet-base/10 group-hover:via-z-violet-base/5 group-hover:to-z-violet-peak/10 transition-all duration-700 blur-xl"></div>
    
    {/* Background Image with Dynamic Overlay */}
    <div className="absolute inset-0 z-0">
      <img 
        src={image} 
        alt={title} 
        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-125 ${isComingSoon ? 'grayscale opacity-30' : 'opacity-20 group-hover:opacity-30'}`} 
      />
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-z-obsidian/40 to-z-obsidian ${isComingSoon ? 'to-z-obsidian' : 'group-hover:to-z-obsidian/80'} transition-all duration-700`} />
      <div className="absolute inset-0 bg-gradient-to-t from-z-obsidian via-transparent to-transparent" />
    </div>

    {/* Corner Accent */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-z-violet-base/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-z-violet-peak/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    {/* Coming Soon Badge */}
    {isComingSoon && (
      <div className="absolute top-4 right-4 z-20">
        <div className="relative">
          <span className="bg-z-steel-gray/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded border border-z-steel-gray/50 uppercase tracking-wider shadow-lg">
            COMING SOON
          </span>
          <div className="absolute inset-0 bg-z-steel-gray/20 blur-sm -z-10"></div>
        </div>
      </div>
    )}

    {/* Content */}
    <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[400px]">
      {/* Top Section */}
      <div>
        {logoOverlay ? (
          <div className="mb-6">
            <img 
              src={logoOverlay} 
              alt={title} 
              className={`w-full max-w-[200px] object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:scale-105 ${isComingSoon ? 'opacity-60 grayscale' : 'opacity-100'}`} 
            />
          </div>
        ) : (
          <h3 className={`font-display font-black text-5xl md:text-6xl italic uppercase mb-6 tracking-tighter transition-all duration-500 group-hover:scale-105 ${isComingSoon ? 'text-z-steel-gray' : 'text-white drop-shadow-[0_0_20px_rgba(180,108,255,0.3)]'}`}>
            {title}
          </h3>
        )}
      </div>

      {/* Bottom Section */}
      <div className="space-y-4">
        {/* Stats */}
        <div className="space-y-3">
          <div className={`flex items-center gap-3 font-mono text-sm font-bold transition-all duration-300 ${isComingSoon ? 'text-z-steel-gray/60' : 'text-z-violet-peak group-hover:text-white'}`}>
            <div className={`relative ${isComingSoon ? '' : 'group-hover:scale-125 transition-transform'}`}>
              <span className={`w-3 h-3 rounded-full ${isComingSoon ? 'bg-z-steel-gray' : 'bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]'}`} />
              {!isComingSoon && (
                <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></span>
              )}
            </div>
            <span className="uppercase tracking-wider">
              {isComingSoon ? '0 LIVE TOURNAMENTS' : `${activeTournaments} LIVE TOURNAMENTS`}
            </span>
          </div>
          
          {/* Prize Pool - Enhanced */}
          <div className="bg-z-obsidian/60 backdrop-blur-sm border border-z-violet-base/20 rounded-lg p-4 group-hover:border-z-violet-base/40 group-hover:bg-z-obsidian/80 transition-all duration-500">
            <div className="text-[10px] text-z-steel-gray font-mono uppercase tracking-widest mb-1">PRIZE POOL</div>
            <div className={`text-3xl font-display font-bold transition-all duration-300 ${isComingSoon ? 'text-z-steel-gray' : 'text-z-violet-peak group-hover:text-white drop-shadow-[0_0_15px_rgba(180,108,255,0.5)]'}`}>
              {totalPrizePool}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          className={`w-full border-2 transition-all duration-500 ${
            isComingSoon 
              ? 'bg-transparent text-z-steel-gray border-z-steel-gray/40 hover:border-z-steel-gray/60' 
              : 'bg-z-violet-base/10 border-z-violet-base/50 text-z-violet-peak group-hover:bg-z-violet-base group-hover:text-white group-hover:border-z-violet-peak group-hover:shadow-[0_0_25px_rgba(180,108,255,0.6)] group-hover:scale-105'
          }`}
        >
          {isComingSoon ? 'VIEW BRIEFING' : 'ENTER ARENA'}
        </Button>
      </div>
    </div>
    
    {/* Hover Border Glow Effect */}
    <div className={`absolute inset-0 border-2 border-z-violet-base opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none rounded-lg ${isComingSoon ? 'hidden' : ''} shadow-[0_0_40px_rgba(180,108,255,0.4)]`} />
    
    {/* Scanline Effect on Hover */}
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none ${isComingSoon ? 'hidden' : ''}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent h-full animate-pulse" style={{ animationDuration: '3s' }}></div>
    </div>
  </div>
);

export const Tournaments: React.FC = () => {
  const navigate = useNavigate();
  const handleSelect = (id: string) => {
    navigate(`/tournaments/${id}`);
  };
  
  return (
    <div className="pt-48 pb-20 min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-z-violet-base/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-z-violet-peak/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="mb-12 opacity-0 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-z-violet-base/50 to-z-violet-base/50"></div>
            <div className="w-3 h-3 bg-z-violet-base rounded-full animate-pulse shadow-[0_0_15px_rgba(106,0,255,0.6)]"></div>
            <div className="h-px flex-grow bg-gradient-to-l from-transparent via-z-violet-base/50 to-z-violet-base/50"></div>
          </div>
          <h1 className="font-display font-black text-6xl md:text-8xl text-white italic transform -skew-x-3 mb-6 text-center">
            SELECT ARENA
          </h1>
          <p className="text-z-onyx font-mono text-center max-w-2xl mx-auto text-lg border-l-2 border-r-2 border-z-violet-base/30 px-6 py-2">
            Choose your game. Enter the tournament. Compete for prizes.
          </p>
        </header>

        {/* Tournament Countdown */}
        <div className="mb-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <TournamentCountdown />
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((game, index) => (
            <GameCard 
              key={game.id} 
              id={game.id}
              title={game.title}
              image={game.image}
              logoOverlay={game.logoOverlay}
              activeTournaments={game.activeTournaments}
              totalPrizePool={game.totalPrizePool}
              isComingSoon={game.status !== 'live'}
              delay={200 + (index * 100)} 
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
