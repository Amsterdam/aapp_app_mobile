import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingChooseVignetForm} from '@/modules/boat-charging/components/vignettes/form/BoatChargingChooseVignetForm'
import {BoatChargingChooseVignetFormSubmitButton} from '@/modules/boat-charging/components/vignettes/form/BoatChargingChooseVignetFormSubmitButton'

export const BoatChargingChooseVignetScreen = () => (
  <Screen
    hasStickyAlert
    scroll
    stickyFooter={
      <Box>
        <BoatChargingChooseVignetFormSubmitButton />
      </Box>
    }
    testID="BoatChargingVerifyVignetScreen">
    <Box grow>
      <BoatChargingChooseVignetForm />
    </Box>
  </Screen>
)
