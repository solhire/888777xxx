import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { BottomNav } from './components/BottomNav';
import { ToastStack } from './components/ToastStack';
import { AdminBanner } from './components/AdminBanner';
import { PasswordProtection } from './components/PasswordProtection';
import { Home } from './pages/Home';
import { Compete } from './pages/Compete';
import { Tournaments } from './pages/Tournaments';
import { TournamentDetail } from './pages/TournamentDetail';
import { Leaderboards } from './pages/Leaderboards';
import { Showcase } from './pages/Showcase';
import { Dashboard } from './pages/Dashboard';
import { TermsOfService } from './pages/TermsOfService';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { FAQ } from './pages/FAQ';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin';
import { Vote } from './pages/Vote';
import { Settings } from './pages/Settings';
import { Referrals } from './pages/Referrals';
import { AdminProvider } from './context/AdminContext';

const Footer: React.FC = () => (
  <footer className="py-8 border-t border-z-steel-gray/20 bg-z-obsidian/50">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-z-steel-gray">
      <div>© 2025 ZENTH. All rights reserved.</div>
      <div className="flex gap-6 flex-wrap justify-center">
        <Link to="/faq" className="hover:text-z-violet-base transition-colors">FAQ</Link>
        <Link to="/terms" className="hover:text-z-violet-base transition-colors">TERMS OF SERVICE</Link>
        <Link to="/privacy" className="hover:text-z-violet-base transition-colors">PRIVACY POLICY</Link>
        <a href="mailto:support@zenth.gg" className="hover:text-z-violet-base transition-colors">SUPPORT</a>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <AdminProvider>
      <PasswordProtection>
        <Router>
          <ScrollToTop />
          <div className="bg-black min-h-screen flex flex-col text-white font-sans selection:bg-z-violet-base selection:text-white">
            <Navbar />
            <ToastStack />
            <div className="flex-grow pb-16 lg:pb-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tournaments" element={<Tournaments />} />
                <Route path="/tournaments/:id" element={<TournamentDetail />} />
                <Route path="/compete" element={<Compete />} />
                <Route path="/leaderboards" element={<Leaderboards />} />
                <Route path="/showcase" element={<Showcase />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/referrals" element={<Referrals />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/vote" element={<Vote />} />
              </Routes>
            </div>
            <Footer />
            <BottomNav />
          </div>
        </Router>
      </PasswordProtection>
    </AdminProvider>
  );
};

export default App;
