import React from 'react';
import { Heart } from 'lucide-react';

const Purpose = () => {
  return (
    <section 
      id="purpose" 
      aria-labelledby="purpose-title" 
      className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg backdrop-blur-sm transition-all duration-300 a11y-contrast:bg-black a11y-contrast:border-2 a11y-contrast:border-white"
    >
      {/* Indicador de Sección */}
      <div className="flex items-center space-x-2 text-teal-400 a11y-contrast:text-yellow-400 transition-colors duration-300">
        <Heart className="w-5 h-5 fill-current opacity-70 animate-pulse" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-wider font-mono">
          El Propósito
        </span>
      </div>

      {/* Título de Sección Accesible */}
      <h3 
        id="purpose-title" 
        className="text-2xl font-bold text-white a11y-contrast:text-white transition-colors duration-300"
      >
        Por qué creamos &quot;¿Qué decís?&quot;
      </h3>

      {/* Cuerpo descriptivo */}
      <p className="text-base sm:text-lg text-slate-300 a11y-contrast:text-slate-100 leading-relaxed font-sans transition-colors duration-300">
        En los mostradores de atención ciudadana, de salud o comerciales, las personas sordas o con dificultades en el habla suelen enfrentar situaciones de frustración debido a las barreras del entorno. Este MVP nace bajo la premisa del <strong className="text-white a11y-contrast:text-yellow-400 font-bold">diseño universal</strong>: ofrecer un canal alternativo inmediato que transforma el dictado del administrativo en subtítulos gigantes y el texto del usuario en voz audible, garantizando autonomía, privacidad y un trato digno.
      </p>
    </section>
  );
};

export default Purpose;