'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import RestorationInterface from './components/RestorationInterface';
import FinalReveal from './components/FinalReveal';
import ScanLines from './components/ScanLines';
import CRTEffect from './components/CRTEffect';

type Phase = 'intro' | 'restoration' | 'final';

export default function Home() {
  const [currentPhase, setCurrentPhase] = useState<Phase>('intro');

  const handleIntroComplete = () => {
    setCurrentPhase('restoration');
  };

  const handleFinalReveal = () => {
    setCurrentPhase('final');
  };

  const handleRestart = () => {
    setCurrentPhase('intro');
  };

  return (
    <CRTEffect>
      <main className="min-h-screen relative">
        <ScanLines opacity={0.06} />
        
        <AnimatePresence mode="wait">
          {currentPhase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <IntroScreen onComplete={handleIntroComplete} />
            </motion.div>
          )}

          {currentPhase === 'restoration' && (
            <motion.div
              key="restoration"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <RestorationInterface onFinalReveal={handleFinalReveal} />
            </motion.div>
          )}

          {currentPhase === 'final' && (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FinalReveal onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient vaporwave sun */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] pointer-events-none opacity-10">
          <div 
            className="w-full h-full"
            style={{
              background: `
                radial-gradient(
                  ellipse at bottom,
                  #FF71CE 0%,
                  #B967FF 30%,
                  #01CDFE 50%,
                  transparent 70%
                )
              `
            }}
          />
          {/* Sun lines */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0a0612]"
              style={{
                bottom: `${10 + i * 15}%`,
                transform: `scaleX(${1 - i * 0.08})`
              }}
            />
          ))}
        </div>
      </main>
    </CRTEffect>
  );
}
