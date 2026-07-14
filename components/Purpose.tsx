import React from 'react';
import { Heart } from 'lucide-react';

const Purpose = () => {
  return (
        <section id="purpose" aria-labelledby="propósito" className="bg-card-bg border border-card-border rounded-3xl p-6 sm:p-8 space-y-4 transition-all duration-300">
          <div className="flex items-center space-x-2 text-indicator-text transition-colors duration-300">
            <Heart className="w-5 h-5 fill-current opacity-50 animate-pulse" />
            <h3 className="text-sm font-bold uppercase tracking-wider">El Propósito</h3>
          </div>
          <h4 className="text-xl font-bold text-text-primary transition-colors duration-300">Porqué creamos &quot;¿Qué decís?&quot;</h4>
          <p className="text-sm text-text-main leading-relaxed font-sans transition-colors duration-300">
            En los mostradores de atención ciudadana, de salud o comerciales, las personas sordas o con dificultades en el habla suelen enfrentar situaciones de frustración debido a las barreras del entorno. Este MVP nace bajo la premisa del <strong>diseño universal</strong>: ofrecer un canal alternativo inmediato que transforma el dictado del administrativo en subtítulos gigantes y el texto del usuario en voz audible, garantizando autonomía, privacidad y un trato digno.
          </p>
        </section>
  )
}

export default Purpose
