import {useOpenIdConnectAuth} from '@/modules/boat-charging/hooks/useOpenIdConnectAuth'

export const useIsLoggedIn = () => {
  const {hasValidAccessToken, isAuthenticated, username} = useOpenIdConnectAuth()

  return {isLoggedIn: isAuthenticated && hasValidAccessToken, username}
}
