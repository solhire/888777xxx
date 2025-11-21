import { PhantomProvider } from '../types';
import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';

// You might want to make this configurable via environment variables later
// Using 'mainnet-beta' to check real wallet balances
const SOLANA_NETWORK = 'mainnet-beta'; 
const connection = new Connection(clusterApiUrl(SOLANA_NETWORK));

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
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (err) {
    console.error("Failed to fetch balance", err);
    return 0;
  }
};
