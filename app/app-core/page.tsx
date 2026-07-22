'use client';

import { useState } from 'react';
import { SpeechEngineType } from '@/services/speech';

//Custom hook para manejar el reconocimiento de voz y la transcripción en tiempo real
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
//Custom hook para manejar la síntesis de voz y la reproducción de audio
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
//Custom hook para manejar la configuración de la app (tamaño de fuente, lateralidad, modo claro/oscuro, categorías)
import { useAppSettings } from '@/hooks/useAppSettings';

// Importamos nuestros componentes limpios con el alias @/
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
    voices,
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
    <div className="h-screen w-full flex flex-col justify-between overflow-hidden bg-bg-main text-text-main font-sans transition-colors duration-300">
      
      {/* 1. ZONA SUPERIOR */}     
      
        <TranscriptDisplay 
            transcript={transcript} 
            fontSize={fontSize} 
            
        />
      {engineError && (
        <MicAlert 
          micPermissionGranted={false} 
          onRetry={toggleListening} 
        />
      )}
      
      {/* 2. ZONA INTERMEDIA */}    
      
        <QuickPhrasesChips 
            categories={categories}   
            onSelectPhrase={handleSelectPhrase} 
            onOpenSettings={() => setIsSettingsOpen(true)} 
        />
        <AudioIndicator isSpeaking={isSpeaking}
       />
       
      {/* 3. ZONA INFERIOR */}     
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

        {/* 4. MODAL DE AJUSTES (Componente Flotante global) */}
        <SettingsModal 
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          categories={categories}
          onSaveCategories={setCategories}
        />
    </div>
  );
}