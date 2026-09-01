export interface Branch {
  id: string
  slug: string
  name_en: string
  name_ar: string
  display_en: string
  display_ar: string
  address_en: string
  address_ar: string
  phone_primary: string
  phones: string[]
  whatsapp: string
  has_delivery: boolean
}

export interface Category {
  id: string
  name_en: string
  name_ar: string
  sort_order: number
}

export interface MenuItem {
  id: string
  category_id: string
  name_en: string
  name_ar: string
  image_url: string | null
  is_active: boolean
  flavors?: string[] // e.g. ['normal', 'spicy']
  nutrition?: {
    kcal?: number
    contents_en?: string
    contents_ar?: string
    allergens_en?: string[]
    allergens_ar?: string[]
  }
}

export interface ItemVariant {
  id: string
  item_id: string
  label_en: string
  label_ar: string
  price_sar: number
}

export interface BranchItemAvailability {
  branch_id: string
  item_id: string
  is_available: boolean
  price_override: number | null
}

export interface CartEntry {
  item_id: string
  variant_id: string
  flavor: string
  quantity: number
  unit_price: number
  name_en: string
  name_ar: string
  variant_label_en: string
  variant_label_ar: string
}

export interface CustomerInfo {
  name: string
  phone: string
  service_type: 'pickup' | 'delivery'
  payment_method?: 'cash' | 'card'
  building_details: string
  location_link: string
  will_share_location: boolean
}
