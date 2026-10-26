import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingCreateAccountForm} from '@/modules/boat-charging/components/BoatChargingCreateAccountForm'

export const BoatChargingCreateAccountScreen = () => (
  <Screen
    hasStickyAlert
    keyboardAware
    testID="BoatChargingCreateAccountScreen">
    <Box grow>
      <BoatChargingCreateAccountForm />
    </Box>
  </Screen>
)
