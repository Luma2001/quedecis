'use client';

import { useEffect, useRef } from 'react';

export function useHapticFeedback(isListening: boolean) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Si no está en el navegador o la API no existe, no hace nada
    if (typeof window === 'undefined' || !('vibrate' in navigator)) return;

    // Verificar si el usuario tiene activada la vibración en los ajustes
    const isVibrationEnabled = localStorage.getItem('app_vibration') !== 'false';

    if (isListening && isVibrationEnabled) {
      // Pulso corto de inicio (100ms)
      navigator.vibrate(100);

      // Mantiene micro-pulsos sutiles cada 800ms mientras se escucha
      intervalRef.current = setInterval(() => {
        navigator.vibrate(40);
      }, 800);
    } else {
      // Detener de inmediato cualquier vibración activa
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      navigator.vibrate(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(0);
      }
    };
  }, [isListening]);
}