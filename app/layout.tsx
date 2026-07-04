import type { Metadata } from "next";

import "./styles/globals.css";



export const metadata: Metadata = {
  title: "¿Qué Decís? - Comunicación Inclusiva | Voz a Texto y Texto a Voz",
  description: "MVP de asistencia de comunicación offline para mostradores de atención. '¿Qué Decís?', la aplicación móvil accesible y offline que rompe barreras de comunicación para personas sordas, hipoacúsicas y oyentes en consultorios, bancos, comercios y espacios públicos.",
  keywords: "asistente de comunicación, sordera, hipoacusia, inclusión, accesibilidad, voz a texto, texto a voz, comunicación accesible, PWA, WCAG 2.2 AA",
  authors: [{ name: "Luma2001" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "¿Qué Decís? - Comunicación Inclusiva para Hipoacusia y Sordera",
    description: "Aplicación móvil accesible de alta conversión voz a texto y texto a voz que permite comunicarse con personas oyentes sin barreras.",
    url: "https://quedecis.vercel.app",
    siteName: "¿Qué Decís?",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "¿Qué Decís? - Comunicación Inclusiva",
    description: "Aplicación móvil accesible y offline que rompe barreras de comunicación para personas sordas e hipoacúsicas.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={` h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
