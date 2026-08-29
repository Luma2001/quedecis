'use client';

import React from 'react';
import { SpeechEngineType } from '@/services/speech';
import { Volume2, Mic, MicOff, Loader2, Sun, Moon, Type } from 'lucide-react';

interface ControlPanelProps {
  userResponse: string;
  isListening: boolean;
  isLoading?: boolean;
  engineType: SpeechEngineType;
  onEngineTypeChange: (type: SpeechEngineType) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSpeak: (text: string) => void;
  onToggleListening: () => void;
  voices: SpeechSynthesisVoice[];
  selectedVoiceURI: string;
  onVoiceChange: (uri: string) => void;
  fontSize: number;
  onIncreaseFontSize: () => void;
  onDecreaseFontSize: () => void;
  isLeftHanded: boolean;
  onToggleLateralidad: () => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
}

export default function ControlPanel({
  userResponse,
  isListening,
  isLoading = false,
  engineType,
  onEngineTypeChange,
  onInputChange,
  onSpeak,
  onToggleListening,
  voices,
  selectedVoiceURI,
  onVoiceChange,
  fontSize,
  onIncreaseFontSize,
  onDecreaseFontSize,
  isLeftHanded,
  onToggleLateralidad,
  isLightMode,
  onToggleTheme,
}: ControlPanelProps) {
  return (
    <section 
      aria-label="Panel de control e interacción de voz"
      className="w-full max-w-md mx-auto p-3 space-y-3 bg-slate-950 border-t border-slate-800 text-slate-100 transition-colors duration-300 a11y-contrast:bg-black a11y-contrast:border-t-2 a11y-contrast:border-white"
    >
      {/* 1. INPUT PRINCIPAL DE ESCRITURA */}
      <div>
        <label htmlFor="input-text" className="sr-only">
          Escribí tu mensaje o respuesta para reproducir en voz alta
        </label>
        <input
          id="input-text"
          type="text"
          value={userResponse}
          onChange={onInputChange}
          onFocus={(e) => e.target.select()}
          placeholder="Escribí tu respuesta acá..."
          className="w-full rounded-xl px-4 py-3 text-base bg-slate-900 border border-slate-700 text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:border-transparent transition-all a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:placeholder:text-slate-300 a11y-contrast:border-2 a11y-contrast:border-white a11y-contrast:focus-visible:border-yellow-400"
        />
      </div>

      {/* 2. DISTRIBUCIÓN EN PARALELO CON CONTROL DE LATERALIDAD */}
      <div className="grid grid-cols-12 gap-2" dir={isLeftHanded ? 'rtl' : 'ltr'}>
        
        {/* PANEL DE ACCESIBILIDAD Y AJUSTES (7 de 12 cols) */}
        <div 
          className="col-span-7 p-2.5 rounded-xl border border-slate-800 bg-slate-900/90 flex flex-col justify-between space-y-2.5 transition-colors duration-300 a11y-contrast:bg-black a11y-contrast:border-2 a11y-contrast:border-white" 
          dir="ltr"
        >
          {/* Fila de controles: Tamaño de fuente y Modo de mano / Tema */}
          <div className="flex items-center justify-between gap-1">
            {/* Control de Fuente */}
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-bold text-teal-400 a11y-contrast:text-yellow-400 uppercase tracking-wider font-mono flex items-center gap-1">
                <Type className="w-3 h-3" aria-hidden="true" />
                <span>Letra</span>
              </span>
              <div className="flex items-center space-x-1">
                <button 
                  type="button"
                  onClick={onDecreaseFontSize}
                  aria-label="Reducir tamaño de letra"
                  className="w-7 h-7 rounded-lg font-bold text-xs flex justify-center items-center bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:border a11y-contrast:border-white"
                >
                  A-
                </button>
                <span 
                  aria-live="polite"
                  className="h-7 text-xs font-mono font-bold w-10 text-center py-1 rounded bg-slate-950 border border-slate-800 text-teal-300 a11y-contrast:bg-black a11y-contrast:text-yellow-400 a11y-contrast:border a11y-contrast:border-white"
                >
                  {fontSize}
                </span>
                <button 
                  type="button"
                  onClick={onIncreaseFontSize}
                  aria-label="Aumentar tamaño de letra"
                  className="w-7 h-7 rounded-lg font-bold text-xs flex justify-center items-center bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:border a11y-contrast:border-white"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Alternadores de Tema y Lateralidad */}
            <div className="flex flex-col space-y-1">
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={isLightMode ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
                className="px-2 py-1 rounded-lg flex items-center justify-center gap-1 bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 a11y-contrast:bg-black a11y-contrast:text-yellow-400 a11y-contrast:border a11y-contrast:border-white"
              >
                {isLightMode ? <Moon className="w-3.5 h-3.5" aria-hidden="true" /> : <Sun className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />}
                <span className="text-[9px] font-bold font-mono">{isLightMode ? 'OSCURO' : 'CLARO'}</span>
              </button>
              
              <button
                type="button"
                onClick={onToggleLateralidad}
                aria-label={isLeftHanded ? "Cambiar a modo diestro" : "Cambiar a modo zurdo"}
                className="px-2 py-1 rounded-lg flex items-center justify-center gap-1 bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 a11y-contrast:bg-black a11y-contrast:text-yellow-400 a11y-contrast:border a11y-contrast:border-white"
              >
                <span className="text-xs" aria-hidden="true">{isLeftHanded ? '🫲' : '🫱'}</span>
                <span className="text-[9px] font-bold font-mono">{isLeftHanded ? 'ZURDO' : 'DIESTRO'}</span>
              </button>
            </div>
          </div>

          {/* Selector de Motor de Voz */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="speech-engine-select" className="text-[10px] text-teal-400 a11y-contrast:text-yellow-400 font-bold uppercase tracking-wider font-mono">
              Modo Voz
            </label>
            <select
              id="speech-engine-select"
              value={engineType}
              onChange={(e) => onEngineTypeChange(e.target.value as SpeechEngineType)}
              disabled={isListening || isLoading}
              className="w-full text-xs rounded-lg p-1.5 bg-slate-950 border border-slate-700 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 disabled:opacity-50 truncate a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:border a11y-contrast:border-white"
            >
              <option className="bg-slate-950 text-white" value="web-speech">Online (Navegador)</option>
              <option className="bg-slate-950 text-white" value="offline">Offline (Vosk WASM)</option>
            </select>
          </div>    

          {/* Selector de Voces */}
          {voices.length > 0 && (
            <div className="flex flex-col space-y-1">
              <label htmlFor="speech-voice-select" className="text-[10px] text-teal-400 a11y-contrast:text-yellow-400 font-bold uppercase tracking-wider font-mono">
                Voz
              </label>
              <select
                id="speech-voice-select"
                value={selectedVoiceURI}
                onChange={(e) => onVoiceChange(e.target.value)}
                className="w-full text-xs rounded-lg p-1.5 bg-slate-950 border border-slate-700 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 truncate a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:border a11y-contrast:border-white"
              >
                {voices.map((voice) => (
                  <option key={voice.voiceURI} value={voice.voiceURI} className="bg-slate-950 text-white">
                    {voice.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* COLUMNA DE BOTONES PRINCIPALES (5 de 12 cols) */}
        <div className="col-span-5 flex flex-col space-y-2" dir="ltr">
          {/* Botón Decir en voz alta */}
          <button
            type="button"
            onClick={() => onSpeak(userResponse)}
            aria-label="Reproducir texto en voz alta"
            className="flex-1 bg-teal-500 hover:bg-teal-400 active:scale-[0.98] text-slate-950 font-black rounded-xl transition-all shadow-md flex flex-col justify-center items-center p-2 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 a11y-contrast:bg-yellow-400 a11y-contrast:text-black a11y-contrast:border-2 a11y-contrast:border-white"
          >
            <Volume2 className="w-6 h-6 mb-1 text-slate-950 a11y-contrast:text-black" aria-hidden="true" />
            <span className="text-sm font-bold tracking-tight leading-tight">Decir texto</span>
          </button>

          {/* Botón Escuchar Micrófono */}
          <button
            type="button"
            onClick={onToggleListening}
            disabled={isLoading}
            aria-pressed={isListening}
            aria-label={
              isLoading 
                ? "Cargando motor de reconocimiento de voz" 
                : isListening 
                ? "Detener transcripción de voz" 
                : "Iniciar escucha y transcripción de voz"
            }
            className={`flex-1 font-black rounded-xl transition-all shadow-lg flex flex-col justify-center items-center p-2 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
              isLoading
                ? 'bg-amber-600 animate-pulse text-white cursor-wait focus-visible:ring-amber-400'
                : isListening
                ? 'bg-rose-600 hover:bg-rose-500 animate-pulse text-white focus-visible:ring-rose-400 a11y-contrast:bg-red-600 a11y-contrast:text-white a11y-contrast:border-2 a11y-contrast:border-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white focus-visible:ring-emerald-400 a11y-contrast:bg-black a11y-contrast:text-yellow-400 a11y-contrast:border-2 a11y-contrast:border-yellow-400'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 mb-1 animate-spin" aria-hidden="true" />
            ) : isListening ? (
              <MicOff className="w-6 h-6 mb-1" aria-hidden="true" />
            ) : (
              <Mic className="w-6 h-6 mb-1" aria-hidden="true" />
            )}
            <span className="text-sm font-bold tracking-tight leading-tight">
              {isLoading ? 'Cargando...' : isListening ? 'Detener' : 'Escuchar'}
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}