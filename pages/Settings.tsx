import React, { useState } from 'react';
import { Button } from '../components/Button';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';

const Toggle: React.FC<{ checked: boolean; onChange: (val: boolean) => void }> = ({ checked, onChange }) => (
  <button 
    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-z-violet-base' : 'bg-z-steel-gray/30'}`}
    onClick={() => onChange(!checked)}
  >
    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);

export const Settings: React.FC = () => {
  const { user, isAuthenticated, login } = useUser();
  const { pushToast } = useToast();

  const [notifications, setNotifications] = useState({
    email: true,
    matchReady: true,
    tournamentUpdates: true,
    marketing: false,
  });

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showBalance: false,
    showMatchHistory: true,
  });

  const [display, setDisplay] = useState({
    theme: 'dark', // dark | light
    language: 'en', // en | es | fr | de
    animations: true,
  });

  const handleSave = () => {
    // In a real app, save to backend
    pushToast({ message: 'Settings updated successfully', variant: 'success' });
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen pt-48 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-display text-white italic mb-4">ACCESS DENIED</h1>
        <p className="text-z-onyx font-mono mb-6">Login to configure your neural link settings.</p>
        <Button onClick={login}>CONNECT PHANTOM</Button>
      </div>
    );
  }

  return (
    <div className="pt-48 pb-20 min-h-screen max-w-4xl mx-auto px-4">
      <header className="mb-12 opacity-0 animate-fade-in-up">
        <h1 className="font-display font-black text-5xl md:text-6xl text-white italic transform -skew-x-3 mb-4">
          SYSTEM CONFIG
        </h1>
        <p className="text-z-onyx font-mono max-w-xl border-l-2 border-z-violet-base pl-4">
          Customize your interface, privacy protocols, and alert frequencies.
        </p>
      </header>

      <div className="space-y-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
        
        {/* Notifications Section */}
        <section className="bg-z-obsidian/40 border border-z-steel-gray/20 p-8 backdrop-blur-sm">
          <h2 className="font-display font-bold text-2xl text-white italic mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-z-violet-base rounded-full"></span>
            NOTIFICATIONS
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold">Match Ready Alerts</h3>
                <p className="text-z-steel-gray text-sm font-mono">Get notified when your opponent joins the lobby.</p>
              </div>
              <Toggle checked={notifications.matchReady} onChange={(v) => setNotifications({...notifications, matchReady: v})} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold">Tournament Updates</h3>
                <p className="text-z-steel-gray text-sm font-mono">Bracket changes, delays, and prize pool adjustments.</p>
              </div>
              <Toggle checked={notifications.tournamentUpdates} onChange={(v) => setNotifications({...notifications, tournamentUpdates: v})} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold">Email Digests</h3>
                <p className="text-z-steel-gray text-sm font-mono">Weekly performance summary and earnings report.</p>
              </div>
              <Toggle checked={notifications.email} onChange={(v) => setNotifications({...notifications, email: v})} />
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="bg-z-obsidian/40 border border-z-steel-gray/20 p-8 backdrop-blur-sm">
          <h2 className="font-display font-bold text-2xl text-white italic mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-z-violet-base rounded-full"></span>
            PRIVACY & SECURITY
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold">Public Profile</h3>
                <p className="text-z-steel-gray text-sm font-mono">Allow other users to view your profile and stats.</p>
              </div>
              <Toggle checked={privacy.publicProfile} onChange={(v) => setPrivacy({...privacy, publicProfile: v})} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold">Show Wallet Balance</h3>
                <p className="text-z-steel-gray text-sm font-mono">Display your SOL balance on the dashboard header.</p>
              </div>
              <Toggle checked={privacy.showBalance} onChange={(v) => setPrivacy({...privacy, showBalance: v})} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold">Match History Visibility</h3>
                <p className="text-z-steel-gray text-sm font-mono">Keep your recent match results public.</p>
              </div>
              <Toggle checked={privacy.showMatchHistory} onChange={(v) => setPrivacy({...privacy, showMatchHistory: v})} />
            </div>
          </div>
        </section>

        {/* Interface Section */}
        <section className="bg-z-obsidian/40 border border-z-steel-gray/20 p-8 backdrop-blur-sm">
          <h2 className="font-display font-bold text-2xl text-white italic mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-z-violet-base rounded-full"></span>
            INTERFACE
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold">Language</h3>
                <p className="text-z-steel-gray text-sm font-mono">Select your preferred interface language.</p>
              </div>
              <select 
                value={display.language}
                onChange={(e) => setDisplay({...display, language: e.target.value})}
                className="bg-black/50 border border-z-steel-gray/30 text-white px-4 py-2 font-mono focus:border-z-violet-base outline-none"
              >
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="jp">日本語</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold">Theme</h3>
                <p className="text-z-steel-gray text-sm font-mono">Select visual theme (Cyberpunk Default).</p>
              </div>
              <div className="flex gap-2">
                 <button 
                    onClick={() => setDisplay({...display, theme: 'dark'})}
                    className={`px-4 py-2 border ${display.theme === 'dark' ? 'bg-z-violet-base text-black border-z-violet-base' : 'bg-transparent text-z-steel-gray border-z-steel-gray/30'} font-mono text-xs uppercase`}
                 >
                    DARK
                 </button>
                 <button 
                    onClick={() => setDisplay({...display, theme: 'light'})}
                    className={`px-4 py-2 border ${display.theme === 'light' ? 'bg-white text-black border-white' : 'bg-transparent text-z-steel-gray border-z-steel-gray/30'} font-mono text-xs uppercase`}
                 >
                    LIGHT
                 </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold">Reduce Motion</h3>
                <p className="text-z-steel-gray text-sm font-mono">Disable heavy animations and particle effects.</p>
              </div>
              <Toggle checked={!display.animations} onChange={(v) => setDisplay({...display, animations: !v})} />
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-8">
            <Button onClick={handleSave} className="w-full md:w-auto">
                SAVE CONFIGURATION
            </Button>
        </div>

      </div>
    </div>
  );
};

