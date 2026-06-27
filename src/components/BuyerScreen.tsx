import { useState } from 'react'
import type { Order } from '../types'
import { MY_ORDERS, WEATHER } from '../data/mockData'
import BuyerMap from './BuyerMap'
import AppSidebar from './AppSidebar'
import { useBuyerStore } from '@/stores/buyerStore'
import './BuyerScreen.css'

interface Props {
  onBack: () => void
}

const PRODUCERS = [
  {
    id: 1,
    name: 'Juan Pérez',
    avatar: '👨‍🌾',
    location: 'Huamalíes, Huánuco',
    product: 'Papa huayro',
    emoji: '🥔',
    price: 2.5,
    unit: 'kg',
    stock: 5000,
    rating: 4.8,
    sales: 127,
    whatsapp: '+51923456789',
    desc: 'Papa de alta calidad, cosecha fresca. Entrega directa desde la chacra.',
  },
  {
    id: 2,
    name: 'María López',
    avatar: '👩‍🌾',
    location: 'Lauricocha, Huánuco',
    product: 'Maíz amarillo',
    emoji: '🌽',
    price: 1.8,
    unit: 'kg',
    stock: 3000,
    rating: 4.6,
    sales: 89,
    whatsapp: '+51923456790',
    desc: 'Maíz criollo de grano grande, ideal para consumo humano y animal.',
  },
  {
    id: 3,
    name: 'Carlos Mendoza',
    avatar: '👨‍🌾',
    location: 'Leoncio Prado, Huánuco',
    product: 'Café washed',
    emoji: '☕',
    price: 12.0,
    unit: 'kg',
    stock: 800,
    rating: 4.9,
    sales: 203,
    whatsapp: '+51923456791',
    desc: 'Café de especialidad, proceso washed. Notas achocolatadas y cítricas.',
  },
  {
    id: 4,
    name: 'Ana Torres',
    avatar: '👩‍🌾',
    location: 'Marañón, Huánuco',
    product: 'Aguacate',
    emoji: '🥑',
    price: 5.0,
    unit: 'kg',
    stock: 1200,
    rating: 4.7,
    sales: 156,
    whatsapp: '+51923456792',
    desc: 'Aguacate Hass, maduración perfecta. Recolección manual.',
  },
  {
    id: 5,
    name: 'Pedro Quispe',
    avatar: '👨‍🌾',
    location: 'Tingo María, Huánuco',
    product: 'Cacao',
    emoji: '🫘',
    price: 8.5,
    unit: 'kg',
    stock: 600,
    rating: 4.5,
    sales: 74,
    whatsapp: '+51923456793',
    desc: 'Cacao orgánico, grano entero. Certificación orgánica regional.',
  },
]

const PURCHASES = [
  {
    id: 'ORD-001',
    product: 'Papa huayro',
    emoji: '🥔',
    qty: '500 kg',
    seller: 'Juan Pérez',
    price: 1250,
    status: 'EN_RUTA',
    driver: 'Carlos M.',
    plate: 'ABC-123',
    origin: 'Huamalíes',
    dest: 'Huánuco centro',
    eta: '2h 15min',
    progress: 62,
    lat: -9.8,
    lng: -76.2,
    reports: [
      { time: '08:30', msg: 'Carga verificada en origen' },
      { time: '09:15', msg: 'Salió de Huamalíes' },
      { time: '10:00', msg: 'En ruta por la vía central' },
    ],
  },
  {
    id: 'ORD-002',
    product: 'Maíz amarillo',
    emoji: '🌽',
    qty: '300 kg',
    seller: 'María López',
    price: 540,
    status: 'PENDIENTE',
    driver: 'Buscando...',
    plate: '—',
    origin: 'Lauricocha',
    dest: 'Huánuco centro',
    eta: 'Pendiente',
    progress: 10,
    lat: -9.7,
    lng: -76.5,
    reports: [],
  },
  {
    id: 'ORD-003',
    product: 'Café washed',
    emoji: '☕',
    qty: '200 kg',
    seller: 'Carlos Mendoza',
    price: 2400,
    status: 'ENTREGADO',
    driver: 'Luis R.',
    plate: 'XYZ-789',
    origin: 'Leoncio Prado',
    dest: 'Huánuco centro',
    eta: 'Entregado',
    progress: 100,
    lat: -9.8,
    lng: -76.2,
    reports: [
      { time: '07:00', msg: 'Carga verificada' },
      { time: '08:30', msg: 'En ruta' },
      { time: '11:00', msg: 'Entregado al comprador' },
    ],
  },
]

