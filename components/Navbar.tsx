import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ZShard } from './ZShard';
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      
      // However, we need to distinguish between "User cancelled wallet" vs "User has no profile"
      // We can check if wallet is connected directly or rely on `login` returning null.
      
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
        onSubmit={async (username) => {
            await register(username);
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
                ZENTH
              </span>
            </Link>

            {/* Center: Links (Desktop) */}
            <div className="hidden lg:flex items-center space-x-1">
              <NavLink to="/tournaments" label="Tournaments" active={location.pathname.startsWith('/tournaments') || location.pathname === '/compete'} />
              <NavLink to="/leaderboards" label="Leaderboards" active={location.pathname === '/leaderboards'} />
              <NavLink to="/vote" label="Vote" active={location.pathname === '/vote'} />
              <NavLink to="/showcase" label="Showcase" active={location.pathname === '/showcase'} />
              <NavLink to="/faq" label="FAQ" active={location.pathname === '/faq'} />
              <NavLink to="/dashboard" label="Dashboard" active={location.pathname === '/dashboard'} />
            </div>

            {/* Right: Actions (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
               <a
                 href="https://pump.fun/profile/zenthgg"
                 target="_blank"
                 rel="noreferrer"
                 className="text-xs font-mono uppercase tracking-[0.3em] border border-z-violet-base/60 px-4 py-2 text-z-violet-base hover:bg-z-violet-base hover:text-black transition-all"
               >
                 BUY ON PUMPFUN
               </a>
               <div className="relative" ref={userMenuRef}>
               <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleConnect}
                    className={`min-w-[140px] transition-all duration-300 ${showUserMenu ? 'border-z-violet-base bg-z-violet-base/10' : ''}`}
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

               {!user && (
                  <Link to="/tournaments">
                    <Button onClick={() => {}}>
                    ENTER THE CLIMB
                  </Button>
                  </Link>
               )}
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
               <Link to="/showcase" className="text-2xl font-display font-bold uppercase italic text-white hover:text-z-violet-peak hover:translate-x-2 transition-all" onClick={() => setMobileOpen(false)}>Showcase</Link>
               <Link to="/faq" className="text-2xl font-display font-bold uppercase italic text-white hover:text-z-violet-peak hover:translate-x-2 transition-all" onClick={() => setMobileOpen(false)}>FAQ</Link>
               <Link to="/dashboard" className="text-2xl font-display font-bold uppercase italic text-white hover:text-z-violet-peak hover:translate-x-2 transition-all" onClick={() => setMobileOpen(false)}>Dashboard</Link>
               <Link to="/profile" className="text-2xl font-display font-bold uppercase italic text-white hover:text-z-violet-peak hover:translate-x-2 transition-all" onClick={() => setMobileOpen(false)}>Profile</Link>
            </div>
            <div className="mt-auto">
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
