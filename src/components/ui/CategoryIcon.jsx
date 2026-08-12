import {
  UtensilsCrossed,
  Bus,
  GraduationCap,
  Gamepad2,
  CreditCard,
} from 'lucide-react'
import { CATEGORIES } from '../../data/mockData'

const iconMap = {
  UtensilsCrossed,
  Bus,
  GraduationCap,
  Gamepad2,
  CreditCard,
}

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[0]
}

export default function CategoryIcon({ categoryId, size = 'md' }) {
  const cat = getCategory(categoryId)
  const Icon = iconMap[cat.icon]
  const sizeClass = size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-12' : 'h-10 w-10'
  const iconSize = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'

  return (
    <div
      className={`${sizeClass} rounded-xl flex items-center justify-center shrink-0`}
      style={{ backgroundColor: `${cat.color}22` }}
    >
      <Icon className={iconSize} style={{ color: cat.color }} />
    </div>
  )
}
