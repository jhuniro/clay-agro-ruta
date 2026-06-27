import type { Order, WeatherData, RoadAlert, Category, BuyerProfile, BuyerConfig, AppNotification, Review } from '../types'
export const CATEGORIES: Category[] = [
  { id: 'papa', name: 'Papa', emoji: '🥔' },
  { id: 'maiz', name: 'Maíz', emoji: '🌽' },
  { id: 'cafe', name: 'Café', emoji: '☕' },
  { id: 'cacao', name: 'Cacao', emoji: '🍫' },
  { id: 'aguacate', name: 'Aguacate', emoji: '🥑' },
  { id: 'tomate', name: 'Tomate', emoji: '🍅' },
]

export const WEATHER: WeatherData = {
  city: 'Huánuco centro',
  temp: 18,
  condition: 'Parcialmente nublado',
  icon: '⛅',
  high: 22,
  low: 12,
}

export const ROAD_ALERTS: RoadAlert[] = [
  {
    id: 'a1',
    zone: 'Ambo',
    message: '⚠️ Ruta Ambo bloqueada por huaico. Evitar zona.',
    severity: 'danger',
  },
  {
    id: 'a2',
    zone: 'Tingo María',
    message: '⚠️ Desvío disponible por Llacuabamba en ruta Tingo María.',
    severity: 'warning',
  },
]

export const MARKETPLACE_PRODUCTS: Order[] = [
  {
    id: 'mp1',
    product: 'Papa Amarilla Tumbay',
    emoji: '🥔',
    categoryId: 'papa',
    quantity: 2000,
    unit: 'kg',
    price: 3000,
    pricePerKg: 1.5,
    origin: 'Pachitea',
    originCoord: { lat: -9.95, lng: -76.15 },
    destination: 'Huánuco centro',
    destinationCoord: { lat: -9.9306, lng: -76.2415 },
    routeStatus: 'libre',
    status: 'AVAILABLE',
    farmerName: 'Juan Pérez',
    farmerPhone: '51999111222',
    distanceKm: 40,
    description: 'Papa de primera calidad, ideal para pollerías y restaurantes.',
    paymentMethods: ['Yape', 'Plin', 'Efectivo'],
    deliverySchedule: 'Lunes a Viernes - 8am a 2pm'
  },
  {
    id: 'mp2',
    product: 'Maíz Amarillo Premium',
    emoji: '🌽',
    categoryId: 'maiz',
    quantity: 800,
    unit: 'kg',
    price: 1200,
    pricePerKg: 1.5,
    origin: 'Lauricocha',
    originCoord: { lat: -10.1, lng: -76.6 },
    destination: 'Huánuco centro',
    destinationCoord: { lat: -9.9306, lng: -76.2415 },
    routeStatus: 'riesgo',
    status: 'AVAILABLE',
    farmerName: 'María Gonzales',
    farmerPhone: '51999333444',
    distanceKm: 85,
    description: 'Maíz amarillo en excelente estado, cosechado esta semana.',
    paymentMethods: ['Yape', 'Transferencia'],
    deliverySchedule: 'Martes y Jueves - 9am a 4pm'
  },
  {
    id: 'mp3',
    product: 'Café Arábica Orgánico',
    emoji: '☕',
    categoryId: 'cafe',
    quantity: 500,
    unit: 'kg',
    price: 5000,
    pricePerKg: 10,
    origin: 'Leoncio Prado',
    originCoord: { lat: -9.35, lng: -76.0 },
    destination: 'Huánuco centro',
    destinationCoord: { lat: -9.9306, lng: -76.2415 },
    routeStatus: 'libre',
    status: 'AVAILABLE',
    farmerName: 'Carlos Ramos',
    farmerPhone: '51999555666',
    distanceKm: 65,
    description: 'Café orgánico cultivado en altura, grano seleccionado.',
    paymentMethods: ['Transferencia', 'Plin'],
    deliverySchedule: 'Fines de semana - 8am a 12pm'
  },
  {
    id: 'mp4',
    product: 'Cacao Fino de Aroma',
    emoji: '🍫',
    categoryId: 'cacao',
    quantity: 300,
    unit: 'kg',
    price: 4500,
    pricePerKg: 15,
    origin: 'Marañón',
    originCoord: { lat: -9.5, lng: -76.8 },
    destination: 'Huánuco centro',
    destinationCoord: { lat: -9.9306, lng: -76.2415 },
    routeStatus: 'bloqueada',
    status: 'AVAILABLE',
    farmerName: 'Ana Torres',
    farmerPhone: '51999777888',
    distanceKm: 120,
    description: 'Cacao fino ideal para exportación o chocolatería artesanal.',
    paymentMethods: ['Yape', 'Efectivo'],
    deliverySchedule: 'Miércoles - 10am a 5pm'
  },
  {
    id: 'mp5',
    product: 'Papa Huayro Fresca',
    emoji: '🥔',
    categoryId: 'papa',
    quantity: 1500,
    unit: 'kg',
    price: 2250,
    pricePerKg: 1.5,
    origin: 'Huamalíes',
    originCoord: { lat: -9.2, lng: -76.3 },
    destination: 'Huánuco centro',
    destinationCoord: { lat: -9.9306, lng: -76.2415 },
    routeStatus: 'libre',
    status: 'AVAILABLE',
    farmerName: 'Pedro Soto',
    farmerPhone: '51999123456',
    distanceKm: 55,
    description: 'Papa de altura de la mejor calidad. Cosecha reciente.',
    paymentMethods: ['Efectivo', 'Transferencia'],
    deliverySchedule: 'Lunes a Sábado - 7am a 3pm'
  },
  {
    id: 'mp6',
    product: 'Aguacate Hass',
    emoji: '🥑',
    categoryId: 'aguacate',
    quantity: 400,
    unit: 'kg',
    price: 2800,
    pricePerKg: 7,
    origin: 'Marañón',
    originCoord: { lat: -9.5, lng: -76.8 },
    destination: 'Huánuco centro',
    destinationCoord: { lat: -9.9306, lng: -76.2415 },
    routeStatus: 'riesgo',
    status: 'AVAILABLE',
    farmerName: 'Rosa Limache',
    farmerPhone: '51999654321',
    distanceKm: 100,
    description: 'Palta Hass lista para madurar, excelente calibre.',
    paymentMethods: ['Yape', 'Plin'],
    deliverySchedule: 'Martes a Viernes - 9am a 5pm'
  },
]

