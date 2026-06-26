# FASES DE TRABAJO - MARTEL

## Rama: feature/firebase

## Área: Firebase, Firestore, Auth, datos simulados y lógica de estados

## 1. Responsabilidad de Martel

Martel se encargará de la estructura de datos y la lógica base de AgroRuta Huánuco.

Su trabajo consiste en preparar el backend del proyecto usando Firebase o, si todavía no se configura Firebase real, dejar una estructura simulada lista para integrarse.

Debe trabajar sobre:

* Firebase Auth.
* Firestore.
* Estructura de colecciones.
* Tipos de datos.
* Estados del flujo.
* Datos simulados.
* Funciones base para crear, leer y actualizar información.
* Lógica de conexión entre agricultor, comprador y transportista.

## 2. Qué NO debe tocar Martel

Martel no debe trabajar en:

* main.
* dev.
* feature/frontend.
* feature/mapa-rutas.
* Diseño visual principal.
* Componente visual de Ruti.
* Mapa avanzado.
* Estilos generales sin coordinación.
* Pantallas completas que correspondan al frontend.

Martel puede crear archivos de servicios, tipos, mocks y configuración, pero debe evitar romper el diseño existente.

## 3. Objetivo del módulo

Crear la base lógica para que AgroRuta funcione con tres roles:

1. FARMER: Agricultor.
2. BUYER: Comprador.
3. DRIVER: Transportista.

La app debe manejar este flujo general:

1. El usuario selecciona un rol.
2. Ingresa con celular.
3. Se registra o consulta su usuario en Firestore.
4. Según su rol, entra a su dashboard.
5. El agricultor publica una cosecha.
6. El comprador compra o solicita un producto.
7. La carga pasa a esperar transporte.
8. El transportista acepta el flete.
9. El envío cambia de estado hasta ser entregado.
10. Las alertas viales pueden afectar el estado de la ruta.

## 4. Archivos sugeridos para trabajar

Martel puede crear estos archivos:

```txt id="ag7n10"
src/lib/firebase.ts
src/types/userTypes.ts
src/types/orderTypes.ts
src/types/shipmentTypes.ts
src/types/routeTypes.ts
src/types/rutiTypes.ts
src/services/authService.ts
src/services/userService.ts
src/services/orderService.ts
src/services/shipmentService.ts
src/services/roadReportService.ts
src/data/mockUsers.ts
src/data/mockOrders.ts
src/data/mockShipments.ts
src/data/mockRoadReports.ts
src/data/rutiKnowledgeBase.ts
```

También puede crear:

```txt id="ox7q7e"
src/config/firebaseConfig.example.ts
```

Importante:

No debe subir claves reales de Firebase al repositorio.

Si se necesita configuración real, debe usarse archivo `.env` y dejar `.env.example`.

## 5. Fase 1: Revisar estado actual

Antes de escribir código, Martel debe:

1. Confirmar que está en la rama feature/firebase.
2. Ejecutar npm install si aún no lo hizo.
3. Ejecutar npm run dev.
4. Revisar la estructura actual del proyecto.
5. Identificar si ya existe carpeta services, types, lib o data.

Resultado esperado:

Martel debe saber qué archivos puede crear sin romper el proyecto actual.

## 6. Fase 2: Definir roles del sistema

Crear un tipo de rol:

```ts id="u717s2"
export type UserRole = 'FARMER' | 'BUYER' | 'DRIVER';
```

Cada usuario debe tener:

```ts id="x156e9"
export interface AgroUser {
  uid: string;
  phoneNumber: string;
  role: UserRole;
  name: string;
  district?: string;
  createdAt: string;
}
```

Campos adicionales por rol:

Agricultor:

```ts id="sjslp2"
farmName?: string;
pickupLocation?: LocationPoint;
```

Comprador:

```ts id="lxqe3e"
businessName?: string;
buyerType?: 'MERCADO' | 'RESTAURANTE' | 'ACOPIADOR' | 'TIENDA' | 'EMPRESA' | 'OTRO';
```

Transportista:

```ts id="e0ecoy"
vehicleType?: 'CAMION' | 'CAMIONETA' | 'MOTOCARGA' | 'FURGON' | 'OTRO';
plate?: string;
capacity?: string;
available?: boolean;
```

## 7. Fase 3: Definir ubicación

Crear tipo para ubicación:

```ts id="2bssm1"
export interface LocationPoint {
  lat: number;
  lng: number;
  district?: string;
  address?: string;
  reference?: string;
}
```

Este tipo se usará en:

* Ubicación del agricultor.
* Destino del comprador.
* Reportes de ruta.
* Rutas de entrega.
* Punto de recojo.
* Punto de destino.

## 8. Fase 4: Definir órdenes o publicaciones

