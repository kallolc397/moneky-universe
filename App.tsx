
import React, { useState, useEffect, useRef } from 'react';
import { HeroSection } from './components/HeroSection';
import { PlayfulChoice } from './components/PlayfulChoice';
import { StoryChapters } from './components/StoryChapters';
import { JealousConfessionModal } from './components/JealousModal';
import { SecretVault } from './components/SecretVault';
import { MemoryConstellation } from './components/MemoryConstellation';
import { ParallelUniverse } from './components/ParallelUniverse';
import { ReassuranceButton } from './components/Reassurance';
import { DancingMonkeyFinale } from './components/DancingMonkey';
import { ParticleBackground } from './components/ParticleBackground';
import { BackgroundMusic } from './components/BackgroundMusic';
import { AdminPanel } from './components/AdminPanel';

const App: React.FC = () => {
  const [appStarted, setAppStarted] = useState(false);
  const [isJealousModalOpen, setIsJealousModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);
  
  // Persistent State for Dedication Message Only
  const [dedication, setDedication] = useState(() => 
    localStorage.getItem('monkey_dedication') || "A song I chose just for you, my Puchku."
  );

  const finaleRef = useRef<HTMLDivElement>(null);

  const haptic = (pattern: number | number[] = 10) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const handleStartApp = () => {
    haptic(20);
    setAppStarted(true);
    setShouldPlayMusic(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const scrollToFinale = () => {
    haptic([30, 50, 30]);
    finaleRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const resetUniverse = () => {
    haptic(10);
    setAppStarted(false);
    setShouldPlayMusic(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateDedication = (text: string) => {
    setDedication(text);
    localStorage.setItem('monkey_dedication', text);
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070312] overflow-hidden selection:bg-pink-500/30">
      <ParticleBackground />
      <BackgroundMusic isPlaying={shouldPlayMusic} dedication={dedication} />

      {/* Progress Bar */}
      {appStarted && (
        <div className="fixed top-0 left-0 w-full h-[2px] z-[100] bg-white/5">
          <div 
            className="h-full bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(236,72,153,0.5)]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {!appStarted ? (
        <HeroSection onEnter={handleStartApp} onOpenAdmin={() => setIsAdminOpen(true)} />
      ) : (
        <main className="relative z-10 w-full">
          {/* Subtle Dedication Header */}
          <div className={`fixed top-8 left-1/2 -translate-x-1/2 pointer-events-none z-[100] text-center transition-all duration-1000 ${scrollProgress > 2 ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 italic font-light">
              {dedication}
            </p>
          </div>

          <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
             <PlayfulChoice />
          </section>

          <section className="py-40 px-6">
            <StoryChapters />
          </section>

          <section className="py-40 px-6 flex flex-col items-center gap-20">
            <button
              onClick={() => {
                haptic(10);
                setIsJealousModalOpen(true);
              }}
              className="px-10 py-5 glass rounded-full text-pink-200/80 hover:text-white transition-all hover:bg-white/10 active:scale-95 group relative overflow-hidden"
            >
              <span className="relative z-10 font-medium tracking-wide">Why Are You So Possessive, Monkey?</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <SecretVault />
          </section>

          <section className="py-40 px-4 min-h-screen flex flex-col items-center">
            <MemoryConstellation onComplete={scrollToFinale} />
          </section>

          <section className="py-40 px-6">
            <ParallelUniverse />
          </section>

          <section 
            ref={finaleRef}
            className="min-h-screen flex items-center justify-center py-20 px-6"
          >
            <DancingMonkeyFinale onReset={resetUniverse} />
          </section>

          <footer className="py-20 flex flex-col items-center justify-center gap-4 text-white/10">
            <div className="w-8 h-[1px] bg-white/5" />
            <p className="text-[9px] tracking-[0.4em] uppercase font-light">End of the Universe</p>
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="text-[8px] opacity-20 hover:opacity-100 transition-opacity mt-10 hover:tracking-widest duration-500"
            >
              ADMIN ACCESS
            </button>
          </footer>

          <JealousConfessionModal 
            isOpen={isJealousModalOpen} 
            onClose={() => setIsJealousModalOpen(false)} 
          />

          <ReassuranceButton />
          
          <AdminPanel 
            isOpen={isAdminOpen} 
            onClose={() => setIsAdminOpen(false)}
            dedication={dedication}
            onUpdateDedication={updateDedication}
          />

          <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 ${scrollProgress > 5 ? 'opacity-0 translate-y-10' : 'opacity-100'}`}>
            <span className="text-[9px] uppercase tracking-[0.5em] font-light text-white/40">Scroll into our world</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-white animate-scroll-indicator" />
            </div>
          </div>
        </main>
      )}
      <style>{`
        @keyframes scroll-indicator {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-indicator {
          animation: scroll-indicator 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default App;
