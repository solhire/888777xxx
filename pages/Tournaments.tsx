import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
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
    className="group relative overflow-hidden border border-z-steel-gray/30 bg-z-obsidian/50 hover:border-z-violet-base/50 transition-all duration-500 opacity-0 animate-fade-in-up cursor-pointer"
    style={{ animationDelay: `${delay}ms` }}
    onClick={() => onSelect(id)}
  >
    {/* Background Image with Gradient Overlay */}
    <div className="absolute inset-0 z-0">
      <img 
        src={image} 
        alt={title} 
        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40 ${isComingSoon ? 'grayscale' : ''}`} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-z-obsidian via-z-obsidian/50 to-transparent" />
    </div>

    {/* Coming Soon Overlay Badge */}
    {isComingSoon && (
      <div className="absolute top-4 right-4 z-20">
        <span className="bg-z-steel-gray/80 text-white text-[10px] font-bold px-2 py-1 rounded border border-white/20 backdrop-blur-sm uppercase tracking-wider">
          COMING SOON
        </span>
      </div>
    )}

    {/* Content */}
    <div className="relative z-10 p-6 h-full flex flex-col justify-end min-h-[320px]">
      <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
        {logoOverlay ? (
          <img 
            src={logoOverlay} 
            alt={title} 
            className={`w-full max-w-[240px] mb-4 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] ${isComingSoon ? 'opacity-80 grayscale' : ''}`}
          />
        ) : (
          <h3 className={`font-display font-black text-4xl italic uppercase mb-2 tracking-tighter text-shadow-lg ${isComingSoon ? 'text-z-steel-gray' : 'text-white'}`}>
            {title}
          </h3>
        )}
        
        <div className="space-y-1 mb-6">
          <div className={`flex items-center gap-2 font-mono text-sm font-bold ${isComingSoon ? 'text-z-steel-gray opacity-50' : 'text-z-violet-peak'}`}>
            <span className={`w-2 h-2 rounded-full ${isComingSoon ? 'bg-z-steel-gray' : 'bg-green-500 animate-pulse'}`} />
            {isComingSoon ? '0 LIVE TOURNAMENTS' : `${activeTournaments} LIVE TOURNAMENTS`}
          </div>
          <div className="text-z-steel-gray font-mono text-xs">
            PRIZE POOL: <span className={isComingSoon ? 'text-z-steel-gray' : 'text-white'}>{totalPrizePool}</span>
          </div>
        </div>

        <Button
          className={`w-full border-z-violet-base/50 ${
            isComingSoon ? 'bg-transparent text-z-steel-gray border-z-steel-gray/40' : 'group-hover:bg-z-violet-base group-hover:text-white'
          }`}
        >
          {isComingSoon ? 'VIEW BRIEFING' : 'VIEW LOBBIES'}
        </Button>
      </div>
    </div>
    
    {/* Hover Border Effect */}
    <div className={`absolute inset-0 border-2 border-z-violet-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isComingSoon ? 'hidden' : ''}`} />
  </div>
);

export const Tournaments: React.FC = () => {
  const navigate = useNavigate();
  const handleSelect = (id: string) => {
    navigate(`/tournaments/${id}`);
  };
  return (
    <div className="pt-48 pb-20 min-h-screen max-w-7xl mx-auto px-4">
      <header className="mb-16 opacity-0 animate-fade-in-up">
        <h1 className="font-display font-black text-6xl md:text-7xl text-white italic transform -skew-x-3 mb-4">
          SELECT ARENA
        </h1>
        <p className="text-z-onyx font-mono max-w-xl border-l-2 border-z-violet-base pl-4">
          Choose your game. Enter the tournament. Dominate the competition.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
};
