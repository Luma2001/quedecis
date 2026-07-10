import React from 'react'
import Logo from './logo'

const Header = () => {
  return (
      <header id="header" className="fixed top-0 left-0 right-0 bg-slate-900 w-full max-w-5xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-800/40 z-100">
        <div className="flex items-center space-x-3"> 
          <Logo />
          <div>
            <h1 className="text-xl font-black tracking-tight bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
              ¿QUÉ DECÍS?
            </h1>
            <p className="text-[10px] text-teal-400 font-bold tracking-widest uppercase">Asistente Inclusivo</p>
          </div>
        </div>
        <span className="text-[10px] bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-full font-mono text-slate-400">
          v1.0.0 · MVP PWA Híbrida
        </span>
      </header>
  )
}

export default Header
