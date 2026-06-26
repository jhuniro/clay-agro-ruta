import type { RouteTip, RouteFAQ } from '../features/routes/routeTypes'

export const routeTips: RouteTip[] = [
  { tip: 'Revisa el estado de ruta antes de vender o comprar.' },
  { tip: 'Una ruta libre permite avanzar con normalidad.' },
  { tip: 'Una ruta en riesgo puede tener demoras por lluvia o vía lenta.' },
  { tip: 'Una ruta bloqueada no se recomienda para traslado.' },
  { tip: 'Los reportes de transportistas ayudan a actualizar las alertas.' },
  { tip: 'Si hay huaico o derrumbe, busca una ruta alternativa.' },
  { tip: 'Las alertas ayudan a reducir pérdidas de productos agrícolas.' },
]

export const routeFAQs: RouteFAQ[] = [
  {
    question: '¿Qué significa ruta libre?',
    answer: 'Significa que no hay bloqueos reportados y el traslado puede avanzar con normalidad.',
  },
  {
    question: '¿Qué significa ruta en riesgo?',
    answer: 'Significa que puede haber demora por lluvia, vía lenta o alerta cercana.',
  },
  {
    question: '¿Qué significa ruta bloqueada?',
    answer: 'Significa que existe un huaico, derrumbe o bloqueo que puede impedir el traslado.',
  },
  {
    question: '¿Quién reporta las incidencias?',
    answer: 'Principalmente los transportistas, porque están en la ruta y pueden informar problemas en tiempo real.',
  },
  {
    question: '¿El mapa usa GPS real?',
    answer: 'Para el MVP puede mostrar ubicaciones simuladas. Luego puede integrarse GPS real.',
  },
  {
    question: '¿Qué hago si una ruta está bloqueada?',
    answer: 'Se recomienda esperar actualización o elegir una ruta alternativa.',
  },
]
