'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText';

interface FinalRevealProps {
  onRestart: () => void;
}

const finalNarration = [
  "E assim, após anos de busca obsessiva...",
  "...décadas vasculhando os escombros digitais de uma era esquecida...",
  "...eu finalmente encontrei.",
  "O último meme.",
  "A imagem que cruzou o limite.",
  "Que foi considerada 'longe demais'.",
  "Mas o que vejo diante de mim...",
  "...não é uma imagem completa.",
  "É um fragmento. Uma memória corrompida.",
  "Talvez seja essa a verdade que buscávamos.",
  "Os memes nunca foram sobre as imagens em si.",
  "Eram sobre nós. Sobre nossa capacidade de rir.",
  "De encontrar absurdo no mundano.",
  "De transformar o banal em arte efêmera.",
  "E quando proibiram o riso...",
  "...não apagaram apenas pixels.",
  "Apagaram uma parte de nossa humanidade.",
  "Este fragmento diante de mim...",
  "...é o último espelho honesto.",
  "A última prova de que um dia...",
  "...soubemos não nos levar tão a sério."
];

const crypticMessages = [
  "ARQUIVO CLASSIFICADO",
  "ÚLTIMO REGISTRO ANTES DA SATURAÇÃO",
  "CONTEÚDO CONSIDERADO: INADMISSÍVEL",
  "MOTIVO: 'ISSO FOI LONGE DEMAIS'",
  "DATA: ██/██/20██",
  "LOCALIZAÇÃO: [DADOS EXPURGADOS]",
  "CRIADOR: ANÔNIMO",
  "IMPACTO: CATALISADOR DA PROIBIÇÃO GLOBAL"
];

