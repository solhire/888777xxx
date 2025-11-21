import { RewardClaim, LeaderboardEntry, Challenge, Clip, User } from '../types';

// @ts-ignore
const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const storageKey = (walletAddress: string) => `nexil_user_${walletAddress}`;

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

  async registerUser(walletAddress: string, username: string, signature: string, referredBy?: string): Promise<User> {
    // return this.request<User>('/users/register', {
    //   method: 'POST',
    //   body: JSON.stringify({ walletAddress, username, signature, referredBy }),
    // });
    
    const newUser: User = {
        walletAddress,
        username,
        level: 0,
        xp: 0,
        tier: 'Unranked',
        isPremium: false,
        createdAt: new Date().toISOString(),
        referralCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
        referredBy: referredBy || undefined,
        referralCount: 0,
        referralEarnings: 0
    };

    // Persist to localStorage to simulate DB save
    localStorage.setItem(storageKey(walletAddress), JSON.stringify(newUser));

    // Handle referral logic (mock)
    if (referredBy) {
       // In a real backend, we would look up the referrer by their referralCode and increment their count
       console.log(`User registered with referral code: ${referredBy}`);
       // Simulate updating referrer stats if they exist in local storage (tricky without a global DB)
       // For now, we just track 'referredBy' on the new user.
    }
    
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

  // Votes
  private getVotesKey() {
    return 'nexil_votes';
  }

  private getUserVotesKey(walletAddress: string) {
    return `nexil_user_votes_${walletAddress}`;
  }

  async getProposalVotes(proposalId: string): Promise<number> {
    const votesData = localStorage.getItem(this.getVotesKey());
    if (!votesData) return 0;
    const votes = JSON.parse(votesData);
    return votes[proposalId] || 0;
  }

  async getAllProposalVotes(): Promise<Record<string, number>> {
    const votesData = localStorage.getItem(this.getVotesKey());
    if (!votesData) return {};
    return JSON.parse(votesData);
  }

  async hasUserVoted(walletAddress: string, proposalId: string): Promise<boolean> {
    const userVotesData = localStorage.getItem(this.getUserVotesKey(walletAddress));
    if (!userVotesData) return false;
    const userVotes = JSON.parse(userVotesData);
    return userVotes.includes(proposalId);
  }

  async castVote(walletAddress: string, proposalId: string): Promise<void> {
    // Check if user already voted
    const hasVoted = await this.hasUserVoted(walletAddress, proposalId);
    if (hasVoted) {
      throw new Error('You have already voted for this proposal');
    }

    // Get current votes
    const votesData = localStorage.getItem(this.getVotesKey());
    const votes = votesData ? JSON.parse(votesData) : {};
    
    // Increment vote count
    votes[proposalId] = (votes[proposalId] || 0) + 1;
    localStorage.setItem(this.getVotesKey(), JSON.stringify(votes));

    // Track user's vote
    const userVotesData = localStorage.getItem(this.getUserVotesKey(walletAddress));
    const userVotes = userVotesData ? JSON.parse(userVotesData) : [];
    if (!userVotes.includes(proposalId)) {
      userVotes.push(proposalId);
      localStorage.setItem(this.getUserVotesKey(walletAddress), JSON.stringify(userVotes));
    }
  }
}

export const api = new ApiService();
