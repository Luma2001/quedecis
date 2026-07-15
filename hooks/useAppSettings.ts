import { useState, useEffect } from 'react';
import { initialCategories, PhraseCategory } from '@/data/phrases.data';

export function useAppSettings() {
  const [fontSize, setFontSize] = useState<number>(32);
  const [isLeftHanded, setIsLeftHanded] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const guardado = localStorage.getItem('queDecis_theme');
      if (guardado !== null) {
        return guardado === 'light';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false; // Valor por defecto en el servidor
  });
  
  const [categories, setCategories] = useState<PhraseCategory[]>(() => {
    if (typeof window !== 'undefined') {
      const guardadas = localStorage.getItem('queDecis_categories');
      return guardadas ? JSON.parse(guardadas) : initialCategories;
    }
    return initialCategories;
  });

  useEffect(() => {
    localStorage.setItem('queDecis_categories', JSON.stringify(categories));
  }, [categories]);

//Sincronizador del tema global con Tailwind v4 */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement; // Accedemos a la etiqueta <html>
      if (isLightMode) {
        root.classList.add('light');
        root.classList.remove('dark');
        localStorage.setItem('queDecis_theme', 'light');
      } else {
        root.classList.add('dark');
        root.classList.remove('light');
        localStorage.setItem('queDecis_theme', 'dark');
      }
    }
  }, [isLightMode]);




 //función para incrementar letra dentro de un límite
  const increaseFontSize = () => {
    setFontSize(prev => (prev < 60 ? prev + 4 : prev)); // Límite máximo: 60px
  };

  //función para decrementar letra dentro de un límite
  const decreaseFontSize = () => {
    setFontSize(prev => (prev > 20 ? prev - 4 : prev)); // Límite mínimo: 20px
  };

  const toggleLeftHanded = () => setIsLeftHanded(prev => !prev);
  const toggleLightMode = () => setIsLightMode(prev => !prev);

  return {
    fontSize,
    isLeftHanded,
    setIsLeftHanded,
    toggleLeftHanded,
    isSettingsOpen,
    setIsSettingsOpen,
    isLightMode,
    setIsLightMode,
    toggleLightMode,
    categories,
    setCategories,
    increaseFontSize,
    decreaseFontSize
  };
}