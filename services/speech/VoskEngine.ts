// src/services/speech/VoskEngine.ts
import { SpeechEngine } from './types';
import * as Vosk from 'vosk-browser';


export class VoskEngine implements SpeechEngine {

  public isSupported: boolean = false;//Vosk necesita dos cosas nativas del navegador: AudioContext(procesa ondas de audio) y Worker(para ejecutar en C++/WASM sin congelar la interfaz)
  public isListening: boolean = false;

  // Callbacks requeridos por la interfaz SpeechEngine
  public onResult: (text: string) => void = () => {};
  public onError: (error: string) => void = () => {};

  private model: Vosk.Model | null = null; //guardamos referencias al model( archivos descargados de ~40MB)
  private recognizer: Vosk.KaldiRecognizer | null = null;//Objeto que toma el modelo y procesa las frecuencias de voz
  private audioContext: AudioContext | null = null;//captura la señal del micrófono
  private mediaStream: MediaStream | null = null;//envíamos los datos procesados al reconocedor
  private isLoaded: boolean = false;


  // Ruta al modelo comprimido en español (o alojado en la carpeta /public)
  private modelUrl: string = '/models/vosk-model-small-es-0.42.zip';

  constructor(customModelUrl?: string) {
    if (typeof window !== 'undefined') {
      // Verificamos si el navegador soporta AudioContext y Web Workers (necesarios para WASM)
      const hasAudioContext = !!(window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
      const hasWorker = typeof Worker !== 'undefined';
      
      this.isSupported = hasAudioContext && hasWorker;
    }
    if (customModelUrl) {
      this.modelUrl = customModelUrl;
    }
  }//fin constructor

/**
 * Carga el modelo pesado en segundo plano solo la primera vez que se necesita
 */
  public async loadModel(): Promise<void> {
    if (this.isLoaded) return;

    try {
      // Creamos el modelo WASM cargándolo desde la URL especificada
      this.model = await Vosk.createModel(this.modelUrl);
      
      // Creamos el reconocedor configurando la tasa de muestreo estándar (16kHz es ideal para voz)
      this.recognizer = new this.model.KaldiRecognizer(16000);

      // Escuchamos los eventos de transcripción que devuelve Vosk
      // Usamos un tipo flexible en la firma del evento para manejar las distintas respuestas de Vosk
      // Escuchamos los eventos de transcripción de Vosk de forma segura
      this.recognizer.on('result', (message: unknown) => {
        const msg = message as { result?: { text?: string } };
        if (msg?.result?.text) {
          this.onResult(msg.result.text);
        }
      });

      this.recognizer.on('partialresult', (message: unknown) => {
        const msg = message as { result?: { partial?: string } };
        if (msg?.result?.partial) {
          this.onResult(msg.result.partial);
        }
      });
      this.isLoaded = true;
    } catch (e) {
      console.error('Error al cargar el modelo de Vosk:', e);
      this.onError('No se pudo cargar el modelo de voz offline.');
    }
  }//fin loadModel

  public async start(): Promise<void> {
    if (!this.isSupported) {
      this.onError('El navegador no soporta procesamiento de audio en segundo plano (WASM/AudioContext).');
      return;
    }

    //Cargar modelo y procesar Stream del micrófono

    try {
      // 1. Aseguramos que el modelo esté cargado en memoria
      if (!this.isLoaded) {
        await this.loadModel();
      }

      if (!this.recognizer) return;

      // 2. Solicitamos el stream del micrófono optimizado para voz humana
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          channelCount: 1,
          sampleRate: 16000,
        },
      });

      // 3. Conectamos la señal de audio al reconocedor de Vosk
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioCtx({ sampleRate: 16000 });

      const source = this.audioContext.createMediaStreamSource(this.mediaStream);

      // Node procesador de audio para alimentar al Worker de Vosk
      const recognizerNode = this.audioContext.createScriptProcessor(4096, 1, 1);
      recognizerNode.onaudioprocess = (event) => {
        try {
          this.recognizer?.acceptWaveform(event.inputBuffer);
        } catch (error) {
          console.error('Error procesando audio en Vosk:', error);
        }
      };

      source.connect(recognizerNode);
      recognizerNode.connect(this.audioContext.destination);

      this.isListening = true;
    } catch (e) {
      console.error('Error al iniciar VoskEngine:', e);
      this.onError('No se pudo acceder al micrófono para el modo offline.');
    }

  }//fin start

  public stop(): void {
    //Apagamos tracks del micrófono y cerrar AudioContext
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    // Cerramos el canal de procesamiento de audio
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.isListening = false;
  }//fin stop
}