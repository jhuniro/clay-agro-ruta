const DB_NAME = 'agroruta-gps'
const DB_VERSION = 1
const STORE = 'locations'

export interface StoredLocation {
  id?: number
  lat: number
  lng: number
  timestamp: number
  synced: boolean
}

let dbInstance: IDBDatabase | null = null

function openDB(): Promise<IDBDatabase> {
  if (dbInstance) return Promise.resolve(dbInstance)

  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)

    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, {
          keyPath: 'id',
          autoIncrement: true,
        })
        store.createIndex('synced', 'synced', { unique: false })
        store.createIndex('timestamp', 'timestamp', { unique: false })
      }
    }

    req.onsuccess = () => {
      dbInstance = req.result
      resolve(req.result)
    }

    req.onerror = () => reject(req.error)
  })
}

export async function saveLocation(loc: Omit<StoredLocation, 'id' | 'synced'>): Promise<number> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    const store = tx.objectStore(STORE)
    const record: StoredLocation = { ...loc, synced: false }
    const req = store.add(record)
    req.onsuccess = () => resolve(req.result as number)
    req.onerror = () => reject(req.error)
  })
}

export async function getUnsyncedLocations(): Promise<StoredLocation[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const store = tx.objectStore(STORE)
    const index = store.index('synced')
    const req = index.getAll(IDBKeyRange.only(0))
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function markAsSynced(ids: number[]): Promise<void> {
  const db = await openDB()
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, 'readwrite')
    const store = tx.objectStore(STORE)
    let done = 0
    if (ids.length === 0) return resolve()
    ids.forEach((id) => {
      const req = store.get(id)
      req.onsuccess = () => {
        const record = req.result as StoredLocation | undefined
        if (record) {
          record.synced = true
          store.put(record)
        }
        done++
        if (done === ids.length) resolve()
      }
      req.onerror = () => {
        done++
        if (done === ids.length) resolve()
      }
    })
  })
}

export async function getAllLocations(): Promise<StoredLocation[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const store = tx.objectStore(STORE)
    const req = store.getAll()
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function getPendingCount(): Promise<number> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const store = tx.objectStore(STORE)
    const index = store.index('synced')
    const req = index.count(IDBKeyRange.only(0))
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}
