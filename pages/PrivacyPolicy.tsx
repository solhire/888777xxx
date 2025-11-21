import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-48 pb-20 min-h-screen max-w-4xl mx-auto px-4">
      <h1 className="font-display font-black text-5xl text-white italic transform -skew-x-3 mb-8">
        PRIVACY POLICY
      </h1>
      
      <div className="space-y-8 text-z-steel-gray font-mono">
         <p className="text-sm uppercase tracking-widest text-z-violet-base font-bold border-b border-z-violet-base/30 pb-2 mb-6">
          EFFECTIVE DATE: NOV 20, 2025
        </p>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">1. DATA COLLECTION</h2>
          <p>
            NEXIL prioritizes user anonymity. We collect minimal data necessary to operate the service:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Wallet Address:</strong> Your public Solana key is used as your primary identifier.</li>
            <li><strong>Gameplay Data:</strong> Match results, scores, and replay data are stored to verify wins and populate leaderboards.</li>
            <li><strong>Profile Information:</strong> Any username or alias you voluntarily provide.</li>
            <li><strong>Technical Data:</strong> IP address and browser type for security and fraud prevention.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">2. HOW WE USE YOUR DATA</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Facilitate tournament entry and prize distribution.</li>
            <li>Verify match outcomes and detect cheating.</li>
            <li>Display your rank and achievements on public leaderboards.</li>
            <li>Improve platform performance and fix bugs.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">3. BLOCKCHAIN TRANSPARENCY</h2>
          <p>
            Please be aware that all transactions on the Solana blockchain are public and permanent. Your wallet address and transaction history (e.g., entry fees paid, prizes won) are visible on the public ledger and cannot be hidden or deleted by NEXIL.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">4. DATA SHARING</h2>
          <p>
            We do not sell your personal data. We may share data with:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Service Providers:</strong> Hosting, analytics, and security vendors who assist in operating the platform.</li>
            <li><strong>Legal Authorities:</strong> If required by law or to protect the rights and safety of NEXIL and its users.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">5. COOKIES & TRACKING</h2>
          <p>
            We use local storage and session cookies to maintain your login state and preferences. We do not use third-party advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">6. SECURITY</h2>
          <p>
            We implement industry-standard security measures to protect our infrastructure. However, no method of transmission over the internet is 100% secure. You are responsible for securing your own wallet keys.
          </p>
        </section>

        <div className="pt-8 border-t border-z-steel-gray/20">
          <p className="text-xs">
            For privacy-related inquiries, contact <a href="mailto:privacy@nexil.gg" className="text-z-violet-peak hover:underline">privacy@nexil.gg</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

