
import React, { useState } from 'react';
import { UniverseVariant } from '../types';

const variants: UniverseVariant[] = [
  {
    title: "We meet in college",
    story: "We'd have spent afternoons in the library, me pretending to study while actually watching you. We'd have grown up together, our dreams intertwining from the very start."
  },
  {
    title: "We meet at 40",
    story: "Two weary souls finding home in each other's eyes. We'd have lived whole lives separately, only to realize that every road was just leading us to that one afternoon coffee together."
  },
  {
    title: "We fight, but never leave",
    story: "In this universe, we are stubborn. We argue about the small things, but we never let go of each other's hands. Our love is the quiet choice we make every single morning."
  },
  {
    title: "You still choose Monkey",
    story: "Even if I was a different person, in a different city, with a different name... your heart would recognize mine. Because some connections aren't just temporal; they're eternal."
  }
];

export const ParallelUniverse: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  const haptic = (pattern: number = 10) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-serif text-white mb-12">Choose a Universe</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {variants.map((v, i) => (
          <div
            key={i}
            className={`glass p-6 rounded-2xl cursor-pointer transition-all duration-500 text-left overflow-hidden ${active === i ? 'ring-2 ring-pink-500/50 bg-white/10' : 'hover:bg-white/5'}`}
            onClick={() => {
              haptic(8);
              setActive(active === i ? null : i);
            }}
          >
            <h3 className="text-lg font-serif text-pink-300 mb-2">{v.title}</h3>
            <div className={`transition-all duration-500 overflow-hidden ${active === i ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <p className="text-white/70 italic leading-relaxed">{v.story}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
