import type { CartEntry, Branch } from '@/types'
import type { CustomerInfo } from '@/types'
import { formatMoney } from './i18n'

function generateOrderId(): string {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `#WT-${num}`
}

function formatTime(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export function buildWhatsAppMessage(
  cart: CartEntry[],
  branch: Branch,
  customer: CustomerInfo,
  subtotal: number,
  deliveryFee: number
): string {
  const orderId = generateOrderId()
  const time = formatTime()
  const total = subtotal + deliveryFee

  const itemLines = cart.map((entry) => {
    const variant = entry.variant_label_en !== entry.variant_label_ar
      ? `${entry.variant_label_en} / ${entry.variant_label_ar}`
      : entry.variant_label_en
    const flavor = entry.flavor
      ? ` - ${entry.flavor === 'spicy' ? 'Spicy / حراق' : 'Normal / عادي'}`
      : ''
    const lineTotal = entry.unit_price * entry.quantity
    return `• ${entry.quantity}x ${entry.name_en} / ${entry.name_ar} (${variant}${flavor}) - ${formatMoney(lineTotal)}`
  })

  const serviceEn = customer.service_type === 'delivery' ? 'Delivery' : 'Pickup from Branch'
  const serviceAr = customer.service_type === 'delivery' ? 'توصيل' : 'استلام من الفرع'

  const lines: string[] = [
    `🍗 *World Taza Order | طلب عالم طازة*`,
    `📍 *Branch / الفرع:* ${branch.name_en} | ${branch.name_ar}`,
    `🆔 *Order ID / رقم الطلب:* ${orderId}`,
    `⏰ *Time / الوقت:* ${time}`,
    `-----------------------------------`,
    ...itemLines,
    `-----------------------------------`,
    `💵 *Subtotal / المجموع:* ${formatMoney(subtotal)}`,
    `🛵 *Delivery / التوصيل:* ${formatMoney(deliveryFee)}`,
    `💰 *Total / الإجمالي:* ${formatMoney(total)}`,
  ]

  if (customer.payment_method) {
    const paymentEn = customer.payment_method === 'cash' ? 'Cash' : 'Card'
    const paymentAr = customer.payment_method === 'cash' ? 'كاش' : 'بطاقة'
    lines.push(`💳 *Payment / الدفع:* ${paymentEn} / ${paymentAr}`)
  }

  lines.push(
    `👤 *Customer / العميل:* ${customer.name} (${customer.phone})`,
    `🏠 *Service / الخدمة:* ${serviceEn} / ${serviceAr}`,
  )

  if (customer.service_type === 'delivery') {
    if (customer.building_details) {
      lines.push(`📍 *Address / العنوان:* ${customer.building_details}`)
    }
    if (customer.location_link) {
      lines.push(`🗺️ *Location / الموقع:* ${customer.location_link}`)
    } else if (customer.will_share_location) {
      lines.push(`🗺️ *Location / الموقع:* Customer will share live location / سيشارك العميل الموقع`)
    }
  }

  return lines.join('\n')
}

export function openWhatsApp(whatsappNumber: string, message: string): void {
  const encoded = encodeURIComponent(message)
  window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank', 'noreferrer')
}
