import { RutiFaqItem, RutiExplanation } from '../types/rutiTypes';

export const rutiFaq: RutiFaqItem[] = [
  {
    keywords: ['vender', 'cosecha', 'producto', 'publicar', 'agricultor', 'cultivo'],
    answer: 'Para vender tu cosecha, ingresa como Agricultor, presiona el botón "Vender Cosecha" (+) en tu panel, y completa la información solicitada: nombre del producto, cantidad disponible, unidad de medida, precio y tu ubicación de recojo.'
  },
  {
    keywords: ['comprar', 'adquirir', 'lote', 'comprador', 'buscar'],
    answer: 'Para comprar un lote agrícola, ingresa como Comprador, explora el listado de "Productos Disponibles", selecciona la oferta que te interese y haz clic en "Comprar Lote".'
  },
  {
    keywords: ['transportar', 'flete', 'viaje', 'conductor', 'transportista', 'ruta'],
    answer: 'Si eres Transportista, dirígete a tu panel para ver los "Envíos Pendientes". Podrás aceptar fletes disponibles, ver los detalles de origen/destino y actualizar el estado del viaje mientras conduces.'
  },
  {
    keywords: ['huaico', 'derrumbe', 'bloqueo', 'incidencia', 'alerta', 'pista', 'carretera', 'tránsito'],
    answer: 'Cualquier usuario, en especial los transportistas en ruta, puede reportar un bloqueo, huaico o derrumbe. Presiona "Reportar Incidencia", detalla el tipo, gravedad y ubicación para alertar a toda la comunidad en tiempo real.'
  },
  {
    keywords: ['ruti', 'ayuda', 'quien eres', 'bot', 'asistente'],
    answer: 'Hola, soy Ruti, tu asistente virtual agrícola. Te ayudo a resolver dudas sobre AgroRuta Huánuco, los estados de tus envíos y las condiciones de las carreteras en la región.'
  },
  {
    keywords: ['flujo', 'funcionamiento', 'proceso', 'pasos'],
    answer: 'El flujo de AgroRuta es simple: 1. El agricultor publica su cosecha -> 2. El comprador adquiere el lote -> 3. Se genera un envío y el transportista acepta llevarlo -> 4. Se monitorea la ruta y posibles bloqueos hasta la entrega exitosa.'
  }
];

export const rutiRoleExplanations: RutiExplanation[] = [
  {
    topic: 'Agricultor (FARMER)',
    description: 'El productor local en las provincias de Huánuco. Su meta es publicar cosechas y asegurar que los compradores y transportistas encuentren su mercadería a tiempo.',
    steps: [
      'Registrar su número celular.',
      'Publicar cosechas disponibles en el sistema.',
      'Coordinar el recojo con el transportista asignado.'
    ]
  },
  {
    topic: 'Comprador (BUYER)',
    description: 'Comercios, restaurantes o acopiadores de mercados de Huánuco o Lima que compran productos a precio justo directamente del agricultor.',
    steps: [
      'Buscar lotes de papa, granadilla, café, entre otros.',
      'Comprar la cosecha, lo que activa automáticamente una alerta de envío pendiente.',
      'Monitorear el trayecto de la mercadería por la carretera.'
    ]
  },
  {
    topic: 'Transportista (DRIVER)',
    description: 'Conductores de camiones y furgones que garantizan el traslado de alimentos esquivando bloqueos mediante alertas viales activas.',
    steps: [
      'Visualizar fletes disponibles en espera de transporte.',
      'Aceptar el viaje e iniciar el recojo.',
      'Reportar incidencias en el camino (huaicos, derrumbes) para actualizar el estado vial.'
    ]
  }
];

export const rutiStatusExplanations: RutiExplanation[] = [
  {
    topic: 'Estados de la Cosecha/Orden (ProductOrder)',
    description: 'Muestra el ciclo de vida de un lote agrícola publicado por el agricultor.',
    steps: [
      'DISPONIBLE: La cosecha está publicada y visible para cualquier comprador.',
      'VENDIDO_ESPERANDO_TRANSPORTE: Un comprador adquirió el lote; el sistema crea un envío en busca de chofer.',
      'TRANSPORTISTA_ASIGNADO: Un conductor aceptó llevar el lote al destino.',
      'EN_RUTA: El transportista está trasladando el lote.',
      'ENTREGADO: El comprador recibió los productos conforme.',
      'CANCELADO: La publicación u orden fue anulada.'
    ]
  },
  {
    topic: 'Estados del Envío (Shipment)',
    description: 'Detalla las fases logísticas del flete a cargo del transportista.',
    steps: [
      'PENDIENTE_TRANSPORTE: El lote está vendido y requiere un chofer.',
      'TRANSPORTISTA_ASIGNADO: Chofer asignado, preparándose para ir al punto de recojo.',
      'EN_RUTA_RECOJO: El chofer viaja hacia la chacra del agricultor.',
      'CARGA_RECOGIDA: Los productos ya están estibados en el vehículo.',
      'EN_RUTA_ENTREGA: Chofer viajando hacia el almacén del comprador.',
      'ALERTA_RUTA: Se detectó una alerta vial (derrumbes o huaicos) en el trayecto activo.',
      'ENTREGADO: Carga descargada y entrega completada.',
      'CANCELADO: El transporte del lote fue cancelado.'
    ]
  }
];

export const rutiRoadExplanations: RutiExplanation[] = [
  {
    topic: 'Condición de las Rutas (RouteStatus)',
    description: 'Establece el nivel de transitabilidad en una vía específica basándose en reportes comunitarios.',
    steps: [
      'LIBRE: Sin reportes graves de incidencias. Tránsito regular.',
      'RIESGO: Presencia de lluvias intensas, accidentes o derrumbes leves. Se recomienda precaución.',
      'BLOQUEADA: Huaico de gran tamaño, paro de transportistas o colapso de plataforma. Tránsito totalmente interrumpido.'
    ]
  }
];
