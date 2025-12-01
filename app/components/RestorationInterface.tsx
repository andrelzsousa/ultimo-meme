"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlitchText from "./GlitchText";
import CorruptedImage from "./CorruptedImage";
import TerminalLog from "./TerminalLog";
import MetricsPanel from "./MetricsPanel";

interface RestorationInterfaceProps {
  onFinalReveal: () => void;
}

const pseudoScientificTerms = [
  "Ressonância Semântica Digital",
  "Coerência Entrópica de Pixels",
  "Integridade Memética Residual",
  "Desfragmentação Humorística",
  "Sincronização Irônica",
  "Calibração de Absurdo",
  "Recuperação de Contexto Cultural",
  "Estabilização de Sarcasmo",
];

const errorMessages = [
  "ERRO: Fragmento de ironia não reconhecido",
  "AVISO: Níveis de humor instáveis detectados",
  "ALERTA: Paradoxo semântico em processamento",
  "ERRO 0x4D454D45: Memória de meme corrompida",
  "AVISO: Referência cultural não catalogada",
  "ERRO: Sobrecarga de nostalgia digital",
  "ALERTA: Piada interna detectada - contexto perdido",
  "ERRO: Camada de ironia excede limite permitido",
];

const historiadorQuotes = [
  '"Este fragmento... há algo aqui. Posso quase sentir o riso perdido."',
  '"Décadas de busca, e finalmente... mas o que significava?"',
  '"Era mais do que uma imagem. Era... uma forma de resistência."',
  '"Como explicar para as gerações futuras o que perdemos?"',
  '"O humor era nossa linguagem universal. E nós o apagamos."',
  '"Cada pixel recuperado é uma memória coletiva restaurada."',
  "\"'Isso foi longe demais'... mas o que exatamente?\"",
  '"Talvez o verdadeiro meme sejam as memórias que fizemos pelo caminho."',
];

