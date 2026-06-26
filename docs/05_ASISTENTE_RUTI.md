# 05 — Asistente Ruti 🤖🌿

> **Proyecto:** AgroRuta Huánuco  
> **Componente:** Asistente flotante  
> **Rama:** feature/docs

---

## 1. ¿Qué es Ruti?

**Ruti** es el asistente virtual flotante de AgroRuta Huánuco. Su nombre viene de la fusión de **Ru**ta + **Ti**erra — simbolizando el camino entre el campo y el mercado.

Ruti aparece como un **botón flotante** en todas las pantallas de la app y actúa como guía, consejero y canal de alerta para los tres tipos de usuarios.

---

## 2. Identidad Visual

| Elemento | Descripción |
|---|---|
| Forma | Burbuja circular flotante, esquina inferior derecha |
| Icono | 🌿 o ícono de planta/hoja estilizada |
| Color | Verde primario (`#2d7a3a`) con brillo animado |
| Animación | Pulso suave cuando tiene un mensaje nuevo |
| Posición | `fixed`, bottom-right, z-index alto |

---

## 3. Funcionalidades de Ruti

### 3.1 Guía de Onboarding
Cuando el usuario entra por primera vez a su dashboard:
- Ruti aparece con un mensaje de bienvenida
- Explica brevemente qué puede hacer el usuario
- Muestra los pasos clave de forma secuencial

**Ejemplo (Agricultor):**
> 👋 "Hola! Soy Ruti. Puedo ayudarte a publicar tu cosecha, encontrar transporte y ver si las rutas están libres. ¿Por dónde empezamos?"

### 3.2 Alertas de Incidencias
Cuando hay un nuevo reporte de huaico, bloqueo o derrumbe:
- Ruti pulsa y muestra una notificación de alerta
- Informa sobre qué ruta está afectada
- Sugiere alternativas si las hay

**Ejemplo:**
> ⚠️ "Alerta: Hay un derrumbe reportado en la ruta Huánuco–La Unión. Tiempo estimado de cierre: desconocido. Te recomiendo revisar la ruta por Ambo."

### 3.3 Sugerencias Contextuales
Ruti adapta sus sugerencias según el rol y la pantalla:

| Pantalla | Sugerencia de Ruti |
|---|---|
| Dashboard vacío | "Aún no tienes publicaciones. ¿Deseas publicar tu primera cosecha?" |
| Mapa con bloqueo | "Esta ruta está bloqueada. Aquí tienes una alternativa." |
| Sin fletes aceptados | "Tu solicitud de transporte está pendiente. Te avisaré cuando alguien la acepte." |
| Cosecha sin compradores | "Tu cosecha lleva 3 días publicada. ¿Quieres bajar el precio o cambiar el destino?" |

### 3.4 Preguntas Frecuentes (FAQ)
El usuario puede hacerle preguntas a Ruti:
- "¿Cómo publico una cosecha?"
- "¿Qué rutas están abiertas hoy?"
- "¿Cómo cancelo un flete?"
- "¿Cómo reporto un bloqueo?"

Ruti responde con texto simple y, si es posible, redirige a la sección correspondiente.

---

## 4. Comportamiento por Rol

### 🌱 Agricultor
- Recuerda si tiene cosechas próximas a vencer
- Avisa cuando un transportista acepta su flete
- Alerta cuando la ruta a su mercado objetivo está bloqueada

### 🛒 Comprador
- Notifica cuando hay nuevas cosechas del producto que busca
- Informa retrasos en entregas por incidencias en rutas
- Sugiere agricultores alternativos cuando uno no puede cumplir

### 🚛 Transportista
- Muestra el resumen de incidencias activas antes de salir
- Recuerda fletes pendientes de recoger
- Sugiere reportar incidencias cuando el GPS detecta paradas largas en ruta

---

## 5. Implementación Técnica (Referencia)

```tsx
// Componente previsto: src/components/RutiAssistant.tsx

interface RutiMessage {
  type: 'info' | 'warning' | 'alert' | 'suggestion'
  text: string
  action?: {
    label: string
    route: string
  }
}

// El componente recibe mensajes desde:
// - Firestore (incidencias nuevas)
// - Estado local (onboarding, contexto de pantalla)
// - Reglas predefinidas por rol
```

**Estado del componente:**
- `isOpen`: boolean — si el panel de Ruti está expandido
- `messages`: RutiMessage[] — cola de mensajes pendientes
- `hasUnread`: boolean — para animar el botón flotante

---

## 6. Roadmap de Ruti

| Versión | Funcionalidad |
|---|---|
| MVP (Hackathon) | Botón flotante + mensajes de onboarding + alertas básicas |
| v1.0 | Respuestas a preguntas frecuentes |
| v2.0 | Integración con modelo de lenguaje (IA generativa) |
| v3.0 | Voz (texto a voz) para usuarios con baja alfabetización digital |

---

## 7. Frase de Identidad de Ruti

> *"Soy Ruti, tu compañero de ruta. Estoy aquí para que tu cosecha nunca se pierda."*

---

*Última actualización: Hackathon Clay 2026 — rama `feature/docs`*
