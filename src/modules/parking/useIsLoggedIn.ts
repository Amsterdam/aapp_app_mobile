import {useParkingAccounts} from '@/modules/parking/slice'

export const useIsLoggedIn = () => {
  const accounts = useParkingAccounts()
  const hasAccounts = Object.keys(accounts).length > 0

  return hasAccounts
}
