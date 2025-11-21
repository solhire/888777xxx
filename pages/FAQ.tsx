import React from 'react';

const faqs = [
  {
    question: 'How do I get paid?',
    answer:
      'Currently, payouts are processed manually by the tournament operations team after match verification. Prize pools are held in escrow until winners are confirmed. Smart contract-based automatic payouts are planned for future release. Please note that manual processing introduces custodial risk until the automated system is deployed.',
  },
  {
    question: 'Is this safe?',
    answer:
      'All wallet interactions happen through Phantom via secure message signing. NEXIL never sees your private keys. We require proof-of-play (replays, screenshots) to prevent fraudulent claims. However, until smart contract automation is live, payouts require manual processing which carries custodial risk. Users should only deposit funds they are comfortable with this risk.',
  },
  {
    question: 'What if my game crashes?',
    answer:
      'Open a dispute ticket from the match details panel. Submit your replay or crash log within 15 minutes. The match will be paused and reviewed by moderators before any SOL moves.',
  },
  {
    question: 'Is this legal in my jurisdiction?',
    answer:
      'Wagering on video games for money may be considered gambling in many jurisdictions. NEXIL does not provide legal advice. Users are responsible for ensuring their participation complies with local laws. We do not accept users from jurisdictions where online gambling is prohibited. By using NEXIL, you represent that you are legally permitted to participate in your jurisdiction.',
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
          Everything you need to know about wallets, payouts, and match disputes on NEXIL.
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

