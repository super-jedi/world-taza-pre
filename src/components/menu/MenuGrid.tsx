import { useTranslation } from '@/lib/i18n'
import { MenuItemCard } from './MenuItem'
import { seedCategories } from '@/data/seed'
import type { MenuItemWithDetails } from '@/hooks/useMenu'
import type { ItemVariant } from '@/types'

interface MenuGridProps {
  items: MenuItemWithDetails[]
  activeCategory: string
  onRequireBranch?: (item: MenuItemWithDetails, variant: ItemVariant) => void
}

export function MenuGrid({ items, activeCategory, onRequireBranch }: MenuGridProps) {
  const { t, language } = useTranslation()

  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[rgba(33,23,21,0.08)]">
        <p className="text-lg text-[rgba(33,23,21,0.5)] font-bold">{t('noMatch')}</p>
      </div>
    )
  }

  // When showing all categories, group items by category
  if (activeCategory === 'all') {
    const groups = new Map<string, MenuItemWithDetails[]>()
    items.forEach((item) => {
      const catId = item.item.category_id
      if (!groups.has(catId)) groups.set(catId, [])
      groups.get(catId)!.push(item)
    })

    const orderedCategories = seedCategories
      .filter((c) => groups.has(c.id))
      .sort((a, b) => a.sort_order - b.sort_order)

    return (
      <div className="space-y-10">
        {orderedCategories.map((cat) => (
          <div key={cat.id} id={`category-${cat.id}`} className="scroll-mt-36">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg md:text-xl font-black text-white bg-[#651015] rounded-xl px-4 py-2.5 uppercase tracking-wide inline-block shadow-md">
                {language === 'ar' ? cat.name_ar : cat.name_en}
              </h3>
              <div className="flex-1 h-0.5 bg-[rgba(33,23,21,0.08)]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
              {groups.get(cat.id)!.map((item) => (
                <MenuItemCard
                  key={item.item.id}
                  data={item}
                  onRequireBranch={onRequireBranch}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
      {items.map((item) => (
        <MenuItemCard
          key={item.item.id}
          data={item}
          onRequireBranch={onRequireBranch}
        />
      ))}
    </div>
  )
}
