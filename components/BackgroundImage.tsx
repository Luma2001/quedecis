import Image from 'next/image'
import React from 'react'

const BackgroundImage = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10 h-full w-full">
        <Image
          src="/image/_background.png"
          alt="Fondo de la Landing Page con un patrón abstracto y colores suaves"
          quality={75} // Optimiza el peso de la imagen al 75% sin perder calidad notoria
          fill // Hace que la imagen llene todo el div contenedor
          priority
          className="object-cover object-center" // Equivalente a background-size: cover
        />
        {/* Capa de superposición (Overlay) oscura para dar contraste al texto */}
        <div className="absolute inset-0 bg-gray-800/70 backdrop-blur-none" />
      </div>
      </>
  )
}

export default BackgroundImage
