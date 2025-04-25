import { useState } from "react"

export default function PowerToggle({ onToggle }) {
  const [isOn, setIsOn] = useState(true)

  const togglePower = () => {
    const newState = !isOn
    setIsOn(newState)
    onToggle(newState)
  }

  return (
    <button
      onClick={togglePower}
      className={`px-6 py-2 text-white rounded-full shadow transition-all font-semibold ${
        isOn ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
      }`}
    >
      {isOn ? "Power ON" : "Power OFF"}
    </button>
  )
}
