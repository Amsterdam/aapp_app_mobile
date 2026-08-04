import type {NavigationProps} from '@/app/navigation/types'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {useFocusAndForegroundEffect} from '@/hooks/useFocusAndForegroundEffect'
import {
  ACCESS_CODE_CONFIGURED_STATES,
  useAccessCodeGateState,
} from '@/modules/access-code/hooks/useAccessCodeGateState'
import {BoatChargingLoginForm} from '@/modules/boat-charging/components/BoatChargingLoginForm'
import {useOpenIdConnectAuth} from '@/modules/boat-charging/hooks/useOpenIdConnectAuth'

type Props = NavigationProps<BoatChargingRouteName.login>

export const BoatChargingLoginScreen = ({navigation}: Props) => {
  const {hasValidAccessToken, isAuthenticated, signOut} = useOpenIdConnectAuth()
  const isLoggedIn = isAuthenticated && hasValidAccessToken
  const state = useAccessCodeGateState(false)
  const isAccessCodeConfigured = ACCESS_CODE_CONFIGURED_STATES.has(state)

  useFocusAndForegroundEffect(() => {
    if (isLoggedIn && isAccessCodeConfigured && navigation.canGoBack()) {
      navigation.goBack()
    }
  }, [isAccessCodeConfigured, navigation, isLoggedIn])

  return (
    <Screen
      keyboardAware
      testID="BoatChargingLoginScreen">
      {isLoggedIn ? (
        <Box>
          <Column>
            <Button
              label="Uitloggen"
              onPress={signOut}
              testID="BoatChargingLoginScreenSignOutButton"
            />
          </Column>
        </Box>
      ) : (
        <BoatChargingLoginForm />
      )}
    </Screen>
  )
}
