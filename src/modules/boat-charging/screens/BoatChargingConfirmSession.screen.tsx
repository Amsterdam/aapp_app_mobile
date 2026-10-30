import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingConfirmSessionDetails} from '@/modules/boat-charging/components/BoatChargingConfirmSessionDetails'
import {BoatChargingConfirmSessionSubmitButton} from '@/modules/boat-charging/components/BoatChargingConfirmSessionSubmitButton'

export const BoatChargingConfirmSession = () => (
  <Screen
    hasStickyAlert
    scroll
    stickyFooter={
      <Box>
        <BoatChargingConfirmSessionSubmitButton />
      </Box>
    }
    testID="BoatChargingConfirmSessionScreen">
    <Box grow>
      <BoatChargingConfirmSessionDetails />
    </Box>
  </Screen>
)
