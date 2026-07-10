import { MessageSquare,  AlertCircle, Heart } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800 pt-16 pb-8" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Pie de página</h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-12">
          
          {/* Brand/Product Section */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center p-2 bg-blue-600 rounded-xl text-white">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-white tracking-tight font-display">
                  ¿Qué Decís?
                </span>
                <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest leading-none">
                  Modelamiento Inclusivo
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 font-sans max-w-sm leading-relaxed">
              Herramienta de asistencia auditiva y conversación directa en tiempo real. Hecha con amor y accesible para todas las personas sin distinción física.
            </p>

          </div>

          {/* Quick Links Section */}
          <div className="md:col-span-4 text-left">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-widest mb-4">
              Enlaces de Interés
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <a href="#hero" className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 p-1">
                  Inicio del Sitio
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 p-1">
                  Características Clave
                </a>
              </li>
              <li>
                <a href="#purpose" className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 p-1">
                  Propósito
                </a>
              </li>
              {/* <li>
                <a href="#faq" className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 p-1">
                  Preguntas Comunes (FAQ)
                </a>
              </li> */}
              <li>
                <a href="#feedback" className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 p-1">
                  Tu opinión y Sugerencias
                </a>
              </li>
            </ul>
          </div>
        </div>
                  {/* Legal Compliance Disclaimer */}
          <div className="md:col-span-3 text-left space-y-3">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-widest mb-1">
              Estándares Técnicos y Accesibilidad
            </h3>
            <div className="flex gap-2 items-start text-xs leading-relaxed bg-gray-950/40 p-3.5 border border-gray-800 rounded-2xl text-gray-400 font-sans">
              <AlertCircle className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
              <span>
                Esta Landing Page y su MVP fueron desarrollados bajo los criterios internacionales de accesibilidad <strong>WCAG 2.2 (Nivel AA)</strong>, asegurando un diseño universal, perceptible y operable. La aplicación está estructurada como una PWA (Progressive Web App) instalable en la pantalla de inicio de cualquier smartphone; ofrece una experiencia híbrida con soporte offline para su interfaz gráfica, manuales y catálogo de frases, requiriendo conectividad activa únicamente para el procesamiento del dictado de voz en tiempo real debido a las especificaciones nativas de la Web Speech API.
              </span>
            </div>
          </div>

        {/* Desarrollado por */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col  justify-around items-center text-xs gap-4 text-gray-500 font-semibold font-sans mb-20 space-x-1.5 mx-auto sm:mx-0">
            
                <small>© {currentYear} ¿Qué Decís? — Desarrollado con  
                </small>
                <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
                <small>Por Luma2001.  
                    <a 
                        href="https://lumasworld.netlify.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-semibold text-slate-300 hover:text-teal-400 border-b border-dashed border-slate-600 hover:border-teal-400 transition-all pb-0.5"
                    >
                        <Image
                        width={6}
                        height={6}
                        src="/image/luma.webp"
                        alt="Avatar de Luma"
                        className="mx-auto w-6 h-6 mb-2"
                        title="Luma - Desarrolladora Fullstack"
                        />
                    </a>   
                </small>     
                <small className="text-center">
                    Herramienta de acceso libre para la inclusión social. Conectando personas, derribando mostradores.
                </small>
            
        </div>

      </div>
    </footer>
  );
}