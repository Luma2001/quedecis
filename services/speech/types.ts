//define las reglas internas de nuestro sistema para que todos los motores hablen el mismo idioma.
export type SpeechEngineType = 'web-speech' | 'vosk';

export interface SpeechEngine {
  /** Indica si la API o motor es compatible con el navegador del usuario */
  isSupported: boolean;
  /** Estado de escucha activo */
  isListening: boolean;
  /** Inicia la captura de audio */
  start: () => void;
  /** Detiene la captura de audio */
  stop: () => void;
  /** Callback para notificar cuando hay una nueva transcripción parcial o final */
  onResult: (text: string) => void;
  /** Callback para notificar errores del motor */
  onError: (error: string) => void;
}