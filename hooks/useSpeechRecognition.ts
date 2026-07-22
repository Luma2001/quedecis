import { useState, useEffect, useRef, useCallback } from 'react';
import { SpeechEngine, SpeechEngineType, WebSpeechEngine, VoskEngine } from '@/services/speech';

export function useSpeechRecognition(engineType: SpeechEngineType = 'web-speech') {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('Presioná el botón de abajo y empezá la transcripción...');
  const [engineError, setEngineError] = useState<string | null>(null);

  // Guardamos la referencia al motor activo
  const engineRef = useRef<SpeechEngine | null>(null);

  useEffect(() => {
    // Instanciamos la estrategia elegida
    if (engineType === 'web-speech') {
      engineRef.current = new WebSpeechEngine();
    } else {
      engineRef.current = new VoskEngine();
    }

    const engine = engineRef.current;

    if (!engine.isSupported) {
      setTranscript('Tu navegador no soporta el motor de voz seleccionado.');
      return;
    }

    // Conectamos los callbacks genéricos a nuestros estados de React
    engine.onResult = (text: string) => {
      setTranscript(text);
    };

    engine.onError = (error: string) => {
      console.error('Error en SpeechEngine:', error);
      setEngineError(error);
      setIsListening(false);
      setIsLoading(false);
    };

    // Cleanup: si el usuario cambia de motor o se desmonta el componente, apagamos el motor activo
    return () => {
      if (engine.isListening) {
        engine.stop();
      }
    };
  }, [engineType]);

  const toggleListening = useCallback(async () => {
    const engine = engineRef.current;
    if (!engine) return;

    if (isListening) {
      engine.stop();
      setIsListening(false);
    } else {
      try {
        // Limpiamos errores previos al presionar iniciar
        setEngineError(null);
        setIsLoading(true);
        setTranscript('Inicializando micrófono...');
        
        await engine.start();
        
        setIsListening(true);
        setTranscript('Escuchando... Hablá ahora.');
      } catch (err) {
        console.error('Error al iniciar el reconocedor:', err);
        setIsListening(false);
      } finally {
        setIsLoading(false);
      }
    }
  }, [isListening]);

  return {
    isListening,
    isLoading,
    transcript,
    setTranscript,
    engineError,
    toggleListening,
  };
}











// import { useState, useEffect, useRef } from 'react';



// export function useSpeechRecognition() {
//     const [isListening, setIsListening] = useState<boolean>(false);
//     const [transcript, setTranscript] = useState<string>(() => {
//         if (typeof window !== 'undefined' && !(window.SpeechRecognition || window.webkitSpeechRecognition)) {
//         return 'Lo siento, tu navegador no soporta el reconocimiento de voz nativo.';
//         }
//         return 'Presioná el botón de abajo y empezá la transcripción...';
//     });
//     const [micPermissionGranted, setMicPermissionGranted] = useState<boolean | null>(null);
    
    


//     // RECONOCIMIENTO Y TRANSCRIPCIÓN DE VOZ EN TIEMPO REAL
//         //1- Creamos una referencia para mantener el estado actualizado dentro de los callbacks del reconocimiento de voz
//         const isListeningRef = useRef(isListening);
//         //2- Cada vez que cambie el estado real, actualizamos la referencia
//         useEffect(() => {
//             isListeningRef.current = isListening;
//         }, [isListening]);
//         //3- Creamos una referencia para almacenar la instancia del reconocimiento de voz
//         const recognitionRef = useRef<SpeechRecognitionCustom | null>(null);
//         //4- Configuramos el reconocimiento de voz y la transcripción en tiempo real
//         useEffect(() => {
//             const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
//             if (!SpeechRecognitionAPI) {
//             // El estado inicial ya refleja si el navegador no soporta reconocimiento de voz.
//             return;
//             }
//             // Inicializamos el reconocimiento de voz
//             const recognition = new SpeechRecognitionAPI();
//             //Seteamos las propiedades del reconocimiento de voz (cómo, cuándo y en qué idioma va a escuchar la aplicación.)
//             //transformamos un dictado simple de voz en una herramienta de subtitulado en tiempo real, continuo y adaptado perfectamente a nuestro acento local.
//             recognition.continuous = true;//escucha continua: ordenamos al navegador que no apague el micrófono aunque la persona deje de hablar por unos segundos.
//             recognition.interimResults = true;//resultados provisionales: nos permite ver lo que la persona está diciendo en tiempo real, aunque todavía no haya terminado de hablar.
//             recognition.lang = 'es-AR';

