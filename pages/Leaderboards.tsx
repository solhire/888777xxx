import React, { useEffect, useState } from 'react';
import { LeaderboardEntry } from '../types';
import { api } from '../services/api';

export const Leaderboards: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await api.getLeaderboard();
        setLeaderboardData(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="pt-48 pb-20 min-h-screen max-w-5xl mx-auto px-4">
      <div className="flex justify-between items-end mb-12 opacity-0 animate-fade-in-up">
        <h1 className="font-display font-black text-5xl md:text-7xl text-white italic transform -skew-x-3">
          SEASON 1 RANKINGS
        </h1>
      </div>

      <div className="overflow-x-auto opacity-0 animate-fade-in-up">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-z-violet-base text-z-steel-gray font-mono text-sm uppercase tracking-wider">
              <th className="py-4 pl-4">Rank</th>
              <th className="py-4">Player</th>
              <th className="py-4">Tier</th>
              <th className="py-4">Rating</th>
              <th className="py-4 text-right pr-4">Status</th>
            </tr>
          </thead>
          <tbody className="font-display text-lg">
            {isLoading ? (
               <tr>
                 <td colSpan={5} className="py-8 text-center text-z-steel-gray font-mono animate-pulse">
                   Loading rankings...
                 </td>
               </tr>
            ) : leaderboardData.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-z-steel-gray font-mono">
                  No rankings available yet.
                </td>
              </tr>
            ) : (
              leaderboardData.map((entry, i) => (
              <tr 
                key={entry.username} 
                className="border-b border-z-steel-gray/10 hover:bg-z-violet-base/5 transition-colors group opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${300 + (i * 100)}ms` }}
              >
                <td className="py-6 pl-4 font-bold text-2xl italic text-z-steel-gray group-hover:text-white transition-colors">
                  #{entry.rank.toString().padStart(2, '0')}
                </td>
                <td className="py-6 font-bold text-white tracking-wide">
                  {entry.username}
                </td>
                <td className="py-6">
                  <span className={`px-3 py-1 font-bold text-xs italic transform -skew-x-6 inline-block transition-transform group-hover:scale-105
                    ${entry.tier === 'S' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.2)]' : 'bg-z-steel-gray/20 text-z-onyx'}
                  `}>
                    TIER {entry.tier}
                  </span>
                </td>
                <td className="py-6 font-mono text-z-violet-peak group-hover:text-white transition-colors">
                  {entry.score}
                </td>
                <td className="py-6 text-right pr-4">
                    {entry.change > 0 ? (
                      <span className="text-green-500 text-sm">▲ {entry.change}</span>
                    ) : entry.change < 0 ? (
                      <span className="text-red-500 text-sm">▼ {Math.abs(entry.change)}</span>
                    ) : (
                      <span className="text-z-steel-gray text-sm">-</span>
                    )}
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
