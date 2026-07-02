import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {ParkingAccounts} from '@/modules/parking/components/accounts/ParkingAccounts'
import {AdditionalLoginButton} from '@/modules/parking/components/select-permit/AdditionalLoginButton'

export const ParkingAccountsScreen = () => (
  <Screen testID="ParkingAccountsScreen">
    <Box grow>
      <Column
        align="between"
        flex={1}>
        <ParkingAccounts />
        <AdditionalLoginButton testID="ParkingAccountsScreenAddParkingAccountButton" />
      </Column>
    </Box>
  </Screen>
)
