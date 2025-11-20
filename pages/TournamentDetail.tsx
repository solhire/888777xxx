import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tournaments } from '../data/tournaments';
import { Button } from '../components/Button';

export const TournamentDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const tournament = tournaments.find((t) => t.id === id);

  if (!tournament) {
    return null;
  }

  const isLive = tournament.status === 'live';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => navigate(-1)} />
      <div className="relative max-w-5xl w-full bg-z-obsidian border border-z-steel-gray/30 shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 relative">
            <img src={tournament.image} alt={tournament.title} className="h-full w-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className={`text-xs font-bold px-3 py-1 border uppercase tracking-widest ${isLive ? 'border-green-400 text-green-400' : 'border-z-steel-gray text-z-steel-gray'}`}>
                {isLive ? 'LIVE' : 'COMING SOON'}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xs font-mono text-z-onyx">ID: {tournament.id.toUpperCase()}</p>
              <h1 className="font-display text-4xl italic">{tournament.title}</h1>
              <p className="text-sm font-mono text-z-onyx mt-2">
                Prize Pool: <span className="text-z-violet-peak">{tournament.totalPrizePool}</span>
              </p>
            </div>
          </div>

          <div className="md:w-1/2 p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-white font-display text-2xl">Mission Brief</h2>
              <button className="text-z-steel-gray hover:text-white" onClick={() => navigate(-1)}>
                ✕
              </button>
            </div>

            <div>
              <h3 className="text-z-onyx font-mono text-xs uppercase tracking-widest mb-2">Rules of Engagement</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-z-steel-gray font-mono">
                {tournament.rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>

            <div className="border border-z-steel-gray/20 p-4">
              <h3 className="text-white font-display text-xl mb-2">Registered Pilots</h3>
              <p className="text-z-steel-gray text-sm font-mono">
                {tournament.registeredPlayers.length === 0
                  ? 'No pilots listed yet. Be the first to claim a slot once the gates open.'
                  : `${tournament.registeredPlayers.length} pilots verified.`}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {isLive ? (
                <Button size="lg" className="w-full">
                  JOIN LOBBY
                </Button>
              ) : (
                <Button disabled size="lg" className="w-full bg-transparent border-z-steel-gray/40 text-z-steel-gray cursor-not-allowed">
                  REGISTRATION LOCKED
                </Button>
              )}
              <Button variant="outline" size="lg" onClick={() => navigate(-1)}>
                BACK TO GAMES
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

