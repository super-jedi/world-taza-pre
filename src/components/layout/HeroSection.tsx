import { ArrowDown, Store, ArrowLeftRight } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { useBranchStore } from '@/store/branchStore'

interface HeroSectionProps {
  onOpenBranchModal: () => void
  onScrollToBranches?: () => void
}

export function HeroSection({ onOpenBranchModal, onScrollToBranches }: HeroSectionProps) {
  const { t, language } = useTranslation()
  const branch = useBranchStore((s) => s.selectedBranch)

  const headline = branch
    ? language === 'ar'
      ? `${t('orderFrom')} ${branch.name_ar}.`
      : `${t('orderFrom')} ${branch.name_en}.`
    : t('selectBranchAndOrder')

  const branchBadgeText = branch
    ? language === 'ar'
      ? branch.name_ar.toUpperCase()
      : branch.name_en.toUpperCase()
    : language === 'ar'
      ? 'اختر فرعك'
      : 'SELECT YOUR BRANCH'

  return (
    <section className="relative overflow-hidden bg-[#ffc928] text-[#211715] py-10 md:py-16 px-4 md:px-8 border-b border-[#f5a80c]/40 shadow-inner">
      {/* Background subtle radial rings decorative pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"
        style={{
          backgroundSize: '100px 100px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-5xl">
          {/* Top brand + branch pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/40 backdrop-blur-sm border border-white/60 text-xs font-black uppercase tracking-wider text-[#651015] mb-5 shadow-sm">
            <span>{t('brandFull')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#b91520]" />
            <span>{branchBadgeText}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#b91520] tracking-tight leading-[1.08] mb-5">
            {headline}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl font-semibold text-[#651015]/85 leading-relaxed mb-8 max-w-3xl">
            {t('orderFromBranchDesc')}
          </p>
        </div>

        {/* Slogan & Actions spanning the full max-w-7xl row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-5 border-t border-[#651015]/15 w-full">
          <div className="space-y-0.5">
            <div className="text-xl md:text-2xl font-black text-[#651015]">
              {language === 'ar' ? 'عالم طازة...' : 'World Taza...'}
            </div>
            <div className="text-sm md:text-base font-bold text-[#651015]/80">
              {language === 'ar' ? 'الطعم يبدأ هنا' : 'The taste starts here'}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {branch ? (
              <button
                onClick={onOpenBranchModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-[#651015] text-white hover:bg-[#b91520] shadow-lg shadow-red-950/20 transition-all cursor-pointer"
              >
                <ArrowLeftRight size={16} />
                {t('changeBranch')}
              </button>
            ) : (
              <button
                onClick={onScrollToBranches}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-black text-sm bg-[#b91520] text-white hover:bg-[#651015] shadow-xl shadow-red-950/30 transition-all cursor-pointer"
              >
                <Store size={18} />
                {t('selectBranch')}
                <ArrowDown size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
