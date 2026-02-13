
import React, { useEffect, useRef } from 'react';

const chapters = [
  {
    title: "The Monkey Who Pretended To Be Strong",
    content: "He used to walk through the world alone, building walls around his heart like they were armor. He thought being strong meant never needing anyone."
  },
  {
    title: "The Woman Who Made Him Feel Enough",
    content: "Then came Puchku. Not as a storm, but as a sunrise. She didn't break his walls; she made them unnecessary by simply being there, seeing him for who he was."
  },
  {
    title: "The Jealous Monkey",
    content: "With love came the fear of loss. Sometimes the monkey gets possessive, not because he doubts you, but because he knows the world is full of people who don't know how lucky they'd be to have you."
  },
  {
    title: "When Puchku Became Home",
    content: "It isn't about the grand gestures anymore. It's the silent understanding, the shared laughter, and the way the universe feels right when you're just... home."
  }
];

export const StoryChapters: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = containerRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto space-y-32">
      {chapters.map((chapter, i) => (
        <div key={i} className="reveal text-center space-y-6">
          <div className="text-pink-500 text-sm font-mono tracking-widest uppercase mb-2">Chapter 0{i+1}</div>
          <h3 className="text-3xl md:text-4xl font-serif text-white">{chapter.title}</h3>
          <p className="text-lg text-white/70 leading-relaxed font-light italic">
            "{chapter.content}"
          </p>
          <div className="w-12 h-0.5 bg-gradient-to-r from-violet-500 to-pink-500 mx-auto mt-8 opacity-30"></div>
        </div>
      ))}
    </div>
  );
};
