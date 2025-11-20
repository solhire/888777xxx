import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Button } from '../components/Button';
import { useUser } from '../context/UserContext';

export const Admin: React.FC = () => {
  const { contractAddress, updateContractAddress, isAdmin } = useAdmin();
  const { user } = useUser();
  const [newCA, setNewCA] = useState(contractAddress);

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4 pt-32">
        <div className="max-w-md">
            <h1 className="text-4xl font-display font-bold text-red-500 mb-4">UNAUTHORIZED</h1>
            <p className="text-z-steel-gray font-mono">You do not have permission to access this node.</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateContractAddress(newCA);
    alert("Contract Address Banner Updated.");
  };

  return (
    <div className="min-h-screen pt-40 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-display font-bold text-white mb-8 italic">ADMIN CONSOLE</h1>
      
      <div className="bg-z-obsidian border border-z-steel-gray/20 p-8 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-6">Global Configuration</h2>
        
        <div className="mb-6">
            <label className="block text-z-steel-gray text-xs font-mono uppercase mb-2">
                Official Contract Address (Banner)
            </label>
            <div className="flex gap-4">
                <input 
                    type="text" 
                    value={newCA}
                    onChange={(e) => setNewCA(e.target.value)}
                    className="flex-1 bg-black/40 border border-z-steel-gray/30 px-4 py-3 text-white font-mono focus:outline-none focus:border-z-violet-base transition-colors"
                    placeholder="Enter CA..."
                />
                <Button onClick={handleSave}>UPDATE BANNER</Button>
            </div>
            <p className="mt-2 text-xs text-z-steel-gray/70">
                This will immediately update the red banner visible on all pages.
            </p>
        </div>
      </div>
    </div>
  );
};

