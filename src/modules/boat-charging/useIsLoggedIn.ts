import {useOpenIdConnectAuth} from '@/modules/boat-charging/hooks/useOpenIdConnectAuth'

export const useIsLoggedIn = () => {
  const {isAuthenticated, username} = useOpenIdConnectAuth()

  return {isLoggedIn: isAuthenticated, username}
}
