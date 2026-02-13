
import React, { useState } from 'react';

export const SecretVault: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const haptic = (pattern: number | number[] = 10) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const checkPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'monkey') {
      haptic([20, 60, 20]);
      setIsUnlocked(true);
      setError(false);
    } else {
      haptic([10, 10, 10]);
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!isUnlocked ? (
        <form onSubmit={checkPassword} className="glass p-8 rounded-3xl text-center">
          <h2 className="text-xl font-serif text-white mb-4">The Secret Vault</h2>
          <p className="text-white/50 text-xs mb-6 tracking-wide">Enter the password only you know...</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="What do I call myself?"
            className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-all mb-4`}
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl text-white font-medium hover:opacity-90 active:scale-95 transition-all"
          >
            Unlock Heart
          </button>
          {error && <p className="text-red-400 text-xs mt-2 animate-bounce">Hint: Think about the theme of this app!</p>}
        </form>
      ) : (
        <div className="glass p-8 rounded-3xl text-center border-pink-500/30 animate-pulse">
          <p className="text-pink-200 text-lg italic leading-relaxed">
            “I don’t just love you. I choose you. Even on the days you doubt me. Even on the days I doubt myself.”
          </p>
        </div>
      )}
    </div>
  );
};
