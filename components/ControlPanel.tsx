'use client';
//Componente Presentacional: todo lo que necesita para existir se lo pide a su padre "app-core/page.tsx" a través del contrato "interface ControlPanelProps" 
//No tiene estado propio, no tiene lógica de negocio, no tiene side effects, no tiene hooks. Solo recibe props y las muestra en pantalla.

interface ControlPanelProps {
  userResponse: string;
  isListening: boolean;
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
    <section className={`w-full max-w-md mx-auto p-4 space-y-3 border-t shrink-0 transition-colors duration-300 ${
      isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800/60'
    }`}>
      
      {/*INPUT PRINCIPAL DE ESCRITURA */}
      <input
        id="input-text"
        type="text"
        value={userResponse}
        onChange={onInputChange}
        onFocus={(e) => e.target.select()}
        placeholder="Escribí tu respuesta acá..."
        className={`w-full rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all border ${
          isLightMode 
            ? 'bg-slate-100 text-slate-900 placeholder-slate-800 border-slate-300' 
            : 'bg-slate-800 text-white placeholder-slate-500 border-slate-700'
        }`}
      />

      {/* DISTRIBUCIÓN EN PARALELO CON CONTROL DE DIRECCIÓN (RTL si es zurdo) */}
      {/* Usamos el atributo nativo HTML 'dir' para espejar el flujo del grid completo */}
      <div className="grid grid-cols-12 gap-3" dir={isLeftHanded ? 'rtl' : 'ltr'}>
        
        {/* PANEL DE ACCESIBILIDAD (Ocupa 7 de 12 columnas) */}
        {/* Restauramos la dirección a ltr internamente en la cajita para que los botones +- no se inviertan */}
        <div className={`col-span-7 p-3 rounded-xl border flex flex-col justify-between space-y-2 transition-colors duration-300 ${
          isLightMode ? 'bg-slate-50 border-slate-700' : 'bg-slate-800/40 border-slate-800/80'
        }`} dir="ltr">
          
          {/* Fila de controles superiores: Letra y Switch de mano */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <span className={`text-[11px] font-bold uppercase tracking-widest flex items-center gap-1 ${
                isLightMode ? 'text-slate-800' : 'text-slate-400'
              }`}><span className="text-sm">👁️</span><span> Letra:</span></span>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={onDecreaseFontSize}
                  className={`w-7 h-7 rounded-lg font-bold text-sm flex justify-center items-center border transition-all active:scale-90 ${
                    isLightMode ? 'bg-white hover:bg-slate-200 text-slate-800 border-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                  }`}
                >
                  A-
                </button>
                <span className={` h-7 text-sm font-mono w-11 text-center py-1 rounded border ${
                  isLightMode ? 'bg-white text-teal-600 border-slate-700' : 'bg-slate-900 text-teal-400 border-slate-800'
                }`}>
                  {fontSize}px
                </span>
                <button 
                  onClick={onIncreaseFontSize}
                  className={`w-7 h-7 rounded-lg font-bold text-sm flex justify-center items-center border transition-all active:scale-90 ${
                    isLightMode ? 'bg-white hover:bg-slate-200 text-slate-800 border-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                  }`}
                >
                  A+
                </button>
              </div>
            </div>

            {/* COLUMNA DE BOTONES DE CONFIGURACIÓN DE INTERFAZ */}
            <div className="flex flex-col space-y-1.5 min-w-12.5">
              {/*BOTÓN INTERRUPTOR DE TEMA (SOL / LUNA) */}
              <button
                onClick={onToggleTheme}
                className={`p-1 rounded-lg flex flex-col items-center border transition-all active:scale-95 ${
                  isLightMode ? 'bg-white hover:bg-slate-200 border-slate-700 text-slate-700' : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-300'
                }`}
                title={isLightMode ? "Cambiar a Modo Oscuro" : "Cambiar a Modo Claro"}
              >
                <span className="text-md">{isLightMode ? '🌙' : '☀️'}</span>
                <span className="text-[10px] font-bold mt-0.5">{isLightMode ? 'OSCURO' : 'CLARO'}</span>
              </button>

              {/*BOTÓN INTERRUPTOR DE LATERALIDAD */}
              <button
                onClick={onToggleLateralidad}
                className={`px-4 py-1 rounded-lg flex flex-col items-center border transition-all active:scale-95 ${
                  isLightMode ? 'bg-white hover:bg-slate-200 border-slate-700 text-slate-700' : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-300'
                }`}
                title={isLeftHanded ? "Cambiar a modo Diestro" : "Cambiar a modo Zurdo"}
              >
                <span className="text-md">{isLeftHanded ? '🫲' : '🫱'}</span>
                <span className="text-[10px] text-slate-400 mt-0.5">{isLeftHanded ? 'ZURDO' : 'DIESTRO'}</span>
              </button>
            </div>
          </div>       
          {/* Selector de Voces */}
          {voices.length > 0 && (
            <div className="flex flex-col space-y-1">
              <label className={`text-[11px] text-slate-300 font-bold uppercase tracking-widest flex items-center gap-1 ${
                 isLightMode ? 'text-slate-800' : 'text-slate-400'
              }
              }`}><span className="text-sm">🗣️</span><span>Voz:</span></label>
              <select
                value={selectedVoiceURI}
                onChange={(e) => onVoiceChange(e.target.value)}
                className={`w-full text-xs rounded-lg p-1 focus:outline-none focus:ring-1 focus:ring-teal-500 border truncate ${
                  isLightMode ? 'bg-white text-slate-800 border-slate-700' : 'bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                {voices.map((voice) => (
                  <option key={voice.voiceURI} value={voice.voiceURI}>
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
            className={`flex-1 text-lg font-bold rounded-xl transition-all shadow-lg flex flex-col justify-center items-center p-1 text-center ${
              isListening
                ? 'bg-red-600 hover:bg-red-500 animate-pulse text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <span className="text-xl mb-0.5">{isListening ? '🛑' : '🎙️'}</span>
            <span>{isListening ? 'Detener' : 'Escuchar'}</span>
          </button>
        </div>

      </div>
    </section>
  );
}
