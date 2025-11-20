import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getProvider, signAuthenticationMessage } from '../services/walletService';
import { api } from '../services/api';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<User | null>;
  logout: () => Promise<void>;
  register: (username: string) => Promise<void>;
  updateUsername: (username: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Helper to convert Uint8Array to Hex string
const toHexString = (byteArray: Uint8Array) => {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session or connected wallet on mount
  useEffect(() => {
    const checkAuth = async () => {
      const provider = getProvider();
      if (provider?.publicKey) {
        await loadUser(provider.publicKey.toString());
      } else {
        setIsLoading(false);
      }
      
      // Listen for disconnects
      if (provider) {
          provider.on('disconnect', () => {
              setUser(null);
              setIsAuthenticated(false);
          });
          provider.on('accountChanged', (publicKey: any) => {
              if (publicKey) {
                  loadUser(publicKey.toString());
              } else {
                  setUser(null);
                  setIsAuthenticated(false);
              }
          });
      }
    };
    
    // Delay slightly to ensure phantom is injected
    setTimeout(checkAuth, 500);
  }, []);

  const loadUser = async (walletAddress: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      const userData = await api.getUser(walletAddress);
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
        return userData;
      } else {
        setUser(null); // User needs to register
        setIsAuthenticated(false);
        return null;
      }
    } catch (err) {
      console.error("Failed to load user", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (): Promise<User | null> => {
    const provider = getProvider();
    if (!provider) {
      window.open('https://phantom.app/', '_blank');
      return null;
    }

    try {
      const resp = await provider.connect();
      return await loadUser(resp.publicKey.toString());
    } catch (err) {
      console.error("Login failed", err);
      return null;
    }
  };

  const register = async (username: string) => {
     const provider = getProvider();
     if (!provider?.publicKey) throw new Error("Wallet not connected");

     const walletAddress = provider.publicKey.toString();
     
     // Sign message to prove ownership before registering
     const message = `Register as ${username} on ZENTH`;
     const authResult = await signAuthenticationMessage(message);

     if (!authResult) throw new Error("Signature rejected");

     const signatureHex = toHexString(authResult.signature);
     const newUser = await api.registerUser(walletAddress, username, signatureHex);
     setUser(newUser);
     setIsAuthenticated(true);
  };

  const updateUsername = async (username: string) => {
    const provider = getProvider();
    if (!provider?.publicKey) throw new Error("Wallet not connected");
    const walletAddress = provider.publicKey.toString();
    const updated = await api.updateUsername(walletAddress, username);
    setUser(updated);
  };

  const logout = async () => {
    const provider = getProvider();
    if (provider) await provider.disconnect();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, isLoading, isAuthenticated, login, logout, register, updateUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