export default function FinalReveal({ onRestart }: FinalRevealProps) {
  const [phase, setPhase] = useState<'static' | 'narration' | 'reveal' | 'end'>('static');
  const [currentLine, setCurrentLine] = useState(0);
  const [showMeme, setShowMeme] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initial static phase
  useEffect(() => {
    const timer = setTimeout(() => setPhase('narration'), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Narration progression
  useEffect(() => {
    if (phase !== 'narration') return;

    const timer = setInterval(() => {
      setCurrentLine(prev => {
        if (prev >= finalNarration.length - 1) {
          clearInterval(timer);
          setTimeout(() => setPhase('reveal'), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [phase]);

  // Reveal phase
  useEffect(() => {
    if (phase !== 'reveal') return;

    setShowMeme(true);
    
    // Gradually increase glitch intensity
    const glitchTimer = setInterval(() => {
      setGlitchIntensity(prev => {
        if (prev >= 100) {
          clearInterval(glitchTimer);
          setTimeout(() => setPhase('end'), 3000);
          return prev;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(glitchTimer);
  }, [phase]);

  // Draw the corrupted final meme
  useEffect(() => {
    if (!showMeme || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Base dark background
    ctx.fillStyle = '#0a0612';
    ctx.fillRect(0, 0, width, height);

    // The "meme" - intentionally abstract and corrupted
    const intensity = glitchIntensity / 100;

    // Draw fragmented shapes suggesting an image
    for (let i = 0; i < 20; i++) {
      const colors = ['#FF71CE', '#01CDFE', '#B967FF', '#39FF14'];
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.globalAlpha = 0.1 + Math.random() * 0.2 * intensity;
      
      const x = Math.random() * width;
      const y = Math.random() * height;
      const w = Math.random() * 100 + 50;
      const h = Math.random() * 60 + 30;
      
      ctx.fillRect(x, y, w, h);
    }

    ctx.globalAlpha = 1;

    // Central corrupted text
    ctx.font = `bold ${40 + intensity * 20}px 'Courier New'`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Glitch offset
    const offsetX = (Math.random() - 0.5) * intensity * 20;
    const offsetY = (Math.random() - 0.5) * intensity * 10;

    // Shadow layers
    ctx.shadowColor = '#FF71CE';
    ctx.shadowBlur = 20 + intensity * 30;

    // Fragmented text
    const texts = ['ISSO', 'FOI', 'LONGE', 'DEMAIS'];
    texts.forEach((text, i) => {
      const yPos = height * 0.3 + i * 60;
      
      // Corruption effect
      let displayText = text;
      if (intensity > 0.3) {
        displayText = text.split('').map(char => 
          Math.random() < intensity * 0.5 ? '█' : char
        ).join('');
      }

      // Chromatic aberration
      ctx.fillStyle = '#01CDFE';
      ctx.fillText(displayText, width / 2 - 3 + offsetX, yPos + offsetY);
      
      ctx.fillStyle = '#FF71CE';
      ctx.fillText(displayText, width / 2 + 3 + offsetX, yPos + offsetY);
      
      ctx.fillStyle = '#ffffff';
      ctx.fillText(displayText, width / 2 + offsetX, yPos + offsetY);
    });

    ctx.shadowBlur = 0;

    // Scan lines
    for (let y = 0; y < height; y += 3) {
      ctx.fillStyle = `rgba(0, 0, 0, ${0.2 + intensity * 0.2})`;
      ctx.fillRect(0, y, width, 1);
    }

    // Noise overlay
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() < intensity * 0.1) {
        const noise = Math.random() * 50;
        data[i] += noise;
        data[i + 1] += noise;
        data[i + 2] += noise;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);

    // Corruption bars
    for (let i = 0; i < intensity * 10; i++) {
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '255, 113, 206' : '1, 205, 254'}, 0.3)`;
      const barY = Math.random() * height;
      ctx.fillRect(0, barY, width, 2 + Math.random() * 5);
    }

  }, [showMeme, glitchIntensity]);

  // Play ambient sound
  useEffect(() => {
    if (phase === 'reveal' && !audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(80, audioContextRef.current.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioContextRef.current.currentTime);
        
        oscillator.start();
        
        // Fade out
        setTimeout(() => {
          if (audioContextRef.current) {
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 2);
            setTimeout(() => {
              oscillator.stop();
            }, 2000);
          }
        }, 5000);
      } catch {
        // Audio not supported or blocked
      }
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [phase]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Static Phase */}
        {phase === 'static' && (
          <motion.div
            key="static"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[#FF71CE] text-2xl font-mono"
            >
              ACESSANDO ARQUIVO FINAL...
            </motion.div>
            <div className="mt-4 flex justify-center gap-2">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-[#01CDFE]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Narration Phase */}
        {phase === 'narration' && (
          <motion.div
            key="narration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl text-center"
          >
            <div className="text-[#B967FF] text-xs mb-8 tracking-widest">
              DIÁRIO DO HISTORIADOR — REGISTRO FINAL
            </div>
            
            <AnimatePresence mode="wait">
              <motion.p
                key={currentLine}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-white text-xl md:text-2xl leading-relaxed font-serif italic"
              >
                {finalNarration[currentLine]}
              </motion.p>
            </AnimatePresence>

            <div className="mt-12 flex justify-center gap-1">
              {finalNarration.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    i <= currentLine ? 'bg-[#FF71CE]' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Reveal Phase */}
        {(phase === 'reveal' || phase === 'end') && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            {/* Cryptic header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 space-y-1"
            >
              {crypticMessages.slice(0, Math.floor(glitchIntensity / 12)).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 0.6, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-[#39FF14] text-[10px] font-mono"
                >
                  {msg}
                </motion.div>
              ))}
            </motion.div>

            {/* The "meme" */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotate: phase === 'end' ? [0, 1, -1, 0] : 0
              }}
              transition={{ 
                scale: { duration: 1 },
                rotate: { duration: 0.2, repeat: phase === 'end' ? 3 : 0 }
              }}
              className="relative inline-block"
            >
              <canvas
                ref={canvasRef}
                width={500}
                height={400}
                className="border border-[#B967FF]/50 shadow-[0_0_50px_rgba(255,113,206,0.3)]"
              />
              
              {/* Overlay glitch effects */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF71CE]/10 to-transparent"
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            {/* Final message */}
            {phase === 'end' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8"
              >
                <GlitchText
                  text="O QUE RESTARÁ DE NÓS QUANDO ATÉ O ABSURDO TIVER SIDO DELETADO?"
                  className="text-[#FF71CE] text-lg block mb-8"
                  intensity="high"
                />
                
                <div className="text-white/40 text-sm mb-6">
                  &ldquo;O último meme&rdquo; permanece fragmentado.
                  <br />
                  Talvez essa seja a única verdade que nos resta.
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onRestart}
                  className="vapor-button px-8 py-3"
                >
                  REINICIAR BUSCA
                </motion.button>
                
                <div className="mt-8 text-[#B967FF]/30 text-[10px] font-mono">
                  &ldquo;O Último Meme da Terra&rdquo; - Um mockumentary sobre a morte do humor
                  <br />
                  Desenvolvido para a disciplina de Tech Design - Cultura Pop
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background noise */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

