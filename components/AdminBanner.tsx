import React from 'react';
import { useAdmin } from '../context/AdminContext';

export const AdminBanner: React.FC = () => {
  const { contractAddress } = useAdmin();

  if (!contractAddress) return null;

  return (
    <div className="w-full bg-red-600/90 backdrop-blur-sm text-white py-1 px-4 text-center font-mono text-xs md:text-sm border-b border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)] animate-fade-in relative z-40">
      <span className="font-bold mr-2">OFFICIAL CA:</span>
      <span className="select-all">{contractAddress}</span>
    </div>
  );
};

