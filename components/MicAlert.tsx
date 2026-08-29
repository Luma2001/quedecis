'use client';

import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface MicAlertProps {
  micPermissionGranted: boolean | null;
  onRetry: () => Promise<void>;
}

export default function MicAlert({ micPermissionGranted, onRetry }: MicAlertProps) {
  if (micPermissionGranted !== false) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="w-full bg-rose-950/90 border border-rose-500/40 p-4 rounded-2xl mb-4 shadow-lg transition-all duration-300 a11y-contrast:bg-black a11y-contrast:border-2 a11y-contrast:border-yellow-400"
    >
      {/* Encabezado de Alerta */}
      <div className="flex items-center gap-2 mb-1.5">
        <AlertTriangle className="w-5 h-5 text-rose-400 a11y-contrast:text-yellow-400 shrink-0" aria-hidden="true" />
        <h4 className="text-sm font-bold text-rose-300 a11y-contrast:text-yellow-400 uppercase tracking-wider font-mono">
          Micrófono Bloqueado
        </h4>
      </div>

      {/* Explicación accesible */}
      <p className="text-xs text-rose-100/90 a11y-contrast:text-white leading-relaxed font-sans">
        El sistema operativo de tu celular o el navegador bloqueó el acceso al micrófono. 
        Para usar el dictado por voz, por favor ingresá a los ajustes de tu navegador o de la app instalada y habilitá el permiso de audio.
      </p>

      {/* Botón de Reintento */}
      <button 
        type="button"
        onClick={onRetry}
        className="mt-3 inline-flex items-center gap-1.5 text-xs bg-rose-400 hover:bg-rose-300 text-slate-950 font-black px-3.5 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 a11y-contrast:bg-yellow-400 a11y-contrast:text-black a11y-contrast:border-2 a11y-contrast:border-white"
      >
        <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Reintentar Permiso</span>
      </button>
    </div>
  );
}