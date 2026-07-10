import { Smartphone, Mic, Eye, Speech, HelpCircle } from "lucide-react";

export default function Manual() {
    const steps = [
        {
        num: "01",
        title: "Abrí la aplicación",
        desc: "No necesitás registrarte ni pagar nada. Simplemente abrí ¿Qué Decís? desde tu navegador o tu pantalla de inicio en un segundo.",
        icon: Smartphone,
        color: "border-blue-500 text-blue-600 bg-blue-50",
        },
        {
        num: "02",
        title: "Presioná Escuchar",
        desc: "Dale tu teléfono a la persona oyente o apúntalo en su dirección para que empiece a capturar su voz con el micrófono.",
        icon: Mic,
        color: "border-emerald-500 text-emerald-600 bg-emerald-50",
        },
        {
        num: "03",
        title: "Leé las palabras",
        desc: "La persona oyente habla normalmente y vos leés sus palabras transcriptas en letra gigante en tiempo real.",
        icon: Eye,
        color: "border-teal-500 text-teal-600 bg-teal-50",
        },
        {
        num: "04",
        title: "Respondé con voz",
        desc: "Escribí tu respuesta rápidamente o presioná una de tus frases rápidas para que la app la hable fuerte y claro por vos.",
        icon: Speech,
        color: "border-orange-500 text-orange-600 bg-orange-50",
        },
    ];

    return (
    <section
      id="manual"
      className="py-16 md:py-24  bg-slate-900/40  border border-slate-800/60 rounded-2xl space-y-2.5 shadow-sm scroll-mt-12 scrollbar-none text-gray-900 z-0"
      aria-labelledby="manual-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-star space-x-2 text-teal-400">
            <HelpCircle className="w-5 h-5 fill-teal-400/10" />
            <h3 className="text-sm font-bold uppercase tracking-wider">¿Cómo se usa?</h3>
          </div>  
          <h2
            className="text-3xl pt-8 sm:text-4xl font-extrabold tracking-tight font-display text-white"
          >
            ¿Cómo se usa? <span className="text-blue-600">Aprendelo en 10 segundos</span>
          </h2>
          <p className="mt-3 text-lg text-slate-400 leading-relaxed font-sans">
            La interfaz está diseñada de forma ultra-estructurada para evitar la fricción técnica, facilitando la conversación cruzada inmediata entre oyentes y no oyentes.
          </p>
        </section>

        {/* Steps Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-15 left-[10%] right-[10%] h-0.5 bg-gray-100"></div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center space-y-4 relative group z-0">
                
                {/* Step Circle representation */}
                <div className={`w-20 h-20 rounded-full border-4 ${step.color} flex items-center justify-center shadow-md relative z-0 transition-transform group-hover:scale-110`}>
                  <Icon className="w-8 h-8" />
                  
                  {/* Floating Step Badge */}
                  <div className="absolute -top-1.5 -right-1.5 bg-gray-900 text-white text-[10px] font-extrabold w-6 h-6 rounded-full flex items-center justify-center font-mono z-auto">
                    {step.num}
                  </div>
                </div>

                <div className="space-y-2 max-w-62.5">
                  <h3 className="text-xl font-extrabold font-display text-blue-600">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </section>

      </div>
    </section>
  );

}

