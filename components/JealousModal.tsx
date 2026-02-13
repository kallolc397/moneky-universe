
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const JealousConfessionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const haptic = (pattern: number = 10) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
      onClick={() => {
        haptic(5);
        onClose();
      }}
    >
      <div 
        className="glass w-full max-w-sm rounded-3xl p-10 text-center animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-serif text-white mb-6">A Confession</h2>
        <p className="text-white/80 leading-relaxed mb-8">
          “Because when something is rare, you protect it. And you, Puchku… are once-in-a-lifetime rare.”
        </p>
        <button
          onClick={() => {
            haptic(10);
            onClose();
          }}
          className="w-full py-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all"
        >
          I Understand, Monkey
        </button>
      </div>
    </div>
  );
};
