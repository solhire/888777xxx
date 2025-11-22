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
    <span className={`block font-display uppercase text-sm font-bold tracking-wider transition-colors duration-300 ${active ? 'text-white' : 'text-z-text-secondary group-hover:text-white'}`}>
      {label}
    </span>
    <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-z-violet-peak shadow-[0_0_10px_rgba(167,139,250,0.5)] transition-all duration-300 origin-left ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`} />
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

  useEffect(() => {
    if (refCode && !isAuthenticated && !user) {
      // Logic to handle auto-registration if needed
    }
  }, [refCode, isAuthenticated, user]);

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
      setShowUserMenu(!showUserMenu);
    } else {
      const loggedInUser = await login();
      const provider = window.solana;
      if (provider?.publicKey && !loggedInUser) {
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
            await logout(); 
        }}
      />

      <header className="fixed top-0 left-0 w-full z-50 flex flex-col font-sans">
        <nav className={`w-full transition-all duration-500 border-b ${scrolled ? 'bg-z-bg/90 backdrop-blur-md border-white/5 py-3' : 'bg-transparent border-transparent py-6'}`}>
          <div className="container-fluid flex items-center justify-between">
            
            {/* Left: Brand */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 text-z-violet-base group-hover:text-z-violet-peak transition-colors duration-300">
                 <ZShard />
              </div>
              <div className="h-6 w-auto">
                <img src="/nexil_text_logo.png" alt="NEXIL" className="h-full w-auto object-contain brightness-125 contrast-125" />
              </div>
            </Link>

            {/* Center: Links (Desktop) */}
            <div className="hidden lg:flex items-center space-x-1 bg-z-card/50 backdrop-blur-sm px-6 py-2 rounded-full border border-white/5">
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
                 className="text-z-text-secondary hover:text-z-violet-peak transition-colors duration-300"
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
                 className="text-[10px] font-display font-bold italic tracking-widest px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300"
               >
                 BUY $NEXIL
               </a>
               
               <div className="relative" ref={userMenuRef}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleConnect}
                  className={`${showUserMenu ? 'border-z-violet-base bg-z-violet-base/10' : ''}`}
                >
                   {user ? (
                   <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]" />
                        {user.username}
                   </span>
                 ) : (
                    <span className="flex items-center gap-2">
                      CONNECT
                    </span>
                 )}
                </Button>

                 {/* User Dropdown Menu */}
                 <div 
                   className={`absolute top-full right-0 mt-4 w-64 bg-z-card border border-white/10 rounded-xl shadow-2xl z-50 transform transition-all duration-300 origin-top-right
                   ${showUserMenu ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
                   `}
                 >
                   {user && (
                     <>
                      <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                        <p className="text-[10px] text-z-violet-peak font-bold uppercase tracking-widest mb-1">OPERATOR ID</p>
                        <p className="text-white font-bold font-display italic tracking-wide text-lg">{user.username}</p>
                        <p className="text-z-text-muted text-xs font-mono truncate mt-1">{user.walletAddress}</p>
                      </div>
                      <div className="p-2">
                        {[
                          { to: '/profile', label: 'PROFILE', icon: '*' },
                          { to: '/dashboard', label: 'DASHBOARD', icon: '⬡' },
                          { to: '/settings', label: 'SETTINGS', icon: '⚙' },
                        ].map((item) => (
                          <Link 
                            key={item.to}
                            to={item.to} 
                            className="flex items-center gap-3 px-4 py-3 text-sm text-z-text-secondary hover:bg-white/5 hover:text-white font-mono rounded-lg transition-all group"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <span className="text-z-text-muted group-hover:text-z-violet-peak transition-colors">{item.icon}</span>
                            {item.label}
                          </Link>
                        ))}
                        
                        <button 
                          className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 font-mono rounded-lg transition-all mt-2"
                          onClick={async () => {
                            await logout();
                            setShowUserMenu(false);
                          }}
                        >
                          <span className="opacity-50">✕</span>
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
              className="lg:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
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
          <div className="absolute top-0 right-0 w-4/5 max-w-sm h-full bg-z-card border-l border-white/10 p-8 flex flex-col gap-8 shadow-2xl animate-slide-in-right">
            <div className="flex justify-end">
               <button onClick={() => setMobileOpen(false)} className="text-z-text-muted hover:text-white font-display text-xl">CLOSE [X]</button>
            </div>
            <div className="flex flex-col gap-6 mt-8">
               {['Tournaments', 'Leaderboards', 'Vote', 'FAQ', 'Dashboard', 'Profile'].map((item) => (
                 <Link 
                   key={item}
                   to={`/${item.toLowerCase()}`} 
                   className="text-2xl font-display font-bold uppercase italic text-z-text-secondary hover:text-white hover:translate-x-2 transition-all" 
                   onClick={() => setMobileOpen(false)}
                 >
                   {item}
                 </Link>
               ))}
            </div>
            <div className="mt-auto space-y-4">
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
