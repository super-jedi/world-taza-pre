import { ShoppingCart, ChevronUp } from 'lucide-react'
import { useTranslation, formatMoney } from '@/lib/i18n'
import { useCartStore } from '@/store/cartStore'

interface MobileCartBarProps {
  onClick: () => void
}

export function MobileCartBar({ onClick }: MobileCartBarProps) {
  const { t } = useTranslation()
  const items = useCartStore((s) => s.items)
  const itemCount = items.reduce((sum, e) => sum + e.quantity, 0)
  const subtotal = items.reduce((sum, e) => sum + e.unit_price * e.quantity, 0)

  if (itemCount === 0) return null

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-3 h-14 px-5 rounded-2xl bg-[#b91520] text-white shadow-2xl shadow-red-900/30 active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -end-2 w-5 h-5 rounded-full bg-[#ffc928] text-[#651015] text-xs font-black flex items-center justify-center num" dir="ltr">
              {itemCount}
            </span>
          </div>
          <span className="font-bold">
            <span className="num" dir="ltr">{itemCount}</span> {t('cartItems')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold num" dir="ltr">{formatMoney(subtotal)}</span>
          <ChevronUp size={18} />
        </div>
      </button>
    </div>
  )
}