Una orden representa una cosecha publicada por un agricultor.

Estados sugeridos:

```txt id="imj3h3"
DISPONIBLE
VENDIDO_ESPERANDO_TRANSPORTE
TRANSPORTISTA_ASIGNADO
EN_RUTA
ENTREGADO
CANCELADO
```

Tipo sugerido:

```ts id="rwp7a4"
export type OrderStatus =
  | 'DISPONIBLE'
  | 'VENDIDO_ESPERANDO_TRANSPORTE'
  | 'TRANSPORTISTA_ASIGNADO'
  | 'EN_RUTA'
  | 'ENTREGADO'
  | 'CANCELADO';

export interface ProductOrder {
  id: string;
  farmerId: string;
  buyerId?: string;
  productName: string;
  quantity: number;
  unit: 'KG' | 'TON' | 'SACOS' | 'CAJAS';
  price: number;
  origin: LocationPoint;
  destination?: LocationPoint;
  status: OrderStatus;
  routeStatus: RouteStatus;
  createdAt: string;
}
```

## 9. Fase 5: Definir pedidos del comprador

Un comprador puede publicar un pedido si no encuentra producto disponible.

Estados sugeridos:

```txt id="x34ktn"
BUSCANDO_AGRICULTOR
AGRICULTOR_ASIGNADO
VENDIDO_ESPERANDO_TRANSPORTE
CANCELADO
```

Tipo sugerido:

```ts id="sc5vij"
export type PurchaseRequestStatus =
  | 'BUSCANDO_AGRICULTOR'
  | 'AGRICULTOR_ASIGNADO'
  | 'VENDIDO_ESPERANDO_TRANSPORTE'
  | 'CANCELADO';

export interface PurchaseRequest {
  id: string;
  buyerId: string;
  productName: string;
  quantity: number;
  unit: 'KG' | 'TON' | 'SACOS' | 'CAJAS';
  priceOffered: number;
  destination: LocationPoint;
  deadline?: string;
  status: PurchaseRequestStatus;
  createdAt: string;
}
```

## 10. Fase 6: Definir envíos

Un envío se crea cuando una cosecha ya fue vendida y espera transporte.

Estados sugeridos:

```txt id="ui9tyv"
PENDIENTE_TRANSPORTE
TRANSPORTISTA_ASIGNADO
EN_RUTA_RECOJO
CARGA_RECOGIDA
EN_RUTA_ENTREGA
ALERTA_RUTA
ENTREGADO
CANCELADO
```

Tipo sugerido:

```ts id="ejmp9e"
export type ShipmentStatus =
  | 'PENDIENTE_TRANSPORTE'
  | 'TRANSPORTISTA_ASIGNADO'
  | 'EN_RUTA_RECOJO'
  | 'CARGA_RECOGIDA'
  | 'EN_RUTA_ENTREGA'
  | 'ALERTA_RUTA'
  | 'ENTREGADO'
  | 'CANCELADO';

export interface Shipment {
  id: string;
  orderId: string;
  farmerId: string;
  buyerId: string;
  driverId?: string;
  productName: string;
  quantity: number;
  unit: 'KG' | 'TON' | 'SACOS' | 'CAJAS';
  origin: LocationPoint;
  destination: LocationPoint;
  status: ShipmentStatus;
  routeStatus: RouteStatus;
  estimatedTime?: string;
  driverLocation?: LocationPoint;
  createdAt: string;
  updatedAt: string;
}
```

## 11. Fase 7: Definir rutas y reportes viales

Estados de ruta:

```txt id="g32i7f"
LIBRE
RIESGO
BLOQUEADA
```

Tipos de incidencia:

```txt id="a0lsos"
HUAICO
DERRUMBE
BLOQUEO
LLUVIA
ACCIDENTE
VIA_LENTA
OTRO
```

Tipo sugerido:

```ts id="wkptau"
export type RouteStatus = 'LIBRE' | 'RIESGO' | 'BLOQUEADA';

export type IncidentType =
  | 'HUAICO'
  | 'DERRUMBE'
  | 'BLOQUEO'
  | 'LLUVIA'
  | 'ACCIDENTE'
  | 'VIA_LENTA'
  | 'OTRO';

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH';

export interface RoadReport {
  id: string;
  reportedBy: string;
  type: IncidentType;
  description: string;
  severity: Severity;
  location: LocationPoint;
  routeName?: string;
  status: 'ACTIVE' | 'RESOLVED';
  createdAt: string;
}
```

## 12. Fase 8: Crear datos simulados

Martel debe crear mocks para que el frontend pueda trabajar sin Firebase real.

Archivos sugeridos:

