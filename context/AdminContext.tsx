import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUser } from './UserContext';

interface AdminContextType {
  contractAddress: string;
  updateContractAddress: (address: string) => void;
  isAdmin: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_WALLET = "4nW6MkoZbLuTouoqvRzoZWCyFVypCKu9R3wRCxZZCTkV";

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default CA or load from localStorage if you want persistence across reloads
  const [contractAddress, setContractAddress] = useState(() => {
    return localStorage.getItem('zenth_ca') || "Pending Launch";
  });
  
  const { user } = useUser();
  const isAdmin = user?.walletAddress === ADMIN_WALLET;

  const updateContractAddress = (address: string) => {
    setContractAddress(address);
    localStorage.setItem('zenth_ca', address);
  };

  return (
    <AdminContext.Provider value={{ contractAddress, updateContractAddress, isAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

