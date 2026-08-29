import Image from 'next/image'
import React from 'react'

const BackgroundImage = () => {
  return (
    <div 
      className="fixed inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none a11y-contrast:bg-black"
      aria-hidden="true"
    >
      {/* Imagen de fondo decorativa */}
      <Image
        src="/image/_background.png"
        alt="" // Vacío para elementos decorativos (WCAG 1.1.1)
        quality={75}
        fill
        priority
        className="object-cover object-center a11y-contrast:hidden"
      />
      
      {/* Capa de superposición (Overlay) */}
      <div className="absolute inset-0 bg-slate-950/85 transition-colors duration-300 a11y-contrast:bg-black" />
    </div>
  )
}

export default BackgroundImage