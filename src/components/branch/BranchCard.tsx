import { MapPin, Phone, Truck, Store, CheckCircle2 } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { Badge } from '@/components/ui/Badge'
import type { Branch } from '@/types'

interface BranchCardProps {
  branch: Branch
  isSelected?: boolean
  onSelect: (branch: Branch) => void
}

export function BranchCard({ branch, isSelected = false, onSelect }: BranchCardProps) {
  const { language } = useTranslation()
  const name = language === 'ar' ? branch.name_ar : branch.name_en
  const address = language === 'ar' ? branch.address_ar : branch.address_en

  return (
    <button
      onClick={() => onSelect(branch)}
      className={`w-full text-start p-4 md:p-5 rounded-2xl transition-all duration-200 group cursor-pointer relative flex flex-col justify-between ${
        isSelected
          ? 'bg-white border-2 border-[#b91520] shadow-xl shadow-red-950/10 ring-4 ring-[#b91520]/10'
          : 'bg-white border border-[rgba(33,23,21,0.08)] shadow-md shadow-[rgba(33,23,21,0.04)] hover:shadow-lg hover:border-[rgba(185,21,32,0.3)] hover:-translate-y-0.5'
      }`}
    >
      <div>
        {/* Branch Name header - full width single line */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className={`text-base md:text-lg font-black tracking-tight whitespace-nowrap truncate transition-colors ${
            isSelected ? 'text-[#b91520]' : 'text-[#651015] group-hover:text-[#b91520]'
          }`}>
            {name}
          </h3>
          {isSelected && (
            <CheckCircle2 size={18} className="text-[#b91520] shrink-0" />
          )}
        </div>

        {/* Badges Row: Delivery + Pickup placed underneath branch name */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
          {branch.has_delivery && (
            <Badge variant="success" className="text-[10px] py-0.5 px-2">
              <span className="flex items-center gap-1">
                <Truck size={10} /> {language === 'ar' ? 'توصيل' : 'Delivery'}
              </span>
            </Badge>
          )}
          <Badge variant="default" className="text-[10px] py-0.5 px-2 bg-[#fff1cc] text-[#651015]">
            <span className="flex items-center gap-1">
              <Store size={10} /> {language === 'ar' ? 'استلام من الفرع' : 'Pickup from store'}
            </span>
          </Badge>
        </div>

        {/* 1-Line Phone number and icon */}
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b91520] mb-2.5 whitespace-nowrap" dir="ltr">
          <Phone size={13} className="shrink-0 text-[#b91520]" />
          <span className="num whitespace-nowrap">{branch.phone_primary}</span>
        </div>

        {/* Address */}
        <div className="flex items-start gap-1.5 text-xs text-[rgba(33,23,21,0.65)] leading-relaxed">
          <MapPin size={13} className="shrink-0 mt-0.5 text-[rgba(33,23,21,0.4)]" />
          <span className="line-clamp-2">{address}</span>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-[rgba(33,23,21,0.06)] flex items-center justify-between">
        <span className={`text-xs font-bold ${
          isSelected ? 'text-[#b91520]' : 'text-[rgba(33,23,21,0.5)] group-hover:text-[#b91520]'
        }`}>
          {isSelected
            ? (language === 'ar' ? '✓ الفرع المحدد' : '✓ Selected Branch')
            : (language === 'ar' ? 'اختر هذا الفرع ←' : 'Select Branch →')}
        </span>
      </div>
    </button>
  )
}
