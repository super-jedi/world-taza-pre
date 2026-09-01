import { Phone, MessageCircle } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { useLanguageStore } from '@/store/languageStore'
import { useBranchStore } from '@/store/branchStore'

interface HeaderProps {
  onChangeBranch?: () => void
}

export function Header({ onChangeBranch }: HeaderProps) {
  const { t, language } = useTranslation()
  const toggleLanguage = useLanguageStore((s) => s.toggleLanguage)
  const branch = useBranchStore((s) => s.selectedBranch)

  return (
    <header className="sticky top-0 z-40 px-4 md:px-8 py-3 bg-[rgba(255,248,234,0.95)] backdrop-blur-lg border-b border-[rgba(33,23,21,0.13)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src="/images/brand/world-taza-logo.png"
            alt="World Taza"
            className="w-10 h-10 rounded-full bg-white p-0.5 shadow-md shadow-red-900/15 shrink-0"
          />
          <div className="min-w-0">
            <span className="text-[#651015] font-bold text-lg md:text-xl leading-tight block truncate">
              {language === 'ar' ? 'عالم طازة' : 'World Taza'}
            </span>
            {branch && (
              <button
                onClick={onChangeBranch}
                className="text-xs font-bold text-[#651015]/70 hover:text-[#b91520] uppercase tracking-wide truncate block text-start transition-colors cursor-pointer"
                title={t('changeBranch')}
              >
                📍 {language === 'ar' ? branch.name_ar : branch.name_en} ▾
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {branch && (
            <>
              <a
                href={`tel:${branch.phone_primary.replace(/\s/g, '')}`}
                className="hidden md:inline-flex items-center gap-2 px-4 h-10 rounded-full font-bold text-[#651015] bg-white border border-[rgba(33,23,21,0.13)] hover:bg-gray-50 transition-colors text-sm"
              >
                <Phone size={16} />
                {t('call')}
              </a>
              <a
                href={`tel:${branch.phone_primary.replace(/\s/g, '')}`}
                className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-[#651015] bg-white border border-[rgba(33,23,21,0.13)]"
                aria-label={t('call')}
              >
                <Phone size={18} />
              </a>
              <a
                href={`https://wa.me/${branch.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-4 h-10 rounded-full font-bold text-white bg-[#b91520] shadow-lg shadow-red-900/20 hover:bg-[#a01119] transition-colors text-sm"
              >
                <MessageCircle size={16} />
                {t('whatsapp')}
              </a>
              <a
                href={`https://wa.me/${branch.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-white bg-[#b91520] shadow-lg shadow-red-900/20"
                aria-label={t('whatsapp')}
              >
                <MessageCircle size={18} />
              </a>
            </>
          )}
          <button
            onClick={toggleLanguage}
            className="h-10 px-4 rounded-full font-bold text-[#651015] bg-white border border-[rgba(33,23,21,0.13)] hover:bg-gray-50 transition-colors text-sm whitespace-nowrap cursor-pointer"
          >
            {t('switchLang')}
          </button>
        </div>
      </div>
    </header>
  )
}
