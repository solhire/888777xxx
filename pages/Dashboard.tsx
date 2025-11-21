import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { signAuthenticationMessage, getWalletBalance } from '../services/walletService';
import { api } from '../services/api';
import { RewardClaim } from '../types';
import { useUser } from '../context/UserContext';
import Avatar from 'boring-avatars';

// Helper for hex string
const toHexString = (byteArray: Uint8Array) => {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

// Placeholder token address (to be updated by user later)
const ZENTH_TOKEN_ADDRESS = "TokenAddressToByProvidedByUser"; 

export const Dashboard: React.FC = () => {
  const { user, isAuthenticated, login, isLoading: isAuthLoading } = useUser();
  const [balance, setBalance] = useState<number>(0);
  const [rewards, setRewards] = useState<RewardClaim[]>([]);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isCheckingHoldings, setIsCheckingHoldings] = useState(false);
  const [holderRewardClaimed, setHolderRewardClaimed] = useState(false);

  useEffect(() => {
    if (user && user.walletAddress) {
      loadData(user.walletAddress);
    } else {
      // Reset data if user logs out
      setBalance(0);
      setRewards([]);
    }
  }, [user]);

  const loadData = async (walletAddress: string) => {
    setIsDataLoading(true);
    try {
      const [rewardsData, balanceData] = await Promise.all([
        api.getRewards(walletAddress),
        getWalletBalance(walletAddress)
      ]);
      setRewards(rewardsData);
      setBalance(balanceData);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleClaim = async (id: string) => {
    if (!user?.walletAddress) return;
    setClaimingId(id);
    
    try {
      const message = `Sign this message to claim reward ${id}`;
      const authResult = await signAuthenticationMessage(message);
    
      if (authResult) {
        // Send signature to backend for verification and claim processing
        const sigHex = toHexString(authResult.signature);
        await api.claimReward(id, sigHex);
        
        // Optimistic update or re-fetch
        setRewards(prev => prev.map(r => r.id === id ? { ...r, status: 'claimed' as const } : r));
        // Refresh balance after claim
        const newBalance = await getWalletBalance(user.walletAddress);
        setBalance(newBalance);
        alert("Claim request sent successfully.");
    } else {
        alert("Authentication Failed or Cancelled");
      }
    } catch (error) {
      console.error("Claim failed:", error);
      alert("Failed to process claim. Please try again.");
    } finally {
      setClaimingId(null);
    }
  };

  const handleHolderClaim = async () => {
     if (!user?.walletAddress) return;
     setIsCheckingHoldings(true);
     
     try {
        // Check for real SOL balance first as a proxy for "activity" or "holdings"
        // in a real scenario we'd use getParsedTokenAccountsByOwner for SPL tokens
        const currentBalance = await getWalletBalance(user.walletAddress);
        
        // For now, we require > 0 SOL to prove it's not an empty burner
        const hasFunds = currentBalance > 0;

        if (hasFunds) {
           const message = `Claim Holder Reward for account ${user.walletAddress}`;
           const authResult = await signAuthenticationMessage(message);
           
           if (authResult) {
               setHolderRewardClaimed(true);
               // Optimistically add a small amount to local balance to show it worked
               setBalance(prev => prev + 0.05); 
               alert("Holder reward claimed successfully! +0.05 SOL (Simulated)");
           }
        } else {
            alert("Wallet is empty. You must hold assets to claim rewards.");
        }
     } catch (e) {
         console.error(e);
         alert("Error verifying holdings.");
     } finally {
         setIsCheckingHoldings(false);
     }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center text-center px-4">
         <div className="text-z-steel-gray font-mono animate-pulse">INITIALIZING DASHBOARD...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4 animate-fade-in">
        <div className="w-24 h-24 bg-z-steel-gray/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <span className="text-4xl">🔒</span>
        </div>
        <h1 className="text-4xl font-display font-bold text-white italic mb-4">ACCESS RESTRICTED</h1>
        <p className="text-z-onyx mb-8 font-mono">Connect your Phantom wallet to access your dashboard.</p>
        <Button onClick={login}>CONNECT PHANTOM</Button>
      </div>
    );
  }

  // XP Calculation
  const nextLevelXp = (user.level + 1) * 1000;
  const xpProgress = Math.min((user.xp / nextLevelXp) * 100, 100);

  return (
    <div className="pt-48 pb-20 min-h-screen max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left Column: Profile & Wallet */}
        <div className="md:col-span-1 space-y-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          
          {/* Profile Card */}
          <div className="bg-z-obsidian border border-z-steel-gray/20 p-6 hover:border-z-violet-base/30 transition-colors duration-300">
             <div className="w-20 h-20 rounded-full mb-4 border-2 border-white shadow-[0_0_15px_rgba(106,0,255,0.3)] overflow-hidden">
                <Avatar
                  size={80}
                  name={user.walletAddress}
                  variant="beam"
                  colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                />
             </div>
             <h2 className="text-xs text-z-steel-gray font-mono font-bold uppercase mb-1">WELCOME BACK,</h2>

             <h2 className="text-2xl font-display font-bold text-white italic mb-4 flex items-center gap-2">
               {user.username}
               {user.walletAddress === "4nW6MkoZbLuTouoqvRzoZWCyFVypCKu9R3wRCxZZCTkV" && (
                   <img src="/verif.png" alt="Verified" className="w-5 h-5" title="Verified Official" />
               )}
             </h2>
             <p className="text-z-steel-gray font-mono text-xs break-all mb-4 bg-black/30 p-2 rounded border border-z-steel-gray/10">
               {user.walletAddress}
             </p>
             
             <div className="flex gap-2 mb-4">
               <span className="bg-z-violet-base/20 text-z-violet-peak px-2 py-1 text-xs font-bold border border-z-violet-base/30">LVL {user.level}</span>
               <span className="bg-z-steel-gray/10 text-z-steel-gray px-2 py-1 text-xs font-bold border border-z-steel-gray/30">
                 {user.isPremium ? 'PREMIUM' : 'FREE'}
               </span>
             </div>

             {/* XP Progress Bar */}
             <div className="mb-6">
                <div className="flex justify-between text-[10px] text-z-steel-gray font-mono mb-1">
                    <span>XP {user.xp}</span>
                    <span>{nextLevelXp} XP</span>
                </div>
                <div className="w-full h-2 bg-z-steel-gray/10 rounded-full overflow-hidden border border-z-steel-gray/10">
                    <div 
                        className="h-full bg-gradient-to-r from-z-violet-base to-z-violet-peak transition-all duration-500"
                        style={{ width: `${xpProgress}%` }}
                    ></div>
                </div>
                <div className="text-right text-[10px] text-z-steel-gray font-mono mt-1">
                    Next Level: {Math.floor(xpProgress)}%
                </div>
             </div>
             
             <div className="pt-4 border-t border-z-steel-gray/10 flex flex-col gap-2">
               <Link to="/profile">
                 <Button size="sm" variant="outline" className="w-full text-xs">EDIT PROFILE</Button>
               </Link>
               <div className="text-z-steel-gray text-[10px] font-mono text-center">
                  Registered: {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
               </div>
             </div>
          </div>

          {/* Referrals Summary Card */}
          <div className="bg-gradient-to-br from-z-obsidian to-z-violet-base/5 border border-z-steel-gray/20 p-6">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-z-steel-gray text-xs font-bold uppercase">Affiliate Stats</h3>
                <Link to="/referrals" className="text-z-violet-peak text-[10px] font-bold uppercase hover:underline">View Full</Link>
            </div>
            <div className="flex justify-between items-end mb-4">
                <div>
                    <div className="text-2xl font-display font-bold text-white italic">{user.referralCount || 0}</div>
                    <div className="text-[10px] text-z-steel-gray font-mono">RECRUITS</div>
                </div>
                <div className="text-right">
                    <div className="text-xl font-display font-bold text-z-violet-peak">{user.referralEarnings || 0} SOL</div>
                    <div className="text-[10px] text-z-steel-gray font-mono">EARNED</div>
                </div>
            </div>
            <Link to="/referrals">
                <Button size="sm" className="w-full bg-z-violet-base/10 border-z-violet-base/30 text-z-violet-peak hover:bg-z-violet-base/20">
                    INVITE AGENTS
                </Button>
            </Link>
          </div>

          {/* Wallet Card */}
          <div className="bg-z-obsidian border border-z-steel-gray/20 p-6">
            <h3 className="text-z-steel-gray text-xs font-bold uppercase mb-4">Wallet Balance</h3>
            <div className="text-4xl font-display font-bold text-white">
              {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} 
              <span className="text-z-violet-base ml-2">SOL</span>
            </div>
          </div>

          {/* Holder Rewards Card */}
          <div className="bg-z-obsidian border border-z-violet-base/20 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-z-violet-base/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <h3 className="text-z-violet-peak text-xs font-bold uppercase mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-z-violet-peak rounded-full animate-pulse"></span>
                Holder Rewards
            </h3>
            <p className="text-z-steel-gray text-xs font-mono mb-4">
                Hold SOL or $ZENTH to claim daily rewards.
            </p>
            {holderRewardClaimed ? (
                <div className="text-center py-2 bg-z-violet-base/10 border border-z-violet-base/30 text-z-violet-peak font-bold text-sm rounded">
                    REWARD CLAIMED
                </div>
            ) : (
                <Button 
                    size="sm" 
                    className="w-full bg-z-violet-base/10 hover:bg-z-violet-base/20 border border-z-violet-base/50 text-z-violet-peak"
                    onClick={handleHolderClaim}
                    disabled={isCheckingHoldings}
                >
                    {isCheckingHoldings ? 'VERIFYING...' : 'CLAIM BONUS'}
                </Button>
            )}
          </div>
        </div>

        {/* Right Column: Rewards Feed */}
        <div className="md:col-span-2 opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <h2 className="text-3xl font-display font-bold text-white italic mb-6 border-l-4 border-z-violet-base pl-4">
            REWARD CENTER
          </h2>
          
          {isDataLoading ? (
             <div className="text-z-steel-gray font-mono animate-pulse">Loading rewards data...</div>
          ) : rewards.length === 0 ? (
             <div className="bg-z-obsidian/30 border border-z-steel-gray/10 p-8 text-center">
               <p className="text-z-onyx font-mono">No rewards currently available.</p>
             </div>
          ) : (
          <div className="space-y-4">
            {rewards.map((reward, i) => (
              <div 
                key={reward.id} 
                className="bg-z-obsidian/50 border border-z-steel-gray/20 p-6 flex flex-col sm:flex-row justify-between items-center gap-4 opacity-0 animate-fade-in-up hover:bg-z-obsidian transition-colors"
                style={{ animationDelay: `${400 + (i * 100)}ms` }}
              >
                <div>
                  <h4 className="text-white font-bold text-lg italic">{reward.title}</h4>
                  <p className="text-z-steel-gray text-sm font-mono">{reward.timestamp}</p>
                </div>
                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-xl font-display font-bold text-z-violet-peak">{reward.amountSol} SOL</div>
                  {reward.status === 'available' ? (
                    <Button 
                      size="sm" 
                      onClick={() => handleClaim(reward.id)}
                      disabled={claimingId === reward.id}
                      className="min-w-[100px]"
                    >
                      {claimingId === reward.id ? 'SIGNING...' : 'CLAIM'}
                    </Button>
                  ) : (
                    <span className="text-z-steel-gray font-mono text-xs uppercase border border-z-steel-gray/30 px-3 py-2 select-none">
                      CLAIMED
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          )}
        </div>

      </div>
    </div>
  );
};
