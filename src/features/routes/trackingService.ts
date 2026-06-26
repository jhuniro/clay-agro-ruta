import type { Coordinate } from './routeTypes'

export function interpolate(a: Coordinate, b: Coordinate, t: number): Coordinate {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}

export function generateArc(
  origin: Coordinate,
  destination: Coordinate,
  steps: number = 100
): Coordinate[] {
  const arc: Coordinate[] = []
  for (let i = 0; i <= steps; i++) {
    arc.push(interpolate(origin, destination, i / steps))
  }
  return arc
}

export function animateMarker(
  arc: Coordinate[],
  onPosition: (pos: Coordinate) => void,
  speed: number = 20,
  onComplete?: () => void
): () => void {
  let counter = 0
  let timerId: ReturnType<typeof setTimeout>
  let cancelled = false

  function tick() {
    if (cancelled) return
    onPosition(arc[counter])
    counter++
    if (counter < arc.length) {
      timerId = setTimeout(tick, speed)
    } else {
      onComplete?.()
    }
  }

  tick()
  return () => { cancelled = true; clearTimeout(timerId) }
}
