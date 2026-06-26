
# FASES DE TRABAJO - PEDRO

## Rama: feature/mapa-rutas

## Área: Mapa, rutas, alertas viales y soporte contextual para Ruti

## 1. Responsabilidad de Pedro

Pedro se encargará del módulo de rutas de AgroRuta Huánuco.

Su trabajo consiste en preparar la parte visual y lógica simulada relacionada con:

* Mapas.
* Rutas agrícolas.
* Alertas de huaicos.
* Derrumbes.
* Bloqueos.
* Lluvias fuertes.
* Estados de ruta.
* Datos simulados para que la app pueda mostrar riesgos viales.

Pedro también debe preparar contenido de ayuda para Ruti relacionado con rutas, pero no debe construir el componente principal de Ruti.

## 2. Qué NO debe tocar Pedro

Pedro no debe trabajar en:

* main.
* dev.
* feature/frontend.
* feature/firebase.
* Componente principal de Ruti.
* Firebase real.
* Autenticación.
* Pantallas completas de agricultor, comprador o transportista.
* Diseño general principal de la app.

Pedro puede crear componentes o datos relacionados únicamente al módulo de rutas.

## 3. Objetivo del módulo

Crear una base funcional y visual para que AgroRuta pueda mostrar el estado de las rutas agrícolas.

El sistema debe permitir representar rutas como:

* Ruta libre.
* Ruta en riesgo.
* Ruta bloqueada.

También debe mostrar incidencias viales como:

* Huaico.
* Derrumbe.
* Bloqueo.
* Lluvia fuerte.
* Accidente.
* Vía lenta.

## 4. Archivos sugeridos para trabajar

Pedro puede crear estos archivos:

```txt
src/features/routes/RouteAlerts.tsx
src/features/routes/RouteMap.tsx
src/features/routes/RouteStatusBadge.tsx
src/features/routes/RouteIncidentCard.tsx
src/features/routes/routeMockData.ts
src/features/routes/routeTypes.ts
src/data/rutiRouteTips.ts
```

Si la carpeta no existe, puede crearla:

```txt
src/features/routes
```

También puede modificar:

```txt
src/App.tsx
src/App.css
src/index.css
```

Pero solo si es necesario para mostrar el módulo de rutas de forma integrada o temporal.

Antes de modificar, el agente debe indicar qué archivos tocará y para qué.

## 5. Fase 1: Revisar estado actual

Antes de escribir código, Pedro debe:

1. Confirmar que está en la rama feature/mapa-rutas.
2. Ejecutar npm install si aún no lo hizo.
3. Ejecutar npm run dev.
4. Revisar qué pantallas existen.
5. Revisar si ya existe alguna estructura para rutas o mapas.

Resultado esperado:

El proyecto debe abrir correctamente y Pedro debe saber dónde integrará su módulo sin romper el trabajo de otros.

## 6. Fase 2: Crear tipos de datos de rutas

Pedro debe crear una estructura clara para manejar rutas e incidencias.

Tipos de estado de ruta:

```txt
LIBRE
RIESGO
BLOQUEADA
```

Tipos de incidencia:

```txt
HUAICO
DERRUMBE
BLOQUEO
LLUVIA
ACCIDENTE
VIA_LENTA
OTRO
```

Gravedad:

```txt
LOW
MEDIUM
HIGH
```

Estados visibles para el usuario:

* Ruta libre.
* Ruta con riesgo.
* Ruta bloqueada.
* Alerta activa.
* Reporte reciente.

## 7. Fase 3: Crear datos simulados

Pedro debe crear datos simulados para demo.

Ejemplos de rutas:

1. Huánuco → Amarilis.
2. Huánuco → Pillco Marca.
3. Huánuco → Tingo María.
4. Huánuco → Pasco.
5. Amarilis → Mercado de Productores.

Cada ruta debe tener:

* id.
* nombre.
* origen.
* destino.
* estado.
* tiempo estimado.
* distancia estimada.
* incidencia asociada.
* recomendación.

Ejemplo:

```json
{
  "id": "route-001",
  "name": "Huánuco - Amarilis",
  "origin": "Huánuco",
  "destination": "Amarilis",
  "status": "LIBRE",
  "estimatedTime": "25 min",
  "distance": "8 km",
  "recommendation": "Ruta disponible para traslado agrícola."
}
```

Ejemplo con riesgo:

```json
{
  "id": "route-002",
  "name": "Huánuco - Tingo María",
  "origin": "Huánuco",
  "destination": "Tingo María",
  "status": "RIESGO",
  "estimatedTime": "3 h 20 min",
  "distance": "120 km",
  "incidentType": "LLUVIA",
  "recommendation": "Conducir con precaución por lluvia intensa."
}
```

Ejemplo bloqueado:

```json
{
  "id": "route-003",
  "name": "Huánuco - Pasco",
  "origin": "Huánuco",
  "destination": "Pasco",
  "status": "BLOQUEADA",
  "estimatedTime": "No disponible",
  "distance": "95 km",
  "incidentType": "HUAICO",
  "recommendation": "Evitar esta ruta hasta nueva actualización."
}
```

