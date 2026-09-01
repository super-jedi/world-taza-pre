import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useTranslation, formatMoney } from '@/lib/i18n'
import { useCartStore } from '@/store/cartStore'
import { useBranchStore } from '@/store/branchStore'
import { CartItemRow } from './CartItem'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

interface MobileCartDrawerProps {
  open: boolean
  onClose: () => void
  onCheckout: () => void
}

export function MobileCartDrawer({ open, onClose, onCheckout }: MobileCartDrawerProps) {
  const { t, language } = useTranslation()
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)
  const branch = useBranchStore((s) => s.selectedBranch)
  const subtotal = items.reduce((sum, e) => sum + e.unit_price * e.quantity, 0)
  const [showClear, setShowClear] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="lg:hidden fixed inset-0 z-50" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Sheet */}
      <div
        className="absolute bottom-0 inset-x-0 bg-white rounded-t-2xl max-h-[85vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3 border-b border-[rgba(33,23,21,0.1)]">
          <div>
            <h2 className="text-xl font-bold text-[#651015]">{t('yourOrder')}</h2>
            {branch && (
              <p className="text-xs text-[rgba(33,23,21,0.5)] mt-0.5">
                {t('sendingTo')} {language === 'ar' ? branch.name_ar : branch.name_en}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[rgba(33,23,21,0.06)] flex items-center justify-center text-[#651015]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-2">
          {items.length === 0 ? (
            <p className="text-sm text-[rgba(33,23,21,0.5)] py-8 text-center">{t('cartEmpty')}</p>
          ) : (
            items.map((entry, i) => <CartItemRow key={`${entry.item_id}-${entry.variant_id}-${entry.flavor}-${i}`} entry={entry} />)
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[rgba(33,23,21,0.1)] px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="flex justify-between items-center text-lg font-black text-[#651015] mb-4">
            <span>{t('subtotal')}</span>
            <span className="num" dir="ltr">{formatMoney(subtotal)}</span>
          </div>
          <div className="grid gap-2">
            <button
              onClick={() => { onClose(); onCheckout() }}
              disabled={items.length === 0}
              className="w-full h-12 rounded-full bg-[#b91520] text-white font-bold shadow-lg shadow-red-900/20 hover:bg-[#a01119] transition-colors disabled:opacity-50"
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
      </div>
    </div>
  )
}
