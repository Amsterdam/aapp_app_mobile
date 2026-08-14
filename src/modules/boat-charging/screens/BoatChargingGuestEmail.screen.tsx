import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingGuestEmailForm} from '@/modules/boat-charging/components/BoatChargingGuestEmailForm'

export const BoatChargingGuestEmailScreen = () => (
  <Screen
    hasStickyAlert
    testID="BoatChargingGuestEmailScreen">
    <Box grow>
      <BoatChargingGuestEmailForm />
    </Box>
  </Screen>
)
