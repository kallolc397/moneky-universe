
import React, { useState, useEffect, useRef } from 'react';

interface BackgroundMusicProps {
  isPlaying: boolean;
  dedication: string;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ isPlaying, dedication }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [showDedication, setShowDedication] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  const haptic = (pattern: number | number[] = 10) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const fadeAudio = (targetVolume: number, duration: number = 2500) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const steps = 30;
    const increment = (targetVolume - audioRef.current.volume) / steps;
    const intervalTime = duration / steps;

    fadeIntervalRef.current = window.setInterval(() => {
      if (!audioRef.current) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        return;
      }
      
      const nextVolume = audioRef.current.volume + increment;
      if ((increment > 0 && nextVolume >= targetVolume) || (increment < 0 && nextVolume <= targetVolume)) {
        audioRef.current.volume = targetVolume;
        if (targetVolume === 0) audioRef.current.pause();
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      } else {
        audioRef.current.volume = Math.max(0, Math.min(1, nextVolume));
      }
    }, intervalTime);
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      // Audio starts here after user interaction (the HeroSection button)
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        fadeAudio(0.5);
        setShowDedication(true);
        setTimeout(() => setShowDedication(false), 6000);
      }).catch(err => {
        console.warn("Audio autoplay blocked or failed. User interaction required.", err);
      });
    } else if (!isPlaying && audioRef.current) {
      fadeAudio(0);
    }
    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    haptic(15);
    setIsMuted(!isMuted);
  };

  if (!isPlaying) return null;

  return (
    <>
      <div className="fixed top-6 right-6 z-[110] flex items-center gap-3">
        {/* Fixed Source: /song.mp3 */}
        <audio 
          ref={audioRef} 
          src="/song.mp3" 
          loop 
          preload="auto"
        />
        
        {!isMuted && (
          <div className="flex items-end gap-[2px] h-4 mb-1">
            {[0.4, 0.8, 0.5, 0.9, 0.6].map((h, i) => (
              <div 
                key={i}
                className="w-[2px] bg-pink-500 rounded-full animate-bar-bounce"
                style={{ 
                  height: '100%', 
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: `${0.6 + h}s`
                }}
              />
            ))}
          </div>
        )}

        <button
          onClick={toggleMute}
          className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all active:scale-90 shadow-lg shadow-black/20"
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      </div>

      {/* Dedication Toast */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[120] transition-all duration-1000 ease-out pointer-events-none ${showDedication ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'}`}>
        <div className="glass px-8 py-4 rounded-2xl flex items-center gap-4 border-pink-500/20 shadow-[0_0_40px_rgba(236,72,153,0.1)]">
          <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-xl animate-pulse">
            🎵
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-[0.3em] text-pink-400 font-semibold mb-1">Monkey's Dedication</p>
            <p className="text-sm text-white/90 font-serif italic">{dedication}</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bar-bounce {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
        .animate-bar-bounce {
          animation: bar-bounce infinite ease-in-out;
        }
      `}</style>
    </>
  );
};
