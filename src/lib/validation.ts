import type { Language } from './i18n'
import { getTranslation } from './i18n'

export interface ValidationResult {
  valid: boolean
  error: string
}

export function validateName(name: string, language: Language): ValidationResult {
  const trimmed = name.trim()
  if (!trimmed || trimmed.length < 2) {
    return { valid: false, error: getTranslation(language, 'nameRequired') }
  }
  return { valid: true, error: '' }
}

export function validatePhone(phone: string, language: Language): ValidationResult {
  const cleaned = phone.trim().replace(/\s+/g, '')
  if (!cleaned) {
    return { valid: false, error: getTranslation(language, 'phoneRequired') }
  }
  const saudiRegex = /^(05|5|\+9665|009665)\d{8}$/
  if (!saudiRegex.test(cleaned)) {
    return { valid: false, error: getTranslation(language, 'phoneInvalid') }
  }
  return { valid: true, error: '' }
}

export function validateAddress(address: string, language: Language): ValidationResult {
  const trimmed = address.trim()
  if (!trimmed) {
    return { valid: false, error: getTranslation(language, 'addressRequired') }
  }
  return { valid: true, error: '' }
}
