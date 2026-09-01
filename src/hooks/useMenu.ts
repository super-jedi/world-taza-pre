import { useMemo, useState } from 'react'
import { useBranchStore } from '@/store/branchStore'
import { seedMenuItems, seedItemVariants, seedBranchAvailability, seedCategories } from '@/data/seed'
import type { MenuItem, ItemVariant, Category, BranchItemAvailability } from '@/types'

export interface MenuItemWithDetails {
  item: MenuItem
  variants: ItemVariant[]
  availability: BranchItemAvailability | undefined
  isAvailable: boolean
}

export function useMenu() {
  const branch = useBranchStore((s) => s.selectedBranch)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const menuData = useMemo(() => {
    if (!branch) {
      // Full comprehensive menu when no branch is selected
      const items: MenuItemWithDetails[] = seedMenuItems
        .filter((item) => item.is_active)
        .map((item) => {
          const variants = seedItemVariants.filter((v) => v.item_id === item.id)
          return {
            item,
            variants,
            availability: undefined,
            isAvailable: true,
          }
        })

      const activeCatIds = new Set(items.map((i) => i.item.category_id))
      const categories = seedCategories
        .filter((c) => activeCatIds.has(c.id))
        .sort((a, b) => a.sort_order - b.sort_order)

      return { items, categories }
    }

    // Get items available for this specific branch
    const branchAvail = seedBranchAvailability.filter((a) => a.branch_id === branch.id)
    const branchItemIds = new Set(branchAvail.map((a) => a.item_id))

    const items: MenuItemWithDetails[] = seedMenuItems
      .filter((item) => item.is_active && branchItemIds.has(item.id))
      .map((item) => {
        const variants = seedItemVariants.filter((v) => v.item_id === item.id)
        const availability = branchAvail.find((a) => a.item_id === item.id)
        return {
          item,
          variants,
          availability,
          isAvailable: availability?.is_available ?? true,
        }
      })

    const activeCatIds = new Set(items.map((i) => i.item.category_id))
    const categories = seedCategories
      .filter((c) => activeCatIds.has(c.id))
      .sort((a, b) => a.sort_order - b.sort_order)

    return { items, categories }
  }, [branch])

  const filteredItems = useMemo(() => {
    let result = menuData.items

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((i) => i.item.category_id === activeCategory)
    }

    // Search filter - partial match across EN name, AR name, category, variants
    const q = searchQuery.trim().toLowerCase()
    if (q) {
      result = result.filter((i) => {
        const cat = seedCategories.find((c) => c.id === i.item.category_id)
        const searchableText = [
          i.item.name_en,
          i.item.name_ar,
          cat?.name_en,
          cat?.name_ar,
          ...i.variants.map((v) => v.label_en),
          ...i.variants.map((v) => v.label_ar),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return searchableText.includes(q)
      })
    }

    return result
  }, [menuData.items, activeCategory, searchQuery])

  return {
    items: filteredItems,
    categories: menuData.categories,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
  }
}
