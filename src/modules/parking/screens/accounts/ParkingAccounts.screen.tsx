import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {ParkingAccounts} from '@/modules/parking/components/accounts/ParkingAccounts'

export const ParkingAccountsScreen = () => (
  <Screen testID="ParkingAccountsScreen">
    <Box>
      <ParkingAccounts />
    </Box>
  </Screen>
)
