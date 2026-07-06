'use client';

import React, { useState, useEffect, useRef } from 'react';
import { initialCategories, QuickPhrase, PhraseCategory } from '@/data/phrases.data';

// Importamos nuestros componentes limpios con el alias @/
import TranscriptDisplay from '@/components/TranscriptDisplay';
import QuickPhrasesChips from '@/components/QuickPhrasesChips';
import ControlPanel from '@/components/ControlPanel';
import SettingsModal from '@/components/SettingsModal';
import AudioIndicator from '@/components/AudioIndicator';
import MicAlert from '@/components/MicAlert';
// import Logo from '@/components/logo';


interface SpeechRecognitionCustom {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: { resultIndex: number; results: unknown }) => void;
  onerror: (event: { error: string }) => void;
  start: () => void;
  stop: () => void;
}

//Permiso especial que le damos a TypeScript para que nos deje usar las herramientas nativas del navegador sin protestar
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionCustom;//herramienta nativa de reconocimiento de voz
    webkitSpeechRecognition?: new () => SpeechRecognitionCustom;//herramienta nativa de reconocimiento de voz para navegadores basados en WebKit (chrome, safari)
  }
}


export default function AppCorePage() {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>(() => {
    if (typeof window !== 'undefined' && !(window.SpeechRecognition || window.webkitSpeechRecognition)) {
      return 'Lo siento, tu navegador no soporta el reconocimiento de voz nativo.';
    }
    return 'Presioná el botón de abajo y empezá la transcripción...';
  });
  const [userResponse, setUserResponse] = useState<string>('');
  const recognitionRef = useRef<SpeechRecognitionCustom | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(32);
  const [isLeftHanded, setIsLeftHanded] = useState<boolean>(false);
  const [categories, setCategories] = useState<PhraseCategory[]>(initialCategories);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false); 
  const [micPermissionGranted, setMicPermissionGranted] = useState<boolean | null>(null);

  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      // El estado inicial ya refleja si el navegador no soporta reconocimiento de voz.
      return;
    }
    // Inicializamos el reconocimiento de voz
    const recognition = new SpeechRecognitionAPI();
    //Seteamos las propiedades del reconocimiento de voz (cómo, cuándo y en qué idioma va a escuchar la aplicación.)
    //transformamos un dictado simple de voz en una herramienta de subtitulado en tiempo real, continuo y adaptado perfectamente a nuestro acento local.
    recognition.continuous = true;//escucha continua: ordenamos al navegador que no apague el micrófono aunque la persona deje de hablar por unos segundos.
    recognition.interimResults = true;//resultados provisionales: nos permite ver lo que la persona está diciendo en tiempo real, aunque todavía no haya terminado de hablar.
    recognition.lang = 'es-AR';

    //función que el navegador ejecuta de forma automática cada vez que el micrófono detecta que el usuario terminó de procesar un sonido o una palabra
    recognition.onresult = (event: { resultIndex: number; results: unknown }) => {
      const results = event.results as { [key: number]: { [key: number]: { transcript: string } } } & { length: number };
      let currentTranscript = '';
      for (let i = event.resultIndex; i < results.length; ++i) {
        currentTranscript += results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };

    //función que el navegador ejecuta de forma automática cada vez que el micrófono detecta un error
    recognition.onerror = (event: { error: string }) => {
      console.error('Error de transcripción:', event.error);
      if (event.error === 'not-allowed') {
        setTranscript('Permiso de micrófono denegado. Activalo en la configuración.');
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition 
  }, []);//final del useEffect: reconocimiento y transcripción de voz en tiempo real

  useEffect(() => {
      const synth = window.speechSynthesis;
      const loadVoices = () => {
        const allVoices = synth.getVoices();
        const spanishVoices = allVoices.filter(voice => voice.lang.startsWith('es'));
        setVoices(spanishVoices);

        if (spanishVoices.length > 0) {
          const argVoice = spanishVoices.find(v => v.lang === 'es-AR');
          setSelectedVoiceURI(argVoice ? argVoice.voiceURI : spanishVoices[0].voiceURI);
        }
      };

      loadVoices();
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
      }
    }, []);//Final del useEffect: carga de voces disponibles

