export const CATEGORIES = [
  { id: 'food', label: 'Їжа', icon: 'UtensilsCrossed', color: '#f97316' },
  { id: 'transport', label: 'Транспорт', icon: 'Bus', color: '#3b82f6' },
  { id: 'education', label: 'Навчання', icon: 'GraduationCap', color: '#8b5cf6' },
  { id: 'entertainment', label: 'Розваги', icon: 'Gamepad2', color: '#ec4899' },
  { id: 'subscriptions', label: 'Підписки', icon: 'CreditCard', color: '#14b8a6' },
]

export const MONTHLY_BUDGET = 8000

export const INITIAL_EXPENSES = [
  { id: '1', amount: 145, category: 'food', description: 'Обід у столовій', date: '2026-05-18' },
  { id: '2', amount: 28, category: 'transport', description: 'Метро', date: '2026-05-18' },
  { id: '3', amount: 350, category: 'education', description: 'Підручник', date: '2026-05-17' },
  { id: '4', amount: 199, category: 'subscriptions', description: 'Spotify', date: '2026-05-15' },
  { id: '5', amount: 420, category: 'entertainment', description: 'Кіно з друзями', date: '2026-05-14' },
  { id: '6', amount: 89, category: 'food', description: 'Кава', date: '2026-05-14' },
  { id: '7', amount: 56, category: 'transport', description: 'Автобус', date: '2026-05-13' },
  { id: '8', amount: 1200, category: 'education', description: 'Курс онлайн', date: '2026-05-10' },
  { id: '9', amount: 175, category: 'food', description: 'Продукти', date: '2026-05-09' },
  { id: '10', amount: 299, category: 'subscriptions', description: 'Netflix', date: '2026-05-05' },
]

export const WEEKLY_CHART_DATA = [
  { day: 'Пн', amount: 320 },
  { day: 'Вт', amount: 145 },
  { day: 'Ср', amount: 890 },
  { day: 'Чт', amount: 210 },
  { day: 'Пт', amount: 420 },
  { day: 'Сб', amount: 650 },
  { day: 'Нд', amount: 173 },
]

export const CATEGORY_STATS = [
  { name: 'Їжа', value: 1240, color: '#f97316' },
  { name: 'Транспорт', value: 380, color: '#3b82f6' },
  { name: 'Навчання', value: 1550, color: '#8b5cf6' },
  { name: 'Розваги', value: 720, color: '#ec4899' },
  { name: 'Підписки', value: 498, color: '#14b8a6' },
]

export const NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'warning',
    title: 'Перевищення бюджету',
    message: 'Ви витратили 78% місячного бюджету. Залишилось ₴1 760.',
    time: '2 год тому',
    read: false,
  },
  {
    id: 'n2',
    type: 'info',
    title: 'Порада щодо економії',
    message: 'Скоротіть витрати на розваги на 15% — це зекономить ~₴108 на місяць.',
    time: 'Вчора',
    read: false,
  },
  {
    id: 'n3',
    type: 'success',
    title: 'Ціль досягнута',
    message: 'Ви не перевищили тижневий ліміт витрат. Так тримати!',
    time: '3 дні тому',
    read: true,
  },
]

export const SAVINGS_TIPS = [
  'Готуйте вдома 2–3 рази на тиждень — економія до ₴800/міс',
  'Використовуйте студентський квиток на транспорт',
  'Скасуйте невикористані підписки',
]
