export type RutiMood = 'inactive' | 'happy' | 'thinking' | 'explaining' | 'waiting' | 'excited'

export interface RutiMessage {
  mood: RutiMood
  text: string
}

export const MOOD_EMOJI: Record<RutiMood, string> = {
  inactive: '🤖',
  happy: '😊',
  thinking: '🤔',
  explaining: '💡',
  waiting: '👋',
  excited: '🚀',
}

export const GREETING: RutiMessage = {
  mood: 'happy',
  text: '¡Hola! Soy Ruti, tu asistente en AgroRuta Huánuco. Te ayudaré a entender la app paso a paso.',
}

export const INACTIVE_MSG: RutiMessage = {
  mood: 'inactive',
  text: 'Estoy aquí si necesitas ayuda.',
}

export const TUTORIAL_INTRO: RutiMessage = {
  mood: 'explaining',
  text: 'Voy a guiarte por esta pantalla paso a paso. Presiona "Siguiente" cuando estés listo.',
}

export const QUESTION_PROMPT: RutiMessage = {
  mood: 'waiting',
  text: 'Escribe tu duda y te responderé con una explicación rápida.',
}

export const MINIMIZE_MSG: RutiMessage = {
  mood: 'inactive',
  text: 'Me quedo aquí por si necesitas ayuda.',
}

export const DONT_UNDERSTAND: RutiMessage = {
  mood: 'thinking',
  text: 'No estoy seguro de entender tu pregunta. Puedo iniciar un tutorial para explicarte esta pantalla paso a paso.',
}

export const TIPS: Record<string, string[]> = {
  home: [
    'Elige tu rol para continuar.',
    'AgroRuta conecta agricultores, compradores y transportistas.',
    'El proyecto ayuda a reducir pérdidas por bloqueos y retrasos.',
    'Presiona Tutorial si quieres una explicación paso a paso.',
  ],
  farmer: [
    'Publica tu cosecha desde el botón "+ Vender Cosecha".',
    'Revisa las alertas antes de aceptar una ruta.',
    'Tus envíos aparecerán en "Mis Envíos".',
    'Cuando un comprador acepte tu lote, se buscará transporte.',
  ],
  buyer: [
    'Puedes buscar productos disponibles.',
    'También puedes publicar un pedido.',
    'Revisa el estado de ruta antes de comprar.',
    'El seguimiento aparecerá cuando se asigne transporte.',
  ],
  transporter: [
    'La bolsa de cargas muestra fletes disponibles.',
    'Revisa origen, destino y estado de ruta.',
    'Acepta solo cargas que puedas transportar.',
    'Puedes reportar incidencias viales.',
  ],
}

export const FAQ: Record<string, { q: string; a: string }[]> = {
  home: [
    { q: '¿Qué es AgroRuta?', a: 'AgroRuta conecta agricultores, compradores y transportistas para reducir pérdidas por bloqueos y retrasos en rutas agrícolas.' },
  ],
  farmer: [
    { q: '¿Cómo vendo mi cosecha?', a: 'Entra como agricultor, presiona "+ Vender Cosecha" y completa producto, cantidad, precio y ubicación.' },
  ],
  buyer: [
    { q: '¿Cómo compro un producto?', a: 'Entra como comprador, revisa productos disponibles, verifica la ruta y presiona "Comprar lote".' },
  ],
  transporter: [
    { q: '¿Cómo acepto un flete?', a: 'Entra como transportista, revisa la bolsa de cargas y presiona "Aceptar flete".' },
    { q: '¿Qué significa ruta bloqueada?', a: 'Significa que hay un huaico, derrumbe, bloqueo o problema que puede retrasar el traslado.' },
    { q: '¿Puedo contactar por WhatsApp?', a: 'Sí. AgroRuta permite abrir WhatsApp para coordinar directamente con agricultor, comprador o transportista.' },
  ],
}

export const TUTORIAL_STEPS: Record<string, string[]> = {
  home: [
    'Bienvenido a AgroRuta Huánuco.',
    'Selecciona tu rol: Agricultor, Comprador o Transportista.',
    'Cada rol tiene una pantalla con funciones específicas.',
    'Puedes volver a esta pantalla en cualquier momento.',
  ],
  farmer: [
    'Esta es tu pantalla de Agricultor.',
    'Puedes ver alertas viales activas.',
    'Publica tu cosecha con el botón "+ Vender Cosecha".',
    'Tus envíos aparecen en "Mis Envíos".',
  ],
  buyer: [
    'Esta es tu pantalla de Comprador.',
    'Busca productos disponibles por categoría.',
    'Publica un pedido si no encuentras lo que necesitas.',
    'Verifica el estado de ruta antes de comprar.',
  ],
  transporter: [
    'Esta es tu pantalla de Transportista.',
    'Revisa la bolsa de cargas disponibles.',
    'Acepta fletes verificando origen, destino y ruta.',
    'Reporta incidencias viales desde tu pantalla.',
  ],
}
