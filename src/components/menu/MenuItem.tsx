import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useTranslation, formatMoney } from '@/lib/i18n'
import { useCartStore } from '@/store/cartStore'
import { useBranchStore } from '@/store/branchStore'
import { Badge } from '@/components/ui/Badge'
import { seedCategories } from '@/data/seed'
import type { MenuItemWithDetails } from '@/hooks/useMenu'
import type { ItemVariant } from '@/types'

interface MenuItemCardProps {
  data: MenuItemWithDetails
  onRequireBranch?: (item: MenuItemWithDetails, variant: ItemVariant) => void
}

export function MenuItemCard({ data, onRequireBranch }: MenuItemCardProps) {
  const { item, variants, isAvailable } = data
  const { t, language } = useTranslation()
  const branch = useBranchStore((s) => s.selectedBranch)
  const addItem = useCartStore((s) => s.addItem)
  const [selectedFlavor, setSelectedFlavor] = useState(item.flavors?.[0] || '')

  const name = language === 'ar' ? item.name_ar : item.name_en
  const category = seedCategories.find((c) => c.id === item.category_id)
  const categoryName = category ? (language === 'ar' ? category.name_ar : category.name_en) : ''

  const handleAdd = (variant: typeof variants[0]) => {
    if (!branch) {
      onRequireBranch?.(data, variant)
      return
    }

    addItem({
      item_id: item.id,
      variant_id: variant.id,
      flavor: selectedFlavor,
      quantity: 1,
      unit_price: variant.price_sar,
      name_en: item.name_en,
      name_ar: item.name_ar,
      variant_label_en: variant.label_en,
      variant_label_ar: variant.label_ar,
    })
  }

  return (
    <article className={`relative flex flex-col rounded-2xl bg-white border border-[rgba(33,23,21,0.08)] shadow-md shadow-[rgba(33,23,21,0.04)] overflow-hidden transition-all duration-200 hover:shadow-xl hover:border-[rgba(185,21,32,0.25)] ${!isAvailable ? 'opacity-50 pointer-events-none' : ''}`}>
      {!isAvailable && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
          <Badge variant="danger" className="text-sm px-4 py-1.5 shadow-sm">{t('soldOut')}</Badge>
        </div>
      )}

      {/* Image */}
      {item.image_url ? (
        <div className="aspect-[4/3] overflow-hidden bg-[#fff4d7]">
          <img
            src={item.image_url}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-gradient-to-br from-[#fff4d7] to-[#fff1cc] flex items-center justify-center p-4">
          <span className="text-lg font-black text-[#651015]/40 text-center">{name}</span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 md:p-5">
        <Badge className="self-start mb-2.5 text-xs">{categoryName}</Badge>
        <h3 className="font-bold text-[#651015] text-lg leading-tight mb-3">{name}</h3>

        {/* Variant prices */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {variants.map((v) => (
            <span key={v.id} className="px-2.5 py-1 rounded-full bg-[#f6f1e8] text-[#211715] font-semibold text-xs md:text-sm">
              {language === 'ar' ? v.label_ar : v.label_en}: <span className="num font-bold text-[#651015]" dir="ltr">{formatMoney(v.price_sar)}</span>
            </span>
          ))}
        </div>

        {/* Flavor selector */}
        {item.flavors && item.flavors.length > 0 && (
          <div className="flex gap-2 mb-3">
            {item.flavors.map((flavor) => (
              <button
                key={flavor}
                onClick={() => setSelectedFlavor(flavor)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  selectedFlavor === flavor
                    ? 'bg-[#b91520] text-white shadow-sm'
                    : 'bg-[#fff1cc] text-[#651015] hover:bg-[#ffc928]/30'
                }`}
              >
                {flavor === 'spicy' ? (language === 'ar' ? '🌶️ حراق' : '🌶️ Spicy') : (language === 'ar' ? 'عادي' : 'Normal')}
              </button>
            ))}
          </div>
        )}

        {/* Add buttons */}
        <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-[rgba(33,23,21,0.06)]">
          {variants.map((v) => {
            const isSingleOrRegular = variants.length === 1 || v.label_en.toLowerCase() === 'regular'
            const buttonText = isSingleOrRegular
              ? t('addToCart')
              : (language === 'ar' ? v.label_ar : v.label_en)

            return (
              <button
                key={v.id}
                onClick={() => handleAdd(v)}
                disabled={!isAvailable}
                className="flex-1 min-w-[100px] h-11 rounded-full bg-[#fff4d7] text-[#651015] font-bold text-xs md:text-sm hover:bg-[#ffc928] hover:text-[#651015] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Plus size={15} />
                <span>{buttonText}</span>
              </button>
            )
          })}
        </div>
      </div>
    </article>
  )
}
