# 02 — Flujo del Agricultor 🌱

> **Proyecto:** AgroRuta Huánuco  
> **Rol:** Agricultor  
> **Rama:** feature/docs

---

## 1. ¿Quién es el Agricultor?

El agricultor es el productor directo de la región Huánuco. Cultiva productos como papa, maíz, café, cacao, frutas y hortalizas. Sus principales problemas son:

- No encontrar compradores a tiempo antes de que se pierda la cosecha
- No conseguir transporte cuando las rutas están bloqueadas
- No saber si sus rutas habituales están accesibles

---

## 2. Acceso a la App

```
Pantalla inicial
      │
      ▼
[Botón: Agricultor]
      │
      ▼
Registro / Login (Firebase Auth)
      │
      ▼
Dashboard del Agricultor
```

---

## 3. Funcionalidades del Agricultor (MVP)

### 3.1 Publicar Cosecha
El agricultor puede registrar su producción disponible:

| Campo | Descripción |
|---|---|
| Producto | Ej: Papa amarilla, Maíz |
| Cantidad | En kg o quintales |
| Precio | Por kg o por quintal |
| Ubicación | Coordenadas GPS o nombre de localidad |
| Fecha disponible | Desde cuándo está lista la cosecha |
| Foto (opcional) | Imagen del producto |

**Flujo:**
1. Agricultor abre su dashboard
2. Toca "Publicar cosecha"
3. Llena el formulario
4. Confirma → se guarda en Firestore (`colección: cosechas`)
5. Compradores y transportistas pueden ver la publicación

### 3.2 Solicitar Transporte
El agricultor puede pedir un flete para mover su cosecha:

| Campo | Descripción |
|---|---|
| Origen | Ubicación actual de la cosecha |
| Destino | Mercado o dirección del comprador |
| Fecha y hora | Cuándo necesita el transporte |
| Peso estimado | Para que el transportista calcule capacidad |
| Observaciones | Ej: "Camino afirmado", "Solo mototaxi puede entrar" |

**Flujo:**
1. Agricultor toca "Solicitar transporte"
2. Llena el formulario de flete
3. Transportistas disponibles reciben la solicitud
4. Agricultor recibe notificación cuando alguien acepta

### 3.3 Ver Estado de Rutas
- Accede al mapa con rutas activas e incidencias
- Ve si la ruta hacia su mercado está bloqueada
- Puede ver rutas alternativas sugeridas

### 3.4 Reportar Incidencia
- El agricultor puede reportar un bloqueo, huaico o derrumbe
- El reporte aparece en el mapa para todos los usuarios

---

## 4. Diagrama de Flujo Detallado

```
[Dashboard Agricultor]
        │
        ├─── [Mis cosechas publicadas]
        │           │
        │           ├── Ver mis publicaciones activas
        │           ├── Editar publicación
        │           └── Eliminar publicación
        │
        ├─── [Publicar nueva cosecha]
        │           │
        │           └── Formulario → Firestore → Visible para compradores
        │
        ├─── [Solicitar transporte]
        │           │
        │           └── Formulario flete → Firestore → Visible para transportistas
        │
        ├─── [Ver mapa de rutas]
        │           │
        │           └── Leaflet + OpenStreetMap con incidencias en tiempo real
        │
        └─── [Reportar incidencia]
                    │
                    └── Tipo + Descripción + Ubicación → Firestore → Mapa
```

---

## 5. Colecciones Firestore del Agricultor

```
cosechas/
  {id}:
    agricultorId: string
    producto: string
    cantidad: number
    unidad: string         // "kg" | "quintal"
    precio: number
    ubicacion: GeoPoint
    localidad: string
    fechaDisponible: Timestamp
    fotoUrl: string (opcional)
    estado: "activo" | "vendido" | "vencido"
    creadoEn: Timestamp

solicitudesTransporte/
  {id}:
    agricultorId: string
    cosechaId: string (opcional)
    origen: GeoPoint
    destino: string
    fechaHora: Timestamp
    pesoKg: number
    observaciones: string
    estado: "pendiente" | "aceptado" | "completado"
    transportistaId: string (cuando se acepta)
```

---

## 6. Pantallas Previstas (UI)

| Pantalla | Descripción |
|---|---|
| `AgricultorDashboard` | Panel principal con resumen de actividad |
| `PublicarCosechaForm` | Formulario de nueva cosecha |
| `SolicitarTransporteForm` | Formulario de solicitud de flete |
| `MisCosechas` | Lista de publicaciones del agricultor |
| `MapaRutas` | Mapa compartido con todos los roles |

---

## 7. Casos de Uso Clave

### Caso A: Huaico cierra la ruta
1. Transportista reporta el huaico en el mapa
2. Agricultor ve la alerta en su dashboard
3. Ruti (asistente) sugiere rutas alternativas
4. Agricultor coordina con otro transportista por ruta diferente

### Caso B: Cosecha próxima a perderse
1. Agricultor publica cosecha con urgencia
2. Compradores cercanos reciben notificación
3. Se coordina compra directa con recojo en finca

---

*Última actualización: Hackathon Clay 2026 — rama `feature/docs`*
