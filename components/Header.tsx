'use client';

import React from 'react';
import Logo from './logo';
import { Sun, Moon } from 'lucide-react';
import { useAppSettings } from '@/hooks/useAppSettings';

const Header = () => {
  const { isLightMode, toggleLightMode } = useAppSettings();

  return (
    <header 
      id="header" 
      className="fixed top-0 left-0 right-0 max-w-full mx-auto px-6 py-4 flex items-center justify-between z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 dark:bg-slate-950/95 dark:border-slate-800 a11y-contrast:bg-black a11y-contrast:border-b-2 a11y-contrast:border-white transition-colors duration-300"
    >
      {/* 1. Logotipo e Identidad */}
      <div className="flex items-center space-x-3"> 
        <Logo />
        <div>
          <h1 className="text-xl font-black tracking-tight text-white a11y-contrast:text-white">
            ¿QUÉ DECÍS?
          </h1>
          <p className="text-[10px] text-teal-400 font-bold tracking-widest uppercase a11y-contrast:text-yellow-400">
            Asistente Inclusivo
          </p>
        </div>
      </div>

      {/* 2. Controles de accesibilidad y versión */}
      <div className="flex items-center space-x-3">
        {/* Botón de cambio de modo Claro / Oscuro */}
        <button
          type="button"
          onClick={toggleLightMode}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 a11y-contrast:bg-black a11y-contrast:text-yellow-400 a11y-contrast:border-2 a11y-contrast:border-white"
          aria-label={isLightMode ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
        >
          {isLightMode ? (
            <Moon className="w-4 h-4 text-cyan-400 a11y-contrast:text-yellow-400" aria-hidden="true" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400 a11y-contrast:text-yellow-400" aria-hidden="true" />
          )}
        </button>

        {/* Badge de versión */}
        <span className="hidden sm:inline-block text-[11px] bg-slate-900 border border-slate-800 px-3 py-1 rounded-full font-mono text-slate-300 a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:border a11y-contrast:border-white transition-colors duration-200">
          v1.0.0 · MVP PWA Híbrida
        </span>
      </div>
    </header>
  );
};

export default Header;