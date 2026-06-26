import type { Route } from './routeTypes'

interface RoleRoute {
  id: string
  label: string
  origin: string
  destination: string
  route: Route
}

export function getFarmerRoutes(routes: Route[]): RoleRoute[] {
  const ruta = routes.find((r) => r.id === 'route-005')
  if (!ruta) return []

  return [
    {
      id: 'farmer-route-1',
      label: 'Envío al mercado',
      origin: 'Tu parcela',
      destination: ruta.destination,
      route: { ...ruta, name: 'Tu parcela - Mercado de Productores', origin: 'Tu parcela' },
    },
  ]
}

export function getBuyerRoutes(routes: Route[]): RoleRoute[] {
  const ruta = routes.find((r) => r.id === 'route-001')
  if (!ruta) return []

  return [
    {
      id: 'buyer-route-1',
      label: 'Recepción de producto',
      origin: 'Mercado de Productores',
      destination: 'Agricultor (Huánuco)',
      route: {
        ...ruta,
        name: 'Mercado - Agricultor (Huánuco)',
        origin: 'Mercado de Productores',
        destination: 'Huánuco',
      },
    },
  ]
}

export function getTransporterRoutes(routes: Route[]): RoleRoute[] {
  const r1 = routes.find((r) => r.id === 'route-001')
  const r2 = routes.find((r) => r.id === 'route-005')
  const result: RoleRoute[] = []

  if (r1) {
    result.push({
      id: 'transporter-route-1',
      label: 'Recogida',
      origin: 'Agricultor (Huánuco)',
      destination: 'Tu ubicación',
      route: {
        ...r1,
        name: 'Recogida: Agricultor - Tu ubicación',
        status: 'LIBRE',
        recommendation: 'Ruta libre para recoger la cosecha.',
      },
    })
  }

  if (r2) {
    result.push({
      id: 'transporter-route-2',
      label: 'Entrega',
      origin: 'Tu ubicación',
      destination: 'Mercado de Productores',
      route: {
        ...r2,
        name: 'Entrega: Tu ubicación - Mercado',
        origin: 'Tu ubicación',
        status: 'RIESGO',
        incidentType: 'VIA_LENTA',
        recommendation: 'Posible tránsito lento en la zona del mercado.',
      },
    })
  }

  return result
}
