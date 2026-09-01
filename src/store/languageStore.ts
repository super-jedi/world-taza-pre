import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Language = 'en' | 'ar'

interface LanguageState {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (lang) => {
        set({ language: lang })
        applyDirection(lang)
      },
      toggleLanguage: () => {
        const next = get().language === 'en' ? 'ar' : 'en'
        set({ language: next })
        applyDirection(next)
      },
    }),
    { name: 'world-taza-language' }
  )
)

function applyDirection(lang: Language) {
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
}

// Apply on initial load
const initialLang = useLanguageStore.getState().language
applyDirection(initialLang)
