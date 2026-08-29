import { Mic, Volume2, Bookmark, EyeOff, Smartphone, Download, Sliders } from "lucide-react";

export default function Features() {
  const list = [
    {
      title: "Voz a Texto en tiempo real",
      desc: "Escuchá lo que el oyente habla. La aplicación captura el audio local mediante Web Speech API (modo Online) o mediante el motor Vosk WASM (modo Offline sin internet), mostrando las palabras al instante en la pantalla con letras gigantes y contraste optimizado.",
      icon: Mic,
      colorClass: "teal", 
    },
    {
      title: "Texto a Voz instantáneo",
      desc: "Respondé con seguridad. Escribí lo que querés decir y el motor de SpeechSynthesis lo reproducirá en voz alta para que la otra persona te comprenda perfectamente.",
      icon: Volume2,
      colorClass: "amber",
    },
    {
      title: "Frases rápidas personalizables",
      desc: "Guardá diálogos habituales para el médico, el banco o las compras. Tocá un solo botón e interactuá en un segundo sin tener que volver a digitar líneas largas.",
      icon: Bookmark,
      colorClass: "teal",
    },
    {
      title: "Modo privado local",
      desc: "Tu voz es de tu propiedad. Garantizamos privacidad de datos absoluta: el reconocimiento de voz ocurre enteramente en tu celular, sin servidores externos grabando tus conversaciones.",
      icon: EyeOff,
      colorClass: "emerald",
    },
    {
      title: "Diseñado para una sola mano",
      desc: "Ergonomía real. Los botones importantes y la entrada de micrófono están posicionados en el tercio inferior de la pantalla, permitiéndote operar el teléfono cómodamente con un solo pulgar.",
      icon: Smartphone,
      colorClass: "teal",
    },
    {
      title: "Instalable como aplicación (PWA)",
      desc: "Agregalo a tu pantalla de inicio con un clic para tener acceso directo instantáneo sin instalar tiendas pesadas en tu teléfono iOS o Android.",
      icon: Download,
      colorClass: "cyan",
    },
  ];

  // Paleta con alto contraste WCAG AA sobre fondos oscuros (#0B1020 / #1E293B)
  const colorMap: Record<string, { bg: string; text: string }> = {
    teal: { bg: "bg-teal-950 border border-teal-500/30", text: "text-teal-300" },
    amber: { bg: "bg-amber-950 border border-amber-500/30", text: "text-amber-300" },
    emerald: { bg: "bg-emerald-950 border border-emerald-500/30", text: "text-emerald-300" },
    cyan: { bg: "bg-cyan-950 border border-cyan-500/30", text: "text-cyan-300" },
  };

  return (
    <section
      id="features"
      className="py-12 md:py-16 bg-slate-900/90 border border-slate-800 scroll-mt-12 text-slate-100 rounded-3xl shadow-xl transition-all duration-300 a11y-contrast:bg-black a11y-contrast:border-2 a11y-contrast:border-white" 
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center space-x-2 text-teal-400 a11y-contrast:text-yellow-400">
            <Sliders className="w-5 h-5 fill-current opacity-80 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">
              Características Clave
            </span>
          </div>
          <h2
            id="features-heading"
            className="text-3xl pt-4 sm:text-4xl font-extrabold tracking-tight text-white leading-tight a11y-contrast:text-white"
          >
            Diseñada especialmente para{' '}
            <span className="text-teal-400 a11y-contrast:text-yellow-400">
              comunicar en el día a día
            </span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 a11y-contrast:text-slate-100 font-sans">
            Cada detalle de nuestra aplicación ha sido pensado para resolver los desafíos físicos y de lectura en entornos ruidosos o de atención pública apurada.
          </p>
        </div>

        {/* Bento Grid de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {list.map((item, idx) => {
            const IconComponent = item.icon;
            const styles = colorMap[item.colorClass] || colorMap.teal;
            return (
              <div
                key={idx}
                className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 shadow-md transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between group a11y-contrast:bg-black a11y-contrast:border-2 a11y-contrast:border-white"
              >
                <div className="space-y-4">
                  {/* Contenedor del Icono */}
                  <div
                    className={`w-12 h-12 rounded-xl ${styles.bg} ${styles.text} flex items-center justify-center transition-transform group-hover:scale-105 a11y-contrast:bg-black a11y-contrast:text-yellow-400 a11y-contrast:border-2 a11y-contrast:border-yellow-400`}
                  >
                    <IconComponent className="w-6 h-6" strokeWidth={2.5} aria-hidden="true" />
                  </div>
                  
                  {/* Título de la Tarjeta */}
                  <h3 className="text-xl font-bold tracking-tight text-white a11y-contrast:text-yellow-400">
                    {item.title}
                  </h3>
                  
                  {/* Descripción */}
                  <p className="text-sm sm:text-base text-slate-300 a11y-contrast:text-slate-100 leading-relaxed font-sans">
                    {item.desc}
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