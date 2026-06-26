# 08 — Plan de Trabajo del Equipo 📋

> **Proyecto:** AgroRuta Huánuco  
> **Hackathon:** Clay 2026  
> **Rama:** feature/docs

---

## 1. Estructura del Equipo y Ramas

| Integrante | Rol | Rama asignada |
|---|---|---|
| **Líder / Docs** | Documentación, pitch, integración | `feature/docs` |
| **Frontend** | UI, pantallas, diseño mobile-first | `feature/frontend` |
| **Firebase** | Auth, Firestore, servicios de datos | `feature/firebase` |
| **Mapa / Rutas** | Leaflet, OpenStreetMap, incidencias | `feature/mapa-rutas` |

---

## 2. Responsabilidades por Rama

### `feature/docs` — Líder / Documentación
- [ ] Crear y mantener todos los documentos en `docs/`
- [ ] Actualizar `README.md`
- [ ] Preparar y ensayar el pitch (ver `07_PITCH_DEMO.md`)
- [ ] Coordinar al equipo y resolver conflictos de integración
- [ ] Revisar Pull Requests antes de mergear a `dev`
- [ ] Verificar que `npm run build` pase antes de cada merge

### `feature/frontend` — Frontend
- [ ] Pantalla inicial: selección de rol (`App.tsx`)
- [ ] Dashboard por rol: Agricultor, Comprador, Transportista
- [ ] Formularios: publicar cosecha, solicitar flete, pedido de compra
- [ ] Componente `RutiAssistant` (botón flotante)
- [ ] Estilos mobile-first en CSS o módulos CSS
- [ ] Routing con React Router DOM

### `feature/firebase` — Backend / Firebase
- [ ] Inicializar Firebase en el proyecto (`src/services/firebase.ts`)
- [ ] Configurar Firebase Auth (registro, login, logout)
- [ ] Definir colecciones y estructura de Firestore
- [ ] Crear servicios de datos: cosechas, pedidos, fletes, incidencias
- [ ] Implementar reglas de seguridad Firestore
- [ ] Configurar variables de entorno (`.env.local`, `.env.example`)

### `feature/mapa-rutas` — Mapa / Incidencias
- [ ] Integrar Leaflet con OpenStreetMap en el proyecto
- [ ] Mostrar rutas de Huánuco en el mapa
- [ ] Visualizar incidencias activas desde Firestore
- [ ] Componente de reporte de incidencias (formulario + ubicación GPS)
- [ ] Actualización en tiempo real con `onSnapshot` de Firestore
- [ ] Capa de rutas alternativas cuando hay incidencias graves

---

## 3. Timeline del Hackathon

```
┌──────────────────────────────────────────────────────────┐
│  FASE        │  TAREAS CLAVE                             │
├──────────────┼───────────────────────────────────────────┤
│ Setup        │ Crear repo, ramas, estructura base        │
│              │ Instalar dependencias                     │
│              │ Verificar npm run dev                     │
├──────────────┼───────────────────────────────────────────┤
│ Desarrollo   │ Cada rama trabaja en paralelo             │
│ en paralelo  │ Frontend: pantallas base                  │
│              │ Firebase: servicios y auth                │
│              │ Mapa: Leaflet + incidencias               │
│              │ Docs: documentos y pitch                  │
├──────────────┼───────────────────────────────────────────┤
│ Integración  │ PRs de cada rama hacia dev                │
│              │ Revisar conflictos                        │
│              │ npm run build en dev                      │
│              │ Pruebas de flujo completo                 │
├──────────────┼───────────────────────────────────────────┤
│ Pulido       │ Corrección de bugs                        │
│              │ Ajustes de diseño                         │
│              │ Datos de prueba en Firestore              │
│              │ Ensayo del pitch                          │
├──────────────┼───────────────────────────────────────────┤
│ Entrega      │ PR de dev → main                          │
│              │ Build final verificado                    │
│              │ Demo lista                                │
│              │ Presentación                              │
└──────────────┴───────────────────────────────────────────┘
```

---

## 4. Prioridades del MVP

### Funcionalidades MUST HAVE (Hackathon)
- [x] Pantalla de selección de rol
- [ ] Login / Registro con Firebase Auth
- [ ] Dashboard básico por rol
- [ ] Publicar cosecha (Agricultor)
- [ ] Ver cosechas disponibles (Comprador)
- [ ] Reportar incidencia (Transportista)
- [ ] Mapa con incidencias activas
- [ ] Asistente Ruti (versión básica)

### Funcionalidades NICE TO HAVE (Si hay tiempo)
- [ ] Solicitar flete y asignación de transportista
- [ ] Pedidos de compra (Comprador → Agricultor)
- [ ] Historial de transacciones
- [ ] Ruti con respuestas a preguntas frecuentes
- [ ] Modo offline completo

---

## 5. Reglas de Trabajo en Equipo

1. **Cada uno trabaja en su rama**, nunca directamente en `main` o `dev`
2. **Commits frecuentes y descriptivos** — al menos cada 2 horas de trabajo
3. **Pull Requests hacia `dev`**, no hacia `main`
4. **El líder revisa cada PR** antes de mergear
5. **Si hay duda, consultar** — no bloquear el trabajo de otro
6. **npm run build debe pasar** antes de cada merge a `dev`

---

## 6. Checkpoints de Verificación

Antes de cada merge a `dev`, verificar:

```bash
# 1. Sin errores TypeScript
npm run type-check

# 2. Build exitoso
npm run build

# 3. Preview funciona
npm run preview
```

---

## 7. Comunicación del Equipo

- **Dudas técnicas:** comunicar al compañero de rama correspondiente
- **Conflictos de integración:** escalar al Líder / Docs
- **Decisiones de diseño importantes:** consenso del equipo antes de implementar
- **Actualizaciones de estado:** breve update al inicio de cada sesión de trabajo

---

*Última actualización: Hackathon Clay 2026 — rama `feature/docs`*
