import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { VotingCountdown, useVotingOpen } from '../components/VotingCountdown';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';
import { signAuthenticationMessage } from '../services/walletService';
import { api } from '../services/api';

interface Proposal {
  id: string;
  title: string;
  description: string;
  currentVotes: number;
  percentage: number;
  category: 'INTEGRATION' | 'FEATURE';
}

const initialProposals: Proposal[] = [
  {
    id: 'game-rl',
    title: 'Rocket League',
    description: 'Vehicle soccer integration. 1v1 and 2v2 formats supported.',
    currentVotes: 0,
    percentage: 0,
    category: 'INTEGRATION',
  },
  {
    id: 'game-apex',
    title: 'Apex Legends',
    description: 'Battle Royale kill-race format. Trios and Duos.',
    currentVotes: 0,
    percentage: 0,
    category: 'INTEGRATION',
  },
  {
    id: 'game-sf6',
    title: 'Street Fighter 6',
    description: 'FGC support with 1v1 lobbies. Best of 5 format.',
    currentVotes: 0,
    percentage: 0,
    category: 'INTEGRATION',
  },
  {
    id: 'game-ow2',
    title: 'Overwatch 2',
    description: '5v5 Team Tactical integration with role queue.',
    currentVotes: 0,
    percentage: 0,
    category: 'INTEGRATION',
  },
  {
    id: 'feat-clans',
    title: 'Clan System',
    description: 'Persistent teams, clan tags, and clan vs. clan wagers.',
    currentVotes: 0,
    percentage: 0,
    category: 'FEATURE',
  },
  {
    id: 'feat-mobile',
    title: 'Mobile Companion',
    description: 'iOS/Android app for match notifications and wallet management.',
    currentVotes: 0,
    percentage: 0,
    category: 'FEATURE',
  },
];

