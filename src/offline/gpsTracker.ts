import { saveLocation, getUnsyncedLocations, markAsSynced, getPendingCount } from './db'
import { getIsOnline, onConnectivityChange } from './connectivity'

export interface GpsState {
  lat: number
  lng: number
  timestamp: number
  isOnline: boolean
  pendingCount: number
}

type GpsCallback = (state: GpsState) => void

const INTERVAL_MS = 15_000 // 15 seconds
const SYNC_INTERVAL_MS = 5_000 // 5 seconds when online

let watchId: number | null = null
let syncTimer: ReturnType<typeof setInterval> | null = null
let listeners: Set<GpsCallback> = new Set()
let latestState: GpsState = {
  lat: -9.9333,
  lng: -76.25,
  timestamp: Date.now(),
  isOnline: navigator.onLine,
  pendingCount: 0,
}

function emit(state: GpsState) {
  latestState = state
  listeners.forEach((fn) => fn(state))
}

async function syncPending(): Promise<void> {
  if (!getIsOnline()) return
  const pending = await getUnsyncedLocations()
  if (pending.length === 0) return

  const ids = pending.map((l) => l.id!).filter((id) => id !== undefined)

  // In real app, POST to server here:
  // await fetch('/api/locations', { method: 'POST', body: JSON.stringify(pending) })

  await markAsSynced(ids)
  emit({ ...latestState, pendingCount: await getPendingCount() })
}

function handlePosition(pos: GeolocationPosition) {
  const { latitude: lat, longitude: lng } = pos.coords
  const timestamp = Date.now()

  saveLocation({ lat, lng, timestamp }).then(async () => {
    const pendingCount = await getPendingCount()
    const state: GpsState = {
      lat,
      lng,
      timestamp,
      isOnline: getIsOnline(),
      pendingCount,
    }
    emit(state)

    // Auto-sync if online
    if (getIsOnline()) syncPending()
  })
}

function handlePositionError(_err: GeolocationPositionError) {
  // Silently keep last known position
}

export function startTracking(): void {
  if (watchId !== null) return

  // Start GPS watch (continuous high accuracy)
  watchId = navigator.geolocation.watchPosition(
    handlePosition,
    handlePositionError,
    { enableHighAccuracy: true, maximumAge: INTERVAL_MS, timeout: 30_000 },
  )

  // Sync pending locations periodically when online
  syncTimer = setInterval(() => {
    if (getIsOnline()) syncPending()
  }, SYNC_INTERVAL_MS)

  // React to connectivity changes
  onConnectivityChange((online) => {
    emit({ ...latestState, isOnline: online })
    if (online) syncPending()
  })
}

export function stopTracking(): void {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId)
    watchId = null
  }
  if (syncTimer !== null) {
    clearInterval(syncTimer)
    syncTimer = null
  }
}

export function subscribeGps(cb: GpsCallback): () => void {
  listeners.add(cb)
  cb(latestState)
  return () => listeners.delete(cb)
}

export function getLatestState(): GpsState {
  return latestState
}
