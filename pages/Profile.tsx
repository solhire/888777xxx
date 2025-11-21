import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Button } from '../components/Button';
import { UsernameModal } from '../components/UsernameModal';
import { useToast } from '../context/ToastContext';
import Avatar from 'boring-avatars';

const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

export const Profile: React.FC = () => {
  const { user, updateUsername, isAuthenticated, login } = useUser();
  const { pushToast } = useToast();
  const [showEditModal, setShowEditModal] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-z-steel-gray/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <span className="text-4xl">🔒</span>
        </div>
        <h1 className="text-4xl font-display text-white italic mb-4">PROFILE LOCKED</h1>
        <p className="text-z-onyx font-mono mb-6">Connect your Phantom wallet to manage your identity.</p>
        <Button onClick={login}>CONNECT PHANTOM</Button>
      </div>
    );
  }

  // XP Calculation
  const nextLevelXp = (user.level + 1) * 1000;
  const xpProgress = Math.min((user.xp / nextLevelXp) * 100, 100);

  return (
    <div className="pt-48 pb-20 min-h-screen max-w-6xl mx-auto px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-z-violet-base/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-z-violet-peak/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <header className="mb-12 opacity-0 animate-fade-in-up">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-z-violet-base/50 shadow-[0_0_30px_rgba(106,0,255,0.5)] overflow-hidden bg-z-obsidian p-1">
                <Avatar
                  size={120}
                  name={user.walletAddress}
                  variant="beam"
                  colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                />
              </div>
              {user.walletAddress === "4nW6MkoZbLuTouoqvRzoZWCyFVypCKu9R3wRCxZZCTkV" && (
                <div className="absolute -bottom-2 -right-2 bg-z-violet-base rounded-full p-1.5 border-2 border-z-obsidian">
                  <img src="/verif.png" alt="Verified" className="w-6 h-6" title="Verified Official" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="font-display font-black text-5xl md:text-6xl text-white italic transform -skew-x-3">
                  {user.username}
                </h1>
              </div>
              <p className="text-z-steel-gray font-mono text-sm mb-4">
                {formatAddress(user.walletAddress)}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="bg-z-violet-base/20 text-z-violet-peak px-3 py-1 text-xs font-bold border border-z-violet-base/30 rounded">
                  LVL {user.level}
                </span>
                <span className="bg-z-steel-gray/10 text-z-steel-gray px-3 py-1 text-xs font-bold border border-z-steel-gray/30 rounded">
                  {user.isPremium ? 'PREMIUM' : 'STANDARD'}
                </span>
                <span className="bg-z-steel-gray/10 text-z-steel-gray px-3 py-1 text-xs font-bold border border-z-steel-gray/30 rounded">
                  TIER {user.tier}
                </span>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="bg-z-obsidian/60 border border-z-steel-gray/20 p-6 rounded-lg backdrop-blur-sm">
            <div className="flex justify-between text-xs text-z-steel-gray font-mono mb-2">
              <span>XP {user.xp.toLocaleString()}</span>
              <span>{nextLevelXp.toLocaleString()} XP</span>
            </div>
            <div className="w-full h-3 bg-z-steel-gray/10 rounded-full overflow-hidden border border-z-steel-gray/10">
              <div 
                className="h-full bg-gradient-to-r from-z-violet-base to-z-violet-peak transition-all duration-500 shadow-[0_0_10px_rgba(180,108,255,0.5)]"
                style={{ width: `${xpProgress}%` }}
              ></div>
            </div>
            <div className="text-right text-xs text-z-steel-gray font-mono mt-1">
              {Math.floor(xpProgress)}% to Level {user.level + 1}
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          {/* Left Column - Identity */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-z-obsidian/60 border border-z-steel-gray/20 p-6 rounded-lg backdrop-blur-sm hover:border-z-violet-base/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-z-violet-peak font-display font-bold text-lg italic">IDENTITY</h2>
                <Button size="sm" variant="outline" onClick={() => setShowEditModal(true)}>
                  EDIT
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-z-steel-gray font-mono uppercase mb-1">Codename</p>
                  <p className="text-2xl font-display text-white">{user.username}</p>
                </div>
                <div>
                  <p className="text-xs text-z-steel-gray font-mono uppercase mb-1">Wallet Address</p>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono text-sm break-all">{user.walletAddress}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(user.walletAddress);
                        pushToast({ message: 'Wallet address copied', variant: 'info' });
                      }}
                      className="flex-shrink-0"
                    >
                      COPY
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card - Retro Tech Style */}
            <div className="bg-z-obsidian border-2 border-white/20 p-6 backdrop-blur-sm relative overflow-hidden">
              {/* Scanline effect */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent h-full animate-pulse" style={{ animationDuration: '3s' }}></div>
              </div>
              
              <h2 className="text-z-violet-peak font-mono font-bold text-xl mb-6 tracking-wider" style={{ textShadow: '0 0 10px rgba(180,108,255,0.5)' }}>
                STATISTICS
              </h2>
              
              <div className="space-y-4 relative z-10">
                {/* Level and Tier Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-2 border-white/30 bg-black/40 p-4">
                    <p className="text-xs text-white font-mono uppercase mb-2 tracking-wider">LEVEL</p>
                    <p className="text-4xl font-mono text-white font-bold" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.8)' }}>
                      {user.level || '—'}
                    </p>
                  </div>
                  <div className="border-2 border-white/30 bg-black/40 p-4">
                    <p className="text-xs text-white font-mono uppercase mb-2 tracking-wider">TIER</p>
                    <p className="text-2xl font-mono text-white font-bold" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.8)' }}>
                      {user.tier === 'Unranked' || !user.tier ? 'Unranked' : `Tier ${user.tier}`}
                    </p>
                  </div>
                </div>
                
                {/* Member Since - Full Width */}
                <div className="border-2 border-white/30 bg-black/40 p-4">
                  <p className="text-xs text-white font-mono uppercase mb-2 tracking-wider">MEMBER SINCE</p>
                  <p className="text-xl font-mono text-white font-bold" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.8)' }}>
                    {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Links */}
          <div className="md:col-span-2">
            <div className="bg-z-obsidian/60 border border-z-steel-gray/20 p-6 rounded-lg backdrop-blur-sm">
              <h2 className="text-z-violet-peak font-display font-bold text-lg italic mb-4">QUICK LINKS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link to="/dashboard">
                  <Button variant="outline" className="w-full justify-start">
                    DASHBOARD
                  </Button>
                </Link>
                <Link to="/referrals">
                  <Button variant="outline" className="w-full justify-start">
                    REFERRALS
                  </Button>
                </Link>
                <Link to="/settings">
                  <Button variant="outline" className="w-full justify-start">
                    SETTINGS
                  </Button>
                </Link>
                <Link to="/tournaments">
                  <Button variant="outline" className="w-full justify-start">
                    TOURNAMENTS
                  </Button>
                </Link>
              </div>
            </div>
          </div>
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
