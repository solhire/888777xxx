import React, { useEffect, useState } from 'react';
import { Button } from './Button';

interface RewardClaimModalProps {
  isOpen: boolean;
  rewardTitle: string;
  rewardAmount: string;
  status: 'pending' | 'signing' | 'success' | 'error';
  onClose: () => void;
  onConfirm?: () => void;
  errorMessage?: string;
}

export const RewardClaimModal: React.FC<RewardClaimModalProps> = ({
  isOpen,
  rewardTitle,
  rewardAmount,
  status,
  onClose,
  onConfirm,
  errorMessage,
}) => {
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  useEffect(() => {
    if (status === 'success') {
      setShowSuccessAnimation(true);
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md mx-4">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-z-violet-base via-z-violet-peak to-z-violet-base rounded-lg blur-2xl opacity-50 animate-pulse"></div>
        
        <div className="relative bg-z-obsidian border-2 border-z-violet-base/50 p-8 shadow-[0_0_50px_rgba(180,108,255,0.5)] rounded-lg">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-z-steel-gray hover:text-white transition-colors text-2xl"
          >
            ✕
          </button>

          {/* Success Animation */}
          {status === 'success' && showSuccessAnimation && (
            <div className="absolute inset-0 flex items-center justify-center bg-z-obsidian/95 rounded-lg animate-fade-in">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-z-violet-peak rounded-full animate-ping opacity-75"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-z-violet-base to-z-violet-peak rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(180,108,255,0.8)]">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold text-white italic mb-2">REWARD CLAIMED</h3>
                <p className="text-z-violet-peak font-mono text-lg">{rewardAmount} SOL</p>
              </div>
            </div>
          )}

          {/* Main Content */}
          {status !== 'success' && (
            <>
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-z-violet-base/20 to-z-violet-peak/20 rounded-full flex items-center justify-center border-2 border-z-violet-base/30">
                  <svg className="w-10 h-10 text-z-violet-peak" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-display font-bold text-white italic mb-2 transform -skew-x-3">
                  CLAIM REWARD
                </h2>
                <p className="text-z-steel-gray font-mono text-sm mb-4">{rewardTitle}</p>
                <div className="text-4xl font-display font-bold text-z-violet-peak drop-shadow-[0_0_10px_rgba(180,108,255,0.5)]">
                  {rewardAmount} SOL
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mb-6">
                {status === 'pending' && (
                  <div className="bg-z-steel-gray/10 border border-z-steel-gray/20 p-4 rounded text-center">
                    <p className="text-z-steel-gray font-mono text-sm">Ready to claim</p>
                  </div>
                )}
                
                {status === 'signing' && (
                  <div className="bg-z-violet-base/10 border border-z-violet-base/30 p-4 rounded text-center">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-z-violet-peak border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-z-violet-peak font-mono text-sm">Signing transaction...</p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="bg-z-violet-base/10 border border-z-violet-base/30 p-4 rounded text-center">
                    <p className="text-z-violet-peak font-mono text-sm">{errorMessage || 'Claim failed. Please try again.'}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {status === 'error' && (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={onClose}
                    >
                      CLOSE
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => {
                        // Reset to pending and retry
                        if (onConfirm) {
                          // The parent should handle resetting status
                          onConfirm();
                        }
                      }}
                    >
                      RETRY
                    </Button>
                  </>
                )}
                {status === 'pending' && (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={onClose}
                    >
                      CANCEL
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={onConfirm || onClose}
                    >
                      CONFIRM CLAIM
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

