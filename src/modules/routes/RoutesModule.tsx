import { useApp } from '../../context/AppContext'
import FarmerRouteView from '../../features/routes/FarmerRouteView'
import BuyerRouteView from '../../features/routes/BuyerRouteView'
import DriverRouteView from '../../features/routes/DriverRouteView'
import RouteAlerts from '../../features/routes/RouteAlerts'

const ROUTE_VIEWS = {
  farmer: FarmerRouteView,
  buyer: BuyerRouteView,
  transporter: DriverRouteView,
}

export default function RoutesModule() {
  const { role } = useApp()
  const RouteView = role ? ROUTE_VIEWS[role] : FarmerRouteView

  return (
    <div className="px-5 sm:px-8 lg:px-10 pt-6 pb-8 space-y-6">
      <h2 className="text-lg font-extrabold text-white">🛣 Rutas y Tránsito</h2>
      <RouteAlerts />
      <RouteView />
    </div>
  )
}
