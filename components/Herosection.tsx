import PWARegistrationCounter from './PWARegistrationCounter'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Herosection = () => {
  return (
    <section 
      id="hero" 
      aria-labelledby="hero-title" 
      className="text-center space-y-6 max-w-2xl mx-auto pt-16 text-slate-100 transition-colors duration-300"
    >
      {/* Título Principal Semántico */}
      <h2 
        id="hero-title" 
        className="text-4xl mt-10 sm:text-6xl font-black tracking-tight leading-tight text-white a11y-contrast:text-white"
      >
        Comunicación sin barreras en{' '}
        <span className="text-teal-400 a11y-contrast:text-yellow-400 transition-colors duration-300">
          mostradores públicos
        </span>
      </h2>

      {/* Descripción con contraste WCAG AA */}
      <p className="text-lg text-slate-300 a11y-contrast:text-slate-100 leading-relaxed font-sans transition-colors duration-300">
        Una solución tecnológica diseñada para agilizar y humanizar la atención de personas con discapacidad auditiva o del habla en entornos de atención al público.
      </p>

      {/* Contador PWA */}
      <div className="py-2">
        <PWARegistrationCounter />
      </div>

      {/* Contenedor del Botón Adaptable / Flotante */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 z-30 sm:relative sm:bottom-auto sm:left-auto sm:p-0 sm:bg-transparent sm:backdrop-blur-none sm:border-none sm:z-auto sm:mt-8 max-w-md mx-auto transition-all duration-300 a11y-contrast:bg-black a11y-contrast:border-t-2 a11y-contrast:border-white">
        <Link 
          href="/app-core"
          className="group w-full bg-linear-to-r from-teal-400 to-emerald-400 text-slate-950 font-black py-4 px-6 rounded-2xl shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 text-base cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 a11y-contrast:bg-yellow-400 a11y-contrast:text-black a11y-contrast:border-2 a11y-contrast:border-white"
        >
          <span className="text-lg">Ingresar a la Aplicación</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
        </Link>
      </div>   
    </section>
  )
}

export default Herosection