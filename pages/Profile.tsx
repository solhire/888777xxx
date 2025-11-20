import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Button } from '../components/Button';
import { UsernameModal } from '../components/UsernameModal';
import { useToast } from '../context/ToastContext';

const formatAddress = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`;

export const Profile: React.FC = () => {
  const { user, updateUsername, isAuthenticated, login } = useUser();
  const { pushToast } = useToast();
  const [showEditModal, setShowEditModal] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-display text-white italic mb-4">PROFILE LOCKED</h1>
        <p className="text-z-onyx font-mono mb-6">Connect your Phantom wallet to manage your identity.</p>
        <Button onClick={login}>CONNECT PHANTOM</Button>
      </div>
    );
  }

  return (
    <div className="pt-48 pb-20 min-h-screen max-w-4xl mx-auto px-4">
      <header className="mb-10">
        <p className="text-xs font-mono text-z-violet-base uppercase tracking-[0.3em]">Control Room</p>
        <h1 className="font-display font-black text-5xl text-white italic transform -skew-x-3 mt-2">
          Welcome back, {user.username}
        </h1>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-z-obsidian/60 border border-z-steel-gray/20 p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-z-onyx uppercase font-mono">Codename</p>
              <p className="text-3xl font-display text-white">{user.username}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => setShowEditModal(true)}>
              CHANGE
            </Button>
          </div>

          <div>
            <p className="text-xs text-z-onyx uppercase font-mono mb-1">Wallet</p>
            <div className="flex items-center gap-2">
              <span className="text-white font-mono">{formatAddress(user.walletAddress)}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(user.walletAddress);
                  pushToast({ message: 'Wallet address copied', variant: 'info' });
                }}
              >
                COPY
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="border border-z-steel-gray/20 py-3">
              <p className="text-xs text-z-onyx">Level</p>
              <p className="text-2xl text-white font-display">{user.level}</p>
            </div>
            <div className="border border-z-steel-gray/20 py-3">
              <p className="text-xs text-z-onyx">Tier</p>
              <p className="text-2xl text-white font-display">{user.tier}</p>
            </div>
            <div className="border border-z-steel-gray/20 py-3">
              <p className="text-xs text-z-onyx">Joined</p>
              <p className="text-lg text-white font-mono">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-z-obsidian/60 border border-z-steel-gray/20 p-6 space-y-4">
          <h2 className="text-2xl font-display text-white">Connections</h2>
          <p className="text-z-onyx text-sm font-mono">
            Link your social and game clients to verify ownership. Coming soon: Riot, Steam, Discord, and Faceit.
          </p>
          <Button disabled className="w-full bg-z-steel-gray/20 text-z-steel-gray border-z-steel-gray/40">
            LINK DISCORD (SOON)
          </Button>
          <Button disabled className="w-full bg-z-steel-gray/20 text-z-steel-gray border-z-steel-gray/40">
            LINK STEAM (SOON)
          </Button>
        </div>
      </div>

      <UsernameModal
        isOpen={showEditModal}
        initialValue={user.username}
        title="Update Codename"
        subtitle="Call sign changes are broadcast to your rivals."
        confirmLabel="SAVE"
        onSubmit={async (nextName) => {
          await updateUsername(nextName);
          pushToast({ message: `Codename updated to ${nextName}`, variant: 'success' });
          setShowEditModal(false);
        }}
        onCancel={() => setShowEditModal(false)}
      />
    </div>
  );
};

