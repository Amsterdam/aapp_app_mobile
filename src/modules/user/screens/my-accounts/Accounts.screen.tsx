import {Screen} from '@/components/features/screen/Screen'
import {Accounts} from '@/modules/user/components/my-accounts/Accounts'

export const AccountsScreen = () => (
  <Screen
    hasStickyAlert
    testID="UserAccountsScreen">
    <Accounts />
  </Screen>
)
