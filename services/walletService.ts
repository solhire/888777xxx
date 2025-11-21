import { PhantomProvider } from '../types';
import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';

// RPC endpoint configuration
// Free public endpoints available: Pocket Network, dRPC (no API key required)
// For production with high volume, consider dedicated RPC providers (Helius, QuickNode, Alchemy)
const getRpcUrl = (): string => {
  // Check for custom RPC URL in environment
  const customRpc = import.meta.env.VITE_SOLANA_RPC_URL;
  if (customRpc) return customRpc;
  
  const network = import.meta.env.VITE_SOLANA_NETWORK || 'devnet';
  
  if (network === 'mainnet-beta') {
    // Free public RPC endpoints (no API key required)
    // Option 1: Pocket Network (recommended - decentralized, no rate limits)
    return 'https://solana.api.pocket.network';
    
    // Option 2: dRPC (alternative free endpoint)
    // return 'https://solana.drpc.org/';
    
    // Option 3: Solana Foundation (rate-limited, may return 403)
    // return 'https://api.mainnet-beta.solana.com';
  }
  
  return clusterApiUrl(network as 'devnet' | 'testnet' | 'mainnet-beta');
};

const connection = new Connection(getRpcUrl(), {
  commitment: 'confirmed',
  // Add timeout to prevent hanging requests
  httpHeaders: {
    'Content-Type': 'application/json',
  },
});

export const getProvider = (): PhantomProvider | undefined => {
  if ('solana' in window) {
    const provider = window.solana as PhantomProvider;
    if (provider.isPhantom) {
      return provider;
    }
  }
  return undefined;
};

export const connectWallet = async (): Promise<string | null> => {
  const provider = getProvider();
  if (!provider) return null;

  try {
    const resp = await provider.connect();
    return resp.publicKey.toString();
  } catch (err) {
    console.error("User rejected connection", err);
    return null;
  }
};

export const disconnectWallet = async (): Promise<void> => {
  const provider = getProvider();
  if (provider) {
    await provider.disconnect();
  }
};

export const signAuthenticationMessage = async (message: string): Promise<{ signature: Uint8Array; publicKey: string } | null> => {
  const provider = getProvider();
  if (!provider) return null;
  
  try {
    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await provider.signMessage(encodedMessage, "utf8");
    return {
      signature: signedMessage.signature,
      publicKey: provider.publicKey?.toString() || ""
    };
  } catch (err) {
    console.error("Signing failed", err);
    return null;
  }
};

export const getWalletBalance = async (address: string): Promise<number> => {
  try {
    const publicKey = new PublicKey(address);
    const balance = await connection.getBalance(publicKey, 'confirmed');
    return balance / LAMPORTS_PER_SOL;
  } catch (err: any) {
    // Handle 403 errors gracefully - RPC endpoint may be rate-limited
    if (err?.message?.includes('403') || err?.code === 403) {
      console.warn("RPC endpoint rate limited. Consider using a dedicated RPC provider.");
      // Return 0 instead of throwing to prevent UI errors
      return 0;
    }
    console.error("Failed to fetch balance", err);
    return 0;
  }
};
