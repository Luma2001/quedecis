'use client';

import { useState, useEffect } from 'react';
import { Smartphone } from 'lucide-react';

export default function PWARegistrationCounter() {
  const [downloadCount, setDownloadCount] = useState<number | null>(null);

  // 1. Traer total acumulado
  useEffect(() => {
    async function fetchContador() {
      try {
        const response = await fetch('/api/downloads');
        const data = await response.json();
        setDownloadCount(data.count);
      } catch (error) {
        console.error('Error al traer el contador global:', error);
      }
    }
    fetchContador();
  }, []);

  // 2. Escuchar evento de instalación
  useEffect(() => {
    const handlePWAInstalada = async () => {
      console.log('¡PWA instalada con éxito!');
      setDownloadCount(prev => (prev !== null ? prev + 1 : 1));

      try {
        await fetch('/api/downloads', { method: 'POST' });
      } catch (error) {
        console.error('No se pudo registrar la instalación en el servidor:', error);
      }
    };

    window.addEventListener('appinstalled', handlePWAInstalada);
    return () => window.removeEventListener('appinstalled', handlePWAInstalada);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-3 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl max-w-sm mx-auto shadow-md backdrop-blur-sm transition-all duration-300 a11y-contrast:bg-black a11y-contrast:border-2 a11y-contrast:border-white">
      <p className="text-sm text-center text-slate-300 a11y-contrast:text-slate-100 transition-colors duration-300 font-sans leading-relaxed">
        Para instalar la app en tu celular o compu, usá el botón nativo de instalación 📥 en la barra de tu navegador.
      </p>

      {/* Indicador visual y accesible del contador */}
      <span
        role="status"
        aria-live="polite"
        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-teal-300 bg-slate-950 px-3.5 py-1.5 rounded-full border border-slate-700 shadow-sm transition-all duration-300 a11y-contrast:bg-black a11y-contrast:text-yellow-400 a11y-contrast:border-2 a11y-contrast:border-white"
      >
        <Smartphone className="w-3.5 h-3.5 text-teal-400 a11y-contrast:text-yellow-400 shrink-0" aria-hidden="true" />
        <span>
          {downloadCount !== null ? `${downloadCount} dispositivos vinculados` : 'Sincronizando comunidad...'}
        </span>
      </span>
    </div>
  );
}