function getStatusColor(s: string) {
  if (s === 'EN_RUTA') return 'green'
  if (s === 'PENDIENTE') return 'yellow'
  return 'blue'
}

function getStatusLabel(s: string) {
  if (s === 'EN_RUTA') return 'En tránsito'
  if (s === 'PENDIENTE') return 'Pendiente'
  return 'Recibido'
}

export default function BuyerScreen({ onBack }: Props) {
  const { tab, setTab } = useBuyerStore()
  const [showMap, setShowMap] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [expandedPurchase, setExpandedPurchase] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const handleShowMap = (order: Order) => {
    setSelectedOrder(order)
    setShowMap(true)
  }

  const filteredProducers = PRODUCERS.filter(p =>
    p.product.toLowerCase().includes(search.toLowerCase()) ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="buyer-layout" aria-label="Pantalla del Comprador">
      <div className="buyer-topbar">
        <button className="buyer-topbar__back" onClick={onBack} type="button">
          ← Volver
        </button>
        <span className="buyer-topbar__title">🛒 Comprador</span>
      </div>

      <AppSidebar module="buyer" activeTab={tab} onTabChange={setTab} />

      <main className="buyer-main">
        {/* ═══ INICIO ═══ */}
        {tab === 'inicio' && (
          <>
            <div style={{ position: 'relative' }}>
              <svg style={{ position: 'absolute', right: 0, top: -10, pointerEvents: 'none' }} width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M0 25 Q25 15 50 28 Q75 41 100 25" stroke="rgba(29,155,240,0.08)" strokeWidth="1.5" fill="none"/>
                <path d="M0 35 Q30 25 55 36 Q80 47 100 35" stroke="rgba(29,155,240,0.05)" strokeWidth="1" fill="none"/>
              </svg>
              <h1 className="role-greeting role-greeting--buyer">Hola, Carlos 👋</h1>
            </div>
            <p className="role-subtitle">Busca productos y verifica rutas antes de comprar</p>
            <BuyerDashboardContent onShowMap={handleShowMap} />
          </>
        )}

        {/* ═══ MERCADO ═══ */}
        {tab === 'mercado' && (
          <div className="bd">
            <div className="bd-greeting">
              <div>
                <h1 className="bd-greeting__title">Mercado 🛒</h1>
                <p className="bd-greeting__sub">Explora productos de productores locales</p>
              </div>
            </div>

            <div className="bd-search">
              <input
                className="bd-search__input"
                type="text"
                placeholder="Buscar producto, productor o ubicación..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="bd-producers">
              {filteredProducers.map(p => (
                <div key={p.id} className="bd-producer">
                  <div className="bd-producer__header">
                    <span className="bd-producer__avatar">{p.avatar}</span>
                    <div className="bd-producer__info">
                      <span className="bd-producer__name">{p.name}</span>
                      <span className="bd-producer__loc">📍 {p.location}</span>
                    </div>
                    <span className="bd-producer__rating">⭐ {p.rating}</span>
                  </div>

                  <div className="bd-producer__product">
                    <span className="bd-producer__emoji">{p.emoji}</span>
                    <div>
                      <span className="bd-producer__pname">{p.product}</span>
                      <span className="bd-producer__desc">{p.desc}</span>
                    </div>
                  </div>

                  <div className="bd-producer__stats">
                    <div className="bd-producer__stat">
                      <span className="bd-producer__stat-val">S/ {p.price}</span>
                      <span className="bd-producer__stat-lbl">por {p.unit}</span>
                    </div>
                    <div className="bd-producer__stat">
                      <span className="bd-producer__stat-val">{p.stock.toLocaleString()}</span>
                      <span className="bd-producer__stat-lbl">kg disponibles</span>
                    </div>
                    <div className="bd-producer__stat">
                      <span className="bd-producer__stat-val">{p.sales}</span>
                      <span className="bd-producer__stat-lbl">ventas</span>
                    </div>
                  </div>

                  <div className="bd-producer__actions">
                    <a
                      className="bd-producer__whatsapp"
                      href={`https://wa.me/${p.whatsapp.replace('+', '')}?text=Hola ${p.name}, me interesa comprar ${p.product}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📱 WhatsApp
                    </a>
                    <button className="bd-producer__buy" type="button">
                      🛒 Comprar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ MIS COMPRAS ═══ */}
        {tab === 'compras' && (
          <div className="bd">
            <div className="bd-greeting">
              <div>
                <h1 className="bd-greeting__title">Mis Compras 📦</h1>
                <p className="bd-greeting__sub">Seguimiento detallado de tus pedidos</p>
              </div>
            </div>

            <div className="bd-purchases">
              {PURCHASES.map(p => (
                <div key={p.id} className="bd-purchase">
                  <div className="bd-purchase__header" onClick={() => setExpandedPurchase(expandedPurchase === p.id ? null : p.id)}>
                    <div className="bd-purchase__top">
                      <span className="bd-purchase__emoji">{p.emoji}</span>
                      <div className="bd-purchase__meta">
                        <span className="bd-purchase__id">{p.id}</span>
                        <span className="bd-purchase__product">{p.product} — {p.qty}</span>
                      </div>
                      <span className={`bd-badge bd-badge--${getStatusColor(p.status)}`}>
                        {getStatusLabel(p.status)}
                      </span>
                    </div>
                    <div className="bd-purchase__route">
                      📍 {p.origin} → 🏁 {p.dest}
                    </div>
                    <div className="bd-purchase__progress">
                      <div className={`bd-purchase__progress-bar ${p.status === 'PENDIENTE' ? 'bd-purchase__progress-bar--pending' : p.status === 'ENTREGADO' ? 'bd-purchase__progress-bar--done' : ''}`} style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="bd-purchase__expand">{expandedPurchase === p.id ? '▲ Ocultar' : '▼ Ver detalles'}</span>
                  </div>

                  {expandedPurchase === p.id && (
                    <div className="bd-purchase__details">
                      <div className="bd-purchase__detail-grid">
                        <div className="bd-purchase__detail-card">
                          <span className="bd-purchase__detail-icon">💰</span>
                          <span className="bd-purchase__detail-label">Total</span>
                          <span className="bd-purchase__detail-value">S/ {p.price}</span>
                        </div>
                        <div className="bd-purchase__detail-card">
                          <span className="bd-purchase__detail-icon">🚚</span>
                          <span className="bd-purchase__detail-label">Conductor</span>
                          <span className="bd-purchase__detail-value">{p.driver}</span>
                        </div>
                        <div className="bd-purchase__detail-card">
                          <span className="bd-purchase__detail-icon">🪪</span>
                          <span className="bd-purchase__detail-label">Placa</span>
                          <span className="bd-purchase__detail-value">{p.plate}</span>
                        </div>
                        <div className="bd-purchase__detail-card">
                          <span className="bd-purchase__detail-icon">⏱️</span>
                          <span className="bd-purchase__detail-label">ETA</span>
                          <span className="bd-purchase__detail-value">{p.eta}</span>
                        </div>
                      </div>

                      {p.status === 'EN_RUTA' && (
                        <div className="bd-purchase__map">
                          <div className="bd-purchase__map-header">
                            <span>🗺️ Ubicación del camión</span>
                            <button className="bd-purchase__map-btn" onClick={() => {
                              setSelectedOrder({ id: p.id, product: p.product, emoji: p.emoji, quantity: parseInt(p.qty), unit: 'kg', origin: p.origin, destination: p.dest, status: 'EN_RUTA', routeStatus: 'libre', truckPlate: p.plate } as Order)
                              setShowMap(true)
                            }} type="button">Ver mapa completo</button>
                          </div>
                          <div className="bd-purchase__map-placeholder">
                            <span>📍</span>
                            <span>Lat: {p.lat}, Lng: {p.lng}</span>
                            <span className="bd-purchase__map-live">● En tiempo real</span>
                          </div>
                        </div>
                      )}

                      {p.reports.length > 0 && (
                        <div className="bd-purchase__reports">
                          <h3 className="bd-purchase__reports-title">📋 Reportes del conductor</h3>
                          {p.reports.map((r, i) => (
                            <div key={i} className="bd-purchase__report">
                              <span className="bd-purchase__report-time">{r.time}</span>
                              <span className="bd-purchase__report-msg">{r.msg}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ PERFIL ═══ */}
        {tab === 'perfil' && (
          <div className="bd">
            <div className="bd-greeting">
              <div>
                <h1 className="bd-greeting__title">Mi Perfil 👤</h1>
                <p className="bd-greeting__sub">Datos de tu cuenta de comprador</p>
              </div>
            </div>

            <div className="bd-profile">
              <div className="bd-profile__card bd-profile__card--main">
                <div className="bd-profile__avatar">CG</div>
                <div className="bd-profile__identity">
                  <span className="bd-profile__name">Carlos García Mendoza</span>
                  <span className="bd-profile__type">Comprador Mayorista</span>
                  <span className="bd-profile__id">DNI: 45236789</span>
                </div>
              </div>

              <div className="bd-profile__grid">
                <div className="bd-profile__card">
                  <span className="bd-profile__card-icon">📧</span>
                  <span className="bd-profile__card-label">Email</span>
                  <span className="bd-profile__card-value">carlos.garcia@agroruta.com</span>
                </div>
                <div className="bd-profile__card">
                  <span className="bd-profile__card-icon">📱</span>
                  <span className="bd-profile__card-label">Teléfono</span>
                  <span className="bd-profile__card-value">+51 923 456 789</span>
                </div>
                <div className="bd-profile__card">
                  <span className="bd-profile__card-icon">📍</span>
                  <span className="bd-profile__card-label">Ubicación</span>
                  <span className="bd-profile__card-value">Jr. San Martín 456, Huánuco</span>
                </div>
                <div className="bd-profile__card">
                  <span className="bd-profile__card-icon">🏢</span>
                  <span className="bd-profile__card-label">Empresa</span>
                  <span className="bd-profile__card-value">Distribuidora García SAC</span>
                </div>
                <div className="bd-profile__card">
                  <span className="bd-profile__card-icon">🪪</span>
                  <span className="bd-profile__card-label">RUC</span>
                  <span className="bd-profile__card-value">20523678901</span>
                </div>
                <div className="bd-profile__card">
                  <span className="bd-profile__card-icon">📅</span>
                  <span className="bd-profile__card-label">Miembro desde</span>
                  <span className="bd-profile__card-value">Marzo 2025</span>
                </div>
              </div>

              <div className="bd-profile__stats-row">
                <div className="bd-profile__stat">
                  <span className="bd-profile__stat-num">23</span>
                  <span className="bd-profile__stat-lbl">Compras totales</span>
                </div>
                <div className="bd-profile__stat">
                  <span className="bd-profile__stat-num">S/ 18,500</span>
                  <span className="bd-profile__stat-lbl">Invertidos</span>
                </div>
                <div className="bd-profile__stat">
                  <span className="bd-profile__stat-num">12</span>
                  <span className="bd-profile__stat-lbl">Proveedores</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ CONFIGURACIÓN ═══ */}
        {tab === 'config' && (
          <div className="bd">
            <div className="bd-greeting">
              <div>
                <h1 className="bd-greeting__title">Configuración ⚙️</h1>
                <p className="bd-greeting__sub">Ajustes de la aplicación</p>
              </div>
            </div>
            <div className="bd-orders">
              <div className="bd-order">
                <div className="bd-order__row bd-order__row--top">
                  <span className="bd-order__emoji">🔔</span>
                  <div>
                    <span className="bd-order__product">Notificaciones</span>
                    <span className="bd-order__qty">Activadas</span>
                  </div>
                </div>
              </div>
              <div className="bd-order">
                <div className="bd-order__row bd-order__row--top">
                  <span className="bd-order__emoji">🌙</span>
                  <div>
                    <span className="bd-order__product">Modo oscuro</span>
                    <span className="bd-order__qty">Activado</span>
                  </div>
                </div>
              </div>
              <div className="bd-order">
                <div className="bd-order__row bd-order__row--top">
                  <span className="bd-order__emoji">🌍</span>
                  <div>
                    <span className="bd-order__product">Idioma</span>
                    <span className="bd-order__qty">Español</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {showMap && selectedOrder && (
        <BuyerMap order={selectedOrder} onClose={() => setShowMap(false)} />
      )}
    </div>
  )
}

/* ═══ Dashboard Content (inline) ═══ */
function BuyerDashboardContent({ onShowMap }: { onShowMap: (o: Order) => void }) {
  const activeOrders = MY_ORDERS.filter(o => o.status !== 'ENTREGADO')
  const inTransit = MY_ORDERS.filter(o => o.status === 'EN_RUTA')

  return (
    <div className="bd">
      <div className="bd-stats">
        <div className="bd-stat bd-stat--blue">
          <span className="bd-stat__num">{activeOrders.length}</span>
          <span className="bd-stat__label">Activos</span>
        </div>
        <div className="bd-stat bd-stat--green">
          <span className="bd-stat__num">{inTransit.length}</span>
          <span className="bd-stat__label">En tránsito</span>
        </div>
        <div className="bd-stat bd-stat--yellow">
          <span className="bd-stat__num">{MY_ORDERS.filter(o => o.status === 'VENDIDO_ESPERANDO_TRANSPORTE').length}</span>
          <span className="bd-stat__label">Esperando</span>
        </div>
        <div className="bd-stat bd-stat--purple">
          <span className="bd-stat__num">{MY_ORDERS.filter(o => o.status === 'ENTREGADO').length}</span>
          <span className="bd-stat__label">Recibidos</span>
        </div>
      </div>

      <div className="bd-grid">
        <div className="bd-map-preview">
          <div className="bd-map-preview__header">
            <h2 className="bd-section-title">🗺️ Ruta de entrega</h2>
          </div>
          <div className="bd-map-preview__box">
            <div className="bd-map-placeholder">
              <span className="bd-map-placeholder__icon">🗺️</span>
              <span className="bd-map-placeholder__txt">Selecciona un pedido activo para ver la ruta</span>
            </div>
          </div>
        </div>
        <div className="bd-sidebar">
          <div className="bd-weather">
            <div className="bd-weather__content">
              <div className="bd-weather__left">
                <span className="bd-weather__temp">{WEATHER.temp}°</span>
                <span className="bd-weather__cond">{WEATHER.condition}</span>
                <span className="bd-weather__city">{WEATHER.city}</span>
              </div>
              <div className="bd-weather__right">
                <span className="bd-weather__hi">↑ {WEATHER.high}°</span>
                <span className="bd-weather__lo">↓ {WEATHER.low}°</span>
                <span className="bd-weather__icon-big">{WEATHER.icon}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bd-orders">
        <h2 className="bd-section-title">Pedidos activos</h2>
        <div className="bd-orders__grid">
          {activeOrders.map(order => (
            <div key={order.id} className="bd-order">
              <div className="bd-order__row bd-order__row--top">
                <span className="bd-order__emoji">{order.emoji}</span>
                <div>
                  <span className="bd-order__product">{order.product}</span>
                  <span className="bd-order__qty">{order.quantity}{order.unit}</span>
                </div>
                <span className={`bd-badge bd-badge--${order.routeStatus === 'libre' ? 'green' : order.routeStatus === 'riesgo' ? 'yellow' : 'red'}`}>
                  {order.status === 'EN_RUTA' ? 'En ruta' : 'Esperando'}
                </span>
              </div>
              <div className="bd-order__row">
                <span className="bd-order__route">📍 {order.origin} → {order.destination}</span>
              </div>
              <div className="bd-order__row bd-order__row--bottom">
                {order.status === 'EN_RUTA' && order.truckPlate && (
                  <span className="bd-order__driver">🚚 {order.truckPlate}</span>
                )}
                {order.status === 'EN_RUTA' && (
                  <button className="bd-order__map-btn" onClick={() => onShowMap(order)} type="button">🗺️ Ver</button>
                )}
              </div>
              <div className="bd-order__progress">
                <div className={`bd-order__progress-bar ${order.status === 'VENDIDO_ESPERANDO_TRANSPORTE' ? 'bd-order__progress-bar--pending' : ''}`} style={{ width: order.status === 'EN_RUTA' ? '60%' : '10%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
