import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingChooseVignetteForm} from '@/modules/boat-charging/components/vignettes/form/BoatChargingChooseVignetForm'
import {BoatChargingChooseVignetteFormSubmitButton} from '@/modules/boat-charging/components/vignettes/form/BoatChargingChooseVignetFormSubmitButton'

export const BoatChargingChooseVignetteScreen = () => (
  <Screen
    hasStickyAlert
    scroll
    stickyFooter={
      <Box>
        <BoatChargingChooseVignetteFormSubmitButton />
      </Box>
    }
    testID="BoatChargingVerifyVignetteScreen">
    <Box grow>
      <BoatChargingChooseVignetteForm />
    </Box>
  </Screen>
)
