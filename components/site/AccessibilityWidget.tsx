'use client';

import * as React from 'react';
import {
  Accessibility,
  Eye,
  BookOpen,
  Link2,
  PauseCircle,
  ScanLine,
  ImageOff,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function AccessibilityWidget() {
  const {
    highContrast,
    readingMode,
    highlightLinks,
    reduceMotion,
    readingGuide,
    hideImages,
    screenReader,
    fontSizeLevel,
    toggleHighContrast,
    toggleReadingMode,
    toggleHighlightLinks,
    toggleReduceMotion,
    toggleReadingGuide,
    toggleHideImages,
    toggleScreenReader,
    increaseFontSize,
    decreaseFontSize,
    resetAll,
  } = useAccessibility();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="size-12 rounded-full shadow-lg"
            aria-label="Abrir panel de opciones de accesibilidad"
          >
            <Accessibility className="size-6" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          side="top"
          className="w-80 p-5 space-y-4 rounded-2xl shadow-xl"
        >
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-semibold text-sm">Opciones de Accesibilidad</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetAll}
              className="h-8 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
              Restablecer
            </Button>
          </div>

          <div className="space-y-4">
            {/* Alto Contraste */}
            <div className="flex items-center justify-between">
              <Label
                htmlFor="contrast-switch"
                className="flex items-center gap-2 cursor-pointer text-sm font-medium"
              >
                <Eye className="size-4 text-muted-foreground" />
                Alto Contraste
              </Label>
              <Switch
                id="contrast-switch"
                checked={highContrast}
                onCheckedChange={toggleHighContrast}
              />
            </div>

            {/* Modo Lectura Asistida */}
            <div className="flex items-center justify-between">
              <Label
                htmlFor="audio-switch"
                className="flex items-center gap-2 cursor-pointer text-sm font-medium"
              >
                <Volume2 className="size-4 text-muted-foreground" />
                Lectura por Voz (Audio)
              </Label>
              <Switch
                id="audio-switch"
                checked={screenReader}
                onCheckedChange={toggleScreenReader}
              />
            </div>

            {/* Modo Optimizado para dislexia */}
            <div className="flex items-center justify-between">
              <Label
                htmlFor="reading-switch"
                className="flex items-center gap-2 cursor-pointer text-sm font-medium"
              >
                <BookOpen className="size-4 text-muted-foreground" />
                Optimizado para dislexia
              </Label>
              <Switch
                id="reading-switch"
                checked={readingMode}
                onCheckedChange={toggleReadingMode}
              />
            </div>

            {/* Guía de Lectura */}
            <div className="flex items-center justify-between">
              <Label
                htmlFor="guide-switch"
                className="flex items-center gap-2 cursor-pointer text-sm font-medium"
              >
                <ScanLine className="size-4 text-muted-foreground" />
                Guía de Lectura
              </Label>
              <Switch
                id="guide-switch"
                checked={readingGuide}
                onCheckedChange={toggleReadingGuide}
              />
            </div>

            {/* Ocultar Imágenes */}
            <div className="flex items-center justify-between">
              <Label
                htmlFor="hide-images-switch"
                className="flex items-center gap-2 cursor-pointer text-sm font-medium"
              >
                <ImageOff className="size-4 text-muted-foreground" />
                Ocultar Imágenes
              </Label>
              <Switch
                id="hide-images-switch"
                checked={hideImages}
                onCheckedChange={toggleHideImages}
              />
            </div>
            {/* Resaltar Enlaces */}
            <div className="flex items-center justify-between">
              <Label
                htmlFor="links-switch"
                className="flex items-center gap-2 cursor-pointer text-sm font-medium"
              >
                <Link2 className="size-4 text-muted-foreground" />
                Resaltar Enlaces
              </Label>
              <Switch
                id="links-switch"
                checked={highlightLinks}
                onCheckedChange={toggleHighlightLinks}
              />
            </div>

            {/* Detener Animaciones */}
            <div className="flex items-center justify-between">
              <Label
                htmlFor="motion-switch"
                className="flex items-center gap-2 cursor-pointer text-sm font-medium"
              >
                <PauseCircle className="size-4 text-muted-foreground" />
                Detener Animaciones
              </Label>
              <Switch
                id="motion-switch"
                checked={reduceMotion}
                onCheckedChange={toggleReduceMotion}
              />
            </div>

            {/* Tamaño del Texto */}
            <div className="pt-2 border-t flex items-center justify-between">
              <span className="text-sm font-medium">Tamaño de Texto</span>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={decreaseFontSize}
                  disabled={fontSizeLevel === 0}
                  aria-label="Disminuir tamaño de texto"
                >
                  <ZoomOut className="size-4" />
                </Button>
                <span className="text-xs font-semibold px-1 text-center min-w-8">
                  {fontSizeLevel === 0 ? '100%' : fontSizeLevel === 1 ? '115%' : '130%'}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={increaseFontSize}
                  disabled={fontSizeLevel === 2}
                  aria-label="Aumentar tamaño de texto"
                >
                  <ZoomIn className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}