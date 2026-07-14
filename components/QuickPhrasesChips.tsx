'use client';

import React, { useState } from 'react';
import { PhraseCategory, QuickPhrase } from '@/data/phrases.data';

interface QuickPhrasesChipsProps {
  //recibimos el array completo de categorías
  categories: PhraseCategory[];
  onSelectPhrase: (phrase: QuickPhrase) => void;
  onOpenSettings: () => void;
}

export default function QuickPhrasesChips({ categories, onSelectPhrase, onOpenSettings }: QuickPhrasesChipsProps) {
  // Estado para controlar qué categoría está seleccionada (arranca con la primera)
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');

  // Buscamos las frases que corresponden a la categoría activa
  const currentCategory = categories.find(cat => cat.id === activeCategory);

  return (
    <section className="flex-1 p-4 bg-card-bg flex flex-col space-y-3 overflow-hidden transition-colors duration-300">
      
      {/* NAV DE PESTAÑAS (CATEGORÍAS) */}
      <div className="flex items-center justify-between border-b border-panel-border pb-2 shrink-0 transition-colors duration-300">
        <div className="flex space-x-2 overflow-x-auto scrollbar-none mr-2">
          {categories.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1.5 rounded-lg text-md font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'bg-teal-500 text-slate-950 shadow-md' 
                    : 'bg-input text-text-primary hover:text-text-mute'
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {/* BOTÓN DE ENGRANAJE ADAPTATIVO PARA ABRIR EL MODAL */}
        <button
          onClick={onOpenSettings}
          className="bg-input hover:bg-teal-500/10 text-text-muted p-1.5 rounded-lg text-xs border border-input-border shrink-0 transition-all cursor-pointer"
          title="Administrar Frases"
        >
          ⚙️
        </button>
      </div>

      {/*CONTENEDOR FRASES DE LA CATEGORÍA ACTIVA*/}

      <div className="w-full flex items-center justify-center py-1 flex-1 min-h-0">

        <div className="w-full flex flex-row flex-nowrap gap-2 overflow-x-auto scrollbar-none py-1.5 px-4 items-center justify-start sm:justify-center">
          {currentCategory && currentCategory.phrases.length > 0 ? (
            currentCategory.phrases.map((phrase) => (
              <button
                key={phrase.id}
                onClick={() => onSelectPhrase(phrase)}

                className="shrink-0 whitespace-nowrap px-4 py-1.5 rounded-xl text-lg font-semibold bg-input hover:bg-teal-500/10 text-text-primary border border-input-border shadow-sm transition-all text-center active:scale-95 cursor-pointer"
                title={phrase.textToSpeak}
              >
                {phrase.label}
              </button>
            ))
          ) : (
            <p className="text-md text-text-muted italic p-2 w-full text-center transition-colors duration-300">No hay frases en esta categoría.</p>
          )}
        </div>
      </div>

    </section>
  );
}