
import React, { useEffect, useRef, useState } from 'react';
import { Star } from '../types';

export const MemoryConstellation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [phase, setPhase] = useState<'random' | 'pm' | 'sangita' | 'forever'>('random');
  const [showRewrite, setShowRewrite] = useState(false);

  const haptic = (pattern: number | number[] = 10) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  // Patterns with normalized coordinates
  const pmPattern = [
    { x: 0.38, y: 0.45 }, { x: 0.38, y: 0.5 }, { x: 0.38, y: 0.55 }, { x: 0.42, y: 0.45 }, { x: 0.45, y: 0.48 }, { x: 0.42, y: 0.52 }, // P
    { x: 0.55, y: 0.55 }, { x: 0.55, y: 0.45 }, { x: 0.6, y: 0.5 }, { x: 0.65, y: 0.45 }, { x: 0.65, y: 0.55 } // M
  ];

  const sangitaPattern = [
    { x: 0.25, y: 0.5 }, { x: 0.28, y: 0.48 }, { x: 0.31, y: 0.52 }, // S
    { x: 0.35, y: 0.55 }, { x: 0.37, y: 0.48 }, { x: 0.39, y: 0.55 }, // A
    { x: 0.43, y: 0.48 }, { x: 0.43, y: 0.55 }, { x: 0.47, y: 0.52 }, // N
    { x: 0.51, y: 0.55 }, { x: 0.54, y: 0.48 }, { x: 0.57, y: 0.52 }, // G
    { x: 0.61, y: 0.48 }, { x: 0.61, y: 0.55 }, // I
    { x: 0.65, y: 0.48 }, { x: 0.68, y: 0.48 }, { x: 0.665, y: 0.55 }, // T
    { x: 0.72, y: 0.55 }, { x: 0.74, y: 0.48 }, { x: 0.76, y: 0.55 } // A
  ];

  const foreverPattern = [
     { x: 0.45, y: 0.5 }, { x: 0.48, y: 0.47 }, { x: 0.52, y: 0.53 }, { x: 0.55, y: 0.5 }, // Loop 1
     { x: 0.52, y: 0.47 }, { x: 0.48, y: 0.53 }, { x: 0.45, y: 0.5 } // Loop 2
  ];

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const count = 80;
      for (let i = 0; i < count; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        newStars.push({
          x, y,
          originX: x, originY: y,
          targetX: x, targetY: y,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          clicked: false
        });
      }
      setStars(newStars);
    };
    generateStars();

    const interval = setInterval(() => {
      if (phase === 'random') {
        setPhase('sangita');
        setTimeout(() => setPhase('random'), 4000);
      }
    }, 28000);

    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentPattern = phase === 'pm' ? pmPattern : phase === 'sangita' ? sangitaPattern : phase === 'forever' ? foreverPattern : null;

      stars.forEach((star, i) => {
        if (currentPattern && i < currentPattern.length) {
          star.targetX = currentPattern[i].x * canvas.width;
          star.targetY = currentPattern[i].y * canvas.height;
        } else {
          star.targetX = star.originX;
          star.targetY = star.originY;
        }

        // Kinetic friction for movement
        star.x += (star.targetX - star.x) * 0.05;
        star.y += (star.targetY - star.y) * 0.05;

        // Twinkle effect
        const twinkle = 0.5 + Math.sin(Date.now() * 0.0015 + i) * 0.3;
        const finalOpacity = phase === 'random' ? star.opacity * twinkle : 0.9;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        
        if (phase !== 'random' && currentPattern && i < currentPattern.length) {
           ctx.shadowBlur = 20;
           ctx.shadowColor = 'rgba(236, 72, 153, 0.9)';
           ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        } else {
           ctx.shadowBlur = 0;
           ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
        }
        ctx.fill();
      });

      // Cinematic connections
      if (phase !== 'random' && currentPattern) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.25)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < currentPattern.length - 1; i++) {
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[i+1].x, stars[i+1].y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(update);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    update();

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [stars, phase]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (phase !== 'random') return;
    haptic(10);
    setClickCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        haptic([30, 70, 30]);
        setPhase('pm');
        setTimeout(() => setShowRewrite(true), 3000);
      }
      return next;
    });
  };

  const handleRewrite = () => {
    haptic(20);
    setPhase('forever');
    setShowRewrite(false);
  };

  return (
    <div className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
      <canvas 
        ref={canvasRef} 
        onClick={handleCanvasClick}
        className="w-full h-full cursor-pointer active:scale-[0.99] transition-transform duration-1000" 
      />
      
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center p-6">
        {phase === 'random' && (
          <div className="reveal visible animate-pulse space-y-3">
            <p className="text-white/40 italic font-light tracking-[0.2em] text-sm">Tap the brightest stars...</p>
            <div className="flex justify-center gap-1">
               {[...Array(5)].map((_, i) => (
                 <div key={i} className={`w-1 h-1 rounded-full transition-all duration-500 ${i < clickCount ? 'bg-pink-500 scale-150' : 'bg-white/10'}`} />
               ))}
            </div>
          </div>
        )}
        
        {phase === 'pm' && (
          <div className="animate-fade-in-up space-y-6">
            <h2 className="text-7xl font-serif text-white text-glow italic">P + M</h2>
            <p className="text-pink-200/80 italic max-w-sm mx-auto text-lg leading-relaxed">
              “Even the universe connected us. And I would find you in every lifetime.”
            </p>
          </div>
        )}

        {phase === 'sangita' && (
           <h2 className="text-4xl md:text-6xl font-serif text-pink-400/30 uppercase tracking-[1.5em] animate-fade-in text-glow blur-[1px]">SANGITA</h2>
        )}

        {showRewrite && (
          <div className="pointer-events-auto mt-32">
            <button
              onClick={handleRewrite}
              className="px-12 py-4 glass rounded-full text-white font-medium tracking-widest uppercase hover:bg-white/10 hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(236,72,153,0.2)]"
            >
              Rewrite the Stars ✨
            </button>
          </div>
        )}

        {phase === 'forever' && (
          <div className="animate-fade-in text-center pointer-events-auto flex flex-col items-center">
             <h2 className="text-5xl md:text-7xl font-serif text-white mb-12 italic text-glow">Forever?</h2>
             <div className="flex gap-8">
                <button 
                  onClick={() => {
                    haptic(15);
                    onComplete();
                  }}
                  className="px-10 py-3 bg-gradient-to-r from-pink-600 to-violet-600 rounded-full text-white font-semibold tracking-widest uppercase shadow-xl hover:scale-110 hover:rotate-3 transition-all"
                >
                  Yes
                </button>
                <button 
                  onClick={() => {
                    haptic(15);
                    onComplete();
                  }}
                  className="px-10 py-3 glass rounded-full text-white font-semibold tracking-widest uppercase hover:scale-110 hover:-rotate-3 transition-all"
                >
                  Absolutely
                </button>
             </div>
             <p className="mt-16 text-white/30 italic font-light tracking-widest uppercase text-[10px]">Good. Monkey was nervous.</p>
          </div>
        )}
      </div>
    </div>
  );
};
