import type {NavigationProps} from '@/app/navigation/types'
import type {ParkingRouteName} from '@/modules/parking/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {ParkingAccountDetail} from '@/modules/parking/components/accounts/ParkingAccountDetail'

type Props = NavigationProps<ParkingRouteName.account>

export const ParkingAccountScreen = ({route}: Props) => (
  <Screen testID="ParkingAccountScreen">
    <Box>
      <ParkingAccountDetail reportCode={route.params.reportCode} />
    </Box>
  </Screen>
)
