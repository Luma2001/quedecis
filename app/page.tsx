'use client';

import Image from "next/image";
import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';
import Logo from '@/components/logo';
import Manual from '@/components/Manual';
import Features from '@/components/Features';

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full  text-white flex flex-col justify-between font-sans selection:bg-teal-500 selection:text-slate-900 ">

      {/* Imagen de Fondo */}
      <div className="fixed inset-0 -z-10 h-full w-full">
        <Image
          src="/image/_background.png"
          alt="Fondo de la Landing Page con un patrón abstracto y colores suaves"
          quality={75} // Optimiza el peso de la imagen al 75% sin perder calidad notoria
          fill // Hace que la imagen llene todo el div contenedor
          priority
          className="object-cover object-center" // Equivalente a background-size: cover
        />
        {/* Capa de superposición (Overlay) oscura para dar contraste al texto */}
        <div className="absolute inset-0 bg-gray-800/70 backdrop-blur-none" />
      </div>


      {/* 1. HEADER / IDENTIDAD */}
      <header className="fixed top-0 left-0 right-0 bg-slate-900 w-full max-w-5xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-800/40 z-100">
        <div className="flex items-center space-x-3"> 
          <Logo />
          <div>
            <h1 className="text-xl font-black tracking-tight bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
              ¿QUÉ DECÍS?
            </h1>
            <p className="text-[10px] text-teal-400 font-bold tracking-widest uppercase">Asistente Inclusivo</p>
          </div>
        </div>
        <span className="text-[10px] bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-full font-mono text-slate-400">
          v1.0.0 · MVP PWA Offline
        </span>
      </header>

      {/* 2. CONTENIDO PRINCIPAL COMPLETO */}
      <main className="w-full max-w-4xl mx-auto px-6 py-12 space-y-16 flex-1 pb-32 sm:pb-12">
        
        {/* SECCIÓN HERO: TÍTULO Y LLAMADO A LA ACCIÓN */}
        <section className="text-center space-y-6 max-w-2xl mx-auto pt-16">
          <h2 className="text-4xl mt-10 sm:text-5xl font-black tracking-tight leading-none">
            Comunicación sin barreras en <span className="text-teal-400">mostradores públicos</span>
          </h2>
          <p className="text-base text-white leading-relaxed">
            Una solución tecnológica diseñada para agilizar y humanizar la atención de personas con discapacidad auditiva o del habla en entornos de atención al público.
          </p>
         {/*CONTENEDOR DEL BOTÓN ADAPTABLE / FLOTANTE */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/10 backdrop-blur-md border-t border-slate-800 z-50 sm:relative sm:bottom-auto sm:left-auto sm:p-0 sm:bg-transparent sm:backdrop-blur-none sm:border-none sm:z-auto sm:mt-8 max-w-md mx-auto">
            {/* 
              'fixed bottom-0 left-0 w-full z-50': Lo clava abajo en el celular por encima de todo.
              'bg-slate-900/80 backdrop-blur-md': Le da un fondo traslúcido para que se lea lo que pasa por detrás al escrolear.
              'sm:relative sm:bg-transparent...': En la compu, anula el flotante y lo vuelve a dejar en su lugar centrado original.
            */}
            <Link 
              href="/app-core"
              className="group w-full bg-linear-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold py-4 px-6 rounded-2xl shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 text-base animate-fade-in"
            >
              <span>Ingresar a la Aplicación</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </div>   

          {/* <div className="pt-2 max-w-md mx-auto">
            <Link 
              href="/app-core"
              className="group w-full bg-linear-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold py-4 px-6 rounded-2xl shadow-lg shadow-teal-500/10 hover:shadow-teal-400/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 text-base"
            >
              <span>Ingresar a la Aplicación</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </div> */}
        </section>

        {/* SECCIÓN 1: LA RAZÓN DEL PROYECTO (PROPÓSITO) */}
        <section className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2 text-teal-400">
            <Heart className="w-5 h-5 fill-teal-400/10" />
            <h3 className="text-sm font-bold uppercase tracking-wider">El Propósito</h3>
          </div>
          <h4 className="text-xl font-bold">Porqué creamos &quot;¿Qué decís?&quot;</h4>
          <p className="text-sm text-white leading-relaxed">
            En los mostradores de atención ciudadana, de salud o comerciales, las personas sordas o con dificultades en el habla suelen enfrentar situaciones de frustración debido a las barreras del entorno. Este MVP nace bajo la premisa del <strong>diseño universal</strong>: ofrecer un canal alternativo inmediato que transforma el dictado del administrativo en subtítulos gigantes y el texto del usuario en voz audible, garantizando autonomía, privacidad y un trato digno.
          </p>
        </section>

        {/* SECCIÓN 2: CARACTERÍSTICAS CLAVES */}
        <Features />

        {/* SECCIÓN 3: CÓMO SE USA (GUÍA RÁPIDA) */}
        <Manual />

      </main>

      {/* 3. FOOTER / AUTORÍA */}
      <footer className="w-full max-w-4xl mx-auto px-6 py-6 border-t bg-slate-900 border-slate-800/60 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-white">
        <div className="flex items-center mb-20 space-x-1.5 mx-auto sm:mx-0">
          <span>Desarrollado con</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
          <span>por</span>
          <span className="font-semibold text-white">
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
          </span>
        </div>
      </footer>

    </div>
  );
}