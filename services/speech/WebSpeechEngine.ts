
import { SpeechEngine } from './types'; //contrato que ésta clase se compromete a cumplir



/**Declaramos la clase y la exportamos e implementamos el compromiso formal */
export class WebSpeechEngine implements SpeechEngine {
  public isSupported: boolean = false; //guarda si el navegador del usuario tiene o no soporte para reconocimiento de voz
  public isListening: boolean = false; //nos dice si el micrófono está encendido y escuchando en ese preciso instante
/**Creamos una variable privada para guardar la instancia de la API del navegador. Nace como null porque todavía no 
 * comprobamos si el navegador la soporta
 */
  private recognition: SpeechRecognitionCustom | null = null;
 /**Definimos dos propiedades que guardarán funciones "callback" */
  public onResult: (text: string) => void = () => {}; //Cuando el navegador transcriba una frase, ejecutamos esta función pasándole el texto"
  public onError: (error: string) => void = () => {}; //SI el navegador falla, ejecutaremos esta función pasándole el texto del error

  constructor() {//se ejecuta al instanciar la clase
    if (typeof window !== 'undefined') { //verifica que el código se esté ejecutando en el navegador y no en el servidor de Next.js
      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition;//Busca la API nativa

      if (SpeechRecognitionAPI) {
        this.isSupported = true;
        this.recognition = new SpeechRecognitionAPI();
        this.configure();
      }
    }
  }
/**Configuración interna */
  private configure(): void {
    if (!this.recognition) return;

    this.recognition.continuous = true;//le ordena al navegador que no apague el micrófono apenas el usuario hace una pausa al hablar
    this.recognition.interimResults = true;//le pide al navegador que envíe resultados parciales en tiempo real mientras la persona habla, sin esperar que termine la frase
    this.recognition.lang = 'es-AR';//dialecto establecido

/** 
 * 1. Crea un string vacío currentTranscript.
 * 2. Recorre la lista de palabras/frases que detectó el micrófono (event.results).
 * 3. Une todos los fragmentos en una sola cadena de texto.
 * 4. Ejecuta this.onResult(currentTranscript), notificando el texto traducido hacia afuera (hacia el hook/UI).*/
    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        currentTranscript += event.results[i][0].transcript;
      }
      this.onResult(currentTranscript);
    };
/**Si el navegador reporta un error llama al callback pasándole el nombre del error */
    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      this.onError(event.error);
    };
  }
/**Encapsulamiento del encendido
 * 1. Si no hay soporte o no hay instancia, se interrumpe (return).
 * 2. Llama al .start() nativo del navegador para activar el micrófono.
 * 3. Actualiza el estado this.isListening = true.
 * 4. Captura cualquier excepción imprevista dentro del bloque try/catch.
 */
  public start(): void {
    if (!this.recognition || !this.isSupported) return;
    try {
      this.recognition.start();
      this.isListening = true;
    } catch (e) {
      console.error('Error al iniciar WebSpeechEngine:', e);
    }
  }
/**Encapsulamiento del apagado
 * 1. Llama al .stop() nativo del navegador.
 * 2. Actualiza el estado this.isListening = false.
 */
  public stop(): void {
    if (!this.recognition || !this.isSupported) return;
    try {
      this.recognition.stop();
      this.isListening = false;
    } catch (e) {
      console.error('Error al detener WebSpeechEngine:', e);
    }
  }
}