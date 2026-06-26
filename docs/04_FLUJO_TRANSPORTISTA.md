# 04 — Flujo del Transportista 🚛

> **Proyecto:** AgroRuta Huánuco  
> **Rol:** Transportista  
> **Rama:** feature/docs

---

## 1. ¿Quién es el Transportista?

El transportista moviliza productos agrícolas entre las zonas de producción y los mercados de Huánuco y otras ciudades. Puede operar con:

- 🚛 Camión de carga
- 🛻 Camioneta o pick-up
- 🏍️ Mototaxi (para zonas de acceso difícil)

Sus principales problemas son:
- No saber qué rutas están bloqueadas antes de partir
- Hacer viajes en vacío por falta de carga disponible
- No poder comunicar retrasos a agricultores y compradores a tiempo

---

## 2. Acceso a la App

```
Pantalla inicial
      │
      ▼
[Botón: Transportista]
      │
      ▼
Registro / Login (Firebase Auth)
      │
      ▼
Dashboard del Transportista
```

---

## 3. Funcionalidades del Transportista (MVP)

### 3.1 Ver Solicitudes de Flete Disponibles
El transportista puede explorar los fletes publicados por agricultores:

| Dato visible | Descripción |
|---|---|
| Origen del flete | Dónde está la carga |
| Destino | Hacia dónde va |
| Fecha y hora | Cuándo necesitan el transporte |
| Peso estimado | Para verificar capacidad |
| Precio ofrecido | Si el agricultor estableció uno |

**Flujo:**
1. Transportista abre su dashboard
2. Ve la lista de fletes disponibles en su zona
3. Toca un flete para ver el detalle
4. Acepta el flete → se notifica al agricultor
5. Coordina punto de encuentro y horario

### 3.2 Reportar Incidencia en Ruta
Esta es la funcionalidad más crítica del transportista. Al ser el actor que está en la carretera, es quien tiene información de primera mano sobre el estado de las rutas.

| Campo | Descripción |
|---|---|
| Tipo de incidencia | Huaico, Derrumbe, Bloqueo social, Accidente, Otro |
| Ubicación | GPS automático o selección en mapa |
| Descripción | Detalle del evento |
| Severidad | Leve, Moderado, Grave (ruta cortada) |
| Foto (opcional) | Evidencia visual |

**Flujo:**
1. Transportista detecta una incidencia
2. Abre la app → toca "Reportar incidencia"
3. Selecciona tipo y llena el formulario
4. El reporte aparece en el mapa en tiempo real
5. Agricultores y compradores ven la alerta

### 3.3 Navegar por el Mapa de Rutas
- Ve el mapa con todas las rutas de Huánuco
- Identifica incidencias reportadas (propias y de otros)
- Planifica ruta alternativa antes de salir

### 3.4 Mis Fletes Activos
- Lista de fletes aceptados
- Estado de cada uno (por recoger, en camino, entregado)
- Historial de trabajos completados

---

## 4. Diagrama de Flujo Detallado

```
[Dashboard Transportista]
        │
        ├─── [Ver fletes disponibles]
        │           │
        │           ├── Filtrar por zona / tipo de vehículo
        │           ├── Ver detalle del flete
        │           └── Aceptar flete → notifica al agricultor
        │
        ├─── [Reportar incidencia]
        │           │
        │           └── Formulario → Firestore → Mapa actualizado en tiempo real
        │
        ├─── [Mis fletes activos]
        │           │
        │           ├── Estado de fletes en curso
        │           └── Historial de fletes completados
        │
        └─── [Ver mapa de rutas]
                    │
                    └── Rutas activas + bloqueos + sugerencias de ruta alternativa
```

---

## 5. Colecciones Firestore del Transportista

```
fletes/
  {id}:
    transportistaId: string
    solicitudId: string          // referencia a solicitudesTransporte
    agricultorId: string
    origen: GeoPoint
    destino: string
    fechaHora: Timestamp
    pesoKg: number
    tipoVehiculo: string
    estado: "aceptado" | "en_camino" | "completado" | "cancelado"
    creadoEn: Timestamp

incidencias/
  {id}:
    reportadoPor: string         // userId del transportista (u otro rol)
    tipo: "huaico" | "derrumbe" | "bloqueo" | "accidente" | "otro"
    descripcion: string
    ubicacion: GeoPoint
    rutaAfectada: string         // nombre de ruta o tramo
    severidad: "leve" | "moderado" | "grave"
    fotoUrl: string (opcional)
    activo: boolean
    creadoEn: Timestamp
    resolvidoEn: Timestamp (opcional)
```

---

## 6. Pantallas Previstas (UI)

| Pantalla | Descripción |
|---|---|
| `TransportistaDashboard` | Panel principal con resumen |
| `FletesDisponibles` | Lista de solicitudes de transporte |
| `DetalleFlete` | Detalle de una solicitud específica |
| `ReportarIncidenciaForm` | Formulario de reporte de incidencia |
| `MisFletes` | Historial y seguimiento de fletes |
| `MapaRutas` | Mapa compartido con todos los roles |

---

## 7. Casos de Uso Clave

### Caso A: Transportista detecta huaico
1. Transportista va por la ruta Tingo María–Huánuco
2. Detecta un huaico que corta la vía
3. Reporta en la app desde su celular
4. El reporte aparece en el mapa
5. Otros transportistas, agricultores y compradores ven la alerta
6. Ruti sugiere ruta alternativa por Panao

### Caso B: Transportista busca carga de regreso
1. Transportista entregó carga en Huánuco
2. Quiere encontrar carga para no regresar vacío
3. Abre la app → ve fletes disponibles en Huánuco hacia su destino de origen
4. Acepta un flete de regreso → optimiza su viaje

---

*Última actualización: Hackathon Clay 2026 — rama `feature/docs`*
