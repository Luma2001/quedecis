'use client';

import { useState } from 'react';
import { SpeechEngineType } from '@/services/speech';

// Custom hooks
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useAppSettings } from '@/hooks/useAppSettings';

// Componentes modulares accesibles
import TranscriptDisplay from '@/components/TranscriptDisplay';
import QuickPhrasesChips from '@/components/QuickPhrasesChips';
import ControlPanel from '@/components/ControlPanel';
import SettingsModal from '@/components/SettingsModal';
import AudioIndicator from '@/components/AudioIndicator';
import MicAlert from '@/components/MicAlert';

export default function AppCorePage() {
  const [engineType, setEngineType] = useState<SpeechEngineType>('web-speech');

  const { 
    isListening, 
    isLoading,
    transcript, 
    engineError,
    toggleListening
  } = useSpeechRecognition(engineType);
  
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

  const { 
    fontSize,
    isLeftHanded,
    toggleLeftHanded,
    isSettingsOpen,
    setIsSettingsOpen,
    isLightMode,
    toggleLightMode,
    categories,
    setCategories,
    increaseFontSize,
    decreaseFontSize
  } = useAppSettings();

  return (
    <main 
      id="main-content"
      aria-label="Aplicación de comunicación inclusiva"
      className="h-dvh w-full flex flex-col justify-between overflow-hidden bg-slate-950 text-slate-100 font-sans transition-colors duration-300 a11y-contrast:bg-black a11y-contrast:text-white"
    >
      <h1 className="sr-only">
        ¿Qué Decís? — Asistente de Comunicación Accesible
      </h1>

      {/* 1. ZONA SUPERIOR: Visor de subtítulos gigantes y alertas */}
      <div className="w-full flex-1 flex flex-col min-h-0">
        <TranscriptDisplay 
          transcript={transcript} 
          fontSize={fontSize} 
        />
        {engineError && (
          <div className="p-2">
            <MicAlert 
              micPermissionGranted={false} 
              onRetry={toggleListening} 
            />
          </div>
        )}
      </div>

      {/* 2. ZONA INTERMEDIA: Frases rápidas e indicador de audio */}
      <div className="w-full shrink-0">
        <AudioIndicator isSpeaking={isSpeaking} />
        <QuickPhrasesChips 
          categories={categories}   
          onSelectPhrase={handleSelectPhrase} 
          onOpenSettings={() => setIsSettingsOpen(true)} 
        />
      </div>

      {/* 3. ZONA INFERIOR: Panel de control e interacción */}
      <div className="w-full shrink-0">
        <ControlPanel 
          userResponse={userResponse}
          isListening={isListening}
          isLoading={isLoading}
          engineType={engineType}
          onEngineTypeChange={setEngineType}
          onInputChange={handleInputChange}
          onSpeak={handleSpeak}
          onToggleListening={toggleListening}
          voices={voices}
          selectedVoiceURI={selectedVoiceURI}
          onVoiceChange={setSelectedVoiceURI}
          fontSize={fontSize}
          onIncreaseFontSize={increaseFontSize}
          onDecreaseFontSize={decreaseFontSize}
          isLeftHanded={isLeftHanded}
          onToggleLateralidad={toggleLeftHanded}
          isLightMode={isLightMode}
          onToggleTheme={toggleLightMode}
        />
      </div>

      {/* 4. MODAL DE AJUSTES (Flotante) */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        categories={categories}
        onSaveCategories={setCategories}
      />
    </main>
  );
}