//             //función que el navegador ejecuta de forma automática cada vez que el micrófono detecta que el usuario terminó de procesar un sonido o una palabra
//             recognition.onresult = (event: { resultIndex: number; results: unknown }) => {
//             const results = event.results as { [key: number]: { [key: number]: { transcript: string } } } & { length: number };
//             let currentTranscript = '';
//             for (let i = event.resultIndex; i < results.length; ++i) {
//                 currentTranscript += results[i][0].transcript;
//             }
//             setTranscript(currentTranscript);
//             };

//             //función que el navegador ejecuta de forma automática cada vez que el micrófono detecta un error
//             recognition.onerror = (event: { error: string }) => {
//             console.error('Error de transcripción:', event.error);
//             if (event.error === 'not-allowed') {
//                 setTranscript('Permiso de micrófono denegado. Activalo en la configuración.');
//                 setIsListening(false);
//             }

//             if (event.error === 'network') {
//                 console.warn("Aviso de red en Web Speech API: Reintentando conectar el micrófono...");
//                 // Si el error es de red temporal, intentamos reiniciar el dictado en 1 segundo
//                 setTimeout(() => {
//                 if (isListeningRef.current) {
//                     recognition.start();
//                 }
//                 }, 1000);
//                 return;
//             }
//             };

//             recognitionRef.current = recognition 
//         }, []);//final del useEffect: reconocimiento y transcripción de voz en tiempo real




//     // SOLICITAR PERMISO DE MICRÓFONO AL USUARIO Y ACTUALIZAR EL ESTADO SEGÚN LA RESPUESTA
//         const solicitarPermisoMicrofono = async () => {
//             try {
//             // Intentamos abrir un canal de audio momentáneo
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
//             // Si la línea de arriba funciona, significa que el usuario aceptó el cartel del celular
//             setMicPermissionGranted(true);
            
//             // Cerramos el canal momentáneo para que no quede el micrófono encendido innecesariamente
//             stream.getTracks().forEach(track => track.stop());
//             } catch (error) {
//             // Si entra acá, es porque el usuario denegó el permiso o el celular lo tiene bloqueado por defecto
//             console.error("Permiso de micrófono denegado:", error);
//             setMicPermissionGranted(false);
//             }
//         };  //Final de la función: solicitarPermisoMicrofono
        
//         useEffect(() => {
//             // Función interna para manejar la asincronía de forma segura en React
//             const verificarYPedirPermiso = async () => {
//             await solicitarPermisoMicrofono();
//             };
        
//             verificarYPedirPermiso();
//         }, []);




//     // APAGAR O ENCENDER EL MICRÓFONO CON UN BOTÓN
//         // función encargada de reaccionar cuando el usuario presiona el botón grande del micrófono
//         const toggleListening = (): void => {
//             if (!recognitionRef.current) return;
//             if (isListening) {
//             recognitionRef.current.stop();//ordena físicamente al micrófono que deje de grabar y se apague
//             setIsListening(false);
//             } else {
//             setTranscript('Escuchando... Hablá ahora.');
//             recognitionRef.current.start();//enciende el micrófono físico y la API nativa empieza a procesar las ondas de sonido del ambiente
//             setIsListening(true);
//             }
//         };//fin toggleListening: si el micrófono está encendido, lo apaga; si está apagado, lo enciende
            


        
//   return {
//     isListening,
//     transcript,
//     setTranscript,
//     micPermissionGranted,
//     solicitarPermisoMicrofono,
//     toggleListening
//   };
// }