'use client';

import * as React from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';

export function AudioReader() {
  const { screenReader, speakText } = useAccessibility();

  React.useEffect(() => {
    if (!screenReader) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // No leer si el clic fue dentro del panel de configuración de accesibilidad
      if (target.closest('[data-radix-popper-content-wrapper]') || target.closest('button[aria-label]')) {
        return;
      }

      // Priorizar texto seleccionado con el mouse
      const selectedText = window.getSelection()?.toString().trim();
      if (selectedText) {
        speakText(selectedText);
        return;
      }

      // Si no hay selección, leer el texto del contenedor interactuado
      const readableElement = target.closest('p, h1, h2, h3, h4, h5, h6, li, button, a, label, [role="button"]');
      const textToRead = readableElement?.textContent?.trim() || target.textContent?.trim();

      if (textToRead) {
        speakText(textToRead);
      }
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [screenReader, speakText]);

  return null;
}