const VoteCard: React.FC<{ proposal: Proposal; onVote: (id: string) => void; isVoting: boolean; hasVoted: boolean; isVotingOpen: boolean }> = ({ proposal, onVote, isVoting, hasVoted, isVotingOpen }) => (
  <div className="group relative bg-z-obsidian/40 border border-z-steel-gray/20 p-6 overflow-hidden hover:border-z-violet-base/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(106,0,255,0.15)] hover:-translate-y-1 backdrop-blur-sm flex flex-col h-full">
    {/* Holographic sheen effect */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    <div className="flex justify-between items-start mb-4 relative z-10">
      <span className="text-[10px] font-mono uppercase tracking-widest text-z-violet-base border border-z-violet-base/30 px-2 py-1 rounded bg-z-violet-base/5">
        {proposal.category}
      </span>
      <span className="text-z-steel-gray font-mono text-xs">
        {proposal.currentVotes.toLocaleString()} VOTES
      </span>
    </div>

    <h3 className="text-2xl font-display font-bold text-white italic mb-2 group-hover:text-z-violet-peak transition-colors">
      {proposal.title}
    </h3>
    
    <p className="text-z-steel-gray font-mono text-sm mb-6 flex-grow leading-relaxed">
      {proposal.description}
    </p>

    <div className="relative z-10 mt-auto space-y-4">
      {/* Progress Bar */}
      <div className="w-full bg-z-steel-gray/10 h-1 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-z-violet-base to-z-violet-peak transition-all duration-1000 ease-out group-hover:shadow-[0_0_10px_#b46cff]"
          style={{ width: `${proposal.percentage}%` }}
        />
      </div>
      <div className="flex justify-between text-xs font-mono text-z-steel-gray">
        <span>CONSENSUS</span>
        <span>{proposal.percentage}%</span>
      </div>

      <Button 
        onClick={() => onVote(proposal.id)}
        variant="outline" 
        className="w-full group-hover:bg-z-violet-base group-hover:text-white group-hover:border-transparent transition-all"
        disabled={isVoting || hasVoted || !isVotingOpen}
      >
        {isVoting ? 'VERIFYING...' : hasVoted ? 'VOTE CAST' : !isVotingOpen ? 'VOTING CLOSED' : 'CAST VOTE'}
      </Button>
    </div>
  </div>
);

export const Vote: React.FC = () => {
  const { user, login } = useUser();
  const { pushToast } = useToast();
  const [proposals, setProposals] = useState(initialProposals);
  const [votingId, setVotingId] = useState<string | null>(null);
  const [userVotedProposals, setUserVotedProposals] = useState<Set<string>>(new Set());
  const isVotingOpen = useVotingOpen();

  // Load votes on mount
  useEffect(() => {
    const loadVotes = async () => {
      try {
        const allVotes = await api.getAllProposalVotes();
        const totalVotes = Object.values(allVotes).reduce((sum, count) => sum + count, 0);

        setProposals(prev => prev.map(p => {
          const votes = allVotes[p.id] || 0;
          const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
          return { ...p, currentVotes: votes, percentage };
        }));

        // Check if user has voted
        if (user?.walletAddress) {
          const votedSet = new Set<string>();
          for (const proposal of initialProposals) {
            const hasVoted = await api.hasUserVoted(user.walletAddress, proposal.id);
            if (hasVoted) {
              votedSet.add(proposal.id);
            }
          }
          setUserVotedProposals(votedSet);
        }
      } catch (error) {
        console.error('Failed to load votes:', error);
      }
    };

    loadVotes();
  }, [user]);

  const handleVote = async (id: string) => {
    if (!user) {
      login();
      return;
    }

    // Check if voting is open
    if (!isVotingOpen) {
      pushToast({ message: 'Voting opens on Friday, November 21, 2025 at 2:00 PM EST.', variant: 'error' });
      return;
    }

    // Check if already voted
    if (userVotedProposals.has(id)) {
      pushToast({ message: 'You have already voted for this proposal.', variant: 'error' });
      return;
    }

    setVotingId(id);

    try {
      // Sign message to prove ownership
      const message = `Vote for proposal ${id} with wallet ${user.walletAddress}`;
      const result = await signAuthenticationMessage(message);

      if (result) {
        // Save vote to localStorage
        await api.castVote(user.walletAddress, id);

        // Reload all votes to recalculate percentages
        const allVotes = await api.getAllProposalVotes();
        const totalVotes = Object.values(allVotes).reduce((sum, count) => sum + count, 0);

        setProposals(prev => prev.map(p => {
          const votes = allVotes[p.id] || 0;
          const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
          return { ...p, currentVotes: votes, percentage };
        }));

        // Mark as voted
        setUserVotedProposals(prev => new Set(prev).add(id));

        pushToast({ message: 'Consensus Verified. Vote Logged.', variant: 'success' });
      }
    } catch (error: any) {
      console.error(error);
      pushToast({ message: error.message || 'Vote cancelled or failed.', variant: 'error' });
    } finally {
      setVotingId(null);
    }
  };

  return (
    <div className="pt-48 pb-20 min-h-screen max-w-7xl mx-auto px-4">
      <header className="mb-16 opacity-0 animate-fade-in-up">
        <h1 className="font-display font-black text-6xl md:text-7xl text-white italic transform -skew-x-3 mb-4">
          PROTOCOL GOVERNANCE
        </h1>
        <p className="text-z-onyx font-mono max-w-xl border-l-2 border-z-violet-base pl-4">
          Direct the future of ZENTH. Vote on integrations and features using your staked influence.
        </p>
      </header>

      {/* Voting Countdown */}
      <div className="mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <VotingCountdown />
      </div>

      {/* Voting Info Banner */}
      <div className="mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className={`bg-gradient-to-r from-z-violet-base/20 via-z-violet-peak/20 to-z-violet-base/20 border ${userVotedProposals.size > 0 ? 'border-z-violet-peak/50' : 'border-z-violet-base/30'} p-6 rounded-lg backdrop-blur-sm`}>
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-6 h-6 bg-z-violet-base/30 rounded-full flex items-center justify-center border ${userVotedProposals.size > 0 ? 'border-z-violet-peak/70' : 'border-z-violet-base/50'}`}>
              {userVotedProposals.size > 0 ? (
                <svg className="w-4 h-4 text-z-violet-peak" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-z-violet-peak" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-z-violet-peak font-display font-bold text-lg italic mb-2">
                {userVotedProposals.size > 0 ? 'VOTE CONFIRMED' : 'VOTING INFORMATION'}
              </h3>
              <div className="space-y-2 text-z-steel-gray font-mono text-sm">
                {userVotedProposals.size > 0 ? (
                  <>
                    <p>
                      <span className="text-z-violet-peak font-bold">✓</span> Your vote has been saved and verified on-chain.
                    </p>
                    <p>
                      <span className="text-z-violet-peak font-bold">•</span> Duplicate votes from the same wallet will not be logged. Your first vote is final.
                    </p>
                    <p>
                      <span className="text-z-violet-peak font-bold">•</span> Voting results will be announced on <span className="text-white font-bold">Friday, November 21, 2025 at 2:00 PM EST</span>, when tournaments launch.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <span className="text-z-violet-peak font-bold">•</span> Each wallet address can only vote once per proposal. Your vote will be saved and verified on-chain.
                    </p>
                    <p>
                      <span className="text-z-violet-peak font-bold">•</span> Duplicate votes from the same wallet will not be logged. Your first vote is final.
                    </p>
                    <p>
                      <span className="text-z-violet-peak font-bold">•</span> Voting results will be announced on <span className="text-white font-bold">Friday, November 21, 2025 at 2:00 PM EST</span>, when tournaments launch.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-16">
        {/* Section 1: Integrations */}
        <section className="opacity-0 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-grow bg-gradient-to-r from-z-violet-base/50 to-transparent"></div>
                <h2 className="font-display font-bold text-2xl text-white italic uppercase tracking-wider">Sector Expansion</h2>
                <div className="h-px flex-grow bg-gradient-to-l from-z-violet-base/50 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {proposals.filter(p => p.category === 'INTEGRATION').map((p, i) => (
                    <VoteCard 
                        key={p.id} 
                        proposal={p} 
                        onVote={handleVote} 
                        isVoting={votingId === p.id}
                        hasVoted={userVotedProposals.has(p.id)}
                        isVotingOpen={isVotingOpen}
                    />
                ))}
            </div>
        </section>

        {/* Section 2: Features */}
        <section className="opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-grow bg-gradient-to-r from-z-violet-base/50 to-transparent"></div>
                <h2 className="font-display font-bold text-2xl text-white italic uppercase tracking-wider">System Upgrades</h2>
                <div className="h-px flex-grow bg-gradient-to-l from-z-violet-base/50 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {proposals.filter(p => p.category === 'FEATURE').map((p, i) => (
                    <VoteCard 
                        key={p.id} 
                        proposal={p} 
                        onVote={handleVote} 
                        isVoting={votingId === p.id}
                        hasVoted={userVotedProposals.has(p.id)}
                        isVotingOpen={isVotingOpen}
                    />
                ))}
            </div>
        </section>
      </div>
    </div>
  );
};
