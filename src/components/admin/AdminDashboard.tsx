import { useState, useMemo } from 'react'
import { LogOut, Search, X, Check, Edit2 } from 'lucide-react'
import { useTranslation, formatMoney } from '@/lib/i18n'
import { useLanguageStore } from '@/store/languageStore'
import { seedBranches, seedMenuItems, seedItemVariants, seedBranchAvailability, seedCategories } from '@/data/seed'
import { Badge } from '@/components/ui/Badge'
import { StockToggle } from './StockToggle'
import type { Branch, MenuItem, BranchItemAvailability } from '@/types'

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { t, language } = useTranslation()
  const toggleLanguage = useLanguageStore((s) => s.toggleLanguage)
  const [selectedBranchId, setSelectedBranchId] = useState<string>(seedBranches[0].id)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [stockOverrides, setStockOverrides] = useState<Record<string, boolean>>({})
  const [priceOverrides, setPriceOverrides] = useState<Record<string, number>>({})
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null)
  const [editPriceValue, setEditPriceValue] = useState('')

  const branch = seedBranches.find((b) => b.id === selectedBranchId) || seedBranches[0]

  const branchItems = useMemo(() => {
    const branchAvail = seedBranchAvailability.filter((a) => a.branch_id === selectedBranchId)
    const branchItemIds = new Set(branchAvail.map((a) => a.item_id))

    return seedMenuItems
      .filter((item) => branchItemIds.has(item.id))
      .map((item) => {
        const variants = seedItemVariants.filter((v) => v.item_id === item.id)
        const availability = branchAvail.find((a) => a.item_id === item.id)
        const category = seedCategories.find((c) => c.id === item.category_id)
        const stockKey = `${selectedBranchId}::${item.id}`
        const isAvailable = stockOverrides[stockKey] ?? (availability?.is_available ?? true)
        return { item, variants, availability, category, isAvailable, stockKey }
      })
  }, [selectedBranchId, stockOverrides])

  const filteredItems = useMemo(() => {
    let result = branchItems
    if (activeCategory !== 'all') {
      result = result.filter((i) => i.item.category_id === activeCategory)
    }
    const q = searchQuery.trim().toLowerCase()
    if (q) {
      result = result.filter((i) =>
        [i.item.name_en, i.item.name_ar, i.category?.name_en, i.category?.name_ar]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(q)
      )
    }
    return result
  }, [branchItems, activeCategory, searchQuery])

  const categories = useMemo(() => {
    const catIds = new Set(branchItems.map((i) => i.item.category_id))
    return seedCategories.filter((c) => catIds.has(c.id)).sort((a, b) => a.sort_order - b.sort_order)
  }, [branchItems])

  const toggleStock = (stockKey: string, value: boolean) => {
    setStockOverrides((prev) => ({ ...prev, [stockKey]: value }))
  }

  const startEditingPrice = (variantId: string, currentPrice: number) => {
    setEditingVariantId(variantId)
    setEditPriceValue(currentPrice.toString())
  }

  const savePrice = (variantId: string) => {
    const parsed = parseFloat(editPriceValue)
    if (!isNaN(parsed) && parsed >= 0) {
      setPriceOverrides((prev) => ({ ...prev, [variantId]: parsed }))
    }
    setEditingVariantId(null)
    setEditPriceValue('')
  }

  const cancelEditingPrice = () => {
    setEditingVariantId(null)
    setEditPriceValue('')
  }

  return (
    <div className="min-h-screen bg-[#fff8ea]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#651015] text-white px-4 md:px-8 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/brand/world-taza-logo.png"
              alt="World Taza"
              className="w-10 h-10 rounded-full bg-white p-0.5 object-cover"
            />
            <h1 className="text-lg font-bold tracking-tight">{t('adminTitle')}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="h-9 px-3 rounded-full text-sm font-bold bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'English' : 'عربي'}
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="h-9 px-4 rounded-full text-sm font-bold bg-white/20 hover:bg-white/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut size={16} />
              {t('logout')}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        {/* Branch selector */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="w-full max-w-sm">
            <label className="block text-xs font-bold text-[#651015] mb-1 uppercase tracking-wider">
              {t('selectBranch')}
            </label>
            <select
              value={selectedBranchId}
              onChange={(e) => {
                setSelectedBranchId(e.target.value)
                setActiveCategory('all')
              }}
              className="h-12 px-4 rounded-xl border border-[rgba(33,23,21,0.13)] bg-white text-[#211715] font-bold w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b91520]/30 cursor-pointer"
            >
              {seedBranches.map((b) => (
                <option key={b.id} value={b.id}>
                  {language === 'ar' ? b.display_ar : b.display_en}
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs text-[rgba(33,23,21,0.66)] sm:text-end">
            <span className="font-semibold text-[#651015]">{language === 'ar' ? branch.name_ar : branch.name_en}</span>
            <p className="mt-0.5">{language === 'ar' ? branch.address_ar : branch.address_en}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-[rgba(33,23,21,0.4)]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full h-12 ps-11 pe-10 rounded-full border border-[rgba(33,23,21,0.13)] bg-white text-[#211715] placeholder-[rgba(33,23,21,0.4)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b91520]/30"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute end-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[rgba(33,23,21,0.08)] hover:bg-[rgba(33,23,21,0.15)] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`shrink-0 h-10 px-4 rounded-full font-bold text-sm transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#651015] text-white shadow-sm'
                : 'bg-white text-[#651015] border border-[rgba(33,23,21,0.13)] hover:bg-[#fff4d7]'
            }`}
          >
            {t('all')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 h-10 px-4 rounded-full font-bold text-sm whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#651015] text-white shadow-sm'
                  : 'bg-white text-[#651015] border border-[rgba(33,23,21,0.13)] hover:bg-[#fff4d7]'
              }`}
            >
              {language === 'ar' ? cat.name_ar : cat.name_en}
            </button>
          ))}
        </div>

        {/* Items list */}
        <div className="bg-white rounded-2xl border border-[rgba(33,23,21,0.08)] shadow-md overflow-hidden">
          <div className="px-4 py-3 bg-[rgba(33,23,21,0.03)] border-b border-[rgba(33,23,21,0.08)] text-xs font-bold text-[rgba(33,23,21,0.6)] uppercase tracking-wider grid grid-cols-[1fr_auto_auto] gap-4 items-center">
            <span>{t('itemName')}</span>
            <span className="w-36 text-center">{t('price')}</span>
            <span className="w-16 text-center">{language === 'ar' ? 'متوفر' : 'Stock'}</span>
          </div>

          <div className="divide-y divide-[rgba(33,23,21,0.06)]">
            {filteredItems.map(({ item, variants, category, isAvailable, stockKey }) => (
              <div
                key={item.id}
                className={`px-4 py-3.5 grid grid-cols-[1fr_auto_auto] gap-4 items-center transition-opacity ${
                  !isAvailable ? 'opacity-60 bg-[rgba(33,23,21,0.015)]' : 'hover:bg-[rgba(33,23,21,0.01)]'
                }`}
              >
                {/* Name & Category */}
                <div className="min-w-0">
                  <p className="font-bold text-[#651015] text-sm truncate">{item.name_en}</p>
                  <p className="text-xs text-[rgba(33,23,21,0.6)] truncate">{item.name_ar}</p>
                  {category && (
                    <Badge className="mt-1 text-[10px]">
                      {language === 'ar' ? category.name_ar : category.name_en}
                    </Badge>
                  )}
                </div>

                {/* Price per variant with inline edit */}
                <div className="w-36 flex flex-col items-center gap-1.5">
                  {variants.map((v) => {
                    const currentPrice = priceOverrides[v.id] ?? v.price_sar
                    const isEditing = editingVariantId === v.id

                    return (
                      <div key={v.id} className="w-full flex items-center justify-between text-xs">
                        <span className="text-[rgba(33,23,21,0.7)] font-medium truncate max-w-[50px]">
                          {language === 'ar' ? v.label_ar : v.label_en}:
                        </span>
                        {isEditing ? (
                          <div className="flex items-center gap-1 ms-1">
                            <input
                              type="number"
                              step="0.5"
                              min="0"
                              value={editPriceValue}
                              onChange={(e) => setEditPriceValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') savePrice(v.id)
                                if (e.key === 'Escape') cancelEditingPrice()
                              }}
                              className="w-16 h-7 px-1.5 text-xs text-center font-bold border border-[#b91520] rounded bg-white text-[#211715] focus:outline-none"
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => savePrice(v.id)}
                              className="w-6 h-6 rounded bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors cursor-pointer shrink-0"
                              title={t('save')}
                            >
                              <Check size={12} />
                            </button>
                            <button
                              type="button"
                              onClick={cancelEditingPrice}
                              className="w-6 h-6 rounded bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer shrink-0"
                              title={t('cancel')}
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => startEditingPrice(v.id, currentPrice)}
                            className="group flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-[rgba(33,23,21,0.06)] transition-colors cursor-pointer"
                            title={t('editItem')}
                          >
                            <span className="num font-bold text-[#651015]" dir="ltr">
                              {formatMoney(currentPrice)}
                            </span>
                            <Edit2 size={11} className="text-[rgba(33,23,21,0.3)] group-hover:text-[#651015] transition-colors" />
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Stock toggle */}
                <div className="w-16 flex justify-center">
                  <StockToggle
                    isAvailable={isAvailable}
                    onChange={(val) => toggleStock(stockKey, val)}
                  />
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="p-8 text-center text-sm text-[rgba(33,23,21,0.5)]">{t('noMatch')}</div>
          )}
        </div>

        <p className="text-xs text-[rgba(33,23,21,0.5)] mt-4 text-center">
          {language === 'ar'
            ? `إجمالي الأصناف: ${branchItems.length}`
            : `Total items: ${branchItems.length}`}
        </p>
      </div>
    </div>
  )
}
