# 🌿 AgroRuta Huánuco

**Conectamos agricultores, compradores y transportistas para reducir pérdidas por bloqueos, huaicos y retrasos en rutas agrícolas.**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa)](https://web.dev/progressive-web-apps/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase)](https://firebase.google.com)
[![Hackathon](https://img.shields.io/badge/Hackathon-Clay%202026-2d7a3a)](https://github.com/jhuniro/clay-agro-ruta)

---

## 📋 Descripción

**AgroRuta Huánuco** es una Progressive Web App (PWA) diseñada para la región Huánuco, Perú. Permite a agricultores, compradores y transportistas coordinar en tiempo real la oferta, compra y traslado de productos agrícolas, especialmente durante emergencias como huaicos, derrumbes y bloqueos de rutas.

---

## ❗ Problema

En la región Huánuco, los eventos climáticos e interrupciones viales afectan gravemente la cadena agrícola:

- 🌧️ **Huaicos y derrumbes** cortan rutas sin previo aviso
- 🚧 **Bloqueos sociales** paralizan el traslado por horas o días
- 📉 Los **agricultores** pierden cosechas por no encontrar transporte o compradores a tiempo
- 💸 Los **compradores** no reciben mercadería sin saber cuándo llegará
- 🗺️ Los **transportistas** parten sin información actualizada sobre el estado de las rutas

> Más del 30% de la producción agrícola de Huánuco se ve afectada cada año por estos eventos.

---

## ✅ Solución

AgroRuta Huánuco es una **PWA mobile-first** que:

- Permite publicar cosechas y solicitar transporte desde el campo
- Conecta compradores con productores directamente, sin intermediarios
- Muestra el estado de las rutas en un **mapa interactivo en tiempo real**
- Permite reportar incidencias (huaicos, bloqueos) que todos pueden ver al instante
- Funciona desde cualquier celular y puede instalarse sin App Store

---

## 👥 Roles

| Rol | Descripción |
|---|---|
| 🌱 **Agricultor** | Publica cosechas, solicita transporte, ve el mapa de rutas |
| 🛒 **Comprador** | Busca productos disponibles, publica pedidos de compra |
| 🚛 **Transportista** | Acepta fletes, reporta incidencias en ruta, navega el mapa |

### Asistente Ruti 🤖
**Ruti** es el asistente flotante de la app. Guía al usuario, alerta sobre incidencias y sugiere rutas alternativas.

---

## 🚀 Funcionalidades MVP

### Agricultor
- [x] Selección de rol en pantalla inicial
- [ ] Registro e inicio de sesión
- [ ] Publicar cosecha (producto, cantidad, precio, ubicación)
- [ ] Solicitar transporte para cosecha
- [ ] Ver mapa de rutas activas e incidencias

### Comprador
- [ ] Explorar cosechas disponibles
- [ ] Publicar pedido de compra
- [ ] Ver estado de rutas hacia su zona

### Transportista
- [ ] Ver solicitudes de flete disponibles
- [ ] Aceptar flete y notificar al agricultor
- [ ] Reportar incidencia en ruta (huaico, bloqueo, derrumbe)
- [ ] Ver y navegar mapa de rutas

### General
- [x] Diseño mobile-first, dark mode
- [x] PWA: instalable desde el navegador
- [ ] Firebase Auth (registro y login)
- [ ] Mapa Leaflet + OpenStreetMap
- [ ] Asistente Ruti (onboarding y alertas)

---

## 🛠️ Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18.x | Framework de UI |
| TypeScript | 5.x | Tipado estático |
| Vite | 5.x | Bundler y dev server |
| vite-plugin-pwa | 0.20.x | Capacidades PWA y service worker |
| Firebase Auth | 10.x | Autenticación de usuarios |
| Firestore | 10.x | Base de datos en tiempo real |
| Leaflet | 1.x | Mapas interactivos |
| OpenStreetMap | — | Tiles de mapa libres |
| CSS Mobile-first | — | Diseño sin frameworks externos |

---

## 📦 Instalación

### Requisitos previos
- Node.js 18 o superior
- npm 9 o superior
- Git

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/jhuniro/clay-agro-ruta.git
cd clay-agro-ruta

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Firebase
```

### Variables de entorno (`.env.local`)
```
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

---

## ▶️ Ejecución

```bash
# Modo desarrollo (hot reload)
npm run dev
# → http://localhost:5173

# Verificar tipos TypeScript
npm run type-check

# Build de producción
npm run build

# Preview del build de producción
npm run preview
```

---

## 🌿 Estructura de Ramas

```
main              ← Entrega final (solo merge desde dev, al cierre)
│
└── dev           ← Rama de integración y pruebas
    │
    ├── feature/frontend      → UI, pantallas, diseño
    ├── feature/firebase      → Auth, Firestore, servicios
    ├── feature/mapa-rutas    → Leaflet, mapa, incidencias
    └── feature/docs          → Documentación, README, pitch
```

> Ver guía completa en [`docs/09_GUIA_INTEGRACION_RAMAS.md`](./docs/09_GUIA_INTEGRACION_RAMAS.md)

---

## 📁 Estructura del Proyecto

```
clay-agro-ruta/
├── docs/                          # Documentación del proyecto
│   ├── 01_FLUJO_GENERAL_AGRORUTA.md
│   ├── 02_FLUJO_AGRICULTOR.md
│   ├── 03_FLUJO_COMPRADOR.md
│   ├── 04_FLUJO_TRANSPORTISTA.md
│   ├── 05_ASISTENTE_RUTI.md
│   ├── 06_ARQUITECTURA_FIREBASE.md
│   ├── 07_PITCH_DEMO.md
│   ├── 08_PLAN_DE_TRABAJO_EQUIPO.md
│   └── 09_GUIA_INTEGRACION_RAMAS.md
├── public/
│   ├── favicon.svg
│   └── icons/
├── src/
│   ├── App.tsx                    # Pantalla principal + selección de rol
│   ├── App.css                    # Estilos del welcome screen
│   ├── index.css                  # Design tokens globales
│   ├── main.tsx                   # Entry point React
│   └── vite-env.d.ts
├── index.html
├── package.json
├── vite.config.ts                 # Vite + PWA config
├── tsconfig.json
└── README.md
```

---

## 👨‍💻 Equipo

| Integrante | Rol | Rama |
|---|---|---|
| Jhuniro | Líder, Docs, Integración | `feature/docs` |
| *(Frontend)* | UI, Pantallas, Diseño | `feature/frontend` |
| *(Firebase)* | Auth, Firestore, Servicios | `feature/firebase` |
| *(Mapa)* | Leaflet, Rutas, Incidencias | `feature/mapa-rutas` |

---

## 🎯 Demo

> Hackathon Clay 2026 — Área: Agricultura y Medio Ambiente

### Pitch (3 minutos)
Ver script completo en: [`docs/07_PITCH_DEMO.md`](./docs/07_PITCH_DEMO.md)

### Flujos documentados
| Documento | Contenido |
|---|---|
| [01 Flujo General](./docs/01_FLUJO_GENERAL_AGRORUTA.md) | Visión del sistema |
| [02 Agricultor](./docs/02_FLUJO_AGRICULTOR.md) | Flujo completo del agricultor |
| [03 Comprador](./docs/03_FLUJO_COMPRADOR.md) | Flujo completo del comprador |
| [04 Transportista](./docs/04_FLUJO_TRANSPORTISTA.md) | Flujo completo del transportista |
| [05 Asistente Ruti](./docs/05_ASISTENTE_RUTI.md) | Documentación del asistente |
| [06 Firebase](./docs/06_ARQUITECTURA_FIREBASE.md) | Arquitectura de datos |

---

## 📄 Licencia

Proyecto desarrollado para el **Hackathon Clay 2026** — Región Huánuco, Perú.

---

*"Porque ninguna cosecha debería perderse por falta de información."* 🌿
