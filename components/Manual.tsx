'use client';

import { Smartphone, Mic, Eye, Speech, HelpCircle, WifiOff } from "lucide-react";

export default function Manual() {
  const steps = [
    {
      num: "01",
      title: "Abrí la aplicación",
      desc: "No necesitás registrarte ni pagar nada. Simplemente abrí ¿Qué Decís? desde tu navegador o tu pantalla de inicio en un segundo.",
      icon: Smartphone,
      colorClass: "teal",
    },
    {
      num: "02",
      title: "Elegí el modo y escuchá",
      desc: "Seleccioná modo Online o modo Offline (sin internet). Apuntá el teléfono a la persona oyente para transcribir su voz con el micrófono.",
      icon: Mic,
      colorClass: "emerald",
    },
    {
      num: "03",
      title: "Leé las palabras",
      desc: "La persona oyente habla normalmente y vos leés sus palabras transcriptas en letra gigante en tiempo real.",
      icon: Eye,
      colorClass: "cyan",
    },
    {
      num: "04",
      title: "Respondé con voz",
      desc: "Escribí tu respuesta rápidamente o presioná una de tus frases rápidas para que la app la hable fuerte y claro por vos.",
      icon: Speech,
      colorClass: "amber",
    },
  ];

  // Paleta optimizada para legibilidad WCAG AA sobre fondos oscuros
  const colorMap: Record<string, { circle: string; text: string }> = {
    teal: {
      circle: "border-teal-400 bg-slate-900 text-teal-300",
      text: "text-teal-300",
    },
    emerald: {
      circle: "border-emerald-400 bg-slate-900 text-emerald-300",
      text: "text-emerald-300",
    },
    cyan: {
      circle: "border-cyan-400 bg-slate-900 text-cyan-300",
      text: "text-cyan-300",
    },
    amber: {
      circle: "border-amber-400 bg-slate-900 text-amber-300",
      text: "text-amber-300",
    },
  };

  return (
    <section
      id="manual"
      className="py-12 md:py-16 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-2.5 shadow-xl scroll-mt-12 text-slate-100 transition-all duration-300 a11y-contrast:bg-black a11y-contrast:border-2 a11y-contrast:border-white"
      aria-labelledby="manual-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center space-x-2 text-teal-400 a11y-contrast:text-yellow-400">
            <HelpCircle className="w-5 h-5 fill-current opacity-70 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">
              ¿Cómo se usa?
            </span>
          </div>  
          <h2
            id="manual-heading"
            className="text-3xl pt-4 sm:text-4xl font-extrabold tracking-tight text-white leading-tight a11y-contrast:text-white"
          >
            ¿Cómo se usa?{' '}
            <span className="text-teal-400 a11y-contrast:text-yellow-400">
              Aprendelo en 10 segundos
            </span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 a11y-contrast:text-slate-100 leading-relaxed font-sans">
            La interfaz está diseñada de forma ultra-estructurada para evitar la fricción técnica, facilitando la conversación cruzada inmediata entre oyentes y no oyentes.
          </p>
        </div>

        {/* Pasos en Cuadrícula */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Línea conectora decorativa */}
          <div 
            className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-slate-800 a11y-contrast:bg-white z-0" 
            aria-hidden="true"
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const style = colorMap[step.colorClass] || colorMap.teal;

            return (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center space-y-4 relative z-10 group"
              >
                {/* Círculo del Paso */}
                <div
                  className={`w-20 h-20 rounded-full border-4 ${style.circle} flex items-center justify-center shadow-lg relative z-10 transition-all duration-300 group-hover:scale-105 a11y-contrast:bg-black a11y-contrast:border-4 a11y-contrast:border-yellow-400 a11y-contrast:text-yellow-400`}
                >
                  <Icon className="w-8 h-8" strokeWidth={2.2} aria-hidden="true" />
                  
                  {/* Badge con el número de paso */}
                  <span 
                    className="absolute -top-1.5 -right-1.5 bg-slate-950 border border-slate-700 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center font-mono shadow-md a11y-contrast:bg-black a11y-contrast:text-yellow-400 a11y-contrast:border-2 a11y-contrast:border-white"
                    aria-label={`Paso ${step.num}`}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Texto del Paso */}
                <div className="space-y-2 max-w-60">
                  <h3 className="text-xl font-bold tracking-tight text-white a11y-contrast:text-yellow-400">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 a11y-contrast:text-slate-100 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner Informativo Offline */}
        <div 
          role="note"
          aria-label="Consejo sobre el modo offline"
          className="mt-12 max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3.5 text-left a11y-contrast:bg-black a11y-contrast:border-2 a11y-contrast:border-yellow-400 shadow-md"
        >
          <WifiOff className="w-6 h-6 text-teal-300 a11y-contrast:text-yellow-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm leading-relaxed text-slate-300 a11y-contrast:text-slate-100">
            <strong className="font-bold text-teal-300 a11y-contrast:text-yellow-400 block mb-1">
              💡 Tip sobre el Modo Offline (Vosk):
            </strong>
            La primera vez que actives el motor <span className="font-semibold text-white a11y-contrast:text-yellow-400">Offline</span>, la aplicación descargará en la memoria de tu dispositivo el paquete de idioma español. Esto puede tardar unos segundos dependiendo de tu conexión, pero solo ocurre una vez. ¡Después funcionará al instante sin internet!
          </div>
        </div>

      </div>
    </section>
  );
}