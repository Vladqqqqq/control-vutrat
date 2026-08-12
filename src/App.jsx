import { AppProvider, useApp } from './context/AppContext'
import MobileFrame from './components/layout/MobileFrame'
import BottomNav from './components/layout/BottomNav'
import Toast from './components/ui/Toast'
import SplashScreen from './screens/SplashScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import DashboardScreen from './screens/DashboardScreen'
import AddExpenseScreen from './screens/AddExpenseScreen'
import StatisticsScreen from './screens/StatisticsScreen'
import HistoryScreen from './screens/HistoryScreen'
import NotificationsScreen from './screens/NotificationsScreen'

const MAIN_TABS = ['dashboard', 'statistics', 'history', 'notifications']

function AppContent() {
  const { screen, uiState, toast } = useApp()

  const showNav = MAIN_TABS.includes(screen)
  const isLoading =
    uiState === 'loading' &&
    !MAIN_TABS.includes(screen) &&
    screen !== 'add-expense'

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen />
      case 'onboarding':
        return <OnboardingScreen />
      case 'dashboard':
        return <DashboardScreen />
      case 'add-expense':
        return <AddExpenseScreen />
      case 'statistics':
        return <StatisticsScreen />
      case 'history':
        return <HistoryScreen />
      case 'notifications':
        return <NotificationsScreen />
      default:
        return <DashboardScreen />
    }
  }

  return (
    <>
      <MobileFrame
        screenKey={screen}
        loading={isLoading}
        content={renderScreen()}
        footer={showNav ? <BottomNav /> : null}
      />
      <Toast toast={toast} />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