## 8. Fase 4: Crear componente de alertas

Componente sugerido:

```txt
RouteAlerts.tsx
```

Debe mostrar un listado de alertas activas.

Cada alerta debe mostrar:

* Tipo de incidencia.
* Ruta afectada.
* Gravedad.
* Tiempo estimado.
* Recomendación.
* Estado visual.

Ejemplo visual:

Huaico reportado
Ruta: Huánuco - Pasco
Gravedad: Alta
Recomendación: Evitar esta ruta por el momento.

## 9. Fase 5: Crear badges de estado

Componente sugerido:

```txt
RouteStatusBadge.tsx
```

Debe mostrar visualmente el estado de la ruta.

Estados:

LIBRE:

Texto: Ruta libre
Color sugerido: verde
Significado: El traslado puede avanzar con normalidad.

RIESGO:

Texto: Ruta en riesgo
Color sugerido: amarillo/naranja
Significado: Puede haber demora por lluvia, huaico o vía lenta.

BLOQUEADA:

Texto: Ruta bloqueada
Color sugerido: rojo
Significado: No se recomienda avanzar por esa ruta.

## 10. Fase 6: Crear placeholder de mapa

Componente sugerido:

```txt
RouteMap.tsx
```

Para el MVP, no es obligatorio implementar mapa real completo.

Puede hacerse una de estas opciones:

Opción A: Placeholder visual de mapa

* Fondo tipo mapa.
* Marcadores simulados.
* Línea de ruta.
* Puntos de origen y destino.
* Marcadores de alerta.

Opción B: Leaflet básico

Solo si no rompe el proyecto y si se instala correctamente.

Debe mostrar:

* Origen.
* Destino.
* Ruta simulada.
* Marcadores de incidencia.

Importante:

Si se instala Leaflet, se debe verificar que npm run build funcione.

## 11. Fase 7: Crear tips de Ruti sobre rutas

Pedro debe crear contenido para que Ruti pueda explicar temas de rutas.

Archivo sugerido:

```txt
src/data/rutiRouteTips.ts
```

Tips:

* Revisa el estado de ruta antes de vender o comprar.
* Una ruta libre permite avanzar con normalidad.
* Una ruta en riesgo puede tener demoras por lluvia o vía lenta.
* Una ruta bloqueada no se recomienda para traslado.
* Los reportes de transportistas ayudan a actualizar las alertas.
* Si hay huaico o derrumbe, busca una ruta alternativa.
* Las alertas ayudan a reducir pérdidas de productos agrícolas.

Preguntas frecuentes de rutas:

Pregunta: ¿Qué significa ruta libre?
Respuesta: Significa que no hay bloqueos reportados y el traslado puede avanzar con normalidad.

Pregunta: ¿Qué significa ruta en riesgo?
Respuesta: Significa que puede haber demora por lluvia, vía lenta o alerta cercana.

Pregunta: ¿Qué significa ruta bloqueada?
Respuesta: Significa que existe un huaico, derrumbe o bloqueo que puede impedir el traslado.

Pregunta: ¿Quién reporta las incidencias?
Respuesta: Principalmente los transportistas, porque están en la ruta y pueden informar problemas en tiempo real.

Pregunta: ¿El mapa usa GPS real?
Respuesta: Para el MVP puede mostrar ubicaciones simuladas. Luego puede integrarse GPS real.

Pregunta: ¿Qué hago si una ruta está bloqueada?
Respuesta: Se recomienda esperar actualización o elegir una ruta alternativa.

## 12. Fase 8: Relación con Agricultor, Comprador y Transportista

El módulo de rutas debe servir para los tres roles.

### Agricultor

Usa rutas para saber si puede enviar su cosecha.

Ejemplo:

Si la ruta está bloqueada, Ruti puede advertir:

“Esta ruta tiene alerta. Tu cosecha podría demorar en llegar al comprador.”

### Comprador

Usa rutas para decidir si compra un lote.

Ejemplo:

“Antes de comprar, revisa si el producto puede llegar a tiempo.”

### Transportista

Usa rutas para aceptar o rechazar fletes.

Ejemplo:

“Esta ruta tiene riesgo. Acepta el flete solo si puedes realizar el traslado con seguridad.”

## 13. Fase 9: Validación final

Antes de hacer commit, Pedro debe ejecutar:

```bash
npm run build
```

Si funciona, recién guarda cambios.

Commit sugerido:

```bash
git add .
git commit -m "feat(routes): crear modulo de rutas y alertas viales"
git push origin feature/mapa-rutas
```

## 14. Entrega esperada

Pedro debe entregar:

* Datos simulados de rutas.
* Tipos de ruta e incidencia.
* Componente de alertas viales.
* Badge de estado de ruta.
* Placeholder o mapa básico.
* Tips de Ruti relacionados a rutas.
* Build funcionando correctamente.

No debe tocar Firebase real.
No debe tocar el componente principal de Ruti.
No debe modificar main ni dev.
