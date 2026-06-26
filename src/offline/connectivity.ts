type Listener = (online: boolean) => void

const listeners: Set<Listener> = new Set()
let isOnline = navigator.onLine

function emit() {
  const current = navigator.onLine
  if (current !== isOnline) {
    isOnline = current
    listeners.forEach((fn) => fn(current))
  }
}

window.addEventListener('online', emit)
window.addEventListener('offline', emit)

export function onConnectivityChange(fn: Listener): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function getIsOnline(): boolean {
  return navigator.onLine
}
