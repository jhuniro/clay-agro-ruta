# FASES DE TRABAJO - GILIAN

## Rama: feature/frontend

## Área: Frontend + Asistente Visual Ruti

## 1. Responsabilidad de Gilian

Gilian se encargará de la parte visual del proyecto AgroRuta Huánuco.

Su trabajo principal será mejorar la interfaz de la PWA y crear el componente visual del asistente flotante llamado Ruti.

No debe trabajar en Firebase real.
No debe trabajar en mapas avanzados.
No debe trabajar en main.
No debe trabajar en dev.
No debe tocar ramas de otros compañeros.

## 2. Objetivo de su módulo

Crear una experiencia visual clara, moderna y móvil para los tres roles principales de AgroRuta:

1. Agricultor
2. Comprador
3. Transportista

Además, debe implementar la base visual del asistente virtual flotante Ruti.

Ruti será un avatar circular ubicado en la esquina inferior derecha de la pantalla. Su función será guiar al usuario dentro de la aplicación mediante saludos, tips, tutoriales simples y respuestas frecuentes.

## 3. Archivos sugeridos para trabajar

Gilian puede crear o modificar archivos relacionados al frontend.

Archivos sugeridos:

```txt
src/App.tsx
src/App.css
src/index.css
src/components/RutiAssistant/RutiAssistant.tsx
src/components/RutiAssistant/RutiAssistant.css
src/components/RoleCard.tsx
src/components/DashboardCard.tsx
src/data/rutiContent.ts
```

Si algún archivo no existe, puede crearlo.

Antes de modificar, el agente debe indicar qué archivos tocará y para qué.

## 4. Fase 1: Revisar estado actual

Antes de escribir código, Gilian debe:

1. Confirmar que está en la rama feature/frontend.
2. Ejecutar npm install si aún no lo hizo.
3. Ejecutar npm run dev.
4. Revisar la pantalla actual de AgroRuta.
5. Identificar qué archivos ya existen.

Resultado esperado:

La app debe abrir correctamente y mostrar la pantalla inicial de AgroRuta Huánuco.

## 5. Fase 2: Mejorar pantalla inicial

La pantalla inicial debe mantener el enfoque actual, pero mejorar su estructura visual.

Debe mostrar:

* Nombre del proyecto: AgroRuta Huánuco.
* Subtítulo: Plataforma agrícola - Hackathon Clay 2026.
* Mensaje principal: Conectamos agricultores, compradores y transportistas para reducir pérdidas por bloqueos, huaicos y retrasos en rutas agrícolas.
* Selección de rol:

  * Agricultor
  * Comprador
  * Transportista

Cada rol debe verse como una tarjeta clara, con ícono, color diferenciado y texto corto.

## 6. Fase 3: Crear pantallas visuales por rol

Gilian debe crear una navegación visual simulada entre roles.

### Agricultor

Debe mostrar:

* Saludo del agricultor.
* Banner de alerta vial.
* Botón “+ Vender Cosecha”.
* Sección “Mis Envíos”.
* Card de producto publicado.
* Estado visual de ruta: Libre, En riesgo o Bloqueada.

### Comprador

Debe mostrar:

* Saludo del comprador.
* Botón “Buscar productos”.
* Botón “Publicar pedido”.
* Lista de productos disponibles.
* Card con producto, cantidad, precio, origen y estado de ruta.
* Botón “Comprar lote”.

### Transportista

Debe mostrar:

* Saludo del transportista.
* Bolsa de cargas disponibles.
* Card con origen, destino, producto, cantidad y estado de ruta.
* Botón “Aceptar flete”.
* Sección de viaje activo.
* Botón visual “Reportar incidencia”.

## 7. Fase 4: Crear asistente visual Ruti

Ruti debe ser un asistente flotante.

Características:

* Avatar circular de 56px.
* Ubicación fija en esquina inferior derecha.
* Siempre visible.
* Estilo moderno/brutalista.
* Sombra marcada.
* Anillo con pulso animado.
* Panel flotante al hacer clic.
* Responsive para móvil.

