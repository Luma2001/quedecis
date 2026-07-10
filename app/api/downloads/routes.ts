// app/api/downloads/route.ts
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Upstash lee automáticamente las credenciales que Vercel te inyectó al hacer clic
const redis = Redis.fromEnv();
const COUNTER_KEY = 'queDecis_total_instalaciones';

export async function GET() {
  try {
    // 1. Buscamos el valor actual en la nube de Upstash. Si no existe, devolvemos 0
    const totalInstalaciones = await redis.get<number>(COUNTER_KEY) || 0;
    
    return NextResponse.json({ count: totalInstalaciones });
  } catch (error) {
    console.error('Error leyendo de Upstash:', error);
    return NextResponse.json({ error: 'Error de servidor' }, { status: 500 });
  }
}

export async function POST() {
  try {
    // 2. Ejecutamos la función atómica 'incr' de Redis
    // Esto suma +1 directamente en la nube de forma segura
    const nuevoTotal = await redis.incr(COUNTER_KEY);

    return NextResponse.json({ count: nuevoTotal });
  } catch (error) {
    console.error('Error incrementando en Upstash:', error);
    return NextResponse.json({ error: 'Error de servidor' }, { status: 500 });
  }
}