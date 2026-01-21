import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {AddLicensePlateForm} from '@/modules/parking/components/license-plates/AddLicensePlateForm'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'

export const AddLicensePlateScreen = () => (
  <CurrentPermitProvider>
    <Screen
      hasStickyAlert
      keyboardAware
      testID="ParkingAddLicensePlateScreen">
      <Box>
        <AddLicensePlateForm />
      </Box>
    </Screen>
  </CurrentPermitProvider>
)