Estados emocionales:

* Inactivo: 🤖
* Feliz: 😊
* Pensando: 🤔
* Explicando: 💡
* Esperando: 👋
* Emocionado: 🚀

Botones del panel:

* 📖 Tutorial
* 💬 Preguntar
* — Minimizar
* ✕ Cerrar mensaje

## 8. Fase 5: Contenido mínimo de Ruti

Ruti debe tener textos predefinidos.

Saludo:

“¡Hola! Soy Ruti, tu asistente en AgroRuta Huánuco. Te ayudaré a entender la app paso a paso.”

Mensaje inactivo:

“Estoy aquí si necesitas ayuda.”

Mensaje de tutorial:

“Voy a guiarte por esta pantalla paso a paso. Presiona ‘Siguiente’ cuando estés listo.”

Mensaje de pregunta:

“Escribe tu duda y te responderé con una explicación rápida.”

Mensaje al minimizar:

“Me quedo aquí por si necesitas ayuda.”

Mensaje si no entiende:

“No estoy seguro de entender tu pregunta. Puedo iniciar un tutorial para explicarte esta pantalla paso a paso.”

## 9. Fase 6: Tips por pantalla

### Inicio

* Elige tu rol para continuar.
* AgroRuta conecta agricultores, compradores y transportistas.
* El proyecto ayuda a reducir pérdidas por bloqueos y retrasos.
* Presiona Tutorial si quieres una explicación paso a paso.

### Agricultor

* Publica tu cosecha desde el botón + Vender Cosecha.
* Revisa las alertas antes de aceptar una ruta.
* Tus envíos aparecerán en Mis Envíos.
* Cuando un comprador acepte tu lote, se buscará transporte.

### Comprador

* Puedes buscar productos disponibles.
* También puedes publicar un pedido.
* Revisa el estado de ruta antes de comprar.
* El seguimiento aparecerá cuando se asigne transporte.

### Transportista

* La bolsa de cargas muestra fletes disponibles.
* Revisa origen, destino y estado de ruta.
* Acepta solo cargas que puedas transportar.
* Puedes reportar incidencias viales.

## 10. Fase 7: Preguntas frecuentes de Ruti

Ruti debe responder preguntas básicas.

Pregunta: ¿Qué es AgroRuta?
Respuesta: AgroRuta conecta agricultores, compradores y transportistas para reducir pérdidas por bloqueos y retrasos en rutas agrícolas.

Pregunta: ¿Cómo vendo mi cosecha?
Respuesta: Entra como agricultor, presiona + Vender Cosecha y completa producto, cantidad, precio y ubicación.

Pregunta: ¿Cómo compro un producto?
Respuesta: Entra como comprador, revisa productos disponibles, verifica la ruta y presiona Comprar lote.

Pregunta: ¿Cómo acepto un flete?
Respuesta: Entra como transportista, revisa la bolsa de cargas y presiona Aceptar flete.

Pregunta: ¿Qué significa ruta bloqueada?
Respuesta: Significa que hay un huaico, derrumbe, bloqueo o problema que puede retrasar el traslado.

Pregunta: ¿Puedo contactar por WhatsApp?
Respuesta: Sí. AgroRuta permite abrir WhatsApp para coordinar directamente con agricultor, comprador o transportista.

## 11. Fase 8: Validación final

Antes de hacer commit, Gilian debe verificar:

```bash
npm run build
```

Si el build funciona, recién debe guardar cambios.

Commit sugerido:

```bash
git add .
git commit -m "feat(frontend): crear pantallas y asistente visual Ruti"
git push origin feature/frontend
```

## 12. Entrega esperada

Al terminar, Gilian debe entregar:

* Pantalla inicial mejorada.
* Pantallas visuales simuladas por rol.
* Componente flotante Ruti.
* Tips y FAQ básicos.
* Diseño responsive.
* Build funcionando correctamente.

No debe hacer integración con Firebase real.
No debe hacer mapa avanzado.
No debe modificar main ni dev.
