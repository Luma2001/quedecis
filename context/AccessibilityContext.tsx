'use client';

import * as React from 'react';

interface AccessibilitySettings {
  highContrast: boolean;
  readingMode: boolean;
  highlightLinks: boolean;
  reduceMotion: boolean;
  readingGuide: boolean;
  hideImages: boolean;
  screenReader: boolean;
  fontSizeLevel: number;
}

interface AccessibilityContextType extends AccessibilitySettings {
  toggleHighContrast: () => void;
  toggleReadingMode: () => void;
  toggleHighlightLinks: () => void;
  toggleReduceMotion: () => void;
  toggleReadingGuide: () => void;
  toggleHideImages: () => void;
  toggleScreenReader: () => void;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetAll: () => void;
}

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  readingMode: false,
  highlightLinks: false,
  reduceMotion: false,
  readingGuide: false,
  hideImages: false,
  screenReader: false,
  fontSizeLevel: 0,
};

const AccessibilityContext = React.createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = React.useState<AccessibilitySettings>(() => {
    if (typeof window === 'undefined') return defaultSettings;
    try {
      const saved = localStorage.getItem('a11y-preferences');
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const stopSpeaking = React.useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speakText = React.useCallback((text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Detener cualquier audio previo
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Idioma base en español
    utterance.rate = 1.0;     // Velocidad normal

    // Seleccionar preferentemente una voz nativa en español
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find((v) => v.lang.startsWith('es'));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle('a11y-contrast', settings.highContrast);
    root.classList.toggle('a11y-reading', settings.readingMode);
    root.classList.toggle('a11y-links', settings.highlightLinks);
    root.classList.toggle('a11y-no-motion', settings.reduceMotion);
    root.classList.toggle('a11y-no-images', settings.hideImages);
    root.classList.toggle('a11y-audio-reader', settings.screenReader);

    const fontScales = ['100%', '115%', '130%'];
    root.style.fontSize = fontScales[settings.fontSizeLevel] || '100%';

    try {
      localStorage.setItem('a11y-preferences', JSON.stringify(settings));
    } catch {
      // Ignorar errores en navegadores con storage restringido
    }
  }, [settings]);

  const toggleHighContrast = () =>
    setSettings((prev) => ({ ...prev, highContrast: !prev.highContrast }));

  const toggleReadingMode = () =>
    setSettings((prev) => ({ ...prev, readingMode: !prev.readingMode }));

  const toggleHighlightLinks = () =>
    setSettings((prev) => ({ ...prev, highlightLinks: !prev.highlightLinks }));

  const toggleReduceMotion = () =>
    setSettings((prev) => ({ ...prev, reduceMotion: !prev.reduceMotion }));

  const toggleReadingGuide = () =>
    setSettings((prev) => ({ ...prev, readingGuide: !prev.readingGuide }));
  
  const toggleHideImages = () =>
    setSettings((prev) => ({ ...prev, hideImages: !prev.hideImages })); 
  
  const toggleScreenReader = () => 
    setSettings((p) => ({ ...p, screenReader: !p.screenReader }));



  const increaseFontSize = () =>
    setSettings((prev) => ({
      ...prev,
      fontSizeLevel: Math.min(prev.fontSizeLevel + 1, 2),
    }));

  const decreaseFontSize = () =>
    setSettings((prev) => ({
      ...prev,
      fontSizeLevel: Math.max(prev.fontSizeLevel - 1, 0),
    }));

  const resetAll = () => setSettings(defaultSettings);

  return (
    <AccessibilityContext.Provider
      value={{
        ...settings,
        toggleHighContrast,
        toggleReadingMode,
        toggleHighlightLinks,
        toggleReduceMotion,
        toggleReadingGuide,
        toggleHideImages,
        toggleScreenReader,
        speakText,
        stopSpeaking,
        increaseFontSize,
        decreaseFontSize,
        resetAll,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = React.useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility debe ser utilizado dentro de un AccessibilityProvider');
  }
  return context;
}