'use client';

import React from 'react';

// Definimos el tipo de dato que va a recibir nuestro componente
interface AudioIndicatorProps {
  isSpeaking: boolean;
}

export default function AudioIndicator({ isSpeaking }: AudioIndicatorProps) {
  // Si no está hablando, no renderizamos absolutamente nada
  if (!isSpeaking) return null;

  return (
    <div className="w-full bg-teal-500/10 border border-teal-500/20 p-3 rounded-xl flex items-center space-x-3 animate-pulse mb-4">
      {/* Efecto visual de rebote / Ondas de sonido animadas */}
      <div className="flex space-x-1 items-center justify-center h-4">
        <div className="w-1 bg-teal-400 h-3 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-1 bg-teal-400 h-4 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-1 bg-teal-400 h-2 rounded-full animate-bounce"></div>
      </div>
      <span className="text-xs font-bold text-teal-400 uppercase tracking-wider font-mono">
        Reproduciendo audio fuerte...
      </span>
    </div>
  );
}