//función que solicita permiso de micrófono al usuario y actualiza el estado según la respuesta
  const solicitarPermisoMicrofono = async () => {
    try {
      // Intentamos abrir un canal de audio momentáneo
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Si la línea de arriba funciona, significa que el usuario aceptó el cartel del celular
      setMicPermissionGranted(true);
      
      // Cerramos el canal momentáneo para que no quede el micrófono encendido innecesariamente
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      // Si entra acá, es porque el usuario denegó el permiso o el celular lo tiene bloqueado por defecto
      console.error("Permiso de micrófono denegado:", error);
      setMicPermissionGranted(false);
    }
  };  

  useEffect(() => {
    // Función interna para manejar la asincronía de forma segura en React
    const verificarYPedirPermiso = async () => {
      await solicitarPermisoMicrofono();
    };

    verificarYPedirPermiso();
  }, []);

  //función para incrementar letra dentro de un límite
  const increaseFontSize = () => {
    setFontSize(prev => (prev < 60 ? prev + 4 : prev)); // Límite máximo: 60px
  };

  //función para decrementar letra dentro de un límite
  const decreaseFontSize = () => {
    setFontSize(prev => (prev > 20 ? prev - 4 : prev)); // Límite mínimo: 20px
  };

  //función encargada de reaccionar cuando el usuario presiona el botón grande del micrófono
  const toggleListening = (): void => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();//ordena físicamente al micrófono que deje de grabar y se apague
      setIsListening(false);
    } else {
      setTranscript('Escuchando... Hablá ahora.');
      recognitionRef.current.start();//enciende el micrófono físico y la API nativa empieza a procesar las ondas de sonido del ambiente
      setIsListening(true);
    }
  };//fin toggleListening: si el micrófono está encendido, lo apaga; si está apagado, lo enciende

  //función que captura lo que un usuario escribe en una pantalla
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserResponse(e.target.value);
  };

  //función convierte texto escrito en voz audible para la persona que está escuchando
    const handleSpeak = (text: string): void => {
      if (!text.trim()) return; //Si el input está vacío, no hacemos nada

      // 1. Accedemos al motor de síntesis del navegador
      const synth = window.speechSynthesis;

      //PREVENCIÓN CRÍTICA: Si ya estaba hablando, cancelamos el audio previo
      // para evitar que se encolen los mensajes si el usuario cliquea rápido.
      synth.cancel();

      // 2. Creamos una "instancia de elocución" con el texto del usuario
      const utterance = new SpeechSynthesisUtterance(text);

      // 3. Configuración de idioma 
      const currentVoice = voices.find(v => v.voiceURI === selectedVoiceURI);
      if (currentVoice) {
        utterance.voice = currentVoice;
      } else {
        utterance.lang = 'es-AR'; // (Buena práctica: Español de Argentina)
      }

      // 4. Ajustes opcionales de tono y velocidad (1 es el valor por defecto)
      utterance.pitch = 1;
      utterance.rate = 1;

      // 🔥 5. DISPARADORES VISUALES DE ACCESIBILIDAD
      // Cuando las ondas de sonido físicas empiezan a salir por el parlante
      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      // Cuando se pronuncia la última sílaba del texto por completo
      utterance.onend = () => {
        setIsSpeaking(false);
      };

      // Si ocurre un error o el usuario bloquea el audio de golpe
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      // 6. Le ordenamos al navegador que lo diga en voz alta
      synth.speak(utterance);
    };



  //función que captura la frase rápida seleccionada por el usuario y la convierte en voz audible
  const handleSelectPhrase = (phrase: QuickPhrase): void => {
    setUserResponse(phrase.textToSpeak);
    handleSpeak(phrase.textToSpeak);
  };

  
  return (
    <div className={`h-screen w-full flex flex-col justify-between overflow-hidden font-sans transition-colors duration-300 ${
      isLightMode ? 'bg-slate-100 text-slate-900' : 'bg-slate-900 text-white'
    }`}>
      
      {/* 1. ZONA SUPERIOR */}
     
        <TranscriptDisplay transcript={transcript} fontSize={fontSize} isLightMode={isLightMode}/>
        <MicAlert 
          micPermissionGranted={micPermissionGranted} 
          onRetry={solicitarPermisoMicrofono} 
        />
     
      {/* 2. ZONA INTERMEDIA */}
      
        <QuickPhrasesChips categories={categories} onSelectPhrase={handleSelectPhrase} onOpenSettings={() => setIsSettingsOpen(true)} isLightMode={isLightMode}/>
        <AudioIndicator isSpeaking={isSpeaking} />

      {/* 3. ZONA INFERIOR */}
     
        <ControlPanel 
          userResponse={userResponse}
          isListening={isListening}
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
          onToggleLateralidad={() => setIsLeftHanded(prev => !prev)}
          isLightMode={isLightMode}
          onToggleTheme={() => setIsLightMode(prev => !prev)}
        />

        {/* 4. MODAL DE AJUSTES (Componente Flotante global) */}
        <SettingsModal 
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          categories={categories}
          onSaveCategories={setCategories}
          isLightMode={isLightMode}
        />
      

    </div>
  );
}
