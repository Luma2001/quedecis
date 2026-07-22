'use client';

import { useState, useEffect } from 'react';

export default function PWARegistrationCounter() {
  const [downloadCount, setDownloadCount] = useState<number | null>(null);

  // 1. Traemos el total acumulado al cargar el componente
  useEffect(() => {
    async function fetchContador() {
      try {
        const response = await fetch('/api/downloads');
        const data = await response.json();
        setDownloadCount(data.count);
      } catch (error) {
        console.error("Error al traer el contador global:", error);
      }
    }
    fetchContador();
  }, []);

  // 2. Escuchar el evento de instalación del navegador
  useEffect(() => {
    const handlePWAInstalada = async () => {
      console.log('¡PWA instalada con éxito!');
      setDownloadCount(prev => (prev !== null ? prev + 1 : 1));

      try {
        await fetch('/api/downloads', { method: 'POST' });
      } catch (error) {
        console.error("No se pudo registrar la instalación en el servidor:", error);
      }
    };

    window.addEventListener('appinstalled', handlePWAInstalada);
    return () => window.removeEventListener('appinstalled', handlePWAInstalada);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-3 p-4 bg-card-bg border border-card-border rounded-2xl max-w-sm mx-auto transition-all duration-300">
      <p className="text-md text-center text-text-muted transition-colors duration-300 font-sans">
        Para instalar la app en tu celular o compu, usa el botón nativo de instalación 📥 en la barra de tu navegador.
      </p>

      {/* El indicador visual */}
      <span className="text-xs text-indicator-text font-mono tracking-wider uppercase bg-input px-3 py-1 rounded-full border border-input-border animate-fade-in transition-all duration-300">
        {downloadCount !== null ? `${downloadCount} dispositivos vinculados` : 'Sincronizando comunidad...'}
      </span>
    </div>
  );
}