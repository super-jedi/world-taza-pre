import { Search, X } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const { t } = useTranslation()

  return (
    <div className="relative">
      <Search size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-[rgba(33,23,21,0.4)]" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('searchPlaceholder')}
        className="w-full h-12 ps-11 pe-10 rounded-full border border-[rgba(33,23,21,0.13)] bg-white text-[#211715] placeholder:text-[rgba(33,23,21,0.4)] focus:border-[#b91520]/50 focus:ring-2 focus:ring-[#b91520]/10 outline-none transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute end-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[rgba(33,23,21,0.08)] flex items-center justify-center text-[rgba(33,23,21,0.5)] hover:bg-[rgba(33,23,21,0.15)] transition-colors"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
