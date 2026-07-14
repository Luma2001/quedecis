'use client';

import React from 'react';
import Logo from './logo';
import { Sun, Moon } from 'lucide-react';
import { useAppSettings } from '@/hooks/useAppSettings';

const Header = () => {

  const { isLightMode, toggleLightMode } = useAppSettings();

  return (
    <header 
      id="header" 
      className="fixed top-0 left-0 right-0 bg-panel-bg light:bg-white max-w-full mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-800/60 light:border-slate-200 z-100 transition-colors duration-300"
    >
      <div className="flex items-center space-x-3"> 
        <Logo />
        <div>
          <h1 className="text-xl font-black tracking-tight bg-linear-to-r from-text-contrast to-text-muted bg-clip-text">
            ¿QUÉ DECÍS?
          </h1>
          <p className="text-[10px] text-teal-400 light:text-teal-700 font-bold tracking-widest uppercase">
            Asistente Inclusivo
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/*Botón de cambio de modo*/}
        <button
          onClick={toggleLightMode}
          className="p-2 rounded-xl bg-input border border-input-border text-text-muted hover:text-text-contrast transition-all duration-300 cursor-pointer"
          aria-label={isLightMode ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
        >
          {isLightMode ? (
            <Moon className="w-4 h-4 text-brand-blue" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400" />
          )}
        </button>

        <span className="hidden sm:inline-block text-[10px] bg-input border border-input-border px-2.5 py-1 rounded-full font-mono text-text-muted transition-colors duration-300">
          v1.0.0 · MVP PWA Híbrida
        </span>
      </div>
    </header>
  );
};

export default Header;














// import React from 'react'
// import Logo from './logo'

// const Header = () => {
//   return (
//       <header id="header" aria-labelledby="header" className="fixed top-0 left-0 right-0 bg-panel max-w-full mx-auto px-6 py-5 flex items-center justify-between border-b border-panel-border z-100 transition-colors duration-300">
//         <div className="flex items-center space-x-3"> 
//           <Logo />
//           <div>
//             <h1 className="text-xl font-black tracking-tight bg-linear-to-r from-text-contrast to-text-muted bg-clip-text text-transparent">
//               ¿QUÉ DECÍS?
//             </h1>
//             <p className="text-[10px] text-indicator-text font-bold tracking-widest uppercase">Asistente Inclusivo</p>
//           </div>
//         </div>
//         <span className="text-[10px] bg-input border border-input-border px-2.5 py-1 rounded-full font-mono text-text-muted transition-colors duration-300">
//           v1.0.0 · MVP PWA Híbrida
//         </span>
//       </header>
//   )
// }

// export default Header