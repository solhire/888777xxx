import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ZShard } from './NexilMark';
import { Button } from './Button';
import { useUser } from '../context/UserContext';
import { UsernameModal } from './UsernameModal';
import { useToast } from '../context/ToastContext';
import { AdminBanner } from './AdminBanner';

const NavLink: React.FC<{ to: string; label: string; active: boolean }> = ({ to, label, active }) => (
  <Link to={to} className="relative group px-4 py-2">
    <span className={`block font-display uppercase text-sm font-bold tracking-wider transform -skew-x-6 transition-colors duration-300 ${active ? 'text-z-violet-peak' : 'text-z-onyx group-hover:text-white'}`}>
      {label}
    </span>
    <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-z-violet-peak transform -skew-x-12 shadow-[0_0_10px_#B46CFF] transition-all duration-300 origin-left ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`} />
  </Link>
);

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const { user, isAuthenticated, login, logout, register } = useUser();
  const { pushToast } = useToast();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get('ref');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-open register modal if ref code is present and user is not logged in
  useEffect(() => {
      if (refCode && !isAuthenticated && !user) {
          // We don't auto-open the modal immediately because they need to connect wallet first.
          // But we can store it or just let the flow handle it.
          // For better UX, let's just wait for them to click connect.
      }
  }, [refCode, isAuthenticated, user]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleConnect = async () => {
    if (isAuthenticated && user) {
      // If logged in, toggle menu instead of disconnecting immediately
      setShowUserMenu(!showUserMenu);
    } else {
      // Attempt to login
      const loggedInUser = await login();
      
      // If login successful, loggedInUser will be non-null.
      // If login successful (wallet connected) but NO user found, loggedInUser is null.
      
      // Better check:
      const provider = window.solana;
      if (provider?.publicKey && !loggedInUser) {
          // Wallet is connected, but no user profile found -> Show Register Modal
          setShowRegisterModal(true);
      } else if (loggedInUser) {
          pushToast({ message: `Signed in as ${loggedInUser.username}`, variant: 'success' });
      }
    }
  };

  return (
    <>
      <UsernameModal 
        isOpen={showRegisterModal} 
        initialValue=""
        initialReferralCode={refCode}
        onSubmit={async (username, referralCode) => {
            await register(username, referralCode);
            pushToast({ message: `Agent registered as ${username}`, variant: 'success' });
            setShowRegisterModal(false);
        }}
        onCancel={async () => {
            setShowRegisterModal(false);
            await logout(); // Disconnect wallet if they cancel registration
        }}
      />

      <header className="fixed top-0 left-0 w-full z-50 flex flex-col font-sans">
        <nav className={`w-full transition-all duration-500 border-t-[3px] border-z-violet-base ${scrolled ? 'bg-z-obsidian/95 backdrop-blur-md py-2 shadow-2xl' : 'bg-transparent py-6'}`}>
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            
            {/* Left: Brand */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 text-z-violet-base group-hover:text-z-violet-peak transition-colors duration-300 transform -skew-x-6 group-hover:rotate-12 transition-transform">
                 <ZShard />
              </div>
              <span className="font-display font-black text-2xl tracking-tighter italic text-white transform -skew-x-6">
                NEXIL
              </span>
            </Link>

            {/* Center: Links (Desktop) */}
            <div className="hidden lg:flex items-center space-x-1">
              <NavLink to="/tournaments" label="Tournaments" active={location.pathname.startsWith('/tournaments') || location.pathname === '/compete'} />
              <NavLink to="/leaderboards" label="Leaderboards" active={location.pathname === '/leaderboards'} />
              <NavLink to="/vote" label="Vote" active={location.pathname === '/vote'} />
              <NavLink to="/faq" label="FAQ" active={location.pathname === '/faq'} />
              <NavLink to="/dashboard" label="Dashboard" active={location.pathname === '/dashboard'} />
            </div>

            {/* Right: Actions (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
               <button
                 onClick={(e) => {
                   e.preventDefault();
                   window.open('https://twitter.com/NexilHQ', '_blank', 'noopener,noreferrer');
                 }}
                 className="text-z-steel-gray hover:text-z-violet-peak transition-colors duration-300"
                 title="Follow @NexilHQ on Twitter"
               >
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                 </svg>
               </button>
               <a
                 href="https://pump.fun/profile/nexil"
                 target="_blank"
                 rel="noreferrer"
                 className="text-[10px] font-display font-bold italic tracking-widest px-4 py-2 rounded-md bg-gradient-to-r from-z-violet-base to-z-violet-peak text-white shadow-[0_0_20px_rgba(180,108,255,0.4)] hover:shadow-[0_0_30px_rgba(180,108,255,0.8)] hover:scale-105 transition-all duration-300 border border-white/10"
               >
                 BUY $NEXIL
               </a>
               <div className="relative" ref={userMenuRef}>
               <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleConnect}
                    className={`min-w-[140px] transition-all duration-300 ${showUserMenu ? 'border-z-violet-base bg-z-violet-base/10' : ''} text-[10px] font-display font-bold italic tracking-widest px-4 py-2 border border-white/20 hover:border-z-violet-base/50 hover:bg-z-violet-base/10 ml-4`}
               >
                   {user ? (
                   <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]" />
                        {user.username}
                   </span>
                 ) : (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-z-steel-gray/50 rounded-full" />
                      CONNECT
                    </span>
                 )}
               </Button>

                 {/* User Dropdown Menu with Animations */}
                 <div 
                   className={`absolute top-full right-0 mt-2 w-56 bg-z-obsidian border border-z-steel-gray/20 shadow-[0_0_30px_rgba(0,0,0,0.9)] z-50 transform transition-all duration-300 origin-top-right backdrop-blur-xl
                   ${showUserMenu ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
                   `}
                 >
                   {user && (
                     <>
                      <div className="p-4 border-b border-z-steel-gray/10 bg-white/5">
                        <p className="text-[10px] text-z-violet-base font-bold uppercase tracking-widest mb-1">OPERATOR ID</p>
                        <p className="text-white font-bold font-display italic tracking-wide text-lg">{user.username}</p>
                        <p className="text-z-steel-gray text-xs font-mono truncate mt-1 opacity-60">{user.walletAddress}</p>
                      </div>
                      <div className="py-2">
                        <Link 
                          to="/profile" 
                          className="flex items-center gap-3 px-4 py-3 text-sm text-z-onyx hover:bg-z-violet-base/10 hover:text-white font-mono transition-all border-l-2 border-transparent hover:border-z-violet-base group"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <span className="text-z-steel-gray group-hover:text-z-violet-peak transition-colors">*</span>
                          PROFILE
                        </Link>
                        <Link 
                          to="/dashboard" 
                          className="flex items-center gap-3 px-4 py-3 text-sm text-z-onyx hover:bg-z-violet-base/10 hover:text-white font-mono transition-all border-l-2 border-transparent hover:border-z-violet-base group"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <span className="text-z-steel-gray group-hover:text-z-violet-peak transition-colors">⬡</span>
                          DASHBOARD
                        </Link>
                        <Link 
                          to="/settings" 
                          className="flex items-center gap-3 px-4 py-3 text-sm text-z-onyx hover:bg-z-violet-base/10 hover:text-white font-mono transition-all border-l-2 border-transparent hover:border-z-violet-base group"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <span className="text-z-steel-gray group-hover:text-z-violet-peak transition-colors">⚙</span>
                          SETTINGS
                        </Link>
                        <button 
                          className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 font-mono transition-all border-l-2 border-transparent hover:border-red-500 group"
                          onClick={async () => {
                            await logout();
                            setShowUserMenu(false);
                          }}
                        >
                          <span className="text-red-500/50 group-hover:text-red-500 transition-colors">✕</span>
                          DISCONNECT
                        </button>
                      </div>
                     </>
                   )}
                 </div>
               </div>

            </div>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden text-white transform -skew-x-6 border border-z-steel-gray p-2 hover:bg-z-steel-gray/20 transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <div className="space-y-1.5">
                <div className="w-6 h-0.5 bg-current transition-all"></div>
                <div className="w-4 h-0.5 bg-current ml-auto transition-all"></div>
                <div className="w-6 h-0.5 bg-current transition-all"></div>
              </div>
            </button>
          </div>
        </nav>
        <AdminBanner />
      </header>

      {/* Mobile Menu Slide-out */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 w-4/5 max-w-sm h-full bg-z-obsidian border-l border-z-violet-base transform p-8 flex flex-col gap-8 clip-path-diagonal shadow-2xl animate-slide-in-right">
            <div className="flex justify-end">
               <button onClick={() => setMobileOpen(false)} className="text-z-steel-gray hover:text-white font-display text-xl">CLOSE [X]</button>
            </div>
            <div className="flex flex-col gap-4 mt-8">
               <Link to="/tournaments" className="text-2xl font-display font-bold uppercase italic text-white hover:text-z-violet-peak hover:translate-x-2 transition-all" onClick={() => setMobileOpen(false)}>Tournaments</Link>
               <Link to="/leaderboards" className="text-2xl font-display font-bold uppercase italic text-white hover:text-z-violet-peak hover:translate-x-2 transition-all" onClick={() => setMobileOpen(false)}>Leaderboards</Link>
               <Link to="/vote" className="text-2xl font-display font-bold uppercase italic text-white hover:text-z-violet-peak hover:translate-x-2 transition-all" onClick={() => setMobileOpen(false)}>Vote</Link>
               <Link to="/faq" className="text-2xl font-display font-bold uppercase italic text-white hover:text-z-violet-peak hover:translate-x-2 transition-all" onClick={() => setMobileOpen(false)}>FAQ</Link>
               <Link to="/dashboard" className="text-2xl font-display font-bold uppercase italic text-white hover:text-z-violet-peak hover:translate-x-2 transition-all" onClick={() => setMobileOpen(false)}>Dashboard</Link>
               <Link to="/profile" className="text-2xl font-display font-bold uppercase italic text-white hover:text-z-violet-peak hover:translate-x-2 transition-all" onClick={() => setMobileOpen(false)}>Profile</Link>
            </div>
            <div className="mt-auto space-y-4">
              <div className="flex items-center gap-4 justify-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://twitter.com/NexilHQ', '_blank', 'noopener,noreferrer');
                  }}
                  className="text-z-steel-gray hover:text-z-violet-peak transition-colors duration-300"
                  title="Follow @NexilHQ on Twitter"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <a
                  href="https://pump.fun/profile/nexil"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-display font-bold italic tracking-widest px-4 py-2 rounded-md bg-gradient-to-r from-z-violet-base to-z-violet-peak text-white"
                >
                  BUY $NEXIL
                </a>
              </div>
              {user ? (
                 <div className="w-full mb-4">
                    <div className="text-white font-display italic text-xl mb-4">{user.username}</div>
                    <Button onClick={logout} className="w-full" variant="outline">DISCONNECT</Button>
                 </div>
              ) : (
              <Button onClick={handleConnect} className="w-full mb-4">
                   CONNECT PHANTOM
              </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
