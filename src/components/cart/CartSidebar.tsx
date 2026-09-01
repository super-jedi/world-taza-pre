import { useState } from 'react'
import { useTranslation, formatMoney } from '@/lib/i18n'
import { useCartStore } from '@/store/cartStore'
import { useBranchStore } from '@/store/branchStore'
import { CartItemRow } from './CartItem'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

interface CartSidebarProps {
  onCheckout: () => void
}

export function CartSidebar({ onCheckout }: CartSidebarProps) {
  const { t, language } = useTranslation()
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)
  const branch = useBranchStore((s) => s.selectedBranch)
  const subtotal = items.reduce((sum, e) => sum + e.unit_price * e.quantity, 0)
  const [showClear, setShowClear] = useState(false)

  return (
    <aside className="hidden lg:block sticky top-20 rounded-xl border border-[rgba(33,23,21,0.1)] bg-white shadow-xl shadow-[rgba(33,23,21,0.08)] overflow-hidden">
      {/* Header */}
      <div className="bg-[#651015] px-5 py-4">
        <h2 className="text-xl font-bold text-white">{t('yourOrder')}</h2>
        {branch && (
          <p className="text-white/70 text-sm mt-1">
            {t('sendingTo')} {language === 'ar' ? branch.name_ar : branch.name_en}
          </p>
        )}
      </div>

      {/* Items */}
      <div className="max-h-80 overflow-y-auto px-5 py-2">
        {items.length === 0 ? (
          <p className="text-sm text-[rgba(33,23,21,0.5)] py-6 text-center">{t('cartEmpty')}</p>
        ) : (
          items.map((entry, i) => <CartItemRow key={`${entry.item_id}-${entry.variant_id}-${entry.flavor}-${i}`} entry={entry} />)
        )}
      </div>

      {/* Total */}
      <div className="border-t border-[rgba(33,23,21,0.1)] px-5 py-4">
        <div className="flex justify-between items-center text-lg font-black text-[#651015]">
          <span>{t('subtotal')}</span>
          <span className="num" dir="ltr">{formatMoney(subtotal)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 pb-5 grid gap-2">
        <button
          onClick={onCheckout}
          disabled={items.length === 0}
          className="w-full h-12 rounded-full bg-[#b91520] text-white font-bold shadow-lg shadow-red-900/20 hover:bg-[#a01119] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('sendOrder')}
        </button>
        {items.length > 0 && (
          <button
            onClick={() => setShowClear(true)}
            className="w-full h-10 rounded-full text-[#651015] font-bold bg-white border border-[rgba(33,23,21,0.13)] hover:bg-gray-50 transition-colors text-sm"
          >
            {t('clearCart')}
          </button>
        )}
      </div>

      <ConfirmDialog
        open={showClear}
        title={t('clearCart')}
        message={t('clearCartConfirm')}
        confirmLabel={t('confirm')}
        cancelLabel={t('cancel')}
        onConfirm={() => { clearCart(); setShowClear(false) }}
        onCancel={() => setShowClear(false)}
      />
    </aside>
  )
}
