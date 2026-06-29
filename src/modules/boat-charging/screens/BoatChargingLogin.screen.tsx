import {MapViewSwitchProvider} from '@/components/features/map/providers/MapViewSwitchProvider'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {BoatChargingLoginForm} from '@/modules/boat-charging/components/BoatChargingLoginForm'
import {useOpenIdConnectAuth} from '@/modules/boat-charging/hooks/useOpenIdConnectAuth'

export const BoatChargingLoginScreen = () => {
  const {hasValidAccessToken, isAuthenticated, signOut} = useOpenIdConnectAuth()
  const isLoggedIn = isAuthenticated && hasValidAccessToken

  return (
    <MapViewSwitchProvider>
      <Screen
        keyboardAware
        testID="BoatChargingLoginScreen">
        {isLoggedIn ? (
          <Box>
            <Column>
              <Phrase>Al ingelogd</Phrase>
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
    </MapViewSwitchProvider>
  )
}