```txt id="43jzw3"
src/data/mockUsers.ts
src/data/mockOrders.ts
src/data/mockShipments.ts
src/data/mockRoadReports.ts
```

Debe incluir ejemplos de:

* Agricultor.
* Comprador.
* Transportista.
* Producto disponible.
* Pedido de comprador.
* Envío pendiente.
* Envío en ruta.
* Reporte de huaico.
* Reporte de derrumbe.
* Ruta bloqueada.
* Ruta en riesgo.

## 13. Fase 9: Crear servicios base

Crear servicios preparados para Firebase, pero pueden usar mocks temporalmente.

Servicios sugeridos:

```txt id="0uj1ah"
src/services/userService.ts
src/services/orderService.ts
src/services/shipmentService.ts
src/services/roadReportService.ts
```

Funciones sugeridas:

User service:

```ts id="av2clv"
getUserById(uid: string)
createUser(user: AgroUser)
getUsersByRole(role: UserRole)
```

Order service:

```ts id="ka65b8"
getAvailableOrders()
createOrder(order: ProductOrder)
buyOrder(orderId: string, buyerId: string)
updateOrderStatus(orderId: string, status: OrderStatus)
```

Shipment service:

```ts id="ym4a7p"
getPendingShipments()
createShipmentFromOrder(orderId: string)
assignDriverToShipment(shipmentId: string, driverId: string)
updateShipmentStatus(shipmentId: string, status: ShipmentStatus)
```

Road report service:

```ts id="z8yrwk"
getActiveRoadReports()
createRoadReport(report: RoadReport)
resolveRoadReport(reportId: string)
```

## 14. Fase 10: Lógica de transición de estados

Martel debe preparar funciones o comentarios claros para estas transiciones:

### Agricultor publica cosecha

DISPONIBLE

### Comprador compra lote

DISPONIBLE
→ VENDIDO_ESPERANDO_TRANSPORTE

### Se crea envío

VENDIDO_ESPERANDO_TRANSPORTE
→ PENDIENTE_TRANSPORTE

### Transportista acepta flete

PENDIENTE_TRANSPORTE
→ TRANSPORTISTA_ASIGNADO

### Transportista va al recojo

TRANSPORTISTA_ASIGNADO
→ EN_RUTA_RECOJO

### Carga recogida

EN_RUTA_RECOJO
→ CARGA_RECOGIDA

### Rumbo al destino

CARGA_RECOGIDA
→ EN_RUTA_ENTREGA

### Alerta en ruta

EN_RUTA_ENTREGA
→ ALERTA_RUTA

### Entrega finalizada

EN_RUTA_ENTREGA
→ ENTREGADO

## 15. Fase 11: Base de conocimiento para Ruti

Martel no debe crear el componente visual de Ruti, pero puede preparar la información que Ruti usará.

Archivo sugerido:

```txt id="kp6eya"
src/data/rutiKnowledgeBase.ts
```

Debe incluir:

* Preguntas frecuentes.
* Explicaciones de estados.
* Explicaciones de roles.
* Explicaciones de rutas.
* Explicaciones de flujo.

Ejemplo:

```ts id="aoxbr2"
export const rutiFaq = [
  {
    keywords: ['vender', 'cosecha', 'producto'],
    answer: 'Para vender tu cosecha, ingresa como agricultor, presiona + Vender Cosecha y completa producto, cantidad, precio y ubicación.'
  },
  {
    keywords: ['comprar', 'producto', 'lote'],
    answer: 'Para comprar un producto, ingresa como comprador, revisa los productos disponibles y presiona Comprar lote.'
  }
];
```

## 16. Fase 12: Configuración Firebase segura

Si se configura Firebase real:

Crear:

```txt id="uf8qpi"
src/lib/firebase.ts
```

Y usar variables de entorno:

```txt id="hae9v8"
.env
.env.example
```

Nunca subir `.env` con claves reales.

Sí se puede subir `.env.example` con nombres vacíos:

```txt id="emb00t"
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## 17. Fase 13: Validación final

Antes de hacer commit, Martel debe ejecutar:

```bash id="w0tkal"
npm run build
```

Si el build funciona, recién debe guardar cambios.

Commit sugerido:

```bash id="b72hbm"
git add .
git commit -m "feat(firebase): crear estructura de datos y servicios base"
git push origin feature/firebase
```

## 18. Entrega esperada

Martel debe entregar:

* Tipos de usuarios.
* Tipos de órdenes.
* Tipos de envíos.
* Tipos de rutas.
* Mocks de datos.
* Servicios base.
* Estados del flujo.
* Base de conocimiento para Ruti.
* Configuración segura para Firebase.
* Build funcionando correctamente.

No debe tocar diseño visual.
No debe tocar mapa avanzado.
No debe modificar main ni dev.
