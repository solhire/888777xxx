import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/tournaments', label: 'Compete' },
  { to: '/leaderboards', label: 'Ranks' },
  { to: '/dashboard', label: 'Dash' },
  { to: '/profile', label: 'Profile' },
];

export const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-z-bg/90 border-t border-white/5 backdrop-blur-xl lg:hidden safe-area-pb">
      <div className="container-fluid py-3 grid grid-cols-5 gap-1 text-[10px] font-mono uppercase tracking-wider">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className="text-center">
            {({ isActive }) => (
              <div
                className={`flex flex-col items-center gap-1.5 transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-z-text-muted'
                }`}
              >
                <span
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-z-violet-peak scale-150 shadow-[0_0_5px_#a78bfa]' : 'bg-white/10'
                  }`}
                />
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
