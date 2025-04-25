import { useState, useEffect } from "react"
import BatteryChart from "./components/BatteryChart"
import TemperatureChart from "./components/TemperatureChart"
import StatusCard from "./components/StatusCard"
import Navbar from "./components/Navbar"
import PowerToggle from "./components/PowerToggle"

export default function App() {
  const [robotStatus, setRobotStatus] = useState(true)
  const [batteryData, setBatteryData] = useState([
    { time: "10:00", level: 100 },
  ])
  const [tempData, setTempData] = useState([
    { component: "CPU", temp: 50 },
    { component: "Motor", temp: 45 },
    { component: "Lingkungan", temp: 28 },
  ])

  useEffect(() => {
    if (!robotStatus) return

    const interval = setInterval(() => {
      const now = new Date()
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

      const lastLevel = batteryData[batteryData.length - 1]?.level || 100
      const newLevel = Math.max(0, lastLevel - Math.random() * 2)

      setBatteryData(prev => [...prev.slice(-5), { time, level: parseFloat(newLevel.toFixed(1)) }])

      setTempData(prev =>
        prev.map(t => {
          const delta = (Math.random() - 0.5) * 2
          const newTemp = Math.max(20, Math.min(70, t.temp + delta))
          return { ...t, temp: parseFloat(newTemp.toFixed(1)) }
        })
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [robotStatus, batteryData])

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />
      <main className="px-6 py-4 grid gap-6">
        <div className="flex justify-start">
          <PowerToggle onToggle={setRobotStatus} />
        </div>

        {robotStatus ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatusCard label="Status Koneksi" value="Online" type="koneksi" />
              <StatusCard label="Baterai" value={`${batteryData.at(-1)?.level.toFixed(1)}%`} type="baterai" />
              <StatusCard label="Total Working Hours" value="12 Jam" type="waktu" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BatteryChart data={batteryData} />
              <TemperatureChart data={tempData} />
            </div>
          </>
        ) : (
          <div className="text-center mt-12 text-2xl text-gray-500 font-medium">
            🚫 Robot Tidak Aktif
          </div>
        )}
      </main>
    </div>
  )
}
