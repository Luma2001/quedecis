import { useState, useEffect } from 'react';
import {  QuickPhrase } from '@/data/phrases.data';

const STORAGE_KEY_VOICE = 'que_decis_selected_voice';


export function useSpeechSynthesis() {
  const [userResponse, setUserResponse] = useState<string>('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURIState] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  
  // MANEJADOR PERSONALIZADO PARA GUARDAR LA SELECCIÓN EN LOCALSTORAGE
    const setSelectedVoiceURI = (uri: string): void => {
      setSelectedVoiceURIState(uri);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_VOICE, uri);
      }
    };


  //CARGAR VOCES DISPONIBLES EN EL NAVEGADOR
  useEffect(() => {
 if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const allVoices = synth.getVoices();
      const spanishVoices = allVoices.filter(voice => voice.lang.startsWith('es'));
      setVoices(spanishVoices);

      if (spanishVoices.length > 0) {
        // 1. Intentamos recuperar la voz guardada en localStorage
        const savedVoiceURI = localStorage.getItem(STORAGE_KEY_VOICE);
        const savedVoiceExists = spanishVoices.some(v => v.voiceURI === savedVoiceURI);

        if (savedVoiceURI && savedVoiceExists) {
          setSelectedVoiceURIState(savedVoiceURI);
        } else {
          // 2. Si no hay voz guardada, buscamos la de Argentina (es-AR) o la primera en español
          const argVoice = spanishVoices.find(v => v.lang === 'es-AR');
          const defaultVoice = argVoice ? argVoice.voiceURI : spanishVoices[0].voiceURI;
          setSelectedVoiceURIState(defaultVoice);
        }
      }
    };

    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, []);//Final del useEffect: carga de voces disponibles

  // CAPTURAR EL TEXTO DEL INPUT Y ACTUALIZAR EL ESTADO
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserResponse(e.target.value);
  };

  //CONVERTIR TEXTO ESCRITO EN VOZ
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
  };//Final de la función: handleSpeak

 //función que captura la frase rápida seleccionada por el usuario y la convierte en voz audible
  const handleSelectPhrase = (phrase: QuickPhrase): void => {
    setUserResponse(phrase.textToSpeak);
    handleSpeak(phrase.textToSpeak);
  };



  return {
    userResponse,
    setUserResponse,
    voices,
    selectedVoiceURI,
    setSelectedVoiceURI,
    isSpeaking,
    handleInputChange,
    handleSpeak,
    handleSelectPhrase
  };
}