import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { BottomNav } from './components/BottomNav';
import { ToastStack } from './components/ToastStack';
import { AdminBanner } from './components/AdminBanner';
import { Home } from './pages/Home';
import { Compete } from './pages/Compete';
import { Tournaments } from './pages/Tournaments';
import { TournamentDetail } from './pages/TournamentDetail';
import { Leaderboards } from './pages/Leaderboards';
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
  <footer className="py-8 border-t border-white/5 bg-z-bg relative z-10">
    <div className="container-fluid flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-z-text-muted">
      <div>© 2025 NEXIL. All rights reserved.</div>
      <div className="flex gap-8 flex-wrap justify-center">
        <Link to="/faq" className="hover:text-z-violet-base transition-colors">FAQ</Link>
        <Link to="/terms" className="hover:text-z-violet-base transition-colors">TERMS OF SERVICE</Link>
        <Link to="/privacy" className="hover:text-z-violet-base transition-colors">PRIVACY POLICY</Link>
        <a href="mailto:support@nexil.gg" className="hover:text-z-violet-base transition-colors">SUPPORT</a>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <AdminProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col relative">
           {/* Navbar is fixed, so no layout shift */}
          <Navbar />
          <ToastStack />
          
          <main className="flex-grow pb-20 lg:pb-0 relative z-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/tournaments/:id" element={<TournamentDetail />} />
              <Route path="/compete" element={<Compete />} />
              <Route path="/leaderboards" element={<Leaderboards />} />
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
          </main>
          
          <Footer />
          <BottomNav />
        </div>
      </Router>
    </AdminProvider>
  );
};

export default App;
