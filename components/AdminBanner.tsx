import React from 'react';
import { useAdmin } from '../context/AdminContext';

export const AdminBanner: React.FC = () => {
  const { contractAddress } = useAdmin();

  if (!contractAddress) return null;

  return (
    <div className="w-full bg-gradient-to-r from-z-violet-base via-z-violet-peak to-z-violet-base backdrop-blur-sm text-white py-1.5 px-4 text-center font-mono text-[10px] md:text-xs tracking-widest border-b border-z-violet-peak/30 relative z-40 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
      <div className="relative z-10 flex items-center justify-center gap-2">
        <span className="font-bold opacity-80">OFFICIAL CA:</span>
        <span className="select-all font-bold text-white drop-shadow-md hover:text-z-bg transition-colors cursor-copy bg-white/10 px-2 py-0.5 rounded">{contractAddress}</span>
      </div>
    </div>
  );
};
