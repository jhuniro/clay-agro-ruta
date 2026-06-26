import RouteAlerts from '../../features/routes/RouteAlerts'

export default function AlertsModule() {
  return (
    <div className="px-5 sm:px-8 lg:px-10 pt-6 pb-8 space-y-6">
      <h2 className="text-lg font-extrabold text-white">⚠ Alertas</h2>
      <RouteAlerts />
    </div>
  )
}
