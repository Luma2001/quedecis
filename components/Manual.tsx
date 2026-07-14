'use client';

import { Smartphone, Mic, Eye, Speech, HelpCircle } from "lucide-react";

export default function Manual() {
  const steps = [
    {
      num: "01",
      title: "Abrí la aplicación",
      desc: "No necesitás registrarte ni pagar nada. Simplemente abrí ¿Qué Decís? desde tu navegador o tu pantalla de inicio en un segundo.",
      icon: Smartphone,
      colorClass: "blue",
    },
    {
      num: "02",
      title: "Presioná Escuchar",
      desc: "Dale tu teléfono a la persona oyente o apúntalo en su dirección para que empiece a capturar su voz con el micrófono.",
      icon: Mic,
      colorClass: "emerald",
    },
    {
      num: "03",
      title: "Leé las palabras",
      desc: "La persona oyente habla normalmente y vos leés sus palabras transcriptas en letra gigante en tiempo real.",
      icon: Eye,
      colorClass: "teal",
    },
    {
      num: "04",
      title: "Respondé con voz",
      desc: "Escribí tu respuesta rápidamente o presioná una de tus frases rápidas para que la app la hable fuerte y claro por vos.",
      icon: Speech,
      colorClass: "orange",
    },
  ];

  // Mapa de estilos de paso adaptativo para garantizar un contraste óptimo y evitar encandilamiento
const colorMap: Record<string, string> = {
    blue: "border-blue-500/50 text-blue-500 dark:text-blue-400 bg-slate-900 light:bg-blue-50 light:border-blue-500 light:text-blue-600",
    emerald: "border-emerald-500/50 text-emerald-500 dark:text-emerald-400 bg-slate-900 light:bg-emerald-50 light:border-emerald-500 light:text-emerald-600",
    teal: "border-teal-500/50 text-teal-500 dark:text-teal-400 bg-slate-900 light:bg-teal-50 light:border-teal-500 light:text-teal-600",
    orange: "border-orange-500/50 text-orange-500 dark:text-orange-400 bg-slate-900 light:bg-orange-50 light:border-orange-500 light:text-orange-600",
  };

  return (
    <section
      id="manual"
      className="py-16 md:py-24 bg-card-bg border border-card-border rounded-3xl space-y-2.5 shadow-sm scroll-mt-12 scrollbar-none text-text-main z-0 transition-all duration-300"
      aria-labelledby="manual-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 text-indicator-text transition-colors duration-300">
            <HelpCircle className="w-5 h-5 fill-current opacity-50 animate-pulse" />
            <h3 className="text-sm font-bold uppercase tracking-wider">¿Cómo se usa?</h3>
          </div>  
          <h2
            id="manual-heading"
            className="text-3xl pt-8 sm:text-4xl font-extrabold tracking-tight font-display text-text-primary leading-relaxed transition-colors duration-300"
          >
            ¿Cómo se usa? <span className="text-brand-blue transition-colors duration-300">Aprendelo en 10 segundos</span>
          </h2>
          <p className="mt-3 text-lg text-text-muted leading-relaxed font-sans transition-colors duration-300">
            La interfaz está diseñada de forma ultra-estructurada para evitar la fricción técnica, facilitando la conversación cruzada inmediata entre oyentes y no oyentes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-card-border transition-colors duration-300 z-0"></div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const colorClasses = colorMap[step.colorClass] || colorMap.blue;

            return (
              <div key={idx} className="flex flex-col items-center text-center space-y-4 relative z-10 group">
                
                <div className={`w-20 h-20 rounded-full border-4 ${colorClasses} flex items-center justify-center shadow-md relative z-10 transition-all duration-300 group-hover:scale-110`}>
                  <Icon className="w-8 h-8" />
                  
                  <div className="absolute -top-1.5 -right-1.5 bg-panel-bg border border-panel-border text-text-primary text-[10px] font-extrabold w-6 h-6 rounded-full flex items-center justify-center font-mono transition-colors duration-300 shadow-sm">
                    {step.num}
                  </div>
                </div>

                <div className="space-y-2 max-w-62.5">
                  <h3 className="text-xl font-extrabold font-display text-brand-blue transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-main leading-relaxed font-sans transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}