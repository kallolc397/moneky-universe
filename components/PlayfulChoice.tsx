
import React, { useState, useEffect } from 'react';

export const PlayfulChoice: React.FC = () => {
  const [noPosition, setNoPosition] = useState({ x: 80, y: 0 });
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; s: number; r: number }[]>([]);
  const [answered, setAnswered] = useState(false);

  const haptic = (pattern: number | number[] = 10) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const dodge = () => {
    haptic(5);
    // Elegant dodging within a safe radius
    const angle = Math.random() * Math.PI * 2;
    const dist = 100 + Math.random() * 50;
    const newX = Math.cos(angle) * dist;
    const newY = Math.sin(angle) * dist;
    
    // Boundary checks
    const clampedX = Math.max(-120, Math.min(120, newX));
    const clampedY = Math.max(-100, Math.min(100, newY));
    
    setNoPosition({ x: clampedX, y: clampedY });
  };

  const handleYes = () => {
    haptic([20, 40, 20]);
    setAnswered(true);
    const newHearts = Array.from({ length: 30 }).map((_, i) => ({
      id: Date.now() + i,
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40,
      s: 10 + Math.random() * 30,
      r: Math.random() * 360
    }));
    setHearts(newHearts);
    setTimeout(() => setHearts([]), 4000);
  };

  return (
    <div className="text-center w-full max-w-lg">
      <div className="reveal visible">
        {!answered ? (
          <>
            <h2 className="text-4xl font-serif text-white mb-20 tracking-wide text-glow">Do you love Monkey?</h2>
            <div className="relative h-64 flex items-center justify-center">
              <button
                onClick={handleYes}
                className="z-20 px-10 py-4 bg-pink-600 rounded-full text-white font-semibold tracking-widest uppercase shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:scale-110 hover:shadow-pink-500/50 active:scale-95 transition-all duration-300"
              >
                Yes, Forever
              </button>
              
              <button
                onMouseEnter={dodge}
                onClick={dodge}
                className="absolute z-10 px-8 py-3 glass rounded-full text-white/40 text-sm font-light tracking-widest uppercase transition-all duration-500 ease-out"
                style={{ 
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                }}
              >
                I Don't
              </button>
            </div>
          </>
        ) : (
          <div className="animate-fade-in py-12">
            <h2 className="text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-violet-400 mb-6 italic">Monkey knew it.</h2>
            <p className="text-white/40 font-light tracking-[0.3em] uppercase text-[10px]">Your heart beat just a little faster</p>
          </div>
        )}
      </div>

      {hearts.map(h => (
        <div
          key={h.id}
          className="fixed pointer-events-none text-red-500/60 transition-all duration-1000 ease-out"
          style={{ 
            top: `${h.y}%`, 
            left: `${h.x}%`, 
            fontSize: `${h.s}px`,
            transform: `rotate(${h.r}deg)`,
            animation: `float-heart ${2 + Math.random() * 2}s forwards ease-out`
          }}
        >
          ❤️
        </div>
      ))}
      <style>{`
        @keyframes float-heart {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-300px) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
