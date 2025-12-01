'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

export default function GlitchText({ 
  text, 
  className = '', 
  intensity = 'medium',
  as: Component = 'span' 
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchIntervals = {
    low: 8000,
    medium: 4000,
    high: 2000
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      
      let iterations = 0;
      const maxIterations = intensity === 'high' ? 15 : intensity === 'medium' ? 10 : 5;
      
      const scrambleInterval = setInterval(() => {
        setDisplayText(prev => 
          text.split('').map((char, idx) => {
            if (char === ' ') return ' ';
            if (iterations > idx) return text[idx];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }).join('')
        );
        
        iterations += 1;
        
        if (iterations > maxIterations) {
          clearInterval(scrambleInterval);
          setDisplayText(text);
          setIsGlitching(false);
        }
      }, 30);
      
    }, glitchIntervals[intensity]);

    return () => clearInterval(interval);
  }, [text, intensity]);

  return (
    <Component
      className={`glitch-text ${className} ${isGlitching ? 'glitching' : ''}`}
      data-text={text}
    >
      <motion.span
        animate={isGlitching ? {
          x: [0, -2, 2, -1, 1, 0],
          opacity: [1, 0.8, 1, 0.9, 1]
        } : {}}
        transition={{ duration: 0.2 }}
      >
        {displayText}
      </motion.span>
    </Component>
  );
}

