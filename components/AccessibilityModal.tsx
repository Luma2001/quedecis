'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Info, CheckCircle2, Circle } from 'lucide-react';

export interface VoiceOption {
  voiceURI: string;
  name: string;
  lang: string;
}

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  fontSize: number;
  onIncreaseFontSize: () => void;
  onDecreaseFontSize: () => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
  voices?: (SpeechSynthesisVoice | VoiceOption)[];
  selectedVoiceURI?: string;
  onVoiceChange?: (uri: string) => void;
  engineType?: 'online' | 'offline';
  onEngineTypeChange?: (engine: 'online' | 'offline') => void;
}

export default function AccessibilityModal({
  isOpen,
  onClose,
  fontSize,
  onIncreaseFontSize,
  onDecreaseFontSize,
  isLightMode,
  onToggleTheme,
  voices = [],
  selectedVoiceURI = '',
  onVoiceChange,
  engineType = 'online',
  onEngineTypeChange,
}: AccessibilityModalProps) {
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('app_high_contrast') === 'true';
  });

  const [vibrationEnabled, setVibrationEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('app_vibration') !== 'false';
  });

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('a11y-contrast');
    } else {
      document.documentElement.classList.remove('a11y-contrast');
    }
  }, [highContrast]);

  if (!isOpen) return null;

  const handleToggleContrast = (mode: boolean) => {
    setHighContrast(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_high_contrast', String(mode));
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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-accessibility-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-sm max-h-[90dvh] bg-[#0b1020] border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col justify-between overflow-y-auto no-scrollbar relative">
        
        {/* Header con botón cerrar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <h2 id="modal-accessibility-title" className="text-base font-black text-white tracking-wide">
            Accesibilidad
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal de accesibilidad"
            className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Opciones de Configuración */}
        <div className="flex flex-col gap-5 py-4 w-full">
          

        {/* Tamaño del texto */}
        <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-300 tracking-wider">
            Tamaño del texto
        </label>
        <div className="grid grid-cols-3 gap-2 items-center">
            <button
            type="button"
            onClick={onIncreaseFontSize}
            aria-label="Aumentar tamaño de letra"
            className="py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#00b8a9] active:scale-95 text-white font-bold text-sm flex items-center justify-center transition-all cursor-pointer"
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
            onClick={onDecreaseFontSize}
            aria-label="Disminuir tamaño de letra"
            className="py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#00b8a9] active:scale-95 text-white font-bold text-sm flex items-center justify-center transition-all cursor-pointer"
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
                className={`py-2 px-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
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
                className={`py-2 px-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
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
                  if (!isLightMode) onToggleTheme();
                }}
                className={`py-2 px-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
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
                  if (isLightMode) onToggleTheme();
                }}
                className={`py-2 px-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
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
                onClick={() => onEngineTypeChange && onEngineTypeChange('online')}
                className={`py-2 px-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold text-left transition-all cursor-pointer ${
                  engineType === 'online'
                    ? 'bg-slate-900 border-[#00b8a9] text-[#00b8a9]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {engineType === 'online' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#00b8a9] shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span className="leading-tight">Online</span>
              </button>

              <button
                type="button"
                onClick={() => onEngineTypeChange && onEngineTypeChange('offline')}
                className={`py-2 px-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold text-left transition-all cursor-pointer ${
                  engineType === 'offline'
                    ? 'bg-slate-900 border-[#00b8a9] text-[#00b8a9]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {engineType === 'offline' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#00b8a9] shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span className="leading-tight">Offline (Vosk)</span>
              </button>
            </div>
          </div>

          {/* Selector de Voz */}
          <div className="flex flex-col gap-2">
            <label htmlFor="voice-select" className="text-xs font-bold text-slate-300 tracking-wider">
              Voz
            </label>
            <div className="relative">
              <select
                id="voice-select"
                value={selectedVoiceURI || ''}
                onChange={(e) => onVoiceChange && onVoiceChange(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold focus:outline-hidden focus:border-[#00b8a9] appearance-none cursor-pointer pr-8"
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

          {/* Vibración */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-[#00b8a9]">
              Vibración
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={vibrationEnabled}
              onClick={handleToggleVibration}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                vibrationEnabled ? 'bg-[#00b8a9]' : 'bg-slate-800'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform transform ${
                  vibrationEnabled ? 'translate-x-6' : 'translate-x-1'
                } absolute top-1`}
              />
            </button>
          </div>
        </div>

        {/* Footer con enlace a información */}
        <div className="pt-3 border-t border-slate-800 shrink-0">
          <Link
            href="/"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#00b8a9] text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Info className="w-4 h-4 text-amber-300" />
            <span>Información</span>
          </Link>
        </div>
      </div>
    </div>
  );
}