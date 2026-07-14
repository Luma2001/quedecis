'use client';

import Manual from '@/components/Manual';
import Features from '@/components/Features';
import FeedbackForm from "@/components/FeedbackForm";
import Purpose from "@/components/Purpose";
import Herosection from "@/components/Herosection";
import Header from "@/components/Header";
import BackgroundImage from "@/components/BackgroundImage";
import Footer from "@/components/Footer";


export default function LandingPage() {


  return (
    <div className="min-h-screen w-full text-text-main flex flex-col justify-between font-sans selection:bg-teal-500 selection:text-slate-900 transition-colors duration-300">

      {/* Imagen de Fondo */}
      <BackgroundImage />

      {/* 1. HEADER / IDENTIDAD */}
      <Header />

      {/* 2. CONTENIDO PRINCIPAL COMPLETO */}
      <main className="w-full max-w-4xl mx-auto px-6 py-12 space-y-16 flex-1 pb-32 sm:pb-12">
        
        {/* SECCIÓN HERO: TÍTULO Y LLAMADO A LA ACCIÓN */}
        <Herosection />

        {/* SECCIÓN 1: LA RAZÓN DEL PROYECTO (PROPÓSITO) */}
        <Purpose/>

        {/* SECCIÓN 2: CARACTERÍSTICAS CLAVES */}
        <Features />

        {/* SECCIÓN 3: CÓMO SE USA (GUÍA RÁPIDA) */}
        <Manual />
        
        {/* SECCIÓN 4: FORMULARIO DE FEEDBACK / CONTACTO */}
        <FeedbackForm />
      </main>


      {/* 3. FOOTER / AUTORÍA */}
      <Footer />

    </div>
  );
}



