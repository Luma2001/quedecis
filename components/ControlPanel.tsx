'use client';
//Componente Presentacional: todo lo que necesita para existir se lo pide a su padre "app-core/page.tsx" a través del contrato "interface ControlPanelProps" 
//No tiene estado propio, no tiene lógica de negocio, no tiene side effects, no tiene hooks. Solo recibe props y las muestra en pantalla.

import { SpeechEngineType } from '@/services/speech';

interface ControlPanelProps {
  userResponse: string;
  isListening: boolean;
  isLoading?: boolean;
  engineType: SpeechEngineType;
  onEngineTypeChange: (type: SpeechEngineType) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSpeak: (text: string) => void;
  onToggleListening: () => void;
  voices: SpeechSynthesisVoice[];
  selectedVoiceURI: string;
  onVoiceChange: (uri: string) => void;
  fontSize: number;
  onIncreaseFontSize: () => void;
  onDecreaseFontSize: () => void;
  isLeftHanded: boolean;
  onToggleLateralidad: () => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
}

export default function ControlPanel({
  userResponse,
  isListening,
  isLoading = false,
  engineType,
  onEngineTypeChange,
  onInputChange,
  onSpeak,
  onToggleListening,
  voices,
  selectedVoiceURI,
  onVoiceChange,
  fontSize,
  onIncreaseFontSize,
  onDecreaseFontSize,
  isLeftHanded,
  onToggleLateralidad,
  isLightMode,
  onToggleTheme
}: ControlPanelProps) {
  return (
    <section className="w-full max-w-md mx-auto p-2.5 space-y-2 border-t overflow-y-scroll bg-input-bg border-input-border text-brand-blue transition-colors duration-300">
      
      {/*INPUT PRINCIPAL DE ESCRITURA */}
      <input
        id="input-text"
        type="text"
        value={userResponse}
        onChange={onInputChange}
        onFocus={(e) => e.target.select()}
        placeholder="Escribí tu respuesta acá..."
        className="w-full rounded-xl px-4 py-3 text-base bg-input border-input-border text-text-primary placeholder-text-text-muted focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500/50 transition-all border"
      />

      {/* DISTRIBUCIÓN EN PARALELO CON CONTROL DE DIRECCIÓN (RTL si es zurdo) */}
      {/* Usamos el atributo nativo HTML 'dir' para espejar el flujo del grid completo */}
      <div className="grid grid-cols-12 gap-2" dir={isLeftHanded ? 'rtl' : 'ltr'}>
        
        {/* PANEL DE ACCESIBILIDAD*/}
        {/* Restauramos la dirección a ltr internamente en la cajita para que los botones +- no se inviertan */}
        <div className="col-span-7 p-2.5 rounded-xl border flex flex-col justify-between space-y-2 bg-card-bg border-card-border transition-colors duration-300" dir="ltr">
          
          {/* Fila de controles superiores: Letra y Switch de mano */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <span className="text-[11px] font-bold text-text-secondary uppercase tracking-widest flex items-center gap-1">
                <span className="text-sm">👁️</span><span> Letra:</span></span>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={onDecreaseFontSize}
                  className="w-7 h-7 rounded-lg font-bold text-sm flex justify-center items-center bg-input border-input-border text-text-primary hover:bg-teal-500/10 transition-all active:scale-90 border"
                >
                  A-
                </button>
                <span className="h-7 text-sm font-mono w-11 text-center py-1 rounded bg-input-bg border-input-border text-brand-blue">
                  {fontSize}px
                </span>
                <button 
                  onClick={onIncreaseFontSize}
                  className="w-7 h-7 rounded-lg font-bold text-sm flex justify-center items-center bg-input border-input-border text-text-primary hover:bg-teal-500/10 transition-all active:scale-90 border">
                  A+
                </button>
              </div>
            </div>

            {/* COLUMNA DE BOTONES DE CONFIGURACIÓN DE INTERFAZ */}
            <div className="flex flex-col space-y-1.5 min-w-12.5">
              {/*BOTÓN INTERRUPTOR DE TEMA (SOL / LUNA) */}
              <button
                onClick={onToggleTheme}
                className="p-1 rounded-lg flex flex-col items-center bg-input border-input-border text-text-primary hover:bg-teal-500/10 transition-all active:scale-95 border"
                title={isLightMode ? "Cambiar a Modo Oscuro" : "Cambiar a Modo Claro"}
              >
                <span className="text-md">{isLightMode ? '🌙' : '☀️'}</span>
                <span className="text-[10px] font-bold mt-0.5">{isLightMode ? 'OSCURO' : 'CLARO'}</span>
              </button>
              {/*BOTÓN INTERRUPTOR DE LATERALIDAD */}
              <button
                onClick={onToggleLateralidad}
                className="px-4 py-1 rounded-lg flex flex-col items-center bg-input border-input-border text-text-primary hover:bg-teal-500/10 transition-all active:scale-95 border"
                title={isLeftHanded ? "Cambiar a modo Diestro" : "Cambiar a modo Zurdo"}
              >
                <span className="text-md">{isLeftHanded ? '🫲' : '🫱'}</span>
                <span className="text-[10px] text-text-muted mt-0.5">{isLeftHanded ? 'ZURDO' : 'DIESTRO'}</span>
              </button>
            </div>
          </div>

          {/* Selector de Modo (Online / Offline) */}
          <div className="flex flex-col space-y-1">
            <label className="text-[11px] text-text-secondary font-bold uppercase tracking-widest flex items-center gap-1">
              <span className="text-sm">⚙️</span><span>Modo Voz:</span>
            </label>
            <select
              value={engineType}
              onChange={(e) => onEngineTypeChange(e.target.value as SpeechEngineType)}
              disabled={isListening || isLoading}
              className="w-full text-xs rounded-lg p-1 bg-input border-input-border text-text-primary focus:outline-none focus:ring-1 focus:ring-teal-500 border truncate"
            >
              <option className="bg-panel-bg text-text-main" value="web-speech">Online (Navegador)</option>
              <option className="bg-panel-bg text-text-main" value="offline">Offline (Vosk WASM)</option>
            </select>
          </div>    


          {/* Selector de Voces */}
          {voices.length > 0 && (
            <div className="flex flex-col space-y-1">
              <label className="text-[11px] text-text-secondary font-bold uppercase tracking-widest flex items-center gap-1">
                <span className="text-sm">🗣️</span><span>Voz:</span></label>
              <select
                value={selectedVoiceURI}
                onChange={(e) => onVoiceChange(e.target.value)}
                className="w-full text-xs rounded-lg p-1 bg-input border-input-border text-text-primary focus:outline-none focus:ring-1 focus:ring-teal-500 border truncate">
                {voices.map((voice) => (
                  <option key={voice.voiceURI} value={voice.voiceURI} className="bg-panel-bg text-text-main">
                    {voice.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* COLUMNA DE BOTONES PRINCIPALES (Ocupa 5 de 12 columnas) */}
        {/* Se fuerza 'dir="ltr"' para que los íconos de los botones queden prolijos a la izquierda del texto */}
        <div className="col-span-5 flex flex-col space-y-2" dir="ltr">
          {/* Botón Decir en voz alta */}
          <button
            onClick={() => onSpeak(userResponse)}
            className="flex-1 bg-teal-600 hover:bg-teal-500 active:scale-[0.98] text-white text-lg font-semibold rounded-xl transition-all shadow-md flex flex-col justify-center items-center p-1 text-center"
          >
            <span className="text-lg mb-0.5">🔊</span>
            <span>Decir texto</span>
          </button>

          {/* Botón Escuchar Micrófono */}
          <button
            onClick={onToggleListening}
            disabled={isLoading}
            className={`flex-1 text-lg font-bold rounded-xl transition-all shadow-lg flex flex-col justify-center items-center p-1 text-center ${
              isLoading
                ? 'bg-amber-600 animate-pulse text-white cursor-wait'
                : isListening
                ? 'bg-red-600 hover:bg-red-500 animate-pulse text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <span className="text-xl mb-0.5">
              {isLoading ? '⏳' : isListening ? '🛑' : '🎙️'}
            </span>
            <span>
              {isLoading ? 'Cargando...' : isListening ? 'Detener' : 'Escuchar'}
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
