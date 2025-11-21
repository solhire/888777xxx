import React from 'react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="pt-48 pb-20 min-h-screen max-w-4xl mx-auto px-4">
      <h1 className="font-display font-black text-5xl text-white italic transform -skew-x-3 mb-8">
        TERMS OF SERVICE
      </h1>
      
      <div className="space-y-8 text-z-steel-gray font-mono">
        <p className="text-sm uppercase tracking-widest text-z-violet-base font-bold border-b border-z-violet-base/30 pb-2 mb-6">
          LAST UPDATED: NOV 20, 2025
        </p>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">1. ACCEPTANCE OF TERMS</h2>
          <p>
            By accessing or using the NEXIL platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service. NEXIL is a competitive gaming platform built on the Solana blockchain.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">2. ELIGIBILITY & WALLET CONNECTION</h2>
          <p>
            You must be at least 18 years old to use NEXIL. Access to the Service requires a compatible Solana wallet (e.g., Phantom). You are solely responsible for the security of your wallet and private keys. NEXIL has no custody over your funds and cannot recover lost assets.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">2A. LEGAL COMPLIANCE & GAMBLING DISCLAIMER</h2>
          <p className="text-red-400 font-bold mb-2">
            ⚠️ IMPORTANT LEGAL NOTICE
          </p>
          <p className="mb-3">
            Wagering on video games for money may constitute gambling under the laws of many jurisdictions. NEXIL does not provide legal advice regarding the legality of participation in your jurisdiction.
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              <strong>Jurisdiction Restrictions:</strong> You are responsible for determining whether participation in NEXIL tournaments and wagers is legal in your jurisdiction. NEXIL does not accept users from jurisdictions where online gambling is prohibited or restricted.
            </li>
            <li>
              <strong>No Legal Advice:</strong> NEXIL does not provide legal, tax, or regulatory advice. Consult with a qualified attorney in your jurisdiction before participating.
            </li>
            <li>
              <strong>Age Restrictions:</strong> You must be of legal age to gamble in your jurisdiction (typically 18 or 21 years old, depending on location).
            </li>
            <li>
              <strong>Prohibited Jurisdictions:</strong> Users from jurisdictions where online gambling is illegal are prohibited from using NEXIL. This may include, but is not limited to, certain U.S. states and countries with strict gambling prohibitions.
            </li>
            <li>
              <strong>Compliance:</strong> By using NEXIL, you represent and warrant that: (a) you are legally permitted to participate in skill-based gaming and wagering activities in your jurisdiction; (b) you are not located in a prohibited jurisdiction; and (c) your participation does not violate any applicable laws or regulations.
            </li>
          </ul>
          <p className="mt-3 text-yellow-400">
            NEXIL reserves the right to restrict access from any jurisdiction at its sole discretion. Failure to comply with applicable laws may result in account termination and forfeiture of funds.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">3. TOURNAMENTS & WAGERS</h2>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              <strong>Entry Fees:</strong> Participation in certain tournaments or wagers requires depositing SOL into escrow. All entry fees are final and non-refundable once a match has commenced.
            </li>
            <li>
              <strong>Payouts:</strong> Currently, winnings are distributed manually by the operations team after match verification. Smart contract-based automatic payouts are planned for future release. Manual processing introduces custodial risk until automation is deployed. NEXIL takes a platform fee (typically 2-5%) from the total prize pool to support development and operations.
            </li>
            <li>
              <strong>Disputes:</strong> In the event of a dispute (e.g., game crash, cheating allegation), funds may be frozen in escrow pending manual review by NEXIL administrators. Our decision is final.
            </li>
            <li>
              <strong>Custodial Risk:</strong> Until smart contract automation is live, payouts require manual processing which carries custodial risk. Users should only deposit funds they are comfortable with this risk.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">4. PROHIBITED CONDUCT</h2>
          <p>
            You agree not to engage in any of the following prohibited activities:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Using aimbots, wallhacks, or any third-party software to gain an unfair advantage.</li>
            <li>Colluding with other players to fix match results.</li>
            <li>Exploiting bugs or glitches in the platform or smart contracts.</li>
            <li>Harassing, threatening, or abusing other users.</li>
          </ul>
          <p className="mt-2 text-red-400">
            Violation of these rules will result in an immediate ban and potential forfeiture of escrowed funds.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">5. LIMITATION OF LIABILITY</h2>
          <p>
            NEXIL is provided on an "AS IS" and "AS AVAILABLE" basis. We are not liable for any losses due to blockchain network congestion, gas fees, smart contract failures, or price volatility of SOL. You acknowledge the risks inherent in cryptographic systems.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">6. INTELLECTUAL PROPERTY</h2>
          <p>
            All content, design, and code on NEXIL are the property of NEXIL or its licensors. "NEXIL," the NEXIL logo, and "Enter the Climb" are trademarks of the platform.
          </p>
        </section>

        <div className="pt-8 border-t border-z-steel-gray/20">
          <p className="text-xs">
            Questions? Contact support at <a href="mailto:support@nexil.gg" className="text-z-violet-peak hover:underline">support@nexil.gg</a> or join our Discord.
          </p>
        </div>
      </div>
    </div>
  );
};

