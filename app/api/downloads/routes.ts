
import { NextResponse } from 'next/server';
// Aquí importarías tu cliente de base de datos, por ejemplo Vercel KV o Supabase
// import { kv } from '@vercel/kv'; 


  const totalDescargas = 148; // Simulación base para el ejemplo de código
  
export async function GET() {
  try {
    // 1. Buscamos el número actual en la base de datos
    // const totalDescargas = await kv.get('total_descargas') || 0;
  

    return NextResponse.json({ count: totalDescargas });
  } catch (error) {
    return NextResponse.json({ error : 'Error al leer la base de datos' }, { status: 500 });
  }
}

export async function POST() {
  try {
    // 2. Incrementamos el contador en +1 en la base de datos de forma segura
    // const nuevoTotal = await kv.incr('total_descargas');
    const nuevoTotal = totalDescargas + 1; // Simulación base

    return NextResponse.json({ count: nuevoTotal });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar el contador' }, { status: 500 });
  }
}