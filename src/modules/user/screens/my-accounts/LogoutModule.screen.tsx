import type {NavigationProps} from '@/app/navigation/types'
import type {UserRouteName} from '@/modules/user/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {LogoutModule} from '@/modules/user/components/my-accounts/LogoutModule'

type Props = NavigationProps<UserRouteName.logoutModule>

export const LogoutModuleScreen = ({route}: Props) => (
  <Screen
    hasStickyAlert
    testID="LogoutModuleScreen">
    <Box>
      <LogoutModule slug={route.params.slug} />
    </Box>
  </Screen>
)
