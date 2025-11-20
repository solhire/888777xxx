import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Clip } from '../types';

const ClipCard: React.FC<{ clip: Clip; delay: number }> = ({ clip, delay }) => (
  <div 
    className="group relative aspect-video bg-z-obsidian border border-z-steel-gray/20 overflow-hidden cursor-pointer opacity-0 animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Thumbnail Placeholder */}
    <div className="absolute inset-0 bg-z-steel-gray/10 group-hover:scale-105 transition-transform duration-500"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
      
    {/* Play Icon Overlay */}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
      </div>
    </div>
    
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <h3 className="font-display font-bold text-white text-lg italic mb-1 group-hover:text-z-violet-peak transition-colors">{clip.title}</h3>
      <div className="flex justify-between items-center text-xs font-mono text-z-steel-gray">
        <span className="text-z-onyx">BY {clip.author}</span>
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
          {clip.views}
        </div>
      </div>
    </div>
  </div>
);

export const Showcase: React.FC = () => {
  const [clips, setClips] = useState<Clip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClips = async () => {
      try {
        const data = await api.getClips();
        setClips(data);
      } catch (error) {
        console.error("Failed to fetch clips:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClips();
  }, []);

  return (
    <div className="pt-48 pb-20 min-h-screen max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 opacity-0 animate-fade-in-up">
        <div>
          <h1 className="font-display font-black text-6xl text-white italic transform -skew-x-3">
            THE HIGHLIGHTS
          </h1>
          <p className="text-z-onyx mt-2 font-mono">
            Submit your best runs. Get verified. Earn community rewards.
          </p>
        </div>
        <button className="px-6 py-3 border border-z-violet-base text-z-violet-base hover:bg-z-violet-base hover:text-white transition-all duration-300 uppercase font-bold text-sm tracking-widest hover:shadow-[0_0_15px_rgba(106,0,255,0.4)]">
          Submit Clip [+]
        </button>
      </div>

      {isLoading ? (
         <div className="text-center text-z-steel-gray font-mono animate-pulse">Loading highlights...</div>
      ) : clips.length === 0 ? (
         <div className="text-center text-z-steel-gray font-mono p-10 bg-z-obsidian/20 border border-z-steel-gray/10">
           No clips available at the moment.
         </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clips.map((clip, i) => (
            <ClipCard key={i} clip={clip} delay={200 + (i * 100)} />
        ))}
      </div>
      )}
    </div>
  );
};
