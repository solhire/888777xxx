import React, { useState } from 'react';
import { Button } from './Button';

interface UsernameModalProps {
  isOpen: boolean;
  onSubmit: (username: string, referralCode?: string) => Promise<void>;
  onCancel: () => void;
  title?: string;
  subtitle?: string;
  confirmLabel?: string;
  initialValue?: string;
  initialReferralCode?: string | null;
}

export const UsernameModal: React.FC<UsernameModalProps> = ({
  isOpen,
  onSubmit,
  onCancel,
  title = 'INITIALIZE AGENT',
  subtitle = 'Establish your identity on the network.',
  confirmLabel = 'CONFIRM',
  initialValue = '',
  initialReferralCode = null,
}) => {
  const [username, setUsername] = useState(initialValue);
  const [referralCode, setReferralCode] = useState(initialReferralCode || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setUsername(initialValue);
      // Use the prop if it exists, otherwise keep local state or empty
      setReferralCode(initialReferralCode || ''); 
      setError('');
    }
  }, [isOpen, initialValue, initialReferralCode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
        setError("Username is required");
        return;
    }
    if (username.length < 3) {
        setError("Username must be at least 3 characters");
        return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onSubmit(username, referralCode || undefined);
    } catch (err) {
      console.error(err);
      setError("Request failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-z-obsidian border border-z-violet-base/30 p-8 shadow-[0_0_30px_rgba(106,0,255,0.2)] relative">
        <h2 className="text-3xl font-display font-bold text-white italic mb-2 transform -skew-x-3">
          {title}
        </h2>
        <p className="text-z-steel-gray font-mono text-sm mb-6">
          {subtitle}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-z-violet-base mb-2 uppercase tracking-wider">
                Codename
            </label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value.toUpperCase())}
              placeholder="ENTER_ALIAS"
              className="w-full bg-black/50 border border-z-steel-gray/30 text-white font-display font-bold text-xl px-4 py-3 focus:outline-none focus:border-z-violet-base transition-colors placeholder-z-steel-gray/30"
              maxLength={15}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-z-steel-gray mb-2 uppercase tracking-wider">
                Referral Code (Optional)
            </label>
            <input 
              type="text" 
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
              placeholder="REF-CODE"
              className="w-full bg-black/50 border border-z-steel-gray/30 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-z-violet-base transition-colors placeholder-z-steel-gray/30"
              maxLength={8}
              disabled={!!initialReferralCode} // Disable if it came from URL
            />
          </div>
          
          {error && <p className="text-red-500 text-xs font-mono mt-2">{error}</p>}

          <div className="flex gap-4">
             <Button 
               type="button"
               className="flex-1 bg-transparent border border-z-steel-gray text-z-steel-gray hover:bg-z-steel-gray/10"
               onClick={onCancel}
             >
               CANCEL
             </Button>
             <Button type="submit" className="flex-1" disabled={isSubmitting}>
               {isSubmitting ? 'PROCESSING...' : confirmLabel}
             </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
