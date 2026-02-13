
import React, { useState, useEffect, useRef } from 'react';

interface HeroProps {
  onEnter: () => void;
  onOpenAdmin: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onEnter, onOpenAdmin }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const longPressTimer = useRef<number | null>(null);

  const phrases = [
    "Some stories are written in books...",
    "Ours was written in heartbeats.",
    "Welcome home, Puchku."
  ];

  // Fix: Update haptic signature to accept number | number[] to match navigator.vibrate
  const haptic = (pattern: number | number[] = 10) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const handleStartAdminTimer = () => {
    longPressTimer.current = window.setTimeout(() => {
      haptic([50, 50, 50]);
      onOpenAdmin();
    }, 3000); // 3 second hold for admin panel
  };

  const handleClearAdminTimer = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  useEffect(() => {
    let charIndex = 0;
    let currentPhrase = phrases[textIndex];
    let timeout: any;

    const type = () => {
      if (charIndex <= currentPhrase.length) {
        setDisplayText(currentPhrase.substring(0, charIndex));
        charIndex++;
        timeout = setTimeout(type, 60 + Math.random() * 40);
      } else {
        if (textIndex < phrases.length - 1) {
          setTimeout(() => {
            setTextIndex(prev => prev + 1);
          }, 1800);
        }
      }
    };

    type();
    return () => clearTimeout(timeout);
  }, [textIndex]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070312] text-center p-6">
      <div className="relative mb-20">
        <div className="absolute -inset-10 bg-pink-500/10 blur-[100px] rounded-full animate-pulse" />
        <h1 
          onMouseDown={handleStartAdminTimer}
          onMouseUp={handleClearAdminTimer}
          onTouchStart={handleStartAdminTimer}
          onTouchEnd={handleClearAdminTimer}
          className="relative text-3xl md:text-5xl font-serif text-white/95 h-32 flex items-center justify-center leading-relaxed tracking-tight max-w-2xl px-4 select-none"
        >
          <span className="italic">{displayText}</span>
          <span className="inline-block w-[1px] h-8 md:h-12 bg-pink-500 ml-3 animate-pulse shadow-[0_0_15px_#ec4899]" />
        </h1>
      </div>

      <div className={`transition-all duration-1000 ${textIndex === phrases.length - 1 && displayText.length >= phrases[textIndex].length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <button
          onClick={() => {
            haptic(15);
            onEnter();
          }}
          className="group relative px-12 py-5 rounded-full overflow-hidden transition-all duration-500 active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-pink-600 to-orange-500 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)] opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10 text-white text-lg font-medium tracking-[0.1em] uppercase">
            Unlock The Monkey’s Heart
          </span>
        </button>
        <p className="mt-6 text-white/20 text-xs tracking-widest uppercase font-light">Interactive Experience</p>
      </div>
    </div>
  );
};
