import { MessageSquare, Volume2, Mic } from "lucide-react";

export default function Logo() {
  return (
    <div 
      aria-hidden="true"
      className="relative flex items-center justify-center w-12 h-12 bg-teal-600 rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-105 shrink-0 a11y-contrast:bg-black a11y-contrast:border-2 a11y-contrast:border-yellow-400 a11y-contrast:text-yellow-400"
    >
      {/* Burbuja base */}
      <MessageSquare className="w-10 h-10 text-white a11y-contrast:text-yellow-400" strokeWidth={2} />

      {/* Íconos internos superpuestos */}
      <div className="absolute inset-0 flex items-center justify-center gap-0.5 pb-1">
        <Volume2 className="w-3.5 h-3.5 text-amber-300 a11y-contrast:text-yellow-400 animate-pulse" />
        <Mic className="w-3.5 h-3.5 text-slate-950 a11y-contrast:text-yellow-400 animate-bounce" />
      </div>
    </div>
  );
}