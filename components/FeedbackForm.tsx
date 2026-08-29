'use client';

import React, { useState, useRef } from 'react';

export default function FeedbackForm() {
  const [profileType, setProfileType] = useState<'usuario' | 'profesional'>('usuario');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL;
    if (!formUrl) {
      console.error('Falta la variable de entorno NEXT_PUBLIC_FORMSPREE_URL');
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setIsSuccess(true);
        formRef.current?.reset();
      } else {
        alert('Hubo un problema al enviar el formulario. Por favor, reintentá.');
      }
    } catch (error) {
      console.error('Error al enviar el feedback:', error);
      alert('Error de conexión. Intentálo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="feedback"
      aria-labelledby="feedback-title"
      className="w-full max-w-2xl mx-auto p-6 md:p-8 bg-slate-900/90 border border-slate-800 rounded-3xl backdrop-blur-sm transition-all duration-300 a11y-contrast:bg-black a11y-contrast:border-2 a11y-contrast:border-white shadow-xl"
    >
      <div className="text-center mb-8">
        <h3 id="feedback-title" className="text-2xl font-bold text-slate-100 a11y-contrast:text-white">
          🗣️ Tu opinión hace la diferencia
        </h3>
        <p className="text-base text-slate-300 mt-2 max-w-md mx-auto leading-relaxed a11y-contrast:text-slate-100">
          Queremos que esta herramienta sea lo más útil y cómoda posible. Contanos tu experiencia para ayudarnos a seguir mejorando.
        </p>
      </div>

      {/* Selector de perfil adaptativo con roles ARIA accesibles */}
      <div
        role="group"
        aria-label="Tipo de perfil de feedback"
        className="flex bg-slate-950 p-1.5 rounded-xl mb-8 max-w-sm mx-auto border border-slate-800 a11y-contrast:bg-black a11y-contrast:border-2 a11y-contrast:border-white"
      >
        <button
          type="button"
          disabled={isSubmitting}
          aria-pressed={profileType === 'usuario'}
          onClick={() => {
            setProfileType('usuario');
            setIsSuccess(false);
          }}
          className={`flex-1 py-2.5 px-3 text-xs md:text-sm font-bold rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            profileType === 'usuario'
              ? 'bg-teal-400 text-slate-950 shadow-md font-black a11y-contrast:bg-yellow-400 a11y-contrast:text-black'
              : 'text-slate-400 hover:text-slate-200 a11y-contrast:text-white'
          }`}
        >
          Soy Usuario
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          aria-pressed={profileType === 'profesional'}
          onClick={() => {
            setProfileType('profesional');
            setIsSuccess(false);
          }}
          className={`flex-1 py-2.5 px-3 text-xs md:text-sm font-bold rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            profileType === 'profesional'
              ? 'bg-teal-400 text-slate-950 shadow-md font-black a11y-contrast:bg-yellow-400 a11y-contrast:text-black'
              : 'text-slate-400 hover:text-slate-200 a11y-contrast:text-white'
          }`}
        >
          Soy Profesional / Agente
        </button>
      </div>

      {/* Mensaje de éxito con región en vivo accesible */}
      {isSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-center a11y-contrast:bg-black a11y-contrast:border-2 a11y-contrast:border-yellow-400"
        >
          <p className="text-sm font-bold text-emerald-300 a11y-contrast:text-yellow-400">
            ✨ ¡Muchas gracias! Tu opinión fue enviada con éxito.
          </p>
        </div>
      )}

      {/* Formulario */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 text-left">
        <input type="hidden" name="perfil" value={profileType} />

        {/* Nombre / Institución */}
        <div>
          <label
            htmlFor="feedback-name"
            className="block text-xs font-bold uppercase tracking-wider mb-2 font-mono text-teal-300 a11y-contrast:text-yellow-400"
          >
            {profileType === 'usuario' ? 'Tu Nombre' : 'Nombre o Institución'}
          </label>
          <input
            id="feedback-name"
            type="text"
            name="name"
            disabled={isSubmitting}
            placeholder={profileType === 'usuario' ? 'Ej. Lucía' : 'Ej. Hospital Notti, Escuela N°...'}
            className="w-full bg-slate-950 text-white placeholder:text-slate-400 border border-slate-700 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 p-3.5 rounded-xl text-sm outline-none transition-all disabled:opacity-50 a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:placeholder:text-slate-300 a11y-contrast:border-2 a11y-contrast:border-white a11y-contrast:focus:border-yellow-400"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="feedback-email"
            className="block text-xs font-bold uppercase tracking-wider mb-2 font-mono text-teal-300 a11y-contrast:text-yellow-400"
          >
            Tu Email <span className="text-slate-400 font-normal normal-case a11y-contrast:text-slate-300">(Opcional)</span>
          </label>
          <input
            id="feedback-email"
            type="email"
            name="email"
            disabled={isSubmitting}
            placeholder="Ej. usuario@email.com (si querés que te respondamos)"
            className="w-full bg-slate-950 text-white placeholder:text-slate-400 border border-slate-700 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 p-3.5 rounded-xl text-sm outline-none transition-all disabled:opacity-50 a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:placeholder:text-slate-300 a11y-contrast:border-2 a11y-contrast:border-white a11y-contrast:focus:border-yellow-400"
          />
        </div>

        {/* Mensaje */}
        <div>
          <label
            htmlFor="feedback-message"
            className="block text-xs font-bold uppercase tracking-wider mb-2 font-mono text-teal-300 a11y-contrast:text-yellow-400"
          >
            {profileType === 'usuario' ? '¿Cómo fue tu experiencia usando la app?' : 'Tu Opinión o Sugerencia Técnica'}
          </label>
          <textarea
            id="feedback-message"
            name="message"
            rows={4}
            required
            disabled={isSubmitting}
            placeholder={
              profileType === 'usuario'
                ? 'Contanos si te resultó fácil hablar con el mostrador, qué te gustó o qué te costó usar...'
                : '¿Qué mejoras sugerís para optimizar la dinámica de atención y la accesibilidad técnica?...'
            }
            className="w-full bg-slate-950 text-white placeholder:text-slate-400 border border-slate-700 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 p-3.5 rounded-xl text-sm outline-none transition-all resize-none disabled:opacity-50 a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:placeholder:text-slate-300 a11y-contrast:border-2 a11y-contrast:border-white a11y-contrast:focus:border-yellow-400"
          />
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-linear-to-r from-teal-400 to-emerald-400 text-slate-950 font-black py-4 rounded-xl text-base transition-all shadow-lg hover:shadow-teal-500/20 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400 a11y-contrast:bg-yellow-400 a11y-contrast:text-black a11y-contrast:border-2 a11y-contrast:border-white"
        >
          <span>{isSubmitting ? 'Enviando...' : 'Enviar mi opinión'}</span>
        </button>
      </form>
    </section>
  );
}