'use client';

import React, { useState, useRef } from 'react';

export default function FeedbackForm() {
  const [profileType, setProfileType] = useState<'usuario' | 'profesional'>('usuario');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Usamos una referencia para poder resetear el formulario fácilmente
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evitamos que la página se recargue
    
    const formUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL;
    if (!formUrl) {
      console.error("Falta la variable de entorno NEXT_PUBLIC_FORMSPREE_URL");
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);

    // Capturamos los datos del formulario de forma nativa
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSuccess(true);
        formRef.current?.reset(); // 🔥 ¡Acá vaciamos por completo todos los inputs!
      } else {
        alert("Hubo un problema al enviar el formulario. Por favor, reintentá.");
      }
    } catch (error) {
      console.error("Error al enviar el feedback:", error);
      alert("Error de conexión. Intentálo nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="feedback" className="w-full max-w-2xl mx-auto p-6 bg-slate-900/30 border border-slate-800/80 rounded-3xl backdrop-blur-sm">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-slate-100">🗣️ Tu opinión hace la diferencia</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto leading-relaxed">
          Queremos que esta herramienta sea lo más útil y cómoda posible. Contanos tu experiencia para ayudarnos a seguir mejorando.
        </p>
      </div>

      {/* Selector de perfil */}
      <div className="flex bg-slate-950 p-1 rounded-xl mb-6 max-w-sm mx-auto border border-slate-800/60">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => { setProfileType('usuario'); setIsSuccess(false); }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            profileType === 'usuario'
              ? 'bg-linear-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200 disabled:opacity-50'
          }`}
        >
          Soy Usuario
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => { setProfileType('profesional'); setIsSuccess(false); }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            profileType === 'profesional'
              ? 'bg-linear-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200 disabled:opacity-50'
          }`}
        >
          Soy Profesional / Agente
        </button>
      </div>

      {/* Mensaje de éxito animado */}
      {isSuccess && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
          <p className="text-sm font-bold text-emerald-400">✨ ¡Muchas gracias! Tu opinión fue enviada con éxito.</p>
        </div>
      )}

      {/* Formulario controlado */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 text-left">
        <input type="hidden" name="perfil" value={profileType} />

        <div>
          <label className="block text-[10px] font-bold text-teal-400 uppercase tracking-wider mb-1.5 font-mono">
            {profileType === 'usuario' ? 'Tu Nombre (Opcional)' : 'Nombre o Institución'}
          </label>
          <input 
            type="text" 
            name="name" 
            disabled={isSubmitting}
            placeholder={profileType === 'usuario' ? 'Ej. Lucía' : 'Ej. Hospital Notti, Escuela N°...'}
            className="w-full bg-slate-950/60 border border-slate-800 focus:border-teal-500/50 p-3 rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-teal-400 uppercase tracking-wider mb-1.5 font-mono">
            {profileType === 'usuario' ? '¿Cómo fue tu experiencia usando la app?' : 'Tu Opinión o Sugerencia Técnica'}
          </label>
          <textarea 
            name="message" 
            rows={4}
            required
            disabled={isSubmitting}
            placeholder={
              profileType === 'usuario' 
                ? 'Contanos si te resultó fácil hablar con el mostrador, qué te gustó o qué te costó usar...'
                : '¿Qué mejoras sugerís para optimizar la dinámica de atención y la accesibilidad técnica?...'
            }
            className="w-full bg-slate-950/60 border border-slate-800 focus:border-teal-500/50 p-3 rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors resize-none disabled:opacity-50"
          />
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-linear-to-r from-teal-500 to-emerald-500 text-slate-950 font-black py-3.5 rounded-xl text-sm transition-all shadow-md shadow-teal-500/10 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <span>{isSubmitting ? 'Enviando...' : 'Enviar mi opinión'}</span>
        </button>
      </form>
    </section>
  );
}


