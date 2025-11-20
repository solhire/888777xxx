import { RewardClaim, LeaderboardEntry, Challenge, Clip, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const storageKey = (walletAddress: string) => `zenth_user_${walletAddress}`;

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    // If no API URL is set, we're in "mock/disconnected" mode for now
    // but for the signup flow, we'll need to simulate the check
    if (!API_BASE_URL && !endpoint.includes('mock')) {
       // throw new Error("API URL not configured");
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
       if (response.status === 404) return null as any;
       throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // User / Auth
  async getUser(walletAddress: string): Promise<User | null> {
    // Use localStorage to simulate backend persistence
    const storedUser = localStorage.getItem(storageKey(walletAddress));
    if (storedUser) {
        return JSON.parse(storedUser);
    }
    
    // If using a real API, uncomment this:
    // return this.request<User>(`/users/${walletAddress}`);
    
    return null; // User not found
  }

  async registerUser(walletAddress: string, username: string, signature: string): Promise<User> {
    // return this.request<User>('/users/register', {
    //   method: 'POST',
    //   body: JSON.stringify({ walletAddress, username, signature }),
    // });
    
    const newUser: User = {
        walletAddress,
        username,
        level: 0,
        xp: 0,
        tier: 'Unranked',
        isPremium: false,
        createdAt: new Date().toISOString()
    };

    // Persist to localStorage to simulate DB save
    localStorage.setItem(storageKey(walletAddress), JSON.stringify(newUser));
    
    return newUser;
  }

  async updateUsername(walletAddress: string, username: string): Promise<User> {
    const storedUser = await this.getUser(walletAddress);
    if (!storedUser) throw new Error('User not found');

    const updated: User = { ...storedUser, username };
    localStorage.setItem(storageKey(walletAddress), JSON.stringify(updated));
    return updated;
  }

  // Rewards
  async getRewards(walletAddress: string): Promise<RewardClaim[]> {
    // return this.request<RewardClaim[]>(`/rewards?wallet=${walletAddress}`);
    return [];
  }

  async claimReward(claimId: string, signature: string): Promise<void> {
    // return this.request<void>('/rewards/claim', {
    //   method: 'POST',
    //   body: JSON.stringify({ claimId, signature }),
    // });
  }

  // Leaderboard
  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    // return this.request<LeaderboardEntry[]>('/leaderboard');
    return [];
  }

  // Challenges
  async getChallenges(): Promise<Challenge[]> {
    // return this.request<Challenge[]>('/challenges');
    return [];
  }

  // Showcase
  async getClips(): Promise<Clip[]> {
    // return this.request<Clip[]>('/clips');
    return [];
  }
}

export const api = new ApiService();
