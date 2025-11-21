import React, { useState, useEffect } from 'react';

export const VotingCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // November 21, 2025 at 2:00 PM EST (14:00)
    const launchDate = new Date('2025-11-21T14:00:00-05:00').getTime();

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
        setIsOpen(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsOpen(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  if (isOpen) {
    return (
      <div className="bg-gradient-to-r from-z-violet-base/20 via-z-violet-peak/20 to-z-violet-base/20 border border-z-violet-peak/50 p-6 rounded-lg backdrop-blur-sm">
        <div className="text-center">
          <h3 className="text-z-violet-peak font-display font-bold text-xl italic mb-2">VOTING OPEN</h3>
          <p className="text-z-steel-gray font-mono text-sm">You can now cast your votes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-z-violet-base/20 via-z-violet-peak/20 to-z-violet-base/20 border border-z-violet-base/30 p-6 rounded-lg backdrop-blur-sm">
      <div className="text-center mb-4">
        <h3 className="text-z-violet-peak font-display font-bold text-lg italic mb-2">VOTING OPENS</h3>
        <p className="text-z-steel-gray font-mono text-xs">Friday, November 21, 2025 at 2:00 PM EST</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'DAYS', value: timeLeft.days },
          { label: 'HOURS', value: timeLeft.hours },
          { label: 'MIN', value: timeLeft.minutes },
          { label: 'SEC', value: timeLeft.seconds },
        ].map((item, index) => (
          <div key={index} className="text-center">
            <div className="bg-z-obsidian/50 border border-z-violet-base/20 p-4 rounded">
              <div className="text-3xl font-display font-bold text-white italic mb-1">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-z-steel-gray font-mono uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Hook to check if voting is open
export const useVotingOpen = (): boolean => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const launchDate = new Date('2025-11-21T14:00:00-05:00').getTime();
    const checkVoting = () => {
      const now = new Date().getTime();
      setIsOpen(now >= launchDate);
    };
    
    checkVoting();
    const timer = setInterval(checkVoting, 1000);
    return () => clearInterval(timer);
  }, []);

  return isOpen;
};

