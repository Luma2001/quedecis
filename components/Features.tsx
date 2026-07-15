import { Mic, Volume2, Bookmark, EyeOff, Smartphone, Download, Sliders } from "lucide-react";

export default function Features() {
  const list = [
    {
      title: "Voz a Texto en tiempo real",
      desc: "Escuchá lo que el oyente habla. La aplicación captura el audio local mediante Web Speech API y lo muestra al instante en la pantalla con letras gigantes y contraste optimizado (Nota: Esta funcionalidad requiere conectividad a internet activa).",
      icon: Mic,
      colorClass: "blue", 
    },
    {
      title: "Texto a Voz instantáneo",
      desc: "Respondé con seguridad. Escribí lo que querés decir y el motor de SpeechSynthesis lo reproducirá en voz alta para que la otra persona te comprenda perfectamente.",
      icon: Volume2,
      colorClass: "orange",
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
      colorClass: "purple",
    },
    {
      title: "Diseñado para una sola mano",
      desc: "Ergonomía real. Los botones importantes y la entrada de micrófono están posicionados en el tercio inferior de la pantalla, permitiéndote operar el teléfono cómodamente con un solo pulgar.",
      icon: Smartphone,
      colorClass: "emerald",
    },
    {
      title: "Instalable como aplicación (PWA)",
      desc: "Agregalo a tu pantalla de inicio con un clic para tener acceso directo instantáneo sin instalar tiendas pesadas en tu teléfono iOS o Android.",
      icon: Download,
      colorClass: "indigo",
    },

  ];

  // Objeto de mapeo de estilos dinámicos para mantener limpio el bucle y asegurar buen contraste
  const colorMap: Record<string, { bg: string; text: string }> = {
    blue: { bg: "bg-blue-500/10 dark:bg-blue-500/20 light:bg-blue-100", text: "text-blue-600 dark:text-blue-400" },
    orange: { bg: "bg-orange-500/10 dark:bg-orange-500/20 light:bg-orange-100", text: "text-orange-600 dark:text-orange-400" },
    teal: { bg: "bg-teal-500/10 dark:bg-teal-500/20 light:bg-teal-100", text: "text-teal-600 dark:text-teal-400" },
    purple: { bg: "bg-purple-500/10 dark:bg-purple-500/20 light:bg-purple-100", text: "text-purple-600 dark:text-purple-400" },
    emerald: { bg: "bg-emerald-500/10 dark:bg-emerald-500/20 light:bg-emerald-100", text: "text-emerald-600 dark:text-emerald-400" },
    indigo: { bg: "bg-indigo-500/10 dark:bg-indigo-500/20 light:bg-indigo-100", text: "text-indigo-600 dark:text-indigo-400" },
  };

  return (
    <section
      id="features"
      className="py-16 md:py-24 bg-card-bg border border-card-border scroll-mt-12 text-text-main rounded-3xl transition-all duration-300" 
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex text-center items-center justify-center space-x-2 text-indicator-text">
              <Sliders className="w-5 h-5 fill-current opacity-80 animate-pulse" />
            <h3 className="text-sm font-bold uppercase tracking-wider">Características Clave</h3>
          </div>
          <h2
            id="features-heading"
            className="text-3xl pt-8 sm:text-4xl font-extrabold tracking-tight font-display text-text-primary leading-relaxed">
            Diseñada especialmente para <span className="text-brand-blue">comunicar en el día a día</span>
          </h2>
          <p className="mt-3 text-xl text-text-muted font-sans">
            Cada detalle de nuestra aplicación ha sido pensado para resolver los desafíos físicos y de lectura en entornos ruidosos o de atención pública apurada.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((item, idx) => {
            const IconComponent = item.icon;
            const styles = colorMap[item.colorClass] || colorMap.blue;
            return (
              <div
                key={idx}
                className="bg-panel border border-panel-border shadow-sm hover:shadow-md transition-all duration-300 rounded-3xl p-6 flex flex-col justify-between group">
                <div className="space-y-4">
                  {/* Icon wrap dinámico*/}
                  <div className={`w-12 h-12 rounded-2xl ${styles.bg} ${styles.text} flex items-center justify-center transition-transform group-hover:scale-105`}>
                    <IconComponent className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight text-brand-blue font-display">
                    {item.title}
                  </h3>
                  <p className="text-lg text-text-main leading-relaxed font-sans">
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
