import { useState } from 'react'
import { X } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { useBranchStore } from '@/store/branchStore'
import { useCartStore } from '@/store/cartStore'
import { BranchCard } from './BranchCard'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { seedBranches } from '@/data/seed'
import type { Branch } from '@/types'

interface BranchSelectorProps {
  isModal?: boolean
  onClose?: () => void
}

export function BranchSelector({ isModal = false, onClose }: BranchSelectorProps) {
  const { t, language } = useTranslation()
  const currentBranch = useBranchStore((s) => s.selectedBranch)
  const setBranch = useBranchStore((s) => s.setBranch)
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)
  const setBranchId = useCartStore((s) => s.setBranchId)

  const [pendingBranch, setPendingBranch] = useState<Branch | null>(null)

  const handleSelect = (branch: Branch) => {
    if (currentBranch && currentBranch.id !== branch.id && items.length > 0) {
      setPendingBranch(branch)
      return
    }
    applyBranch(branch)
  }

  const applyBranch = (branch: Branch) => {
    setBranch(branch)
    setBranchId(branch.id)
    setPendingBranch(null)
    onClose?.()
  }

  const handleConfirmSwitch = () => {
    if (pendingBranch) {
      clearCart()
      applyBranch(pendingBranch)
    }
  }

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
        <div
          className="w-full max-w-2xl bg-[#fff8ea] rounded-2xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#651015]">{t('selectBranch')}</h2>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-white border border-[rgba(33,23,21,0.13)] flex items-center justify-center text-[#651015] hover:bg-gray-50">
              <X size={20} />
            </button>
          </div>
          <div className="grid gap-4">
            {seedBranches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} onSelect={handleSelect} />
            ))}
          </div>
          <ConfirmDialog
            open={Boolean(pendingBranch)}
            title={t('switchBranchTitle')}
            message={t('switchBranchMessage')}
            confirmLabel={t('confirm')}
            cancelLabel={t('keepCurrent')}
            onConfirm={handleConfirmSwitch}
            onCancel={() => setPendingBranch(null)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fff8ea]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#ffc928]/30 via-[#fff8ea] to-[#b91520]/10 py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <img
              src="/images/brand/world-taza-logo.png"
              alt="World Taza"
              className="w-20 h-20 md:w-28 md:h-28 mx-auto rounded-full bg-white p-1.5 shadow-xl shadow-red-900/15 mb-6"
            />
            <h1 className="text-4xl md:text-6xl font-black text-[#651015] mb-3 leading-tight">
              {language === 'ar' ? 'عالم طازة' : 'World Taza'}
            </h1>
            <p className="text-lg md:text-xl font-bold text-[#b91520]/70 mb-2">
              {language === 'ar' ? 'عالم طازة... الطعم يبدأ هنا' : 'World Taza... The taste starts here'}
            </p>
            <p className="text-[rgba(33,23,21,0.66)] max-w-xl mx-auto">
              {t('selectBranchDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Branch Cards */}
      <section className="px-4 md:px-8 pb-12 -mt-2">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#651015] mb-6 text-center">
            {t('selectBranch')}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {seedBranches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} onSelect={handleSelect} />
            ))}
          </div>
        </div>
      </section>

      <ConfirmDialog
        open={Boolean(pendingBranch)}
        title={t('switchBranchTitle')}
        message={t('switchBranchMessage')}
        confirmLabel={t('confirm')}
        cancelLabel={t('keepCurrent')}
        onConfirm={handleConfirmSwitch}
        onCancel={() => setPendingBranch(null)}
      />
    </div>
  )
}
