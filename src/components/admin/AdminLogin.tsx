import { useState } from 'react'
import { Lock, LogIn } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

interface AdminLoginProps {
  onLogin: () => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSupabaseLogin = async () => {
    if (!supabase) return
    setLoading(true)
    setError('')
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) {
        setError(t('loginError'))
      } else {
        onLogin()
      }
    } catch {
      setError(t('loginError'))
    } finally {
      setLoading(false)
    }
  }

  const handlePinLogin = () => {
    if (pin === '1234') {
      onLogin()
    } else {
      setError(t('loginError'))
    }
  }

  return (
    <div className="min-h-screen bg-[#fff8ea] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="/images/brand/world-taza-logo.png"
            alt="World Taza"
            className="w-20 h-20 mx-auto rounded-full bg-white p-1.5 shadow-xl shadow-red-900/15 mb-4"
          />
          <h1 className="text-2xl font-bold text-[#651015]">{t('adminTitle')}</h1>
          <p className="text-sm text-[rgba(33,23,21,0.5)] mt-1">{t('adminLogin')}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl shadow-[rgba(33,23,21,0.08)] border border-[rgba(33,23,21,0.08)]">
          {isSupabaseConfigured ? (
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-bold text-[#651015] mb-1.5">{t('email')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-[rgba(33,23,21,0.13)] bg-white text-[#211715] focus:outline-none focus:ring-2 focus:ring-[#b91520]/30"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#651015] mb-1.5">{t('password')}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-[rgba(33,23,21,0.13)] bg-white text-[#211715] focus:outline-none focus:ring-2 focus:ring-[#b91520]/30"
                />
              </div>
              <button
                type="button"
                onClick={handleSupabaseLogin}
                disabled={loading || !email || !password}
                className="w-full h-12 rounded-full bg-[#b91520] text-white font-bold shadow-lg shadow-red-900/20 hover:bg-[#a01119] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn size={18} />
                {loading ? '...' : t('login')}
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="px-4 py-3 rounded-xl bg-[#fff4d7] text-[#651015] text-sm font-semibold">
                <Lock size={16} className="inline-block me-2" />
                {t('adminNotConfigured')}
              </div>
              <div>
                <label className="block text-sm font-bold text-[#651015] mb-1.5">{t('enterPin')}</label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  maxLength={4}
                  inputMode="numeric"
                  className="w-full h-12 px-4 rounded-xl border border-[rgba(33,23,21,0.13)] bg-white text-center text-2xl tracking-[0.5em] font-bold text-[#211715] focus:outline-none focus:ring-2 focus:ring-[#b91520]/30"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handlePinLogin()}
                />
              </div>
              <button
                type="button"
                onClick={handlePinLogin}
                disabled={pin.length < 4}
                className="w-full h-12 rounded-full bg-[#b91520] text-white font-bold shadow-lg shadow-red-900/20 hover:bg-[#a01119] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn size={18} />
                {t('login')}
              </button>
            </div>
          )}

          {error && (
            <p className="text-red-600 text-sm font-semibold text-center mt-4">{error}</p>
          )}
        </div>
      </div>
    </div>
  )
}
