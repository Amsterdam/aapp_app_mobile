import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {useFocusAndForegroundEffect} from '@/hooks/useFocusAndForegroundEffect'
import {BoatChargingForgotPasswordNewPasswordForm} from '@/modules/boat-charging/components/BoatChargingForgotPasswordNewPasswordForm'
import {useOpenIdConnectAuth} from '@/modules/boat-charging/hooks/useOpenIdConnectAuth'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

type Props = NavigationProps<BoatChargingRouteName.forgotPasswordNewPassword>

export const BoatChargingForgotPasswordNewPasswordScreen = ({
  navigation,
}: Props) => {
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
      testID="BoatChargingForgotPasswordNewPasswordScreen">
      <Box grow>
        <BoatChargingForgotPasswordNewPasswordForm />
      </Box>
    </Screen>
  )
}
