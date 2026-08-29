'use client';

import React from 'react';
import { Volume2 } from 'lucide-react';

interface AudioIndicatorProps {
  isSpeaking: boolean;
}

export default function AudioIndicator({ isSpeaking }: AudioIndicatorProps) {
  if (!isSpeaking) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full bg-amber-950/90 border border-amber-500/40 p-3 rounded-xl flex items-center space-x-3 shadow-md mb-4 transition-all duration-300 a11y-contrast:bg-black a11y-contrast:border-2 a11y-contrast:border-yellow-400"
    >
      {/* Icono complementario */}
      <Volume2 className="w-5 h-5 text-amber-400 a11y-contrast:text-yellow-400 shrink-0 animate-pulse" aria-hidden="true" />

      {/* Ondas animadas (decorativas) */}
      <div className="flex space-x-1 items-center justify-center h-4" aria-hidden="true">
        <div className="w-1 bg-amber-400 a11y-contrast:bg-yellow-400 h-3 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-1 bg-amber-400 a11y-contrast:bg-yellow-400 h-4 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-1 bg-amber-400 a11y-contrast:bg-yellow-400 h-2 rounded-full animate-bounce" />
      </div>

      {/* Texto informativo legible */}
      <span className="text-xs font-mono font-bold text-amber-200 a11y-contrast:text-yellow-400 uppercase tracking-wider">
        Reproduciendo audio fuerte...
      </span>
    </div>
  );
}