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

*   **Framework:** [Next.js](https://nextjs.org/) 15+ (App Router) y React.
*   **Lenguaje:** TypeScript (Tipado estático para robustez del código y escalabilidad).
*   **Estilos y UI:** [Tailwind CSS](https://tailwindcss.com/) v4 para un diseño responsivo, utilitario y manejo de transiciones fluidas.
*   **Base de Datos / Persistencia:** Upstash Redis (Solución Serverless de baja latencia mediante REST API).
*   **Despliegue e Infraestructura:** Vercel (CI/CD automatizado y variables de entorno seguras).
*   **Íconos:** [Lucide React](https://lucide.dev/) para una iconografía limpia y de alta legibilidad.
*   **Motor PWA:** [@ducanh2912/next-pwa](https://github.com/ducanh2912/next-pwa) para la automatización de Service Workers y estrategias de almacenamiento en caché local.
*   **APIs Nativas del Navegador (Web APIs):**
    *   `Web Speech API (SpeechRecognition)` para la transcripción del habla a texto.
    *   `SpeechSynthesis` para la lectura artificial del texto a voz.
*   **Formspree API:** Servicio integrado asíncronamente para la recolección centralizada de feedback cualitativo sin necesidad de infraestructura relacional dedicada.

---

## 📂 Estructura del Código

El proyecto sigue la convención limpia de carpetas de Next.js (App Router), aislando responsabilidades y encapsulando componentes reutilizables:

```text
├── app/
│   ├── api/
│   │   └── downloads/
│   │       └── route.ts         # Endpoint de API atómico para el contador global con Upstash
│   ├── app-core/
│   │   └── page.tsx             # Panel principal de la aplicación (Dictado de voz y Texto a voz)
│   ├── layout.tsx               # Envoltura global de estilos y metadatos del sistema
│   └── page.tsx                 # Landing Page principal optimizada para conversión y feedback
├── components/
│   ├── FeedbackForm.tsx         # Componente modularizado e inclusivo de recolección de feedback
│   ├── Features.tsx             # Bloque estático de características del sistema
│   ├── Manual.tsx               # Guía rápida e instructivo visual de uso
│   ├── PWARegistrationCounter.tsx # Contador visual conectado al endpoint de descargas
│   └── logo.tsx                 # Identidad visual vectorizada del proyecto
├── public/
│   ├── icons/                   # Manifiesto de iconos requeridos para cumplimiento PWA
│   ├── image/                   # Assets visuales y fondos optimizados
│   ├── manifest.json            # Configuración de instalación PWA para Android/iOS/Desktop
│   ├── sw.js                    # Service Worker autogenerado en producción
│   └── workbox-*.js             # Scripts de soporte de Workbox para estrategias de caché
├── next.config.mjs              # Configuración del compilador y plugins de Next.js
└── .env.local                   # Variables de entorno locales (Excluido de Git)
```




## 🔍 Notas de Compatibilidad y Limitaciones Técnicas (MVP)

Durante la fase actual del Producto Mínimo Viable (MVP), la aplicación implementa una estrategia híbrida de conectividad:

* **Soporte PWA Offline:** La interfaz gráfica, la arquitectura de componentes, las frases rápidas y el manual de asistencia técnica están completamente guardados de forma local en la memoria caché del celular gracias al Service Worker y funcionan **100% sin conexión a internet**.
* **Dependencia de Red para Dictado (Voz a Texto):** Debido a que la API nativa `SpeechRecognition` de Google Chrome delega el procesamiento del audio en los servidores de reconocimiento de voz de Google, **la funcionalidad de transcripción requiere conectividad a internet activa**. La síntesis de voz (Texto a Voz), por el contrario, utiliza los paquetes de voz locales del sistema operativo y mantiene soporte offline en la mayoría de los dispositivos.
* **Escalabilidad Futura:** Para lograr un entorno 100% offline en el dictado, se contempla en futuras versiones la integración de modelos de lenguaje locales optimizados para dispositivos móviles (como *Whisper TFLite* o librerías WebAssembly corriendo en el cliente).
---
## 🛠️ Bitácora de Troubleshooting (Resolución de Problemas en Producción)

Durante el ciclo de desarrollo y despliegue del MVP, se identificaron y solucionaron tres desafíos técnicos de nivel arquitectónico en el entorno productivo:
### **Desafío A:** Error de Inyección Asíncrona en el Service Worker (```_async_to_generator```) en Entornos Windows

* **Síntoma:** La consola del inspector arrojaba un error crítico: ```Uncaught (in promise) ReferenceError: _async_to_generator is not defined``` en el archivo ```sw.js```, congelando la actualización de la PWA.

* **Causa:** El plugin de PWA inyectaba funciones asíncronas modernas en el entorno de desarrollo bajo Windows que, al no ser correctamente procesadas por los polyfills de Workbox, rompían la compatibilidad con el navegador.

* **Solución:** Se limpiaron manualmente los archivos obsoletos de la carpeta ,```public/``` y se inyectó una configuración de Workbox blindada en el archivo ```next.config.mjs``` para forzar la correcta compilación y control del Service Worker en el cliente:
  
```Javascript

workboxOptions: {
  skipWaiting: true,
  clientsClaim: true,
}  

```

### **Desafío B:** Error de Desconexión de Red en Computadoras de Escritorio (```Error de transcripción: network```)

* **Síntoma:** Al utilizar el dictado por voz desde una computadora de escritorio, la ```Web Speech API``` se interrumpía abruptamente arrojando un error de tipo ```network```.

* **Causa:** Los navegadores de escritorio envían de forma nativa los paquetes de audio del micrófono a servidores remotos para procesar el dictado. Ante micro-cortes de red o latencias en el servidor, la API se desconecta automáticamente. Los celulares procesan esto de forma híbrida/local, por lo que no sufrían el bug de manera constante.

* **Solución:** Se implementó una lógica de resiliencia activa en el evento ```recognition.onerror```. Si el error es de tipo network y la interfaz de usuario indica que el administrativo aún desea dictar (```isListening === true```), el sistema captura el error de forma silenciosa e intenta una reconexión automática del micrófono tras un retraso controlado de 1 segundo:
  
```TypeScript

if (event.error === 'network' && isListening) {
  setTimeout(() => {
    try { recognition.start(); } catch (e) { /* Ya activo */ }
  }, 1000);
}
```

### **Desafío C:**Fallo en el Consumo del Contador Global (Error de parseo JSON ```Unexpected token '<'```)

* **Síntoma:** El componente del contador arrojaba un error al intentar deserializar la respuesta del servidor: ```SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON```.

* **Causa:** La ruta de la API en Next.js estaba mal indexada debido a un plural incorrecto o archivos cacheados obsoletos en la carpeta ```.next```. Al fallar la ruta, Vercel devolvía una página de error 404 en HTML nativo (```<!DOCTYPE html>```), el cual fallaba al ser leído por el método ,```.json()```.

* **Solución:** Se renombró estrictamente el archivo de la API a la convención singular obligatoria (``` app/api/downloads/route.ts```), se eliminó manualmente la caché local y se desplegó una respuesta atómica conectada directamente al SDK Serverless de Upstash Redis.

---

## 🤖 Desarrollo Asistido por Inteligencia Artificial (AI-Driven Development)

Este proyecto adoptó un enfoque moderno de desarrollo integrando Inteligencia Artificial (Modelos Fundacionales Avanzados como Gemini) de manera iterativa como soporte al flujo de trabajo del desarrollador. El objetivo de la integración de la IA no fue delegar la arquitectura, sino actuar como un acelerador de productividad y un copiloto estratégico en las siguientes áreas:

* **Optimización de Arquitectura y Componentes:**  Se utilizó el análisis de la IA para refactorizar bloques de código monolítico en componentes modulares limpios (como el caso de ```FeedbackForm.tsx```), asegurando el cumplimiento de los patrones de diseño de React y la separación de responsabilidades (Separation of Concerns).

* **Pair Programming para Troubleshooting:**  Frente a errores complejos de compilación asíncrona en entornos cruzados (como el bug del Service Worker en Windows) o interrupciones de Web APIs nativas, la IA actuó como pair programmer para acelerar la detección de la causa raíz (Root Cause Analysis) y formular soluciones blindadas.

* **Mejoras de Accesibilidad y UX:** Consultas puntuales sobre las mejores prácticas en el diseño centrado en el usuario para adaptar lógicas de interfaz que abrazaran genuinamente los conceptos de Diseño Universal.

---

## 🔒 Gestión de Variables de Entorno y Seguridad
El proyecto implementa la separación estricta de credenciales utilizando el prefijo ```NEXT_PUBLIC_``` únicamente para aquellas variables que requieren accesibilidad desde el contexto del cliente (Client Components), garantizando portabilidad absoluta entre entornos.

Variables requeridas en el archivo ```.env.local``` y en los secretos de Vercel:

* ```NEXT_PUBLIC_FORMSPREE_URL```: Endpoint de destino asíncrono para el formulario de feedback de usuarios y profesionales.

* ```UPSTASH_REDIS_REST_URL```: URL del cluster serverless de Redis para el contador de instalaciones (Manejado de forma segura del lado del servidor).

* ```UPSTASH_REDIS_REST_TOKEN```: Token de autenticación portador para operaciones de incremento atómico (Manejado en el servidor).
___

<div align="center">

|  Desarrolladora   |   <img width="72" height="72" alt="imagen" src="https://github.com/user-attachments/assets/6ae79453-9c35-453b-aaba-28d8442e5bb5" />                   |
| :------------------- | :----------------------------------------------- |
| **Luciana Quilcate** | **[github](https://github.com/Luma2001)**        |

</div>