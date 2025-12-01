"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface CorruptedImageProps {
  corruptionLevel: number; // 0-100
  isRestoring: boolean;
  onCorruptionChange?: (level: number) => void;
}

// Famous meme fragments that will be revealed/corrupted
const memeFragments = [
  { text: "ISSO FOI", x: 0.3, y: 0.2 },
  { text: "LONGE", x: 0.5, y: 0.4 },
  { text: "DEMAIS", x: 0.4, y: 0.6 },
  { text: "?", x: 0.7, y: 0.8 },
];

export default function CorruptedImage({
  corruptionLevel,
  isRestoring,
}: CorruptedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  const drawCorruptedMeme = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = "#0a0612";
    ctx.fillRect(0, 0, width, height);

    // Base corruption visualization
    const corruption = corruptionLevel / 100;

    // Draw glitch blocks
    for (let i = 0; i < 50 * corruption; i++) {
      const blockWidth = Math.random() * 100 + 20;
      const blockHeight = Math.random() * 30 + 5;
      const x = Math.random() * width;
      const y = Math.random() * height;

      // Random vaporwave colors
      const colors = ["#FF71CE", "#01CDFE", "#B967FF", "#05FFA1", "#FFB347"];
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.globalAlpha = 0.1 + Math.random() * 0.3;
      ctx.fillRect(x, y, blockWidth, blockHeight);
    }

    ctx.globalAlpha = 1;

    // Draw horizontal scan line artifacts
    for (let i = 0; i < height; i += 2) {
      if (Math.random() < corruption * 0.3) {
        const offset = (Math.random() - 0.5) * 20 * corruption;
        ctx.drawImage(canvas, 0, i, width, 2, offset, i, width, 2);
      }
    }

    // Draw datamosh-style blocks
    const blockSize = 20;
    for (let x = 0; x < width; x += blockSize) {
      for (let y = 0; y < height; y += blockSize) {
        if (Math.random() < corruption * 0.2) {
          const srcX =
            Math.floor(Math.random() * (width / blockSize)) * blockSize;
          const srcY =
            Math.floor(Math.random() * (height / blockSize)) * blockSize;

          ctx.drawImage(
            canvas,
            srcX,
            srcY,
            blockSize,
            blockSize,
            x,
            y,
            blockSize,
            blockSize
          );
        }
      }
    }

    // Draw color channel separation (chromatic aberration)
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const shift = Math.floor(corruption * 10);

    for (let i = 0; i < data.length; i += 4) {
      const redIndex = i - shift * 4;
      const blueIndex = i + shift * 4;

      if (redIndex >= 0 && redIndex < data.length) {
        data[i] = data[redIndex]; // Red channel
      }
      if (blueIndex >= 0 && blueIndex < data.length) {
        data[i + 2] = data[blueIndex]; // Blue channel
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // Draw mystery meme shape (silhouette that becomes clearer with less corruption)
    const clarity = 1 - corruption;

    // Central mysterious rectangle (the "meme" frame)
    ctx.strokeStyle = `rgba(185, 103, 255, ${0.3 + clarity * 0.5})`;
    ctx.lineWidth = 2 + clarity * 3;
    ctx.strokeRect(width * 0.15, height * 0.1, width * 0.7, height * 0.8);

    // Inner content area
    ctx.fillStyle = `rgba(10, 6, 18, ${0.5 + clarity * 0.3})`;
    ctx.fillRect(width * 0.17, height * 0.12, width * 0.66, height * 0.76);

    // Draw fragmented text
    ctx.font = `bold ${24 + clarity * 16}px 'Courier New', monospace`;
    ctx.textAlign = "center";

    memeFragments.forEach((fragment, index) => {
      const textCorruption = corruption * (1 + index * 0.2);
      const visible = textCorruption < 0.8;

      if (visible) {
        // Glitchy text position
        const offsetX = (Math.random() - 0.5) * textCorruption * 30;
        const offsetY = (Math.random() - 0.5) * textCorruption * 20;

        // Shadow/glow
        ctx.shadowColor = "#FF71CE";
        ctx.shadowBlur = 10 + textCorruption * 20;

        // Main text
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - textCorruption * 0.5})`;

        let displayText = fragment.text;
        if (textCorruption > 0.3) {
          displayText = fragment.text
            .split("")
            .map((char) => (Math.random() < textCorruption * 0.5 ? "█" : char))
            .join("");
        }

        ctx.fillText(
          displayText,
          width * fragment.x + offsetX,
          height * fragment.y + offsetY
        );

        ctx.shadowBlur = 0;
      }
    });

    // File corruption indicator overlay
    if (corruption > 0.3) {
      ctx.fillStyle = `rgba(255, 71, 87, ${corruption * 0.3})`;
      ctx.font = "12px monospace";
      ctx.textAlign = "left";

      for (let y = 20; y < height; y += 40) {
        if (Math.random() < corruption * 0.3) {
          const errorText = `████ ERROR 0x${Math.random()
            .toString(16)
            .substr(2, 8)
            .toUpperCase()} ████`;
          ctx.fillText(errorText, 10 + Math.random() * 20, y);
        }
      }
    }

    // Draw scan lines over everything
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    for (let y = 0; y < height; y += 3) {
      ctx.fillRect(0, y, width, 1);
    }
  }, [corruptionLevel]);

  // Animation loop for continuous glitch effects
  useEffect(() => {
    let lastTime = 0;
    const fps = 10; // Low FPS for that retro feel
    const frameInterval = 1000 / fps;

    const animate = (timestamp: number) => {
      if (timestamp - lastTime >= frameInterval) {
        lastTime = timestamp;

        // Random glitch offset
        if (Math.random() < 0.3 && isRestoring) {
          setGlitchOffset({
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 5,
          });
        } else {
          setGlitchOffset({ x: 0, y: 0 });
        }

        drawCorruptedMeme();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [corruptionLevel, isRestoring, drawCorruptedMeme]);

  return (
    <motion.div
      className="relative"
      animate={{
        x: glitchOffset.x,
        y: glitchOffset.y,
      }}
      transition={{ duration: 0.05 }}
    >
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full max-w-[600px] border border-[#B967FF]/30 shadow-[0_0_30px_rgba(185,103,255,0.3)]"
      />

      {/* Overlay with file info */}
      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-[#01CDFE]/60">
        last_meme_final_v3.png
      </div>
      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-[#FF71CE]/60">
        {(100 - corruptionLevel).toFixed(1)}% INTEGRIDADE
      </div>

      {/* Corruption warning */}
      {corruptionLevel > 80 && (
        <motion.div
          className="absolute top-2 left-1/2 -translate-x-1/2 text-[#FF4757] text-xs font-mono px-2 py-1 bg-black/80 border border-[#FF4757]/50"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          ⚠ ARQUIVO CRITICAMENTE CORROMPIDO ⚠
        </motion.div>
      )}
    </motion.div>
  );
}
