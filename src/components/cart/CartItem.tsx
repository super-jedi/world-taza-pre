import { Minus, Plus, Trash2 } from 'lucide-react'
import { useTranslation, formatMoney } from '@/lib/i18n'
import { useCartStore, getCartKey } from '@/store/cartStore'
import type { CartEntry } from '@/types'

interface CartItemProps {
  entry: CartEntry
}

export function CartItemRow({ entry }: CartItemProps) {
  const { language } = useTranslation()
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const key = getCartKey(entry)

  const name = language === 'ar' ? entry.name_ar : entry.name_en
  const variant = language === 'ar' ? entry.variant_label_ar : entry.variant_label_en
  const flavorLabel = entry.flavor
    ? entry.flavor === 'spicy'
      ? language === 'ar' ? 'حراق' : 'Spicy'
      : language === 'ar' ? 'عادي' : 'Normal'
    : ''
  const optionText = [variant, flavorLabel].filter(Boolean).join(' · ')
  const lineTotal = entry.unit_price * entry.quantity

  return (
    <div className="flex items-start gap-3 py-3 border-b border-[rgba(33,23,21,0.08)] last:border-0">
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[#651015] text-sm leading-tight truncate">{name}</p>
        <p className="text-xs text-[rgba(33,23,21,0.5)] mt-0.5">{optionText}</p>
        <p className="text-sm font-bold text-[#211715] mt-1 num" dir="ltr">{formatMoney(lineTotal)}</p>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => updateQuantity(key, -1)}
          className="w-8 h-8 rounded-full bg-[#fff1cc] text-[#651015] flex items-center justify-center hover:bg-[#ffc928]/40 transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>
        <span className="w-8 text-center font-bold text-sm text-[#211715] num" dir="ltr">
          {entry.quantity}
        </span>
        <button
          onClick={() => updateQuantity(key, 1)}
          className="w-8 h-8 rounded-full bg-[#fff1cc] text-[#651015] flex items-center justify-center hover:bg-[#ffc928]/40 transition-colors"
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
        <button
          onClick={() => removeItem(key)}
          className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors ms-1"
          aria-label="Remove item"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}
