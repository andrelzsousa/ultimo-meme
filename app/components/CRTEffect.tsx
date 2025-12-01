'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CRTEffectProps {
  children: React.ReactNode;
}

export default function CRTEffect({ children }: CRTEffectProps) {
  const [showFlicker, setShowFlicker] = useState(false);
  const [showNoise, setShowNoise] = useState(false);

  useEffect(() => {
    // Random flicker effect
    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setShowFlicker(true);
        setTimeout(() => setShowFlicker(false), 100);
      }
    }, 500);

    // Random noise burst
    const noiseInterval = setInterval(() => {
      if (Math.random() > 0.98) {
        setShowNoise(true);
        setTimeout(() => setShowNoise(false), 200);
      }
    }, 2000);

    return () => {
      clearInterval(flickerInterval);
      clearInterval(noiseInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Main Content */}
      <motion.div
        className="relative z-10"
        animate={{
          opacity: showFlicker ? 0.7 : 1
        }}
        transition={{ duration: 0.05 }}
      >
        {children}
      </motion.div>

      {/* CRT Curvature Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[102]"
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 60%,
            rgba(0, 0, 0, 0.2) 90%,
            rgba(0, 0, 0, 0.5) 100%
          )`
        }}
      />

      {/* Random Noise Overlay */}
      <AnimatePresence>
        {showNoise && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-[103]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay'
            }}
          />
        )}
      </AnimatePresence>

      {/* Chromatic Aberration on edges */}
      <div 
        className="fixed inset-0 pointer-events-none z-[104]"
        style={{
          boxShadow: `
            inset 3px 0 10px rgba(255, 113, 206, 0.1),
            inset -3px 0 10px rgba(1, 205, 254, 0.1)
          `
        }}
      />

      {/* Subtle Vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-[101]"
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 50%,
            rgba(10, 6, 18, 0.4) 100%
          )`
        }}
      />
    </div>
  );
}

