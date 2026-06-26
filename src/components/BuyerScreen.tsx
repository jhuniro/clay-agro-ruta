import { useState } from 'react'
import './RoleScreens.css'

interface Props {
  onBack: () => void
}

interface ProductItem {
  id: string
  name: string
  emoji: string
  quantity: number
  unit: string
  district: string
  price: number
  routeStatus: 'libre' | 'riesgo' | 'bloqueada'
  statusText: string
}

interface PurchaseItem {
  id: string
  productName: string
  emoji: string
  quantity: number
  unit: string
  price: number
  district: string
  status: 'PENDIENTE_TRANSPORTE' | 'TRANSPORTISTA_ASIGNADO' | 'EN_RUTA' | 'ENTREGADO'
  createdAt: string
}

export default function BuyerScreen({ onBack }: Props) {
  // Navigation & interaction states
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'purchases' | 'profile'>('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Form states for new purchase requests (FAB)
  const [newProdName, setNewProdName] = useState('')
  const [newQuantity, setNewQuantity] = useState(0)
  const [newUnit, setNewUnit] = useState('KG')
  const [newPrice, setNewPrice] = useState(0)
  const [newDistrict, setNewDistrict] = useState('')

  // Mock Products Database
  const [products] = useState<ProductItem[]>([
    {
      id: 'prod_1',
      name: 'Papa huayro',
      emoji: '🥔',
      quantity: 500,
      unit: 'kg',
      district: 'Huamalíes',
      price: 1200,
      routeStatus: 'libre',
      statusText: 'Disponible'
    },
    {
      id: 'prod_2',
      name: 'Maíz amarillo',
      emoji: '🌽',
      quantity: 300,
      unit: 'kg',
      district: 'Lauricocha',
      price: 800,
      routeStatus: 'riesgo',
      statusText: 'Último lote'
    },
    {
      id: 'prod_3',
      name: 'Aguacate',
      emoji: '🥑',
      quantity: 150,
      unit: 'kg',
      district: 'Marañón',
      price: 950,
      routeStatus: 'bloqueada',
      statusText: 'No disponible'
    },
    {
      id: 'prod_4',
      name: 'Café arábica',
      emoji: '☕',
      quantity: 100,
      unit: 'kg',
      district: 'Leoncio Prado',
      price: 2400,
      routeStatus: 'libre',
      statusText: 'Disponible'
    }
  ])

  // Mock Purchases List
  const [purchases, setPurchases] = useState<PurchaseItem[]>([
    {
      id: 'pur_1',
      productName: 'Papa Amarilla',
      emoji: '🥔',
      quantity: 2,
      unit: 'TON',
      price: 3600,
      district: 'Ambo',
      status: 'EN_RUTA',
      createdAt: '2026-06-25T14:20:00Z'
    }
  ])

  // Handle product purchase
  const handleBuyProduct = (product: ProductItem) => {
    if (product.routeStatus === 'bloqueada') return

    // Add to purchases list
    const newPurchase: PurchaseItem = {
      id: `pur_${Date.now()}`,
      productName: product.name,
      emoji: product.emoji,
      quantity: product.quantity,
      unit: product.unit.toUpperCase(),
      price: product.price,
      district: product.district,
      status: 'PENDIENTE_TRANSPORTE',
      createdAt: new Date().toISOString()
    }

    setPurchases([newPurchase, ...purchases])
    triggerToast(`¡Compra de ${product.name} iniciada! Buscando transportista...`)
  }

  // Handle request publication
  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProdName || newQuantity <= 0 || newPrice <= 0) return

    triggerToast(`Pedido de ${newProdName} publicado exitosamente en el Marketplace.`)
    setShowPublishModal(false)
    
    // Reset form
    setNewProdName('')
    setNewQuantity(0)
    setNewUnit('KG')
    setNewPrice(0)
    setNewDistrict('')
  }

  const triggerToast = (msg: string) => {
    setSuccessMessage(msg)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 4000)
  }

  // Filter products based on search input
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.district.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="role-screen role-screen--buyer-nav" aria-label="Pantalla del Comprador">
      
      {/* ⚡ 2. Cabecera y Acciones Rápidas (Sticky Header) */}
      <header className="role-header-sticky">
        <div className="role-header-sticky__top">
          <button className="role-topbar__back" onClick={onBack} type="button">
            ← Volver
          </button>
          <div className="role-header-sticky__greeting">
            <span className="role-header-sticky__small">Hola, comprador 👋</span>
          </div>
          <span className="role-topbar__title" style={{ color: '#90caf9' }}>🛒 Comprador</span>
        </div>

        {/* Buscador sticky real */}
        <div className="role-header-sticky__search-wrapper">
          <span className="role-header-sticky__search-icon">🔍</span>
          <input
            id="search-input"
            type="text"
            className="role-header-sticky__search-input"
            placeholder="Buscar por producto o distrito..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Buscar productos"
          />
          {searchQuery && (
            <button 
              className="role-header-sticky__clear-btn" 
              onClick={() => setSearchQuery('')}
              type="button"
            >
              ✕
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area based on tabs */}
      <main className="buyer-main-content">
        
        {successMessage && (
          <div className="toast-notification alert-banner alert-banner--info" role="alert">
            <span className="alert-banner__icon">🌿</span>
            <div>{successMessage}</div>
          </div>
        )}

        {activeTab === 'home' && (
          <>
            <h2 className="section-title">Marketplace · Productos disponibles</h2>
            {filteredProducts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state__icon">🌾</div>
                <p className="empty-state__text">No se encontraron productos para tu búsqueda.</p>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((p) => (
                  /* 📦 3. Reestructuración de las Tarjetas (Cards) */
                  <div 
                    key={p.id} 
                    className={`item-card item-card--stacked ${p.routeStatus === 'bloqueada' ? 'item-card--blocked' : ''}`}
                  >
                    {/* Bloque Superior */}
                    <div className="item-card__header-stacked">
                      <div className="item-card__title-group">
                        <span className="item-card__emoji">{p.emoji}</span>
                        <span className="item-card__product-name">
                          {p.name} <span className="item-card__qty-label">x {p.quantity} {p.unit}</span>
                        </span>
                      </div>
                      <span className={`item-card__status item-card__status--${p.routeStatus}`}>
                        {p.statusText}
                      </span>
                    </div>

                    {/* Bloque Medio */}
                    <div className="item-card__grid">
                      <div className="item-card__grid-col">
                        <span className="item-card__label">Origen</span>
                        <span className="item-card__value">📍 {p.district}</span>
                      </div>
                      <div className="item-card__grid-col">
                        <span className="item-card__label">Precio</span>
                        <span className="item-card__value">💰 S/ {p.price.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Bloque Inferior */}
                    <div className="item-card__footer-stacked">
                      <div className={`route-badge-full route-badge-full--${p.routeStatus}`}>
                        {p.routeStatus === 'libre' && '🟢 RUTA LIBRE'}
                        {p.routeStatus === 'riesgo' && '🟡 RUTA EN RIESGO'}
                        {p.routeStatus === 'bloqueada' && '🔴 RUTA BLOQUEADA'}
                      </div>

                      {p.routeStatus === 'bloqueada' ? (
                        <button 
                          className="action-btn action-btn--disabled action-btn--full-width" 
                          type="button" 
                          disabled
                        >
                          No disponible (Ruta Bloqueada)
                        </button>
                      ) : (
                        <button 
                          className="action-btn action-btn--primary action-btn--full-width" 
                          type="button"
                          onClick={() => handleBuyProduct(p)}
                        >
                          Comprar lote
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'search' && (
          <>
            <h2 className="section-title">Buscar & Categorías</h2>
            <p className="role-subtitle">Usa la barra de búsqueda de arriba para filtrar productos al instante.</p>
            <div className="search-categories">
              <div className="category-pill" onClick={() => setSearchQuery('Papa')}>🥔 Tubérculos</div>
              <div className="category-pill" onClick={() => setSearchQuery('Maíz')}>🌽 Cereales</div>
              <div className="category-pill" onClick={() => setSearchQuery('Aguacate')}>🥑 Frutas</div>
              <div className="category-pill" onClick={() => setSearchQuery('Café')}>☕ Especiales</div>
            </div>
          </>
        )}

        {activeTab === 'purchases' && (
          <>
            <h2 className="section-title">Mis Compras (Logística)</h2>
            {purchases.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state__icon">📦</div>
                <p className="empty-state__text">Aún no has realizado ninguna compra.</p>
              </div>
            ) : (
              <div className="purchases-list">
                {purchases.map((item) => (
                  <div key={item.id} className="trip-card">
                    <div className="trip-card__header">
                      <span>{item.emoji} {item.productName} x {item.quantity} {item.unit}</span>
                      <span className={`route-badge route-badge--${item.status === 'ENTREGADO' ? 'libre' : item.status === 'EN_RUTA' ? 'riesgo' : 'libre'}`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="trip-card__route">
                      <span>Origen: {item.district}</span> &nbsp;·&nbsp;
                      <span>Pagado: S/ {item.price.toLocaleString()}</span>
                    </div>
                    <div className="trip-card__product">
                      Fecha: {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'profile' && (
          <>
            <h2 className="section-title">Mi Perfil Comprador</h2>
            <div className="item-card">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                <div><strong>Nombre:</strong> María Flores Martel</div>
                <div><strong>Empresa:</strong> Distribuidora AgroFlor S.A.C.</div>
                <div><strong>Tipo:</strong> ACOPIADOR</div>
                <div><strong>Teléfono:</strong> +51 912 345 678</div>
                <div><strong>Región:</strong> Huánuco, Perú</div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Floating Action Button (FAB) for posting requests */}
      <button 
        className="fab-btn" 
        onClick={() => setShowPublishModal(true)} 
        aria-label="Publicar pedido"
        type="button"
      >
        <span>+</span>
      </button>

      {/* Publish Request Modal */}
      {showPublishModal && (
        <div className="modal-overlay" role="dialog" aria-labelledby="modal-title">
          <div className="modal-content">
            <h3 id="modal-title" className="modal-content__title">Publicar Pedido de Compra</h3>
            <p className="modal-content__subtitle">¿No encuentras el producto? Pídelo para que los agricultores te oferten.</p>
            
            <form onSubmit={handleCreateRequest}>
              <div className="form-group">
                <label htmlFor="prodName">Producto solicitado</label>
                <input 
                  id="prodName"
                  type="text" 
                  className="form-input" 
                  placeholder="Ej. Papa Amarilla, Granadilla..."
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="qty">Cantidad</label>
                  <input 
                    id="qty"
                    type="number" 
                    className="form-input" 
                    value={newQuantity} 
                    onChange={(e) => setNewQuantity(Number(e.target.value))}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="unit">Unidad</label>
                  <select 
                    id="unit"
                    className="form-input" 
                    value={newUnit} 
                    onChange={(e) => setNewUnit(e.target.value)}
                  >
                    <option value="KG">KG</option>
                    <option value="TON">TON</option>
                    <option value="SACOS">SACOS</option>
                    <option value="CAJAS">CAJAS</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="price">Precio Ofrecido (S/)</label>
                <input 
                  id="price"
                  type="number" 
                  className="form-input" 
                  value={newPrice} 
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="dest">Distrito de Destino</label>
                <input 
                  id="dest"
                  type="text" 
                  className="form-input" 
                  placeholder="Ej. Huánuco, Amarilis..." 
                  value={newDistrict}
                  onChange={(e) => setNewDistrict(e.target.value)}
                />
              </div>

              <div className="modal-actions">
                <button 
                  className="action-btn action-btn--secondary" 
                  type="button" 
                  onClick={() => setShowPublishModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  className="action-btn action-btn--primary" 
                  type="submit"
                >
                  Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 📱 1. Navegación Principal (Bottom Nav Bar) */}
      <nav className="bottom-nav">
        <button 
          className={`bottom-nav__item ${activeTab === 'home' ? 'bottom-nav__item--active' : ''}`}
          onClick={() => setActiveTab('home')}
          type="button"
        >
          <span className="bottom-nav__icon">🏠</span>
          <span className="bottom-nav__label">Inicio</span>
        </button>
        <button 
          className={`bottom-nav__item ${activeTab === 'search' ? 'bottom-nav__item--active' : ''}`}
          onClick={() => {
            setActiveTab('search');
            setTimeout(() => document.getElementById('search-input')?.focus(), 50);
          }}
          type="button"
        >
          <span className="bottom-nav__icon">🔍</span>
          <span className="bottom-nav__label">Buscar</span>
        </button>
        <button 
          className={`bottom-nav__item ${activeTab === 'purchases' ? 'bottom-nav__item--active' : ''}`}
          onClick={() => setActiveTab('purchases')}
          type="button"
        >
          <span className="bottom-nav__icon">📦</span>
          <span className="bottom-nav__label">Mis Compras</span>
        </button>
        <button 
          className={`bottom-nav__item ${activeTab === 'profile' ? 'bottom-nav__item--active' : ''}`}
          onClick={() => setActiveTab('profile')}
          type="button"
        >
          <span className="bottom-nav__icon">👤</span>
          <span className="bottom-nav__label">Perfil</span>
        </button>
      </nav>
    </div>
  )
}
