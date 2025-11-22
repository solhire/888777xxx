import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { ZShard } from '../components/NexilMark';
import { TournamentCountdown } from '../components/TournamentCountdown';
import { useUser } from '../context/UserContext';
import { UsernameModal } from '../components/UsernameModal';
import { useToast } from '../context/ToastContext';

export const Home: React.FC = () => {
  const { user, isAuthenticated, login, register, logout } = useUser();
  const { pushToast } = useToast();
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get('ref');
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const isConnected = isAuthenticated && user;

  const handleConnect = async () => {
    if (isConnected) {
      // Already connected, maybe redirect to dashboard?
      // For now, we just return as the button usually changes to "Dashboard" when connected.
      return;
    }

    const loggedInUser = await login();
    const provider = window.solana;
    
    if (provider?.publicKey && !loggedInUser) {
      // Connected but needs registration
      setShowRegisterModal(true);
    } else if (loggedInUser) {
      pushToast({ message: `Signed in as ${loggedInUser.username}`, variant: 'success' });
    }
  };

  return (
    <div className="min-h-screen pt-32 overflow-hidden">
      <UsernameModal 
        isOpen={showRegisterModal} 
        initialValue=""
        initialReferralCode={refCode}
        onSubmit={async (username, referralCode) => {
            await register(username, referralCode);
            pushToast({ message: `Agent registered as ${username}`, variant: 'success' });
            setShowRegisterModal(false);
        }}
        onCancel={async () => {
            setShowRegisterModal(false);
            await logout(); 
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-z-violet-base/10 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-z-cyan/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 mask-gradient-radial"></div>
        </div>

        <div className="relative z-10 container-fluid text-center">
          <div className="inline-block mb-8 animate-fade-in-up">
             <ZShard className="w-20 h-20 text-z-violet-peak mx-auto drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]" />
          </div>
          
          <h1 className="heading-hero text-6xl md:text-8xl lg:text-9xl text-white mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            Ascend To<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-z-violet-base via-z-violet-peak to-white">Your Peak</span>
          </h1>
          
          <p className="text-z-text-secondary font-mono md:text-lg max-w-2xl mx-auto mb-12 uppercase tracking-widest opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            {isConnected ? (
              <>
                You are logged in as <span className="text-white font-bold">{user!.username}</span>. Resume your climb.
              </>
            ) : (
              <>
                The premier competitive platform on Solana. <br className="hidden md:block" /> Speed. Precision. Glory.
              </>
            )}
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center opacity-0 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
             {isConnected ? (
               <Link to="/dashboard">
                 <Button size="lg" variant="primary" className="min-w-[200px] shadow-lg shadow-z-violet-base/20">
                   Return to Dashboard
                 </Button>
               </Link>
             ) : (
               <Button
                 size="lg"
                 variant="primary"
                 className="min-w-[200px] shadow-lg shadow-z-violet-base/20"
                 onClick={handleConnect}
               >
                 Connect Phantom
               </Button>
             )}
             <Link to="/tournaments">
               <Button variant="outline" size="lg" className="min-w-[200px]">Explore Challenges</Button>
             </Link>
          </div>
        </div>
      </section>

      {/* Tournament Countdown */}
      <section className="container-fluid max-w-5xl mx-auto px-4 mb-24 relative z-20">
        <div className="card-glass border-z-violet-base/20">
           <TournamentCountdown />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative border-y border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="container-fluid max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="heading-section mb-4">HOW IT WORKS</h2>
            <div className="h-1 w-24 bg-z-violet-base mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Authenticate',
                subtitle: 'Wallet handshake',
                copy: 'Sign once with Phantom. Session tokens keep the climb secure.',
              },
              {
                title: 'Stake In',
                subtitle: 'Escrow entry',
                copy: 'Lock SOL for your chosen bracket. Funds never touch a hot wallet.',
              },
              {
                title: 'Verify Match',
                subtitle: 'Proof of play',
                copy: 'Upload replays or telemetry. Ops reviews disputes in under 15 minutes.',
              },
              {
                title: 'Payout',
                subtitle: 'Escrow release',
                copy: 'Winners receive payouts after match verification. Funds are released from escrow via smart contract once results are confirmed.',
              },
            ].map((step, index) => (
              <div className="card-base group hover:border-z-violet-base/30 min-h-[240px] flex flex-col" key={step.title}>
                <div className="absolute top-0 right-0 p-4 text-6xl font-display font-black italic text-white/[0.03] group-hover:text-z-violet-base/10 transition-colors duration-500 select-none">
                  0{index + 1}
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-display font-bold italic text-white mb-2 group-hover:text-z-violet-peak transition-colors">{step.title}</h3>
                  <div className="text-xs font-mono text-z-violet-base uppercase tracking-widest mb-4">{step.subtitle}</div>
                  <p className="text-z-text-secondary leading-relaxed text-sm">{step.copy}</p>
                </div>
                <div className="mt-auto pt-6">
                   <div className="w-full h-px bg-gradient-to-r from-z-violet-base/0 via-z-violet-base/50 to-z-violet-base/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section className="py-24 relative">
        <div className="container-fluid max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-z-violet-base tracking-widest mb-2">WHY NEXIL</p>
            <h2 className="heading-section mb-4">The Platform</h2>
            <span className="text-z-text-secondary block max-w-xl mx-auto">Infrastructure built for escrowed wagers, telemetry, and instant releases.</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Escrow System',
                metric: 'On-chain',
                metricLabel: 'Smart contract',
                copy: 'Entry fees are locked in program-derived escrow accounts. Funds remain secure until match completion. Winners receive automatic payouts via verified signatures.',
              },
              {
                title: 'Match Verification',
                metric: 'Human review',
                metricLabel: 'Moderator triage',
                copy: 'Replays, screenshots, and match data are reviewed by human moderators before payouts are processed. Automated verification systems are in development.',
              },
              {
                title: 'Ranking System',
                metric: 'Planned',
                metricLabel: 'In development',
                copy: 'Tier-based matchmaking and ranked economy features are planned for future releases. Current tournaments operate without tier restrictions.',
              },
            ].map((block) => (
              <div className="card-glass group hover:-translate-y-2 transition-transform duration-500" key={block.title}>
                <h3 className="text-xl font-display font-bold uppercase italic tracking-widest text-white mb-6 group-hover:text-z-violet-peak transition-colors">{block.title}</h3>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">{block.metric}</span>
                  <small className="text-xs font-mono text-z-violet-base uppercase tracking-widest">{block.metricLabel}</small>
                </div>
                <p className="text-z-text-secondary text-sm leading-relaxed">{block.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="py-24 relative bg-gradient-to-b from-z-bg to-black border-t border-white/5">
        <div className="container-fluid max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-z-violet-base tracking-widest mb-2">$NEXIL UTILITY</p>
            <h2 className="heading-section mb-4">The Fuel</h2>
            <span className="text-z-text-secondary block max-w-xl mx-auto">Powering the ecosystem with discounts, rewards, and governance.</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Fee Discounts',
                metric: '20%',
                metricLabel: 'LOWER FEES',
                copy: 'Pay entry fees in $NEXIL to reduce platform costs. Smart contracts automatically burn a portion of fees.',
              },
              {
                title: 'Premium Access',
                metric: '0%',
                metricLabel: 'WAGER FEES',
                copy: 'Holders can activate Premium status for fee-free wagers, exclusive high-roller tournaments, and profile perks.',
              },
              {
                title: 'Governance',
                metric: '1:1',
                metricLabel: 'VOTING POWER',
                copy: 'Direct the platform\'s future. Vote on new game integrations, tournament rule sets, and feature priorities.',
              },
              {
                title: 'Active Rewards',
                metric: 'Daily',
                metricLabel: 'PAYOUTS',
                copy: 'Earn $NEXIL through activity and challenges. Top performers receive rakeback from platform volume.',
              },
            ].map((block) => (
              <div className="card-base border-z-violet-base/10 hover:border-z-violet-base/30 bg-gradient-to-br from-z-card to-z-bg hover:from-z-card hover:to-z-violet-base/5" key={block.title}>
                <h3 className="text-lg font-display font-bold text-white mb-4">{block.title}</h3>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-z-violet-peak block mb-1">{block.metric}</span>
                  <small className="text-[10px] font-mono text-z-text-muted uppercase tracking-widest">{block.metricLabel}</small>
                </div>
                <p className="text-z-text-muted text-sm leading-relaxed group-hover:text-z-text-secondary transition-colors">{block.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