export default function RestorationInterface({
  onFinalReveal,
}: RestorationInterfaceProps) {
  const [corruptionLevel, setCorruptionLevel] = useState(95);
  const [isRestoring, setIsRestoring] = useState(false);
  const [currentMetric, setCurrentMetric] = useState(pseudoScientificTerms[0]);
  const [metricValue, setMetricValue] = useState(34);
  const [logMessages, setLogMessages] = useState<string[]>([
    "[SISTEMA] Interface de restauração inicializada",
    "[DADOS] Arquivo: last_meme_final_v3.png",
    "[DADOS] Tamanho original: ████████ bytes",
    "[DADOS] Corrupção estimada: 95.2%",
    "[ALERTA] Conteúdo classificado como 'historicamente volátil'",
  ]);
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(historiadorQuotes[0]);
  const [restorationAttempts, setRestorationAttempts] = useState(0);
  const [secretMode, setSecretMode] = useState(false);
  const [konami, setKonami] = useState<string[]>([]);
  const [showFinalWarning, setShowFinalWarning] = useState(false);

  // Konami code easter egg
  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      setKonami((prev) => {
        const newKonami = [...prev, e.key].slice(-10);
        if (newKonami.join(",") === konamiCode.join(",")) {
          setSecretMode(true);
          setLogMessages((msgs) => [
            ...msgs,
            "[SECRETO] Código Konami detectado! Modo arqueólogo ativado.",
          ]);
        }
        return newKonami;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Random metric cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric(
        pseudoScientificTerms[
          Math.floor(Math.random() * pseudoScientificTerms.length)
        ]
      );
      setMetricValue(Math.floor(Math.random() * 60) + 20);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Show quotes periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCurrentQuote(
          historiadorQuotes[
            Math.floor(Math.random() * historiadorQuotes.length)
          ]
        );
        setShowQuote(true);
        setTimeout(() => setShowQuote(false), 5000);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const addLogMessage = useCallback((message: string) => {
    setLogMessages((prev) => [...prev.slice(-50), message]);
  }, []);

  const handleRestore = useCallback(() => {
    if (isRestoring) return;

    setIsRestoring(true);
    setRestorationAttempts((prev) => prev + 1);

    addLogMessage(
      `[PROCESSO] Iniciando tentativa de restauração #${
        restorationAttempts + 1
      }...`
    );

    // Simulate restoration that actually corrupts more
    const interval = setInterval(() => {
      setCorruptionLevel((prev) => {
        const change = secretMode
          ? Math.random() * 10 - 8 // Actually restores in secret mode
          : Math.random() * 8 - 2; // Usually corrupts more

        const newLevel = Math.max(5, Math.min(99, prev + change));

        if (Math.random() > 0.7) {
          addLogMessage(
            errorMessages[Math.floor(Math.random() * errorMessages.length)]
          );
        }

        return newLevel;
      });
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setIsRestoring(false);

      // Check for final reveal conditions
      if (corruptionLevel < 20 || restorationAttempts > 10) {
        setShowFinalWarning(true);
      } else {
        addLogMessage(
          "[RESULTADO] Restauração parcial. Fragmentos permanecem instáveis."
        );
      }
    }, 5000);
  }, [
    isRestoring,
    restorationAttempts,
    secretMode,
    addLogMessage,
    corruptionLevel,
  ]);

  const handleDefrag = useCallback(() => {
    addLogMessage("[PROCESSO] Executando desfragmentação humorística...");
    setCorruptionLevel((prev) => Math.min(99, prev + Math.random() * 5));

    setTimeout(() => {
      addLogMessage(
        "[ERRO] Desfragmentação falhou: contexto cultural não encontrado"
      );
    }, 2000);
  }, [addLogMessage]);

  const handleAnalyze = useCallback(() => {
    addLogMessage("[ANÁLISE] Escaneando padrões meméticos...");

    setTimeout(() => {
      const analyses = [
        "[RESULTADO] Formato detectado: Imagem com texto sobreposto (macro)",
        "[RESULTADO] Era estimada: 2020-2025 d.P.S. (depois do Pacto da Seriedade)",
        "[RESULTADO] Categoria: Humor absurdista com camadas de meta-ironia",
        "[RESULTADO] Probabilidade de origem: Fóruns anônimos (87.3%)",
        "[RESULTADO] Nível de perigo semântico: CRÍTICO",
      ];
      analyses.forEach((msg, i) => {
        setTimeout(() => addLogMessage(msg), i * 800);
      });
    }, 1000);
  }, [addLogMessage]);

  return (
    <div className="min-h-screen bg-[#0a0612] p-4 md:p-6">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <GlitchText
              text="S.R.A.C.P. // MÓDULO DE RESTAURAÇÃO"
              className="text-[#B967FF] text-lg md:text-xl font-bold tracking-wider"
              intensity="low"
            />
            <div className="text-[#01CDFE]/60 text-xs mt-1 font-mono">
              Sistema de Recuperação de Artefatos Culturais Proibidos - v3.45.2
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-[#FF71CE] text-sm">
                Tentativas:{" "}
                <span className="text-white">{restorationAttempts}</span>
              </div>
              <div className="text-[#39FF14]/60 text-xs">
                {secretMode ? "★ MODO ARQUEÓLOGO ★" : "Sessão monitorada"}
              </div>
            </div>
            <motion.div
              animate={{ rotate: isRestoring ? 360 : 0 }}
              transition={{
                duration: 2,
                repeat: isRestoring ? Infinity : 0,
                ease: "linear",
              }}
              className="w-8 h-8 border-2 border-[#B967FF] border-t-transparent rounded-full"
            />
          </div>
        </div>
      </motion.header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Left Panel - Controls */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 space-y-4"
        >
          {/* Restoration Controls */}
          <div className="vapor-panel p-4">
            <h3 className="text-[#01CDFE] font-bold mb-4 text-sm tracking-wider">
              CONTROLES DE RESTAURAÇÃO
            </h3>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRestore}
                disabled={isRestoring}
                className={`w-full vapor-button ${
                  isRestoring ? "opacity-50" : ""
                }`}
              >
                {isRestoring ? "PROCESSANDO..." : "RESTAURAR"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDefrag}
                disabled={isRestoring}
                className="w-full vapor-button"
              >
                DESFRAGMENTAR
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={isRestoring}
                className="w-full vapor-button"
              >
                ANALISAR
              </motion.button>
            </div>
          </div>

          {/* Metrics Panel */}
          <MetricsPanel
            currentMetric={currentMetric}
            metricValue={metricValue}
            corruptionLevel={corruptionLevel}
          />

          {/* Easter egg hint */}
          <div className="text-[#B967FF]/30 text-[10px] font-mono text-center">
            ↑↑↓↓←→←→BA
          </div>
        </motion.div>

        {/* Center Panel - Image */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-6"
        >
          <div className="vapor-panel p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#FF71CE] font-bold text-sm tracking-wider">
                ARQUIVO: last_meme_final_v3.png
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    corruptionLevel > 80
                      ? "bg-[#FF4757]"
                      : corruptionLevel > 50
                      ? "bg-[#FFB347]"
                      : "bg-[#39FF14]"
                  } animate-pulse`}
                />
                <span className="text-xs text-white/60">
                  {corruptionLevel > 80
                    ? "CRÍTICO"
                    : corruptionLevel > 50
                    ? "INSTÁVEL"
                    : "PARCIAL"}
                </span>
              </div>
            </div>

            <CorruptedImage
              corruptionLevel={corruptionLevel}
              isRestoring={isRestoring}
            />

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/60 mb-1">
                <span>Integridade do arquivo</span>
                <span>{(100 - corruptionLevel).toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-black/50 border border-[#B967FF]/30 overflow-hidden">
                <motion.div
                  className={`h-full ${isRestoring ? "progress-glitch" : ""}`}
                  style={{
                    width: `${100 - corruptionLevel}%`,
                    background: `linear-gradient(90deg, 
                      ${corruptionLevel > 80 ? "#FF4757" : "#39FF14"} 0%, 
                      ${corruptionLevel > 80 ? "#FF71CE" : "#01CDFE"} 100%)`,
                  }}
                  animate={{
                    opacity: isRestoring ? [1, 0.7, 1] : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: isRestoring ? Infinity : 0,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Historiador Quote */}
          <AnimatePresence>
            {showQuote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 vapor-panel p-4 border-l-4 border-[#FF71CE]"
              >
                <div className="text-[#B967FF] text-xs mb-2">
                  O HISTORIADOR:
                </div>
                <div className="text-white/80 italic text-sm">
                  {currentQuote}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Panel - Terminal */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-3"
        >
          <TerminalLog messages={logMessages} />
        </motion.div>
      </div>

      {/* Final Warning Modal */}
      <AnimatePresence>
        {showFinalWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="vapor-panel p-6 max-w-lg w-full border-2 border-[#FF71CE]"
            >
              <GlitchText
                text="⚠ LIMIAR DE RESTAURAÇÃO ATINGIDO ⚠"
                className="text-[#FF71CE] text-lg font-bold mb-4 block text-center"
                intensity="high"
              />

              <p className="text-white/80 text-sm mb-4 text-center">
                O arquivo atingiu o ponto crítico de restauração. Prosseguir
                pode revelar conteúdo que foi deliberadamente apagado da memória
                coletiva.
              </p>

              <p className="text-[#FFB347] text-xs mb-6 text-center">
                Você tem certeza de que deseja ver o que foi considerado
                &ldquo;longe demais&rdquo;?
              </p>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFinalWarning(false)}
                  className="flex-1 vapor-button"
                >
                  VOLTAR
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onFinalReveal}
                  className="flex-1 vapor-button border-[#FF71CE]"
                >
                  REVELAR
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Effects */}
      <div className="fixed inset-0 vaporwave-grid opacity-10 pointer-events-none" />
    </div>
  );
}
