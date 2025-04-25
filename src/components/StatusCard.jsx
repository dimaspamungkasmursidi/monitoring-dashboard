import { BatteryFull, Thermometer, Wifi, Clock } from "lucide-react"

const icons = {
  koneksi: <Wifi className="text-blue-500 w-6 h-6" />,
  baterai: <BatteryFull className="text-yellow-500 w-6 h-6" />,
  suhu: <Thermometer className="text-red-500 w-6 h-6" />,
  waktu: <Clock className="text-purple-500 w-6 h-6" />, // ← Tambahan ini bro
}

export default function StatusCard({ label, value, type }) {
  return (
    <div className="bg-white shadow rounded-2xl p-5 flex items-center gap-4">
      <div className="p-3 bg-gray-100 rounded-full">
        {icons[type] || <div className="w-6 h-6" />}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  )
}
