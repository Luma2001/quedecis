'use client';

import React, { useState } from 'react';
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
   
    <div className="fixed inset-0 z-50 bg-overlay backdrop-blur-sm flex justify-center items-end sm:items-center p-4">
      <div className="bg-panel border border-panel-border w-full max-w-md rounded-t-2xl sm:rounded-2xl flex flex-col max-h-[90vh] shadow-2xl transition-all animate-in slide-in-from-bottom duration-300 ">
        
        {/* Cabecera del Panel */}
        <div className="p-4 border-b border-panel-border flex justify-between items-center shrink-0 transition-colors duration-300">
          <h2 className="text-base font-bold text-indicator-text transition-colors duration-300">⚙️ Panel de Gestión de Frases</h2>
          <button 
            onClick={onClose} 
            className="text-text-muted hover:text-text-contrast font-bold p-1 text-sm transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>

        {/* Contenido Scrolleable */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          
          {/* FORMULARIO DE ALTA */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-card-bg p-3 rounded-xl border border-card-border transition-all duration-300">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indicator-text transition-colors duration-300">
              ➕ Agregar Frase / Categoría
            </h3>
            
            <div className="flex flex-col space-y-1">
              <label className="text-xs text-text-muted transition-colors duration-300">Seleccionar Destino:</label>
              <select 
                value={selectedCatId}
                onChange={(e) => setSelectedCatId(e.target.value)}
                className="bg-input border border-input-border text-text-primary rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all duration-300"
              >
                <option value="new">[ Nueva Categoría ]</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>Añadir a: {cat.name}</option>
                ))}
              </select>
            </div>

            {selectedCatId === 'new' && (
              <div className="flex flex-col space-y-1 animate-in fade-in duration-150">
                <label className="text-xs text-text-muted transition-colors duration-300">Nombre de la nueva Categoría:</label>
                <input 
                  type="text" 
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Ej: 🛒 Supermercado"
                  className="bg-input border border-input-border text-text-primary rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all duration-300"
                />
              </div>
            )}

            <div className="flex flex-col space-y-1">
              <label className="text-xs text-text-muted transition-colors duration-300">Etiqueta corta del botón (Label):</label>
              <input 
                type="text" 
                value={phraseLabel}
                onChange={(e) => setPhraseLabel(e.target.value)}
                placeholder="Ej: ¿Cuánto sale?"
                className="bg-input border border-input-border text-text-primary rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all duration-300"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-xs text-text-muted transition-colors duration-300">Lo que dirá el parlante (Texto a voz):</label>
              <textarea 
                value={phraseText}
                onChange={(e) => setPhraseText(e.target.value)}
                placeholder="Ej: Disculpe, ¿me podría decir cuál es el precio de este producto?"
                rows={2}
                className="bg-input border border-input-border text-text-primary rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none transition-all duration-300"
              />
            </div>

            <button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 rounded-lg text-xs transition-colors cursor-pointer">
              💾 Guardar Entrada
            </button>
          </form>

          {/* LISTADO DE EDICIÓN / ELIMINACIÓN */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400 transition-colors duration-300">
              🗑️ Listado Actual (Hacer clic para eliminar)
            </h3>
            {categories.map(cat => (
              <div key={cat.id} className="space-y-1">
                <h4 className="text-xs font-bold text-text-muted border-b border-panel-border pb-0.5 transition-all duration-300">
                  {cat.name}
                </h4>
                <div className="flex flex-wrap gap-1.5 py-1">
                  {cat.phrases.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleDeletePhrase(cat.id, p.id)}
                      className="bg-input border border-input-border hover:bg-red-500/10 hover:border-red-500/30 text-text-muted hover:text-red-500 dark:hover:text-red-400 text-[10px] px-2 py-1 rounded-md transition-all duration-300 flex items-center space-x-1 cursor-pointer"
                      title="Eliminar frase"
                    >
                      <span>{p.label}</span>
                      <span className="text-[9px] opacity-60">❌</span>
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