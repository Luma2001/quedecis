'use client';

// Definimos qué datos necesita recibir este componente desde el padre
interface TranscriptDisplayProps {
  transcript: string;
  fontSize?: number; // Tamaño de fuente opcional, por defecto será 3xl
}

export default function TranscriptDisplay({ transcript, fontSize }: TranscriptDisplayProps) {
  return (
    <section aria-labelledby="área-de-transcripción-voz" className="flex-1 min-h-45 w-full p-6 flex flex-col justify-center items-center text-center bg-input border-b border-panel-border overflow-y-auto transition-all duration-300">
      <p 
        className="font-bold max-w-md leading-relaxed text-text-primary transition-all duration-300" 
        style={{ fontSize: fontSize ? `${fontSize}px` :  '1.875rem' }}>
        {transcript}
      </p>
    </section>
  );
}