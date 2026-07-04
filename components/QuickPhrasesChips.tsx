'use client';

import React, { useState } from 'react';
import { PhraseCategory, QuickPhrase } from '@/data/phrases.data';

interface QuickPhrasesChipsProps {
  //recibimos el array completo de categorías
  categories: PhraseCategory[];
  onSelectPhrase: (phrase: QuickPhrase) => void;
  onOpenSettings: () => void;
  isLightMode: boolean;
}

export default function QuickPhrasesChips({ categories, onSelectPhrase, onOpenSettings, isLightMode }: QuickPhrasesChipsProps) {
  // Estado para controlar qué categoría está seleccionada (arranca con la primera)
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');

  // Buscamos las frases que corresponden a la categoría activa
  const currentCategory = categories.find(cat => cat.id === activeCategory);

  return (
    <section className="flex-1 p-4 bg-slate-900/40 flex flex-col space-y-3 overflow-hidden">
      
      {/* NAV DE PESTAÑAS (CATEGORÍAS) */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 shrink-0">
        <div className="flex space-x-2 overflow-x-auto scrollbar-none mr-2">
          {categories.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive ? 'bg-teal-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {/* BOTÓN DE ENGRANAJE PARA ABRIR EL MODAL */}
        <button
          onClick={onOpenSettings}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded-lg text-xs border border-slate-700 shrink-0 transition-colors"
          title="Administrar Frases"
        >
          ⚙️
        </button>
      </div>

      {/*CONTENEDOR FRASES DE LA CATEGORÍA ACTIVA*/}

      <div className="w-full flex items-center justify-center py-1 flex-1 min-h-0">

        <div className="w-full flex flex-row flex-nowrap gap-2 overflow-x-auto scrollbar-none py-1.5 px-4 items-center justify-start md:justify-center">
          {currentCategory && currentCategory.phrases.length > 0 ? (
            currentCategory.phrases.map((phrase) => (
              <button
                key={phrase.id}
                onClick={() => onSelectPhrase(phrase)}

                className={`shrink-0 whitespace-nowrap px-4 py-1.5 rounded-xl text-xs font-semibold border shadow-sm transition-all text-center active:scale-95 ${
                  isLightMode 
                    ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300' 
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-750'
                }`}
                title={phrase.textToSpeak}
              >
                {phrase.label}
              </button>
            ))
          ) : (
            <p className="text-xs text-slate-500 italic p-2 w-full text-center">No hay frases en esta categoría.</p>
          )}
        </div>
      </div>

    </section>
  );
}