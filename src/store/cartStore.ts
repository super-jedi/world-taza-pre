import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartEntry } from '@/types'

function cartKey(entry: CartEntry): string {
  return `${entry.item_id}::${entry.variant_id}::${entry.flavor}`
}

interface CartState {
  items: CartEntry[]
  branchId: string | null
  addItem: (entry: CartEntry) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, delta: number) => void
  clearCart: () => void
  setBranchId: (branchId: string) => void
  getSubtotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      branchId: null,

      addItem: (entry) => {
        const key = cartKey(entry)
        const existing = get().items
        const idx = existing.findIndex((e) => cartKey(e) === key)

        if (idx >= 0) {
          const updated = [...existing]
          updated[idx] = {
            ...updated[idx],
            quantity: updated[idx].quantity + entry.quantity,
          }
          set({ items: updated })
        } else {
          set({ items: [...existing, entry] })
        }
      },

      removeItem: (key) => {
        set({ items: get().items.filter((e) => cartKey(e) !== key) })
      },

      updateQuantity: (key, delta) => {
        const items = get().items
        const idx = items.findIndex((e) => cartKey(e) === key)
        if (idx < 0) return

        const newQty = items[idx].quantity + delta
        if (newQty <= 0) {
          set({ items: items.filter((_, i) => i !== idx) })
        } else {
          const updated = [...items]
          updated[idx] = { ...updated[idx], quantity: newQty }
          set({ items: updated })
        }
      },

      clearCart: () => set({ items: [] }),

      setBranchId: (branchId) => set({ branchId }),

      getSubtotal: () => {
        return get().items.reduce((sum, e) => sum + e.unit_price * e.quantity, 0)
      },

      getItemCount: () => {
        return get().items.reduce((sum, e) => sum + e.quantity, 0)
      },
    }),
    { name: 'world-taza-cart' }
  )
)

export function getCartKey(entry: CartEntry): string {
  return cartKey(entry)
}
