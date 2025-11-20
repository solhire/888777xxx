import React, { useState } from 'react';
import { Button } from './Button';

interface UsernameModalProps {
  isOpen: boolean;
  onSubmit: (username: string) => Promise<void>;
  onCancel: () => void;
  title?: string;
  subtitle?: string;
  confirmLabel?: string;
  initialValue?: string;
}

export const UsernameModal: React.FC<UsernameModalProps> = ({
  isOpen,
  onSubmit,
  onCancel,
  title = 'INITIALIZE AGENT',
  subtitle = 'Establish your identity on the network.',
  confirmLabel = 'CONFIRM',
  initialValue = '',
}) => {
  const [username, setUsername] = useState(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setUsername(initialValue);
      setError('');
    }
  }, [isOpen, initialValue]);

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
      await onSubmit(username);
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
            {error && <p className="text-red-500 text-xs font-mono mt-2">{error}</p>}
          </div>

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

