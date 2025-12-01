'use client';

import { motion } from 'framer-motion';

interface MetricsPanelProps {
  currentMetric: string;
  metricValue: number;
  corruptionLevel: number;
}

const staticMetrics = [
  { label: "Entropia de Dados", value: "87.3%", status: "critical" },
  { label: "Coerência Temporal", value: "12.8%", status: "warning" },
  { label: "Índice de Nostalgia", value: "94.1%", status: "high" },
];

export default function MetricsPanel({ currentMetric, metricValue, corruptionLevel }: MetricsPanelProps) {
  return (
    <div className="vapor-panel p-4">
      <h3 className="text-[#01CDFE] font-bold mb-4 text-sm tracking-wider">
        MÉTRICAS DE ANÁLISE
      </h3>

      <div className="space-y-4">
        {/* Dynamic Metric */}
        <div className="border border-[#B967FF]/30 p-3 bg-black/30">
          <div className="text-[#B967FF] text-[10px] mb-1">{currentMetric}</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-black/50 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF71CE] to-[#01CDFE]"
                animate={{ width: `${metricValue}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-white text-xs w-12 text-right">{metricValue}%</span>
          </div>
        </div>

        {/* Static Metrics */}
        {staticMetrics.map((metric, index) => (
          <div key={index} className="flex justify-between items-center text-xs">
            <span className="text-white/60">{metric.label}</span>
            <span className={`font-mono ${
              metric.status === 'critical' ? 'text-[#FF4757]' :
              metric.status === 'warning' ? 'text-[#FFB347]' :
              'text-[#01CDFE]'
            }`}>
              {metric.value}
            </span>
          </div>
        ))}

        {/* Corruption Gauge */}
        <div className="mt-4 pt-4 border-t border-[#B967FF]/20">
          <div className="text-center mb-2">
            <span className="text-white/60 text-[10px]">NÍVEL DE CORRUPÇÃO</span>
          </div>
          <div className="relative h-24 flex items-center justify-center">
            <svg className="w-24 h-24 -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="rgba(185, 103, 255, 0.2)"
                strokeWidth="8"
              />
              <motion.circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke={corruptionLevel > 80 ? '#FF4757' : corruptionLevel > 50 ? '#FFB347' : '#39FF14'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={251.2}
                animate={{
                  strokeDashoffset: 251.2 - (251.2 * corruptionLevel / 100)
                }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <motion.span 
                className={`text-2xl font-bold ${
                  corruptionLevel > 80 ? 'text-[#FF4757]' :
                  corruptionLevel > 50 ? 'text-[#FFB347]' :
                  'text-[#39FF14]'
                }`}
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {corruptionLevel.toFixed(0)}%
              </motion.span>
            </div>
          </div>
        </div>

        {/* Warning indicators */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: "MEM", active: corruptionLevel > 70 },
            { label: "CPU", active: corruptionLevel > 60 },
            { label: "NET", active: Math.random() > 0.5 }
          ].map((indicator, i) => (
            <div 
              key={i}
              className={`py-1 text-[10px] border ${
                indicator.active 
                  ? 'border-[#FF4757] text-[#FF4757] bg-[#FF4757]/10' 
                  : 'border-[#39FF14]/30 text-[#39FF14]/50'
              }`}
            >
              {indicator.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

