import type {NavigationProps} from '@/app/navigation/types'
import type {ParkingRouteName} from '@/modules/parking/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {LicensePlateForm} from '@/modules/parking/components/license-plates/LicensePlateForm'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'

type Props = NavigationProps<ParkingRouteName.editLicensePlate>

export const ChangeLicensePlateScreen = ({route}: Props) => (
  <CurrentPermitProvider>
    <Screen
      hasStickyAlert
      keyboardAware
      testID="ParkingChangeLicensePlateScreen">
      <Box>
        <LicensePlateForm licensePlateId={route.params.licensePlateId} />
      </Box>
    </Screen>
  </CurrentPermitProvider>
)
