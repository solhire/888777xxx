import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { ZShard } from './NexilMark';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

export const PasswordProtection: React.FC<PasswordProtectionProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('nexil_access_granted');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'lol24') {
      setIsAuthenticated(true);
      sessionStorage.setItem('nexil_access_granted', 'true');
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-z-violet-base/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-full max-w-md text-center space-y-8 animate-fade-in-up">
        <div className="flex justify-center mb-6">
           <div className="w-24 h-24 text-z-violet-base animate-pulse">
             <img src="/nexil1.png" alt="Logo" className="w-full h-full object-contain" />
           </div>
        </div>
        
        <div>
            <h1 className="font-display font-black text-4xl text-white italic mb-2">RESTRICTED ACCESS</h1>
            <p className="text-z-steel-gray font-mono text-sm">Enter access code to proceed.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
            }}
            placeholder="ACCESS CODE"
            className={`w-full bg-black/50 border ${error ? 'border-red-500 text-red-500' : 'border-z-steel-gray/30 text-white'} font-mono text-center text-xl px-4 py-4 focus:outline-none focus:border-z-violet-base transition-colors placeholder-z-steel-gray/20 tracking-widest`}
            autoFocus
          />
          
          <Button type="submit" className="w-full py-4 text-lg">
            ENTER PROTOCOL
          </Button>
        </form>

        <div className="text-[10px] text-z-steel-gray/30 font-mono uppercase tracking-[0.3em]">
            NEXIL SYSTEM v1.0
        </div>
      </div>
    </div>
  );
};

