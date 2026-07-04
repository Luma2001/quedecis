export interface QuickPhrase {
  id: string;
  label: string;
  textToSpeak: string;
}

export interface PhraseCategory {
  id: string;
  name: string;
  phrases: QuickPhrase[];
}

export const initialCategories: PhraseCategory[] = [
  {
    id: "saludos",
    name: "👋 Saludos",
    phrases: [
      { id: "s-1", label: "Hola, soy sordo", textToSpeak: "Hola, soy sordo. Por favor háblame despacio y de frente." },
      { id: "s-2", label: "Muchas gracias", textToSpeak: "Muchas gracias por tu ayuda." },
      { id: "s-3", label: "Buenos días", textToSpeak: "Buenos días, un gusto conocerte." },
      { id: "s-4", label: "¿Cómo estás?", textToSpeak: "Hola, ¿cómo estás?" }
    ]
  },
  {
    id: "tramites",
    name: "📝 Trámites",
    phrases: [
      { id: "t-1", label: "Tengo un turno", textToSpeak: "Tengo un turno programado a esta hora." },
      { id: "t-2", label: "Retirar medicamento", textToSpeak: "Vengo a retirar un medicamento recetado." },
      { id: "t-3", label: "¿Dónde hago el trámite?", textToSpeak: "¿Dónde puedo hacer este trámite?" },
      { id: "t-4", label: "Escribímelo en papel", textToSpeak: "¿Me podrías escribir el precio o dirección en un papel?" }
    ]
  },
  {
    id: "emergencias",
    name: "🚨 Urgencias",
    phrases: [
      { id: "e-1", label: "No me siento bien", textToSpeak: "No me siento muy bien, ¿me podés ayudar?" },
      { id: "e-2", label: "Llamá acompañante", textToSpeak: "Por favor llamá a un acompañante." },
      { id: "e-3", label: "Salida de emergencia", textToSpeak: "¿Dónde está la salida de emergencia?" },
      { id: "e-4", label: "¿Baño accesible?", textToSpeak: "¿Tiene baño accesible?" }
    ]
  }
];





export const quickPhrases: QuickPhrase[] = [
  { 
    id: 'p1', 
    label: '💬 Hola, soy sordo', 
    textToSpeak: 'Hola, soy una persona sorda. Por favor, hable directo al micrófono de mi teléfono para que pueda leerlo.' 
  },
  { 
    id: 'p2', 
    label: '💰 ¿Cuánto cuesta?', 
    textToSpeak: '¿Cuánto cuesta esto, por favor?' 
  },
  { 
    id: 'p3', 
    label: '💳 ¿Aceptás tarjeta?', 
    textToSpeak: '¿Aceptás tarjeta o Mercado Pago?' 
  },
  {
    id: 'p4',
    label: '🏥 Tengo una consulta',
    textToSpeak: 'Hola, vengo por mi turno médico.'
  }
];