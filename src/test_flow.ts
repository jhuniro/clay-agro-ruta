// src/test_flow.ts
import { createUser, getUserById } from './services/userService';
import { createShipmentFromOrder, assignDriverToShipment } from './services/shipmentService';
import { updateDriverLocation } from './services/trackingService';
import { createIncident } from './services/incidentService';

// Mock localStorage para entorno Node.js
if (typeof localStorage === 'undefined') {
  const store: Record<string, string> = {};
  (global as any).localStorage = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); }
  };
}

async function runTest() {
  console.log('=== STARTING FUNCTIONAL FLOW SIMULATION ===');
  
  // 1. Crear Usuario Agricultor
  const farmer = {
    uid: 'farmer_test_123',
    phoneNumber: '+51999888777',
    role: 'FARMER' as const,
    name: 'Juan Perez',
    createdAt: new Date().toISOString()
  };
  await createUser(farmer);
  console.log('✔ 1. Farmer creado:', await getUserById(farmer.uid));
  
  // 2. Simular Orden comprada (para generar el flete)
  const orderId = 'order_test_456';
  const orderData = {
    id: orderId,
    farmerId: farmer.uid,
    productName: 'Papa Amarilla',
    quantity: 10,
    unit: 'TON',
    origin: { lat: -9.9306, lng: -76.2422 },
    routeStatus: 'LIBRE',
    createdAt: new Date().toISOString(),
    buyerId: 'buyer_test_789'
  };
  
  localStorage.setItem('agroruta_orders', JSON.stringify([orderData]));
  console.log('✔ 2. Orden guardada y comprada por el Buyer "buyer_test_789".');
  
  // 3. Crear envío (Shipment)
  const shipment = await createShipmentFromOrder(orderId);
  console.log('✔ 3. Envío generado de forma automática:', shipment);
  
  // 4. Asignar conductor (Driver)
  const driverId = 'driver_test_999';
  await assignDriverToShipment(shipment.id, driverId);
  console.log('✔ 4. Conductor "driver_test_999" asignado al envío.');
  
  // 5. Actualizar localización de Tracking
  await updateDriverLocation(driverId, shipment.id, { lat: -9.9500, lng: -76.2600 });
  console.log('✔ 5. Coordenadas de tracking del conductor actualizadas.');
  
  const trackingData = localStorage.getItem('agroruta_driver_tracking');
  console.log('   Tracking en almacenamiento local:', trackingData ? JSON.parse(trackingData) : 'No encontrado');
  
  // 6. Reportar incidente vial
  const incident = {
    id: 'incident_test_777',
    type: 'HUAICO' as const,
    severity: 'HIGH' as const,
    description: 'Huaico de gran intensidad bloquea Carretera Central Km 45',
    location: { lat: -9.9600, lng: -76.2700 },
    createdAt: new Date().toISOString()
  };
  await createIncident(incident);
  console.log('✔ 6. Incidencia reportada exitosamente:', incident);
  
  console.log('=== SIMULATION COMPLETED SUCCESSFULLY ===');
}

runTest().catch(console.error);
