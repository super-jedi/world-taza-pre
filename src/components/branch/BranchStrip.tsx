import { useTranslation } from '@/lib/i18n'
import { useBranchStore } from '@/store/branchStore'
import { BranchCard } from './BranchCard'
import { seedBranches } from '@/data/seed'
import type { Branch } from '@/types'

interface BranchStripProps {
  onSelectBranch: (branch: Branch) => void
}

export function BranchStrip({ onSelectBranch }: BranchStripProps) {
  const { t } = useTranslation()
  const currentBranch = useBranchStore((s) => s.selectedBranch)

  return (
    <section id="branches" className="px-4 md:px-8 py-6 bg-[#fffdf7] border-b border-[rgba(33,23,21,0.08)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-[#651015]">
              {t('ourBranches')}
            </h2>
            <p className="text-xs md:text-sm text-[rgba(33,23,21,0.6)] mt-0.5">
              {t('selectBranchDesc')}
            </p>
          </div>
        </div>

        {/* 4 Cards Grid - exactly like image 2 without QR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {seedBranches.map((branch) => (
            <BranchCard
              key={branch.id}
              branch={branch}
              isSelected={currentBranch?.id === branch.id}
              onSelect={onSelectBranch}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
