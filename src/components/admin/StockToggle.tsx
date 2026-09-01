interface StockToggleProps {
  isAvailable: boolean
  onChange: (value: boolean) => void
}

export function StockToggle({ isAvailable, onChange }: StockToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!isAvailable)}
      className={`relative w-14 h-8 rounded-full transition-colors duration-200 shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#b91520]/40 ${
        isAvailable ? 'bg-green-500' : 'bg-red-400'
      }`}
      role="switch"
      aria-checked={isAvailable}
    >
      <span
        className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-200 ${
          isAvailable ? 'start-7' : 'start-1'
        }`}
      />
    </button>
  )
}
