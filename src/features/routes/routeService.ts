import type { Route, RouteStatus, Coordinate } from './routeTypes'

const ROUTE_COLORS: Record<RouteStatus, string> = {
  LIBRE: '#22c55e',
  RIESGO: '#eab308',
  BLOQUEADA: '#ef4444',
}

export function getRouteColor(status: RouteStatus): string {
  return ROUTE_COLORS[status]
}

export function getRouteForFarmer(routes: Route[]): Route | undefined {
  return routes.find((r) => r.id === 'route-005')
}

export function getRouteForBuyer(routes: Route[]): Route | undefined {
  return routes.find((r) => r.id === 'route-001')
}

export function getRoutesForDriver(routes: Route[]): { pickup: Route; delivery: Route } {
  return {
    pickup: routes.find((r) => r.id === 'route-001')!,
    delivery: routes.find((r) => r.id === 'route-005')!,
  }
}

export function getCenter(a: Coordinate, b: Coordinate): Coordinate {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
}

export function getZoomForRoute(a: Coordinate, b: Coordinate): number {
  const lngDiff = Math.abs(a[0] - b[0])
  const latDiff = Math.abs(a[1] - b[1])
  const maxDiff = Math.max(lngDiff, latDiff)
  if (maxDiff > 0.5) return 10
  if (maxDiff > 0.1) return 12
  if (maxDiff > 0.05) return 13
  return 14
}
