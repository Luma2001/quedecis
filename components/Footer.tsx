'use client';

import { AlertCircle, Heart } from "lucide-react";
import Image from "next/image";
import Logo from "./logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-slate-950 border-t border-slate-800 text-slate-300 pt-16 pb-8 transition-colors duration-300 a11y-contrast:bg-black a11y-contrast:border-t-2 a11y-contrast:border-white" 
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Pie de página
      </h2>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-12">
          
          {/* Identidad y Misión */}
          <div className="md:col-span-6 space-y-4 text-left">
            <div className="flex items-center space-x-3"> 
              <Logo />
              <div>
                <span className="text-xl font-black tracking-tight text-white a11y-contrast:text-white">
                  ¿QUÉ DECÍS?
                </span>
                <p className="text-[10px] text-teal-400 a11y-contrast:text-yellow-400 font-bold tracking-widest uppercase font-mono">
                  Asistente Inclusivo
                </p>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-slate-300 a11y-contrast:text-slate-100 font-sans max-w-sm leading-relaxed">
              Herramienta de asistencia auditiva y conversación directa en tiempo real. Hecha con dedicación y accesible para todas las personas sin distinción física.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <nav aria-label="Enlaces de pie de página" className="md:col-span-6 text-left">
            <h3 className="text-xs font-bold text-teal-400 a11y-contrast:text-yellow-400 uppercase tracking-widest mb-4 font-mono">
              Enlaces de Interés
            </h3>
            <ul className="space-y-3 text-sm font-semibold">
              <li>
                <a 
                  href="#hero" 
                  className="text-slate-300 hover:text-teal-300 a11y-contrast:text-white a11y-contrast:hover:text-yellow-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded py-1"
                >
                  Inicio del Sitio
                </a>
              </li>
              <li>
                <a 
                  href="#features" 
                  className="text-slate-300 hover:text-teal-300 a11y-contrast:text-white a11y-contrast:hover:text-yellow-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded py-1"
                >
                  Características Clave
                </a>
              </li>
              <li>
                <a 
                  href="#purpose" 
                  className="text-slate-300 hover:text-teal-300 a11y-contrast:text-white a11y-contrast:hover:text-yellow-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded py-1"
                >
                  Propósito
                </a>
              </li>
              <li>
                <a 
                  href="#feedback" 
                  className="text-slate-300 hover:text-teal-300 a11y-contrast:text-white a11y-contrast:hover:text-yellow-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded py-1"
                >
                  Tu opinión y Sugerencias
                </a>
              </li>
            </ul>
          </nav>

          {/* Declaración de Accesibilidad */}
          <div className="md:col-span-12 text-left space-y-3">
            <h3 className="text-xs font-bold text-teal-400 a11y-contrast:text-yellow-400 uppercase tracking-widest font-mono">
              Estándares Técnicos y Accesibilidad
            </h3>
            <div 
              role="region"
              aria-label="Declaración de estándares técnicos"
              className="flex gap-3 items-start text-xs leading-relaxed bg-slate-900/90 p-4 border border-slate-800 rounded-2xl text-slate-300 a11y-contrast:bg-black a11y-contrast:border-2 a11y-contrast:border-white a11y-contrast:text-slate-100 font-sans shadow-md"
            >
              <AlertCircle className="w-5 h-5 text-teal-400 a11y-contrast:text-yellow-400 mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                Esta Landing Page y su MVP fueron desarrollados bajo los criterios internacionales de accesibilidad <strong className="text-white a11y-contrast:text-yellow-400 font-bold">WCAG 2.2 (Nivel AA)</strong>, asegurando un diseño universal, perceptible y operable. La aplicación está estructurada como una PWA (Progressive Web App) instalable en la pantalla de inicio; ofrece soporte offline para su interfaz gráfica, manuales y catálogo de frases.
              </span>
            </div>
          </div>
        </div>

        {/* Créditos y Autoría */}
        <div className="border-t border-slate-800 a11y-contrast:border-white pt-8 mt-8 flex flex-col justify-around items-center text-xs gap-3 text-slate-400 a11y-contrast:text-slate-200 font-medium font-sans mb-20 sm:mb-8 transition-colors duration-300">
          <div className="flex text-sm items-center gap-1.5 flex-wrap justify-center">
            <span>© {currentYear} ¿Qué Decís? — Desarrollado con</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse shrink-0" aria-hidden="true" />
            <span>por Luciana</span>
            
            <a 
              href="https://lumasworld.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visitar el portafolio de Luciana (se abre en una nueva pestaña)"
              className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-full p-0.5"
            >
              <Image
                width={24}
                height={24}
                src="/image/luma.webp"
                alt="Avatar de Luciana"
                className="w-6 h-6 rounded-full border border-slate-700 hover:scale-110 transition-transform"
              />
            </a>   
          </div>
          
          <small className="text-center text-xs text-slate-400 a11y-contrast:text-slate-300 max-w-md">
            Herramienta de acceso libre para la inclusión social. Conectando personas, derribando mostradores.
          </small>
        </div>

      </div>
    </footer>
  );
}