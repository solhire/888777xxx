import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../Button';

interface Target {
  id: number;
  x: number;
  y: number;
  size: number;
  createdAt: number;
}

export const AimTrainer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targets, setTargets] = useState<Target[]>([]);
  const [accuracy, setAccuracy] = useState(100);
  const [clicks, setClicks] = useState(0);
  const [hits, setHits] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const spawnTarget = () => {
    if (!containerRef.current) return;
    
    const id = Date.now() + Math.random();
    // Random position within 10% - 90% of container to avoid edges
    const x = 10 + Math.random() * 80; 
    const y = 10 + Math.random() * 80;
    const size = 40 + Math.random() * 40; // Size between 40px and 80px

    setTargets(prev => [...prev, { id, x, y, size, createdAt: Date.now() }]);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setTargets([]);
    setClicks(0);
    setHits(0);
    setAccuracy(100);
    spawnTarget();

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    setIsPlaying(false);
    setTargets([]);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if (!isPlaying) return;
    // If clicking background (miss)
    if (e.target === containerRef.current) {
      setClicks(prev => prev + 1);
    }
  };

  const handleTargetClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent container click
    if (!isPlaying) return;

    setHits(prev => prev + 1);
    setClicks(prev => prev + 1);
    setScore(prev => prev + 100); // Basic scoring
    
    // Remove clicked target
    setTargets(prev => prev.filter(t => t.id !== id));
    
    // Spawn new one immediately
    spawnTarget();
  };

  useEffect(() => {
    if (clicks > 0) {
      setAccuracy(Math.round((hits / clicks) * 100));
    }
  }, [clicks, hits]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Game Header / HUD */}
      <div className="flex justify-between items-center mb-4 bg-z-obsidian/50 p-4 rounded-lg border border-white/10">
        <div className="text-center">
            <div className="text-xs text-z-steel-gray font-mono uppercase">SCORE</div>
            <div className="text-2xl font-display font-bold text-z-violet-peak">{score}</div>
        </div>
        <div className="text-center">
            <div className="text-xs text-z-steel-gray font-mono uppercase">TIME</div>
            <div className={`text-3xl font-display font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                {timeLeft}s
            </div>
        </div>
        <div className="text-center">
            <div className="text-xs text-z-steel-gray font-mono uppercase">ACCURACY</div>
            <div className="text-2xl font-display font-bold text-z-cyan">{accuracy}%</div>
        </div>
      </div>

      {/* Game Area */}
      <div 
        ref={containerRef}
        onClick={handleContainerClick}
        className={`relative w-full h-[500px] bg-black/40 border-2 rounded-xl overflow-hidden cursor-crosshair transition-all duration-300 ${isPlaying ? 'border-z-violet-base/50 shadow-[0_0_30px_rgba(106,0,255,0.1)]' : 'border-white/10'}`}
      >
        {/* Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        {!isPlaying && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
                <h2 className="text-4xl font-display font-black italic text-white mb-2">NEURO-AIM</h2>
                <p className="text-z-steel-gray font-mono mb-8">Calibrate your precision. Click the targets.</p>
                <Button onClick={startGame} size="lg" className="animate-pulse">
                    {score > 0 ? 'PLAY AGAIN' : 'START SEQUENCE'}
                </Button>
                {score > 0 && (
                    <div className="mt-6 text-center">
                        <p className="text-sm text-z-text-secondary">LAST RUN</p>
                        <p className="text-xl text-white font-bold">{score} PTS <span className="text-z-steel-gray text-sm">({accuracy}%)</span></p>
                    </div>
                )}
            </div>
        )}

        {targets.map(target => (
            <button
                key={target.id}
                onMouseDown={(e) => handleTargetClick(e, target.id)}
                className="absolute rounded-full border-2 border-z-cyan bg-z-cyan/20 hover:bg-z-cyan/40 active:scale-95 transition-transform duration-75 flex items-center justify-center group focus:outline-none"
                style={{
                    left: `${target.x}%`,
                    top: `${target.y}%`,
                    width: `${target.size}px`,
                    height: `${target.size}px`,
                    transform: 'translate(-50%, -50%)',
                    animation: 'popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
            >
                <div className="w-2 h-2 bg-z-cyan rounded-full shadow-[0_0_10px_#22d3ee]" />
            </button>
        ))}
      </div>

      <style>{`
        @keyframes popIn {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

