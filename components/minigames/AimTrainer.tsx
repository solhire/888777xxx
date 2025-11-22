import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../Button';

interface Target {
  id: number;
  x: number;
  y: number;
  size: number;
  createdAt: number;
  isGolden?: boolean;
}

export const AimTrainer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targets, setTargets] = useState<Target[]>([]);
  const [accuracy, setAccuracy] = useState(100);
  const [clicks, setClicks] = useState(0);
  const [hits, setHits] = useState(0);
  const [combo, setCombo] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const spawnTarget = () => {
    if (!containerRef.current) return;
    
    const id = Date.now() + Math.random();
    const x = 10 + Math.random() * 80; 
    const y = 10 + Math.random() * 80;
    const size = 40 + Math.random() * 40;
    const isGolden = Math.random() > 0.9; // 10% chance for golden target

    setTargets(prev => [...prev, { id, x, y, size, createdAt: Date.now(), isGolden }]);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setTargets([]);
    setClicks(0);
    setHits(0);
    setAccuracy(100);
    setCombo(0);
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
    if (e.target === containerRef.current) {
      setClicks(prev => prev + 1);
      setCombo(0); // Reset combo on miss
    }
  };

  const handleTargetClick = (e: React.MouseEvent, target: Target) => {
    e.stopPropagation();
    if (!isPlaying) return;

    setHits(prev => prev + 1);
    setClicks(prev => prev + 1);
    setCombo(prev => prev + 1);
    
    // Scoring: Base (100) + Combo Bonus + Golden Bonus
    const comboBonus = Math.min(combo * 10, 200);
    const points = 100 + comboBonus + (target.isGolden ? 400 : 0);
    setScore(prev => prev + points);
    
    setTargets(prev => prev.filter(t => t.id !== target.id));
    
    // Spawn 1 or sometimes 2 targets for higher difficulty
    spawnTarget();
    if (Math.random() > 0.7 && targets.length < 3) spawnTarget();
  };

  useEffect(() => {
    if (clicks > 0) {
      setAccuracy(Math.round((hits / clicks) * 100));
    }
  }, [clicks, hits]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* HUD */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-z-card border border-white/10 p-4 rounded-xl backdrop-blur-sm">
            <div className="text-[10px] text-z-text-muted font-mono uppercase tracking-widest mb-1">SCORE</div>
            <div className="text-3xl font-display font-black text-white italic">{score.toLocaleString()}</div>
        </div>
        <div className="bg-z-card border border-white/10 p-4 rounded-xl backdrop-blur-sm">
            <div className="text-[10px] text-z-text-muted font-mono uppercase tracking-widest mb-1">TIME</div>
            <div className={`text-3xl font-display font-black italic ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                {timeLeft}s
            </div>
        </div>
        <div className="bg-z-card border border-white/10 p-4 rounded-xl backdrop-blur-sm">
            <div className="text-[10px] text-z-text-muted font-mono uppercase tracking-widest mb-1">ACCURACY</div>
            <div className={`text-3xl font-display font-black italic ${accuracy >= 90 ? 'text-green-400' : 'text-z-cyan'}`}>
                {accuracy}%
            </div>
        </div>
        <div className="bg-z-card border border-white/10 p-4 rounded-xl backdrop-blur-sm relative overflow-hidden">
            <div className="text-[10px] text-z-text-muted font-mono uppercase tracking-widest mb-1">COMBO</div>
            <div className="text-3xl font-display font-black text-z-violet-peak italic">x{combo}</div>
            {combo > 5 && (
                <div className="absolute inset-0 bg-z-violet-base/10 animate-pulse pointer-events-none" />
            )}
        </div>
      </div>

      {/* Game Area */}
      <div 
        ref={containerRef}
        onClick={handleContainerClick}
        className={`relative w-full h-[600px] bg-z-bg border-2 rounded-2xl overflow-hidden cursor-crosshair transition-all duration-300 ${isPlaying ? 'border-z-cyan/30 shadow-[0_0_50px_rgba(34,211,238,0.1)]' : 'border-white/5'}`}
      >
        {/* Fancy Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/80 pointer-events-none" />

        {!isPlaying && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-20 p-8">
                <div className="w-20 h-20 mb-6 rounded-full bg-z-cyan/10 flex items-center justify-center border border-z-cyan/30 animate-pulse">
                    <svg className="w-10 h-10 text-z-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h2 className="text-5xl md:text-6xl font-display font-black italic text-white mb-2 tracking-tight">
                    NEURO<span className="text-z-cyan">AIM</span>
                </h2>
                <p className="text-z-text-secondary font-mono mb-8 text-center max-w-md">
                    Test your synaptic response time. Chain hits for combo multipliers. Gold targets grant bonus points.
                </p>
                <Button onClick={startGame} size="lg" className="min-w-[200px] shadow-[0_0_30px_rgba(34,211,238,0.3)] border-z-cyan/50 hover:bg-z-cyan hover:text-black">
                    {score > 0 ? 'RE-INITIALIZE' : 'INITIATE SEQUENCE'}
                </Button>
                
                {score > 0 && (
                    <div className="mt-12 grid grid-cols-3 gap-8 text-center w-full max-w-lg border-t border-white/10 pt-8">
                        <div>
                            <div className="text-xs text-z-text-muted mb-1">SCORE</div>
                            <div className="text-2xl font-bold text-white">{score.toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="text-xs text-z-text-muted mb-1">ACCURACY</div>
                            <div className="text-2xl font-bold text-z-cyan">{accuracy}%</div>
                        </div>
                        <div>
                            <div className="text-xs text-z-text-muted mb-1">BEST COMBO</div>
                            <div className="text-2xl font-bold text-z-violet-peak">x{combo}</div>
                        </div>
                    </div>
                )}
            </div>
        )}

        {targets.map(target => (
            <button
                key={target.id}
                onMouseDown={(e) => handleTargetClick(e, target)}
                className={`absolute rounded-full flex items-center justify-center group focus:outline-none transition-transform duration-75 active:scale-90
                    ${target.isGolden 
                        ? 'border-2 border-yellow-400 bg-yellow-400/20 hover:bg-yellow-400/40 shadow-[0_0_20px_rgba(250,204,21,0.4)]' 
                        : 'border-2 border-z-cyan bg-z-cyan/20 hover:bg-z-cyan/40 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                    }`}
                style={{
                    left: `${target.x}%`,
                    top: `${target.y}%`,
                    width: `${target.size}px`,
                    height: `${target.size}px`,
                    transform: 'translate(-50%, -50%)',
                    animation: 'popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
            >
                <div className={`rounded-full ${target.isGolden ? 'w-3 h-3 bg-yellow-400 shadow-[0_0_10px_#facc15]' : 'w-2 h-2 bg-z-cyan shadow-[0_0_10px_#22d3ee]'}`} />
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
