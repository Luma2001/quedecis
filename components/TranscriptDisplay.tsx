'use client';

// Definimos qué datos necesita recibir este componente desde el padre
interface TranscriptDisplayProps {
  transcript: string;
  fontSize?: number; // Tamaño de fuente opcional, por defecto será 3xl
  isLightMode: boolean;
}

export default function TranscriptDisplay({ transcript, fontSize, isLightMode }: TranscriptDisplayProps) {
  return (
    <section className={`flex-1 min-h-45 w-full p-6 flex flex-col justify-center items-center text-center  border-b border-slate-800 overflow-y-auto ${
      isLightMode ? 'bg-slate-100 text-slate-900' : 'bg-slate-800/50 text-white'
    }`}>
      <p 
        className={`font-bold max-w-md leading-relaxed  transition-all duration-150 ${
          isLightMode ? 'text-slate-900' : 'text-teal-400'
        }`} 
        style={{ fontSize: `${fontSize}px` }}>
        {transcript}
      </p>
    </section>
  );
}