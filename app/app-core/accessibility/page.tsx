'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Info, CheckCircle2, Circle } from 'lucide-react';
import { useAppSettings } from '@/hooks/useAppSettings';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

export default function AccessibilityPage() {
  const router = useRouter();

  // Estados globales de configuración
  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    isLightMode,
    toggleLightMode,
  } = useAppSettings();

  // Voces disponibles del sistema
  const { voices = [], selectedVoiceURI, setSelectedVoiceURI } = useSpeechSynthesis();

  // Inicialización perezosa (lazy initializers) leyendo directo de localStorage de forma segura
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('app_high_contrast') === 'true';
  });

  const [voiceEngine, setVoiceEngine] = useState<'online' | 'offline'>(() => {
    if (typeof window === 'undefined') return 'online';
    return (localStorage.getItem('app_voice_engine') as 'online' | 'offline') || 'online';
  });

  const [vibrationEnabled, setVibrationEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('app_vibration') !== 'false';
  });

  const handleToggleContrast = (mode: boolean) => {
    setHighContrast(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_high_contrast', String(mode));
      if (mode) {
        document.documentElement.classList.add('a11y-contrast');
      } else {
        document.documentElement.classList.remove('a11y-contrast');
      }
    }
  };

  const handleToggleEngine = (engine: 'online' | 'offline') => {
    setVoiceEngine(engine);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_voice_engine', engine);
    }
  };

  const handleToggleVibration = () => {
    const nextVal = !vibrationEnabled;
    setVibrationEnabled(nextVal);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_vibration', String(nextVal));
      if (nextVal && 'vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }
  };

  return (
    <main
      id="main-content"
      aria-label="Panel de configuración de accesibilidad"
      className="min-h-dvh w-full max-w-md mx-auto flex flex-col justify-between bg-[#0b1020] text-white font-sans p-5 shadow-2xl relative overflow-y-auto"
    >
      {/* 1. HEADER CON BOTÓN VOLVER Y TÍTULO */}
      <div className="w-full flex flex-col gap-6">
        <header className="w-full flex items-center relative py-2">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Volver a la pantalla principal"
            className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer shrink-0 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <h1 className="w-full text-center text-lg font-black text-white absolute left-0 right-0 tracking-wide pointer-events-none">
            Accesibilidad
          </h1>
        </header>

        {/* 2. SECCIONES DE CONFIGURACIÓN */}
        <section className="flex flex-col gap-6 w-full">
          
          {/* Tamaño del texto */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-300 tracking-wider">
              Tamaño del texto
            </label>
            <div className="grid grid-cols-3 gap-2 items-center">
              <button
                type="button"
                onClick={increaseFontSize}
                aria-label="Aumentar tamaño de letra"
                className="py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#00b8a9] text-white font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
              >
                A +
              </button>

              <div 
                aria-live="polite"
                className="py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center font-bold text-sm text-slate-200"
              >
                {fontSize ? `${fontSize} px` : '18 px'}
              </div>

              <button
                type="button"
                onClick={decreaseFontSize}
                aria-label="Disminuir tamaño de letra"
                className="py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#00b8a9] text-white font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
              >
                A -
              </button>
            </div>
          </div>

          {/* Contraste */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-300 tracking-wider">
              Contraste
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleToggleContrast(false)}
                className={`py-2.5 px-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  !highContrast
                    ? 'bg-slate-900 border-[#00b8a9] text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {!highContrast ? (
                  <CheckCircle2 className="w-4 h-4 text-[#00b8a9] shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span>Normal</span>
              </button>

              <button
                type="button"
                onClick={() => handleToggleContrast(true)}
                className={`py-2.5 px-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  highContrast
                    ? 'bg-slate-900 border-[#00b8a9] text-[#00b8a9] shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {highContrast ? (
                  <CheckCircle2 className="w-4 h-4 text-[#00b8a9] shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span>Alto contraste</span>
              </button>
            </div>
          </div>

          {/* Tema */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-300 tracking-wider">
              Tema
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  if (!isLightMode) toggleLightMode();
                }}
                className={`py-2.5 px-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  isLightMode
                    ? 'bg-slate-900 border-[#00b8a9] text-[#0b1020]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {isLightMode ? (
                  <CheckCircle2 className="w-4 h-4 text-[#00b8a9] shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span>Claro</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (isLightMode) toggleLightMode();
                }}
                className={`py-2.5 px-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  !isLightMode
                    ? 'bg-slate-900 border-[#00b8a9] text-[#00b8a9]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {!isLightMode ? (
                  <CheckCircle2 className="w-4 h-4 text-[#00b8a9] shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span>Oscuro</span>
              </button>
            </div>
          </div>

          {/* Modo de Voz */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-300 tracking-wider">
              Modo de Voz
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleToggleEngine('online')}
                className={`py-2.5 px-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold text-left transition-all cursor-pointer ${
                  voiceEngine === 'online'
                    ? 'bg-slate-900 border-[#00b8a9] text-[#00b8a9]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {voiceEngine === 'online' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#00b8a9] shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span className="leading-tight">Online (Navegador)</span>
              </button>

              <button
                type="button"
                onClick={() => handleToggleEngine('offline')}
                className={`py-2.5 px-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold text-left transition-all cursor-pointer ${
                  voiceEngine === 'offline'
                    ? 'bg-slate-900 border-[#00b8a9] text-[#00b8a9]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {voiceEngine === 'offline' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#00b8a9] shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span className="leading-tight">Offline (Vosk Wasm)</span>
              </button>
            </div>
          </div>

          {/* Voz */}
          <div className="flex flex-col gap-2">
            <label htmlFor="voice-select" className="text-xs font-bold text-slate-300 tracking-wider">
              Voz
            </label>
            <div className="relative">
              <select
                id="voice-select"
                value={selectedVoiceURI || ''}
                onChange={(e) => setSelectedVoiceURI && setSelectedVoiceURI(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold focus:outline-none focus:border-[#00b8a9] appearance-none cursor-pointer pr-8"
              >
                {voices.length > 0 ? (
                  voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))
                ) : (
                  <option value="">Voz predeterminada del sistema</option>
                )}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Vibración Háptica */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-bold text-[#00b8a9]">
              Vibración
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={vibrationEnabled}
              onClick={handleToggleVibration}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                vibrationEnabled ? 'bg-[#00b8a9]' : 'bg-slate-800'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform transform ${
                  vibrationEnabled ? 'translate-x-7' : 'translate-x-1'
                } absolute top-1`}
              />
            </button>
          </div>
        </section>
      </div>

      {/* 3. BOTÓN INFERIOR DE INFORMACIÓN */}
      <footer className="w-full pt-6 pb-2">
        <Link
          href="/"
          className="w-full py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#00b8a9] text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
        >
          <Info className="w-4 h-4 text-amber-300" />
          <span>Información</span>
        </Link>
      </footer>
    </main>
  );
}