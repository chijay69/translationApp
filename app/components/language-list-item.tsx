import type React from "react"
import { Check } from "lucide-react"

interface LanguageListItemProps {
  flag: React.ReactNode
  name: string
  selected?: boolean
  onClick?: () => void
}

export function LanguageListItem({ flag, name, selected, onClick }: LanguageListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-4 rounded-xl transition-colors ${
        selected ? "bg-indigo-600 text-white" : "hover:bg-gray-50"
      }`}
    >
      <div className="w-6 h-6">{flag}</div>
      <span className="flex-1 text-left">{name}</span>
      {selected && <Check className="w-5 h-5" />}
    </button>
  )
}

