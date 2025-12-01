'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText';

interface IntroScreenProps {
  onComplete: () => void;
}

const bootMessages = [
  "Inicializando sistema de recuperação de dados...",
  "Conectando ao Arquivo Central de Memórias Digitais...",
  "Verificando credenciais de acesso nível OMEGA...",
  "Carregando protocolos de arqueologia de dados...",
  "Detectando fragmentos de mídia proibida...",
  "ALERTA: Conteúdo classificado identificado",
  "Preparando interface de restauração memética...",
  "Sistema pronto."
];

const warningText = `
████████████████████████████████████████████████████████████
█                                                          █
█   ATENÇÃO: ARQUIVO CLASSIFICADO - NÍVEL OMEGA           █
█                                                          █
█   Este terminal contém acesso ao Sistema de             █
█   Recuperação de Artefatos Culturais Proibidos          █
█   (S.R.A.C.P.) - Divisão de Arqueologia Digital         █
█                                                          █
█   O conteúdo a seguir é considerado HISTORICAMENTE      █
█   SENSÍVEL sob o Decreto 2847/2045 do Pacto da          █
█   Seriedade Internacional.                               █
█                                                          █
█   Qualquer tentativa de compartilhamento, reprodução    █
█   ou manifestação de REAÇÃO EMOCIONAL ao material       █
█   será registrada e reportada às autoridades            █
█   competentes.                                           █
█                                                          █
█   Ao prosseguir, você reconhece que:                    █
█   • Possui autorização nível OMEGA                      █
█   • Está ciente dos riscos de exposição memética        █
█   • Aceita monitoramento integral da sessão             █
█                                                          █
█   [CÓDIGO DE ACESSO: MEM-2045-FINAL-V3]                 █
█                                                          █
████████████████████████████████████████████████████████████
`;

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [phase, setPhase] = useState<'boot' | 'warning' | 'access'>('boot');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [accessError, setAccessError] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  // Boot sequence
  useEffect(() => {
    if (phase !== 'boot') return;

    const timer = setInterval(() => {
      setCurrentMessageIndex(prev => {
        if (prev >= bootMessages.length - 1) {
          clearInterval(timer);
          setTimeout(() => setBootComplete(true), 500);
          setTimeout(() => setPhase('warning'), 1500);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [phase]);

  const handleAccessSubmit = () => {
    // Any code works, but "MEME" triggers a secret
    if (accessCode.toUpperCase() === 'MEME') {
      setShowSecret(true);
      setTimeout(() => {
        setShowSecret(false);
        onComplete();
      }, 2000);
    } else if (accessCode.length >= 3) {
      onComplete();
    } else {
      setAccessError(true);
      setTimeout(() => setAccessError(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0612] flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {/* Boot Phase */}
        {phase === 'boot' && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-2xl"
          >
            <div className="border border-[#39FF14]/30 bg-black/80 p-6 font-mono text-sm">
              <div className="text-[#39FF14] mb-4">
                S.R.A.C.P. v3.45.2 - Sistema de Recuperação de Artefatos Culturais Proibidos
              </div>
              <div className="border-t border-[#39FF14]/20 pt-4">
                {bootMessages.slice(0, currentMessageIndex + 1).map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`mb-2 ${
                      msg.includes('ALERTA') 
                        ? 'text-[#FF4757]' 
                        : index === currentMessageIndex && !bootComplete
                        ? 'text-[#01CDFE]'
                        : 'text-[#39FF14]/70'
                    }`}
                  >
                    <span className="text-[#39FF14]/50 mr-2">[{String(index + 1).padStart(2, '0')}]</span>
                    {msg}
                    {index === currentMessageIndex && !bootComplete && (
                      <span className="animate-pulse">_</span>
                    )}
                  </motion.div>
                ))}
              </div>
              
              {bootComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-[#01CDFE] flex items-center gap-2"
                >
                  <span className="animate-pulse">●</span>
                  Carregando interface segura...
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Warning Phase */}
        {phase === 'warning' && (
          <motion.div
            key="warning"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-3xl"
          >
            <div className="border-2 border-[#FF4757] bg-black/90 p-1">
              <div className="border border-[#FF4757]/50 p-6">
                {/* Header */}
                <motion.div
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="flex items-center gap-3 mb-6 text-[#FF4757]"
                >
                  <span className="text-2xl">⚠</span>
                  <GlitchText 
                    text="AVISO DE SEGURANÇA INSTITUCIONAL" 
                    className="text-lg font-bold tracking-wider"
                    intensity="high"
                  />
                  <span className="text-2xl">⚠</span>
                </motion.div>

                {/* Warning Text */}
                <pre className="text-[#FF71CE] text-[11px] leading-tight font-mono whitespace-pre overflow-x-auto mb-6">
                  {warningText}
                </pre>

                {/* Access Code Input */}
                <div className="mt-6 border-t border-[#B967FF]/30 pt-6">
                  <div className="text-[#B967FF] text-sm mb-3">
                    Digite qualquer código para prosseguir:
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                      onKeyDown={(e) => e.key === 'Enter' && handleAccessSubmit()}
                      className={`flex-1 bg-black border ${
                        accessError ? 'border-[#FF4757]' : 'border-[#B967FF]/50'
                      } px-4 py-2 font-mono text-[#01CDFE] focus:outline-none focus:border-[#01CDFE] transition-colors`}
                      placeholder="CÓDIGO DE ACESSO"
                      autoFocus
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAccessSubmit}
                      className="vapor-button px-6"
                    >
                      ACESSAR
                    </motion.button>
                  </div>
                  
                  {accessError && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[#FF4757] text-sm mt-2"
                    >
                      Código muito curto. Mínimo 3 caracteres.
                    </motion.div>
                  )}
                  
                  <div className="text-[#B967FF]/40 text-xs mt-3">
                    Dica: O sistema aceita qualquer código válido. Alguns códigos podem revelar segredos...
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Secret Easter Egg */}
        {showSecret && (
          <motion.div
            key="secret"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">🤫</div>
              <GlitchText 
                text="VOCÊ AINDA SE LEMBRA..." 
                className="text-2xl text-[#FF71CE]"
                intensity="high"
              />
              <div className="text-[#01CDFE] mt-4 text-sm">
                Código secreto detectado. Acesso privilegiado concedido.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Grid */}
      <div className="fixed inset-0 vaporwave-grid opacity-20 pointer-events-none" />
    </div>
  );
}

