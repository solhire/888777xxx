import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/tournaments', label: 'Tournaments' },
  { to: '/leaderboards', label: 'Ranks' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/profile', label: 'Profile' },
];

export const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black/90 border-t border-z-steel-gray/20 backdrop-blur-md lg:hidden">
      <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-5 gap-2 text-xs font-mono uppercase tracking-wider">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className="text-center">
            {({ isActive }) => (
              <div
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-white' : 'text-z-steel-gray'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-z-violet-base' : 'bg-z-steel-gray/50'
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

