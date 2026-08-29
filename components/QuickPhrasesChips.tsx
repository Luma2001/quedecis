'use client';

import React, { useState } from 'react';
import { PhraseCategory, QuickPhrase } from '@/data/phrases.data';
import { Settings } from 'lucide-react';

interface QuickPhrasesChipsProps {
  categories: PhraseCategory[];
  onSelectPhrase: (phrase: QuickPhrase) => void;
  onOpenSettings: () => void;
}

export default function QuickPhrasesChips({
  categories = [],
  onSelectPhrase,
  onOpenSettings,
}: QuickPhrasesChipsProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');
  const currentCategory = categories.find((cat) => cat.id === activeCategory) || categories[0];

  return (
    <section 
      aria-label="Frases rápidas categorizadas"
      className="flex-1 p-2.5 bg-slate-950 flex flex-col space-y-2.5 overflow-visible transition-colors duration-300 a11y-contrast:bg-black"
    >
      {/* 1. NAVEGACIÓN DE PESTAÑAS (CATEGORÍAS) */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 shrink-0 transition-colors duration-300 a11y-contrast:border-white">
        <div 
          role="tablist" 
          aria-label="Categorías de frases" 
          className="flex space-x-2 overflow-x-auto scrollbar-none mr-2 py-0.5"
        >
          {categories.map((category) => {
            const isActive = category.id === (currentCategory?.id || activeCategory);
            return (
              <button
                key={category.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${category.id}`}
                id={`tab-${category.id}`}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3.5 py-1.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
                  isActive 
                    ? 'bg-teal-500 text-slate-950 shadow-md font-black a11y-contrast:bg-yellow-400 a11y-contrast:text-black a11y-contrast:border-2 a11y-contrast:border-white' 
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:border a11y-contrast:border-white'
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {/* 2. BOTÓN DE AJUSTES Y GESTIÓN DE FRASES */}
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label="Gestionar y personalizar frases rápidas"
          className="bg-slate-900 hover:bg-slate-800 text-slate-200 px-3 py-1.5 rounded-xl text-xs border border-slate-800 shrink-0 transition-all cursor-pointer flex items-center space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 a11y-contrast:bg-black a11y-contrast:text-yellow-400 a11y-contrast:border-2 a11y-contrast:border-white"
        >
          <span className="font-mono font-bold text-[11px] leading-tight hidden sm:inline-block">
            Gestionar
          </span>
          <Settings className="w-4 h-4 text-teal-400 a11y-contrast:text-yellow-400" aria-hidden="true" />
        </button>
      </div>

      {/* 3. LISTADO DE FRASES DE LA CATEGORÍA ACTIVA */}
      <div 
        role="tabpanel"
        id={`panel-${currentCategory?.id || 'default'}`}
        aria-labelledby={`tab-${currentCategory?.id || 'default'}`}
        className="w-full flex items-center justify-center py-1 flex-1 min-h-0"
      >
        <div className="w-full flex flex-row flex-nowrap gap-2 overflow-x-auto scrollbar-none py-1.5 px-2 items-center justify-start sm:justify-center">
          {currentCategory && currentCategory.phrases && currentCategory.phrases.length > 0 ? (
            currentCategory.phrases.map((phrase) => (
              <button
                key={phrase.id}
                type="button"
                onClick={() => onSelectPhrase(phrase)}
                aria-label={`Frase: ${phrase.label}. Al presionar reproducirá: ${phrase.textToSpeak}`}
                className="shrink-0 whitespace-nowrap px-4 py-2 rounded-xl text-sm md:text-base font-bold bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 shadow-sm transition-all text-center active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:border-2 a11y-contrast:border-white a11y-contrast:hover:border-yellow-400"
              >
                {phrase.label}
              </button>
            ))
          ) : (
            <p className="text-sm text-slate-400 italic p-2 w-full text-center transition-colors duration-300 a11y-contrast:text-slate-300">
              No hay frases en esta categoría.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}