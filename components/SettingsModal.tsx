'use client';

import React, { useState } from 'react';
import { PhraseCategory } from '@/data/phrases.data';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: PhraseCategory[];
  onSaveCategories: (updatedCategories: PhraseCategory[]) => void;
  isLightMode: boolean;
}

export default function SettingsModal({ isOpen, onClose, categories, onSaveCategories, isLightMode }: SettingsModalProps) {
  // Estados para el manejo del formulario
  const [selectedCatId, setSelectedCatId] = useState<string>('new');
  const [newCatName, setNewCatName] = useState<string>('');
  const [phraseLabel, setPhraseLabel] = useState<string>('');
  const [phraseText, setPhraseText] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    if (!phraseLabel.trim() || !phraseText.trim()) return;

    let updatedCategories = [...categories];// Creamos una copia del array de categorías para no mutar el estado directamente

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
            ...cat,// Agregamos la nueva frase a la categoría existente
            phrases: [
              ...cat.phrases,// Mantenemos las frases existentes
              {
                id: `p-${Date.now()}`,// Generamos un ID único basado en timestamp
                label: phraseLabel.trim(),
                textToSpeak: phraseText.trim(),
              }
            ]
          };
        }
        return cat;
      });
    }

    onSaveCategories(updatedCategories);// Que ejecuta el setCategories del padre
    
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
    }).filter(cat => cat.phrases.length > 0); // Si la categoría se queda sin frases, opcionalmente la borramos
    
    onSaveCategories(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-center items-end sm:items-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-t-2xl sm:rounded-2xl flex flex-col max-h-[90vh] shadow-2xl transition-all animate-in slide-in-from-bottom duration-200">
        
        {/* Cabecera */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center shrink-0">
          <h2 className="text-base font-bold text-teal-400">⚙️ Panel de Gestión de Frases</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold p-1 text-sm">Cerrar</button>
        </div>

        {/* Contenido Scrolleable */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          
          {/* FORMULARIO DE ALTA */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-slate-850/40 p-3 rounded-xl border border-slate-800/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-500">➕ Agregar Frase / Categoría</h3>
            
            <div className="flex flex-col space-y-1">
              <label className="text-xs text-slate-400">Seleccionar Destino:</label>
              <select 
                value={selectedCatId}
                onChange={(e) => setSelectedCatId(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="new">[ Nueva Categoría ]</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>Añadir a: {cat.name}</option>
                ))}
              </select>
            </div>

            {selectedCatId === 'new' && (
              <div className="flex flex-col space-y-1 animate-in fade-in duration-150">
                <label className="text-xs text-slate-400">Nombre de la nueva Categoría:</label>
                <input 
                  type="text" 
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Ej: 🛒 Supermercado"
                  className="bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            )}

            <div className="flex flex-col space-y-1">
              <label className="text-xs text-slate-400">Etiqueta corta del botón (Label):</label>
              <input 
                type="text" 
                value={phraseLabel}
                onChange={(e) => setPhraseLabel(e.target.value)}
                placeholder="Ej: ¿Cuánto sale?"
                className="bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-xs text-slate-400">Lo que dirá el parlante (Texto a voz):</label>
              <textarea 
                value={phraseText}
                onChange={(e) => setPhraseText(e.target.value)}
                placeholder="Ej: Disculpe, ¿me podría decir cuál es el precio de este producto?"
                rows={2}
                className="bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
              />
            </div>

            <button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 rounded-lg text-xs transition-colors">
              💾 Guardar Entrada
            </button>
          </form>

          {/* LISTADO DE EDICIÓN / ELIMINACIÓN */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-red-400">🗑️ Listado Actual (Hacer clic para eliminar)</h3>
            {categories.map(cat => (
              <div key={cat.id} className="space-y-1">
                <h4 className="text-xs font-bold text-slate-400 border-b border-slate-800 pb-0.5">{cat.name}</h4>
                <div className="flex flex-wrap gap-1.5 py-1">
                  {cat.phrases.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleDeletePhrase(cat.id, p.id)}
                      className="bg-slate-800 border border-slate-700 hover:bg-red-950/40 hover:border-red-800 text-slate-300 hover:text-red-400 text-[10px] px-2 py-1 rounded-md transition-all flex items-center space-x-1"
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