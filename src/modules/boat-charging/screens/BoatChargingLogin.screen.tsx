import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {useFocusAndForegroundEffect} from '@/hooks/useFocusAndForegroundEffect'
import {BoatChargingLoginForm} from '@/modules/boat-charging/components/BoatChargingLoginForm'
import {useOpenIdConnectAuth} from '@/modules/boat-charging/hooks/useOpenIdConnectAuth'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

type Props = NavigationProps<BoatChargingRouteName.login>

export const BoatChargingLoginScreen = ({navigation}: Props) => {
  const {hasValidAccessToken, isAuthenticated, signOut} = useOpenIdConnectAuth()
  const isLoggedIn = isAuthenticated && hasValidAccessToken

  useFocusAndForegroundEffect(() => {
    if (isLoggedIn) {
      navigation.replace(ModuleSlug['boat-charging'])
    }
  }, [isLoggedIn, navigation])

  return (
    <Screen
      hasStickyAlert
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
