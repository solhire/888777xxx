import { PhantomProvider } from './types';

export interface User {
  walletAddress: string;
  username: string;
  level: number;
  xp: number;
  tier: 'S' | 'A' | 'B' | 'C' | 'Unranked';
  isPremium: boolean;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

