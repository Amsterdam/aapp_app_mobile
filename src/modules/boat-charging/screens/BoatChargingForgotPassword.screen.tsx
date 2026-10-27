import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingForgotPasswordForm} from '@/modules/boat-charging/components/BoatChargingForgotPasswordForm'

export const BoatChargingForgotPasswordScreen = () => (
  <Screen
    hasStickyAlert
    keyboardAware
    testID="BoatChargingForgotPasswordScreen">
    <Box grow>
      <BoatChargingForgotPasswordForm />
    </Box>
  </Screen>
)
