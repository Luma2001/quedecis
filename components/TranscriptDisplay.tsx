'use client';

import React from 'react';
import AudioIndicator from '@/components/AudioIndicator';
import MicAlert from '@/components/MicAlert';

interface TranscriptDisplayProps {
  transcript: string;
  isListening: boolean;
  isSpeaking: boolean;
  engineError?: string | null;
  onRetryListening?: () => void | Promise<void>;
  fontSize?: number;
}

export default function TranscriptDisplay({
  transcript,
  isListening,
  isSpeaking,
  engineError,
  onRetryListening,
  fontSize,
}: TranscriptDisplayProps) {
  const hasTranscript = Boolean(transcript.trim());

  return (
    <section
      role="region"
      aria-label="Área de transcripción de conversación"
      aria-live="polite"
      className="flex-1 w-full flex flex-col min-h-0 relative bg-transparent overflow-hidden"
    >
      {/* Barra superior fija para Alertas e Indicador de Voz */}
      <div className="w-full px-4 pt-2 shrink-0 z-20 flex flex-col gap-2 pointer-events-none">
        <div className="pointer-events-auto w-full flex justify-center">
          <AudioIndicator isSpeaking={isSpeaking} />
        </div>

        {engineError && onRetryListening && (
          <div className="pointer-events-auto w-full">
            <MicAlert 
              micPermissionGranted={false} 
              onRetry={async () => {
                await onRetryListening();
              }} 
            />
          </div>
        )}
      </div>

      {/* Contenedor central con scroll accesible y soporte para dislexia */}
      <div className="flex-1 w-full px-5 py-4 overflow-y-auto overflow-x-hidden flex flex-col items-center justify-center min-h-0">
        <p
          className={`font-black leading-normal tracking-tight text-center transition-all duration-200 w-full max-w-sm wrap-break-word ${
            hasTranscript ? 'text-white drop-shadow-md' : 'text-slate-400 italic'
          }`}
          style={{
            fontSize: fontSize ? `${Math.min(fontSize * 1.25, 32)}px` : '1.75rem',
          }}
        >
          {hasTranscript
            ? transcript
            : isListening
            ? 'Escuchando interlocutor...'
            : 'Presioná "TRANSCRIBIR VOZ" para leer lo que dice el interlocutor...'}
        </p>
      </div>
    </section>
  );
}


// 'use client';

// // Definimos qué datos necesita recibir este componente desde el padre
// interface TranscriptDisplayProps {
//   transcript: string;
//   fontSize?: number; // Tamaño de fuente opcional, por defecto será 3xl
// }

// export default function TranscriptDisplay({ transcript, fontSize }: TranscriptDisplayProps) {
//   return (
//     <section aria-labelledby="área-de-transcripción-voz" className="flex-1 min-h-45 w-full p-6 flex flex-col justify-center items-center text-center bg-input border-b border-panel-border overflow-y-auto transition-all duration-300">
//       <p 
//         className="font-bold max-w-md leading-relaxed text-text-primary transition-all duration-300" 
//         style={{ fontSize: fontSize ? `${fontSize}px` :  '1.875rem' }}>
//         {transcript}
//       </p>
//     </section>
//   );
// }