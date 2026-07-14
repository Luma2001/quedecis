import PWARegistrationCounter from './PWARegistrationCounter'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Herosection = () => {
  return (
        <section id='hero' aria-labelledby="herosection" className="text-center space-y-6 max-w-2xl mx-auto pt-16 text-text-contrast transition-colors duration-300">
          <h2 className="text-4xl mt-10 sm:text-5xl font-black tracking-tight leading-none text-text-contrast">
            Comunicación sin barreras en <span className="text-indicator-text transition-colors duration-300">mostradores públicos</span>
          </h2>
          <p className="text-base text-text-contrast leading-relaxed font-sans transition-colors duration-300">
            Una solución tecnológica diseñada para agilizar y humanizar la atención de personas con discapacidad auditiva o del habla en entornos de atención al público.
          </p>
          <div className="py-4">
            <PWARegistrationCounter />
          </div>
         {/*CONTENEDOR DEL BOTÓN ADAPTABLE / FLOTANTE */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-overlay backdrop-blur-md border-t border-panel-border z-50 sm:relative sm:bottom-auto sm:left-auto sm:p-0 sm:bg-transparent sm:backdrop-blur-none sm:border-none sm:z-auto sm:mt-8 max-w-md mx-auto transition-all duration-300">
            <Link 
              href="/app-core"
              className="group w-full bg-linear-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold py-4 px-6 rounded-2xl shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 text-base animate-fade-in cursor-pointer"
            >
              <span>Ingresar a la Aplicación</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </div>   
        </section>
  )
}

export default Herosection
