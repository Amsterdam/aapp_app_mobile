import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {useFocusAndForegroundEffect} from '@/hooks/useFocusAndForegroundEffect'
import {BoatChargingCreateAccountConfirmForm} from '@/modules/boat-charging/components/BoatChargingCreateAccountConfirmForm'
import {useOpenIdConnectAuth} from '@/modules/boat-charging/hooks/useOpenIdConnectAuth'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

type Props = NavigationProps<BoatChargingRouteName.createAccountConfirm>

export const BoatChargingCreateAccountConfirmScreen = ({navigation}: Props) => {
  const {hasValidAccessToken, isAuthenticated} = useOpenIdConnectAuth()
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
      testID="BoatChargingCreateAccountConfirmScreen">
      <Box grow>
        <BoatChargingCreateAccountConfirmForm />
      </Box>
    </Screen>
  )
}
