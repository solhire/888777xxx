import React from 'react';
import { useAdmin } from '../context/AdminContext';

export const AdminBanner: React.FC = () => {
  const { contractAddress } = useAdmin();

  if (!contractAddress) return null;

  return (
    <div className="w-full bg-gradient-to-r from-z-violet-base via-z-violet-peak to-z-violet-base backdrop-blur-sm text-white py-1 px-4 text-center font-mono text-xs md:text-sm border-b border-z-violet-peak/50 shadow-[0_0_30px_rgba(180,108,255,0.6)] animate-fade-in relative z-40">
      <span className="font-bold mr-2 drop-shadow-[0_0_8px_rgba(180,108,255,0.8)]">OFFICIAL CA:</span>
      <span className="select-all drop-shadow-[0_0_6px_rgba(180,108,255,0.6)]">{contractAddress}</span>
    </div>
  );
};

