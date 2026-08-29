'use client';

import React, { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';

export interface Phrase {
  id: string;
  label: string;
  textToSpeak: string;
}

export interface Category {
  id: string;
  name: string;
  phrases: Phrase[];
}

interface QuickPhrasesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onSelectPhrase: (phrase: Phrase) => void;
  onOpenManageModal: () => void;
}

export default function QuickPhrasesDrawer({
  isOpen,
  onClose,
  categories = [],
  onSelectPhrase,
  onOpenManageModal,
}: QuickPhrasesDrawerProps) {
  const [activeTab, setActiveTab] = useState<string>('');

  if (!isOpen) return null;

  const currentCategory =
    categories.find((c) => c.id === activeTab) || categories[0];

  return (
    <section
      role="region"
      aria-label="Panel de frases rápidas predefinidas"
      className="w-full bg-slate-900 border-t border-slate-700/80 p-3 flex flex-col gap-2.5 max-h-[42vh] shrink-0 animate-in slide-in-from-bottom duration-200"
    >
      {/* Barra de pestañas con scroll horizontal invisible */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
        <div 
          role="tablist"
          aria-label="Categorías de frases"
          className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 flex-1 min-w-0 pr-2"
        >
          {categories.map((cat) => {
            const isActive = cat.id === (activeTab || categories[0]?.id);
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#00b8a9] text-[#0b1020] shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Acciones de administración y cierre */}
        <div className="flex items-center gap-1 shrink-0 pl-1 border-l border-slate-800">
          <button
            type="button"
            onClick={onOpenManageModal}
            title="Administrar frases"
            aria-label="Administrar o agregar frases"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar panel de frases"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Grilla de frases activas */}
      <div className="overflow-y-auto max-h-36 flex flex-wrap gap-2 py-1">
        {currentCategory?.phrases.map((phrase: Phrase) => (
          <button
            key={phrase.id}
            type="button"
            onClick={() => onSelectPhrase(phrase)}
            className="bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 hover:border-[#00b8a9] text-white text-xs font-bold px-3 py-2 rounded-xl transition-all text-left cursor-pointer"
          >
            {phrase.label}
          </button>
        ))}
      </div>
    </section>
  );
}