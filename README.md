# ¿Qué Decís? — Asistente de Comunicación Inclusiva para Mostradores Públicos

¿Qué Decís? es un Producto Mínimo Viable (MVP) diseñado bajo los principios del **Diseño Universal** para eliminar las barreras de comunicación en entornos de atención al público (como efectores de salud, oficinas gubernamentales o comercios). La aplicación funciona como un canal accesible bidireccional que asiste a personas con discapacidad auditiva (hipoacusia o sordera) o dificultades del habla, permitiendo una interacción fluida, digna y autónoma con el personal de atención sin depender de intermediarios.

La solución está desarrollada como una **PWA (Progressive Web App)** con capacidades **100% offline**, garantizando privacidad absoluta por diseño y total operatividad en zonas con conectividad inestable.

---

## 🚀 Características Clave y UX Inclusiva

*   **Voz a Texto en Tiempo Real:** Captura el dictado del agente oyente a través de la API local del dispositivo y lo traduce instantáneamente en subtítulos de alta visibilidad.
*   **Texto a Voz Instantáneo:** Permite al usuario tippear respuestas personalizadas que el motor de síntesis reproduce de forma audible con acentos locales.
*   **Catálogo de Frases Rápidas:** Selector horizontal (carrusel) optimizado para dispositivos móviles que agrupa expresiones de uso común organizadas por categorías (*Trámites, Saludos, Urgencias*).
*   **Ergonomía Adaptativa (Modo Zurdo):** Permite invertir la disposición de la botonera principal para facilitar la operación con un solo pulgar según la lateralidad del usuario.
*   **Control de Accesibilidad Visual:** Ajuste dinámico de tipografía (hasta 60px) en tiempo real y alternancia a Modo Claro de alto contraste para contrarrestar reflejos de luz ambiental.
*   **Privacidad por Diseño (Privacy by Design):** El procesamiento de voz ocurre localmente en el silicio del dispositivo; ninguna conversación o dato sensible se almacena ni se transfiere a servidores externos.

---

## 🛠️ Stack Tecnológico

El núcleo de la aplicación fue construido utilizando herramientas modernas de desarrollo frontend para garantizar velocidad de renderizado, escalabilidad y compatibilidad:

*   **Framework:** [Next.js](https://nextjs.org/) (App Router & TypeScript) para una estructura de rutas sólida y tipado estricto.
*   **Estilos y UI:** [Tailwind CSS](https://tailwindcss.com/) para un diseño responsivo, utilitario y manejo de transiciones fluidas.
*   **Íconos:** [Lucide React](https://lucide.dev/) para una iconografía limpia y de alta legibilidad.
*   **Motor PWA:** [@ducanh2912/next-pwa](https://github.com/ducanh2912/next-pwa) para la automatización de Service Workers y estrategias de almacenamiento en caché local.
*   **APIs Nativas del Navegador (Web APIs):**
    *   `Web Speech API (SpeechRecognition)` para la transcripción del habla a texto.
    *   `SpeechSynthesis` para la lectura artificial del texto a voz.

---

