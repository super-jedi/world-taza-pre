import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { OrderForm } from './OrderForm'

interface CheckoutModalProps {
  open: boolean
  onClose: () => void
}

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { t } = useTranslation()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-5 border-b border-[rgba(33,23,21,0.1)]">
          <h2 className="text-2xl font-bold text-[#651015]">{t('chooseOrderType')}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 rounded-full bg-[rgba(33,23,21,0.06)] flex items-center justify-center text-[#651015] hover:bg-[rgba(33,23,21,0.12)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <OrderForm onClose={onClose} />
      </div>
    </div>
  )
}
