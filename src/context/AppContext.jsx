import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import {
  INITIAL_EXPENSES,
  MONTHLY_BUDGET,
  NOTIFICATIONS,
  CATEGORIES,
} from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [screen, setScreen] = useState('splash')
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES)
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const [filterCategory, setFilterCategory] = useState('all')
  const [uiState, setUiState] = useState('idle') // idle | loading | success | error
  const [toast, setToast] = useState(null)
  const [userName, setUserName] = useState('Олексій')

  const totalSpent = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  )

  const balance = MONTHLY_BUDGET - totalSpent
  const budgetPercent = Math.min((totalSpent / MONTHLY_BUDGET) * 100, 100)
  const isOverBudget = totalSpent >= MONTHLY_BUDGET

  const filteredExpenses = useMemo(() => {
    if (filterCategory === 'all') return expenses
    return expenses.filter((e) => e.category === filterCategory)
  }, [expenses, filterCategory])

  const categoryTotals = useMemo(() => {
    const totals = {}
    CATEGORIES.forEach((c) => (totals[c.id] = 0))
    expenses.forEach((e) => {
      totals[e.category] = (totals[e.category] || 0) + e.amount
    })
    return totals
  }, [expenses])

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const MAIN_TABS = ['dashboard', 'statistics', 'history', 'notifications']

  const navigate = useCallback(
    (to) => {
      if (to === screen) return

      // Перемикання вкладок — миттєво, без блокуючого overlay
      if (MAIN_TABS.includes(to) && (MAIN_TABS.includes(screen) || screen === 'add-expense')) {
        setScreen(to)
        setUiState('idle')
        return
      }

      setUiState('loading')
      setTimeout(() => {
        setScreen(to)
        setUiState('idle')
      }, 350)
    },
    [screen]
  )

  const addExpense = useCallback(
    (expense) => {
      setUiState('loading')
      setTimeout(() => {
        const newExpense = {
          ...expense,
          id: Date.now().toString(),
        }
        setExpenses((prev) => [newExpense, ...prev])
        setUiState('success')

        const newTotal = totalSpent + expense.amount
        if (newTotal >= MONTHLY_BUDGET * 0.75 && newTotal < MONTHLY_BUDGET) {
          setNotifications((prev) => [
            {
              id: Date.now().toString(),
              type: 'warning',
              title: 'Наближення до ліміту',
              message: `Ви витратили ${Math.round((newTotal / MONTHLY_BUDGET) * 100)}% бюджету.`,
              time: 'Щойно',
              read: false,
            },
            ...prev,
          ])
        }

        setTimeout(() => {
          setUiState('idle')
          setScreen('dashboard')
          showToast('Витрату успішно додано!')
        }, 1200)
      }, 800)
    },
    [totalSpent, showToast]
  )

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const value = {
    screen,
    setScreen,
    navigate,
    expenses,
    filteredExpenses,
    filterCategory,
    setFilterCategory,
    totalSpent,
    balance,
    budgetPercent,
    isOverBudget,
    monthlyBudget: MONTHLY_BUDGET,
    categoryTotals,
    notifications,
    markNotificationRead,
    uiState,
    setUiState,
    toast,
    showToast,
    userName,
    setUserName,
    addExpense,
    unreadCount: notifications.filter((n) => !n.read).length,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
