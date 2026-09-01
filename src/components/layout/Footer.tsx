import { useTranslation } from '@/lib/i18n'
import { useBranchStore } from '@/store/branchStore'

export function Footer() {
  const { t, language } = useTranslation()
  const branch = useBranchStore((s) => s.selectedBranch)

  return (
    <footer className="px-4 md:px-8 py-6 bg-white border-t border-[rgba(33,23,21,0.13)]">
      <div className="max-w-6xl mx-auto">
        {branch && (
          <div className="mb-3 text-sm text-[rgba(33,23,21,0.66)]">
            <p className="font-bold text-[#651015]">
              {language === 'ar' ? branch.display_ar : branch.display_en}
            </p>
            <p>{language === 'ar' ? branch.address_ar : branch.address_en}</p>
            <p className="num" dir="ltr">{branch.phone_primary}</p>
          </div>
        )}
        <p className="text-sm text-[rgba(33,23,21,0.66)]">{t('footer')}</p>
      </div>
    </footer>
  )
}
