import React from 'react';

const faqs = [
  {
    question: 'How do I get paid?',
    answer:
      'Prize pools are held in a secure escrow. When a match is verified, the smart contract releases SOL directly to the winner’s wallet. Until the contract is live, payouts are processed manually by the tournament ops team.',
  },
  {
    question: 'Is this safe?',
    answer:
      'All wallet interactions happen through Phantom via secure message signing. ZENTH never sees your private keys. We also require proof-of-play (replays, screenshots) to prevent fraudulent claims.',
  },
  {
    question: 'What if my game crashes?',
    answer:
      'Open a dispute ticket from the match details panel. Submit your replay or crash log within 15 minutes. The match will be paused and reviewed by moderators before any SOL moves.',
  },
];

export const FAQ: React.FC = () => {
  return (
    <div className="pt-48 pb-20 min-h-screen max-w-4xl mx-auto px-4">
      <header className="mb-12">
        <h1 className="font-display font-black text-5xl text-white italic transform -skew-x-3 mb-4">
          QUESTIONS?
        </h1>
        <p className="text-z-onyx font-mono border-l-2 border-z-violet-base pl-4">
          Everything you need to know about wallets, payouts, and match disputes on ZENTH.
        </p>
      </header>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            className="bg-z-obsidian/60 border border-z-steel-gray/20 p-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${150 + index * 75}ms` }}
          >
            <h2 className="text-white font-display text-2xl mb-3">{faq.question}</h2>
            <p className="text-z-onyx font-mono text-sm leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

