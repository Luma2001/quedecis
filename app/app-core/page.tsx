'use client';

import React, { useState } from 'react';

// Hooks de lógica
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useAppSettings } from '@/hooks/useAppSettings';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';

// Componentes y Modales
import Logo from '@/components/logo';
import SettingsModal from '@/components/SettingsModal';
import QuickPhrasesDrawer from '@/components/QuickPhrasesDrawer';
import TranscriptDisplay from '@/components/TranscriptDisplay';
import AccessibilityModal from '@/components/AccessibilityModal';
import { Settings, Mic, Volume2, Smile } from 'lucide-react';

export default function AppCorePage() {
  const [showQuickDrawer, setShowQuickDrawer] = useState<boolean>(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState<boolean>(false);
  
  // Reconocimiento de Voz (Escuchar)
  const { 
    isListening, 
    transcript, 
    engineError,
    toggleListening
  } = useSpeechRecognition('web-speech');
  
  // Activar el pulso háptico durante la escucha activa
    useHapticFeedback(isListening);

  // Síntesis de Voz (Hablar)
  const { 
    userResponse, 
    voices = [],
    selectedVoiceURI,
    setSelectedVoiceURI,
    handleInputChange, 
    handleSpeak, 
    handleSelectPhrase,
    isSpeaking
  } = useSpeechSynthesis();

  // Ajustes de accesibilidad y categorías
  const { 
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    isLightMode,
    toggleLightMode,
    isSettingsOpen,
    setIsSettingsOpen,
    categories,
    setCategories
  } = useAppSettings();

  // Categoría activa por defecto
  const onSpeakMessage = () => {
    if (userResponse.trim()) {
      handleSpeak(userResponse);
    }
  };


  return (
    <main 
      id="main-content"
      aria-label="Asistente de comunicación inclusiva"
      className="h-dvh w-full max-w-md mx-auto flex flex-col justify-between bg-[#0b1020] text-white font-sans overflow-hidden shadow-2xl relative"
    >
      <h1 className="sr-only">¿Qué Dices? - Transcriptor y Asistente Inclusivo</h1>

      {/* 1. HEADER COMPACTO */}
      <header className="w-full px-4 pt-4 pb-3 flex items-center justify-between border-b border-slate-800/80 shrink-0 bg-[#0b1020]/90">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight leading-none text-white">
              ¿QUÉ DICES?
            </span>
            <span className="text-[10px] font-bold text-[#00b8a9] uppercase tracking-wider mt-0.5">
              Asistente Inclusivo
            </span>
          </div>
        </div>

        {/* Acceso a modal de accesibilidad */}
        <button
          type="button"
          onClick={() => setIsAccessModalOpen(true)}
          aria-label="Abrir panel de configuración de accesibilidad"
          className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-300 hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00b8a9] cursor-pointer"
        >
          <Settings className="w-5 h-5" aria-hidden="true" />
        </button>
      </header>

      {/* 2. ÁREA DE CONVERSACIÓN / VISOR */}
      <TranscriptDisplay
        transcript={transcript}
        isListening={isListening}
        isSpeaking={isSpeaking}
        engineError={engineError}
        onRetryListening={toggleListening}
        fontSize={fontSize}
      />

      {/* 3. PANEL DESPLEGABLE DE FRASES RÁPIDAS (TIPO DRAWER DE EMOJIS) */}

      <QuickPhrasesDrawer
        isOpen={showQuickDrawer}
        onClose={() => setShowQuickDrawer(false)}
        categories={categories}
        onSelectPhrase={(phrase) => {
          handleSelectPhrase(phrase);
          setShowQuickDrawer(false);
        }}
        onOpenManageModal={() => setIsSettingsOpen(true)}
      />

      {/* 4. BARRA DE ENTRADA Y ACCIONES INFERIORES */}
      <footer className="w-full bg-slate-900/95 border-t border-slate-800 px-4 pt-3 pb-6 shrink-0 flex flex-col gap-3">
        
        {/* Input Pill con botón de Frases / Emojis */}
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 rounded-full px-2 py-1 shadow-inner focus-within:border-[#00b8a9] transition-colors">
          <button
            type="button"
            onClick={() => setShowQuickDrawer(!showQuickDrawer)}
            aria-label={showQuickDrawer ? 'Cerrar panel de frases' : 'Abrir frases rápidas'}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
              showQuickDrawer
                ? 'bg-[#00b8a9] text-[#0b1020]'
                : 'bg-slate-700 hover:bg-slate-600 text-amber-300'
            }`}
          >
            <Smile className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={userResponse}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSpeakMessage();
            }}
            placeholder="Escribí tu mensaje..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 px-2 py-1.5 focus:outline-none"
          />
        </div>

        {/* 5. DOS BOTONES PRINCIPALES */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* Botón Transcribir Voz */}
          <button
            type="button"
            onClick={toggleListening}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl font-black text-xs tracking-wider transition-all duration-200 cursor-pointer shadow-lg active:scale-95 ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-[#00b8a9] hover:bg-[#2dd4bf] text-[#0b1020]'
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-black/15 flex items-center justify-center shrink-0">
              <Mic className="w-4 h-4" />
            </div>
            <span className="leading-tight text-left">
              {isListening ? 'DETENER' : <>TRANSCRIBIR<br />VOZ</>}
            </span>
          </button>

          {/* Botón Decir Mensaje */}
          <button
            type="button"
            onClick={onSpeakMessage}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl font-black text-xs tracking-wider bg-[#00a878] hover:bg-[#00b8a9] text-[#0b1020] transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
          >
            <div className="w-7 h-7 rounded-full bg-black/15 flex items-center justify-center shrink-0">
              <Volume2 className="w-4 h-4" />
            </div>
            <span className="leading-tight text-left">
              DECIR<br />MENSAJE
            </span>
          </button>
        </div>
      </footer>

      {/* Modal para gestionar o agregar frases */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        categories={categories}
        onSaveCategories={setCategories}
      />

      {/* Modal de Accesibilidad (En tiempo real) */}
      <AccessibilityModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
        fontSize={fontSize}
        onIncreaseFontSize={increaseFontSize}
        onDecreaseFontSize={decreaseFontSize}
        isLightMode={isLightMode}
        onToggleTheme={toggleLightMode}
        voices={voices}
        selectedVoiceURI={selectedVoiceURI}
        onVoiceChange={setSelectedVoiceURI}
      />
    </main>
  );
}