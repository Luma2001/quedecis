'use client';

import React, { useState, useEffect } from 'react';
import { X, Trash2, Save, Settings } from 'lucide-react';
import { PhraseCategory } from '@/data/phrases.data';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: PhraseCategory[];
  onSaveCategories: (updatedCategories: PhraseCategory[]) => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  categories = [],
  onSaveCategories,
}: SettingsModalProps) {
  const [selectedCatId, setSelectedCatId] = useState<string>('new');
  const [newCatName, setNewCatName] = useState<string>('');
  const [phraseLabel, setPhraseLabel] = useState<string>('');
  const [phraseText, setPhraseText] = useState<string>('');

  // Cerrar modal al presionar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phraseLabel.trim() || !phraseText.trim()) return;

    let updatedCategories = [...categories];

    if (selectedCatId === 'new') {
      if (!newCatName.trim()) return;
      const newCatId = newCatName.toLowerCase().trim().replace(/\s+/g, '-');

      const newCategory: PhraseCategory = {
        id: newCatId,
        name: newCatName.trim(),
        phrases: [
          {
            id: `p-${Date.now()}`,
            label: phraseLabel.trim(),
            textToSpeak: phraseText.trim(),
          },
        ],
      };
      updatedCategories.push(newCategory);
    } else {
      updatedCategories = updatedCategories.map((cat) => {
        if (cat.id === selectedCatId) {
          return {
            ...cat,
            phrases: [
              ...cat.phrases,
              {
                id: `p-${Date.now()}`,
                label: phraseLabel.trim(),
                textToSpeak: phraseText.trim(),
              },
            ],
          };
        }
        return cat;
      });
    }

    onSaveCategories(updatedCategories);

    setPhraseLabel('');
    setPhraseText('');
    setNewCatName('');
    onClose();
  };

  const handleDeletePhrase = (catId: string, phraseId: string) => {
    const updated = categories
      .map((cat) => {
        if (cat.id === catId) {
          return {
            ...cat,
            phrases: cat.phrases.filter((p) => p.id !== phraseId),
          };
        }
        return cat;
      })
      .filter((cat) => cat.phrases.length > 0);

    onSaveCategories(updated);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-settings-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-all duration-300 a11y-contrast:bg-black/90"
    >
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all animate-in slide-in-from-bottom duration-300 a11y-contrast:bg-black a11y-contrast:border-2 a11y-contrast:border-white">
        
        {/* Cabecera del Diálogo */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0 a11y-contrast:bg-black a11y-contrast:border-b-2 a11y-contrast:border-white">
          <div className="flex items-center space-x-2.5">
            <Settings className="w-5 h-5 text-teal-400 a11y-contrast:text-yellow-400" aria-hidden="true" />
            <h2 id="modal-settings-title" className="text-base md:text-lg font-black tracking-tight text-white a11y-contrast:text-white">
              Panel de Gestión de Frases
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-all cursor-pointer text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 a11y-contrast:bg-black a11y-contrast:text-yellow-400 a11y-contrast:border a11y-contrast:border-white"
            aria-label="Cerrar panel de configuración"
          >
            <span>Cerrar</span>
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Cuerpo con Scroll */}
        <div className="p-6 overflow-y-auto space-y-6 scrollbar-none flex-1">
          
          {/* Formulario de Nueva Frase */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-slate-950/90 p-5 rounded-2xl border border-slate-800 a11y-contrast:bg-black a11y-contrast:border-2 a11y-contrast:border-white shadow-md">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 a11y-contrast:text-yellow-400">
              ➕ Agregar Frase / Categoría
            </h3>
            
            {/* Destino */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="select-category" className="text-xs font-bold uppercase tracking-wider font-mono text-slate-300 a11y-contrast:text-white">
                Seleccionar Destino:
              </label>
              <select 
                id="select-category"
                value={selectedCatId}
                onChange={(e) => setSelectedCatId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:border a11y-contrast:border-white"
              >
                <option value="new">[ Nueva Categoría ]</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    Añadir a: {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Nueva Categoría */}
            {selectedCatId === 'new' && (
              <div className="flex flex-col space-y-1.5 animate-in fade-in duration-150">
                <label htmlFor="new-cat-name" className="text-xs font-bold uppercase tracking-wider font-mono text-slate-300 a11y-contrast:text-white">
                  Nombre de la nueva Categoría:
                </label>
                <input 
                  id="new-cat-name"
                  type="text" 
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Ej: 🛒 Supermercado"
                  required
                  className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl px-3.5 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:placeholder:text-slate-400 a11y-contrast:border a11y-contrast:border-white"
                />
              </div>
            )}

            {/* Etiqueta Corta */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="phrase-label" className="text-xs font-bold uppercase tracking-wider font-mono text-slate-300 a11y-contrast:text-white">
                Etiqueta corta del botón (Label):
              </label>
              <input 
                id="phrase-label"
                type="text" 
                value={phraseLabel}
                onChange={(e) => setPhraseLabel(e.target.value)}
                placeholder="Ej: ¿Cuánto sale?"
                required
                className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl px-3.5 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:placeholder:text-slate-400 a11y-contrast:border a11y-contrast:border-white"
              />
            </div>

            {/* Texto a voz */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="phrase-text" className="text-xs font-bold uppercase tracking-wider font-mono text-slate-300 a11y-contrast:text-white">
                Lo que dirá el parlante (Texto a voz):
              </label>
              <textarea 
                id="phrase-text"
                value={phraseText}
                onChange={(e) => setPhraseText(e.target.value)}
                placeholder="Ej: Disculpe, ¿me podría decir cuál es el precio de este producto?"
                rows={3}
                required
                className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl px-3.5 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 resize-none a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:placeholder:text-slate-400 a11y-contrast:border a11y-contrast:border-white"
              />
            </div>

            {/* Botón Guardar */}
            <button 
              type="submit" 
              className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-black py-3 rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 a11y-contrast:bg-yellow-400 a11y-contrast:text-black a11y-contrast:border-2 a11y-contrast:border-white"
            >
              <Save className="w-4 h-4" aria-hidden="true" />
              <span>Guardar Entrada</span>
            </button>
          </form>

          {/* Separador */}
          <hr className="border-slate-800 a11y-contrast:border-white" />

          {/* Listado de Edición / Eliminación */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-rose-400 a11y-contrast:text-yellow-400">
              <Trash2 className="w-4 h-4" aria-hidden="true" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider">
                Listado Actual (Hacer clic para eliminar)
              </h3>
            </div>

            {categories.map((cat) => (
              <div key={cat.id} className="space-y-2">
                <h4 className="text-sm font-bold text-slate-200 a11y-contrast:text-white border-b border-slate-800 a11y-contrast:border-slate-600 pb-1">
                  {cat.name}
                </h4>
                <div className="flex flex-wrap gap-2 py-1">
                  {cat.phrases.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleDeletePhrase(cat.id, p.id)}
                      aria-label={`Eliminar frase: ${p.label}`}
                      className="bg-slate-950 border border-slate-800 hover:bg-rose-950/60 hover:border-rose-500/50 text-slate-200 hover:text-rose-300 text-xs px-3 py-1.5 rounded-xl transition-all flex items-center space-x-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:border a11y-contrast:border-white a11y-contrast:hover:border-red-500"
                    >
                      <span className="font-medium">{p.label}</span>
                      <span className="text-xs text-rose-400 a11y-contrast:text-yellow-400" aria-hidden="true">✕</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}