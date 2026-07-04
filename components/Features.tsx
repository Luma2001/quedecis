import { Mic, Volume2, Bookmark, EyeOff, Smartphone, Download, Sliders } from "lucide-react";

export default function Features() {
  const list = [
    {
      title: "Voz a Texto en tiempo real",
      desc: "Escuchá lo que el oyente habla. La aplicación captura el audio local mediante Web Speech API y lo muestra al instante en la pantalla con letras gigantes y contraste optimizado.",
      icon: Mic,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Texto a Voz instantáneo",
      desc: "Respondé con seguridad. Escribí lo que querés decir y el motor de SpeechSynthesis lo reproducirá en voz alta para que la otra persona te comprenda perfectamente.",
      icon: Volume2,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
    {
      title: "Frases rápidas personalizables",
      desc: "Guardá diálogos habituales para el médico, el banco o las compras. Tocá un solo botón e interactuá en un segundo sin tener que volver a digitar líneas largas.",
      icon: Bookmark,
      bgColor: "bg-teal-100",
      textColor: "text-teal-600",
    },
    {
      title: "Modo privado local",
      desc: "Tu voz es de tu propiedad. Garantizamos privacidad de datos absoluta: el reconocimiento de voz ocurre enteramente en tu celular, sin servidores externos grabando tus conversaciones.",
      icon: EyeOff,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      title: "Diseñado para una sola mano",
      desc: "Ergonomía real. Los botones importantes y la entrada de micrófono están posicionados en el tercio inferior de la pantalla, permitiéndote operar el teléfono cómodamente con un solo pulgar.",
      icon: Smartphone,
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
    },
    {
      title: "Instalable como aplicación (PWA)",
      desc: "Agregalo a tu pantalla de inicio con un clic para tener acceso directo instantáneo offline sin instalar tiendas pesadas en tu teléfono iOS o Android.",
      icon: Download,
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-600",
    },
  ];

  return (
    <section
      className="py-16 md:py-24 bg-slate-900/40  scroll-mt-12 text-gray-900 rounded-2xl" 
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center space-x-2 text-teal-400">
              <Sliders className="w-5 h-5 fill-teal-400/10" />
            <h3 className="text-sm font-bold uppercase tracking-wider">Características Clave</h3>
          </div>
          <h2
            id="features-heading"
            className="text-3xl pt-8 sm:text-4xl font-extrabold tracking-tight font-display text-white leading-relaxed"
          >
            Diseñada especialmente para <span className="text-blue-600">comunicar en el día a día</span>
          </h2>
          <p className="mt-3 text-lg text-slate-400 font-sans">
            Cada detalle de nuestra aplicación ha sido pensado para resolver los desafíos físicos y de lectura en entornos ruidosos o de atención pública apurada.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className=" bg-slate-900/40 border border-slate-800/60  shadow-sm hover:shadow-md transition-shadow duration-200 rounded-3xl p-6 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Icon wrap */}
                  <div className={`w-12 h-12 rounded-2xl ${item.bgColor} ${item.textColor} flex items-center justify-center transition-transform group-hover:scale-105`}>
                    <IconComponent className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight text-teal-400 font-display">
                    {item.title}
                  </h3>
                  <p className="text-base text-white leading-relaxed font-sans">
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
