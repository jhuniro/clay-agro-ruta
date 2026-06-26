# 06 — Arquitectura Firebase 🔥

> **Proyecto:** AgroRuta Huánuco  
> **Servicio:** Firebase (Auth + Firestore)  
> **Rama:** feature/docs

---

## 1. Servicios Firebase Utilizados

| Servicio | Uso en AgroRuta |
|---|---|
| **Firebase Auth** | Registro e inicio de sesión de usuarios |
| **Firestore** | Base de datos en tiempo real (cosechas, fletes, incidencias) |
| **Firebase Storage** | Almacenamiento de fotos de cosechas e incidencias (futuro) |
| **Firebase Hosting** | Despliegue de la PWA (futuro) |

---

## 2. Estructura de Colecciones Firestore

```
firestore/
│
├── usuarios/
│   └── {userId}/
│       ├── nombre: string
│       ├── rol: "agricultor" | "comprador" | "transportista"
│       ├── telefono: string
│       ├── localidad: string
│       ├── departamento: "Huánuco"
│       └── creadoEn: Timestamp
│
├── cosechas/
│   └── {cosechaId}/
│       ├── agricultorId: string         → ref a usuarios/{userId}
│       ├── producto: string
│       ├── cantidad: number
│       ├── unidad: "kg" | "quintal" | "caja"
│       ├── precio: number               → precio por unidad en S/
│       ├── ubicacion: GeoPoint
│       ├── localidad: string
│       ├── fechaDisponible: Timestamp
│       ├── fotoUrl: string (opcional)
│       ├── estado: "activo" | "vendido" | "vencido"
│       └── creadoEn: Timestamp
│
├── pedidosCompra/
│   └── {pedidoId}/
│       ├── compradorId: string          → ref a usuarios/{userId}
│       ├── producto: string
│       ├── cantidadKg: number
│       ├── precioOfrecido: number
│       ├── fechaLimite: Timestamp
│       ├── lugarEntrega: string
│       ├── coordenadasEntrega: GeoPoint (opcional)
│       ├── observaciones: string
│       ├── estado: "activo" | "coordinado" | "completado" | "cancelado"
│       └── creadoEn: Timestamp
│
├── solicitudesTransporte/
│   └── {solicitudId}/
│       ├── agricultorId: string         → ref a usuarios/{userId}
│       ├── cosechaId: string (opcional) → ref a cosechas/{cosechaId}
│       ├── origen: GeoPoint
│       ├── origenNombre: string
│       ├── destino: string
│       ├── destinoCoordenadas: GeoPoint (opcional)
│       ├── fechaHora: Timestamp
│       ├── pesoKg: number
│       ├── observaciones: string
│       ├── tipoVehiculoRequerido: string (opcional)
│       ├── estado: "pendiente" | "aceptado" | "completado" | "cancelado"
│       ├── transportistaId: string      → se llena cuando acepta
│       └── creadoEn: Timestamp
│
├── fletes/
│   └── {fleteId}/
│       ├── transportistaId: string      → ref a usuarios/{userId}
│       ├── solicitudId: string          → ref a solicitudesTransporte/{id}
│       ├── agricultorId: string
│       ├── origen: GeoPoint
│       ├── destino: string
│       ├── fechaHora: Timestamp
│       ├── pesoKg: number
│       ├── tipoVehiculo: string
│       ├── estado: "aceptado" | "en_camino" | "completado" | "cancelado"
│       └── creadoEn: Timestamp
│
└── incidencias/
    └── {incidenciaId}/
        ├── reportadoPor: string         → ref a usuarios/{userId}
        ├── tipo: "huaico" | "derrumbe" | "bloqueo" | "accidente" | "otro"
        ├── descripcion: string
        ├── ubicacion: GeoPoint
        ├── rutaAfectada: string         → nombre del tramo/ruta
        ├── severidad: "leve" | "moderado" | "grave"
        ├── fotoUrl: string (opcional)
        ├── activo: boolean
        ├── creadoEn: Timestamp
        └── resolvidoEn: Timestamp (opcional)
```

---

## 3. Reglas de Seguridad Firestore (Base)

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Usuarios: solo el propio usuario puede leer/escribir su perfil
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Cosechas: cualquier usuario autenticado puede leer
    // Solo el agricultor dueño puede crear/editar/borrar
    match /cosechas/{cosechaId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null
        && request.auth.uid == resource.data.agricultorId;
    }

    // Pedidos de compra: cualquier autenticado puede leer
    // Solo el comprador dueño puede crear/editar/borrar
    match /pedidosCompra/{pedidoId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null
        && request.auth.uid == resource.data.compradorId;
    }

    // Solicitudes de transporte: cualquier autenticado puede leer
    // El agricultor crea, el transportista puede actualizar estado
    match /solicitudesTransporte/{solicitudId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }

    // Incidencias: cualquier autenticado puede leer y crear
    // Solo el reportador puede editar
    match /incidencias/{incidenciaId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null
        && request.auth.uid == resource.data.reportadoPor;
    }
  }
}
```

---

## 4. Configuración Firebase en el Proyecto

```typescript
// src/services/firebase.ts (referencia)
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
```

**Variables de entorno requeridas (`.env.local`):**
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

> ⚠️ **Nunca commitear `.env.local` al repositorio.** Está incluido en `.gitignore`.

---

## 5. Flujo de Autenticación

```
Usuario abre app
      │
      ▼
¿Tiene sesión activa? (Firebase Auth persistence)
      │
   ┌──┴──┐
  Sí    No
  │      │
  ▼      ▼
Dashboard  Pantalla Login/Registro
           │
           ├── Registro nuevo → crea doc en usuarios/{uid}
           └── Login existente → verifica rol → redirige dashboard
```

---

## 6. Consultas Clave (Ejemplos)

```typescript
// Obtener cosechas activas
const cosechasActivas = query(
  collection(db, 'cosechas'),
  where('estado', '==', 'activo'),
  orderBy('creadoEn', 'desc')
)

// Obtener incidencias activas para el mapa
const incidenciasActivas = query(
  collection(db, 'incidencias'),
  where('activo', '==', true),
  orderBy('creadoEn', 'desc')
)

// Fletes disponibles (sin transportista asignado)
const fletesDisponibles = query(
  collection(db, 'solicitudesTransporte'),
  where('estado', '==', 'pendiente'),
  orderBy('fechaHora', 'asc')
)
```

---

*Última actualización: Hackathon Clay 2026 — rama `feature/docs`*
