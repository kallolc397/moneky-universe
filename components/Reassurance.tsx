
import React, { useState } from 'react';

export const ReassuranceButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const haptic = (pattern: number = 10) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          haptic(20);
          setIsOpen(true);
        }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-pink-600 rounded-full shadow-lg shadow-pink-500/40 flex items-center justify-center text-white z-[70] transition-transform hover:scale-110 active:scale-90"
      >
        ❤️
        <span className="absolute -top-10 right-0 glass px-3 py-1 rounded-full text-[10px] whitespace-nowrap text-white/70">Press if Overthinking</span>
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[80] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md"
          onClick={() => {
            haptic(5);
            setIsOpen(false);
          }}
        >
          <div className="glass p-8 rounded-3xl max-w-xs text-center border-white/20 animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-serif text-white mb-4">Hey, breathe...</h2>
            <p className="text-white/80 italic leading-relaxed">
              “Nothing is wrong. Nothing is ending. Monkey is dramatic sometimes. But always yours.”
            </p>
            <button 
              className="mt-6 text-pink-400 text-sm font-medium" 
              onClick={() => {
                haptic(10);
                setIsOpen(false);
              }}
            >
              Okay, I'm okay now.
            </button>
          </div>
        </div>
      )}
    </>
  );
};
