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
  register: (username: string, referralCode?: string) => Promise<void>;
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
      const shouldAutoConnect = localStorage.getItem('nexil_auto_connect') === 'true';

      if (shouldAutoConnect && provider) {
        try {
            // Eagerly connect if user was previously logged in
            const resp = await provider.connect({ onlyIfTrusted: true });
            if (resp.publicKey) {
                await loadUser(resp.publicKey.toString());
            } else {
                setIsLoading(false);
            }
        } catch (e) {
            // Silent fail if not trusted
            setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
      
      // Listen for disconnects
      if (provider) {
          provider.on('disconnect', () => {
              setUser(null);
              setIsAuthenticated(false);
              localStorage.removeItem('nexil_auto_connect');
          });
          provider.on('accountChanged', (publicKey: any) => {
              if (publicKey) {
                  loadUser(publicKey.toString());
              } else {
                  setUser(null);
                  setIsAuthenticated(false);
                  localStorage.removeItem('nexil_auto_connect');
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
        localStorage.setItem('nexil_auto_connect', 'true');
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
      localStorage.setItem('nexil_auto_connect', 'true');
      return await loadUser(resp.publicKey.toString());
    } catch (err) {
      console.error("Login failed", err);
      return null;
    }
  };

  const register = async (username: string, referralCode?: string) => {
     const provider = getProvider();
     if (!provider?.publicKey) throw new Error("Wallet not connected");

     const walletAddress = provider.publicKey.toString();
     
     // Sign message to prove ownership before registering
     const message = `Register as ${username} on NEXIL`;
     const authResult = await signAuthenticationMessage(message);

     if (!authResult) throw new Error("Signature rejected");

     const signatureHex = toHexString(authResult.signature);
     const newUser = await api.registerUser(walletAddress, username, signatureHex, referralCode);
     setUser(newUser);
     setIsAuthenticated(true);
     localStorage.setItem('nexil_auto_connect', 'true');
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
    try {
        if (provider) await provider.disconnect();
    } catch (e) {
        console.error("Disconnect error:", e);
    }
    
    localStorage.removeItem('nexil_auto_connect');
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
