import { Wheat } from 'lucide-react'
import DashboardCard from '../../components/DashboardCard'
import PublishHarvest from '../../features/farmer/PublishHarvest'

const cosechas = [
  { name: 'Papas', qty: '50 kg', price: 'S/ 80', status: 'Disponible' },
  { name: 'Zanahorias', qty: '30 kg', price: 'S/ 45', status: 'Disponible' },
  { name: 'Maíz', qty: '100 kg', price: 'S/ 120', status: 'Vendido' },
]

export default function CosechasModule() {
  return (
    <div className="px-5 sm:px-8 lg:px-10 pt-6 pb-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-white">🌾 Mis Cosechas</h2>
        <span className="text-[10px] font-bold text-[#00e676] bg-[#00e676]/10 px-2.5 py-0.5 rounded-full border border-[#00e676]/20">
          {cosechas.length} publicadas
        </span>
      </div>

      <div className="max-w-md">
        <PublishHarvest />
      </div>

      <DashboardCard title="Cosechas publicadas" icon={<Wheat size={14} className="text-[#81c784]" />}>
        <div className="space-y-2.5 mt-1">
          {cosechas.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div>
                <span className="text-white font-semibold">{item.name}</span>
                <span className="text-[#b2dfdb] ml-2">{item.qty}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#ffab00] font-bold">{item.price}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  item.status === 'Vendido'
                    ? 'bg-[#81c784]/10 text-[#81c784]'
                    : 'bg-[#00e676]/10 text-[#00e676]'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  )
}
