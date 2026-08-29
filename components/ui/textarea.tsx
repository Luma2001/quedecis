import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Estructura y fondo
        "flex min-h-25 w-full rounded-md border border-border bg-input px-3.5 py-2.5 text-base transition-colors",
        // Texto y placeholder
        "text-foreground placeholder:text-muted-foreground",
        // Foco accesible
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent",
        // Deshabilitado
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Alto contraste
        "a11y-contrast:bg-black a11y-contrast:text-white a11y-contrast:border-2 a11y-contrast:border-white",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }