'use client';

import { AlertCircle, Heart } from "lucide-react";
import Image from "next/image";
import Logo from "./logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    
    <footer className="bg-panel-bg text-text-muted border-t border-panel-border pt-16 pb-8 transition-colors duration-300" aria-labelledby="footer-heading">
      <h2 id="footer-heading" aria-labelledby="Pi-de-página" className="sr-only">Pie de página</h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-12">
          
          <div className="md:col-span-6 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <div className="flex items-center space-x-3"> 
                <Logo />
                <div>
                  <h1 className="text-xl font-black tracking-tight bg-linear-to-r from-text-contrast to-text-muted bg-clip-text">
                    ¿QUÉ DECÍS?
                  </h1>
                  <p className="text-[10px] text-indicator-text font-bold tracking-widest uppercase">Asistente Inclusivo</p>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-text-muted font-sans max-w-sm leading-relaxed">
              Herramienta de asistencia auditiva y conversación directa en tiempo real. Hecha con amor y accesible para todas las personas sin distinción física.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="md:col-span-6 text-left">
            <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-widest mb-4">
              Enlaces de Interés
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <a href="#hero" className="hover:text-brand-blue transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue rounded p-1">
                  Inicio del Sitio
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-brand-blue transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue rounded p-1">
                  Características Clave
                </a>
              </li>
              <li>
                <a href="#purpose" className="hover:text-brand-blue transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue rounded p-1">
                  Propósito
                </a>
              </li>
              <li>
                <a href="#feedback" className="hover:text-brand-blue transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue rounded p-1">
                  Tu opinión y Sugerencias
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Compliance Disclaimer */}
          <div className="md:col-span-12 text-left space-y-3">
            <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-widest mb-1">
              Estándares Técnicos y Accesibilidad
            </h3>
            <div className="flex gap-2 items-start text-xs leading-relaxed bg-card-bg p-3.5 border border-card-border rounded-2xl text-text-muted font-sans transition-all duration-300">
              <AlertCircle className="w-4 h-4 text-indicator-text mt-0.5 shrink-0" />
              <span>
                Esta Landing Page y su MVP fueron desarrollados bajo los criterios internacionales de accesibilidad <strong>WCAG 2.2 (Nivel AA)</strong>, asegurando un diseño universal, perceptible y operable. La aplicación está estructurada como una PWA (Progressive Web App) instalable en la pantalla de inicio; ofrece soporte offline para su interfaz gráfica, manuales y catálogo de frases, requiriendo conectividad únicamente para el dictado de voz debido a especificaciones de la Web Speech API.
              </span>
            </div>
          </div>
        </div>

        {/* Desarrollado por */}
        <div className="border-t border-panel-border pt-8 mt-8 flex flex-col justify-around items-center text-xs gap-4 text-text-muted font-semibold font-sans mb-20 space-x-1.5 mx-auto sm:mx-0 transition-colors duration-300">
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <small>© {currentYear} ¿Qué Decís? — Desarrollado con</small>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse shrink-0" />
            <small>Por Luma2001.</small>
            
            <a 
              href="https://lumasworld.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center focus:outline-none focus:ring-2 focus:ring-brand-blue rounded p-0.5"
            >
              <Image
                width={24}
                height={24}
                src="/image/luma.webp"
                alt="Avatar de Luma"
                className="w-6 h-6 rounded-full border border-card-border hover:scale-110 transition-transform"
                title="Luma - Desarrolladora Fullstack"
              />
            </a>   
          </div>
          
          <small className="text-center max-w-md">
            Herramienta de acceso libre para la inclusión social. Conectando personas, derribando mostradores.
          </small>
        </div>

      </div>
    </footer>
  );
}