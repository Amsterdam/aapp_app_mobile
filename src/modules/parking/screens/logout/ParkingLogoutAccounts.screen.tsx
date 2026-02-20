import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {ParkingLogoutAccounts} from '@/modules/parking/components/logout/ParkingLogoutAccounts'

export const ParkingLogoutAccountsScreen = () => (
  <Screen testID="ParkingLogoutAccountsScreen">
    <Box>
      <ParkingLogoutAccounts />
    </Box>
  </Screen>
)
