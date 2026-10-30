import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {ParkingAccountDetail} from '@/modules/parking/components/accounts/ParkingAccountDetail'
import type {ParkingRouteName} from '@/modules/parking/routes'

type Props = NavigationProps<ParkingRouteName.account>

export const ParkingAccountScreen = ({route}: Props) => (
  <Screen testID="ParkingAccountScreen">
    <Box>
      <ParkingAccountDetail reportCode={route.params.reportCode} />
    </Box>
  </Screen>
)
