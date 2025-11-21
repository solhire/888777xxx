import React from 'react';
import { useUser } from '../context/UserContext';
import { Button } from '../components/Button';
import { useToast } from '../context/ToastContext';

export const Referrals: React.FC = () => {
  const { user, isAuthenticated, login } = useUser();
  const { pushToast } = useToast();

  const copyReferralLink = () => {
    if (!user?.referralCode) return;
    const link = `${window.location.origin}?ref=${user.referralCode}`;
    navigator.clipboard.writeText(link);
    pushToast({ message: 'Referral link copied to clipboard', variant: 'success' });
  };

  const copyReferralCode = () => {
    if (!user?.referralCode) return;
    navigator.clipboard.writeText(user.referralCode);
    pushToast({ message: 'Referral code copied', variant: 'success' });
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen pt-48 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-display text-white italic mb-4">ACCESS DENIED</h1>
        <p className="text-z-onyx font-mono mb-6">Login to access your referral command center.</p>
        <Button onClick={login}>CONNECT PHANTOM</Button>
      </div>
    );
  }

  return (
    <div className="pt-48 pb-20 min-h-screen max-w-5xl mx-auto px-4">
      <header className="mb-12 opacity-0 animate-fade-in-up">
        <h1 className="font-display font-black text-5xl md:text-6xl text-white italic transform -skew-x-3 mb-4">
          AFFILIATE NETWORK
        </h1>
        <p className="text-z-onyx font-mono max-w-xl border-l-2 border-z-violet-base pl-4">
          Expand the ZENTH network. Earn 10% of platform fees from every match your recruits play.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
        
        {/* Left Column: Stats */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-z-obsidian border border-z-steel-gray/20 p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-z-violet-base/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
             <h3 className="text-z-steel-gray text-xs font-bold uppercase mb-2">Total Recruits</h3>
             <div className="text-5xl font-display font-bold text-white italic">
                {user.referralCount || 0}
             </div>
             <p className="text-z-steel-gray text-xs font-mono mt-2">Active Agents</p>
          </div>

          <div className="bg-z-obsidian border border-z-steel-gray/20 p-6">
             <h3 className="text-z-steel-gray text-xs font-bold uppercase mb-2">Total Earnings</h3>
             <div className="text-5xl font-display font-bold text-z-violet-peak italic">
                {user.referralEarnings || 0}
                <span className="text-xl ml-2 text-white not-italic">SOL</span>
             </div>
             <p className="text-z-steel-gray text-xs font-mono mt-2">Paid automatically to your wallet</p>
          </div>

          <div className="p-6 border border-z-violet-base/30 bg-z-violet-base/5 rounded-lg">
             <h3 className="text-z-violet-base font-bold mb-2">Your Code</h3>
             <div 
               className="bg-black/50 border border-z-steel-gray/30 p-4 text-center font-mono text-2xl text-white font-bold tracking-widest cursor-pointer hover:border-z-violet-base transition-colors"
               onClick={copyReferralCode}
             >
                {user.referralCode || 'GEN-ERROR'}
             </div>
             <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={copyReferralLink}
             >
                COPY INVITE LINK
             </Button>
          </div>
        </div>

        {/* Right Column: Info & Tier */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-z-obsidian/60 border border-z-steel-gray/20 p-8">
             <h2 className="text-2xl font-display font-bold text-white italic mb-6">COMMISSION STRUCTURE</h2>
             
             <div className="space-y-6">
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-z-violet-base/10 rounded flex items-center justify-center text-z-violet-peak font-bold text-xl border border-z-violet-base/20">1</div>
                   <div>
                      <h3 className="text-white font-bold text-lg">Share Your Link</h3>
                      <p className="text-z-steel-gray text-sm font-mono mt-1">
                         Send your unique referral link to friends or your community. When they connect and register, they are permanently tagged as your recruit.
                      </p>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-z-violet-base/10 rounded flex items-center justify-center text-z-violet-peak font-bold text-xl border border-z-violet-base/20">2</div>
                   <div>
                      <h3 className="text-white font-bold text-lg">They Play, You Earn</h3>
                      <p className="text-z-steel-gray text-sm font-mono mt-1">
                         Every time a recruit enters a paid tournament or wager, you receive 10% of the platform fee generated from their entry.
                      </p>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-z-violet-base/10 rounded flex items-center justify-center text-z-violet-peak font-bold text-xl border border-z-violet-base/20">3</div>
                   <div>
                      <h3 className="text-white font-bold text-lg">Instant Settlement</h3>
                      <p className="text-z-steel-gray text-sm font-mono mt-1">
                         Commissions are paid out via smart contract immediately when the match concludes. No waiting for monthly payouts.
                      </p>
                   </div>
                </div>
             </div>
          </div>

          {/* Tiers Mockup */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="bg-z-obsidian border border-z-violet-base p-4 relative">
                <div className="absolute top-0 right-0 bg-z-violet-base text-black text-[10px] font-bold px-2 py-1">ACTIVE</div>
                <h4 className="text-white font-bold italic">SCOUT</h4>
                <p className="text-z-violet-base font-mono text-xs mb-2">0 - 100 Recruits</p>
                <ul className="text-z-steel-gray text-xs space-y-1 font-mono">
                   <li>• 10% Commission</li>
                   <li>• Basic Analytics</li>
                </ul>
             </div>
             <div className="bg-z-obsidian border border-z-steel-gray/20 p-4 opacity-50 grayscale">
                <h4 className="text-white font-bold italic">VANGUARD</h4>
                <p className="text-z-steel-gray font-mono text-xs mb-2">101 - 500 Recruits</p>
                <ul className="text-z-steel-gray text-xs space-y-1 font-mono">
                   <li>• 15% Commission</li>
                   <li>• Verified Badge</li>
                </ul>
             </div>
             <div className="bg-z-obsidian border border-z-steel-gray/20 p-4 opacity-50 grayscale">
                <h4 className="text-white font-bold italic">WARLORD</h4>
                <p className="text-z-steel-gray font-mono text-xs mb-2">500+ Recruits</p>
                <ul className="text-z-steel-gray text-xs space-y-1 font-mono">
                   <li>• 20% Commission</li>
                   <li>• Custom URL</li>
                </ul>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

