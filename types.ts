export interface PhantomProvider {
  isPhantom: boolean;
  publicKey: { toString: () => string } | null;
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  signMessage: (message: Uint8Array, encoding: string) => Promise<{ signature: Uint8Array }>;
  on: (event: string, callback: (args: any) => void) => void;
  request: (method: any) => Promise<any>;
}

export type WalletContextState = {
  publicKey: string | null;
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isPhantomInstalled: boolean;
};

export interface RewardClaim {
  id: string;
  title: string;
  amountSol: number;
  status: 'available' | 'pending' | 'claimed';
  timestamp: string;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  tier: 'S' | 'A' | 'B' | 'C';
  change: number; // Positive or negative rank change
}

export interface Challenge {
  title: string;
  reward: string;
  difficulty: string;
  participants: string;
}

export interface Clip {
  title: string;
  author: string;
  views: string;
}

// Export User interface here for convenience if needed, or keep in auth.ts
export * from './types/auth';

// Add window.solana support
declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}
