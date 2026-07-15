'use client';

import React, { useState } from 'react';
import { X, Trash2, Save } from 'lucide-react';
import { PhraseCategory } from '@/data/phrases.data';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: PhraseCategory[];
  onSaveCategories: (updatedCategories: PhraseCategory[]) => void;
}

export default function SettingsModal({ isOpen, onClose, categories, onSaveCategories }: SettingsModalProps) {
  // Estados para el manejo del formulario
  const [selectedCatId, setSelectedCatId] = useState<string>('new');
  const [newCatName, setNewCatName] = useState<string>('');
  const [phraseLabel, setPhraseLabel] = useState<string>('');
  const [phraseText, setPhraseText] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    if (!phraseLabel.trim() || !phraseText.trim()) return;

    let updatedCategories = [...categories];

    if (selectedCatId === 'new') {
      // 1. CREAR NUEVA CATEGORÍA Y AGREGAR FRASE
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
          }
        ]
      };
      updatedCategories.push(newCategory);
    } else {
      // 2. AGREGAR A CATEGORÍA EXISTENTE
      updatedCategories = updatedCategories.map(cat => {
        if (cat.id === selectedCatId) {
          return {
            ...cat,
            phrases: [
              ...cat.phrases,
              {
                id: `p-${Date.now()}`,
                label: phraseLabel.trim(),
                textToSpeak: phraseText.trim(),
              }
            ]
          };
        }
        return cat;
      });
    }

    onSaveCategories(updatedCategories);
    
    // Limpiar formulario básico
    setPhraseLabel('');
    setPhraseText('');
    setNewCatName('');
    onClose();
  };

  // Función rápida para eliminar una frase específica
  const handleDeletePhrase = (catId: string, phraseId: string) => {
    const updated = categories.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          phrases: cat.phrases.filter(p => p.id !== phraseId)
        };
      }
      return cat;
    }).filter(cat => cat.phrases.length > 0);
    
    onSaveCategories(updated);
  };

  return (
   
    <div className="fixed inset-0 z-150 flex items-end sm:items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md transition-all duration-300">
      
      {/* Tarjeta contenedora principal con fondo sólido para evitar que el blur del fondo interfiera */}
      <div className="w-full max-w-lg bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all animate-in slide-in-from-bottom duration-300">
        
        <div className="px-6 py-5 bg-slate-950 light:bg-slate-100 border-b border-slate-800 light:border-slate-200 flex items-center justify-between shrink-0 transition-colors duration-300">
          <div className="flex items-center space-x-2">
            <span className="text-xl">⚙️</span>
            <h2 className="text-lg md:text-base font-black tracking-tight text-white light:text-slate-900 transition-colors duration-300">
              Panel de Gestión de Frases
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 px-4 py-2.5 md:px-3 md:py-1.5 rounded-xl bg-slate-800 light:bg-slate-200 text-slate-300 light:text-slate-700 hover:text-white light:hover:text-slate-900 transition-all duration-200 cursor-pointer text-base md:text-sm font-bold"
            aria-label="Cerrar panel"
          >
            <span>Cerrar</span>
            <X className="w-5 h-5 md:w-4 md:h-4" />
          </button>
        </div>

        {/* Contenido con scroll interno */}
        <div className="p-6 overflow-y-auto space-y-6 scrollbar-none flex-1">
          
          {/* FORMULARIO DE ALTA */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-card-bg light:bg-slate-50 p-4 rounded-xl border border-card-border light:border-slate-200 transition-all duration-300">
            <h3 className="text-sm md:text-xs font-bold uppercase tracking-wider text-indicator-text transition-colors duration-300">
              ➕ Agregar Frase / Categoría
            </h3>
            
            {/* Seleccionar Destino */}
            <div className="flex flex-col space-y-2">
              <label className="text-base md:text-sm font-bold text-text-primary transition-colors duration-300">
                Seleccionar Destino:
              </label>
              <select 
                value={selectedCatId}
                onChange={(e) => setSelectedCatId(e.target.value)}
                className="w-full bg-input border border-input-border text-text-primary rounded-xl px-4 py-3 text-base md:text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all duration-300"
              >
                <option value="new">[ Nueva Categoría ]</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>Añadir a: {cat.name}</option>
                ))}
              </select>
            </div>

            {/* Nueva Categoría (Si corresponde) */}
            {selectedCatId === 'new' && (
              <div className="flex flex-col space-y-2 animate-in fade-in duration-150">
                <label className="text-base md:text-sm font-bold text-text-primary transition-colors duration-300">
                  Nombre de la nueva Categoría:
                </label>
                <input 
                  type="text" 
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Ej: 🛒 Supermercado"
                  className="w-full bg-input border border-input-border text-text-primary rounded-xl px-4 py-3 text-base md:text-sm placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                />
              </div>
            )}

            {/* Etiqueta corta */}
            <div className="flex flex-col space-y-2">
              <label className="text-base md:text-sm font-bold text-text-primary transition-colors duration-300">
                Etiqueta corta del botón (Label):
              </label>
              <input 
                type="text" 
                value={phraseLabel}
                onChange={(e) => setPhraseLabel(e.target.value)}
                placeholder="Ej: ¿Cuánto sale?"
                className="w-full bg-input border border-input-border text-text-primary rounded-xl px-4 py-3 text-base md:text-sm placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all duration-300"
              />
            </div>

            {/* Texto a voz (Textarea) */}
            <div className="flex flex-col space-y-2">
              <label className="text-base md:text-sm font-bold text-text-primary transition-colors duration-300">
                Lo que dirá el parlante (Texto a voz):
              </label>
              <textarea 
                value={phraseText}
                onChange={(e) => setPhraseText(e.target.value)}
                placeholder="Ej: Disculpe, ¿me podría decir cuál es el precio de este producto?"
                rows={3}
                className="w-full bg-input border border-input-border text-text-primary rounded-xl px-4 py-3 text-base md:text-sm placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500 resize-none transition-all duration-300"
              />
            </div>

            {/* Botón Guardar */}
            <button 
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3.5 md:py-2.5 rounded-xl text-base md:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
            >
              <Save className="w-5 h-5 md:w-4 md:h-4" />
              <span>Guardar Entrada</span>
            </button>
          </form>

          {/* Separador */}
          <hr className="border-slate-800 light:border-slate-200" />

          {/* LISTADO DE EDICIÓN / ELIMINACIÓN */}
          <div className="space-y-4">
            {/* Título de eliminación con color de alerta accesible */}
            <div className="flex items-center space-x-2 text-rose-400 light:text-rose-600">
              <Trash2 className="w-5 h-5 md:w-4 md:h-4" />
              <h3 className="text-sm md:text-xs font-black tracking-wider uppercase">
                Listado Actual (Hacer clic para eliminar)
              </h3>
            </div>

            {categories.map(cat => (
              <div key={cat.id} className="space-y-2">
                <h4 className="text-base md:text-sm font-bold text-text-muted border-b border-panel-border pb-1 transition-all duration-300">
                  {cat.name}
                </h4>
                <div className="flex flex-wrap gap-2.5 py-1">
                  {cat.phrases.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleDeletePhrase(cat.id, p.id)}
                      className="bg-input border border-input-border hover:bg-red-500/10 hover:border-red-500/30 text-text-muted hover:text-red-500 dark:hover:text-red-400 text-base md:text-xs px-4 py-2.5 md:px-3 md:py-1.5 rounded-xl transition-all duration-300 flex items-center space-x-2 cursor-pointer shadow-xs"
                      title="Eliminar frase"
                    >
                      <span className="font-medium">{p.label}</span>
                      <span className="text-xs opacity-65">✕</span>
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