import { useState, useEffect } from 'react';
import { initialCategories, PhraseCategory } from '@/data/phrases.data';

// Cambiá los tipos 'any' por tus interfaces reales (PhraseCategory, etc.)
export function useAppSettings() {
  const [fontSize, setFontSize] = useState<number>(32);
  const [isLeftHanded, setIsLeftHanded] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  
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