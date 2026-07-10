


// Extendemos el objeto Window global del navegador
declare global {


  // Mover los eventos y la interfaz principal adentro del bloque global
  interface SpeechRecognitionEvent {
    resultIndex: number;
    results: {
      length: number;
      [key: number]: {
        [key: number]: {
          transcript: string;
        };
      };
    };
  }

  interface SpeechRecognitionErrorEvent {
    error: string;
  }

  //definimos qué forma tiene el objeto personalizado para que no tire error de "any"
  interface SpeechRecognitionCustom {
    continuous: boolean;
    interimResults: boolean;
    lang: string;   
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    start: () => void;
    stop: () => void;
  }

  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionCustom;//herramienta nativa de reconocimiento de voz
    webkitSpeechRecognition?: new () => SpeechRecognitionCustom;//herramienta nativa de reconocimiento de voz para navegadores basados en WebKit (chrome, safari)
  }
}

// Exportación vacía obligatoria para indicarle a TS que es un módulo global
export {};