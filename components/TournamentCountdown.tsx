import React, { useState, useEffect } from 'react';

export const TournamentCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    // November 23, 2025 at 2:00 PM EST (14:00)
    const launchDate = new Date('2025-11-23T14:00:00-05:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
        setIsLaunched(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsLaunched(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isLaunched) {
    return (
      <div className="bg-z-violet-base/10 border border-z-violet-base/20 p-8 rounded-xl backdrop-blur-md text-center">
        <h3 className="text-z-violet-peak font-display font-bold text-2xl italic mb-2 animate-pulse">TOURNAMENTS LIVE</h3>
        <p className="text-z-text-secondary font-mono text-sm">Registration is now open</p>
      </div>
    );
  }

  return (
    <div className="p-8 text-center">
      <div className="mb-8">
        <h3 className="text-z-violet-peak font-display font-bold text-2xl italic mb-2 tracking-wide">TOURNAMENTS START</h3>
        <p className="text-z-text-secondary font-mono text-xs tracking-widest">SUNDAY, NOVEMBER 23, 2025 • 2:00 PM EST</p>
      </div>
      <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto">
        {[
          { label: 'DAYS', value: timeLeft.days },
          { label: 'HOURS', value: timeLeft.hours },
          { label: 'MINS', value: timeLeft.minutes },
          { label: 'SECS', value: timeLeft.seconds },
        ].map((item, index) => (
          <div key={index} className="relative group">
            <div className="bg-z-bg border border-white/10 p-4 md:p-6 rounded-lg group-hover:border-z-violet-base/30 transition-all duration-300">
              <div className="text-3xl md:text-5xl font-display font-black text-white italic mb-2 tabular-nums group-hover:text-z-violet-peak transition-colors">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-[10px] md:text-xs text-z-text-muted font-mono uppercase tracking-widest">
                {item.label}
              </div>
            </div>
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-z-violet-base/0 group-hover:border-z-violet-base/50 transition-all duration-300" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-z-violet-base/0 group-hover:border-z-violet-base/50 transition-all duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};
