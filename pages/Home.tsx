import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { ZShard } from '../components/ZShard';
import { TournamentCountdown } from '../components/TournamentCountdown';
import { useUser } from '../context/UserContext';
import '../styles/howItWorks.css';

export const Home: React.FC = () => {
  const { user, isAuthenticated, login } = useUser();
  const isConnected = isAuthenticated && user;

  return (
    <div className="min-h-screen pt-40">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Abstract BG */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-z-violet-base/20 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block mb-6 animate-fade-in-up">
             <ZShard className="w-16 h-16 text-z-violet-peak mx-auto drop-shadow-[0_0_10px_rgba(180,108,255,0.5)]" />
          </div>
          <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl uppercase italic leading-[0.9] text-white tracking-tighter transform -skew-x-3 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            Ascend To<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-z-violet-base to-z-violet-peak">Your Peak</span>
          </h1>
          <p className="text-z-onyx font-mono md:text-lg max-w-2xl mx-auto mb-12 uppercase tracking-widest opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            {isConnected ? (
              <>
                You are logged in as <span className="text-white">{user!.username}</span>. Resume your climb.
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
                 <Button size="lg" className="w-full md:w-auto shadow-[0_0_30px_rgba(106,0,255,0.3)] hover:scale-105 transition-transform duration-300 bg-z-violet-base text-white">
                   Return to Dashboard
                 </Button>
               </Link>
             ) : (
               <Button
                 size="lg"
                 className="w-full md:w-auto shadow-[0_0_30px_rgba(106,0,255,0.3)] hover:scale-105 transition-transform duration-300"
                 onClick={login}
               >
                 Connect Phantom
               </Button>
             )}
             <Link to="/tournaments">
               <Button variant="outline" size="lg" className="w-full md:w-auto hover:scale-105 transition-transform duration-300">Explore Challenges</Button>
             </Link>
          </div>
        </div>
      </section>

      {/* Tournament Countdown */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <TournamentCountdown />
      </section>

      {/* How It Works */}
      <section className="how-it-works-wrapper">
        <div className="how-it-works">
          <h2>HOW IT WORKS</h2>
          <div className="hiw-track">
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
              <div className="hiw-step" key={step.title}>
                <div className="hiw-step-index">0{index + 1}</div>
                <div className="hiw-step-title">{step.title}</div>
                <div className="hiw-step-subtitle">{step.subtitle}</div>
                <p>{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section className="platform-section">
        <div className="platform-inner">
          <div className="platform-header">
            <p>WHY ZENTH</p>
            <h2>The Platform</h2>
            <span>Infrastructure built for escrowed wagers, telemetry, and instant releases.</span>
          </div>
          <div className="platform-grid">
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
              <div className="platform-card" key={block.title}>
                <div className="platform-card-title">{block.title}</div>
                <div className="platform-metric">
                  <span>{block.metric}</span>
                  <small>{block.metricLabel}</small>
                </div>
                <p>{block.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="platform-section" style={{ background: 'linear-gradient(180deg, #020202 0%, #0a0a0a 100%)', borderTop: 'none' }}>
        <div className="platform-inner">
          <div className="platform-header">
            <p>$ZENTH UTILITY</p>
            <h2>The Fuel</h2>
            <span>Powering the ecosystem with discounts, rewards, and governance.</span>
          </div>
          <div className="platform-grid">
            {[
              {
                title: 'Fee Discounts',
                metric: '20%',
                metricLabel: 'LOWER FEES',
                copy: 'Pay entry fees in $ZENTH to reduce platform costs. Smart contracts automatically burn a portion of fees.',
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
                copy: 'Earn $ZENTH through activity and challenges. Top performers receive rakeback from platform volume.',
              },
            ].map((block) => (
              <div className="platform-card" key={block.title} style={{ borderColor: 'rgba(180, 108, 255, 0.15)' }}>
                <div className="platform-card-title" style={{ color: '#fff' }}>{block.title}</div>
                <div className="platform-metric">
                  <span style={{ color: '#b46cff', textShadow: '0 0 10px rgba(180,108,255,0.3)' }}>{block.metric}</span>
                  <small style={{ color: 'rgba(255,255,255,0.5)' }}>{block.metricLabel}</small>
                </div>
                <p>{block.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
