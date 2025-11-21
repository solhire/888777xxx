import React, { useState, useEffect } from 'react';
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

const STORAGE_KEY = 'nexil_settings';

interface SettingsData {
  notifications: {
    matchReady: boolean;
    tournamentUpdates: boolean;
  };
  privacy: {
    publicProfile: boolean;
    showMatchHistory: boolean;
  };
  display: {
    animations: boolean;
  };
}

const defaultSettings: SettingsData = {
  notifications: {
    matchReady: true,
    tournamentUpdates: true,
  },
  privacy: {
    publicProfile: true,
    showMatchHistory: true,
  },
  display: {
    animations: true,
  },
};

export const Settings: React.FC = () => {
  const { user, isAuthenticated, login } = useUser();
  const { pushToast } = useToast();

  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);

  // Load settings from localStorage on mount
useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      setSettings({ ...defaultSettings, ...parsed });
    } catch (e) {
      console.error('Failed to load settings:', e);
    }
  }
}, []);

  // Apply reduce motion setting
  useEffect(() => {
    if (!settings.display.animations) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
      document.body.classList.add('reduce-motion');
    } else {
      document.documentElement.style.removeProperty('--animation-duration');
      document.body.classList.remove('reduce-motion');
    }
  }, [settings.display.animations]);

  const updateSettings = (updates: Partial<SettingsData>) => {
    setSettings(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setHasChanges(false);
    pushToast({ message: 'Settings saved successfully', variant: 'success' });
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
              <Toggle 
                checked={settings.notifications.matchReady} 
                onChange={(v) => updateSettings({ notifications: { ...settings.notifications, matchReady: v } })} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold">Tournament Updates</h3>
                <p className="text-z-steel-gray text-sm font-mono">Bracket changes, delays, and prize pool adjustments.</p>
              </div>
              <Toggle 
                checked={settings.notifications.tournamentUpdates} 
                onChange={(v) => updateSettings({ notifications: { ...settings.notifications, tournamentUpdates: v } })} 
              />
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
              <Toggle 
                checked={settings.privacy.publicProfile} 
                onChange={(v) => updateSettings({ privacy: { ...settings.privacy, publicProfile: v } })} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold">Match History Visibility</h3>
                <p className="text-z-steel-gray text-sm font-mono">Keep your recent match results public.</p>
              </div>
              <Toggle 
                checked={settings.privacy.showMatchHistory} 
                onChange={(v) => updateSettings({ privacy: { ...settings.privacy, showMatchHistory: v } })} 
              />
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
                <h3 className="text-white font-bold">Reduce Motion</h3>
                <p className="text-z-steel-gray text-sm font-mono">Disable heavy animations and particle effects for better performance.</p>
              </div>
              <Toggle 
                checked={!settings.display.animations} 
                onChange={(v) => updateSettings({ display: { ...settings.display, animations: !v } })} 
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-8">
            <Button 
              onClick={handleSave} 
              className="w-full md:w-auto"
              disabled={!hasChanges}
            >
                {hasChanges ? 'SAVE CONFIGURATION' : 'SAVED'}
            </Button>
        </div>

      </div>
    </div>
  );
};

