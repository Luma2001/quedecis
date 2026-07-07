# ¿Qué Decís? — Asistente de Comunicación Inclusiva para Mostradores Públicos

![alt text](./public/image/image.png)

¿Qué Decís? es un Producto Mínimo Viable (MVP) diseñado bajo los principios del **Diseño Universal** para eliminar las barreras de comunicación en entornos de atención al público (como efectores de salud, oficinas gubernamentales o comercios). La aplicación funciona como un canal accesible bidireccional que asiste a personas con discapacidad auditiva (hipoacusia o sordera) o dificultades del habla, permitiendo una interacción fluida, digna y autónoma con el personal de atención sin depender de intermediarios.

La solución está desarrollada como una **PWA (Progressive Web App)** con capacidades **100% offline**, garantizando privacidad absoluta por diseño y total operatividad en zonas con conectividad inestable.

---

## 🚀 Características Clave y UX Inclusiva
![alt text](./public/image/image2.png)
*   **Voz a Texto en Tiempo Real:** Captura el dictado del agente oyente a través de la API local del dispositivo y lo traduce instantáneamente en subtítulos de alta visibilidad.
  
    ![alt text](./public/image/image3.png)
   
*   **Texto a Voz Instantáneo:** Permite al usuario tippear respuestas personalizadas que el motor de síntesis reproduce de forma audible con acentos locales.
   
   ![alt text](./public/image/image4.png)

*   **Catálogo de Frases Rápidas:** Selector horizontal (carrusel) optimizado para dispositivos móviles que agrupa expresiones de uso común organizadas por categorías (*Trámites, Saludos, Urgencias*).
  ![alt text](./public/image/image5.png)
*   **Ergonomía Adaptativa (Modo Zurdo):** Permite invertir la disposición de la botonera principal para facilitar la operación con un solo pulgar según la lateralidad del usuario.
   ![alt text](./public/image/image6.png) ![alt text](./public/image/image7.png)
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

## 🔍 Notas de Compatibilidad y Limitaciones Técnicas (MVP)

Durante la fase actual del Producto Mínimo Viable (MVP), la aplicación implementa una estrategia híbrida de conectividad:

* **Soporte PWA Offline:** La interfaz gráfica, la arquitectura de componentes, las frases rápidas y el manual de asistencia técnica están completamente guardados de forma local en la memoria caché del celular gracias al Service Worker y funcionan **100% sin conexión a internet**.
* **Dependencia de Red para Dictado (Voz a Texto):** Debido a que la API nativa `SpeechRecognition` de Google Chrome delega el procesamiento del audio en los servidores de reconocimiento de voz de Google, **la funcionalidad de transcripción requiere conectividad a internet activa**. La síntesis de voz (Texto a Voz), por el contrario, utiliza los paquetes de voz locales del sistema operativo y mantiene soporte offline en la mayoría de los dispositivos.
* **Escalabilidad Futura:** Para lograr un entorno 100% offline en el dictado, se contempla en futuras versiones la integración de modelos de lenguaje locales optimizados para dispositivos móviles (como *Whisper TFLite* o librerías WebAssembly corriendo en el cliente).
---
<div align="center">

|  Desarrolladora   |   <img width="72" height="72" alt="imagen" src="https://github.com/user-attachments/assets/6ae79453-9c35-453b-aaba-28d8442e5bb5" />                   |
| :------------------- | :----------------------------------------------- |
| **Luciana Quilcate** | **[github](https://github.com/Luma2001)**        |

</div>