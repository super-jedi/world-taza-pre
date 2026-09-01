import { useRef, useEffect } from 'react'
import { useTranslation } from '@/lib/i18n'
import type { Category } from '@/types'

interface CategoryNavProps {
  categories: Category[]
  activeCategory: string
  onSelect: (categoryId: string) => void
}

export function CategoryNav({ categories, activeCategory, onSelect }: CategoryNavProps) {
  const { t, language } = useTranslation()
  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll active tab into view
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const activeEl = container.querySelector('[data-active="true"]') as HTMLElement
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeCategory])

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto scrollbar-hide py-1"
    >
      <button
        data-active={activeCategory === 'all'}
        onClick={() => onSelect('all')}
        className={`shrink-0 h-11 px-5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
          activeCategory === 'all'
            ? 'bg-[#b91520] text-white shadow-md shadow-red-900/20'
            : 'bg-white text-[#651015] border border-[rgba(33,23,21,0.13)] hover:bg-[#fff1cc]'
        }`}
      >
        {t('all')}
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          data-active={activeCategory === cat.id}
          onClick={() => onSelect(cat.id)}
          className={`shrink-0 h-11 px-5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
            activeCategory === cat.id
              ? 'bg-[#b91520] text-white shadow-md shadow-red-900/20'
              : 'bg-white text-[#651015] border border-[rgba(33,23,21,0.13)] hover:bg-[#fff1cc]'
          }`}
        >
          {language === 'ar' ? cat.name_ar : cat.name_en}
        </button>
      ))}
    </div>
  )
}
