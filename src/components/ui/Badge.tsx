import { clsx } from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'danger' | 'gold'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap',
        variant === 'default' && 'bg-[#fff1cc] text-[#651015]',
        variant === 'success' && 'bg-green-100 text-green-800',
        variant === 'danger' && 'bg-red-100 text-red-800',
        variant === 'gold' && 'bg-[#ffc928] text-[#651015]',
        className
      )}
    >
      {children}
    </span>
  )
}
