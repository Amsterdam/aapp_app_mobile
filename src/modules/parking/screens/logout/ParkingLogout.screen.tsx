import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {ParkingLogout} from '@/modules/parking/components/logout/ParkingLogout'
import {ParkingRouteName} from '@/modules/parking/routes'

type Props = NavigationProps<ParkingRouteName.logout>

export const ParkingLogoutScreen = ({route}: Props) => (
  <Screen testID="ParkingLogoutScreen">
    <Box>
      <ParkingLogout routeReportCode={route.params?.reportCode} />
    </Box>
  </Screen>
)
