'use client';

import React from 'react';

// Definimos los tipos de datos que va a recibir nuestro componente
interface MicAlertProps {
  micPermissionGranted: boolean | null;
  onRetry: () => Promise<void>;
}

export default function MicAlert({ micPermissionGranted, onRetry }: MicAlertProps) {
  // Si el permiso no está denegado (es decir, es true o null), no renderizamos nada
  if (micPermissionGranted !== false) return null;

  return (
    <div className="w-full bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl mb-4">
      <h4 className="text-sm font-bold text-rose-400 mb-1">⚠️ Micrófono Bloqueado</h4>
      <p className="text-xs text-slate-400 leading-relaxed">
        El sistema operativo de tu celular o el navegador bloqueó el acceso al micrófono. 
        Para usar el dictado por voz, por favor ingresá a los ajustes de tu navegador o de la app instalada y habilitá el permiso de audio.
      </p>
      <button 
        onClick={onRetry}
        className="mt-2.5 text-xs bg-rose-500 text-slate-950 font-bold px-3 py-1.5 rounded-md hover:bg-rose-400 transition-colors"
      >
        Reintentar Permiso
      </button>
    </div>
  );
}