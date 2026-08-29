import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Dimensiones, bordes y fondo
        "flex h-11 w-full rounded-md border border-border bg-input px-3.5 py-2 text-base transition-colors",
        // Colores de texto y placeholder con alto contraste
        "text-foreground placeholder:text-muted-foreground",
        // Estados de foco visibles y accesibles por teclado
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent",
        // Estados deshabilitados y archivos
        "disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // Reglas directas para modo Alto Contraste
        "a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:border-2 a11y-contrast:border-white",
        className
      )}
      {...props}
    />
  )
}

export { Input }