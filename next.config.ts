import withPWA from '@ducanh2912/next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // Desactivado en desarrollo para que no te moleste la caché mientras editamos el código
  register: true,
  cacheStartUrl: true,//Fuerza al Service Worker a cachear la nueva start_url (/app-core) de forma prioritaria
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
  }
})(nextConfig);