'use client';

import { motion } from 'framer-motion';

interface ScanLinesProps {
  opacity?: number;
}

export default function ScanLines({ opacity = 0.08 }: ScanLinesProps) {
  return (
    <>
      {/* Static Scan Lines */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1000]"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, ${opacity}),
            rgba(0, 0, 0, ${opacity}) 1px,
            transparent 1px,
            transparent 2px
          )`
        }}
      />
      
      {/* Moving Scan Line */}
      <motion.div
        className="fixed left-0 w-full h-[4px] pointer-events-none z-[1001]"
        style={{
          background: `linear-gradient(
            180deg,
            transparent 0%,
            rgba(255, 113, 206, 0.15) 50%,
            transparent 100%
          )`,
          boxShadow: '0 0 20px rgba(255, 113, 206, 0.3)'
        }}
        animate={{
          top: ['-10%', '110%']
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Occasional Horizontal Glitch Line */}
      <motion.div
        className="fixed left-0 w-full h-[2px] pointer-events-none z-[1002]"
        style={{
          background: 'rgba(1, 205, 254, 0.5)'
        }}
        animate={{
          top: ['20%', '80%', '40%', '60%', '30%'],
          opacity: [0, 0.8, 0, 0.6, 0],
          scaleX: [1, 0.8, 1, 0.9, 1]
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 5,
          ease: 'linear'
        }}
      />
    </>
  );
}

