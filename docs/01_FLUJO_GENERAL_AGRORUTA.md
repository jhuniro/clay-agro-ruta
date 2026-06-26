# 01 — Flujo General AgroRuta Huánuco

> **Proyecto:** AgroRuta Huánuco  
> **Área:** Agricultura y Medio Ambiente  
> **Hackathon:** Clay 2026  
> **Rama:** feature/docs

---

## 1. Visión del Sistema

AgroRuta Huánuco es una PWA (Progressive Web App) que conecta en tiempo real a tres actores clave de la cadena agrícola de la región Huánuco:

| Actor | Rol principal |
|---|---|
| 🌱 **Agricultor** | Publica cosechas y solicita transporte |
| 🛒 **Comprador** | Busca productos o publica pedidos de compra |
| 🚛 **Transportista** | Acepta fletes y reporta incidencias en rutas |

El sistema actúa como **puente digital** ante emergencias como huaicos, derrumbes, bloqueos y retrasos que afectan las rutas agrícolas de la región.

---

## 2. Problema que resuelve

Los eventos climáticos y sociales en Huánuco interrumpen frecuentemente el transporte de productos agrícolas:

- 🌧️ Huaicos y derrumbes cortan carreteras
- 🚧 Bloqueos sociales paralizan rutas por horas o días
- 📉 Los agricultores pierden cosechas por no encontrar compradores o transporte a tiempo
- 💸 Los compradores no saben cuándo ni cómo llegará la mercadería
- 🗺️ Los transportistas navegan sin información actualizada de rutas alternativas

---

## 3. Flujo General del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                    PANTALLA INICIAL                     │
│            Selección de Rol (App.tsx)                   │
│    [Agricultor]    [Comprador]    [Transportista]       │
└───────────┬─────────────┬──────────────┬────────────────┘
            │             │              │
            ▼             ▼              ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐
    │  Dashboard   │ │  Dashboard   │ │    Dashboard     │
    │  Agricultor  │ │  Comprador   │ │  Transportista   │
    └──────┬───────┘ └──────┬───────┘ └────────┬─────────┘
           │                │                   │
           ▼                ▼                   ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐
    │ Publica      │ │ Busca        │ │ Ve fletes        │
    │ cosecha      │ │ productos    │ │ disponibles      │
    │ Solicita     │ │ Publica      │ │ Acepta flete     │
    │ transporte   │ │ pedido       │ │ Reporta ruta     │
    └──────┬───────┘ └──────┬───────┘ └────────┬─────────┘
           │                │                   │
           └────────────────▼───────────────────┘
                            │
                   ┌────────▼────────┐
                   │   FIREBASE /    │
                   │   FIRESTORE     │
                   │                 │
                   │  - cosechas     │
                   │  - pedidos      │
                   │  - fletes       │
                   │  - incidencias  │
                   └────────┬────────┘
                            │
                   ┌────────▼────────┐
                   │   MAPA LEAFLET  │
                   │  OpenStreetMap  │
                   │                 │
                   │ Rutas activas   │
                   │ Incidencias     │
                   │ Ubicaciones     │
                   └─────────────────┘
```

---

## 4. Interacciones Cruzadas entre Roles

### Agricultor → Transportista
1. Agricultor publica cosecha con ubicación y fecha de recojo
2. Transportistas disponibles ven la solicitud de flete
3. Transportista acepta el flete
4. Agricultor recibe confirmación

### Agricultor → Comprador
1. Agricultor publica cosecha con precio y cantidad
2. Comprador ve la publicación y hace una oferta / compra
3. Se coordina entrega con o sin transportista

### Transportista → Comprador / Agricultor
1. Transportista reporta incidencia en ruta (huaico, bloqueo)
2. El mapa actualiza el estado de la ruta en tiempo real
3. Compradores y agricultores ven rutas alternativas

---

## 5. Asistente Ruti 🤖

Ruti es el asistente flotante de AgroRuta. Aparece en todas las pantallas y:
- Guía al usuario nuevo paso a paso
- Explica qué hacer ante una incidencia
- Sugiere rutas alternativas
- Responde preguntas frecuentes sobre la app

Ver detalle en: [`05_ASISTENTE_RUTI.md`](./05_ASISTENTE_RUTI.md)

---

## 6. Stack Tecnológico

| Tecnología | Uso |
|---|---|
| React 18 + TypeScript | Frontend de la PWA |
| Vite | Bundler y dev server |
| vite-plugin-pwa | Capacidades offline y manifest |
| Firebase Auth | Autenticación de usuarios |
| Firestore | Base de datos en tiempo real |
| Leaflet + OpenStreetMap | Mapa interactivo de rutas |
| CSS Mobile-first | Diseño responsive para campo |

---

## 7. Principios de Diseño

- **Mobile-first:** La mayoría de usuarios acceden desde celular en campo
- **Offline-ready:** Funcionalidad básica sin internet (PWA + cache)
- **Simple y directo:** Flujos cortos, sin pasos innecesarios
- **Accesible:** Textos legibles, botones grandes, íconos claros

---

*Última actualización: Hackathon Clay 2026 — rama `feature/docs`*
