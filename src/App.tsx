import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useSearchParams, useNavigate } from 'react-router-dom'
import { Store, AlertCircle } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { useBranchStore } from '@/store/branchStore'
import { useLanguageStore, type Language } from '@/store/languageStore'
import { useCartStore } from '@/store/cartStore'
import { useMenu } from '@/hooks/useMenu'
import { seedBranches } from '@/data/seed'
import type { Branch } from '@/types'

// Layout & UI Components
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/layout/HeroSection'
import { BranchStrip } from '@/components/branch/BranchStrip'
import { BranchSelector } from '@/components/branch/BranchSelector'
import { CategoryNav } from '@/components/menu/CategoryNav'
import { SearchBar } from '@/components/menu/SearchBar'
import { MenuGrid } from '@/components/menu/MenuGrid'
import { CartSidebar } from '@/components/cart/CartSidebar'
import { MobileCartBar } from '@/components/cart/MobileCartBar'
import { MobileCartDrawer } from '@/components/cart/MobileCartDrawer'
import { CheckoutModal } from '@/components/checkout/CheckoutModal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

// Admin Components
import { AdminLogin } from '@/components/admin/AdminLogin'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

function CustomerPage() {
  const { t, language } = useTranslation()
  const [searchParams] = useSearchParams()
  const selectedBranch = useBranchStore((s) => s.selectedBranch)
  const setBranch = useBranchStore((s) => s.setBranch)
  const setLanguage = useLanguageStore((s) => s.setLanguage)
  const cartItems = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)
  const setBranchId = useCartStore((s) => s.setBranchId)

  const [showBranchModal, setShowBranchModal] = useState(false)
  const [showMobileCart, setShowMobileCart] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [pendingBranch, setPendingBranch] = useState<Branch | null>(null)

  // Handle URL query params on initial load
  useEffect(() => {
    const branchParam = searchParams.get('branch')
    const langParam = searchParams.get('lang')

    if (langParam === 'ar' || langParam === 'en') {
      setLanguage(langParam as Language)
    }

    if (branchParam) {
      let targetSlug = branchParam.toLowerCase()
      if (targetSlug === 'samir') targetSlug = 'al-samer'
      if (targetSlug === 'sulaimaniya') targetSlug = 'abraq-ar-rughamah'

      const matched = seedBranches.find((b) => b.slug === targetSlug)
      if (matched) {
        setBranch(matched)
        setBranchId(matched.id)
      }
    } else if (selectedBranch) {
      const latest = seedBranches.find((b) => b.id === selectedBranch.id)
      if (latest && JSON.stringify(latest) !== JSON.stringify(selectedBranch)) {
        setBranch(latest)
      }
    }
  }, [searchParams, selectedBranch, setBranch, setBranchId, setLanguage])

  const {
    items,
    categories,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
  } = useMenu()

  const handleSelectBranch = (branch: Branch) => {
    if (selectedBranch && selectedBranch.id !== branch.id && cartItems.length > 0) {
      setPendingBranch(branch)
      return
    }
    applyBranch(branch)
  }

  const applyBranch = (branch: Branch) => {
    setBranch(branch)
    setBranchId(branch.id)
    setPendingBranch(null)
  }

  const handleConfirmSwitch = () => {
    if (pendingBranch) {
      clearCart()
      applyBranch(pendingBranch)
    }
  }

  const handleScrollToBranches = () => {
    const el = document.getElementById('branches')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      setShowBranchModal(true)
    }
  }

  const handleRequireBranch = () => {
    setShowBranchModal(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8ea]">
      <Header onChangeBranch={() => setShowBranchModal(true)} />

      {/* Hero Section Matching Image 1 */}
      <HeroSection
        onOpenBranchModal={() => setShowBranchModal(true)}
        onScrollToBranches={handleScrollToBranches}
      />

      {/* 4 Branch Cards Strip Matching Image 2 (No QR codes) */}
      <BranchStrip onSelectBranch={handleSelectBranch} />

      {/* Notice Banner if viewing full menu without branch selection */}
      {!selectedBranch && (
        <div className="bg-[#fff1cc] border-b border-[#ffc928]/60 px-4 md:px-8 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-[#651015] text-xs md:text-sm font-bold">
              <AlertCircle size={16} className="text-[#b91520] shrink-0" />
              <span>{t('browseMenuNotice')}</span>
            </div>
            <button
              onClick={handleScrollToBranches}
              className="px-4 py-1.5 rounded-full bg-[#b91520] text-white text-xs font-black hover:bg-[#651015] transition-colors cursor-pointer"
            >
              {t('selectBranch')}
            </button>
          </div>
        </div>
      )}

      {/* Search & Category Filter Section */}
      <section className="sticky top-[57px] md:top-[65px] z-30 bg-[rgba(255,248,234,0.96)] backdrop-blur-md border-b border-[rgba(33,23,21,0.08)] px-4 md:px-8 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="w-full sm:max-w-md">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            {selectedBranch && (
              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#651015]/80">
                <Store size={14} className="text-[#b91520]" />
                <span>
                  {t('orderFrom')} {language === 'ar' ? selectedBranch.name_ar : selectedBranch.name_en}
                </span>
              </div>
            )}
          </div>

          <CategoryNav
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* Menu Items Grid */}
          <div className="min-w-0">
            <MenuGrid
              items={items}
              activeCategory={activeCategory}
              onRequireBranch={handleRequireBranch}
            />
          </div>

          {/* Desktop Cart Sidebar */}
          <div className="hidden lg:block">
            {selectedBranch ? (
              <CartSidebar onCheckout={() => setShowCheckoutModal(true)} />
            ) : (
              <aside className="sticky top-40 rounded-2xl border border-[rgba(33,23,21,0.1)] bg-white shadow-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#fff1cc] text-[#651015] flex items-center justify-center mx-auto mb-4">
                  <Store size={24} />
                </div>
                <h3 className="text-lg font-black text-[#651015] mb-2">
                  {t('selectBranchToOrderPrompt')}
                </h3>
                <p className="text-xs text-[rgba(33,23,21,0.6)] mb-5">
                  {t('selectBranchDesc')}
                </p>
                <button
                  onClick={handleScrollToBranches}
                  className="w-full h-11 rounded-full bg-[#b91520] text-white font-bold text-sm shadow-md hover:bg-[#a01119] transition-colors cursor-pointer"
                >
                  {t('selectBranch')}
                </button>
              </aside>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Floating Cart Bar */}
      {selectedBranch && (
        <MobileCartBar onClick={() => setShowMobileCart(true)} />
      )}

      {/* Mobile Cart Sheet */}
      <MobileCartDrawer
        open={showMobileCart}
        onClose={() => setShowMobileCart(false)}
        onCheckout={() => setShowCheckoutModal(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        open={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
      />

      {/* Branch Selector Modal */}
      {showBranchModal && (
        <BranchSelector
          isModal={true}
          onClose={() => setShowBranchModal(false)}
        />
      )}

      {/* Branch Switch Confirmation Dialog */}
      <ConfirmDialog
        open={Boolean(pendingBranch)}
        title={t('switchBranchTitle')}
        message={t('switchBranchMessage')}
        confirmLabel={t('confirm')}
        cancelLabel={t('keepCurrent')}
        onConfirm={handleConfirmSwitch}
        onCancel={() => setPendingBranch(null)}
      />

      <Footer />
    </div>
  )
}

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  if (isLoggedIn) {
    return <AdminDashboard onLogout={() => setIsLoggedIn(false)} />
  }

  return (
    <div className="relative">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 start-4 z-50 text-xs font-bold text-[#651015] bg-white border border-[rgba(33,23,21,0.13)] px-4 py-2 rounded-full hover:bg-gray-50 shadow-md cursor-pointer"
      >
        ← Back to Customer Menu
      </button>
      <AdminLogin onLogin={() => setIsLoggedIn(true)} />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}
