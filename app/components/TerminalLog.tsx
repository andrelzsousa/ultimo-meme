'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TerminalLogProps {
  messages: string[];
}

export default function TerminalLog({ messages }: TerminalLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getMessageColor = (message: string) => {
    if (message.includes('ERRO') || message.includes('ERROR')) return 'text-[#FF4757]';
    if (message.includes('ALERTA') || message.includes('AVISO')) return 'text-[#FFB347]';
    if (message.includes('RESULTADO')) return 'text-[#01CDFE]';
    if (message.includes('SECRETO')) return 'text-[#FF71CE]';
    if (message.includes('PROCESSO')) return 'text-[#B967FF]';
    return 'text-[#39FF14]/70';
  };

  return (
    <div className="vapor-panel p-4 h-full min-h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[#39FF14] font-bold text-sm tracking-wider">
          LOG DO SISTEMA
        </h3>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-[#FF4757]" />
          <span className="w-2 h-2 rounded-full bg-[#FFB347]" />
          <span className="w-2 h-2 rounded-full bg-[#39FF14]" />
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-1 scrollbar-thin"
      >
        {messages.map((message, index) => (
          <motion.div
            key={`${index}-${message}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`${getMessageColor(message)} break-words`}
          >
            <span className="text-white/30 mr-2">
              {new Date().toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
              })}
            </span>
            {message}
          </motion.div>
        ))}
        
        {/* Blinking cursor */}
        <div className="text-[#39FF14]">
          <span className="animate-pulse">█</span>
        </div>
      </div>

      {/* Terminal footer */}
      <div className="mt-3 pt-3 border-t border-[#39FF14]/20 text-[10px] text-white/30 flex justify-between">
        <span>S.R.A.C.P. Terminal v3.45</span>
        <span>{messages.length} registros</span>
      </div>
    </div>
  );
}

