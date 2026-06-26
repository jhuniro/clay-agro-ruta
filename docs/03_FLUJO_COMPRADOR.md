# 03 — Flujo del Comprador 🛒

> **Proyecto:** AgroRuta Huánuco  
> **Rol:** Comprador  
> **Rama:** feature/docs

---

## 1. ¿Quién es el Comprador?

El comprador es quien adquiere productos agrícolas de la región Huánuco. Puede ser:

- 🏪 Comerciante de mercado local
- 🏨 Restaurante o negocio gastronómico
- 🏙️ Empresa distribuidora de Lima u otras ciudades
- 👤 Consumidor final que compra directamente al productor

Sus principales problemas son:
- No saber si los productos estarán disponibles tras un bloqueo
- No poder coordinar entregas cuando las rutas están cortadas
- No tener contacto directo con agricultores de la zona

---

## 2. Acceso a la App

```
Pantalla inicial
      │
      ▼
[Botón: Comprador]
      │
      ▼
Registro / Login (Firebase Auth)
      │
      ▼
Dashboard del Comprador
```

---

## 3. Funcionalidades del Comprador (MVP)

### 3.1 Buscar Productos Disponibles
El comprador puede explorar las cosechas publicadas por agricultores:

| Filtro | Descripción |
|---|---|
| Producto | Buscar por tipo de cultivo |
| Zona / Localidad | Filtrar por origen del producto |
| Precio | Rango de precio por kg o quintal |
| Disponibilidad | Fecha desde la que está disponible |

**Flujo:**
1. Comprador abre su dashboard
2. Explora el catálogo de cosechas disponibles
3. Toca un producto para ver detalle
4. Contacta al agricultor o hace una oferta

### 3.2 Publicar Pedido de Compra
Si el comprador no encuentra lo que busca, puede publicar un pedido:

| Campo | Descripción |
|---|---|
| Producto buscado | Ej: 500 kg de papa |
| Precio ofrecido | Por kg o quintal |
| Fecha límite | Cuándo lo necesita |
| Lugar de entrega | Dirección o coordenadas |
| Observaciones | Condiciones del producto |

**Flujo:**
1. Comprador toca "Publicar pedido"
2. Llena el formulario
3. Agricultores con ese producto ven el pedido
4. Agricultor responde y se coordina la venta

### 3.3 Ver Estado de Rutas
- Accede al mapa compartido para ver rutas activas
- Sabe si el producto que espera puede llegar por la ruta habitual
- Ve estimaciones de retraso o rutas alternativas

### 3.4 Historial de Compras
- Lista de transacciones realizadas
- Estado de cada pedido (pendiente, en camino, entregado)

---

## 4. Diagrama de Flujo Detallado

```
[Dashboard Comprador]
        │
        ├─── [Explorar cosechas disponibles]
        │           │
        │           ├── Filtrar por producto / zona / precio
        │           ├── Ver detalle de cosecha
        │           └── Contactar agricultor / Comprar
        │
        ├─── [Publicar pedido de compra]
        │           │
        │           └── Formulario → Firestore → Visible para agricultores
        │
        ├─── [Mis pedidos]
        │           │
        │           ├── Pedidos activos
        │           ├── Historial
        │           └── Estado de entrega
        │
        └─── [Ver mapa de rutas]
                    │
                    └── Rutas activas + incidencias + estado de entrega estimado
```

---

## 5. Colecciones Firestore del Comprador

```
pedidosCompra/
  {id}:
    compradorId: string
    producto: string
    cantidadKg: number
    precioOfrecido: number
    fechaLimite: Timestamp
    lugarEntrega: string
    coordenadasEntrega: GeoPoint (opcional)
    observaciones: string
    estado: "activo" | "coordinado" | "completado" | "cancelado"
    creadoEn: Timestamp

transacciones/
  {id}:
    compradorId: string
    agricultorId: string
    cosechaId: string
    cantidadKg: number
    precioTotal: number
    fechaAcuerdo: Timestamp
    estado: "pendiente" | "en_camino" | "entregado"
```

---

## 6. Pantallas Previstas (UI)

| Pantalla | Descripción |
|---|---|
| `CompradorDashboard` | Panel principal con resumen |
| `ExploraCosechas` | Catálogo de productos disponibles |
| `DetalleCosecha` | Ficha completa de un producto |
| `PublicarPedidoForm` | Formulario de pedido de compra |
| `MisPedidos` | Historial y seguimiento de pedidos |
| `MapaRutas` | Mapa compartido con todos los roles |

---

## 7. Casos de Uso Clave

### Caso A: Ruta bloqueada, producto en riesgo
1. Comprador espera entrega de papa desde Ambo
2. El mapa muestra bloqueo en la ruta Ambo–Huánuco
3. Ruti (asistente) informa el retraso estimado
4. Comprador contacta al agricultor para coordinar alternativa

### Caso B: Comprador busca producto urgente
1. Comprador publica pedido: "200 kg maíz, mañana, precio S/2.5/kg"
2. Agricultor en Llata ve el pedido y acepta
3. Se coordina transporte directo
4. Ambos evitan intermediarios y pérdidas

---

*Última actualización: Hackathon Clay 2026 — rama `feature/docs`*
