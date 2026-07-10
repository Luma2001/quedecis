import { Heart } from 'lucide-react';

const Purpose = () => {
  return (
        <section id="purpose" className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2 text-teal-400">
            <Heart className="w-5 h-5 fill-teal-400/10" />
            <h3 className="text-sm font-bold uppercase tracking-wider">El Propósito</h3>
          </div>
          <h4 className="text-xl font-bold">Porqué creamos &quot;¿Qué decís?&quot;</h4>
          <p className="text-sm text-white leading-relaxed">
            En los mostradores de atención ciudadana, de salud o comerciales, las personas sordas o con dificultades en el habla suelen enfrentar situaciones de frustración debido a las barreras del entorno. Este MVP nace bajo la premisa del <strong>diseño universal</strong>: ofrecer un canal alternativo inmediato que transforma el dictado del administrativo en subtítulos gigantes y el texto del usuario en voz audible, garantizando autonomía, privacidad y un trato digno.
          </p>
        </section>
  )
}

export default Purpose