export const MY_ORDERS: Order[] = [
  {
    id: 'mo1',
    product: 'Papa Amarilla',
    emoji: '🥔',
    quantity: 1000,
    unit: 'kg',
    price: 1500,
    pricePerKg: 1.5,
    origin: 'Pachitea',
    originCoord: { lat: -9.95, lng: -76.15 },
    destination: 'Huánuco centro',
    destinationCoord: { lat: -9.9306, lng: -76.2415 },
    routeStatus: 'libre',
    status: 'EN_RUTA',
    farmerName: 'Juan Pérez',
    farmerPhone: '51999111222',
    truckPlate: 'W12-345',
    truckCoord: { lat: -9.94, lng: -76.20 },
    distanceKm: 40,
    driverName: 'Julio Reyes',
    reports: [
      { time: '08:00 AM', msg: 'Carga completada en origen.' },
      { time: '09:30 AM', msg: 'Pasando por control de peaje.' },
      { time: '10:45 AM', msg: 'Tráfico fluido en la carretera principal.' }
    ]
  },
  {
    id: 'mo2',
    product: 'Maíz Amarillo',
    emoji: '🌽',
    quantity: 500,
    unit: 'kg',
    price: 750,
    pricePerKg: 1.5,
    origin: 'Lauricocha',
    originCoord: { lat: -10.1, lng: -76.6 },
    destination: 'Huánuco centro',
    destinationCoord: { lat: -9.9306, lng: -76.2415 },
    routeStatus: 'riesgo',
    status: 'VENDIDO_ESPERANDO_TRANSPORTE',
    farmerName: 'María Gonzales',
    farmerPhone: '51999333444',
    distanceKm: 85,
    reports: [
      { time: '07:00 AM', msg: 'Compra confirmada, buscando transportista.' }
    ]
  },
  {
    id: 'mo3',
    product: 'Café Arábica',
    emoji: '☕',
    quantity: 200,
    unit: 'kg',
    price: 2000,
    pricePerKg: 10,
    origin: 'Leoncio Prado',
    originCoord: { lat: -9.35, lng: -76.0 },
    destination: 'Huánuco centro',
    destinationCoord: { lat: -9.9306, lng: -76.2415 },
    routeStatus: 'libre',
    status: 'ENTREGADO',
    farmerName: 'Carlos Ramos',
    farmerPhone: '51999555666',
    distanceKm: 65,
    driverName: 'Marco Polo',
    truckPlate: 'Z98-765',
    reports: [
      { time: 'Ayer 08:00 AM', msg: 'Salida de origen.' },
      { time: 'Ayer 11:00 AM', msg: 'Llegada a destino.' },
      { time: 'Ayer 11:30 AM', msg: 'Descarga completada y entregado.' }
    ]
  },
]

export const WHATSAPP_NUMBER = '51999999999'

export const BUYER_PROFILE: BuyerProfile = {
  id: 'b1',
  name: 'Carlos Mendoza',
  avatar: 'https://ui-avatars.com/api/?name=Carlos+Mendoza&background=1d9bf0&color=fff',
  memberSince: 'Enero 2024',
  totalPurchases: 23,
  totalSpent: 18500,
  activeSuppliers: 12,
  avgPurchase: 804,
  topProduct: 'Papa huayro',
  email: 'carlos.mendoza@agroruta.com',
  type: 'Comprador Mayorista',
  favoriteProducts: ['Papa', 'Café', 'Maíz'],
  preferredZone: 'Huánuco centro'
}

export const BUYER_CONFIG: BuyerConfig = {
  notifications: true,
  darkMode: true,
  language: 'es',
  currency: 'PEN',
  units: 'kg'
}

export const BUYER_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'Pedido entregado',
    message: 'Tu pedido de Café Arábica ha llegado a Huánuco centro.',
    date: 'Hace 2 horas',
    read: false,
    type: 'success'
  },
  {
    id: 'n2',
    title: 'Alerta de ruta',
    message: 'El pedido de Maíz Amarillo está en una ruta con riesgo de huaicos.',
    date: 'Hace 5 horas',
    read: true,
    type: 'warning'
  }
]

export const BUYER_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Restaurante El Buen Sabor',
    rating: 5,
    comment: 'Excelente producto, llegó a tiempo y en perfectas condiciones.',
    date: 'Hace 2 días'
  },
  {
    id: 'r2',
    author: 'Mercado Central',
    rating: 4,
    comment: 'Muy buena papa, pero el transporte se demoró por la lluvia.',
    date: 'Hace 1 semana'
  }
]
