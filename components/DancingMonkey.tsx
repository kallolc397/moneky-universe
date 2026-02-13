
import React from 'react';

export const DancingMonkeyFinale: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  const haptic = (pattern: number = 10) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 mb-12">
        <svg viewBox="0 0 200 200" className="w-full h-full">
           {/* Simple Adorable Monkey SVG */}
           <circle cx="100" cy="110" r="40" fill="#7d5a50" /> {/* Body */}
           <circle cx="100" cy="70" r="35" fill="#7d5a50" />  {/* Head */}
           <circle cx="100" cy="75" r="25" fill="#e9c46a" opacity="0.4" /> {/* Face */}
           
           {/* Ears */}
           <circle cx="65" cy="65" r="10" fill="#7d5a50" />
           <circle cx="135" cy="65" r="10" fill="#7d5a50" />
           
           {/* Eyes */}
           <circle cx="90" cy="70" r="3" fill="#000" />
           <circle cx="110" cy="70" r="3" fill="#000" />
           
           {/* Smile */}
           <path d="M 90 85 Q 100 95 110 85" fill="none" stroke="#000" strokeWidth="2" />
           
           {/* Tail Animation */}
           <path d="M 140 120 Q 170 110 160 90" fill="none" stroke="#7d5a50" strokeWidth="8" strokeLinecap="round">
             <animateTransform 
               attributeName="transform" 
               type="rotate" 
               from="-10 140 120" 
               to="10 140 120" 
               dur="1s" 
               repeatCount="indefinite" 
             />
           </path>

           {/* Arms - Waving */}
           <path d="M 70 100 Q 50 80 40 90" fill="none" stroke="#7d5a50" strokeWidth="8" strokeLinecap="round">
              <animate attributeName="d" values="M 70 100 Q 50 80 40 90; M 70 100 Q 50 110 40 100; M 70 100 Q 50 80 40 90" dur="2s" repeatCount="indefinite" />
           </path>
           <path d="M 130 100 Q 150 80 160 90" fill="none" stroke="#7d5a50" strokeWidth="8" strokeLinecap="round">
              <animate attributeName="d" values="M 130 100 Q 150 80 160 90; M 130 100 Q 150 110 160 100; M 130 100 Q 150 80 160 90" dur="1.8s" repeatCount="indefinite" />
           </path>
        </svg>
        
        {/* Floating Hearts */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="absolute text-red-500 animate-bounce"
            style={{ 
              top: '-20px', 
              left: `${i * 40}px`, 
              animationDelay: `${i * 0.2}s`,
              fontSize: '20px' 
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <h1 className="text-4xl font-serif text-white mb-4">Okay fine. Monkey happy now.</h1>
      <p className="text-white/60 mb-12 italic">Thank you for being my home, Puchku.</p>

      <button
        onClick={() => {
          haptic(20);
          onReset();
        }}
        className="px-10 py-4 glass rounded-full text-pink-300 hover:text-white transition-all hover:bg-white/20"
      >
        Replay Universe
      </button>
    </div>
  );
};
