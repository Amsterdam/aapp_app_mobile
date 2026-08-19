import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useFocusAndForegroundEffect} from '@/hooks/useFocusAndForegroundEffect'
import {BoatChargingLoginForm} from '@/modules/boat-charging/components/BoatChargingLoginForm'
import {useOpenIdConnectAuth} from '@/modules/boat-charging/hooks/useOpenIdConnectAuth'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

export const BoatChargingLoginScreen = () => {
  const {hasValidAccessToken, isAuthenticated, signOut} = useOpenIdConnectAuth()
  const isLoggedIn = isAuthenticated && hasValidAccessToken

  const navigation = useNavigation()

  useFocusAndForegroundEffect(() => {
    if (isLoggedIn) {
      navigation.replace(ModuleSlug['boat-charging'])
    }
  }, [isLoggedIn, navigation])

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
