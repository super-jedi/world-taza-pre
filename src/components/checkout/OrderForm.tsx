import { useState, useEffect } from 'react'
import { Truck, Store, MessageCircle } from 'lucide-react'
import { useTranslation, formatMoney } from '@/lib/i18n'
import { useCartStore } from '@/store/cartStore'
import { useBranchStore } from '@/store/branchStore'
import { validateName, validatePhone, validateAddress } from '@/lib/validation'
import { buildWhatsAppMessage, openWhatsApp } from '@/lib/whatsapp'
import type { CustomerInfo } from '@/types'

interface OrderFormProps {
  onClose: () => void
}

export function OrderForm({ onClose }: OrderFormProps) {
  const { t, language } = useTranslation()
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)
  const branch = useBranchStore((s) => s.selectedBranch)
  const subtotal = items.reduce((sum, e) => sum + e.unit_price * e.quantity, 0)

  // Form state - load from localStorage
  const [serviceType, setServiceType] = useState<'pickup' | 'delivery'>('pickup')
  const [name, setName] = useState(() => localStorage.getItem('wt-customer-name') || '')
  const [phone, setPhone] = useState(() => localStorage.getItem('wt-customer-phone') || '')
  const [buildingDetails, setBuildingDetails] = useState(() => localStorage.getItem('wt-customer-address') || '')
  const [locationLink, setLocationLink] = useState('')
  const [willShareLocation, setWillShareLocation] = useState(false)

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Delivery logic
  const canDeliver = branch?.has_delivery ?? false
  const isDelivery = serviceType === 'delivery'
  const deliveryFee = isDelivery && canDeliver ? (subtotal >= 100 ? 0 : 5) : 0
  const deliveryMinimumMet = subtotal >= 30
  const showDeliveryFields = isDelivery && canDeliver && deliveryMinimumMet
  const total = subtotal + deliveryFee

  // Persist customer info
  useEffect(() => {
    if (name) localStorage.setItem('wt-customer-name', name)
  }, [name])
  useEffect(() => {
    if (phone) localStorage.setItem('wt-customer-phone', phone)
  }, [phone])
  useEffect(() => {
    if (buildingDetails) localStorage.setItem('wt-customer-address', buildingDetails)
  }, [buildingDetails])

  const handleSubmit = () => {
    if (!branch) return
    const newErrors: Record<string, string> = {}

    const nameResult = validateName(name, language)
    if (!nameResult.valid) newErrors.name = nameResult.error

    const phoneResult = validatePhone(phone, language)
    if (!phoneResult.valid) newErrors.phone = phoneResult.error

    if (isDelivery && canDeliver && deliveryMinimumMet) {
      const addressResult = validateAddress(buildingDetails, language)
      if (!addressResult.valid) newErrors.address = addressResult.error
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const customer: CustomerInfo = {
      name: name.trim(),
      phone: phone.trim(),
      service_type: serviceType,
      building_details: buildingDetails.trim(),
      location_link: locationLink.trim(),
      will_share_location: willShareLocation,
    }

    const message = buildWhatsAppMessage(items, branch, customer, subtotal, deliveryFee)
    openWhatsApp(branch.whatsapp, message)
    clearCart()
    onClose()
  }

  // Delivery status message
  let deliveryNote = ''
  if (isDelivery && !canDeliver) {
    deliveryNote = t('deliveryUnavailable')
  } else if (isDelivery && !deliveryMinimumMet) {
    deliveryNote = t('deliveryMinimum')
  } else if (isDelivery && canDeliver) {
    deliveryNote = t('deliveryReady')
  } else {
    deliveryNote = t('pickupReady')
  }

  return (
    <div className="p-5 grid gap-5">
      {/* Service type toggle */}
      <div>
        <label className="block text-sm font-bold text-[#651015] mb-2">{t('serviceType')}</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setServiceType('pickup')}
            className={`h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border ${
              serviceType === 'pickup'
                ? 'bg-[#b91520] text-white border-[#b91520] shadow-md'
                : 'bg-white text-[#651015] border-[rgba(33,23,21,0.13)] hover:bg-gray-50'
            }`}
          >
            <Store size={18} />
            {t('pickup')}
          </button>
          <button
            type="button"
            onClick={() => canDeliver && setServiceType('delivery')}
            className={`h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border ${
              serviceType === 'delivery'
                ? 'bg-[#b91520] text-white border-[#b91520] shadow-md'
                : 'bg-white text-[#651015] border-[rgba(33,23,21,0.13)] hover:bg-gray-50'
            } ${!canDeliver ? 'opacity-40 cursor-not-allowed' : ''}`}
            disabled={!canDeliver}
          >
            <Truck size={18} />
            {t('delivery')}
          </button>
        </div>
      </div>

      {/* Delivery note */}
      <div className="px-4 py-3 rounded-xl bg-[#fff4d7] text-[#651015] text-sm font-semibold leading-relaxed">
        {deliveryNote}
      </div>

      {/* Customer name */}
      <div>
        <label className="block text-sm font-bold text-[#651015] mb-1.5">{t('customerName')}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: '' })) }}
          placeholder={t('customerNamePlaceholder')}
          className="w-full h-12 px-4 rounded-xl border border-[rgba(33,23,21,0.13)] bg-white text-[#211715] placeholder:text-[rgba(33,23,21,0.4)]"
        />
        {errors.name && <p className="text-red-600 text-xs font-semibold mt-1">{errors.name}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-bold text-[#651015] mb-1.5">{t('phoneNumber')}</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => { setPhone(e.target.value); setErrors((prev) => ({ ...prev, phone: '' })) }}
          placeholder={t('phonePlaceholder')}
          inputMode="tel"
          dir="ltr"
          className="w-full h-12 px-4 rounded-xl border border-[rgba(33,23,21,0.13)] bg-white text-[#211715] placeholder:text-[rgba(33,23,21,0.4)]"
        />
        {errors.phone && <p className="text-red-600 text-xs font-semibold mt-1">{errors.phone}</p>}
      </div>

      {/* Delivery fields */}
      {showDeliveryFields && (
        <>
          <div>
            <label className="block text-sm font-bold text-[#651015] mb-1.5">{t('buildingDetails')}</label>
            <textarea
              value={buildingDetails}
              onChange={(e) => { setBuildingDetails(e.target.value); setErrors((prev) => ({ ...prev, address: '' })) }}
              placeholder={t('buildingPlaceholder')}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-[rgba(33,23,21,0.13)] bg-white text-[#211715] placeholder:text-[rgba(33,23,21,0.4)] resize-y"
            />
            {errors.address && <p className="text-red-600 text-xs font-semibold mt-1">{errors.address}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-[#651015] mb-1.5">{t('locationLink')}</label>
            <input
              type="url"
              value={locationLink}
              onChange={(e) => setLocationLink(e.target.value)}
              placeholder={t('locationPlaceholder')}
              disabled={willShareLocation}
              dir="ltr"
              className="w-full h-12 px-4 rounded-xl border border-[rgba(33,23,21,0.13)] bg-white text-[#211715] placeholder:text-[rgba(33,23,21,0.4)] disabled:opacity-50 disabled:bg-gray-50"
            />
          </div>
          <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#fff4d7] cursor-pointer">
            <input
              type="checkbox"
              checked={willShareLocation}
              onChange={(e) => setWillShareLocation(e.target.checked)}
              className="w-5 h-5 rounded accent-[#b91520]"
            />
            <span className="text-sm font-semibold text-[#651015]">{t('willShareLocation')}</span>
          </label>
        </>
      )}

      {/* Totals */}
      <div className="bg-[rgba(33,23,21,0.03)] rounded-xl p-4 grid gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-[rgba(33,23,21,0.66)]">{t('subtotal')}</span>
          <span className="font-bold num" dir="ltr">{formatMoney(subtotal)}</span>
        </div>
        {isDelivery && canDeliver && deliveryMinimumMet && (
          <div className="flex justify-between text-sm">
            <span className="text-[rgba(33,23,21,0.66)]">{t('deliveryFee')}</span>
            <span className="font-bold num" dir="ltr">{deliveryFee === 0 ? t('free') : formatMoney(deliveryFee)}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-black text-[#651015] pt-2 border-t border-[rgba(33,23,21,0.1)]">
          <span>{t('total')}</span>
          <span className="num" dir="ltr">{formatMoney(total)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 h-12 rounded-full font-bold text-[#651015] bg-white border border-[rgba(33,23,21,0.13)] hover:bg-gray-50 transition-colors"
        >
          {t('cancel')}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={items.length === 0 || (isDelivery && !canDeliver) || (isDelivery && !deliveryMinimumMet)}
          className="flex-1 h-12 rounded-full font-bold text-white bg-[#b91520] shadow-lg shadow-red-900/20 hover:bg-[#a01119] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MessageCircle size={18} />
          {t('sendToWhatsapp')}
        </button>
      </div>
    </div>
  )
}
