import { useApp } from '../context/AppContext'
import HomeModule from '../modules/home/HomeModule'
import CosechasModule from '../modules/cosechas/CosechasModule'
import MarketplaceModule from '../modules/marketplace/MarketplaceModule'
import RoutesModule from '../modules/routes/RoutesModule'
import ShipmentsModule from '../modules/shipments/ShipmentsModule'
import AlertsModule from '../modules/alerts/AlertsModule'
import HistoryModule from '../modules/history/HistoryModule'
import ProfileModule from '../modules/profile/ProfileModule'
import SettingsModule from '../modules/settings/SettingsModule'

const MODULE_MAP = {
  home: HomeModule,
  cosechas: CosechasModule,
  marketplace: MarketplaceModule,
  routes: RoutesModule,
  shipments: ShipmentsModule,
  alerts: AlertsModule,
  history: HistoryModule,
  profile: ProfileModule,
  settings: SettingsModule,
} as const

export default function ModuleRouter() {
  const { activeModule } = useApp()
  const Module = MODULE_MAP[activeModule] ?? HomeModule
  return <Module />
}
