'use client';

import Manual from '@/components/Manual';
import Features from '@/components/Features';
import FeedbackForm from '@/components/FeedbackForm';
import Purpose from '@/components/Purpose';
import Herosection from '@/components/Herosection';
import Header from '@/components/Header';
import BackgroundImage from '@/components/BackgroundImage';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full text-foreground flex flex-col justify-between font-sans selection:bg-primary selection:text-primary-foreground transition-colors duration-300">
      {/* Imagen de Fondo decorativa */}
      <BackgroundImage />

      {/* 1. Header / Identidad */}
      <Header />

      {/* 2. Contenedor de Secciones (sin duplicar etiqueta <main>) */}
      <div className="w-full max-w-4xl mx-auto px-6 py-12 space-y-16 flex-1 pb-32 sm:pb-12">
        {/* Sección Hero: Título y Llamado a la Acción */}
        <Herosection />

        {/* Sección 1: Propósito */}
        <Purpose />

        {/* Sección 2: Características Claves */}
        <Features />

        {/* Sección 3: Guía Rápida */}
        <Manual />

        {/* Sección 4: Formulario de Feedback / Contacto */}
        <FeedbackForm />
      </div>

      {/* 3. Footer / Autoría */}
      <Footer />
    </div>
  );
}